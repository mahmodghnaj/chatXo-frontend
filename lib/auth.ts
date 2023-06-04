import type { NextRequest, NextResponse } from "next/server";
const API_BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

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

export const checkSession = (refreshToken: string) => {
  try {
    return fetch(`${API_BASE_URL}auth/session`, {
      headers: {
        "Content-Type": "application/json",
        Cookie: `refreshToken=${refreshToken}`,
      },
      credentials: "include", // Include cookies in the request
    })
      .then((response) => {
        if (response.status === 403 || response.status === 404) {
          return null;
        }
        return response.json();
      })
      .then((data) => data);
  } catch (error) {
    return null;
  }
};

export async function verifyAuth(req: NextRequest) {
  const RToken = req.cookies.get("refreshToken")?.value;
  if (RToken) {
    const verified = await checkSession(RToken);
    if (verified) return verified;
    else if (RToken) {
      const res = await refreshToken(RToken);
      if (res.refreshToken) return res;
      return null;
    }
    return null;
  }
}
