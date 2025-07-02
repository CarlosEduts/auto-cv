import type { Metadata } from "next";
import "./globals.css";
import { DM_Serif_Display, Source_Sans_3 } from "next/font/google";

export const dmSerif = DM_Serif_Display({
  variable: "--font-dm-serif",
  subsets: ["latin"],
  weight: ["400"], // DM Serif só tem 400 normalmente
});

export const sourceSans = Source_Sans_3({
  variable: "--font-source-sans",
  subsets: ["latin"],
  weight: ["400", "600"],
});

export const metadata: Metadata = {
  title: "auto-cv - Gere currículos facilmente",
  description:
    "Gere currículos facilmente com auto-cv, uma ferramenta de código aberto para criar currículos personalizados.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body
        className={`${dmSerif.variable} ${sourceSans.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
