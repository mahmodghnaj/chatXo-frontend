//TODO:: this is middleware delete refresh in cookie must api logout delete refresh in cookie but api frontend different backend
import {
  NextFetchEvent,
  NextMiddleware,
  NextRequest,
  NextResponse,
} from "next/server";
import { MiddlewareFactory } from "./types";
export const logout: MiddlewareFactory = (next: NextMiddleware) => {
  return async (request: NextRequest, _next: NextFetchEvent) => {
    const pathname = request.nextUrl.pathname;
    if (pathname.startsWith("/_next/")) return NextResponse.next();
    if (pathname === "/logout") {
      const url = new URL(`/sign-in?reload=true`, request.url);
      const res = NextResponse.redirect(url);
      res.cookies.delete("refresh");
      return res;
    }
    return next(request, _next);
  };
};
