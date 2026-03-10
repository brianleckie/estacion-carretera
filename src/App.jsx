import { useState, useEffect } from "react";

const WHATSAPP_BASE = "https://wa.me/595";
const TEL_ESTACION = "0994855562";
const MAPS_URL = "https://www.google.com/maps/place/Estaci%C3%B3n+de+Carretera+-+Hohenau+-+Michi+no+Eki/@-27.0724942,-55.6303897,17z";

const EMPRENDEDORES_DATA = {
  "Almaluna":           { tel: "994855562", duena: "Marlene Kleiner" },
  "Gloria Estampados":  { tel: "994855562", duena: "Gloria" },
  "Arte Paraguayo":     { tel: "994855562", duena: "Ana Villalba" },
  "Campo Verde":        { tel: "994855562", duena: "Luis Reimer" },
  "Lácteos Hohenau":    { tel: "994855562", duena: "Familia Schmidt" },
  "Tejidos del Sur":    { tel: "994855562", duena: "Rosa Flores" },
  "Cerámica Nativa":    { tel: "994855562", duena: "Elena Torres" },
  "Sabores de Itapúa":  { tel: "994855562", duena: "Familia Müller" },
};

const waLink = (tel, producto) =>
  `${WHATSAPP_BASE}${tel}?text=Hola!%20Me%20interesa%20el%20producto:%20*${encodeURIComponent(producto)}*%20que%20vi%20en%20Estaci%C3%B3n%20de%20Carretera.`;

const CATEGORIES = [
  { label: "Todos",      emoji: "✦" },
  { label: "Alimentos",  emoji: "🍯" },
  { label: "Artesanías", emoji: "🧺" },
  { label: "Textiles",   emoji: "🪡" },
  { label: "Cerámica",   emoji: "🏺" },
  { label: "Ropa",       emoji: "👕" },
  { label: "Arte",       emoji: "🎨" },
  { label: "Cosmética",  emoji: "🌿" },
  { label: "Madera",     emoji: "🪵" },
];

const PRODUCTS = [
  { id: 1,  name: "Jabón Artesanal Natural",     price: 28000,  category: "Cosmética",  vendedora: "Almaluna",         badge: "Destacado", image: "https://images.unsplash.com/photo-1600857544200-b2f666a9a2ec?w=600&h=600&fit=crop",    desc: "Jabones artesanales con ingredientes naturales de la región, sin sulfatos ni parabenos. Cada pieza hecha a mano por Marlene Kleiner." },
  { id: 2,  name: "Remera Estampada Guaraní",    price: 85000,  category: "Ropa",       vendedora: "Gloria Estampados", badge: "Nuevo",     image: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=600&h=600&fit=crop",    desc: "Remeras de algodón con diseños originales inspirados en la cultura guaraní. Estampado artesanal hecho a mano por Gloria." },
  { id: 3,  name: "Pintura Paisaje Paraguayo",   price: 320000, category: "Arte",       vendedora: "Arte Paraguayo",    badge: null,        image: "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=600&h=600&fit=crop",    desc: "Pinturas al óleo sobre tela, representando paisajes del departamento de Itapúa. Piezas únicas firmadas por la artista." },
  { id: 4,  name: "Miel de Abeja Pura",          price: 45000,  category: "Alimentos",  vendedora: "Campo Verde",       badge: null,        image: "https://publish.purewow.net/wp-content/uploads/sites/2/2022/11/Egg-wash-substitute-Honey-or-Maple-Syrup.jpg?fit=750%2C441", desc: "Miel pura de colmenas propias, sin aditivos ni conservantes. Cosechada en los campos de Hohenau." },
  { id: 5,  name: "Queso Paraguay Fresco",       price: 38000,  category: "Alimentos",  vendedora: "Lácteos Hohenau",   badge: null,        image: "https://images.unsplash.com/photo-1552767059-ce182ead6c1b?w=600&h=600&fit=crop",    desc: "Queso fresco elaborado con leche de vaca de pastoreo libre. Receta tradicional de la colonia alemana de Hohenau." },
  { id: 6,  name: "Hamaca Paraguaya Tejida",     price: 180000, category: "Textiles",   vendedora: "Tejidos del Sur",   badge: "Artesanal", image: "https://tse1.mm.bing.net/th/id/OIP.KRXm_zfh1KdXz_c2uWYMggHaFj?rs=1&pid=ImgDetMain&o=7&rm=3", desc: "Hamaca tradicional paraguaya tejida a mano en telar. Resistente, colorida y duradera." },
  { id: 7,  name: "Jarra Decorada a Mano",       price: 65000,  category: "Cerámica",   vendedora: "Cerámica Nativa",   badge: null,        image: "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=600&h=600&fit=crop",    desc: "Jarra de cerámica pintada a mano con motivos naturales y geométricos. Piezas únicas cocidas en horno artesanal." },
  { id: 8,  name: "Dulce de Guayaba",            price: 22000,  category: "Alimentos",  vendedora: "Sabores de Itapúa", badge: "Oferta",    image: "https://recetacubana.com/wp-content/uploads/2018/11/mermelada-de-guayaba-casera.jpg",   desc: "Dulce de guayaba de frutas frescas de la zona. Sin conservantes, elaborado en pequeños lotes con receta tradicional." },
  { id: 9,  name: "Utensilios de Madera Nativa", price: 55000,  category: "Madera",     vendedora: "Campo Verde",       badge: null,        image: "https://m.media-amazon.com/images/I/91OdxI-fJhL._AC_.jpg",                           desc: "Set de utensilios de cocina tallados en madera nativa. Tratados con aceite natural, libres de barnices tóxicos." },
  { id: 10, name: "Canasto Tejido Artesanal",    price: 72000,  category: "Artesanías", vendedora: "Tejidos del Sur",   badge: null,        image: "https://images.unsplash.com/photo-1606722590583-6951b5ea92ad?w=600&h=600&fit=crop",    desc: "Canasto tejido con fibras naturales usando técnicas transmitidas por generaciones. Cada pieza es completamente única." },
];

const EMPRENDEDORES = [
  { name: "Almaluna",          duena: "Marlene Kleiner",  rubro: "Jabones artesanales",    products: 6,  avatar: "AL" },
  { name: "Gloria Estampados", duena: "Gloria",           rubro: "Remeras con estampados", products: 8,  avatar: "GE" },
  { name: "Arte Paraguayo",    duena: "Ana Villalba",     rubro: "Pinturas y arte",         products: 5,  avatar: "AP" },
  { name: "Campo Verde",       duena: "Luis Reimer",      rubro: "Miel y madera",           products: 9,  avatar: "CV" },
  { name: "Lácteos Hohenau",   duena: "Familia Schmidt",  rubro: "Quesos y lácteos",        products: 7,  avatar: "LH" },
  { name: "Tejidos del Sur",   duena: "Rosa Flores",      rubro: "Hamacas y canastos",      products: 11, avatar: "TS" },
  { name: "Cerámica Nativa",   duena: "Elena Torres",     rubro: "Cerámica y jarras",       products: 8,  avatar: "CN" },
  { name: "Sabores de Itapúa", duena: "Familia Müller",   rubro: "Dulces y mermeladas",     products: 6,  avatar: "SI" },
];

// Novedades y eventos — reemplazar con datos reales cuando los tengan
const NOVEDADES = [
  {
    id: 1,
    titulo: "Feria de Artesanías de Otoño",
    fecha: "Abril 2025",
    desc: "Gran feria con los mejores productos de los emprendedores de la Estación. Música en vivo, gastronomía internacional y sorteos entre los presentes.",
    emoji: "🎪",
    badge: "Próximo evento",
  },
  {
    id: 2,
    titulo: "Nueva línea Almaluna — Yerba Mate",
    fecha: "Marzo 2025",
    desc: "Almaluna lanzó su nueva línea de jabones con extracto de yerba mate y karité, disponibles en el showroom a partir de esta semana.",
    emoji: "🌿",
    badge: "Novedad",
  },
  {
    id: 3,
    titulo: "Food Park: Menú Especial de Semana Santa",
    fecha: "Abril 2025",
    desc: "El Food Park de las Naciones preparó un menú especial para Semana Santa con platos típicos paraguayos, japoneses y alemanes de la región.",
    emoji: "🍜",
    badge: "Gastronomía",
  },
];

const HERO_SLIDES = [
  { src: "/hohe-edificio.jpeg",     alt: "Edificio Estación de Carretera Hohenau" },
  { src: "/hohe-inauguracion.jpeg", alt: "Inauguración con el Presidente Santiago Peña" },
];

const formatPrice = (p) => `₲ ${p.toLocaleString("es-PY")}`;

const LogoIcon = ({ size = 36, color = "#2D7A2D" }) => (
  <svg width={size} height={size} viewBox="0 0 100 80" fill={color} xmlns="http://www.w3.org/2000/svg">
    <polygon points="18,50 28,50 28,42 35,42 22,22 9,42 16,42 16,50" />
    <rect x="20" y="50" width="4" height="8" />
    <polygon points="32,50 40,50 40,44 45,44 36,28 27,44 32,44" />
    <rect x="34" y="50" width="3" height="6" />
    <rect x="5" y="56" width="90" height="5" rx="2" />
    <polygon points="55,35 95,35 95,20 75,8 55,20" />
    <rect x="57" y="35" width="36" height="22" />
    <circle cx="75" cy="38" r="4" fill="white" />
    <path d="M68,52 Q75,44 82,52" fill="white" />
  </svg>
);

const IgIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
  </svg>
);

export default function App() {
  const [cart, setCart]         = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [category, setCategory] = useState("Todos");
  const [added, setAdded]       = useState(null);
  const [selected, setSelected] = useState(null);
  const [slide, setSlide]       = useState(0);

  useEffect(() => {
    const t = setInterval(() => setSlide(s => (s + 1) % HERO_SLIDES.length), 5000);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    document.body.style.overflow = (cartOpen || selected) ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [cartOpen, selected]);

  const filtered  = category === "Todos" ? PRODUCTS : PRODUCTS.filter(p => p.category === category);
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

  const removeFromCart = (id)        => setCart(prev => prev.filter(i => i.id !== id));
  const updateQty      = (id, delta) => setCart(prev =>
    prev.map(i => i.id === id ? { ...i, qty: Math.max(1, i.qty + delta) } : i)
  );

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,600;0,700;1,500&family=Plus+Jakarta+Sans:wght@300;400;500;600&display=swap');
        *,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
        :root{
          --green:#2D7A2D;--green-dark:#1E5C1E;--green-light:#EBF4EB;--green-mid:#4A9E4A;
          --cream:#FAFAF5;--cream-dark:#F0F0E8;--brown:#2C2416;--warm:#7A6E5A;
          --white:#FFFFFF;--gold:#C8A84B;
        }
        body{font-family:'Plus Jakarta Sans',sans-serif;background:var(--cream);color:var(--brown);}
        h1,h2,h3,h4{font-family:'Playfair Display',serif;}

        /* NAVBAR */
        .nav{position:fixed;top:0;width:100%;z-index:100;display:flex;align-items:center;
          justify-content:space-between;padding:0 48px;height:70px;
          background:rgba(250,250,245,0.96);backdrop-filter:blur(12px);
          border-bottom:1px solid rgba(45,122,45,0.12);}
        .nav-logo{display:flex;align-items:center;gap:10px;text-decoration:none;}
        .nav-logo-main{font-family:'Playfair Display',serif;font-size:16px;font-weight:700;color:var(--green-dark);}
        .nav-logo-sub{font-size:9px;font-weight:600;letter-spacing:.14em;text-transform:uppercase;color:var(--warm);display:block;}
        .nav-links{display:flex;gap:28px;list-style:none;}
        .nav-links a{text-decoration:none;font-size:12px;font-weight:600;letter-spacing:.07em;
          text-transform:uppercase;color:var(--warm);transition:color .2s;}
        .nav-links a:hover{color:var(--green);}
        .cart-btn{position:relative;background:var(--green);color:white;border:none;padding:10px 22px;
          border-radius:30px;font-family:'Plus Jakarta Sans',sans-serif;font-size:13px;font-weight:600;
          cursor:pointer;display:flex;align-items:center;gap:8px;transition:background .2s;}
        .cart-btn:hover{background:var(--green-dark);}
        .cart-badge{background:var(--gold);color:var(--brown);border-radius:50%;width:19px;height:19px;
          font-size:11px;display:flex;align-items:center;justify-content:center;font-weight:700;}

        /* HERO */
        .hero{min-height:100vh;display:grid;grid-template-columns:55% 45%;padding-top:70px;}
        .hero-left{display:flex;flex-direction:column;justify-content:center;padding:80px 64px;}
        .michi-tag{display:inline-flex;align-items:center;gap:8px;background:var(--green-light);
          color:var(--green-dark);font-size:11px;font-weight:600;letter-spacing:.1em;text-transform:uppercase;
          padding:7px 16px;border-radius:20px;margin-bottom:28px;width:fit-content;
          border:1px solid rgba(45,122,45,0.2);}
        .hero-title{font-size:clamp(40px,5.5vw,72px);font-weight:700;line-height:1.08;color:var(--brown);margin-bottom:10px;}
        .hero-title em{color:var(--green);font-style:italic;}
        .hero-subtitle{font-size:13px;font-weight:600;letter-spacing:.12em;text-transform:uppercase;color:var(--green);margin-bottom:20px;}
        .hero-sub{font-size:15px;color:var(--warm);line-height:1.75;max-width:440px;margin-bottom:40px;}
        .hero-ctas{display:flex;gap:12px;flex-wrap:wrap;}
        .btn-primary{background:var(--green);color:white;border:none;padding:14px 30px;border-radius:30px;
          font-family:'Plus Jakarta Sans',sans-serif;font-size:14px;font-weight:600;cursor:pointer;transition:all .2s;}
        .btn-primary:hover{background:var(--green-dark);transform:translateY(-1px);}
        .btn-outline{background:transparent;color:var(--brown);border:1.5px solid rgba(44,36,22,.25);
          padding:14px 28px;border-radius:30px;font-family:'Plus Jakarta Sans',sans-serif;
          font-size:14px;font-weight:600;cursor:pointer;transition:all .2s;}
        .btn-outline:hover{border-color:var(--green);color:var(--green);}
        .hero-stats{display:flex;gap:40px;margin-top:52px;padding-top:40px;border-top:1px solid rgba(45,122,45,0.15);}
        .stat-num{font-family:'Playfair Display',serif;font-size:44px;font-weight:700;color:var(--green);line-height:1;}
        .stat-label{font-size:11px;color:var(--warm);text-transform:uppercase;letter-spacing:.08em;margin-top:5px;font-weight:500;}

        /* HERO SLIDESHOW */
        .hero-right{position:relative;overflow:hidden;}
        .slide{position:absolute;inset:0;transition:opacity 1.2s ease;}
        .slide img{width:100%;height:100%;object-fit:cover;display:block;}
        .slide.active{opacity:1;z-index:2;}
        .slide.inactive{opacity:0;z-index:1;}
        .slide-dots{position:absolute;bottom:20px;left:50%;transform:translateX(-50%);display:flex;gap:8px;z-index:10;}
        .dot{width:8px;height:8px;border-radius:50%;border:none;cursor:pointer;
          background:rgba(255,255,255,0.4);transition:all .3s;padding:0;}
        .dot.active{background:white;width:24px;border-radius:4px;}
        .hero-badge{position:absolute;bottom:52px;left:24px;z-index:10;background:rgba(255,255,255,0.95);
          backdrop-filter:blur(8px);border-radius:12px;padding:12px 18px;display:flex;
          align-items:center;gap:10px;box-shadow:0 8px 24px rgba(0,0,0,0.14);}
        .hero-badge-text{font-size:11px;font-weight:600;color:var(--brown);line-height:1.5;}
        .hero-badge-text span{color:var(--green);display:block;font-size:13px;}

        /* BANNER INSTITUCIONAL — incluye Intendente Enrique Hahn */
        .jica-banner{background:var(--green);color:white;padding:14px 48px;
          display:flex;align-items:center;justify-content:center;gap:32px;flex-wrap:wrap;}
        .jica-item{display:flex;align-items:center;gap:8px;font-size:12px;font-weight:500;opacity:.95;}
        .jica-dot{width:5px;height:5px;border-radius:50%;background:var(--gold);flex-shrink:0;}

        /* CATÁLOGO */
        .section{padding:80px 60px;}
        .section-header{text-align:center;margin-bottom:48px;}
        .section-eyebrow{font-size:11px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:var(--green);margin-bottom:10px;}
        .section-title{font-size:clamp(28px,4vw,48px);font-weight:700;color:var(--brown);margin-bottom:12px;}
        .section-sub{color:var(--warm);font-size:15px;}
        .cats{display:flex;gap:8px;justify-content:center;flex-wrap:wrap;margin-bottom:40px;}
        .cat-btn{background:transparent;border:1.5px solid rgba(45,122,45,0.2);color:var(--warm);
          padding:8px 18px;border-radius:20px;font-family:'Plus Jakarta Sans',sans-serif;
          font-size:13px;font-weight:600;cursor:pointer;transition:all .2s;display:flex;align-items:center;gap:6px;}
        .cat-btn.active,.cat-btn:hover{background:var(--green);border-color:var(--green);color:white;}

        /* GRILLA PRODUCTOS */
        .products-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(240px,1fr));gap:22px;}
        .product-card{background:var(--white);border-radius:16px;overflow:hidden;
          transition:transform .25s,box-shadow .25s;border:1px solid var(--cream-dark);cursor:pointer;}
        .product-card:hover{transform:translateY(-5px);box-shadow:0 20px 40px rgba(45,122,45,0.13);}
        .product-img-wrap{position:relative;aspect-ratio:1;overflow:hidden;}
        .product-img{width:100%;height:100%;object-fit:cover;transition:transform .4s;display:block;}
        .product-card:hover .product-img{transform:scale(1.07);}
        .product-overlay{position:absolute;inset:0;background:rgba(30,92,30,0.55);
          display:flex;align-items:center;justify-content:center;opacity:0;transition:opacity .25s;}
        .product-card:hover .product-overlay{opacity:1;}
        .product-overlay-text{color:white;font-size:13px;font-weight:700;letter-spacing:.08em;
          text-transform:uppercase;border:1.5px solid rgba(255,255,255,0.7);padding:8px 18px;
          border-radius:20px;background:rgba(255,255,255,0.1);backdrop-filter:blur(4px);}
        .product-badge{position:absolute;top:12px;left:12px;background:var(--gold);color:var(--brown);
          font-size:10px;font-weight:700;letter-spacing:.06em;text-transform:uppercase;padding:4px 10px;border-radius:10px;}
        .product-info{padding:16px 18px 18px;}
        .product-vendor{font-size:11px;color:var(--green);text-transform:uppercase;letter-spacing:.06em;margin-bottom:4px;font-weight:600;}
        .product-name{font-family:'Playfair Display',serif;font-size:17px;font-weight:600;color:var(--brown);margin-bottom:12px;line-height:1.3;}
        .product-footer{display:flex;align-items:center;justify-content:space-between;}
        .product-price{font-size:14px;font-weight:700;color:var(--green-dark);}
        .add-btn{background:var(--green-light);color:var(--green-dark);border:none;padding:8px 16px;
          border-radius:20px;font-family:'Plus Jakarta Sans',sans-serif;font-size:12px;font-weight:600;cursor:pointer;transition:all .2s;}
        .add-btn.ok{background:var(--green)!important;color:white!important;}
        .add-btn:hover{background:var(--green);color:white;}

        /* MODAL */
        .modal-overlay{position:fixed;inset:0;background:rgba(30,40,20,0.65);z-index:300;
          display:flex;align-items:center;justify-content:center;padding:20px;
          opacity:0;pointer-events:none;transition:opacity .3s;}
        .modal-overlay.open{opacity:1;pointer-events:all;}
        .modal{background:var(--white);border-radius:20px;overflow:hidden;width:100%;max-width:760px;
          max-height:90vh;overflow-y:auto;display:grid;grid-template-columns:1fr 1fr;
          transform:translateY(12px) scale(.97);transition:transform .3s;}
        .modal-overlay.open .modal{transform:translateY(0) scale(1);}
        .modal-img-wrap{position:relative;}
        .modal-img{width:100%;height:100%;object-fit:cover;display:block;}
        .modal-badge{position:absolute;top:14px;left:14px;background:var(--gold);color:var(--brown);
          font-size:10px;font-weight:700;letter-spacing:.06em;text-transform:uppercase;padding:5px 12px;border-radius:10px;}
        .modal-body{padding:36px 32px;display:flex;flex-direction:column;justify-content:center;gap:12px;}
        .modal-vendor{font-size:12px;font-weight:700;color:var(--green);letter-spacing:.1em;text-transform:uppercase;}
        .modal-duena{font-size:12px;color:var(--warm);}
        .modal-name{font-family:'Playfair Display',serif;font-size:26px;font-weight:700;color:var(--brown);line-height:1.2;}
        .modal-desc{font-size:14px;color:var(--warm);line-height:1.75;}
        .modal-price{font-family:'Playfair Display',serif;font-size:32px;font-weight:700;color:var(--green-dark);}
        .modal-actions{display:flex;flex-direction:column;gap:10px;margin-top:4px;}
        .wa-btn{background:#25D366;color:white;border:none;padding:14px 20px;border-radius:30px;
          font-family:'Plus Jakarta Sans',sans-serif;font-size:14px;font-weight:600;cursor:pointer;
          transition:all .2s;display:flex;align-items:center;justify-content:center;gap:8px;text-decoration:none;}
        .wa-btn:hover{background:#1ebe59;transform:translateY(-1px);}
        .modal-add-btn{background:var(--green);color:white;border:none;padding:14px 20px;border-radius:30px;
          font-family:'Plus Jakarta Sans',sans-serif;font-size:14px;font-weight:600;cursor:pointer;transition:all .2s;}
        .modal-add-btn:hover{background:var(--green-dark);}
        .modal-add-btn.ok{background:var(--green-mid)!important;}
        .modal-close{position:absolute;top:16px;right:16px;background:rgba(255,255,255,0.92);border:none;
          width:36px;height:36px;border-radius:50%;font-size:18px;cursor:pointer;display:flex;
          align-items:center;justify-content:center;color:var(--brown);z-index:10;box-shadow:0 2px 8px rgba(0,0,0,0.12);}
        .modal-close:hover{background:white;}
        .modal-wrapper{position:relative;}

        /* EMPRENDEDORES — TICKER INFINITO CSS */
        .emp-section{background:var(--green-dark);padding:80px 60px;}
        .emp-section .section-eyebrow{color:var(--gold);}
        .emp-section .section-title{color:var(--white);}
        .emp-section .section-sub{color:rgba(255,255,255,0.55);}
        .emp-ticker-wrap{
          overflow:hidden;margin-top:40px;
          -webkit-mask-image:linear-gradient(to right,transparent 0%,black 8%,black 92%,transparent 100%);
          mask-image:linear-gradient(to right,transparent 0%,black 8%,black 92%,transparent 100%);
        }
        @keyframes ticker{
          0%{transform:translateX(0);}
          100%{transform:translateX(-50%);}
        }
        .emp-grid{display:flex;gap:14px;width:max-content;animation:ticker 28s linear infinite;padding-bottom:8px;}
        .emp-ticker-wrap:hover .emp-grid{animation-play-state:paused;}
        .emp-card{background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.1);
          border-radius:14px;padding:22px 18px;text-align:center;transition:all .2s;width:190px;flex-shrink:0;}
        .emp-card:hover{background:rgba(255,255,255,0.11);transform:translateY(-2px);}
        .emp-avatar{width:52px;height:52px;border-radius:50%;background:var(--green-mid);
          display:flex;align-items:center;justify-content:center;font-size:13px;font-weight:700;
          color:white;margin:0 auto 14px;}
        .emp-name{font-family:'Playfair Display',serif;font-size:15px;font-weight:600;color:white;margin-bottom:3px;}
        .emp-duena{font-size:11px;color:rgba(255,255,255,0.4);margin-bottom:4px;}
        .emp-rubro{font-size:11px;color:rgba(255,255,255,0.55);margin-bottom:8px;}
        .emp-count{font-size:12px;color:var(--gold);font-weight:600;}
        .emp-cta{text-align:center;margin-top:36px;}
        .btn-light{background:white;color:var(--green-dark);border:none;padding:14px 30px;
          border-radius:30px;font-family:'Plus Jakarta Sans',sans-serif;font-size:14px;font-weight:600;cursor:pointer;transition:all .2s;}
        .btn-light:hover{background:var(--green-light);}

        /* NOVEDADES */
        .novedades-section{padding:80px 60px;background:var(--white);}
        .novedades-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:24px;margin-top:0;}
        .novedad-card{background:var(--cream);border-radius:16px;padding:28px 24px;
          border:1px solid var(--cream-dark);transition:all .25s;
          display:flex;flex-direction:column;gap:10px;}
        .novedad-card:hover{transform:translateY(-4px);box-shadow:0 16px 40px rgba(45,122,45,0.1);border-color:rgba(45,122,45,0.2);}
        .novedad-emoji{font-size:36px;}
        .novedad-badge{display:inline-block;background:var(--green-light);color:var(--green-dark);
          font-size:10px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;
          padding:4px 12px;border-radius:20px;width:fit-content;}
        .novedad-fecha{font-size:11px;color:var(--warm);font-weight:500;}
        .novedad-titulo{font-family:'Playfair Display',serif;font-size:19px;font-weight:700;color:var(--brown);line-height:1.3;}
        .novedad-desc{font-size:13px;color:var(--warm);line-height:1.75;flex:1;}

        /* INFO */
        .info-section{padding:80px 60px;background:var(--cream-dark);}
        .info-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:24px;margin-top:40px;}
        .info-card{background:white;border-radius:16px;padding:28px 24px;border-bottom:3px solid var(--green-light);transition:border-color .2s;}
        .info-card:hover{border-color:var(--green);}
        .info-icon{font-size:28px;margin-bottom:14px;}
        .info-title{font-family:'Playfair Display',serif;font-size:18px;font-weight:600;color:var(--brown);margin-bottom:8px;}
        .info-text{font-size:13px;color:var(--warm);line-height:1.7;}

        /* CONTACTO */
        .contacto-section{padding:80px 60px;background:var(--brown);}
        .contacto-section .section-eyebrow{color:var(--gold);}
        .contacto-section .section-title{color:white;}
        .contacto-section .section-sub{color:rgba(255,255,255,0.5);}
        .contacto-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:20px;margin-top:40px;}
        .contacto-card{display:flex;flex-direction:column;align-items:center;text-align:center;
          padding:28px 20px;background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.1);
          border-radius:16px;gap:10px;transition:background .2s;}
        .contacto-card:hover{background:rgba(255,255,255,0.1);}
        .contacto-icon{font-size:28px;}
        .contacto-label{font-size:10px;font-weight:700;letter-spacing:.12em;text-transform:uppercase;color:rgba(255,255,255,0.4);}
        .contacto-val{font-family:'Playfair Display',serif;font-size:16px;font-weight:600;color:white;}
        .contacto-btn{background:var(--green);color:white;border:none;padding:10px 22px;border-radius:20px;
          font-family:'Plus Jakarta Sans',sans-serif;font-size:13px;font-weight:600;cursor:pointer;
          text-decoration:none;transition:background .2s;display:inline-block;}
        .contacto-btn:hover{background:var(--green-mid);}
        .mapa-wrap{margin-top:32px;border-radius:16px;overflow:hidden;height:320px;border:1px solid rgba(255,255,255,0.1);}
        .mapa-wrap iframe{width:100%;height:100%;border:0;display:block;}

        /* CARRITO */
        .overlay{position:fixed;inset:0;background:rgba(44,36,22,0.5);z-index:200;opacity:0;pointer-events:none;transition:opacity .3s;}
        .overlay.open{opacity:1;pointer-events:all;}
        .cart-sidebar{position:fixed;right:0;top:0;height:100vh;width:380px;background:var(--white);
          z-index:201;transform:translateX(100%);transition:transform .35s cubic-bezier(0.4,0,0.2,1);display:flex;flex-direction:column;}
        .cart-sidebar.open{transform:translateX(0);}
        .cart-header{padding:24px;border-bottom:1px solid var(--cream-dark);display:flex;align-items:center;justify-content:space-between;}
        .cart-title{font-family:'Playfair Display',serif;font-size:22px;font-weight:700;}
        .cart-close{background:none;border:none;font-size:22px;cursor:pointer;color:var(--warm);}
        .cart-items{flex:1;overflow-y:auto;padding:20px 24px;}
        .cart-empty{text-align:center;padding:60px 0;color:var(--warm);font-size:14px;}
        .cart-item{display:flex;gap:14px;padding:14px 0;border-bottom:1px solid var(--cream-dark);}
        .ci-img{width:64px;height:64px;border-radius:8px;object-fit:cover;flex-shrink:0;}
        .ci-info{flex:1;}
        .ci-name{font-size:14px;font-weight:600;color:var(--brown);margin-bottom:3px;}
        .ci-vendor{font-size:11px;color:var(--green);margin-bottom:8px;font-weight:600;}
        .ci-controls{display:flex;align-items:center;justify-content:space-between;}
        .qty-ctrl{display:flex;align-items:center;gap:10px;}
        .qty-btn{background:var(--green-light);border:none;width:26px;height:26px;border-radius:50%;
          cursor:pointer;font-size:15px;display:flex;align-items:center;justify-content:center;
          color:var(--green-dark);transition:background .15s;}
        .qty-btn:hover{background:var(--green);color:white;}
        .ci-price{font-size:13px;font-weight:700;color:var(--green-dark);}
        .ci-remove{background:none;border:none;font-size:16px;cursor:pointer;color:var(--warm);transition:color .2s;}
        .ci-remove:hover{color:#c0392b;}
        .cart-footer{padding:20px 24px;border-top:1px solid var(--cream-dark);}
        .cart-total-row{display:flex;justify-content:space-between;align-items:center;margin-bottom:16px;}
        .cart-total-label{font-size:13px;color:var(--warm);}
        .cart-total-val{font-family:'Playfair Display',serif;font-size:24px;font-weight:700;color:var(--green-dark);}
        .checkout-btn{width:100%;background:var(--green);color:white;border:none;padding:16px;
          border-radius:30px;font-family:'Plus Jakarta Sans',sans-serif;font-size:15px;font-weight:600;cursor:pointer;transition:background .2s;}
        .checkout-btn:hover{background:var(--green-dark);}

        /* FOOTER */
        .footer{background:#1a1208;padding:36px 60px;display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:16px;}
        .footer-logo-text{font-family:'Playfair Display',serif;font-size:16px;color:white;font-weight:700;}
        .footer-logo-sub{font-size:9px;color:rgba(255,255,255,0.35);text-transform:uppercase;letter-spacing:.1em;display:block;margin-top:2px;}
        .footer-socials{display:flex;gap:12px;align-items:center;}
        .footer-social-btn{width:34px;height:34px;border-radius:50%;background:rgba(255,255,255,0.08);
          display:flex;align-items:center;justify-content:center;text-decoration:none;
          transition:background .2s;color:rgba(255,255,255,0.6);}
        .footer-social-btn:hover{background:var(--green);color:white;}
        .footer-links{display:flex;gap:20px;align-items:center;}
        .footer-links a{color:rgba(255,255,255,0.4);font-size:11px;text-decoration:none;transition:color .2s;}
        .footer-links a:hover{color:rgba(255,255,255,0.8);}
        .footer-copy{font-size:10px;color:rgba(255,255,255,0.25);}

        /* RESPONSIVE */
        @media(max-width:900px){
          .hero{grid-template-columns:1fr;}
          .hero-right{height:300px;}
          .hero-left,.section,.novedades-section{padding:48px 24px;}
          .nav{padding:0 20px;}
          .nav-links{display:none;}
          .info-grid,.contacto-grid,.novedades-grid{grid-template-columns:1fr;}
          .cart-sidebar{width:100%;}
          .emp-section,.info-section,.contacto-section{padding:60px 24px;}
          .footer{flex-direction:column;padding:28px 24px;text-align:center;}
          .jica-banner{padding:12px 20px;gap:10px;flex-direction:column;align-items:flex-start;}
          .modal{grid-template-columns:1fr;}
          .modal-img-wrap{aspect-ratio:16/9;}
          .modal-body{padding:24px;}
          .hero-stats{gap:24px;}
          .products-grid{grid-template-columns:repeat(2,1fr)!important;gap:12px!important;}
          .product-name{font-size:14px!important;}
          .product-price{font-size:12px!important;}
          .add-btn{padding:6px 10px!important;font-size:11px!important;}
          .mapa-wrap{height:220px;}
        }
      `}</style>

      {/* NAVBAR */}
      <nav className="nav">
        <div className="nav-logo">
          <LogoIcon size={38} color="#2D7A2D" />
          <div>
            <span className="nav-logo-main">Estación de Carretera</span>
            <span className="nav-logo-sub">Hohenau · Agrodinámica</span>
          </div>
        </div>
        <ul className="nav-links">
          {[
            ["Showroom","#showroom"],
            ["Emprendedores","#emprendedores"],
            ["Novedades","#novedades"],
            ["La Estación","#info"],
            ["Contacto","#contacto"],
          ].map(([l,h]) => (
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
          <span className="michi-tag"><span>道の駅</span> Michi No Eki · Modelo Japonés</span>
          <h1 className="hero-title">El mercado de<br /><em>Hohenau</em><br />en tu pantalla</h1>
          <p className="hero-subtitle">Showroom de Emprendedores · Ruta PY 06</p>
          <p className="hero-sub">Más de 50 emprendimientos locales presentan sus productos en un solo lugar, con respaldo de EBY y cooperación de JICA Japón.</p>
          <div className="hero-ctas">
            <button className="btn-primary" onClick={() => document.getElementById("showroom").scrollIntoView({ behavior:"smooth" })}>Ver Showroom →</button>
            <button className="btn-outline" onClick={() => document.getElementById("contacto").scrollIntoView({ behavior:"smooth" })}>Cómo llegar</button>
          </div>
          <div className="hero-stats">
            {[["50+","Emprendimientos"],["7","Días a la semana"],["100%","Hecho en Itapúa"]].map(([n,l]) => (
              <div key={l}><div className="stat-num">{n}</div><div className="stat-label">{l}</div></div>
            ))}
          </div>
        </div>
        <div className="hero-right">
          {HERO_SLIDES.map((s, i) => (
            <div key={i} className={`slide ${i === slide ? "active" : "inactive"}`}>
              <img src={s.src} alt={s.alt} />
            </div>
          ))}
          <div className="slide-dots">
            {HERO_SLIDES.map((_, i) => (
              <button key={i} className={`dot ${i === slide ? "active" : ""}`} onClick={() => setSlide(i)} />
            ))}
          </div>
          <div className="hero-badge">
            <span style={{fontSize:"22px"}}>📍</span>
            <div className="hero-badge-text">
              <span>Ruta PY 06 · Hohenau</span>
              Inaugurada Nov. 2024 · Pdte. Santiago Peña
            </div>
          </div>
        </div>
      </section>

      {/* BANNER INSTITUCIONAL — con Intendente Enrique Hahn */}
      <div className="jica-banner">
        <div className="jica-item"><span className="jica-dot"/>Respaldado por EBY</div>
        <div className="jica-item"><span className="jica-dot"/>Cooperación JICA — Japón</div>
        <div className="jica-item"><span className="jica-dot"/>Ruta Turística de Itapúa · SENATUR</div>
        <div className="jica-item"><span className="jica-dot"/>Iniciativa del Intendente Enrique Hahn · Municipalidad de Hohenau</div>
      </div>

      {/* SHOWROOM */}
      <section className="section" id="showroom">
        <div className="section-header">
          <p className="section-eyebrow">Showroom de Emprendedores</p>
          <h2 className="section-title">Productos de la Región</h2>
          <p className="section-sub">Hacé clic en cualquier producto para ver detalles y contactar al emprendedor</p>
        </div>
        <div className="cats">
          {CATEGORIES.map(c => (
            <button key={c.label} className={`cat-btn ${category === c.label ? "active" : ""}`} onClick={() => setCategory(c.label)}>
              <span>{c.emoji}</span>{c.label}
            </button>
          ))}
        </div>
        <div className="products-grid">
          {filtered.map(p => (
            <div key={p.id} className="product-card" onClick={() => setSelected(p)}>
              <div className="product-img-wrap">
                <img src={p.image} alt={p.name} className="product-img" />
                <div className="product-overlay"><span className="product-overlay-text">Ver detalles →</span></div>
                {p.badge && <span className="product-badge">{p.badge}</span>}
              </div>
              <div className="product-info">
                <div className="product-vendor">{p.vendedora}</div>
                <div className="product-name">{p.name}</div>
                <div className="product-footer">
                  <span className="product-price">{formatPrice(p.price)}</span>
                  <button className={`add-btn ${added === p.id ? "ok" : ""}`}
                    onClick={e => { e.stopPropagation(); addToCart(p); }}>
                    {added === p.id ? "✓ Agregado" : "Agregar"}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* EMPRENDEDORES — ticker infinito */}
      <section className="emp-section" id="emprendedores">
        <div className="section-header">
          <p className="section-eyebrow">Quiénes somos</p>
          <h2 className="section-title">Nuestros Emprendedores</h2>
          <p className="section-sub">Pasá el mouse para pausar · Deslizá para explorar</p>
        </div>
        <div className="emp-ticker-wrap">
          <div className="emp-grid">
            {[...EMPRENDEDORES, ...EMPRENDEDORES].map((e, idx) => (
              <div key={`${e.name}-${idx}`} className="emp-card">
                <div className="emp-avatar">{e.avatar}</div>
                <div className="emp-name">{e.name}</div>
                <div className="emp-duena">{e.duena}</div>
                <div className="emp-rubro">{e.rubro}</div>
                <div className="emp-count">{e.products} productos activos</div>
              </div>
            ))}
          </div>
        </div>
        <div className="emp-cta">
          <p style={{color:"rgba(255,255,255,0.45)",fontSize:"13px",marginBottom:"16px"}}>
            50+ emprendimientos registrados · Abierto a nuevos emprendedores
          </p>
          <button className="btn-light"
            onClick={() => window.open(`https://wa.me/595${TEL_ESTACION.replace(/^0/,"")}?text=Hola!%20Me%20gustar%C3%ADa%20registrar%20mi%20emprendimiento%20en%20Estaci%C3%B3n%20de%20Carretera.`, "_blank")}>
            Quiero unirme →
          </button>
        </div>
      </section>

      {/* NOVEDADES Y EVENTOS */}
      <section className="novedades-section" id="novedades">
        <div className="section-header">
          <p className="section-eyebrow">Novedades y Eventos</p>
          <h2 className="section-title">Lo que está pasando</h2>
          <p className="section-sub">Eventos, lanzamientos y noticias de la Estación de Carretera</p>
        </div>
        <div className="novedades-grid">
          {NOVEDADES.map(n => (
            <div key={n.id} className="novedad-card">
              <div className="novedad-emoji">{n.emoji}</div>
              <span className="novedad-badge">{n.badge}</span>
              <div className="novedad-fecha">{n.fecha}</div>
              <h3 className="novedad-titulo">{n.titulo}</h3>
              <p className="novedad-desc">{n.desc}</p>
            </div>
          ))}
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
          {[
            ["🏪","Showroom de Emprendedores","Artesanías y productos agropecuarios de 50+ emprendimientos, disponibles en tienda física y ahora también online."],
            ["🍜","Food Park de las Naciones","Gastronomía que refleja las culturas japonesa, alemana, brasileña, argentina y paraguaya de la región."],
            ["🗾","Modelo Michi No Eki","Concepto japonés 道の駅 replicado en Hohenau gracias a la cooperación internacional de JICA y el respaldo de EBY."],
          ].map(([icon,title,text]) => (
            <div key={title} className="info-card">
              <div className="info-icon">{icon}</div>
              <div className="info-title">{title}</div>
              <div className="info-text">{text}</div>
            </div>
          ))}
        </div>
      </section>

      {/* CONTACTO */}
      <section className="contacto-section" id="contacto">
        <div className="section-header">
          <p className="section-eyebrow">Visitanos</p>
          <h2 className="section-title">¿Cómo llegar?</h2>
          <p className="section-sub">Sobre la Ruta PY 06, Hohenau, Itapúa · Abiertos los 7 días del año</p>
        </div>
        <div className="contacto-grid">
          <div className="contacto-card">
            <span className="contacto-icon">📞</span>
            <span className="contacto-label">Teléfono / WhatsApp</span>
            <span className="contacto-val">{TEL_ESTACION}</span>
            <a className="contacto-btn"
              href={`https://wa.me/595${TEL_ESTACION.replace(/^0/,"")}?text=Hola%20Estaci%C3%B3n%20de%20Carretera!`}
              target="_blank" rel="noreferrer">Escribir por WhatsApp</a>
          </div>
          <div className="contacto-card">
            <span className="contacto-icon">🏛️</span>
            <span className="contacto-label">Municipalidad</span>
            <span className="contacto-val">Hohenau Oficial</span>
            <a className="contacto-btn" href="https://hohenau.gov.py/" target="_blank" rel="noreferrer">Ver sitio oficial</a>
          </div>
        </div>
        <div className="mapa-wrap">
          <iframe
            title="Ubicación Estación de Carretera"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3579.8!2d-55.6303897!3d-27.0724942!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9457fbdc24ac0085%3A0xbba96236764a0e81!2sEstaci%C3%B3n%20de%20Carretera%20-%20Hohenau%20-%20Michi%20no%20Eki!5e0!3m2!1ses!2spy!4v1700000000000"
            allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <div style={{display:"flex",alignItems:"center",gap:"10px"}}>
          <LogoIcon size={32} color="#4A9E4A" />
          <div>
            <div className="footer-logo-text">Estación de Carretera</div>
            <span className="footer-logo-sub">Hohenau · Itapúa · Paraguay</span>
          </div>
        </div>
        <div className="footer-socials">
          <a className="footer-social-btn" href="https://www.instagram.com/estaciondecarretera/" target="_blank" rel="noreferrer" title="Instagram">
            <IgIcon />
          </a>
          <a className="footer-social-btn" href={`https://wa.me/595${TEL_ESTACION.replace(/^0/,"")}`} target="_blank" rel="noreferrer" title="WhatsApp">
            💬
          </a>
        </div>
        <div className="footer-links">
          <a href="https://hohenau.gov.py/" target="_blank" rel="noreferrer">Municipalidad</a>
          <a href="https://www.eby.gov.py" target="_blank" rel="noreferrer">EBY</a>
        </div>
        <div className="footer-copy">© 2025 · Municipalidad de Hohenau</div>
      </footer>

      {/* MODAL */}
      <div className={`modal-overlay ${selected ? "open" : ""}`} onClick={() => setSelected(null)}>
        {selected && (
          <div className="modal-wrapper" onClick={e => e.stopPropagation()}>
            <div className="modal">
              <div className="modal-img-wrap">
                <img src={selected.image} alt={selected.name} className="modal-img" />
                {selected.badge && <span className="modal-badge">{selected.badge}</span>}
              </div>
              <div className="modal-body">
                <div className="modal-vendor">{selected.vendedora}</div>
                {EMPRENDEDORES_DATA[selected.vendedora]?.duena && (
                  <div className="modal-duena">por {EMPRENDEDORES_DATA[selected.vendedora].duena}</div>
                )}
                <h3 className="modal-name">{selected.name}</h3>
                <p className="modal-desc">{selected.desc}</p>
                <div className="modal-price">{formatPrice(selected.price)}</div>
                <div className="modal-actions">
                  <a className="wa-btn"
                    href={waLink(EMPRENDEDORES_DATA[selected.vendedora]?.tel || TEL_ESTACION.replace(/^0/,""), selected.name)}
                    target="_blank" rel="noreferrer">
                    💬 Consultar por WhatsApp
                  </a>
                  <button className={`modal-add-btn ${added === selected.id ? "ok" : ""}`} onClick={() => addToCart(selected)}>
                    {added === selected.id ? "✓ Agregado al carrito" : "Agregar al carrito"}
                  </button>
                </div>
              </div>
            </div>
            <button className="modal-close" onClick={() => setSelected(null)}>✕</button>
          </div>
        )}
      </div>

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
              <div style={{fontSize:"40px",marginBottom:"12px"}}>🛒</div>
              Tu bolsa está vacía.<br/>¡Explorá el showroom!
            </div>
          ) : cart.map(item => (
            <div key={item.id} className="cart-item">
              <img src={item.image} alt={item.name} className="ci-img" />
              <div className="ci-info">
                <div className="ci-name">{item.name}</div>
                <div className="ci-vendor">{item.vendedora}</div>
                <div className="ci-controls">
                  <div className="qty-ctrl">
                    <button className="qty-btn" onClick={() => updateQty(item.id,-1)}>−</button>
                    <span style={{fontSize:"14px",fontWeight:600}}>{item.qty}</span>
                    <button className="qty-btn" onClick={() => updateQty(item.id,1)}>+</button>
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
    <p style={{textAlign:"center",fontSize:"12px",color:"var(--warm)",marginBottom:"12px"}}>
      💳 Pagos online próximamente · Contactanos por WhatsApp para coordinar
    </p>
    <button className="checkout-btn" onClick={() => setCartOpen(false)}>
      Consultar por WhatsApp →
    </button>
  </div>
)}
      </div>
    </>
  );
}
