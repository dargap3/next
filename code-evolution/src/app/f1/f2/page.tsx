import Link from "next/link";

export default function F2() {
  return (
    <h1>
      F2 page{" "}
      <Link href={"/f4"} className="underline ml-2.5">
        F4
      </Link>
    </h1>
  );
}
