export default async function Home() {
  /* const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=medellin&appid=${process.env.NEXT_PUBLIC_WEATHER_KEY}&units=metric`
  );
  const data = await response.json(); */

  const res = await fetch(`http://localhost:3000/api`, { cache: "no-store" });

  // const data = await res.json();

  console.log(res);

  return <main className="px-3">Hello</main>;
}
