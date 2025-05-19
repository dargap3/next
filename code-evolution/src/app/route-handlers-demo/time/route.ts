export const dynamic = "force-static"; // This ensures that the response is cached and served instantly to all users
export const revalidate = 10; // Revalidate cached data using incremental static regeneration

export async function GET() {
  return Response.json({ time: new Date().toLocaleTimeString() });
}
