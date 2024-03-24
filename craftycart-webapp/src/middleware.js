import { NextResponse } from 'next/server'
import { NextRequest } from 'next/server'

export function middleware(request) {
  const path = request.nextUrl.pathname

  // Define paths that are considered public (accessible without a token)
    const isLoginPath = path === '/account/login' || path === '/account/signup' || path === '/account/verifyemail'
    const isSecurePath = path.startsWith('/profile'); // Check if the path starts with '/(secure)'

// Rest of the code...


  // Get the token from the cookies
  const token = request.cookies.get('token')?.value || ''

  // Redirect logic based on the path and token presence
  if(isLoginPath && token) {

 // If trying to access a public path with a token, redirect to the home page
    return NextResponse.redirect(new URL('/', request.nextUrl))
  }

// If trying to access a protected path without a token, redirect to the login page
  if ( isSecurePath && !token) {
    return NextResponse.redirect(new URL('/account/login', request.nextUrl))
  }
    
}

// It specifies the paths for which this middleware should be executed. 
// In this case, it's applied to '/', '/profile', '/login', and '/signup'.
export const config = {
  matcher: [
    '/',
    '/profile',
    '/account/login',
    '/account/signup',
    '/account/verifyemail'
  ]
}