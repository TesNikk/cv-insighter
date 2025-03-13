import React from "react";
import Link from "next/link";

const Header = () => {
  return (
    <header className=" py-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center px-4">
        {/* Logo or Brand Name */}
        <Link href="/">
          <h1 className="text-2xl font-bold cursor-pointer">CV-Insighter</h1>
        </Link>

        {/* Navigation Links */}
        <nav>
          <ul className="flex space-x-6">
            <li>
              <Link href="/" className="hover:underline">
                CV Form
              </Link>
            </li>
            <li>
              <Link href="/report" className="hover:underline">
                Report
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
