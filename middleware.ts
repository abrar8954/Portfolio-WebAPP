import { auth } from "@/lib/auth";

export default auth((req) => {
  const isLoggedIn = !!req.auth;
  const isAdminRoute = req.nextUrl.pathname.startsWith("/admin");
  const isDefaultSignIn = req.nextUrl.pathname === "/api/auth/signin";

  if (isDefaultSignIn) {
    return Response.redirect(new URL("/login", req.nextUrl));
  }

  if (isAdminRoute && !isLoggedIn) {
    return Response.redirect(new URL("/login", req.nextUrl));
  }
});

export const config = {
  matcher: ["/admin/:path*", "/api/auth/signin"],
};
