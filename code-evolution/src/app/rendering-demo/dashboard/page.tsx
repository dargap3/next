"use client";

import { useState } from "react";

export default function DashboardPage() {
  const [name, setName] = useState("");

  console.log("Dashboard client component");

  return (
    <div>
      <h1>Dashboard</h1>
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="border-2"
      />
      <p>Hello, {name}!</p>
    </div>
  );
}
