import { Card } from "@/components/card";
import Link from "next/link";

export default function Archived() {
  return (
    <Card>
      <div>Archived notifications</div>
      <div>
        <Link href="/complex-dashboard" className="underline">
          Default
        </Link>
      </div>
    </Card>
  );
}
