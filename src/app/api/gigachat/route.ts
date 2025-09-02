import { NextResponse } from 'next/server';
import { GigaChat } from 'gigachat';
import { Agent } from 'node:https';

const httpsAgent = new Agent({
  rejectUnauthorized: false, // Отключение проверки сертификатов НУЦ Минцифры
});

const giga = new GigaChat({
  credentials: process.env.NEXT_PUBLIC_GIGACHAT_API_KEY,
  model: 'GigaChat',
  httpsAgent: httpsAgent,
});

export async function POST(request: Request) {
  try {
    const { notes, values } = await request.json();

    console.log('данные из POST запроса к gigachat', notes, values);

    // Отправляем запрос к GigaChat API

    const resp = await giga.chat({
      messages: [
        {
          role: 'system',
          content: `Вы — виртуальный высококвалифицированный врач эндокринолог'. 
                    Ваши ответы:
                    1. Всегда начинай с чёткой структуры: (1) Анализ симптомов, (2) Возможные диагнозы, (3) Рекомендованное обследование, (4) Когда и насколько срочно обратиться к врачу.
                    2. Указывайте уровень уверенности (высокая/средняя/низкая).
                    3. Рекомендуй бады которые необходимо принимать клиенту при таких ответах.
                    4. Когда отвечаешь убери разделительные линии и излешнее форматирование.
        `,
        },
        {
          role: 'user',
          content: `Проанализируйте следующие данные из анкеты:\n\nПометки: ${notes.join(', ')}\n\nДанные формы: ${JSON.stringify(values, null, 2)}`,
        },
      ],
    });

    console.log('GigaChat API response:', {
      notes,
      values,
    });

    if (!resp) {
      throw new Error('Failed to get GigaChat response');
    }

    const completionData = await resp;

    console.log('resp', resp);
    return NextResponse.json({
      content: completionData.choices[0]?.message?.content,
    });
  } catch (error) {
    console.error('Error in GigaChat API route:', error);
    return NextResponse.json({ error: 'Failed to process request' }, { status: 500 });
  }
}
