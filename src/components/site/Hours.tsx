import { Clock, Calendar } from "lucide-react";
import { Reveal } from "./Reveal";

export function Hours() {
  return (
    <section id="horario" className="bg-surface-2 py-28 sm:py-36">
      <div className="mx-auto max-w-5xl px-6 text-center">
        <Reveal>
          <span className="text-xs uppercase tracking-[0.3em] text-brand font-semibold">
            Funcionamento
          </span>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="font-display mt-4 text-balance text-4xl sm:text-5xl font-bold">
            Sempre prontos para servir você
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-6 sm:grid-cols-2">
          <Reveal delay={0.15}>
            <div className="glass rounded-3xl p-8 text-left shadow-elegant">
              <Calendar className="text-brand" size={24} />
              <div className="mt-4 text-sm uppercase tracking-[0.25em] text-muted-foreground">
                Segunda a Sábado
              </div>
              <div className="font-display mt-2 text-4xl font-bold">11h — 23h</div>
              <p className="mt-3 text-sm text-muted-foreground">
                Almoço e jantar quentinho durante todo o dia.
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.25}>
            <div className="glass rounded-3xl p-8 text-left shadow-elegant">
              <Clock className="text-brand" size={24} />
              <div className="mt-4 text-sm uppercase tracking-[0.25em] text-muted-foreground">
                Domingo
              </div>
              <div className="font-display mt-2 text-4xl font-bold">11h — 16h</div>
              <p className="mt-3 text-sm text-muted-foreground">
                Almoço de domingo em família.
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}