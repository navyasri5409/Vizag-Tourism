// src/app/(main)/layout.tsx
import React from "react";

export const metadata = {
  title: "Vizag Tourism",
  description: "Explore Visakhapatnam with AI-powered suggestions",
};

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-muted">{children}</body>
    </html>
  );
}


