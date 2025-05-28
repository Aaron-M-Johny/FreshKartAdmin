// app/layout.tsx
import "./globals.css";
import { Toaster } from "react-hot-toast";
import AdminNavbar from "@/components/Navbar";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "FreshKart Admin",
  description: "Manage FreshKart",
  icons: {
    icon: [
      { url: "/favicons/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicons/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: "/icon/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head />
      <body className="bg-[var(--bg-color-main)] h-screen w-screen">
        <div className="hidden lg:flex flex-col h-full w-full">
          <AdminNavbar />
          <main className="flex-1 hidden lg:block overflow-y-auto">{children}</main>
        </div>
        <div className="flex lg:hidden items-center justify-center h-full">
          <p className="text-center text-gray-500 p-4">
            Please use a larger screen to access the admin dashboard.
          </p>
        </div>

        <Toaster position="top-right" reverseOrder={false} />
      </body>
    </html>
  );
}
