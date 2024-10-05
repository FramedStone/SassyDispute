import type { Metadata } from "next";

import { Karla } from "next/font/google"; // Importing Karla from Google Fonts
import localFont from "next/font/local";
import "./globals.css";

const karla = Karla({
  weight: ["200", "300", "400", "500", "600", "700", "800"], // Specify the weights you want
  display: "swap",
  subsets: ["latin"], // Specify the subset
  variable: "--font-karla",
});

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "ETHKL 2024",
  description: "Developed by PEYOUTH",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${karla.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
