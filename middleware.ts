import { NextRequest, NextResponse } from "next/server";
export { default } from "next-auth/middleware";

export const config = {
  // * 0 albo więcej parametrów :id*
  //+ 1 albo więcej parametrów :id+
  //? 0 albo jeden parametr
  matcher: ["/dashboard/"],
};
