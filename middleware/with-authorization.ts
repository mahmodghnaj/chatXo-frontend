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

const injectToken = (
  response: NextResponse,
  { accessToken, refreshToken }: any
) => {
  response.cookies.set({
    name: "accessToken",
    value: accessToken,
  });
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
    if (pathname.startsWith("/_next/")) return NextResponse.next();
    const response = NextResponse.next();
    ///
    const verifiedToken = await verifyAuth(request);
    if (!routesWithoutAuth(pathname)) {
      if (verifiedToken) {
        if (verifiedToken.accessToken && verifiedToken.refreshToken) {
          injectToken(response, {
            accessToken: verifiedToken.accessToken,
            refreshToken: verifiedToken.refreshToken,
          });
        }
        return response;
      } else {
        const url = new URL(`/sign-in`, request.url);
        url.searchParams.set("callbackUrl ", encodeURI(request.url));
        return NextResponse.redirect(url);
      }
    }
    return next(request, _next);
  };
};
