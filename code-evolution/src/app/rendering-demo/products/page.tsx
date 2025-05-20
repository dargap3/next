import Link from "next/link";

export default function ProductsPage() {
  return (
    <>
      <h1>Featured Products</h1>
      <Link href={"rendering-demo/products/1"}>Product 1</Link>
      <Link href={"rendering-demo/products/2"}>Product 2</Link>
      <Link href={"rendering-demo/products/3"}>Product 3</Link>
    </>
  );
}
