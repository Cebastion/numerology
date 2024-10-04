import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const referer = req.headers.get('referer');

  // Условие для редиректа: нет реферера (прямой переход) и совпадает путь
  if (!referer && (pathname === '/matrix' || pathname === '/forecast' || pathname === '/resetpassword' || pathname === '/login' || pathname === '/signup')) {
    return NextResponse.redirect(new URL('/', req.url));
  }

  return NextResponse.next();
}
