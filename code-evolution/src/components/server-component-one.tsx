import fs from "fs";
import { ServerComponentTwo } from "./server-component-two";
import { ClientComponentTwo } from "./client-component-two";

export const ServerComponentOne = () => {
  fs.readFileSync("src/components/server-component-one.tsx", "utf8");

  return (
    <>
      <h1>Server component one</h1>
      <ServerComponentTwo />
      <ClientComponentTwo />
    </>
  );
};
