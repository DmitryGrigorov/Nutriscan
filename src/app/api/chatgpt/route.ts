import { NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
});

export async function POST(request: Request) {
  try {
    const { notes, values } = await request.json();


    console.log("данные из POST запроса к chatgpt", notes, values);
    const completion = await openai.chat.completions.create({
      messages: [
        {
          role: "system",
          content: `Вы — виртуальный высококвалифицированный врач эндокринолог'. 
Ваши ответы:
1. Всегда начинайте с чёткой структуры: (1) анализ симптомов, (2) возможные диагнозы, (3) рекомендованное обследование, (4) когда срочно обратиться к врачу.
2. Указывайте уровень уверенности (высокая/средняя/низкая).
3. Рекомендуй бады которые необходимо принимать клиенту при таких ответах.
4. Когда отвечаешь убери разделительные линии и излешнее форматирование.
`
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