import type { Metadata, Viewport } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "Devsol - Building the Future, One Product at a Time",
  description: "Devsol develops next-gen AI and web solutions for tomorrow's challenges.",
  keywords: "AI, web development, next-gen, technology, innovation, Devsol",
  authors: [{ name: "Devsol Team" }],
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${poppins.className} bg-black text-white antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
