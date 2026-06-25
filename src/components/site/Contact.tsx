import { useState } from "react";
import { MapPin, Phone, Mail, Send, MessageCircle } from "lucide-react";
import { toast } from "sonner";
import { Reveal } from "./Reveal";

export const CONTACT = {
  phone: "+55 (00) 0000-0000",
  whatsapp: "5500000000000",
  email: "contato@sabordeminas.com.br",
  address: "Rua das Gerais, 123 — Centro, Belo Horizonte / MG",
  mapsUrl: "https://maps.google.com/?q=Belo+Horizonte+MG",
  mapsEmbed:
    "https://www.google.com/maps?q=Belo+Horizonte+MG&output=embed",
};

export function Contact() {
  const [sending, setSending] = useState(false);

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSending(true);
    setTimeout(() => {
      setSending(false);
      toast.success("Mensagem enviada! Em breve entraremos em contato.");
      (e.target as HTMLFormElement).reset();
    }, 900);
  };

  return (
    <section id="contato" className="py-28 sm:py-36">
      <div className="mx-auto max-w-7xl px-6">
        <div className="text-center">
          <Reveal>
            <span className="text-xs uppercase tracking-[0.3em] text-brand font-semibold">
              Contato
            </span>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="font-display mt-4 text-balance text-4xl sm:text-5xl font-bold">
              Venha nos visitar
            </h2>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-8 lg:grid-cols-2">
          <Reveal>
            <div className="space-y-5">
              {[
                { icon: MapPin, label: "Endereço", val: CONTACT.address },
                { icon: Phone, label: "Telefone", val: CONTACT.phone },
                { icon: Mail, label: "Email", val: CONTACT.email },
              ].map((c) => (
                <div
                  key={c.label}
                  className="flex items-start gap-4 rounded-2xl border bg-card p-5 transition-all hover:border-brand/40 hover:shadow-elegant"
                >
                  <div className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-gradient-brand text-white">
                    <c.icon size={20} />
                  </div>
                  <div className="min-w-0">
                    <div className="text-xs uppercase tracking-[0.25em] text-muted-foreground">
                      {c.label}
                    </div>
                    <div className="mt-1 font-medium break-words">{c.val}</div>
                  </div>
                </div>
              ))}

              <div className="flex flex-wrap gap-3 pt-2">
                <a
                  href={`https://wa.me/${CONTACT.whatsapp}`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-gradient-brand px-6 py-3 text-sm font-semibold text-white shadow-glow transition hover:scale-[1.03]"
                >
                  <MessageCircle size={16} /> WhatsApp
                </a>
                <a
                  href={CONTACT.mapsUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border bg-card px-6 py-3 text-sm font-semibold transition hover:border-brand/40"
                >
                  <MapPin size={16} /> Google Maps
                </a>
              </div>

              <div className="overflow-hidden rounded-2xl border shadow-elegant">
                <iframe
                  src={CONTACT.mapsEmbed}
                  title="Localização"
                  loading="lazy"
                  className="h-64 w-full"
                />
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.15}>
            <form
              onSubmit={submit}
              className="glass rounded-3xl p-6 sm:p-8 shadow-elegant space-y-4"
            >
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Nome" name="name" required />
                <Field label="Telefone" name="phone" />
              </div>
              <Field label="Email" name="email" type="email" required />
              <div>
                <label className="text-xs uppercase tracking-[0.25em] text-muted-foreground">
                  Mensagem
                </label>
                <textarea
                  name="message"
                  required
                  rows={5}
                  className="mt-2 w-full rounded-2xl border bg-card px-4 py-3 outline-none focus:border-brand transition"
                />
              </div>
              <button
                disabled={sending}
                className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-brand px-6 py-4 text-sm font-semibold text-white shadow-glow transition hover:scale-[1.02] disabled:opacity-60"
              >
                <Send size={16} />
                {sending ? "Enviando..." : "Enviar mensagem"}
              </button>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label htmlFor={name} className="text-xs uppercase tracking-[0.25em] text-muted-foreground">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        className="mt-2 w-full rounded-2xl border bg-card px-4 py-3 outline-none focus:border-brand transition"
      />
    </div>
  );
}