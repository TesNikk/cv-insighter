
'use client';
import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white text-center py-4">
        <div className="mb-2">
        Nahid | Rafin
        </div>
      <p>&copy; {new Date().getFullYear()} CV-Insighter. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
