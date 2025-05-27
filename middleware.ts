   // middleware.ts
   import { NextResponse } from 'next/server';
   import type { NextRequest } from 'next/server';

   export function middleware(request: NextRequest) {
     // Получите токен из куки или заголовка
     const token = request.cookies.get('token')?.value;

     // Проверьте, авторизован ли пользователь
     if (!token) {
       // Если пользователь не авторизован, перенаправьте на страницу входа
       return NextResponse.redirect(new URL('/login', request.url));
     }

     // Если пользователь авторизован, разрешите доступ
     return NextResponse.next();
   }

   // Укажите, для каких путей будет применяться middleware
   export const config = {
     matcher: '/admin/:path*',
   };