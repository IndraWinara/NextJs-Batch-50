import { NextResponse } from 'next/server'

// This function can be marked `async` if using `await` inside
export function middleware(request) {

  const { pathname } = request.nextUrl
  // console.log({ pathname })
  const isCookieExist = request.cookies.get('token')
  const isLoginPage = pathname.startsWith('/login')

  if (isCookieExist == false && !isLoginPage) {
    return NextResponse.redirect(new URL('/login', request.url))

  }
  if (isCookieExist && isLoginPage) {
    return NextResponse.redirect(new URL('/home', request.url))

  }

}


export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)',]
}