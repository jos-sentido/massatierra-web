import type { Metadata } from "next";
import Vitrina from "./vitrina";

export const metadata: Metadata = {
  title: "Massatierra · Vitrina de diseño",
  robots: { index: false, follow: false },
};

// Vitrina de elementos de diseño: componentes reales del sitio con textos del brief.
// No es una página del sitio final; sirve para validar y enseñar el lenguaje visual.
export default function LabPage() {
  return <Vitrina />;
}
