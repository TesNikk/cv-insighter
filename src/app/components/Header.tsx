import React from "react";
import Link from "next/link";

const Header = () => {
  return (
    <header className="bg-gray-800 py-4 shadow-md text-white">
      <div className="container mx-auto flex justify-between items-center px-4">
        {/* Logo or Brand Name */}
        <Link href="/" >
          <h1 className="text-2xl font-bold cursor-pointer transition hover:underline hover:text-gray-300">CV Insighter</h1>
        </Link>

        {/* Navigation Links */}
        <nav>
          <ul className="flex space-x-6">
            <li>
              <Link href="/" className="hover:underline hover:text-gray-300">
                Upload CV
              </Link>
            </li>
            <li>
              <Link href="/all-cv" className="hover:underline hover:text-gray-300">
                All CV
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
