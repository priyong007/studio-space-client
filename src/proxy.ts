import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";

export async function proxy(request : NextRequest) {
    const session = await auth.api.getSession({
        headers: await headers()
    })
    // const user = session?.user
    if(!session) {
        return NextResponse.redirect(new URL("/login", request.url));
    }

    return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard", "/studios/:path", "/my-listing", "/my-booking"],
//   matcher: ["/dashboard",  "/my-listing", "/my-booking"],
  
  // Specify the routes the middleware applies to
};