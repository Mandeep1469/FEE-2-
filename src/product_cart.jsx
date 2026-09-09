import React, { useState } from "react";
import { ShoppingCart, Plus, Minus, Trash2, X, Check, Tag } from "lucide-react";
const C = { paper: "#F5F1E7", card: "#FBF9F3", ink: "#22231D", muted: "#8A8471", red: "#B23A1E", green: "#33513B", line: "#D8D2C0" };
const seed = [
  { id: "p1", title: "Field Notebook", description: "Pocket-sized, waterproof cover, 96 graph-ruled pages.", price: 12.5, stock: 8 },
  { id: "p2", title: "Python code written cup", description: "A coffee cup with a funny code written on it.", price: 18, stock: 0 },
  { id: "p3", title: "Iphone 17", description: "you know it", price: 1500, stock: 30 },
];
const mono = "'Courier New', monospace";
function Zigzag() {
  return (
    <svg width="100%" height="10" viewBox="0 0 200 10" preserveAspectRatio="none" style={{ display: "block" }}>
      <polyline points="0,10 10,0 20,10 30,0 40,10 50,0 60,10 70,0 80,10 90,0 100,10 110,0 120,10 130,0 140,10 150,0 160,10 170,0 180,10 190,0 200,10" fill="none" stroke={C.muted} strokeWidth="1.5" />
    </svg>
  );
}
export default function ProductCart() {
  const [products, setProducts] = useState(seed);
  const [cart, setCart] = useState({});
  const [toast, setToast] = useState(null);
  const flash = (m) => {
    setToast(m);
    window.clearTimeout(flash._t);
    flash._t = window.setTimeout(() => setToast(null), 2200);
  };
  const removeProduct = (id) => {
    setProducts((p) => p.filter((x) => x.id !== id));
    setCart((c) => { const n = { ...c }; delete n[id]; return n; });
  };
  const changeQty = (id, delta) => {
    const p = products.find((x) => x.id === id);
    if (!p) return;
    setCart((c) => {
      const q = (c[id] || 0) + delta;
      if (q <= 0) { const n = { ...c }; delete n[id]; return n; }
      if (q > p.stock) return c;
      return { ...c, [id]: q };
    });
  };
  const addToCart = (id) => {
    const p = products.find((x) => x.id === id);
    if (!p || p.stock <= 0) return;
    if ((cart[id] || 0) >= p.stock) return flash("No more in stock");
    changeQty(id, 1);
    flash("Added to cart");
  };
  const buyNow = (id) => {
    const p = products.find((x) => x.id === id);
    if (!p || p.stock <= 0) return;
    flash(`Order placed for ${p.title} — thanks!`);
  };
  const cartItems = Object.entries(cart).map(([id, qty]) => {
    const p = products.find((x) => x.id === id);
    return p ? { ...p, qty } : null;
  }).filter(Boolean);
  const total = cartItems.reduce((s, i) => s + i.price * i.qty, 0);
  const count = cartItems.reduce((s, i) => s + i.qty, 0);
  const checkout = () => {
    if (!cartItems.length) return;
    flash(`Purchase complete — $${total.toFixed(2)} charged`);
    setCart({});
  };
  return (
    <div style={{ background: C.paper, minHeight: "100vh", padding: "32px 20px", fontFamily: "Georgia, 'Times New Roman', serif", color: C.ink }}>
      <div style={{ maxWidth: 960, margin: "0 auto" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 6 }}>
          <div>
            <div style={{ fontSize: 12, letterSpacing: 3, color: C.muted, fontFamily: mono }}>EST. TODAY</div>
            <h1 style={{ fontSize: 32, margin: "2px 0 0" }}>The Corner Shop</h1>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 8, fontFamily: mono, fontSize: 14 }}>
            <ShoppingCart size={18} />
            <span>{count} item{count === 1 ? "" : "s"}</span>
          </div>
        </div>
        <Zigzag />
        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 24, marginTop: 24 }} className="shop-grid">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }} className="product-grid">
            {products.map((p) => {
              const inCart = cart[p.id] || 0;
              const out = p.stock <= 0;
              return (
                <div key={p.id} style={{ background: C.card, border: `1px solid ${C.line}`, borderRadius: 6, padding: 16, position: "relative" }}>
                  <button onClick={() => removeProduct(p.id)} style={{ position: "absolute", top: 8, right: 8, background: "none", border: "none", color: C.muted, cursor: "pointer" }}>
                    <X size={14} />
                  </button>
                  <div style={{ display: "inline-block", fontFamily: mono, fontSize: 11, padding: "2px 8px", borderRadius: 3, color: "#fff", background: out ? C.red : C.green, transform: "rotate(-2deg)", marginBottom: 8 }}>
                    {out ? "SOLD OUT" : `${p.stock} IN STOCK`}
                  </div>
                  <h3 style={{ margin: "4px 0 6px", fontSize: 18 }}>{p.title}</h3>
                  <p style={{ margin: "0 0 12px", fontSize: 13, color: C.muted, lineHeight: 1.5, minHeight: 36 }}>{p.description}</p>
                  <div style={{ fontFamily: mono, fontSize: 20, fontWeight: "bold", marginBottom: 12, borderBottom: `1px dashed ${C.line}`, paddingBottom: 8 }}>
                    ${p.price.toFixed(2)}
                  </div>
                  <div style={{ display: "flex", gap: 8 }}>
                    <button onClick={() => addToCart(p.id)} disabled={out} style={{ flex: 1, padding: "8px 0", fontSize: 12, fontFamily: mono, background: "transparent", color: out ? C.line : C.ink, border: `1px solid ${out ? C.line : C.ink}`, borderRadius: 4, cursor: out ? "not-allowed" : "pointer" }}>
                      {inCart > 0 ? `In cart (${inCart})` : "Add to cart"}
                    </button>
                    <button onClick={() => buyNow(p.id)} disabled={out} style={{ flex: 1, padding: "8px 0", fontSize: 12, fontFamily: mono, background: out ? C.line : C.ink, color: out ? C.muted : C.paper, border: "none", borderRadius: 4, cursor: out ? "not-allowed" : "pointer" }}>
                      Buy now
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
          <div style={{ background: C.card, border: `1px solid ${C.line}`, borderRadius: 6, padding: 18, position: "sticky", top: 20, height: "fit-content" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
              <Tag size={16} />
              <span style={{ fontFamily: mono, fontSize: 13, letterSpacing: 1 }}>YOUR RECEIPT</span>
            </div>
            <Zigzag />
            <div style={{ marginTop: 14 }}>
              {!cartItems.length ? (
                <p style={{ fontSize: 13, color: C.muted, fontStyle: "italic" }}>Your cart is empty — add something from the shelf.</p>
              ) : cartItems.map((i) => (
                <div key={i.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: `1px dashed ${C.line}`, padding: "10px 0", fontSize: 13, fontFamily: mono }}>
                  <div style={{ flex: 1 }}>
                    <div>{i.title}</div>
                    <div style={{ color: C.muted, fontSize: 11, marginTop: 4 }}>${i.price.toFixed(2)} each</div>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                    <button onClick={() => changeQty(i.id, -1)} style={{ border: `1px solid ${C.line}`, background: "#fff", borderRadius: 3, cursor: "pointer", padding: 2 }}><Minus size={12} /></button>
                    <span style={{ minWidth: 16, textAlign: "center" }}>{i.qty}</span>
                    <button onClick={() => changeQty(i.id, 1)} style={{ border: `1px solid ${C.line}`, background: "#fff", borderRadius: 3, cursor: "pointer", padding: 2 }}><Plus size={12} /></button>
                    <button onClick={() => changeQty(i.id, -i.qty)} style={{ border: "none", background: "none", color: C.red, cursor: "pointer", marginLeft: 4 }}><Trash2 size={13} /></button>
                  </div>
                </div>
              ))}
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", marginTop: 14, paddingTop: 10, borderTop: `3px double ${C.ink}`, fontFamily: mono, fontSize: 15, fontWeight: "bold" }}>
              <span>TOTAL</span>
              <span>${total.toFixed(2)}</span>
            </div>
            <button onClick={checkout} disabled={!cartItems.length} style={{ width: "100%", marginTop: 14, padding: "10px 0", background: cartItems.length ? C.red : C.line, color: "#fff", border: "none", borderRadius: 4, fontSize: 13, fontFamily: mono, cursor: cartItems.length ? "pointer" : "not-allowed" }}>
              Complete purchase
            </button>
          </div>
        </div>
      </div>
      {toast && (
        <div style={{ position: "fixed", bottom: 20, right: 20, background: C.ink, color: C.paper, padding: "10px 16px", borderRadius: 6, display: "flex", alignItems: "center", gap: 8, fontFamily: mono, fontSize: 13, boxShadow: "0 4px 12px rgba(0,0,0,0.2)" }}>
          <Check size={14} />{toast}
        </div>
      )}
      <style>{`@media (max-width: 720px) { .shop-grid, .product-grid { grid-template-columns: 1fr !important; } }`}</style>
    </div>
  );
}