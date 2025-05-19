import Link from "next/link";

export default function HomePage() {
  return (
    <>
      <h1>Home Page</h1>
      <Link className="underline" href="/blog">
        Blog
      </Link>
      <Link className="underline" href="/products">
        Products
      </Link>

      <Link className="underline" href={"/articles/breaking-news-123?lang=en"}>
        Read in English
      </Link>
      <Link className="underline" href={"/articles/breaking-news-123?lang=fr"}>
        Read in French
      </Link>
    </>
  );
}
