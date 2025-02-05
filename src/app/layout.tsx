import type { Metadata } from "next";
import "./globals.css";
import 'leaflet/dist/leaflet.css';
import 'antd/dist/reset.css';
import AntdProvider from "@/app/providers/AntdProvider";
import React from "react";


export const metadata: Metadata = {
  title: "User Application",
  description: "User Application with weather information",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
      <html lang="en">
      <body>
        <AntdProvider>{children}</AntdProvider>
      </body>
      </html>
  );
}
