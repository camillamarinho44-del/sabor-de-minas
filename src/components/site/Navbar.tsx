import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, ShoppingBag, X } from "lucide-react";
import logo from "@/assets/logo.png";
import { useCart } from "./CartContext";

const links = [
  { href: "#sobre", label: "Sobre" },
  { href: "#cardapio", label: "Cardápio" },
  { href: "#promo", label: "Promoções" },
  { href: "#horario", label: "Horários" },
  { href: "#depoimentos", label: "Depoimentos" },
  { href: "#contato", label: "Contato" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { count, setOpen: setCartOpen } = useCart();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-ink/85 backdrop-blur-xl border-b border-white/5 py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6">
        <a href="#top" className="flex items-center gap-3 group">
          <img
            src={logo}
            alt="Sabor de Minas"
            className="h-11 w-11 object-contain drop-shadow-[0_0_20px_rgba(183,28,28,0.4)]"
            width={44}
            height={44}
          />
          <div className="hidden sm:flex flex-col leading-tight">
            <span className="font-display text-lg font-bold tracking-tight text-white">
              Sabor de Minas
            </span>
            <span className="text-[10px] uppercase tracking-[0.25em] text-gold">
              Comida Mineira
            </span>
          </div>
        </a>

        <nav className="hidden lg:flex items-center gap-1">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="relative px-4 py-2 text-sm font-medium text-white/80 hover:text-white transition-colors after:absolute after:bottom-1 after:left-1/2 after:h-px after:w-0 after:-translate-x-1/2 after:bg-gold after:transition-all hover:after:w-6"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setCartOpen(true)}
            aria-label={`Abrir carrinho (${count} ${count === 1 ? "item" : "itens"})`}
            className="relative grid h-11 w-11 place-items-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
          >
            <ShoppingBag size={18} />
            {count > 0 && (
              <motion.span
                key={count}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -top-1 -right-1 grid h-5 min-w-[20px] place-items-center rounded-full bg-gold px-1 text-[10px] font-bold text-ink"
              >
                {count}
              </motion.span>
            )}
          </button>

          <a
            href="#cardapio"
            className="hidden lg:inline-flex items-center justify-center rounded-full bg-gradient-brand px-6 py-2.5 text-sm font-semibold text-white shadow-glow transition-transform hover:scale-[1.03] active:scale-[0.98]"
          >
            Fazer Pedido
          </a>

          <button
            aria-label={open ? "Fechar menu" : "Abrir menu"}
            onClick={() => setOpen((v) => !v)}
            className="lg:hidden grid place-items-center h-11 w-11 rounded-full bg-white/10 text-white"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden overflow-hidden bg-ink/95 backdrop-blur-xl border-t border-white/5"
          >
            <div className="flex flex-col px-6 py-6 gap-1">
              {links.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="py-3 text-lg text-white/90 border-b border-white/5"
                >
                  {l.label}
                </a>
              ))}
              <a
                href="#cardapio"
                onClick={() => setOpen(false)}
                className="mt-4 rounded-full bg-gradient-brand py-3 text-center font-semibold text-white"
              >
                Fazer Pedido
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}