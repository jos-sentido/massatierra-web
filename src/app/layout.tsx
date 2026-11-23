import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

// Tipografía provisional: las del deck nuevo están pendientes de recibir del cliente.
const sans = Geist({
  variable: "--font-sans-base",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Massatierra · Tecnología para su tranquilidad",
  description:
    "Sistemas de puesta a tierra y pararrayos. Zapopan, Jalisco.",
  // Staging: fuera de índice hasta tener dominio canónico y contenido aprobado.
  robots: { index: false, follow: false },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="es-MX" className={`${sans.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
