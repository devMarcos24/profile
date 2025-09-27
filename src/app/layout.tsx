import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Marcos Menezes | Desenvolvedor Full Stack",
  description: "Portfólio profissional de Marcos Menezes, Desenvolvedor Full Stack",
  keywords: ["desenvolvedor", "full stack", "portfólio", "tecnologia"],
  icons: {
    icon: [
      { url: '/developer-emoji.svg', type: 'image/svg+xml' },
    ],
    apple: [
      { url: '/developer-emoji.svg', type: 'image/svg+xml' },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
