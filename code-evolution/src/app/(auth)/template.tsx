"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

import "./global.css";

const navLinks = [
  { name: "Register", href: "/register" },
  { name: "Login", href: "/login" },
  { name: "Forgot Password", href: "/forgot-password" },
];

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [input, setInput] = useState("");
  return (
    <html lang="en">
      <body>
        <main>
          <section>
            <input
              className="border-1"
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
          </section>

          {navLinks.map((navLink) => {
            const isActive = pathname === navLink.href;

            return (
              <Link
                className={isActive ? "font-bold mr-4" : "text-blue-500 mr-4"}
                key={navLink.href}
                href={navLink.href}
              >
                {navLink.name}
              </Link>
            );
          })}

          {children}
        </main>
      </body>
    </html>
  );
}
