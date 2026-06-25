import { Reveal } from "./Reveal";
import aboutImg from "@/assets/about.jpg";
import { Flame, Heart, Wheat } from "lucide-react";

export function About() {
  return (
    <section id="sobre" className="relative py-28 sm:py-36">
      <div className="mx-auto grid max-w-7xl items-center gap-16 px-6 lg:grid-cols-2">
        <Reveal>
          <div className="relative">
            <div className="absolute -inset-4 rounded-3xl bg-gradient-brand opacity-20 blur-2xl" />
            <div className="relative overflow-hidden rounded-3xl shadow-elegant">
              <img
                src={aboutImg}
                alt="Cozinha tradicional do Sabor de Minas com fogão a lenha"
                className="aspect-[4/5] w-full object-cover transition-transform duration-[1.4s] hover:scale-105"
                loading="lazy"
                width={1200}
                height={1200}
              />
            </div>
            <div className="absolute -bottom-6 -right-6 glass rounded-2xl px-6 py-4">
              <div className="font-display text-3xl font-bold text-brand">+20</div>
              <div className="text-xs uppercase tracking-widest text-muted-foreground">
                anos de tradição
              </div>
            </div>
          </div>
        </Reveal>

        <div>
          <Reveal>
            <span className="text-xs uppercase tracking-[0.3em] text-brand font-semibold">
              Nossa História
            </span>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="font-display mt-4 text-balance text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.05]">
              Do fogão a lenha <span className="italic text-brand">para sua mesa</span>.
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
              Nascemos do desejo de levar o aconchego de uma cozinha mineira de verdade
              a quem busca comida feita com tempo, alma e ingredientes selecionados. Cada
              prato carrega receitas que atravessam gerações.
            </p>
          </Reveal>
          <Reveal delay={0.3}>
            <div className="mt-10 grid gap-5 sm:grid-cols-3">
              {[
                { icon: Flame, title: "Fogão a lenha", text: "Sabor inconfundível" },
                { icon: Wheat, title: "Ingredientes", text: "Selecionados a dedo" },
                { icon: Heart, title: "Receitas", text: "Da família, pra você" },
              ].map((f) => (
                <div
                  key={f.title}
                  className="rounded-2xl border bg-card p-5 transition-all hover:-translate-y-1 hover:shadow-elegant"
                >
                  <f.icon className="text-brand" size={22} />
                  <div className="mt-3 font-semibold">{f.title}</div>
                  <div className="text-sm text-muted-foreground">{f.text}</div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}