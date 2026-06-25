import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowLeft,
  CheckCircle2,
  CreditCard,
  Minus,
  Plus,
  QrCode,
  ShoppingBag,
  Trash2,
  X,
} from "lucide-react";
import { toast } from "sonner";
import { formatBRL, useCart } from "./CartContext";

type Step = "cart" | "checkout" | "done";
type Payment = "pix" | "card";

const DELIVERY_FEE = 7.9;

export function CartDrawer() {
  const { open, setOpen, items, count, total, setQty, remove, clear } = useCart();
  const [step, setStep] = useState<Step>("cart");
  const [payment, setPayment] = useState<Payment>("pix");
  const [orderId, setOrderId] = useState<string>("");
  const [form, setForm] = useState({
    name: "",
    phone: "",
    street: "",
    number: "",
    district: "",
    city: "Belo Horizonte",
    notes: "",
    cardName: "",
    cardNumber: "",
    cardExp: "",
    cardCvv: "",
  });

  const grand = total + (items.length > 0 ? DELIVERY_FEE : 0);

  const close = () => {
    setOpen(false);
    setTimeout(() => {
      if (step === "done") {
        setStep("cart");
        clear();
      }
    }, 300);
  };

  const validCheckout =
    form.name.trim().length > 2 &&
    form.phone.trim().length >= 8 &&
    form.street.trim() &&
    form.number.trim() &&
    form.district.trim() &&
    (payment === "pix" ||
      (form.cardNumber.replace(/\s/g, "").length >= 13 &&
        form.cardName.trim().length > 2 &&
        form.cardExp.length >= 4 &&
        form.cardCvv.length >= 3));

  const finalize = () => {
    if (!validCheckout) {
      toast.error("Preencha todos os dados de entrega e pagamento.");
      return;
    }
    const id = "SM" + Math.floor(100000 + Math.random() * 900000);
    setOrderId(id);
    setStep("done");
    toast.success(`Pedido ${id} confirmado!`);
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[80]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <button
            aria-label="Fechar"
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={close}
          />
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 260 }}
            className="absolute right-0 top-0 h-full w-full max-w-md bg-background shadow-elegant flex flex-col"
          >
            <header className="flex items-center justify-between border-b px-5 py-4">
              <div className="flex items-center gap-3">
                {step !== "cart" && step !== "done" && (
                  <button
                    onClick={() => setStep("cart")}
                    className="grid h-9 w-9 place-items-center rounded-full hover:bg-muted"
                  >
                    <ArrowLeft size={18} />
                  </button>
                )}
                <h2 className="font-display text-xl font-bold">
                  {step === "cart" && `Seu pedido (${count})`}
                  {step === "checkout" && "Entrega e pagamento"}
                  {step === "done" && "Pedido confirmado"}
                </h2>
              </div>
              <button
                onClick={close}
                className="grid h-9 w-9 place-items-center rounded-full hover:bg-muted"
                aria-label="Fechar"
              >
                <X size={18} />
              </button>
            </header>

            <div className="flex-1 overflow-y-auto">
              {step === "cart" && (
                <CartList items={items} setQty={setQty} remove={remove} />
              )}
              {step === "checkout" && (
                <CheckoutForm
                  form={form}
                  setForm={setForm}
                  payment={payment}
                  setPayment={setPayment}
                />
              )}
              {step === "done" && (
                <DoneScreen orderId={orderId} payment={payment} total={grand} />
              )}
            </div>

            {step !== "done" && items.length > 0 && (
              <footer className="border-t bg-surface-2/60 p-5 space-y-3">
                <Row label="Subtotal" value={formatBRL(total)} />
                <Row label="Entrega" value={formatBRL(DELIVERY_FEE)} />
                <Row label="Total" value={formatBRL(grand)} strong />
                {step === "cart" ? (
                  <button
                    onClick={() => setStep("checkout")}
                    className="w-full rounded-full bg-gradient-brand py-4 font-semibold text-white shadow-glow transition-transform hover:scale-[1.01] active:scale-[0.99]"
                  >
                    Ir para pagamento
                  </button>
                ) : (
                  <button
                    onClick={finalize}
                    className="w-full rounded-full bg-gradient-brand py-4 font-semibold text-white shadow-glow transition-transform hover:scale-[1.01] active:scale-[0.99]"
                  >
                    Finalizar pedido • {formatBRL(grand)}
                  </button>
                )}
              </footer>
            )}

            {step === "cart" && items.length === 0 && (
              <div className="flex-1 grid place-items-center px-8 text-center">
                <div>
                  <ShoppingBag className="mx-auto text-muted-foreground" size={48} />
                  <p className="mt-4 text-muted-foreground">
                    Seu carrinho está vazio. Que tal uma galinhada?
                  </p>
                  <button
                    onClick={close}
                    className="mt-6 rounded-full bg-ink px-6 py-3 text-sm font-semibold text-white dark:bg-brand"
                  >
                    Ver cardápio
                  </button>
                </div>
              </div>
            )}
          </motion.aside>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function Row({ label, value, strong }: { label: string; value: string; strong?: boolean }) {
  return (
    <div
      className={`flex items-center justify-between text-sm ${
        strong ? "text-base font-bold" : "text-muted-foreground"
      }`}
    >
      <span>{label}</span>
      <span className={strong ? "font-display text-brand" : ""}>{value}</span>
    </div>
  );
}

function CartList({
  items,
  setQty,
  remove,
}: {
  items: ReturnType<typeof useCart>["items"];
  setQty: ReturnType<typeof useCart>["setQty"];
  remove: ReturnType<typeof useCart>["remove"];
}) {
  return (
    <ul className="divide-y">
      {items.map((it) => (
        <li key={it.id} className="flex gap-3 p-4">
          <img
            src={it.img}
            alt={it.name}
            className="h-20 w-20 flex-none rounded-xl object-cover"
            loading="lazy"
          />
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2">
              <h3 className="font-semibold leading-tight">{it.name}</h3>
              <button
                onClick={() => remove(it.id)}
                className="text-muted-foreground hover:text-brand"
                aria-label="Remover"
              >
                <Trash2 size={16} />
              </button>
            </div>
            <div className="mt-1 text-sm font-bold text-brand">
              {formatBRL(it.price * it.qty)}
            </div>
            <div className="mt-3 inline-flex items-center rounded-full border bg-card">
              <button
                onClick={() => setQty(it.id, it.qty - 1)}
                className="grid h-8 w-8 place-items-center hover:text-brand"
                aria-label="Diminuir"
              >
                <Minus size={14} />
              </button>
              <span className="w-8 text-center text-sm font-semibold">{it.qty}</span>
              <button
                onClick={() => setQty(it.id, it.qty + 1)}
                className="grid h-8 w-8 place-items-center hover:text-brand"
                aria-label="Aumentar"
              >
                <Plus size={14} />
              </button>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}

function Field({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  className = "",
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
  className?: string;
}) {
  return (
    <label className={`block ${className}`}>
      <span className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-muted-foreground">
        {label}
      </span>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-xl border bg-card px-4 py-3 text-sm outline-none focus:border-brand transition-colors"
      />
    </label>
  );
}

function CheckoutForm({
  form,
  setForm,
  payment,
  setPayment,
}: {
  form: any;
  setForm: (f: any) => void;
  payment: Payment;
  setPayment: (p: Payment) => void;
}) {
  const upd = (k: string) => (v: string) => setForm({ ...form, [k]: v });
  return (
    <div className="p-5 space-y-6">
      <section>
        <h3 className="font-display text-lg font-bold">Endereço de entrega</h3>
        <div className="mt-3 grid grid-cols-2 gap-3">
          <Field
            label="Nome completo"
            value={form.name}
            onChange={upd("name")}
            placeholder="Maria Silva"
            className="col-span-2"
          />
          <Field
            label="Telefone"
            value={form.phone}
            onChange={upd("phone")}
            placeholder="(31) 99999-0000"
            className="col-span-2"
          />
          <Field
            label="Rua"
            value={form.street}
            onChange={upd("street")}
            placeholder="Av. Afonso Pena"
            className="col-span-2"
          />
          <Field label="Número" value={form.number} onChange={upd("number")} placeholder="1234" />
          <Field
            label="Bairro"
            value={form.district}
            onChange={upd("district")}
            placeholder="Centro"
          />
          <Field
            label="Cidade"
            value={form.city}
            onChange={upd("city")}
            className="col-span-2"
          />
          <Field
            label="Complemento / observações"
            value={form.notes}
            onChange={upd("notes")}
            placeholder="Apto 102, sem cebola..."
            className="col-span-2"
          />
        </div>
      </section>

      <section>
        <h3 className="font-display text-lg font-bold">Forma de pagamento</h3>
        <div className="mt-3 grid grid-cols-2 gap-3">
          <PayOption
            active={payment === "pix"}
            onClick={() => setPayment("pix")}
            icon={<QrCode size={20} />}
            title="Pix"
            desc="Aprovação imediata"
          />
          <PayOption
            active={payment === "card"}
            onClick={() => setPayment("card")}
            icon={<CreditCard size={20} />}
            title="Cartão"
            desc="Crédito ou débito"
          />
        </div>

        {payment === "card" && (
          <div className="mt-4 grid grid-cols-2 gap-3">
            <Field
              label="Número do cartão"
              value={form.cardNumber}
              onChange={(v) =>
                upd("cardNumber")(
                  v
                    .replace(/\D/g, "")
                    .slice(0, 16)
                    .replace(/(\d{4})(?=\d)/g, "$1 "),
                )
              }
              placeholder="0000 0000 0000 0000"
              className="col-span-2"
            />
            <Field
              label="Nome impresso"
              value={form.cardName}
              onChange={upd("cardName")}
              placeholder="MARIA SILVA"
              className="col-span-2"
            />
            <Field
              label="Validade"
              value={form.cardExp}
              onChange={(v) =>
                upd("cardExp")(
                  v
                    .replace(/\D/g, "")
                    .slice(0, 4)
                    .replace(/^(\d{2})(\d)/, "$1/$2"),
                )
              }
              placeholder="MM/AA"
            />
            <Field
              label="CVV"
              value={form.cardCvv}
              onChange={(v) => upd("cardCvv")(v.replace(/\D/g, "").slice(0, 4))}
              placeholder="123"
            />
          </div>
        )}

        {payment === "pix" && (
          <div className="mt-4 rounded-2xl border bg-card p-5 text-sm">
            <div className="flex items-center gap-3">
              <div className="grid h-12 w-12 place-items-center rounded-xl bg-gradient-brand text-white">
                <QrCode size={24} />
              </div>
              <div>
                <div className="font-semibold">QR Code Pix gerado na confirmação</div>
                <div className="text-muted-foreground">
                  Você terá 10 minutos para concluir o pagamento.
                </div>
              </div>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}

function PayOption({
  active,
  onClick,
  icon,
  title,
  desc,
}: {
  active: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  title: string;
  desc: string;
}) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-3 rounded-2xl border-2 p-4 text-left transition-all ${
        active
          ? "border-brand bg-brand/5 shadow-glow"
          : "border-border hover:border-brand/40"
      }`}
    >
      <span className={`grid h-10 w-10 place-items-center rounded-xl ${active ? "bg-gradient-brand text-white" : "bg-muted"}`}>
        {icon}
      </span>
      <span>
        <span className="block font-semibold">{title}</span>
        <span className="block text-xs text-muted-foreground">{desc}</span>
      </span>
    </button>
  );
}

function DoneScreen({
  orderId,
  payment,
  total,
}: {
  orderId: string;
  payment: Payment;
  total: number;
}) {
  return (
    <div className="flex h-full flex-col items-center justify-center p-8 text-center">
      <motion.div
        initial={{ scale: 0, rotate: -30 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: "spring", damping: 14 }}
        className="grid h-20 w-20 place-items-center rounded-full bg-gradient-brand text-white shadow-glow"
      >
        <CheckCircle2 size={40} />
      </motion.div>
      <h3 className="font-display mt-6 text-2xl font-bold">Pedido confirmado!</h3>
      <p className="mt-2 text-muted-foreground">
        Seu pedido <span className="font-semibold text-brand">#{orderId}</span> foi recebido.
      </p>
      <div className="mt-6 w-full rounded-2xl border bg-card p-5 text-left text-sm">
        <Row
          label="Pagamento"
          value={payment === "pix" ? "Pix • aguardando" : "Cartão • aprovado"}
        />
        <div className="my-3 h-px bg-border" />
        <Row label="Previsão de entrega" value="40 a 55 min" />
        <div className="my-3 h-px bg-border" />
        <Row label="Total pago" value={formatBRL(total)} strong />
      </div>
      {payment === "pix" && (
        <div className="mt-5 grid place-items-center rounded-2xl border bg-card p-6">
          <div className="grid grid-cols-8 gap-0.5">
            {Array.from({ length: 64 }).map((_, i) => (
              <span
                key={i}
                className={`h-3 w-3 ${Math.random() > 0.5 ? "bg-foreground" : "bg-transparent"}`}
              />
            ))}
          </div>
          <span className="mt-3 text-xs text-muted-foreground">
            Escaneie o QR Code no seu app bancário
          </span>
        </div>
      )}
    </div>
  );
}