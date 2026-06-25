import { createContext, useContext, useMemo, useState, type ReactNode } from "react";

export type CartItem = {
  id: string;
  name: string;
  price: number;
  img: string;
  qty: number;
};

type CartCtx = {
  items: CartItem[];
  count: number;
  total: number;
  open: boolean;
  setOpen: (v: boolean) => void;
  add: (item: Omit<CartItem, "qty">) => void;
  remove: (id: string) => void;
  setQty: (id: string, qty: number) => void;
  clear: () => void;
};

const Ctx = createContext<CartCtx | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [open, setOpen] = useState(false);

  const add: CartCtx["add"] = (it) => {
    setItems((prev) => {
      const ex = prev.find((p) => p.id === it.id);
      if (ex) return prev.map((p) => (p.id === it.id ? { ...p, qty: p.qty + 1 } : p));
      return [...prev, { ...it, qty: 1 }];
    });
  };
  const remove: CartCtx["remove"] = (id) =>
    setItems((p) => p.filter((x) => x.id !== id));
  const setQty: CartCtx["setQty"] = (id, qty) =>
    setItems((p) =>
      qty <= 0
        ? p.filter((x) => x.id !== id)
        : p.map((x) => (x.id === id ? { ...x, qty } : x)),
    );
  const clear = () => setItems([]);

  const value = useMemo<CartCtx>(() => {
    const count = items.reduce((a, b) => a + b.qty, 0);
    const total = items.reduce((a, b) => a + b.qty * b.price, 0);
    return { items, count, total, open, setOpen, add, remove, setQty, clear };
  }, [items, open]);

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useCart() {
  const c = useContext(Ctx);
  if (!c) throw new Error("useCart must be used inside CartProvider");
  return c;
}

export const formatBRL = (n: number) =>
  n.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });