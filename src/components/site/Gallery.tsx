import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { Reveal } from "./Reveal";
import galinhada from "@/assets/galinhada.jpg";
import feijao from "@/assets/feijao-tropeiro.jpg";
import strogonoff from "@/assets/strogonoff.jpg";
import bife from "@/assets/bife-pernil.jpg";
import farofa from "@/assets/farofa.jpg";
import refogado from "@/assets/refogado.jpg";
import salada from "@/assets/salada.jpg";
import about from "@/assets/about.jpg";

const imgs = [
  { src: galinhada, span: "row-span-2" },
  { src: about, span: "" },
  { src: strogonoff, span: "" },
  { src: bife, span: "row-span-2" },
  { src: feijao, span: "" },
  { src: farofa, span: "" },
  { src: refogado, span: "" },
  { src: salada, span: "" },
];

export function Gallery() {
  const [open, setOpen] = useState<string | null>(null);

  return (
    <section id="galeria" className="bg-surface-2 py-28 sm:py-36">
      <div className="mx-auto max-w-7xl px-6">
        <div className="text-center">
          <Reveal>
            <span className="text-xs uppercase tracking-[0.3em] text-brand font-semibold">
              Galeria
            </span>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="font-display mt-4 text-balance text-4xl sm:text-5xl font-bold">
              Um banquete para os olhos
            </h2>
          </Reveal>
        </div>

        <Reveal delay={0.2}>
          <div className="mt-12 grid auto-rows-[180px] grid-cols-2 gap-3 sm:auto-rows-[200px] sm:grid-cols-3 lg:grid-cols-4 lg:gap-4">
            {imgs.map((it, i) => (
              <button
                key={i}
                onClick={() => setOpen(it.src)}
                className={`group relative overflow-hidden rounded-2xl ${it.span}`}
              >
                <img
                  src={it.src}
                  alt=""
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/0 transition-colors group-hover:bg-black/30" />
              </button>
            ))}
          </div>
        </Reveal>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(null)}
            className="fixed inset-0 z-[60] grid place-items-center bg-black/90 p-6 backdrop-blur"
          >
            <button
              aria-label="Fechar"
              onClick={() => setOpen(null)}
              className="absolute right-6 top-6 grid h-11 w-11 place-items-center rounded-full bg-white/10 text-white hover:bg-white/20"
            >
              <X size={18} />
            </button>
            <motion.img
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              src={open}
              alt=""
              className="max-h-[85vh] max-w-[90vw] rounded-2xl object-contain shadow-2xl"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}