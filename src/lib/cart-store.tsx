import { createContext, useContext, useMemo, useState, type ReactNode } from "react";

export type CartLine = {
  id: string;
  name: string;
  price: number;
  image: string;
  size?: string;
  quantity: number;
};

type CartContextValue = {
  lines: CartLine[];
  addLine: (line: Omit<CartLine, "quantity"> & { quantity?: number }) => void;
  updateQty: (key: string, qty: number) => void;
  remove: (key: string) => void;
  clear: () => void;
  count: number;
  subtotal: number;
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);

const keyOf = (id: string, size?: string) => `${id}::${size ?? ""}`;

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  const addLine: CartContextValue["addLine"] = (line) => {
    setLines((prev) => {
      const k = keyOf(line.id, line.size);
      const idx = prev.findIndex((l) => keyOf(l.id, l.size) === k);
      const q = line.quantity ?? 1;
      if (idx >= 0) {
        const next = [...prev];
        next[idx] = { ...next[idx], quantity: next[idx].quantity + q };
        return next;
      }
      return [...prev, { ...line, quantity: q }];
    });
    setIsOpen(true);
  };

  const updateQty = (key: string, qty: number) => {
    setLines((prev) =>
      prev
        .map((l) => (keyOf(l.id, l.size) === key ? { ...l, quantity: Math.max(0, qty) } : l))
        .filter((l) => l.quantity > 0),
    );
  };

  const remove = (key: string) => {
    setLines((prev) => prev.filter((l) => keyOf(l.id, l.size) !== key));
  };

  const clear = () => setLines([]);

  const value = useMemo<CartContextValue>(() => {
    const count = lines.reduce((s, l) => s + l.quantity, 0);
    const subtotal = lines.reduce((s, l) => s + l.quantity * l.price, 0);
    return {
      lines,
      addLine,
      updateQty,
      remove,
      clear,
      count,
      subtotal,
      isOpen,
      openCart: () => setIsOpen(true),
      closeCart: () => setIsOpen(false),
    };
  }, [lines, isOpen]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}

export const cartKey = keyOf;