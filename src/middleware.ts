import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const referer = req.headers.get('referer');

  // Условие для редиректа: нет реферера (прямой переход) и совпадает путь
  if (!referer && (pathname === '/matrix' || pathname === '/forecast' || pathname === '/resetpassword' || pathname === '/login' || pathname === '/signup')) {
    return NextResponse.redirect(new URL('/', req.url));
  }

  // Пример ошибки истекшей сессии
  const sessionExpiredError = {
    error: "Сессия истекла. Авторизуйтесь в личный кабинет снова.",
    error_type: "BadRequest",
    result: false
  };

  // Проверка на ошибку истечения сессии
  if (sessionExpiredError.error_type === 'BadRequest' && sessionExpiredError.error.includes('Сессия истекла')) {
    // Перенаправление на страницу логина, если сессия истекла
    return NextResponse.redirect(new URL('/login', req.url));
  }

  return NextResponse.next();
}
