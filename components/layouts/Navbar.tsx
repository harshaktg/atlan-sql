import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { APP_NAME } from "config/constants";

function Navbar() {
  const router = useRouter();

  return (
    <nav className="border-gray-200 px-8 bg-gray-800 h-16">
      <div className="container flex flex-wrap items-center h-full">
        <div className="flex items-center">
          <Link href="/">
            <a>
              <span className="self-center text-xl font-bold whitespace-nowrap text-white">
                {APP_NAME}
              </span>
            </a>
          </Link>
        </div>
        <div className="block w-auto pl-24">
          <ul className="flex flex-row space-x-4 mt-0 text-sm font-medium m-0">
            <li>
              <Link href="/queries">
                <a
                  className={`block py-2 pr-4 pl-3 p-0 ${
                    router.pathname === "/queries"
                      ? "text-yellow-300"
                      : "text-white"
                  }`}
                >
                  Queries
                </a>
              </Link>
            </li>
            <li>
              <Link href="/tables">
                <a
                  className={`block py-2 pr-4 pl-3 p-0 ${
                    router.pathname === "/tables"
                      ? "text-yellow-300"
                      : "text-white"
                  }`}
                >
                  Product Table
                </a>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
