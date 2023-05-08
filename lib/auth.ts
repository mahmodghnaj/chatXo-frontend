import type { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

const API_BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
const JWT_SECRET_KEY: string | undefined = process.env.JWT_SECRET_KEY!;

export function getJwtSecretKey(): string {
  if (!JWT_SECRET_KEY || JWT_SECRET_KEY.length === 0) {
    throw new Error("The environment variable JWT_SECRET_KEY is not set.");
  }

  return JWT_SECRET_KEY;
}

export const refreshToken = async (token: string) => {
  const body = {
    refreshToken: token,
  };

  try {
    return fetch(`${API_BASE_URL}auth/refresh-token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })
      .then((response) => response.json())
      .then((data) => data);
  } catch (error) {
    return null;
  }
};

interface UserJwtPayload {
  jti: string;
  iat: number;
}

export async function verifyAuth(req: NextRequest) {
  const token = req.cookies.get("accessToken")?.value;
  const RToken = req.cookies.get("refreshToken")?.value;
  if (token) {
    try {
      const verified = await jwtVerify(
        token,
        new TextEncoder().encode(getJwtSecretKey())
      );
      return verified.payload as UserJwtPayload;
    } catch (err) {
      if (RToken) {
        const res = await refreshToken(RToken);
        if (res.accessToken) return res;
        return null;
      }
    }
  }
  if (RToken) {
    const res = await refreshToken(RToken);
    if (res.accessToken) return res;
    return null;
  }
}
