import { verifyAuth } from "@/lib/auth";
import {
  NextFetchEvent,
  NextMiddleware,
  NextRequest,
  NextResponse,
} from "next/server";
import { MiddlewareFactory } from "./types";

// Define an array of routes that do not require authentication
const routesWithoutAuth = (pathname: string) => {
  return ["/sign-up", "/sign-in"].some((path) => pathname.startsWith(path));
};

// Function to inject the refreshToken as a cookie in the response
const injectToken = (response: NextResponse, { refreshToken }: any) => {
  response.cookies.set({
    name: "refreshToken",
    value: refreshToken,
    expires: new Date(new Date().setDate(new Date().getDate() + 60)),
    httpOnly: true,
  });
};

// Middleware factory function that takes the next middleware as input
export const withAuthorization: MiddlewareFactory = (next: NextMiddleware) => {
  return async (request: NextRequest, _next: NextFetchEvent) => {
    const pathname = request.nextUrl.pathname;
    const response = NextResponse.next();

    // Exclude requests to the Next.js internal routes
    if (pathname.startsWith("/_next/")) return NextResponse.next();

    // Verify the authentication token
    const verifiedToken = await verifyAuth(request);

    // If the token is valid and the route does not require authentication, redirect to home
    if (verifiedToken && routesWithoutAuth(pathname)) {
      const url = new URL(`/`, request.url);
      return NextResponse.redirect(url);
    }

    // If the route does not require authentication, proceed to the next middleware
    if (routesWithoutAuth(pathname)) return NextResponse.next();

    // If the token is valid and has a refreshToken, inject it as a cookie in the response
    if (verifiedToken && verifiedToken.refreshToken) {
      injectToken(response, {
        refreshToken: verifiedToken.refreshToken,
      });

      return response;
    }
    // If the token is valid but the route requires authentication, proceed to the next middleware
    else if (verifiedToken && !routesWithoutAuth(pathname)) {
      return NextResponse.next();
    }
    // If the token is not valid or does not exist, redirect to the sign-in page
    else {
      const url = new URL(`/sign-in`, request.url);
      url.searchParams.set("callbackUrl ", encodeURI(request.url));
      return NextResponse.redirect(url);
    }
  };
};
