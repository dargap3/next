import { SignIn } from "@clerk/nextjs";

export default function SingInPage() {
  return (
    <div className="flex justify-center items-center py-8">
      <SignIn />
    </div>
  );
}
