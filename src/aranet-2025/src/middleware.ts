import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/app/lib/session";
import { logDebug } from "@/app/lib/logger";
import { hasAdminRights } from "@/app/lib/helpers";
import ServerDataPlain from "@/app/data/ServerDataPlain";

// Protegidas: todo excepto /login Y /api/login
const protectedRoutes = /^(?!\/(login|api\/login)$)\/.*$/;
const publicRoutes = ['/login', '/api/login'];
 
export default async function middleware(req: NextRequest) {

   // 1. Check if the current route is protected or public
  const path = req.nextUrl.pathname;
  const isProtectedRoute = protectedRoutes.test(path);
  const isPublicRoute = publicRoutes.includes(path);

  // 2. Decrypt the session from the cookie
  const session = await getSession();
  if (!session) {
    logDebug('Session could not be decrypted');
  }

  // 3. Redirect to /login if the user is not authenticated
  if (isProtectedRoute && !session?.id) {
    logDebug('Session not valid');
    if (path.startsWith('/api')) {
      return NextResponse.json({
        statusCode: 401,
        error: "Unauthorized",
      }, { status: 401 });
    }
    return NextResponse.redirect(new URL('/login', req.nextUrl))
  }

  // 4. Protect admin pages
  if (session && path.startsWith('/admin')) {
    const dataPlain = ServerDataPlain.getInstance();
    // Get user logueado
    const me = await dataPlain.useMe(session.id as number);
    if (!me || !me.data || !hasAdminRights(me.data)) {
      return NextResponse.redirect(new URL('/', req.nextUrl))
    }
  }

  // 5. Redirect to /dashboard if the user is authenticated
  if (
    isPublicRoute &&
    session?.id
  ) {
    return NextResponse.redirect(new URL('/', req.nextUrl))
  }
 
  return NextResponse.next();
}

// Routes Middleware should run on
export const config = {
  matcher: [
    '/((?!^$|_next/static|_next/image|images|favicon.ico|files).*)',
  ],
}