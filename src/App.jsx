import { useState, useEffect } from "react";

// ============================================================
// DATOS REALES - Estación de Carretera Hohenau
// ============================================================
const PRODUCTS = [
  { id: 1, name: "Canasto Artesanal Tejido", price: 85000, category: "Artesanías", vendedora: "Familia Quispe", image: "https://images.unsplash.com/photo-1606722590583-6951b5ea92ad?w=400&h=400&fit=crop", badge: "Más vendido" },
  { id: 2, name: "Miel de Abeja Natural", price: 45000, category: "Agropecuario", vendedora: "Familia Müller", image: "https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=400&h=400&fit=crop", badge: null },
  { id: 3, name: "Dulce de Leche Casero", price: 28000, category: "Agropecuario", vendedora: "Familia Tanaka", image: "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=400&h=400&fit=crop", badge: "Nuevo" },
  { id: 4, name: "Manta Bordada a Mano", price: 180000, category: "Textiles", vendedora: "Familia Flores", image: "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=400&h=400&fit=crop", badge: null },
  { id: 5, name: "Tabla de Cedro Tallada", price: 95000, category: "Madera", vendedora: "Familia Silva", image: "https://images.unsplash.com/photo-1604177091072-ad2e4ec03be6?w=400&h=400&fit=crop", badge: null },
  { id: 6, name: "Mermelada Artesanal", price: 22000, category: "Agropecuario", vendedora: "Familia Schmidt", image: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=400&h=400&fit=crop", badge: "Oferta" },
  { id: 7, name: "Collar Típico Paraguayo", price: 65000, category: "Artesanías", vendedora: "Familia Torres", image: "https://images.unsplash.com/photo-1573408301185-9519f94350d3?w=400&h=400&fit=crop", badge: null },
  { id: 8, name: "Queso Fresco de Campo", price: 38000, category: "Agropecuario", vendedora: "Familia Reimer", image: "https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?w=400&h=400&fit=crop", badge: null },
];

const CATEGORIES = ["Todos", "Artesanías", "Agropecuario", "Textiles", "Madera"];

const FAMILIAS = [
  { name: "Familia Tanaka", origen: "Comunidad japonesa", products: 14, avatar: "田" },
  { name: "Familia Müller", origen: "Comunidad alemana", products: 9, avatar: "M" },
  { name: "Familia Quispe", origen: "Comunidad paraguaya", products: 12, avatar: "Q" },
  { name: "Familia Schmidt", origen: "Comunidad alemana", products: 7, avatar: "S" },
  { name: "Familia Flores", origen: "Comunidad paraguaya", products: 11, avatar: "F" },
  { name: "Familia Silva", origen: "Comunidad brasileña", products: 8, avatar: "S" },
];

const formatPrice = (p) => `₲ ${p.toLocaleString("es-PY")}`;

// ============================================================
// LOGO SVG - Recreado del logo oficial (verde, vectorial)
// ============================================================
const LogoIcon = ({ size = 36, color = "#2D7A2D" }) => (
  <svg width={size} height={size} viewBox="0 0 100 80" fill={color} xmlns="http://www.w3.org/2000/svg">
    {/* Árbol izquierdo - grande */}
    <polygon points="18,50 28,50 28,42 35,42 22,22 9,42 16,42 16,50" />
    <rect x="20" y="50" width="4" height="8" />
    {/* Árbol derecho - pequeño */}
    <polygon points="32,50 40,50 40,44 45,44 36,28 27,44 32,44" />
    <rect x="34" y="50" width="3" height="6" />
    {/* Base / suelo */}
    <rect x="5" y="56" width="90" height="5" rx="2" />
    {/* Casa */}
    <polygon points="55,35 95,35 95,20 75,8 55,20" />
    <rect x="57" y="35" width="36" height="22" />
    {/* Ventana / ícono persona */}
    <circle cx="75" cy="38" r="4" fill="white" />
    <path d="M68,52 Q75,44 82,52" fill="white" stroke="none" />
  </svg>
);

// ============================================================
// COMPONENTE PRINCIPAL
// ============================================================
export default function App() {
  const [cart, setCart] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [category, setCategory] = useState("Todos");
  const [added, setAdded] = useState(null);

  const filtered = category === "Todos" ? PRODUCTS : PRODUCTS.filter(p => p.category === category);
  const cartCount = cart.reduce((s, i) => s + i.qty, 0);
  const cartTotal = cart.reduce((s, i) => s + i.price * i.qty, 0);

  const addToCart = (product) => {
    setCart(prev => {
      const ex = prev.find(i => i.id === product.id);
      return ex
        ? prev.map(i => i.id === product.id ? { ...i, qty: i.qty + 1 } : i)
        : [...prev, { ...product, qty: 1 }];
    });
    setAdded(product.id);
    setTimeout(() => setAdded(null), 1200);
  };

  const removeFromCart = (id) => setCart(prev => prev.filter(i => i.id !== id));
  const updateQty = (id, delta) => setCart(prev =>
    prev.map(i => i.id === id ? { ...i, qty: Math.max(1, i.qty + delta) } : i)
  );

  useEffect(() => {
    document.body.style.overflow = cartOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [cartOpen]);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,600;0,700;1,500&family=Plus+Jakarta+Sans:wght@300;400;500;600&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        :root {
          --green:       #2D7A2D;
          --green-dark:  #1E5C1E;
          --green-light: #EBF4EB;
          --green-mid:   #4A9E4A;
          --cream:       #FAFAF5;
          --cream-dark:  #F0F0E8;
          --brown:       #2C2416;
          --warm:        #7A6E5A;
          --white:       #FFFFFF;
          --gold:        #C8A84B;
        }
        body { font-family: 'Plus Jakarta Sans', sans-serif; background: var(--cream); color: var(--brown); }
        h1, h2, h3, h4 { font-family: 'Playfair Display', serif; }

        /* NAVBAR */
        .nav { position: fixed; top: 0; width: 100%; z-index: 100;
          display: flex; align-items: center; justify-content: space-between;
          padding: 0 48px; height: 70px;
          background: rgba(250,250,245,0.96); backdrop-filter: blur(12px);
          border-bottom: 1px solid rgba(45,122,45,0.12); }
        .nav-logo { display: flex; align-items: center; gap: 10px; }
        .nav-logo-text { display: flex; flex-direction: column; line-height: 1.1; }
        .nav-logo-main { font-family: 'Playfair Display', serif; font-size: 16px;
          font-weight: 700; color: var(--green-dark); letter-spacing: 0.02em; }
        .nav-logo-sub { font-size: 9px; font-weight: 600; letter-spacing: 0.14em;
          text-transform: uppercase; color: var(--warm); }
        .nav-links { display: flex; gap: 36px; list-style: none; }
        .nav-links a { text-decoration: none; font-size: 12px; font-weight: 600;
          letter-spacing: 0.07em; text-transform: uppercase; color: var(--warm);
          transition: color 0.2s; }
        .nav-links a:hover { color: var(--green); }
        .cart-btn { position: relative; background: var(--green); color: white; border: none;
          padding: 10px 22px; border-radius: 30px; font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 13px; font-weight: 600; cursor: pointer; display: flex; align-items: center;
          gap: 8px; transition: background 0.2s; }
        .cart-btn:hover { background: var(--green-dark); }
        .cart-badge { background: var(--gold); color: var(--brown); border-radius: 50%;
          width: 19px; height: 19px; font-size: 11px; display: flex; align-items: center;
          justify-content: center; font-weight: 700; }

        /* HERO */
        .hero { min-height: 100vh; display: grid; grid-template-columns: 55% 45%;
          padding-top: 70px; }
        .hero-left { display: flex; flex-direction: column; justify-content: center;
          padding: 80px 64px; position: relative; }
        .hero-left::before { content: ''; position: absolute; top: 0; left: 0; right: 0; bottom: 0;
          background: radial-gradient(ellipse at 20% 50%, rgba(45,122,45,0.06) 0%, transparent 60%);
          pointer-events: none; }
        .michi-tag { display: inline-flex; align-items: center; gap: 8px;
          background: var(--green-light); color: var(--green-dark); font-size: 11px;
          font-weight: 600; letter-spacing: 0.1em; text-transform: uppercase;
          padding: 7px 16px; border-radius: 20px; margin-bottom: 28px; width: fit-content;
          border: 1px solid rgba(45,122,45,0.2); }
        .michi-kanji { font-size: 14px; }
        .hero-title { font-size: clamp(40px, 5.5vw, 72px); font-weight: 700; line-height: 1.08;
          color: var(--brown); margin-bottom: 10px; }
        .hero-title em { color: var(--green); font-style: italic; }
        .hero-subtitle { font-size: 13px; font-weight: 600; letter-spacing: 0.12em;
          text-transform: uppercase; color: var(--green); margin-bottom: 20px; }
        .hero-sub { font-size: 15px; color: var(--warm); line-height: 1.75; max-width: 440px;
          margin-bottom: 40px; }
        .hero-ctas { display: flex; gap: 12px; flex-wrap: wrap; }
        .btn-primary { background: var(--green); color: white; border: none;
          padding: 14px 30px; border-radius: 30px; font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 14px; font-weight: 600; cursor: pointer; transition: all 0.2s; }
        .btn-primary:hover { background: var(--green-dark); transform: translateY(-1px); }
        .btn-outline { background: transparent; color: var(--brown); border: 1.5px solid rgba(44,36,22,0.25);
          padding: 14px 28px; border-radius: 30px; font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 14px; font-weight: 600; cursor: pointer; transition: all 0.2s; }
        .btn-outline:hover { border-color: var(--green); color: var(--green); }
        .hero-stats { display: flex; gap: 40px; margin-top: 52px; padding-top: 40px;
          border-top: 1px solid rgba(45,122,45,0.15); }
        .stat-num { font-family: 'Playfair Display', serif; font-size: 44px; font-weight: 700;
          color: var(--green); line-height: 1; }
        .stat-label { font-size: 11px; color: var(--warm); text-transform: uppercase;
          letter-spacing: 0.08em; margin-top: 5px; font-weight: 500; }

        /* HERO RIGHT - Foto mosaico */
        .hero-right { position: relative; overflow: hidden; }
        .hero-img-grid { display: grid; grid-template-rows: 60% 40%; height: 100%; gap: 3px; }
        .hero-img-top { width: 100%; height: 100%; object-fit: cover; display: block; }
        .hero-img-bottom { display: grid; grid-template-columns: 1fr 1fr; gap: 3px; }
        .hero-img-bottom img { width: 100%; height: 100%; object-fit: cover; display: block; }
        .hero-badge { position: absolute; bottom: 24px; left: 24px;
          background: rgba(255,255,255,0.95); backdrop-filter: blur(8px);
          border-radius: 12px; padding: 12px 18px; display: flex; align-items: center; gap: 10px;
          box-shadow: 0 8px 24px rgba(0,0,0,0.12); }
        .hero-badge-icon { font-size: 22px; }
        .hero-badge-text { font-size: 11px; font-weight: 600; color: var(--brown); line-height: 1.4; }
        .hero-badge-text span { color: var(--green); display: block; font-size: 13px; }

        /* JICA BANNER */
        .jica-banner { background: var(--green); color: white;
          padding: 16px 48px; display: flex; align-items: center; justify-content: center;
          gap: 32px; flex-wrap: wrap; }
        .jica-item { display: flex; align-items: center; gap: 8px; font-size: 12px;
          font-weight: 500; letter-spacing: 0.04em; opacity: 0.95; }
        .jica-dot { width: 5px; height: 5px; border-radius: 50%; background: var(--gold); flex-shrink: 0; }

        /* CATALOG */
        .section { padding: 80px 60px; }
        .section-header { text-align: center; margin-bottom: 48px; }
        .section-eyebrow { font-size: 11px; font-weight: 700; letter-spacing: 0.14em;
          text-transform: uppercase; color: var(--green); margin-bottom: 10px; }
        .section-title { font-size: clamp(28px, 4vw, 48px); font-weight: 700;
          color: var(--brown); margin-bottom: 12px; }
        .section-sub { color: var(--warm); font-size: 15px; }
        .cats { display: flex; gap: 10px; justify-content: center; flex-wrap: wrap; margin-bottom: 40px; }
        .cat-btn { background: transparent; border: 1.5px solid rgba(45,122,45,0.2);
          color: var(--warm); padding: 8px 22px; border-radius: 20px;
          font-family: 'Plus Jakarta Sans', sans-serif; font-size: 13px; font-weight: 600;
          cursor: pointer; transition: all 0.2s; }
        .cat-btn.active, .cat-btn:hover { background: var(--green); border-color: var(--green); color: white; }
        .products-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(240px, 1fr)); gap: 22px; }
        .product-card { background: var(--white); border-radius: 16px; overflow: hidden;
          transition: transform 0.25s, box-shadow 0.25s; border: 1px solid var(--cream-dark); }
        .product-card:hover { transform: translateY(-5px); box-shadow: 0 20px 40px rgba(45,122,45,0.12); }
        .product-img-wrap { position: relative; aspect-ratio: 1; overflow: hidden; }
        .product-img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.4s; display: block; }
        .product-card:hover .product-img { transform: scale(1.06); }
        .product-badge { position: absolute; top: 12px; left: 12px; background: var(--green);
          color: white; font-size: 10px; font-weight: 700; letter-spacing: 0.06em;
          text-transform: uppercase; padding: 4px 10px; border-radius: 10px; }
        .product-info { padding: 16px 18px 18px; }
        .product-vendor { font-size: 11px; color: var(--green); text-transform: uppercase;
          letter-spacing: 0.06em; margin-bottom: 4px; font-weight: 600; }
        .product-name { font-family: 'Playfair Display', serif; font-size: 17px; font-weight: 600;
          color: var(--brown); margin-bottom: 12px; line-height: 1.3; }
        .product-footer { display: flex; align-items: center; justify-content: space-between; }
        .product-price { font-size: 14px; font-weight: 700; color: var(--green-dark); }
        .add-btn { background: var(--green-light); color: var(--green-dark); border: none;
          padding: 8px 16px; border-radius: 20px; font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 12px; font-weight: 600; cursor: pointer; transition: all 0.2s; }
        .add-btn.ok { background: var(--green) !important; color: white !important; }
        .add-btn:hover { background: var(--green); color: white; }

        /* FAMILIAS */
        .familias-section { background: var(--green-dark); padding: 80px 60px; }
        .familias-section .section-eyebrow { color: var(--gold); }
        .familias-section .section-title { color: var(--white); }
        .familias-section .section-sub { color: rgba(255,255,255,0.6); }
        .familias-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(190px, 1fr));
          gap: 16px; margin-top: 40px; }
        .familia-card { background: rgba(255,255,255,0.07); border: 1px solid rgba(255,255,255,0.1);
          border-radius: 14px; padding: 22px 18px; text-align: center; transition: background 0.2s; }
        .familia-card:hover { background: rgba(255,255,255,0.12); }
        .familia-avatar { width: 52px; height: 52px; border-radius: 50%; background: var(--green-mid);
          display: flex; align-items: center; justify-content: center; font-size: 18px;
          font-weight: 700; color: white; margin: 0 auto 14px; font-family: 'Playfair Display', serif; }
        .familia-name { font-family: 'Playfair Display', serif; font-size: 15px; font-weight: 600;
          color: white; margin-bottom: 5px; }
        .familia-origen { font-size: 11px; color: rgba(255,255,255,0.5); margin-bottom: 8px; }
        .familia-count { font-size: 12px; color: var(--gold); font-weight: 600; }
        .familias-counter { text-align: center; margin-top: 36px; }
        .familias-counter p { color: rgba(255,255,255,0.6); font-size: 14px; margin-bottom: 6px; }
        .familias-counter strong { color: white; font-size: 32px; font-family: 'Playfair Display', serif; }
        .familias-cta { text-align: center; margin-top: 36px; }
        .btn-light { background: white; color: var(--green-dark); border: none; padding: 14px 30px;
          border-radius: 30px; font-family: 'Plus Jakarta Sans', sans-serif; font-size: 14px;
          font-weight: 600; cursor: pointer; transition: all 0.2s; }
        .btn-light:hover { background: var(--green-light); }

        /* INFO SECTION */
        .info-section { padding: 80px 60px; background: var(--cream-dark); }
        .info-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; margin-top: 40px; }
        .info-card { background: white; border-radius: 16px; padding: 28px 24px; }
        .info-icon { font-size: 28px; margin-bottom: 14px; }
        .info-title { font-family: 'Playfair Display', serif; font-size: 18px; font-weight: 600;
          color: var(--brown); margin-bottom: 8px; }
        .info-text { font-size: 13px; color: var(--warm); line-height: 1.7; }

        /* CART OVERLAY */
        .overlay { position: fixed; inset: 0; background: rgba(44,36,22,0.5); z-index: 200;
          opacity: 0; pointer-events: none; transition: opacity 0.3s; }
        .overlay.open { opacity: 1; pointer-events: all; }
        .cart-sidebar { position: fixed; right: 0; top: 0; height: 100vh; width: 380px;
          background: var(--white); z-index: 201; transform: translateX(100%);
          transition: transform 0.35s cubic-bezier(0.4,0,0.2,1); display: flex; flex-direction: column; }
        .cart-sidebar.open { transform: translateX(0); }
        .cart-header { padding: 24px; border-bottom: 1px solid var(--cream-dark);
          display: flex; align-items: center; justify-content: space-between; }
        .cart-title { font-family: 'Playfair Display', serif; font-size: 22px; font-weight: 700; }
        .cart-close { background: none; border: none; font-size: 22px; cursor: pointer; color: var(--warm); }
        .cart-items { flex: 1; overflow-y: auto; padding: 20px 24px; }
        .cart-empty { text-align: center; padding: 60px 0; color: var(--warm); font-size: 14px; }
        .cart-item { display: flex; gap: 14px; padding: 14px 0; border-bottom: 1px solid var(--cream-dark); }
        .ci-img { width: 64px; height: 64px; border-radius: 8px; object-fit: cover; flex-shrink: 0; }
        .ci-info { flex: 1; }
        .ci-name { font-size: 14px; font-weight: 600; color: var(--brown); margin-bottom: 3px; }
        .ci-vendor { font-size: 11px; color: var(--green); margin-bottom: 8px; font-weight: 600; }
        .ci-controls { display: flex; align-items: center; justify-content: space-between; }
        .qty-ctrl { display: flex; align-items: center; gap: 10px; }
        .qty-btn { background: var(--green-light); border: none; width: 26px; height: 26px;
          border-radius: 50%; cursor: pointer; font-size: 15px; display: flex;
          align-items: center; justify-content: center; color: var(--green-dark); transition: background 0.15s; }
        .qty-btn:hover { background: var(--green); color: white; }
        .ci-price { font-size: 13px; font-weight: 700; color: var(--green-dark); }
        .ci-remove { background: none; border: none; font-size: 16px; cursor: pointer;
          color: var(--warm); transition: color 0.2s; }
        .ci-remove:hover { color: #c0392b; }
        .cart-footer { padding: 20px 24px; border-top: 1px solid var(--cream-dark); }
        .cart-total-row { display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px; }
        .cart-total-label { font-size: 13px; color: var(--warm); }
        .cart-total-val { font-family: 'Playfair Display', serif; font-size: 24px;
          font-weight: 700; color: var(--green-dark); }
        .checkout-btn { width: 100%; background: var(--green); color: white; border: none;
          padding: 16px; border-radius: 30px; font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 15px; font-weight: 600; cursor: pointer; transition: background 0.2s; }
        .checkout-btn:hover { background: var(--green-dark); }

        /* FOOTER */
        .footer { background: var(--brown); padding: 40px 60px;
          display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 16px; }
        .footer-logo { display: flex; align-items: center; gap: 10px; }
        .footer-logo-text { font-family: 'Playfair Display', serif; font-size: 16px; color: white; font-weight: 700; }
        .footer-logo-sub { font-size: 9px; color: rgba(255,255,255,0.4); text-transform: uppercase;
          letter-spacing: 0.1em; display: block; margin-top: 2px; }
        .footer-links { display: flex; gap: 24px; }
        .footer-links a { color: rgba(255,255,255,0.5); font-size: 12px; text-decoration: none;
          transition: color 0.2s; }
        .footer-links a:hover { color: white; }
        .footer-copy { font-size: 11px; color: rgba(255,255,255,0.3); }

        @media (max-width: 900px) {
          .hero { grid-template-columns: 1fr; }
          .hero-right { height: 300px; }
          .hero-left, .section { padding: 48px 24px; }
          .nav { padding: 0 20px; }
          .nav-links { display: none; }
          .info-grid { grid-template-columns: 1fr; }
          .cart-sidebar { width: 100%; }
          .familias-section, .info-section { padding: 60px 24px; }
          .footer { flex-direction: column; padding: 32px 24px; text-align: center; }
          .jica-banner { padding: 14px 24px; gap: 16px; }
        }
      `}</style>

      {/* NAVBAR */}
      <nav className="nav">
        <div className="nav-logo">
          <LogoIcon size={38} color="#2D7A2D" />
          <div className="nav-logo-text">
            <span className="nav-logo-main">Estación de Carretera</span>
            <span className="nav-logo-sub">Hohenau · Agrodinámica</span>
          </div>
        </div>
        <ul className="nav-links">
          {[["Showroom","#showroom"],["Familias","#familias"],["La Estación","#info"],["Contacto","#footer"]].map(([l,h]) => (
            <li key={l}><a href={h}>{l}</a></li>
          ))}
        </ul>
        <button className="cart-btn" onClick={() => setCartOpen(true)}>
          🛒 Mi bolsa
          {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
        </button>
      </nav>

      {/* HERO */}
      <section className="hero">
        <div className="hero-left">
          <span className="michi-tag">
            <span className="michi-kanji">道の駅</span>
            Michi No Eki · Modelo Japonés
          </span>
          <h1 className="hero-title">
            El mercado de<br /><em>Hohenau</em><br />en tu pantalla
          </h1>
          <p className="hero-subtitle">Showroom de Emprendedores · Ruta PY 06</p>
          <p className="hero-sub">
            Más de 120 familias de la región — japonesas, alemanas, brasileñas y paraguayas —
            presentan sus artesanías y productos agropecuarios en un solo lugar,
            con el respaldo de EBY y la cooperación internacional de JICA.
          </p>
          <div className="hero-ctas">
            <button className="btn-primary"
              onClick={() => document.getElementById("showroom").scrollIntoView({ behavior:"smooth" })}>
              Ver Showroom →
            </button>
            <button className="btn-outline"
              onClick={() => document.getElementById("info").scrollIntoView({ behavior:"smooth" })}>
              Sobre la Estación
            </button>
          </div>
          <div className="hero-stats">
            {[["120+","Familias productoras"],["7","Días a la semana"],["100%","Hecho en Itapúa"]].map(([n,l]) => (
              <div key={l}>
                <div className="stat-num">{n}</div>
                <div className="stat-label">{l}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="hero-right">
          <div className="hero-img-grid">
            <img className="hero-img-top"
              src="https://images.unsplash.com/photo-1533900298318-6b8da08a523e?w=800&h=500&fit=crop"
              alt="Estación de Carretera" />
            <div className="hero-img-bottom">
              <img src="https://images.unsplash.com/photo-1606722590583-6951b5ea92ad?w=400&h=300&fit=crop" alt="Artesanías" />
              <img src="https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=400&h=300&fit=crop" alt="Miel natural" />
            </div>
          </div>
          <div className="hero-badge">
            <span className="hero-badge-icon">📍</span>
            <div className="hero-badge-text">
              <span>Ruta PY 06 · Hohenau</span>
              Inaugurada por el Pdte. Santiago Peña
            </div>
          </div>
        </div>
      </section>

      {/* BANNER INSTITUCIONAL */}
      <div className="jica-banner">
        <div className="jica-item"><span className="jica-dot"/> Respaldado por la Entidad Binacional Yacyretá (EBY)</div>
        <div className="jica-item"><span className="jica-dot"/> Cooperación Internacional JICA — Japón</div>
        <div className="jica-item"><span className="jica-dot"/> Integrado a la Ruta Turística de Itapúa · SENATUR</div>
      </div>

      {/* SHOWROOM / CATÁLOGO */}
      <section className="section" id="showroom">
        <div className="section-header">
          <p className="section-eyebrow">Showroom de Emprendedores</p>
          <h2 className="section-title">Productos de la Región</h2>
          <p className="section-sub">Artesanías y productos agropecuarios de 120 familias de Hohenau e Itapúa</p>
        </div>
        <div className="cats">
          {CATEGORIES.map(c => (
            <button key={c} className={`cat-btn ${category === c ? "active" : ""}`} onClick={() => setCategory(c)}>
              {c}
            </button>
          ))}
        </div>
        <div className="products-grid">
          {filtered.map(p => (
            <div key={p.id} className="product-card">
              <div className="product-img-wrap">
                <img src={p.image} alt={p.name} className="product-img" />
                {p.badge && <span className="product-badge">{p.badge}</span>}
              </div>
              <div className="product-info">
                <div className="product-vendor">{p.vendedora}</div>
                <div className="product-name">{p.name}</div>
                <div className="product-footer">
                  <span className="product-price">{formatPrice(p.price)}</span>
                  <button className={`add-btn ${added === p.id ? "ok" : ""}`} onClick={() => addToCart(p)}>
                    {added === p.id ? "✓ Agregado" : "Agregar"}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FAMILIAS */}
      <section className="familias-section" id="familias">
        <div className="section-header">
          <p className="section-eyebrow">Comunidades productoras</p>
          <h2 className="section-title">Las Familias del Showroom</h2>
          <p className="section-sub">Diversidad cultural convertida en producto de calidad</p>
        </div>
        <div className="familias-grid">
          {FAMILIAS.map(v => (
            <div key={v.name} className="familia-card">
              <div className="familia-avatar">{v.avatar}</div>
              <div className="familia-name">{v.name}</div>
              <div className="familia-origen">{v.origen}</div>
              <div className="familia-count">{v.products} productos activos</div>
            </div>
          ))}
        </div>
        <div className="familias-counter">
          <p>Total de familias productoras en la plataforma</p>
          <strong>120+ familias</strong>
        </div>
        <div className="familias-cta">
          <button className="btn-light">Quiero registrar mi familia →</button>
        </div>
      </section>

      {/* INFO */}
      <section className="info-section" id="info">
        <div className="section-header">
          <p className="section-eyebrow">La Estación de Carretera</p>
          <h2 className="section-title">Más que una tienda</h2>
          <p className="section-sub">Un punto de referencia en la Ruta PY 06, abierto los 365 días del año</p>
        </div>
        <div className="info-grid">
          <div className="info-card">
            <div className="info-icon">🏪</div>
            <div className="info-title">Showroom de Emprendedores</div>
            <div className="info-text">Artesanías y productos agropecuarios de 120 familias de la zona, en un espacio físico y ahora también digital.</div>
          </div>
          <div className="info-card">
            <div className="info-icon">🍜</div>
            <div className="info-title">Food Park de las Naciones</div>
            <div className="info-text">Gastronomía que refleja las culturas japonesa, alemana, brasileña, argentina y paraguaya presentes en la región.</div>
          </div>
          <div className="info-card">
            <div className="info-icon">🗾</div>
            <div className="info-title">Modelo Michi No Eki</div>
            <div className="info-text">Concepto japonés de parada de ruta (道の駅) replicado con éxito en Hohenau gracias a la cooperación de JICA Japón.</div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer" id="footer">
        <div className="footer-logo">
          <LogoIcon size={32} color="#4A9E4A" />
          <div>
            <div className="footer-logo-text">Estación de Carretera</div>
            <span className="footer-logo-sub">Hohenau · Itapúa · Paraguay</span>
          </div>
        </div>
        <div className="footer-links">
          <a href="https://www.instagram.com/estaciondecarretera/" target="_blank">Instagram</a>
          <a href="https://www.eby.gov.py" target="_blank">EBY</a>
          <a href="#">Contacto</a>
        </div>
        <div className="footer-copy">© 2025 · Municipalidad de Hohenau · EBY</div>
      </footer>

      {/* CARRITO */}
      <div className={`overlay ${cartOpen ? "open" : ""}`} onClick={() => setCartOpen(false)} />
      <div className={`cart-sidebar ${cartOpen ? "open" : ""}`}>
        <div className="cart-header">
          <span className="cart-title">Mi bolsa ({cartCount})</span>
          <button className="cart-close" onClick={() => setCartOpen(false)}>✕</button>
        </div>
        <div className="cart-items">
          {cart.length === 0 ? (
            <div className="cart-empty">
              <div style={{ fontSize:"40px", marginBottom:"12px" }}>🛒</div>
              Tu bolsa está vacía.<br />¡Explorá el showroom!
            </div>
          ) : cart.map(item => (
            <div key={item.id} className="cart-item">
              <img src={item.image} alt={item.name} className="ci-img" />
              <div className="ci-info">
                <div className="ci-name">{item.name}</div>
                <div className="ci-vendor">{item.vendedora}</div>
                <div className="ci-controls">
                  <div className="qty-ctrl">
                    <button className="qty-btn" onClick={() => updateQty(item.id, -1)}>−</button>
                    <span style={{ fontSize:"14px", fontWeight:600 }}>{item.qty}</span>
                    <button className="qty-btn" onClick={() => updateQty(item.id, 1)}>+</button>
                  </div>
                  <span className="ci-price">{formatPrice(item.price * item.qty)}</span>
                  <button className="ci-remove" onClick={() => removeFromCart(item.id)}>✕</button>
                </div>
              </div>
            </div>
          ))}
        </div>
        {cart.length > 0 && (
          <div className="cart-footer">
            <div className="cart-total-row">
              <span className="cart-total-label">Total estimado</span>
              <span className="cart-total-val">{formatPrice(cartTotal)}</span>
            </div>
            <button className="checkout-btn" onClick={() => alert("¡Checkout en desarrollo! 🚀")}>
              Proceder al pago →
            </button>
          </div>
        )}
      </div>
    </>
  );
}