import Link from "next/link";

export default function InnerF2() {
  return (
    <h1>
      Inner F2 page{" "}
      <Link href={"/f5"} className="underline">
        F5
      </Link>
    </h1>
  );
}
