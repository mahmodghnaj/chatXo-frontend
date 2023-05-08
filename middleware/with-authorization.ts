import { verifyAuth } from "@/lib/auth";
import {
  NextFetchEvent,
  NextMiddleware,
  NextRequest,
  NextResponse,
} from "next/server";
import { MiddlewareFactory } from "./types";

const routesWithoutAuth = (pathname: string) => {
  return !["/_next/", "/sign-up", "/sign-in"].some((path) =>
    pathname.startsWith(path)
  );
};

export const withAuthorization: MiddlewareFactory = (next: NextMiddleware) => {
  return async (request: NextRequest, _next: NextFetchEvent) => {
    const pathname = request.nextUrl.pathname;
    if (routesWithoutAuth(pathname)) {
      const verifiedToken = await verifyAuth(request);
      if (verifiedToken) {
        if (verifiedToken.accessToken && verifiedToken.refreshToken) {
          const response = NextResponse.next();
          if (verifiedToken.accessToken)
            response.cookies.set({
              name: "accessToken",
              value: verifiedToken.accessToken,
            });
          if (verifiedToken.refreshToken)
            response.cookies.set({
              name: "refreshToken",
              value: verifiedToken.refreshToken,
              expires: new Date(new Date().setDate(new Date().getDate() + 60)),
              httpOnly: true,
            });
          return response;
        }
      } else {
        const url = new URL(`/sign-in`, request.url);
        url.searchParams.set("callbackUrl ", encodeURI(request.url));
        return NextResponse.redirect(url);
      }
    }
    return next(request, _next);
  };
};
