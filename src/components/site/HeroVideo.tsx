"use client";

import { useEffect, useRef, useState } from "react";

type Props = {
  /** Video horizontal (escritorio). */
  src: string;
  /** Video vertical (celular), recompuesto para pantalla alta. */
  srcVertical: string;
  poster: string;
  posterVertical: string;
  /** Describe la escena para lectores de pantalla. */
  label: string;
  className?: string;
};

/**
 * Video de fondo del hero.
 * - Sin sonido, en bucle, sin controles.
 * - Se pausa cuando sale de pantalla.
 * - Con «reducir movimiento» activo no se reproduce: queda la imagen fija.
 * - En pantalla vertical carga la versión recompuesta, no la horizontal recortada.
 */
export default function HeroVideo({
  src,
  srcVertical,
  poster,
  posterVertical,
  label,
  className = "",
}: Props) {
  const ref = useRef<HTMLVideoElement>(null);
  // null = aún no se sabe (servidor / primer render): se muestra solo el póster horizontal.
  const [vertical, setVertical] = useState<boolean | null>(null);
  const [quieto, setQuieto] = useState(false);

  useEffect(() => {
    const mqV = window.matchMedia("(max-aspect-ratio: 4/5)");
    const mqR = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => {
      setVertical(mqV.matches);
      setQuieto(mqR.matches);
    };
    sync();
    mqV.addEventListener("change", sync);
    mqR.addEventListener("change", sync);
    return () => {
      mqV.removeEventListener("change", sync);
      mqR.removeEventListener("change", sync);
    };
  }, []);

  useEffect(() => {
    const v = ref.current;
    if (!v || vertical === null || quieto) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) v.play().catch(() => {});
        else v.pause();
      },
      { threshold: 0.15 },
    );
    io.observe(v);
    return () => io.disconnect();
  }, [vertical, quieto]);

  const posterActual = vertical ? posterVertical : poster;

  if (vertical === null || quieto) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={posterActual}
        alt={label}
        className={`h-full w-full object-cover ${className}`}
      />
    );
  }

  return (
    <video
      ref={ref}
      key={vertical ? "v" : "h"}
      className={`h-full w-full object-cover ${className}`}
      src={vertical ? srcVertical : src}
      poster={posterActual}
      autoPlay
      muted
      loop
      playsInline
      preload="metadata"
      aria-label={label}
    />
  );
}
