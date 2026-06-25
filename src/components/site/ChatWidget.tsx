import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { MessageCircle, Send, X } from "lucide-react";

type Msg = { from: "bot" | "user"; text: string; ts: number };

const SUGGESTIONS = [
  "Qual o horário de funcionamento?",
  "Vocês entregam na minha região?",
  "Quais formas de pagamento?",
  "Tem opção sem glúten?",
  "Qual o tempo de entrega?",
  "Como funciona a promoção?",
];

function botReply(input: string): string {
  const t = input.toLowerCase();
  if (/(horário|hora|funciona|aberto)/.test(t))
    return "Funcionamos de segunda a sábado das 11h às 23h, e domingo das 11h às 16h. 🍲";
  if (/(entrega|deliver|região|bairro|área)/.test(t))
    return "Entregamos em toda a região centro-sul de BH! Em outras regiões consulte pelo CEP no checkout. 🛵";
  if (/(pagamento|pix|cartão|cartao|dinheiro)/.test(t))
    return "Aceitamos Pix (com aprovação imediata) e cartão de crédito/débito direto na finalização. 💳";
  if (/(glúten|gluten|vegano|vegetar|alerg|lactose)/.test(t))
    return "Temos opções vegetarianas e sem glúten, como salada fresca e refogados. Para alergias específicas, avise nas observações do pedido. 🌿";
  if (/(tempo|demora|quanto tempo|prazo)/.test(t))
    return "Nosso tempo médio de entrega é de 40 a 55 minutos após a confirmação do pedido. 🕒";
  if (/(promoç|fidelid|grátis|gratis|desconto)/.test(t))
    return "A cada 5 refeições compradas, a 6ª sai por nossa conta! 🎁 É só pedir pelo mesmo telefone.";
  if (/(reserva|mesa|local|endereço|endereco)/.test(t))
    return "Estamos na Rua das Minas, 245 — Centro, Belo Horizonte. Para reservas, ligue (31) 3333-4444. 📍";
  if (/(cardápio|cardapio|prato|menu)/.test(t))
    return "Nosso cardápio tem galinhada, feijão tropeiro, strogonoff, frango com quiabo, tutu, costelinha e ótimas sobremesas. Dá uma olhada na seção Cardápio! 😋";
  if (/(obrigad|valeu|thanks)/.test(t))
    return "Por nada! Estamos sempre por aqui. 🤍";
  if (/(oi|olá|ola|bom dia|boa tarde|boa noite|hey)/.test(t))
    return "Olá! Sou o atendente virtual do Sabor de Minas. Como posso te ajudar hoje? 😊";
  return "Boa pergunta! Vou anotar e um atendente responde em instantes. Enquanto isso, posso te ajudar com horários, entrega, pagamento ou cardápio.";
}

export function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [unread, setUnread] = useState(1);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [msgs, setMsgs] = useState<Msg[]>([
    {
      from: "bot",
      text: "Olá! 👋 Sou o atendente virtual do Sabor de Minas. Como posso te ajudar?",
      ts: Date.now(),
    },
  ]);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    listRef.current?.scrollTo({ top: 99999, behavior: "smooth" });
  }, [msgs, typing, open]);

  useEffect(() => {
    if (open) setUnread(0);
  }, [open]);

  const send = (text: string) => {
    const t = text.trim();
    if (!t) return;
    setMsgs((m) => [...m, { from: "user", text: t, ts: Date.now() }]);
    setInput("");
    setTyping(true);
    setTimeout(
      () => {
        setMsgs((m) => [...m, { from: "bot", text: botReply(t), ts: Date.now() }]);
        setTyping(false);
        if (!open) setUnread((u) => u + 1);
      },
      700 + Math.random() * 600,
    );
  };

  return (
    <>
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1, type: "spring" }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setOpen((v) => !v)}
        aria-label="Abrir chat"
        className="fixed bottom-6 left-6 z-[70] grid h-14 w-14 place-items-center rounded-full bg-gradient-brand text-white shadow-glow"
      >
        {open ? <X size={22} /> : <MessageCircle size={22} />}
        {!open && unread > 0 && (
          <span className="absolute -top-1 -right-1 grid h-5 w-5 place-items-center rounded-full bg-gold text-[10px] font-bold text-ink">
            {unread}
          </span>
        )}
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-24 left-6 z-[70] flex h-[32rem] w-[22rem] max-w-[calc(100vw-3rem)] flex-col overflow-hidden rounded-3xl border bg-background shadow-elegant"
          >
            <header className="flex items-center gap-3 border-b bg-gradient-brand p-4 text-white">
              <div className="grid h-10 w-10 place-items-center rounded-full bg-white/15 backdrop-blur">
                <MessageCircle size={18} />
              </div>
              <div className="flex-1">
                <div className="font-display font-bold leading-tight">Fale com a gente</div>
                <div className="flex items-center gap-1.5 text-xs text-white/80">
                  <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_8px_currentColor]" />
                  Online agora
                </div>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="grid h-8 w-8 place-items-center rounded-full hover:bg-white/15"
                aria-label="Fechar"
              >
                <X size={16} />
              </button>
            </header>

            <div ref={listRef} className="flex-1 overflow-y-auto bg-surface-2/40 p-4 space-y-3">
              {msgs.map((m, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${m.from === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                      m.from === "user"
                        ? "bg-gradient-brand text-white rounded-br-sm"
                        : "bg-card border rounded-bl-sm"
                    }`}
                  >
                    {m.text}
                  </div>
                </motion.div>
              ))}
              {typing && (
                <div className="flex justify-start">
                  <div className="rounded-2xl rounded-bl-sm border bg-card px-4 py-3">
                    <span className="inline-flex gap-1">
                      <span className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground [animation-delay:-0.3s]" />
                      <span className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground [animation-delay:-0.15s]" />
                      <span className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground" />
                    </span>
                  </div>
                </div>
              )}

              {msgs.length <= 1 && (
                <div className="pt-2 space-y-2">
                  <div className="text-[11px] uppercase tracking-wider text-muted-foreground">
                    Perguntas frequentes
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {SUGGESTIONS.map((s) => (
                      <button
                        key={s}
                        onClick={() => send(s)}
                        className="rounded-full border bg-card px-3 py-1.5 text-xs hover:border-brand/50 hover:text-brand transition-colors"
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                send(input);
              }}
              className="flex items-center gap-2 border-t bg-background p-3"
            >
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Escreva sua mensagem..."
                aria-label="Mensagem"
                className="flex-1 rounded-full border bg-card px-4 py-2.5 text-sm outline-none focus:border-brand"
              />
              <button
                type="submit"
                disabled={!input.trim()}
                className="grid h-10 w-10 place-items-center rounded-full bg-gradient-brand text-white shadow-glow disabled:opacity-40"
                aria-label="Enviar"
              >
                <Send size={16} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}