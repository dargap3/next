import { Card } from "@/components/card";
import Link from "next/link";

export default function Notifications() {
  return (
    <Card>
      <div>Notifications</div>
      <div>
        <Link href="/complex-dashboard/archived" className="underline">
          Archived
        </Link>
      </div>
    </Card>
  );
}
