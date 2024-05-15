import React from "react";
import Navbar from "./(Components)/Navbar/Navbar";
import Footer from "./(Components)/Footer/Footer";

export const metadata = {
  title: {
    default: "Next.js",
    template: "%s | Next.js" ,
  },
  description: "Next.js is a React framework",
};

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
