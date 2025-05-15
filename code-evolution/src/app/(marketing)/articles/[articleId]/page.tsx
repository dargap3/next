// CLIENT SIDE COMPONENT
"use client";

import Link from "next/link";
import { use } from "react";

export default function NewsArticle({
  params,
  searchParams,
}: {
  params: Promise<{ articleId: string }>;
  searchParams: Promise<{ lang?: "en" | "es" | "fr" }>;
}) {
  const { articleId } = use(params);
  const { lang = "en" } = use(searchParams);
  return (
    <div>
      <h1>News in article {articleId}</h1>
      <p>Reading in {lang}</p>

      <div>
        <Link href={`/articles/${articleId}?lang=${lang}`}>English</Link>
        <Link href={`/articles/${articleId}?lang=${lang}`}>Spanish</Link>
        <Link href={`/articles/${articleId}?lang=${lang}`}>French</Link>
      </div>
    </div>
  );
}

// SERVER SIDE COMPONENT

/* import Link from "next/link";

export default async function NewsArticle({
  params,
  searchParams,
}: {
  params: Promise<{ articleId: string }>;
  searchParams: Promise<{ lang?: "en" | "es" | "fr" }>;
}) {
  const { articleId } = await params;
  const { lang = "en" } = await searchParams;
  return (
    <div>
      <h1>News in article {articleId}</h1>
      <p>Reading in {lang}</p>

      <div>
        <Link href={`/articles/${articleId}?lang=${lang}`}>English</Link>
        <Link href={`/articles/${articleId}?lang=${lang}`}>Spanish</Link>
        <Link href={`/articles/${articleId}?lang=${lang}`}>French</Link>
      </div>
    </div>
  );
} */
