import type { Metadata } from "next";
import "./globals.css";
import React from "react";

export const metadata: Metadata = {
  title: "Chess Database",
  description: "Chess Database to save Games and Tournaments for private usage",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
    <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
        <title>Chess Database</title>
    </head>
      <body className={`antialiased`}>
        <main className="bg-light-background dark:bg-dark-background">
          {children}
        </main>
      </body>
    </html>
  );
}
