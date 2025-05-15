import { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    absolute: "First Blog",
  },
};

export default function FirstBlogPage() {
  return <h2>First Blog Page</h2>;
}
