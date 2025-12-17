import { cookies } from "next/headers";

export interface AdminUser {
  id: string;
  email: string;
  name: string;
}

export async function setAuthCookie(token: string) {
  const cookieStore = await cookies();

  cookieStore.set({
    name: "admin-token",
    value: token,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7,
    path: "/",
  });
}

export async function removeAuthCookie() {
  const cookieStore = await cookies();
  cookieStore.delete("admin-token");
}

export async function getAuthCookie(): Promise<string | null> {
  const cookieStore = await cookies();
  return cookieStore.get("admin-token")?.value ?? null;
}

export async function isAuthenticated(): Promise<boolean> {
  const token = await getAuthCookie();
  return Boolean(token);
}
