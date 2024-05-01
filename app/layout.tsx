"use client";
import { ClerkProvider, SignedIn, UserButton } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/api";
import "./globals.css";
import { Inter } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import Script from "next/script";
import { Twitter } from "./icons";
import { Discord } from "./icons";
import { Metadata } from "next";

const inter = Inter({ subsets: ["latin"] });

const DotIcon = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none">
      <path
        d="M21.2799 6.40005L11.7399 15.94C10.7899 16.89 7.96987 17.33 7.33987 16.7C6.70987 16.07 7.13987 13.25 8.08987 12.3L17.6399 2.75002C17.8754 2.49308 18.1605 2.28654 18.4781 2.14284C18.7956 1.99914 19.139 1.92124 19.4875 1.9139C19.8359 1.90657 20.1823 1.96991 20.5056 2.10012C20.8289 2.23033 21.1225 2.42473 21.3686 2.67153C21.6147 2.91833 21.8083 3.21243 21.9376 3.53609C22.0669 3.85976 22.1294 4.20626 22.1211 4.55471C22.1128 4.90316 22.0339 5.24635 21.8894 5.5635C21.7448 5.88065 21.5375 6.16524 21.2799 6.40005V6.40005Z"
        stroke="#000000"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M11 4H6C4.93913 4 3.92178 4.42142 3.17163 5.17157C2.42149 5.92172 2 6.93913 2 8V18C2 19.0609 2.42149 20.0783 3.17163 20.8284C3.92178 21.5786 4.93913 22 6 22H17C19.21 22 20 20.2 20 18V13"
        stroke="#000000"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <ClerkProvider
        appearance={{
          variables: { colorPrimary: "#000000" },
          elements: {
            formButtonPrimary:
              "bg-black border border-black border-solid hover:bg-white hover:text-black",
            socialButtonsBlockButton:
              "bg-white border-gray-200 hover:bg-transparent hover:border-black text-gray-600 hover:text-black",
            socialButtonsBlockButtonText: "font-semibold",
            formButtonReset:
              "bg-white border border-solid border-gray-200 hover:bg-transparent hover:border-black text-gray-500 hover:text-black",
            membersPageInviteButton:
              "bg-black border border-black border-solid hover:bg-white hover:text-black",
            card: "bg-[#fafafa]",
          },
        }}
      >
        <body className={`${inter.className} min-h-screen flex flex-col`}>
          <header className="flex items-center h-20 gap-4 px-4 border-b border-black border-solid sm:px-8 border-opacity-20">
            <Link href="/" className="flex items-center h-20 gap-2 sm:gap-4">
              <Image
                src="/logo.svg"
                alt="ilab Logo"
                width={200}
                height={80}
                priority
              />
            </Link>
            <div className="grow" />
            <SignedIn>
              <button className="btn">Book a lab</button>
              <button className="btn">Feedback</button>
              <UserButton afterSignOutUrl="/">
                <UserButton.UserProfileLink
                  label="Preferences Edit"
                  url="/"
                  labelIcon={<DotIcon />}
                />
              </UserButton>
            </SignedIn>
          </header>
          <main className="grow">{children}</main>
          <footer className="flex items-center h-20 gap-1 px-8 font-medium border-t md:px-20">
            <Image
              src="/logo.svg"
              alt="ilab Logo"
              width={120}
              height={30}
              priority
            />
            <span className="text-sm">© 2023</span>
            <nav className="flex justify-end grow sm:gap-2">
              <a
                className="flex flex-col justify-center p-2 hover:underline"
                href="https://twitter.com/"
              >
                <Twitter />
              </a>
              <a
                className="flex flex-col justify-center p-2 hover:underline"
                href="https://discord.com/A"
              >
                <Discord />
              </a>
            </nav>
          </footer>
        </body>
      </ClerkProvider>

      <Script src="https://cdn.jsdelivr.net/npm/prismjs@1/components/prism-core.min.js" />
      <Script src="https://cdn.jsdelivr.net/npm/prismjs@1/plugins/autoloader/prism-autoloader.min.js" />
    </html>
  );
}
