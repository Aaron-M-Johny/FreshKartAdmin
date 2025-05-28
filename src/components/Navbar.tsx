"use client"

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const AdminNavbar = () => {
  const pathname = usePathname();

  return (
    <div className="h-20 w-full bg-[var(--bg-color-nav)] text-[var(--font-color)] border-b border-green-500">
      <nav className="max-w-[1500px] mx-auto w-[90%] pl-10 h-full flex items-center justify-between">
        {/* Logo & Title */}
        <Link href="/dashboard">
          <div className="flex items-center space-x-3">
            <Image height={50} width={50} src="/logo/FreshKart-logo.png" alt="FreshKart Logo" className="h-12" />
            <h2 className="text-3xl font-semibold">FreshKart</h2>
          </div>
        </Link>

        {/* Navigation Menu */}
        <ul className="flex space-x-8 text-lg font-medium">
          <li className="py-2">
            <Link
              href="/dashboard"
              className={`hover:text-blue-500 transition-colors ${
                pathname === "/dashboard" ? "text-blue-500 font-semibold" : ""
              }`}
            >
              Dashboard
            </Link>
          </li>

          {/* Manage Products with Dropdown */}
          <li className="relative py-2 group cursor-pointer">
            <span className={`hover:text-blue-500 transition-colors ${
                    ["/add", "/editStock", "/delete"].includes(pathname) ? "text-blue-500 font-semibold" : ""
                  }`}>
              Manage Products ▼
            </span>
            <ul className="absolute border-b border-l border-r border-green-500 left-0 mt-2 h-fit w-48 bg-[var(--bg-color-nav)] shadow-lg rounded-md opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transition-opacity z-10">
              <li className="rounded-t-md">
                <Link
                  href="/add"
                  className={`block px-4 py-3 rounded-t-md hover:bg-blue-600 hover:text-white ${
                    pathname === "/add" ? "text-blue-500 font-semibold" : ""
                  }`}
                >
                  Add new Product
                </Link>
              </li>
              <li>
                <Link
                  href="/editStock"
                  className={`block px-4 py-3 hover:bg-blue-600 hover:text-white ${
                    pathname === "/editStock" ? "text-blue-500 font-semibold" : ""
                  }`}
                >
                  Manage Stock
                </Link>
              </li>
              <li className="rounded-b-md">
                <Link
                  href="/delete"
                  className={`block px-4 py-3 rounded-b-md hover:bg-blue-600 hover:text-white ${
                    pathname === "/delete" ? "text-blue-500 font-semibold" : ""
                  }`}
                >
                  Delete Product
                </Link>
              </li>
            </ul>
          </li>

          <li className="py-2">
            <Link
              href="/orders"
              className={`hover:text-blue-500 transition-colors ${
                pathname === "/orders" ? "text-blue-500 font-semibold" : ""
              }`}
            >
              Manage Orders
            </Link>
          </li>
          <li className="py-2">
            <Link
              href="/users"
              className={`hover:text-blue-500 transition-colors ${
                pathname === "/users" ? "text-blue-500 font-semibold" : ""
              }`}
            >
              Manage Users
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};


export default AdminNavbar;
