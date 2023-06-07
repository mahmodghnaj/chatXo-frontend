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
    name: "refresh",
    value: refreshToken,
    expires: new Date(new Date().setDate(new Date().getDate() + 60)),
    httpOnly: true,
  });
};

// Middleware factory function that takes the next middleware as input
export const withAuthorization: MiddlewareFactory = (next: NextMiddleware) => {
  return async (request: NextRequest, _next: NextFetchEvent) => {
    const pathname = request.nextUrl.pathname;
    // Exclude requests to the Next.js internal routes
    if (pathname.startsWith("/_next/")) return NextResponse.next();

    // Verify the authentication token
    const verifiedToken = await verifyAuth(request);

    // If the token is valid and the route does not require authentication, redirect to home
    if (verifiedToken && routesWithoutAuth(pathname)) {
      const url = new URL(`/`, request.url);
      const res = NextResponse.redirect(url);
      injectToken(res, {
        refreshToken: verifiedToken.refreshToken,
      });
      return res;
    }
    // If the route does not require authentication, proceed to the next middleware
    if (routesWithoutAuth(pathname)) {
      const res = NextResponse.next();
      res.cookies.delete("refresh");
      return res;
    }
    // If the token is valid but the route requires authentication, proceed to the next middleware
    else if (verifiedToken && !routesWithoutAuth(pathname)) {
      const res = NextResponse.next();
      injectToken(res, {
        refreshToken: verifiedToken.refreshToken,
      });
      return res;
    }
    // If the token is not valid or does not exist, redirect to the sign-in page
    else {
      const url = new URL(`/sign-in`, request.url);
      // url.searchParams.set("callbackUrl ", encodeURI(request.url));
      const res = NextResponse.redirect(url);
      res.cookies.delete("refresh");
      return res;
    }
  };
};
