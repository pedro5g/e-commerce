import "./globals.css";
import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import { NavBar } from "./components/nav/NavBar";
import { Footer } from "./components/footer/Footer";
import { CartProvider } from "@/providers/CartProvider";
import { Toaster } from "react-hot-toast";

const poppins = Poppins({ subsets: ["latin"], weight: ["400", "700"] });

export const metadata: Metadata = {
  title: "E-Commerce",
  description: "Ecommerce app",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${poppins.className} text-zinc-700 antialiased`}>
        <Toaster
          toastOptions={{
            style: {
              background: "#f1f5f9",
              color: "#334155",
            },
          }}
        />
        <CartProvider>
          <div className="flex flex-col min-h-screen">
            <NavBar />
            <main className="flex-1 min-h-[550px] h-full">{children}</main>
            <Footer />
          </div>
        </CartProvider>
      </body>
    </html>
  );
}
