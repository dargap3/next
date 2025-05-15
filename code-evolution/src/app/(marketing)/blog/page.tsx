import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog",
};

export default async function BlogPage() {
  await new Promise((resolve) =>
    setTimeout(() => {
      resolve("intentionally delay");
    }, 2000)
  );
  return <h1>Blog Page</h1>;
}
