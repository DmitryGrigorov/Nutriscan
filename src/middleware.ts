import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Получаем токен из куки
  const token = request.cookies.get('auth_token')?.value;

  // Проверяем, является ли путь админским
  if (request.nextUrl.pathname.startsWith('/admin')) {
    // Если токена нет, перенаправляем на страницу входа
    if (!token) {
      return NextResponse.redirect(new URL('/auth/login', request.url));
    }
  }

  return NextResponse.next();
}

// Указываем, для каких путей будет применяться middleware
export const config = {
  matcher: '/admin/:path*',
}; 