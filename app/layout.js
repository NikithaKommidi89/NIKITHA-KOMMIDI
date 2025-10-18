import "./globals.css";

import { Inter, JetBrains_Mono } from "next/font/google";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const jetmono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-jet" });

export const metadata = {
  title: "Student App",
  description: "Student app development",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${jetmono.variable}`}>
      <body className="bg-gray-100 font-sans text-gray-800 min-h-screen flex flex-col">
        {/* 🌟 Navigation Bar */}
        <nav className="navbar shadow-md">
          <div className="container mx-auto flex justify-between items-center px-6 py-4">
            <Link
              href="/"
              className="text-2xl font-bold text-white tracking-wide hover:text-yellow-200 transition-colors"
            >
              Student Management System
            </Link>

            <div className="flex space-x-6">
             {/*} <Link
                href="/"
                className="nav-link"
              >
                Home
              </Link> */}

              <Link
                href="/register"
                className="nav-link"
              >
                Register
              </Link>
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <main className="flex-1">{children}</main>

        {/* Footer */}
        <footer className="bg-gray-800 text-white p-4 text-center shadow-lg mt-auto">
          <div className="container mx-auto">
            <p>&copy; 2025 Student Management System. All rights reserved.</p>
            <p className="text-sm text-gray-400 mt-1">Built with Next.js</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
