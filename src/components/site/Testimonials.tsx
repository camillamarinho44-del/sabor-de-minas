import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, Quote } from "lucide-react";
import { Reveal } from "./Reveal";

const items = [
  {
    name: "Marina Souza",
    role: "Cliente desde 2021",
    text: "Comida que lembra o almoço de domingo na casa da minha avó. Tempero perfeito e atendimento impecável.",
    rating: 5,
    avatar: "https://i.pravatar.cc/120?img=47",
  },
  {
    name: "Rafael Andrade",
    role: "Cliente fidelidade",
    text: "A galinhada é simplesmente perfeita. Já indiquei pra todo mundo aqui do trabalho.",
    rating: 5,
    avatar: "https://i.pravatar.cc/120?img=12",
  },
  {
    name: "Júlia Pereira",
    role: "Pedido por delivery",
    text: "Chega quentinho, bem embalado e com aquele sabor caseiro. Virou meu almoço favorito.",
    rating: 5,
    avatar: "https://i.pravatar.cc/120?img=32",
  },
];

export function Testimonials() {
  const [i, setI] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setI((v) => (v + 1) % items.length), 5000);
    return () => clearInterval(t);
  }, []);

  const item = items[i];

  return (
    <section id="depoimentos" className="py-28 sm:py-36">
      <div className="mx-auto max-w-5xl px-6 text-center">
        <Reveal>
          <span className="text-xs uppercase tracking-[0.3em] text-brand font-semibold">
            Depoimentos
          </span>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="font-display mt-4 text-balance text-4xl sm:text-5xl font-bold">
            O que dizem nossos <span className="italic text-brand">clientes</span>
          </h2>
        </Reveal>

        <div className="relative mt-14 min-h-[280px]">
          <Quote
            className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-6 text-brand/15"
            size={80}
          />
          <AnimatePresence mode="wait">
            <motion.div
              key={item.name}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.5 }}
              className="glass relative mx-auto max-w-2xl rounded-3xl p-8 sm:p-10 shadow-elegant"
            >
              <div className="flex justify-center gap-1">
                {Array.from({ length: item.rating }).map((_, k) => (
                  <Star key={k} size={18} className="fill-gold text-gold" />
                ))}
              </div>
              <p className="mt-5 text-balance text-lg sm:text-xl leading-relaxed">
                “{item.text}”
              </p>
              <div className="mt-6 flex items-center justify-center gap-3">
                <img
                  src={item.avatar}
                  alt=""
                  loading="lazy"
                  className="h-12 w-12 rounded-full object-cover ring-2 ring-brand/40"
                />
                <div className="text-left">
                  <div className="font-semibold">{item.name}</div>
                  <div className="text-xs text-muted-foreground">{item.role}</div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="mt-8 flex justify-center gap-2">
            {items.map((_, k) => (
              <button
                key={k}
                aria-label={`Depoimento ${k + 1}`}
                onClick={() => setI(k)}
                className={`h-1.5 rounded-full transition-all ${
                  i === k ? "w-8 bg-brand" : "w-4 bg-muted"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}