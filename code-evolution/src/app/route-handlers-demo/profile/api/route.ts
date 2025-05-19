import { headers, cookies } from "next/headers";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  // First Way to get request params
  const requestHeaders = new Headers(request.headers);
  console.log(requestHeaders.get("Authorization"));

  // Second way to get request params
  const headersList = await headers();
  console.log(headersList.get("Authorization"));

  // First Way to get cookies
  const theme = request.cookies.get("theme");
  console.log(theme, "theme");

  // Second way to get or set cookies
  const cookieStore = await cookies();
  cookieStore.set("resultsPerPage", "20");
  console.log(cookieStore.get("resultsPerPage"), "results per page");

  return new Response("<h1>Profile API data</h1>", {
    headers: {
      "Content-Type": "text/html",
      "Set-Cookie": "theme=dark",
    },
  });
}
