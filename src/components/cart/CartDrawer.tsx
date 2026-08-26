"use client";

import { useEffect, useState } from "react";
import { Minus, Plus, Trash2, X, ShoppingBag, CheckCircle2 } from "lucide-react";
import { useCart, cartItemKey } from "@/lib/cart";
import { getCheckoutWhatsAppLink } from "@/lib/whatsapp";
import { cn } from "@/lib/utils";

type Step = "cart" | "checkout" | "success";

interface CheckoutForm {
  name: string;
  address: string;
  phone: string;
}

const EMPTY_FORM: CheckoutForm = { name: "", address: "", phone: "" };

const inputClass =
  "w-full rounded-xl bg-black/40 border border-white/10 px-4 py-3 text-white text-sm placeholder:text-slate-500 focus:border-gold-500/50 focus:outline-none focus:ring-1 focus:ring-gold-500/30 transition-colors";

export function CartDrawer() {
  const { items, removeItem, updateQuantity, total, isOpen, closeCart, clear, mounted } =
    useCart();

  const [step, setStep] = useState<Step>("cart");
  const [form, setForm] = useState<CheckoutForm>(EMPTY_FORM);
  const [errors, setErrors] = useState<Partial<CheckoutForm>>({});

  // Reset to cart view whenever the drawer opens.
  useEffect(() => {
    if (isOpen) {
      setStep("cart");
      setErrors({});
    }
  }, [isOpen]);

  // Lock body scroll while open.
  useEffect(() => {
    if (!isOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [isOpen]);

  // Close on Escape.
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeCart();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, closeCart]);

  // Auto-close shortly after a successful order (success state is shown briefly).
  useEffect(() => {
    if (step !== "success") return;
    const t = setTimeout(() => closeCart(), 2800);
    return () => clearTimeout(t);
  }, [step, closeCart]);

  const handleSubmit = () => {
    const nextErrors: Partial<CheckoutForm> = {};
    if (!form.name.trim()) nextErrors.name = "Ingresá tu nombre completo.";
    if (!form.address.trim()) nextErrors.address = "Ingresá una dirección de envío.";
    if (form.phone.replace(/\D/g, "").length < 8) {
      nextErrors.phone = "El teléfono debe tener al menos 8 dígitos.";
    }
    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }

    const url = getCheckoutWhatsAppLink(
      { name: form.name.trim(), address: form.address.trim(), phone: form.phone.trim() },
      items
    );
    window.open(url, "_blank");
    clear();
    setForm(EMPTY_FORM);
    setStep("success");
  };

  const format = (n: number) => `$${n.toLocaleString()}`;

  return (
    <>
      {/* Overlay */}
      <div
        onClick={closeCart}
        aria-hidden={!isOpen}
        className={cn(
          "fixed inset-0 z-[60] bg-black/70 backdrop-blur-sm transition-opacity duration-300",
          isOpen ? "opacity-100" : "pointer-events-none opacity-0"
        )}
      />

      {/* Drawer */}
      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Carrito de compras"
        className={cn(
          "fixed top-0 right-0 z-[70] flex h-full w-full max-w-md flex-col border-l border-gold-500/20 bg-surface shadow-2xl transition-transform duration-300 ease-out",
          isOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/10 px-6 py-5">
          <h2 className="font-serif text-xl text-white">
            {step === "checkout" ? "Finalizar compra" : "Tu carrito"}
          </h2>
          <button
            onClick={closeCart}
            aria-label="Cerrar carrito"
            className="text-gold-400 hover:text-gold-300 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto px-6 py-5">
          {!mounted ? null : step === "cart" ? (
            items.length === 0 ? (
              <div className="flex h-full flex-col items-center justify-center text-center">
                <ShoppingBag className="mb-4 h-12 w-12 text-gold-500/40" />
                <p className="text-slate-300">Tu carrito está vacío</p>
                <button onClick={closeCart} className="btn-gold-outline mt-6">
                  Seguir comprando
                </button>
              </div>
            ) : (
              <ul className="space-y-4">
                {items.map((it) => {
                  const key = cartItemKey(it);
                  const tipo = it.variantType === "BOTTLE" ? "Botella" : "Decant";
                  return (
                    <li key={key} className="glass-card flex gap-4 rounded-2xl p-4">
                      {it.imageUrl && (
                        <img
                          src={it.imageUrl}
                          alt={it.name}
                          className="h-16 w-16 flex-shrink-0 rounded-xl object-cover"
                        />
                      )}
                      <div className="min-w-0 flex-1">
                        <p className="truncate font-medium text-white">{it.name}</p>
                        <p className="text-xs text-gold-300">
                          {tipo} {it.ml}ml
                        </p>
                        <p className="text-sm text-slate-300">{format(it.price)} c/u</p>
                        <div className="mt-2 flex items-center gap-3">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => updateQuantity(key, it.quantity - 1)}
                              aria-label="Disminuir cantidad"
                              className="flex h-7 w-7 items-center justify-center rounded-lg border border-white/10 text-white/80 hover:border-gold-500/40 hover:text-gold-300"
                            >
                              <Minus className="h-3.5 w-3.5" />
                            </button>
                            <span className="w-6 text-center text-sm text-white">{it.quantity}</span>
                            <button
                              onClick={() => updateQuantity(key, it.quantity + 1)}
                              aria-label="Aumentar cantidad"
                              className="flex h-7 w-7 items-center justify-center rounded-lg border border-white/10 text-white/80 hover:border-gold-500/40 hover:text-gold-300"
                            >
                              <Plus className="h-3.5 w-3.5" />
                            </button>
                          </div>
                          <button
                            onClick={() => removeItem(key)}
                            aria-label="Eliminar producto"
                            className="ml-auto flex items-center gap-1 text-xs text-rose-400 hover:text-rose-300"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                            Eliminar
                          </button>
                        </div>
                      </div>
                      <div className="flex-shrink-0 text-right">
                        <p className="font-semibold text-gold-300">
                          {format(it.price * it.quantity)}
                        </p>
                      </div>
                    </li>
                  );
                })}
              </ul>
            )
          ) : step === "checkout" ? (
            <div className="space-y-5">
              <p className="text-sm text-slate-300">
                Completá tus datos para enviar el pedido por WhatsApp.
              </p>
              <div className="space-y-2">
                <label htmlFor="co-name" className="block text-xs uppercase tracking-widest text-gold-400">
                  Nombre completo
                </label>
                <input
                  id="co-name"
                  className={inputClass}
                  value={form.name}
                  onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                  placeholder="Ej. María González"
                />
                {errors.name && <p className="text-xs text-rose-400">{errors.name}</p>}
              </div>
              <div className="space-y-2">
                <label htmlFor="co-address" className="block text-xs uppercase tracking-widest text-gold-400">
                  Dirección
                </label>
                <input
                  id="co-address"
                  className={inputClass}
                  value={form.address}
                  onChange={(e) => setForm((f) => ({ ...f, address: e.target.value }))}
                  placeholder="Calle, número, ciudad"
                />
                {errors.address && <p className="text-xs text-rose-400">{errors.address}</p>}
              </div>
              <div className="space-y-2">
                <label htmlFor="co-phone" className="block text-xs uppercase tracking-widest text-gold-400">
                  Teléfono
                </label>
                <input
                  id="co-phone"
                  className={inputClass}
                  value={form.phone}
                  inputMode="tel"
                  onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
                  placeholder="Ej. 381 123 4567"
                />
                {errors.phone && <p className="text-xs text-rose-400">{errors.phone}</p>}
              </div>
            </div>
          ) : (
            <div className="flex h-full flex-col items-center justify-center text-center">
              <CheckCircle2 className="mb-4 h-12 w-12 text-emerald-400" />
              <p className="font-serif text-xl text-white">¡Pedido enviado!</p>
              <p className="mt-2 text-sm text-slate-300">
                Te redirigimos a WhatsApp para confirmar tu pedido con el vendedor.
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        {mounted && step === "cart" && items.length > 0 && (
          <div className="border-t border-white/10 px-6 py-5 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-300">Total estimado</span>
              <span className="font-serif text-2xl text-gold-300">{format(total)}</span>
            </div>
            <button onClick={() => setStep("checkout")} className="btn-gold w-full">
              Finalizar compra
            </button>
          </div>
        )}

        {mounted && step === "checkout" && (
          <div className="border-t border-white/10 px-6 py-5 space-y-3">
            <button onClick={handleSubmit} className="btn-gold w-full">
              Enviar pedido por WhatsApp
            </button>
            <button
              onClick={() => setStep("cart")}
              className="w-full text-center text-xs uppercase tracking-widest text-slate-400 hover:text-gold-300 transition-colors"
            >
              Volver al carrito
            </button>
          </div>
        )}
      </aside>
    </>
  );
}
