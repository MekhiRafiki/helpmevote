import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import StoreProvider from "../providers/StoreProvider";
import { CSPostHogProvider } from "@/providers/PosthogProvider";
import { ReduxInitializer } from "@/providers/ReduxInitializer";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Help Me Vote",
  description: "Help Me Vote is an AI Assistant that helps you understand and explore the platforms of candidates or parties.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <CSPostHogProvider>
        <StoreProvider>
          <ReduxInitializer />
          <body
            className={`${geistSans.variable} ${geistMono.variable} antialiased`}
          >
            <div className="min-w-screen min-h-screen p-1 flex flex-col overflow-hidden bg-gradient-to-br from-base-300 to-base-200">
              {children}
            </div>
          </body>
        </StoreProvider>
      </CSPostHogProvider>
    </html>
  );
}
