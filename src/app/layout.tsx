import type { Metadata } from "next";
import "./globals.css";
import Navbar from "./components/Navbar";
import PriceTicker from "./components/PriceTricker";
import Footer from "./components/Footer";
import { Toaster } from "react-hot-toast";

export const metadata: Metadata = {
  title: "বাজার দর | Bazar Dor",
  description: "প্রয়োজনীয় পণ্যের দাম এক নজরে।",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="bn">
      <body>
        <Navbar />
        <PriceTicker />
        {children}
        <Toaster />
        <Footer />
      </body>
    </html>
  );
}