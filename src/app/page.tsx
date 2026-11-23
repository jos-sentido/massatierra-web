import DecryptedText from "@/components/DecryptedText";

export default function Home() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center bg-navy px-6 text-center text-white">
      <p className="text-4xl font-black italic tracking-tight sm:text-5xl">
        Massatierra<sup className="text-base align-super">®</sup>
      </p>
      <p className="mt-2 text-lg text-white/80">
        {/* Prueba del registro de React Bits: corre una vez al entrar en pantalla. */}
        <DecryptedText
          text="Tecnología para su tranquilidad"
          animateOn="view"
          sequential
          speed={40}
          aria-label="Tecnología para su tranquilidad"
        />
      </p>
      <span className="mt-10 rounded-full bg-orange px-4 py-1.5 text-sm font-semibold">
        Sitio en construcción
      </span>
    </main>
  );
}
