import { Gift, Sparkles } from "lucide-react";
import { Reveal } from "./Reveal";

export function Promo() {
  return (
    <section id="promo" className="relative py-28 sm:py-36">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal>
          <div className="relative overflow-hidden rounded-[2.5rem] bg-gradient-brand p-10 sm:p-16 shadow-glow">
            <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-gold/30 blur-3xl" />
            <div className="absolute -bottom-24 -left-10 h-72 w-72 rounded-full bg-black/40 blur-3xl" />
            <div className="relative grid items-center gap-10 lg:grid-cols-[1fr_auto]">
              <div>
                <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-1.5 text-xs uppercase tracking-[0.3em] text-white backdrop-blur">
                  <Sparkles size={14} /> Promoção fidelidade
                </span>
                <h2 className="font-display mt-5 text-balance text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight text-white">
                  A cada 5 refeições, <br />
                  a <span className="italic text-gold">6ª é por nossa conta</span>.
                </h2>
                <p className="mt-4 max-w-xl text-white/85">
                  Junte selos a cada pedido e ganhe a próxima refeição completa,
                  feita com o mesmo carinho de sempre.
                </p>
              </div>
              <div className="relative shrink-0">
                <div className="grid h-44 w-44 sm:h-56 sm:w-56 place-items-center rounded-full border-4 border-dashed border-gold/60 bg-ink/40 backdrop-blur">
                  <div className="text-center">
                    <Gift className="mx-auto text-gold" size={28} />
                    <div className="font-display mt-2 text-5xl font-bold text-white">6ª</div>
                    <div className="text-xs uppercase tracking-[0.25em] text-gold">grátis</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}