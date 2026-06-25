import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Search } from "lucide-react";
import { toast } from "sonner";
import { Reveal } from "./Reveal";
import { useCart, formatBRL } from "./CartContext";
import galinhada from "@/assets/galinhada.jpg";
import feijao from "@/assets/feijao-tropeiro.jpg";
import strogonoff from "@/assets/strogonoff.jpg";
import bife from "@/assets/bife-pernil.jpg";
import farofa from "@/assets/farofa.jpg";
import refogado from "@/assets/refogado.jpg";
import salada from "@/assets/salada.jpg";
import frangoQuiabo from "@/assets/frango-quiabo.jpg";
import tutu from "@/assets/tutu.jpg";
import costelinha from "@/assets/costelinha.jpg";
import pudim from "@/assets/pudim.jpg";
import brigadeirao from "@/assets/brigadeirao.jpg";
import doceLeite from "@/assets/doce-leite.jpg";

type Category = "Pratos" | "Acompanhamentos" | "Sobremesas";

type Dish = {
  id: string;
  name: string;
  desc: string;
  price: number;
  category: Category;
  img: string;
};

const dishes: Dish[] = [
  { id: "1", name: "Galinhada", desc: "Arroz amarelo soltinho com frango caipira e açafrão.", price: 32.9, category: "Pratos", img: galinhada },
  { id: "2", name: "Feijão Tropeiro", desc: "Feijão, farinha, bacon, linguiça e couve refogada.", price: 29.9, category: "Pratos", img: feijao },
  { id: "3", name: "Strogonoff de Frango", desc: "Cremoso, com arroz branco e batata palha crocante.", price: 34.9, category: "Pratos", img: strogonoff },
  { id: "4", name: "Bife de Pernil Empanado", desc: "Pernil suíno empanado, dourado e suculento.", price: 36.9, category: "Pratos", img: bife },
  { id: "5", name: "Frango com Quiabo", desc: "Receita tradicional no caldo cremoso de quiabo e açafrão.", price: 35.9, category: "Pratos", img: frangoQuiabo },
  { id: "6", name: "Tutu de Feijão", desc: "Feijão cremoso com bacon, torresmo e couve refogada.", price: 31.9, category: "Pratos", img: tutu },
  { id: "7", name: "Costelinha ao Molho", desc: "Costela suína assada com purê rústico de mandioca.", price: 39.9, category: "Pratos", img: costelinha },
  { id: "8", name: "Farofa da Casa", desc: "Farinha torrada com bacon, ovos e ervas frescas.", price: 14.9, category: "Acompanhamentos", img: farofa },
  { id: "9", name: "Refogado de Couve", desc: "Couve mineira no alho, na medida certa.", price: 12.9, category: "Acompanhamentos", img: refogado },
  { id: "10", name: "Salada Fresca", desc: "Alface, tomate e cebola roxa com molho da casa.", price: 11.9, category: "Acompanhamentos", img: salada },
  { id: "11", name: "Pudim de Leite", desc: "Cremoso, com calda de caramelo na medida certa.", price: 14.9, category: "Sobremesas", img: pudim },
  { id: "12", name: "Brigadeirão", desc: "Versão gigante e cremosa do clássico brigadeiro.", price: 15.9, category: "Sobremesas", img: brigadeirao },
  { id: "13", name: "Doce de Leite com Queijo", desc: "Combinação mineira clássica em porção generosa.", price: 13.9, category: "Sobremesas", img: doceLeite },
];

const cats = ["Todos", "Pratos", "Acompanhamentos", "Sobremesas"] as const;

export function MenuSection() {
  const [cat, setCat] = useState<(typeof cats)[number]>("Todos");
  const [q, setQ] = useState("");
  const { add, setOpen } = useCart();

  const filtered = useMemo(
    () =>
      dishes.filter(
        (d) =>
          (cat === "Todos" || d.category === cat) &&
          (q === "" || d.name.toLowerCase().includes(q.toLowerCase())),
      ),
    [cat, q],
  );

  return (
    <section id="cardapio" className="relative bg-surface-2 py-28 sm:py-36">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-col items-center text-center">
          <Reveal>
            <span className="text-xs uppercase tracking-[0.3em] text-brand font-semibold">
              Cardápio
            </span>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="font-display mt-4 text-balance text-4xl sm:text-6xl font-bold">
              Sabores que <span className="italic text-brand">contam histórias</span>
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mt-4 max-w-2xl text-muted-foreground">
              Receitas tradicionais preparadas todos os dias com ingredientes frescos.
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.3}>
          <div className="mt-12 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-wrap gap-2">
              {cats.map((c) => (
                <button
                  key={c}
                  onClick={() => setCat(c)}
                  className={`rounded-full px-5 py-2.5 text-sm font-medium transition-all ${
                    cat === c
                      ? "bg-gradient-brand text-white shadow-glow"
                      : "bg-card border hover:border-brand/40"
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
            <div className="relative w-full sm:w-72">
              <Search
                size={16}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground"
              />
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Buscar prato..."
                aria-label="Buscar prato"
                className="w-full rounded-full border bg-card pl-10 pr-4 py-3 text-sm placeholder:text-muted-foreground outline-none focus:border-brand transition-colors"
              />
            </div>
          </div>
        </Reveal>

        <motion.div
          layout
          className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((d, i) => (
              <motion.article
                key={d.id}
                layout
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="group relative overflow-hidden rounded-3xl border bg-card shadow-elegant transition-all hover:-translate-y-2 hover:shadow-glow"
              >
                <div className="relative aspect-square overflow-hidden">
                  <img
                    src={d.img}
                    alt={d.name}
                    loading="lazy"
                    width={800}
                    height={800}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                  <span className="absolute left-3 top-3 rounded-full bg-ink/70 px-3 py-1 text-[10px] uppercase tracking-widest text-white backdrop-blur">
                    {d.category}
                  </span>
                </div>
                <div className="p-5">
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="font-display text-xl font-bold leading-tight">{d.name}</h3>
                    <span className="font-display whitespace-nowrap text-lg font-bold text-brand">
                      R$ {d.price.toFixed(2).replace(".", ",")}
                    </span>
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{d.desc}</p>
                  <button
                    onClick={() => {
                      add({ id: d.id, name: d.name, price: d.price, img: d.img });
                      toast.success(`${d.name} adicionado`, {
                        action: { label: "Ver carrinho", onClick: () => setOpen(true) },
                      });
                    }}
                    className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full bg-ink py-3 text-sm font-semibold text-white transition-all hover:bg-brand active:scale-[0.98] dark:bg-brand dark:hover:bg-gold dark:hover:text-ink"
                  >
                    <Plus size={16} /> Adicionar • {formatBRL(d.price)}
                  </button>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>

        {filtered.length === 0 && (
          <div className="mt-16 text-center text-muted-foreground">
            Nenhum prato encontrado.
          </div>
        )}
      </div>
    </section>
  );
}