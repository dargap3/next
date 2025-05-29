import { ClientComponentOne } from "@/components/client-component-one";
import { ServerComponentOne } from "@/components/server-component-one";

export default function InterLeavingPage() {
  return (
    <>
      <h1>Interleaving page</h1>

      <ClientComponentOne>
        <ServerComponentOne />
      </ClientComponentOne>
    </>
  );
}
