import React, { useCallback, useMemo, useRef, useState, ChangeEvent, DragEvent } from 'react';

// Frontend-only PDF→Text extractor (text-layer first, OCR fallback) using pdf.js + Tesseract.js (WASM)
// - No server: files never leave the user's device.
// - Languages: rus + eng (configurable)
// - Progress UI, per-page pipeline, simple table heuristics, JSON/CSV export.
// Styling: Tailwind (already available), minimal shadcn/ui-like primitives

interface Progress {
  page: number;
  total: number;
  ocr: number;
}

interface TableRow {
  analyte: string;
  value: string | number;
  unit: string;
  ref: string;
}

interface Table {
  name: string;
  rows: TableRow[];
}

interface Structured {
  fields: Record<string, string>;
  tables: Table[];
}

export function PDFToTextExtractor() {
  const [busy, setBusy] = useState<boolean>(false);
  const [progress, setProgress] = useState<Progress>({ page: 0, total: 0, ocr: 0 });
  const [langRus, setLangRus] = useState<boolean>(true);
  const [langEng, setLangEng] = useState<boolean>(true);
  const [forceOCR, setForceOCR] = useState<boolean>(false);
  const [scale, setScale] = useState<number>(2);
  const [resultText, setResultText] = useState<string>('');
  console.log('Result text length:', resultText);
  const [structured, setStructured] = useState<Structured>({ fields: {}, tables: [] });
  const fileRef = useRef<HTMLInputElement>(null);

  const langCode = useMemo(() => {
    const langs = [];
    if (langRus) langs.push('rus');
    if (langEng) langs.push('eng');
    return langs.length ? langs.join('+') : 'eng';
  }, [langRus, langEng]);

  const handleFile = useCallback(
    async (file: File) => {
      if (!file) return;
      setBusy(true);
      setResultText('');
      setStructured({ fields: {}, tables: [] });
      setProgress({ page: 0, total: 0, ocr: 0 });

      try {
        // Lazy-load libraries to keep initial bundle light
        const pdfjsLib = await import('pdfjs-dist/build/pdf');
        // Set worker from CDN to ensure it loads in the browser preview environment
        const workerSrc =
          'https://cdn.jsdelivr.net/npm/pdfjs-dist@4.10.38/build/pdf.worker.min.mjs';
        pdfjsLib.GlobalWorkerOptions.workerSrc = workerSrc;

        const Tesseract = (await import('tesseract.js')).default;

        const buf = new Uint8Array(await file.arrayBuffer());
        const pdf = await pdfjsLib.getDocument({ data: buf }).promise;

        const total = pdf.numPages;
        setProgress((p) => ({ ...p, total }));

        let outText = '';
        const pageTexts = [];

        for (let i = 1; i <= total; i++) {
          setProgress((p) => ({ ...p, page: i, ocr: 0 }));
          const page = await pdf.getPage(i);

          const tryTextLayer = async () => {
            const textContent = await page.getTextContent();
            const text = textContent.items.map((it) => it.str).join(' ');
            return (text || '').trim();
          };

          const textLayer = forceOCR ? '' : await tryTextLayer();

          if (textLayer) {
            pageTexts.push(textLayer);
            outText += textLayer + '\n';
          } else {
            // Render to canvas and OCR
            const viewport = page.getViewport({ scale });
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            if (!ctx) throw new Error('Could not get canvas context');
            canvas.width = viewport.width;
            canvas.height = viewport.height;
            await page.render({ canvasContext: ctx, viewport }).promise;

            const { data } = await Tesseract.recognize(canvas, langCode, {
              logger: (m: any) => {
                if (m.status === 'recognizing text' && m.progress != null) {
                  setProgress((p) => ({ ...p, ocr: Math.round(m.progress * 100) }));
                }
              },
            });
            const raw = data.text || '';
            const cleaned = postProcessText(raw);
            pageTexts.push(cleaned);
            outText += cleaned + '\n';
          }
        }

        const cleanedAll = postProcessText(outText);
        setResultText(cleanedAll);

        // Simple field & table extraction tailored to lab reports
        const parsed = extractStructure(cleanedAll);
        setStructured(parsed);
      } catch (err: any) {
        console.error(err);
        alert('Ошибка обработки: ' + (err?.message || String(err)));
      } finally {
        setBusy(false);
        setProgress((p) => ({ ...p, ocr: 0 }));
      }
    },
    [forceOCR, langCode, scale]
  );

  const onSelectFile = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const f = e.target.files?.[0];
      if (f) handleFile(f);
    },
    [handleFile]
  );

  const onDrop = useCallback(
    (e: DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      const f = e.dataTransfer.files?.[0];
      if (f) handleFile(f);
    },
    [handleFile]
  );

  const onDragOver = (e: DragEvent<HTMLDivElement>) => e.preventDefault();

  const downloadJSON = () => {
    const blob = new Blob([JSON.stringify(structured, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'extraction.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  const downloadCSV = () => {
    const rows = [['Analyte', 'Value', 'Unit', 'Ref']];
    for (const t of structured.tables) {
      for (const r of t.rows || [])
        rows.push([r.analyte || '', r.value ?? '', r.unit || '', r.ref || '']);
    }
    const csv = rows
      .map((r) =>
        r
          .map((cell) => String(cell).replaceAll('"', '""'))
          .map((c) => `"${c}"`)
          .join(',')
      )
      .join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'extraction.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 p-6">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-2xl md:text-3xl font-semibold mb-2">
          PDF → Text/OCR (WASM, frontend-only)
        </h1>
        <p className="text-sm text-gray-600 mb-6">
          Файлы не покидают устройство. Сначала пробуем текстовый слой PDF, затем — OCR
          (Tesseract.js). Предназначено для коротких медицинских отчётов (1–3 страницы).
        </p>

        <div className="grid md:grid-cols-3 gap-4 mb-6">
          <div className="p-4 bg-white rounded-2xl shadow">
            <label className="block text-sm font-medium mb-2">Загрузить PDF</label>
            <input
              ref={fileRef}
              type="file"
              accept="application/pdf"
              onChange={onSelectFile}
              className="block w-full text-sm"
            />
            <div
              onDrop={onDrop}
              onDragOver={onDragOver}
              className="mt-3 border-2 border-dashed rounded-xl p-4 text-center text-sm text-gray-500"
            >
              Перетащите файл сюда
            </div>
          </div>

          <div className="p-4 bg-white rounded-2xl shadow">
            <label className="block text-sm font-medium mb-2">Настройки</label>
            <div className="flex items-center gap-3 mb-2">
              <input
                id="rus"
                type="checkbox"
                checked={langRus}
                onChange={(e) => setLangRus(e.target.checked)}
              />
              <label htmlFor="rus" className="text-sm">
                Русский (rus)
              </label>
            </div>
            <div className="flex items-center gap-3 mb-2">
              <input
                id="eng"
                type="checkbox"
                checked={langEng}
                onChange={(e) => setLangEng(e.target.checked)}
              />
              <label htmlFor="eng" className="text-sm">
                English (eng)
              </label>
            </div>
            <div className="flex items-center gap-3 mb-2">
              <input
                id="force"
                type="checkbox"
                checked={forceOCR}
                onChange={(e) => setForceOCR(e.target.checked)}
              />
              <label htmlFor="force" className="text-sm">
                Всегда OCR (игнорировать текстовый слой)
              </label>
            </div>
            <div className="mb-2">
              <label className="text-sm block">Масштаб OCR (качество/скорость): {scale}x</label>
              <input
                type="range"
                min={1}
                max={3}
                step={0.5}
                value={scale}
                onChange={(e) => setScale(parseFloat(e.target.value))}
                className="w-full"
              />
            </div>
          </div>

          <div className="p-4 bg-white rounded-2xl shadow">
            <label className="block text-sm font-medium mb-2">Экспорт</label>
            <div className="flex gap-2">
              <button
                onClick={downloadJSON}
                disabled={
                  !structured?.tables?.length && !Object.keys(structured?.fields || {}).length
                }
                className="px-3 py-2 rounded-xl bg-gray-900 text-white text-sm disabled:opacity-40"
              >
                Скачать JSON
              </button>
              <button
                onClick={downloadCSV}
                disabled={!structured?.tables?.length}
                className="px-3 py-2 rounded-xl bg-gray-900 text-white text-sm disabled:opacity-40"
              >
                Скачать CSV
              </button>
            </div>
            <p className="text-xs text-gray-500 mt-2">
              CSV формируется из распознанных таблиц (Analyte, Value, Unit, Ref).
            </p>
          </div>
        </div>

        {busy && (
          <div className="p-4 bg-white rounded-2xl shadow mb-6">
            <div className="flex items-center justify-between">
              <div className="text-sm font-medium">
                Обработка… Страница {progress.page}/{progress.total}
              </div>
              <div className="text-sm">OCR: {progress.ocr}%</div>
            </div>
            <div className="mt-2 h-2 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-gray-900"
                style={{
                  width: `${progress.total ? (100 * (progress.page - 1 + progress.ocr / 100)) / progress.total : 0}%`,
                }}
              />
            </div>
          </div>
        )}

        {resultText && (
          <div className="grid md:grid-cols-2 gap-4">
            <div className="p-4 bg-white rounded-2xl shadow">
              <h2 className="text-lg font-semibold mb-2">Извлечённый текст</h2>
              <pre className="text-sm whitespace-pre-wrap leading-relaxed">{resultText}</pre>
            </div>
            <div className="p-4 bg-white rounded-2xl shadow">
              <h2 className="text-lg font-semibold mb-2">Структура (поля и таблицы)</h2>
              <div className="text-sm">
                <h3 className="font-medium mt-2 mb-1">Поля</h3>
                <ul className="list-disc ml-5">
                  {Object.entries(structured.fields || {}).map(([k, v]) => (
                    <li key={k}>
                      <span className="font-mono text-xs bg-gray-100 px-1 py-0.5 rounded mr-2">
                        {k}
                      </span>
                      {String(v)}
                    </li>
                  ))}
                </ul>
                <h3 className="font-medium mt-4 mb-1">Таблицы</h3>
                {structured.tables?.length ? (
                  structured.tables.map((t, i) => (
                    <div key={i} className="mb-3">
                      <div className="text-xs text-gray-500 mb-1">{t.name || `Table ${i + 1}`}</div>
                      <div className="overflow-auto border rounded-xl">
                        <table className="w-full text-sm">
                          <thead>
                            <tr className="bg-gray-50">
                              <th className="text-left p-2">Analyte</th>
                              <th className="text-left p-2">Value</th>
                              <th className="text-left p-2">Unit</th>
                              <th className="text-left p-2">Ref</th>
                            </tr>
                          </thead>
                          <tbody>
                            {t.rows?.map((r, idx) => (
                              <tr key={idx} className="odd:bg-white even:bg-gray-50">
                                <td className="p-2">{r.analyte}</td>
                                <td className="p-2">{r.value}</td>
                                <td className="p-2">{r.unit}</td>
                                <td className="p-2">{r.ref}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-xs text-gray-500">Таблицы не обнаружены</div>
                )}
              </div>
            </div>
          </div>
        )}

        {!resultText && !busy && (
          <div className="p-4 bg-white rounded-2xl shadow text-sm text-gray-600">
            Загрузите PDF с анализами (1–3 страницы). Сервис попытается извлечь текст или распознать
            его. Данные остаются локально.
          </div>
        )}
      </div>
    </div>
  );
}

// ----------------- Utilities -----------------

function postProcessText(text: string): string {
  let t = text.replace(/\u00A0/g, ' '); // NBSP → space
  // Normalize line breaks and collapse excessive spaces
  t = t.replace(/\r\n?|\u2028|\u2029/g, '\n');
  t = t.replace(/[ \t]{2,}/g, ' ');

  // Common OCR confusions
  t = t.replace(/O(?=\d)/g, '0'); // O before digits → 0
  t = t.replace(/(?<=\d)[lI](?=\d)/g, '1'); // l/I between digits → 1

  // Decimal separators: try to unify 12,34 → 12.34 (but keep thousands like 1 234,56)
  t = t.replace(/(\d),(\d)/g, '$1.$2');

  // Trim trailing spaces per line
  t = t
    .split('\n')
    .map((l) => l.trimEnd())
    .join('\n');
  return t.trim();
}

// Quick-and-dirty structure extractor for typical lab tables
function extractStructure(text: string): Structured {
  const lines = text
    .split(/\n+/)
    .map((l) => l.trim())
    .filter(Boolean);
  const fields: Record<string, string> = {};

  // Heuristics for common header fields (ru/en)
  const fieldPatterns: [RegExp, (m: RegExpMatchArray) => void][] = [
    [/^(ФИО|Пациент):\s*(.+)$/i, (m) => (fields.patient_name = m[2])],
    [/^(Дата\s*рождения|ДР|DOB):\s*(.+)$/i, (m) => (fields.dob = m[2])],
    [/^(Пол|Sex):\s*(.+)$/i, (m) => (fields.sex = m[2])],
    [/^(Номер\s*заказа|Order\s*ID|ID):\s*(.+)$/i, (m) => (fields.order_id = m[2])],
    [
      /^(Дата\s*анализа|Дата\s*взятия|Collected\s*on):\s*(.+)$/i,
      (m) => (fields.sample_date = m[2]),
    ],
  ];

  for (const ln of lines) {
    for (const [re, fn] of fieldPatterns) {
      const m = ln.match(re);
      if (m) fn(m);
    }
  }

  // Table detection: lines with 2–4 columns separated by multiple spaces or tabs
  const tables: string[][][] = [];
  let current: string[][] = [];

  const isHeaderLike = (l: string): boolean =>
    /анализ|показатель|analyte|test|result|результат|ед\.?|unit|reference|реф/i.test(l);
  const splitCols = (l: string): string[] =>
    l
      .split(/\s{2,}|\t+/)
      .map((s) => s.trim())
      .filter(Boolean);

  for (const ln of lines) {
    const cols = splitCols(ln);
    if (cols.length >= 2 && cols.length <= 5) {
      current.push(cols);
    } else {
      if (current.length >= 2) {
        tables.push(current);
      }
      current = [];
    }
  }
  if (current.length >= 2) tables.push(current);

  const normalizedTables: Table[] = tables.map((grid, idx) => {
    // try to detect header row
    let headerIdx = 0;
    for (let i = 0; i < Math.min(3, grid.length); i++) {
      if (isHeaderLike(grid[i].join(' '))) {
        headerIdx = i;
        break;
      }
    }
    const header = grid[headerIdx];

    const rows = grid.slice(headerIdx + 1).map((r) => normalizeRow(header, r));
    return { name: `Table ${idx + 1}`, rows };
  });

  return { fields, tables: normalizedTables };
}

function normalizeRow(header: string[], row: string[]): TableRow {
  // Map common header variations to {analyte, value, unit, ref}
  const names = header.map((h) => h.toLowerCase());
  const analyte = row[0] || '';
  let value: string | number = '';
  let unit = '';
  let ref = '';

  // Try to align by semantics
  for (let i = 1; i < row.length; i++) {
    const h = names[i] || '';
    const v = row[i] ?? '';
    if (/^рез|result|итог|значение/i.test(h)) value = v;
    else if (/^ед|unit|изм/i.test(h)) unit = v;
    else if (/^реф|ref|диап/i.test(h)) ref = v;
    else if (!value) value = v; // fallback second column as value
  }

  // Light numeric cleanup
  const num = toNumber(value);
  if (num != null) value = num;

  return { analyte, value, unit, ref };
}

function toNumber(v: any): number | null {
  if (v == null) return null;
  const s = String(v).replace(/\s/g, '').replace(',', '.');
  if (/^[+-]?(\d+)(\.\d+)?$/.test(s)) return parseFloat(s);
  return null;
}

export default PDFToTextExtractor;
