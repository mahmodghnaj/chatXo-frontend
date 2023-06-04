import { verifyAuth } from "@/lib/auth";
import {
  NextFetchEvent,
  NextMiddleware,
  NextRequest,
  NextResponse,
} from "next/server";
import { MiddlewareFactory } from "./types";
const routesWithoutAuth = (pathname: string) => {
  return ["/sign-up", "/sign-in"].some((path) => pathname.startsWith(path));
};
const injectToken = (response: NextResponse, { refreshToken }: any) => {
  response.cookies.set({
    name: "refreshToken",
    value: refreshToken,
    expires: new Date(new Date().setDate(new Date().getDate() + 60)),
    httpOnly: true,
  });
};
export const withAuthorization: MiddlewareFactory = (next: NextMiddleware) => {
  return async (request: NextRequest, _next: NextFetchEvent) => {
    const pathname = request.nextUrl.pathname;
    const response = NextResponse.next();
    if (pathname.startsWith("/_next/")) return NextResponse.next();

    const verifiedToken = await verifyAuth(request);
    if (verifiedToken && routesWithoutAuth(pathname)) {
      const url = new URL(`/`, request.url);
      return NextResponse.redirect(url);
    }
    if (routesWithoutAuth(pathname)) return NextResponse.next();
    if (verifiedToken && verifiedToken.refreshToken) {
      injectToken(response, {
        refreshToken: verifiedToken.refreshToken,
      });
      return response;
    } else if (verifiedToken && !routesWithoutAuth(pathname)) {
      return NextResponse.next();
    } else {
      const url = new URL(`/sign-in`, request.url);
      url.searchParams.set("callbackUrl ", encodeURI(request.url));
      return NextResponse.redirect(url);
    }
  };
};
