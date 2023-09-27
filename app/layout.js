"use client";
import "./globals.css";
import { Montserrat } from "@next/font/google";
import { ThemeProvider } from "next-themes";
import AppContextProvider from "@/context/AppContext";

const mont = Montserrat({ subsets: ["latin"], display: "swap" });
export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark" style={{ "color-scheme": "dark" }}>
      <head>
        <link
          rel="stylesheet"
          type="text/css"
          charset="UTF-8"
          href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css"
        />
        <link
          rel="stylesheet"
          type="text/css"
          href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <title>Engineer&apos;s Way | Home </title>
        <meta charSet="UTF-8" />
        <meta
          name="description"
          content="A platform for Engineering students where they can see internal construction of each and every machine how they are made (i.e induction motor, transformer, Bluetooth headphone)"
        />
        <meta name="keywords" content="Engineering,3D,Motor" />
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9414302164408629"
          crossOrigin="anonymous"
        ></script>
      </head>
      <body className={mont.className}>
        <ThemeProvider attribute="class">
          <AppContextProvider>{children}</AppContextProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
