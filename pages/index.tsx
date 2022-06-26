import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { APP_NAME } from "config/constants";

const Home: NextPage = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <Head>
        <title>{APP_NAME}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex w-full flex-1 flex-col items-center justify-center px-20 text-center">
        <h1 className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-purple-700 hover:from-purple-700 hover:to-blue-700 animate-pulse">
          {APP_NAME}
        </h1>

        <div className="mt-6 flex max-w-4xl flex-wrap items-center justify-around sm:w-full">
          <Link href="/queries">
            <a className="mt-6 w-96 rounded-xl border p-6 text-left hover:text-blue-600 focus:text-blue-600 transition-colors delay-100 ease-in">
              <h3 className="text-2xl font-bold">Run Queries &rarr;</h3>
              <p className="mt-4 text-xl">Run all your SQL queries here</p>
            </a>
          </Link>

          <Link href="/tables">
            <a className="mt-6 w-96 rounded-xl border p-6 text-left hover:text-blue-600 focus:text-blue-600 transition-colors delay-100 ease-in">
              <h3 className="text-2xl font-bold">Product table &rarr;</h3>
              <p className="mt-4 text-xl">
                Lists out all entries in product table
              </p>
            </a>
          </Link>
        </div>
      </main>

      <footer className="flex h-24 w-full items-center justify-center border-t">
        <p>Made with ❤️ by Harsha Vardhan</p>
      </footer>
    </div>
  );
};

export default Home;
