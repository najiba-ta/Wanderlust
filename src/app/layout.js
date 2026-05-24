import { Josefin_Sans } from "next/font/google";
import "./globals.css";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

import { Toaster } from "react-hot-toast";

const josefin = Josefin_Sans({
  subsets: ["latin"],
  variable: "--font-josefin",
});

export const metadata = {
  title: "Wanderlust | Premium Travel Experience",
  description:
    "Explore breathtaking destinations and premium travel experiences around the world.",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${josefin.variable} scroll-smooth`}
    >
      <body className="relative min-h-screen overflow-x-hidden bg-[#081120] font-sans text-white antialiased">

        {/* Background Glow Effects */}
        <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">

          {/* Top Glow */}
          <div className="absolute left-[-120px] top-[-120px] h-[350px] w-[350px] rounded-full bg-cyan-500/10 blur-3xl" />

          {/* Right Glow */}
          <div className="absolute right-[-120px] top-[30%] h-[320px] w-[320px] rounded-full bg-blue-500/10 blur-3xl" />

          {/* Bottom Glow */}
          <div className="absolute bottom-[-150px] left-[35%] h-[380px] w-[380px] rounded-full bg-sky-500/10 blur-3xl" />
        </div>

        {/* Main Layout */}
        <div className="relative flex min-h-screen flex-col">

          {/* Navbar */}
          <Navbar />

          {/* Main Content */}
          <main className="flex-1">
            {children}
          </main>

          {/* Footer */}
          <Footer />
        </div>

        {/* Toast */}
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 3000,
            style: {
              background: "#0b1220",
              color: "#fff",
              border: "1px solid rgba(34,211,238,0.15)",
              borderRadius: "18px",
              padding: "14px 18px",
              backdropFilter: "blur(12px)",
              boxShadow:
                "0 10px 40px rgba(0,0,0,0.35)",
            },
          }}
        />
      </body>
    </html>
  );
}