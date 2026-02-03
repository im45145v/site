import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Ashish Mala - Builder, Community Leader, Hackathon Enthusiast",
  description: "Personal portfolio of Ashish Mala - building things, leading communities, and organizing hackathons.",
  keywords: ["Ashish Mala", "Developer", "Community Leader", "Hackathon", "Hackerabad", "Postman Student Leader"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
