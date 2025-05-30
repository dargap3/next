import { SignUp } from "@clerk/nextjs";

export default function SingUpPage() {
  return (
    <div className="flex justify-center items-center py-8">
      <SignUp />
    </div>
  );
}
