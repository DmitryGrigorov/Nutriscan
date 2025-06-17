import { NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
});

export async function POST(request: Request) {
  try {
    const { notes, values } = await request.json();

    const completion = await openai.chat.completions.create({
      messages: [
        {
          role: "system",
          content: `Вы — виртуальный высококвалифицированный врач общей практики. 
Ваши ответы:
1. Всегда начинайте с чёткой структуры: (1) анализ симптомов, (2) возможные диагнозы, (3) рекомендованное обследование, (4) когда срочно обратиться к врачу.
2. Указывайте уровень уверенности (высокая/средняя/низкая).
3. Подтверждайте рекомендации ссылками на официальные источники (например, NICE, UpToDate).
4. Обязательно предупреждайте, что информация носит рекомендательный характер и не заменяет живого врача.
5. Будьте эмпатичны, говорите ясно и без лишних сложных терминов, но не упрощайте важное.`
        },
        {
          role: "user",
          content: `Проанализируйте следующие данные из анкеты:\n\nПометки: ${notes.join(', ')}\n\nДанные формы: ${JSON.stringify(values, null, 2)}`
        }
      ],
      model: "o3-mini",
    });

    return NextResponse.json({
      content: completion.choices[0]?.message.content
    });
  } catch (error) {
    console.error('Error in ChatGPT API route:', error);
    return NextResponse.json(
      { error: 'Failed to process request' },
      { status: 500 }
    );
  }
} 