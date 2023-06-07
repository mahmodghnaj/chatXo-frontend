import {
  NextFetchEvent,
  NextMiddleware,
  NextRequest,
  NextResponse,
} from "next/server";
import { MiddlewareFactory } from "./types";
export const socialAuth: MiddlewareFactory = (next: NextMiddleware) => {
  return async (request: NextRequest, _next: NextFetchEvent) => {
    const pathname = request.nextUrl.pathname;
    if (pathname.startsWith("/_next/")) return NextResponse.next();
    if (pathname === "/social") {
      const token = request.nextUrl.searchParams.get("token");
      const refreshToken = request.nextUrl.searchParams.get("refreshToken");
      request.nextUrl.searchParams.delete("token");
      request.nextUrl.searchParams.delete("refreshToken");
      request.nextUrl.pathname = "/";
      const res = NextResponse.redirect(request.nextUrl);
      if (token && refreshToken) {
        //res.cookies.set("accessToken", token);
        res.cookies.set("refresh", refreshToken);
      }
      return res;
    }
    return next(request, _next);
  };
};
