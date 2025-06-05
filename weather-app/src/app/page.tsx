export default async function Home({
  searchParams,
}: {
  searchParams: unknown;
}) {
  /* const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=medellin&appid=${process.env.NEXT_PUBLIC_WEATHER_KEY}&units=metric`
  );
  const data = await response.json(); */

  const response = await searchParams;

  console.log(response);

  return <main className="px-3">Hello</main>;
}
