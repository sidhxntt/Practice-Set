'use client'
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });
import { RecoilRoot } from "recoil";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <RecoilRoot>
              <body className={inter.className}>{children}</body>
      </RecoilRoot>

    </html>
  );
}
