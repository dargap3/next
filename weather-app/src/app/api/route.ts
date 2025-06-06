import { geolocation } from "@vercel/functions";

import type { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const ip = ipAddress(request);
  const details = geolocation(req);

  // Fallback si no hay datos de geo

  const geoRes = await fetch(`http://ip-api.com/json/${ip}`);
  const geoData = await geoRes.json();
  const lat = geoData.lat;
  const lon = geoData.lon;
  const city = geoData.city;
  const country = geoData.country;

  return Response.json({ lat, lon });
}
