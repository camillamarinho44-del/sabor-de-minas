import { Instagram, Facebook, Youtube } from "lucide-react";
import logo from "@/assets/logo.png";
import { CONTACT } from "./Contact";

export function Footer() {
  return (
    <footer className="bg-ink text-white/80">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 py-20 lg:grid-cols-4">
        <div className="lg:col-span-2">
          <div className="flex items-center gap-3">
            <img src={logo} alt="" className="h-12 w-12" width={48} height={48} />
            <div>
              <div className="font-display text-xl font-bold text-white">Sabor de Minas</div>
              <div className="text-[10px] uppercase tracking-[0.3em] text-gold">Comida Mineira</div>
            </div>
          </div>
          <p className="mt-5 max-w-md text-sm leading-relaxed text-white/60">
            O verdadeiro sabor da comida mineira, preparado com tempo, alma e os melhores ingredientes.
          </p>
          <div className="mt-6 flex gap-3">
            {[Instagram, Facebook, Youtube].map((Icon, i) => (
              <a
                key={i}
                href="#"
                aria-label="Rede social"
                className="grid h-11 w-11 place-items-center rounded-full bg-white/5 transition hover:bg-brand hover:text-white"
              >
                <Icon size={18} />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h4 className="font-display text-sm uppercase tracking-[0.25em] text-gold">
            Navegação
          </h4>
          <ul className="mt-5 space-y-3 text-sm">
            {[
              ["Sobre", "#sobre"],
              ["Cardápio", "#cardapio"],
              ["Promoções", "#promo"],
              ["Depoimentos", "#depoimentos"],
              ["Contato", "#contato"],
            ].map(([l, h]) => (
              <li key={h}>
                <a href={h} className="hover:text-white transition">
                  {l}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-display text-sm uppercase tracking-[0.25em] text-gold">Contato</h4>
          <ul className="mt-5 space-y-3 text-sm">
            <li>{CONTACT.address}</li>
            <li>{CONTACT.phone}</li>
            <li>{CONTACT.email}</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/5">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-6 py-6 text-xs text-white/50 sm:flex-row">
          <span>© {new Date().getFullYear()} Sabor de Minas. Todos os direitos reservados.</span>
          <span>Feito com carinho nas Gerais.</span>
        </div>
      </div>
    </footer>
  );
}