import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

// Tipografía provisional: las del deck nuevo están pendientes de recibir del cliente.
const geist = Geist({subsets:['latin'],variable:'--font-sans'});

export const metadata: Metadata = {
  title: "Massatierra · Tecnología para su tranquilidad",
  description:
    "Sistemas de puesta a tierra y pararrayos. Zapopan, Jalisco.",
  // Staging: fuera de índice hasta tener dominio canónico y contenido aprobado.
  robots: { index: false, follow: false },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="es-MX" className={cn("h-full", "antialiased", "font-sans", geist.variable)}>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
