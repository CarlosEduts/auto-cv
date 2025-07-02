import type { Metadata } from "next";
import "./globals.css";
import { dmSerif, sourceSans } from "./fonts/fonts"; // caminho ajustado conforme necessário

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
