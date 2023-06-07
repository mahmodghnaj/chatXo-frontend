import type { NextRequest, NextResponse } from "next/server";

const API_BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

// Function to refresh the authentication token
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

// Function to check the session and validate the refreshToken
export const checkSession = (refreshToken: string) => {
  try {
    return fetch(`${API_BASE_URL}auth/info-session`, {
      headers: {
        "Content-Type": "application/json",
        // Cookie: `refresh=${refreshToken}`, // don't use please write commit in line 37 in file _app
        Authorization: `Bearer ${refreshToken}`,
      },
      credentials: "include", // Include cookies in the request
    })
      .then((response) => response.json())
      .then((data) => data);
  } catch (error) {
    return null;
  }
};

// Function to verify the authentication of the request
export async function verifyAuth(req: NextRequest) {
  const token = req.cookies.get("refresh")?.value;
  if (token) {
    try {
      const verified = await checkSession(token);
      if (verified?.refreshToken) {
        return verified;
      } else if (token) {
        const res = await refreshToken(token);
        if (res.refreshToken) {
          return res;
        }
        return null;
      }
      return null;
    } catch (error) {
      return null;
    }
  }
}
