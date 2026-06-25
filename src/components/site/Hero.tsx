import { motion, useScroll, useTransform } from "framer-motion";
import { ChevronDown, UtensilsCrossed, ShoppingBag } from "lucide-react";
import hero from "@/assets/hero.jpg";

export function Hero() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 600], [0, 180]);
  const opacity = useTransform(scrollY, [0, 500], [1, 0]);

  return (
    <section id="top" className="relative isolate h-dvh min-h-[640px] w-full overflow-hidden bg-ink">
      <motion.div style={{ y }} className="absolute inset-0 -z-10">
        <img
          src={hero}
          alt=""
          className="h-full w-full object-cover scale-110"
          width={1920}
          height={1280}
        />
      </motion.div>
      <div className="absolute inset-0 -z-10 bg-gradient-hero" />
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(0,0,0,0.7)_100%)]" />

      <div className="relative z-10 mx-auto flex h-full max-w-7xl flex-col items-start justify-center px-6 pt-24">
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-white/5 px-4 py-1.5 text-xs uppercase tracking-[0.3em] text-gold backdrop-blur"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-gold animate-pulse" />
          Cozinha mineira artesanal
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.35 }}
          className="font-display mt-6 text-balance text-[clamp(3rem,9vw,8rem)] font-bold leading-[0.95] text-white"
        >
          Sabor de <span className="italic text-gold">Minas</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.55 }}
          className="mt-6 max-w-xl text-lg sm:text-xl text-white/80 text-balance"
        >
          O verdadeiro sabor da comida mineira — feito no fogão de casa, servido com a alma das Gerais.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.75 }}
          className="mt-10 flex flex-wrap gap-4"
        >
          <a
            href="#cardapio"
            className="group inline-flex items-center gap-2 rounded-full bg-white px-7 py-4 text-sm font-semibold text-ink shadow-elegant transition-all hover:scale-[1.04] hover:bg-gold"
          >
            <UtensilsCrossed size={18} />
            Ver Cardápio
            <span className="transition-transform group-hover:translate-x-1">→</span>
          </a>
          <a
            href="https://wa.me/5500000000000?text=Quero%20fazer%20um%20pedido"
            target="_blank"
            rel="noreferrer"
            className="group inline-flex items-center gap-2 rounded-full bg-gradient-brand px-7 py-4 text-sm font-semibold text-white shadow-glow transition-all hover:scale-[1.04]"
          >
            <ShoppingBag size={18} />
            Fazer Pedido
          </a>
        </motion.div>

        <motion.div
          style={{ opacity }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/60"
        >
          <span className="text-[10px] uppercase tracking-[0.3em]">Role</span>
          <ChevronDown className="animate-bounce" size={18} />
        </motion.div>
      </div>
    </section>
  );
}