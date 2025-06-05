/* export async function GET(request) {
  const forwardedFor = request.headers.get('x-forwarded-for');
  let ip = forwardedFor ? forwardedFor.split(',')[0] : null;
  if (!ip) ip = request.headers.get('x-real-ip');
  if (!ip) ip = request.ip || null;
  if (!ip) ip = '0.0.0.0';

  const geoRes = await fetch(`http://ip-api.com/json/${ip}`);
  const geoData = await geoRes.json();

  return Response.json({
    city: geoData.city,
    country: geoData.country,
    lat: geoData.lat,
    lon: geoData.lon,
  });
} */

import type { NextRequest } from "next/server";

import { geolocation, ipAddress } from "@vercel/functions";

export async function GET(req: NextRequest) {
  const geo = geolocation(req);

  const lat = geo?.latitude;
  const lon = geo?.longitude;
  const city = geo?.city;
  const country = geo?.country;

  // Fallback si no hay datos de geo
  /* if (!lat || !lon) {
    const geoRes = await fetch(`http://ip-api.com/json/${ip}`)
    const geoData = await geoRes.json()
    lat = geoData.lat
    lon = geoData.lon
    city = geoData.city
    country = geoData.country
  } */

  return Response.json({
    city,
    country,
    lat,
    lon,
  });
}
