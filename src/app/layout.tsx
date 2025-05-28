// app/layout.tsx
import "./globals.css"; // if you're using global styles
import { Toaster } from "react-hot-toast";
import AdminNavbar from "@/components/Navbar";

export const metadata = {
  title: "Freshkart Admin",
  description: "Admin panel for Freshkart",
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
