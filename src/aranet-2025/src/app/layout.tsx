import type { Metadata } from "next";
// import { Geist, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";
import ReactQueryProvider from '@/app/components/ReactQueryProvider';
import Head from "next/head";

export const metadata: Metadata = {
  title: {
    template: `%s - ${process.env.APP_TITLE} - ${process.env.APP_CLIENT}`,
    default: `${process.env.APP_TITLE} - ${process.env.APP_CLIENT}`,
  },
  description: process.env.APP_DESCRIPTION,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {


  return (
    <html lang="es"
      className="text-zinc-950 antialiased lg:bg-zinc-100 dark:bg-zinc-900 dark:text-white dark:lg:bg-zinc-950"
    >
      <Head>
        <link rel="stylesheet" href="https://rsms.me/inter/inter.css" />
        <link rel="icon" href="/favicon.ico" type="image/png" />
      </Head>
      <body
        // className={`${interSans.variable} ${geistMono.variable} antialiased`}
        className={`font-sans antialiased`}
      >
        <ReactQueryProvider>
          {children}
        </ReactQueryProvider>

      </body>
    </html>
  );
}
