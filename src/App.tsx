/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ShoppingBag, 
  ChevronRight, 
  Star, 
  Clock, 
  Truck, 
  ShieldCheck, 
  Flame, 
  Award,
  Menu,
  X,
  Plus,
  Minus,
  Trash2,
  MapPin,
  Phone,
  User,
  CheckCircle2
} from 'lucide-react';
import { CartItem, PizzaSize, OrderInfo } from './types';

// --- Components ---

const Navbar = ({ cartCount, onOpenCart }: { cartCount: number, onOpenCart: () => void }) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-dark-wood/90 backdrop-blur-md py-3 shadow-lg' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-brand-red rounded-full flex items-center justify-center text-white font-bold text-xl">P</div>
          <span className="font-serif text-xl font-bold tracking-tight hidden sm:block">THE PIZZA COMPANY</span>
        </div>
        <div className="hidden md:flex items-center gap-8 text-sm font-medium uppercase tracking-widest">
          <a href="#attention" className="hover:text-brand-orange transition-colors">Trang chủ</a>
          <a href="#interest" className="hover:text-brand-orange transition-colors">Nguyên liệu</a>
          <a href="#desire" className="hover:text-brand-orange transition-colors">Cảm nhận</a>
          <a href="#action" className="hover:text-brand-orange transition-colors">Đặt hàng</a>
        </div>
        <button 
          onClick={onOpenCart}
          className="bg-brand-orange hover:bg-brand-orange/90 text-white px-6 py-2 rounded-full font-bold text-sm transition-transform active:scale-95 flex items-center gap-2 relative"
        >
          <ShoppingBag size={18} />
          <span className="hidden sm:inline">GIỎ HÀNG</span>
          {cartCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-brand-red text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center border-2 border-dark-wood">
              {cartCount}
            </span>
          )}
        </button>
      </div>
    </nav>
  );
};

const SteamEffect = () => {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {[...Array(6)].map((_, i) => (
        <div
          key={i}
          className="steam-particle"
          style={{
            width: `${Math.random() * 100 + 50}px`,
            height: `${Math.random() * 100 + 50}px`,
            left: `${Math.random() * 60 + 20}%`,
            top: `${Math.random() * 40 + 40}%`,
            animationDelay: `${Math.random() * 3}s`,
            animationDuration: `${Math.random() * 2 + 2}s`
          }}
        />
      ))}
    </div>
  );
};

const SectionTitle = ({ children, subtitle }: { children: React.ReactNode; subtitle?: string }) => (
  <div className="text-center mb-12">
    {subtitle && <p className="text-brand-orange font-bold tracking-[0.3em] uppercase text-xs mb-3">{subtitle}</p>}
    <h2 className="text-4xl md:text-5xl font-serif font-bold text-white">{children}</h2>
    <div className="w-24 h-1 bg-brand-gold mx-auto mt-6 rounded-full" />
  </div>
);

// --- Main App ---

export default function App() {
  const [selectedSize, setSelectedSize] = useState<PizzaSize>('M');
  const [quantity, setQuantity] = useState(1);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isOrderSuccess, setIsOrderSuccess] = useState(false);
  const [orderInfo, setOrderInfo] = useState<OrderInfo>({ name: '', phone: '', address: '', note: '' });

  const prices = {
    S: 189000,
    M: 289000,
    L: 389000
  };

  const addToCart = (size: PizzaSize, qty: number) => {
    const existingItemIndex = cart.findIndex(item => item.size === size);
    if (existingItemIndex > -1) {
      const newCart = [...cart];
      newCart[existingItemIndex].quantity += qty;
      setCart(newCart);
    } else {
      const newItem: CartItem = {
        id: `pizza-${size}-${Date.now()}`,
        name: 'Pizza Cá Hồi Hạt Sen',
        size: size,
        price: prices[size],
        quantity: qty,
        image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&q=80&w=400'
      };
      setCart([...cart, newItem]);
    }
    setIsCartOpen(true);
  };

  const removeFromCart = (id: string) => {
    setCart(cart.filter(item => item.id !== id));
  };

  const updateCartQuantity = (id: string, delta: number) => {
    setCart(cart.map(item => {
      if (item.id === id) {
        const newQty = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }));
  };

  const cartTotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);

  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate order processing
    setIsOrderSuccess(true);
    setCart([]);
    setTimeout(() => {
      setIsOrderSuccess(false);
      setIsCheckoutOpen(false);
    }, 3000);
  };

  return (
    <div className="min-h-screen selection:bg-brand-orange selection:text-white">
      <Navbar cartCount={cart.reduce((acc, item) => acc + item.quantity, 0)} onOpenCart={() => setIsCartOpen(true)} />

      {/* 1️⃣ ATTENTION (Hero Section) */}
      <section id="attention" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://picsum.photos/seed/pizza-salmon/1920/1080?brightness=0.4" 
            alt="Pizza Cá Hồi Hạt Sen" 
            className="w-full h-full object-cover scale-105"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-dark-wood/60 via-dark-wood/40 to-dark-wood" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-left"
          >
            <div className="inline-flex items-center gap-2 bg-brand-red/20 border border-brand-red/30 px-4 py-1 rounded-full text-brand-orange text-xs font-bold mb-6">
              <Flame size={14} />
              MỚI RA LÒ - GIỚI HẠN
            </div>
            <h1 className="text-6xl md:text-8xl font-serif font-bold leading-tight mb-6">
              Đẳng Cấp <span className="text-brand-gold italic">Vị Biển</span> <br />
              <span className="text-brand-orange">Bùng Nổ</span> Vị Giác
            </h1>
            <p className="text-lg md:text-xl text-gray-300 mb-10 max-w-lg leading-relaxed">
              Pizza Cá Hồi Hạt Sen – Sự kết hợp tinh tế giữa cá hồi thượng hạng và hạt sen bùi béo độc đáo. Một tuyệt phẩm từ The Pizza Company.
            </p>
            <div className="flex flex-wrap gap-4">
              <a 
                href="#action" 
                className="bg-brand-orange hover:bg-brand-orange/90 text-white px-8 py-4 rounded-full font-bold text-lg transition-all hover:scale-105 active:scale-95 shadow-xl shadow-brand-orange/20 flex items-center gap-2"
              >
                Đặt Ngay Hôm Nay
                <ChevronRight size={20} />
              </a>
              <button className="border border-white/20 hover:bg-white/10 text-white px-8 py-4 rounded-full font-bold text-lg transition-all">
                Xem Thực Đơn
              </button>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
            whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 1, type: 'spring' }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative z-10 rounded-full overflow-hidden border-8 border-brand-gold/20 shadow-2xl shadow-black/50 aspect-square">
              <img 
                src="https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&q=80&w=800" 
                alt="Close up Pizza" 
                className="w-full h-full object-cover hover:scale-110 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
              <SteamEffect />
            </div>
            {/* Floating Badges */}
            <motion.div 
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="absolute -top-4 -right-4 z-20 bg-brand-red text-white w-24 h-24 rounded-full flex flex-col items-center justify-center font-bold shadow-xl border-4 border-dark-wood"
            >
              <span className="text-xs">CHỈ TỪ</span>
              <span className="text-lg">189K</span>
            </motion.div>
            <motion.div 
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 5, repeat: Infinity, delay: 0.5 }}
              className="absolute -bottom-4 -left-4 z-20 bg-brand-gold text-dark-wood px-4 py-2 rounded-lg font-bold shadow-xl flex items-center gap-2"
            >
              <Award size={18} />
              BEST SELLER
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* 2️⃣ INTEREST (Product Details) */}
      <section id="interest" className="py-24 bg-black/30">
        <div className="max-w-7xl mx-auto px-4">
          <SectionTitle subtitle="TINH TÚY NGUYÊN LIỆU">Hương Vị Khác Biệt</SectionTitle>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                title: "Cá Hồi Thượng Hạng",
                desc: "Cá hồi tươi cao cấp từ vùng biển lạnh, giàu Omega-3 và protein.",
                img: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&q=80&w=400",
                icon: <Award className="text-brand-orange" />
              },
              {
                title: "Hạt Sen Bùi Béo",
                desc: "Hạt sen tươi tuyển chọn, nướng vừa chín tới tạo độ bùi đặc trưng.",
                img: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&q=80&w=400",
                icon: <Star className="text-brand-orange" />
              },
              {
                title: "Phô Mai Mozzarella",
                desc: "Lớp phô mai kéo sợi béo ngậy, tan chảy bao phủ toàn bộ mặt bánh.",
                img: "https://images.unsplash.com/photo-1559561853-08451507cbe7?auto=format&fit=crop&q=80&w=400",
                icon: <Flame className="text-brand-orange" />
              },
              {
                title: "Đế Bánh Giòn Tan",
                desc: "Nướng vàng giòn chuẩn công thức độc quyền từ The Pizza Company.",
                img: "https://images.unsplash.com/photo-1541745537411-b8046dc6d66c?auto=format&fit=crop&q=80&w=400",
                icon: <Clock className="text-brand-orange" />
              }
            ].map((item, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="group bg-dark-wood/50 border border-white/5 rounded-3xl overflow-hidden hover:border-brand-orange/30 transition-all"
              >
                <div className="h-48 overflow-hidden">
                  <img 
                    src={item.img} 
                    alt={item.title} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="p-6">
                  <div className="mb-4">{item.icon}</div>
                  <h3 className="text-xl font-bold mb-2 group-hover:text-brand-orange transition-colors">{item.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 3️⃣ DESIRE (Emotional & Social Proof) */}
      <section id="desire" className="py-24 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/wood-pattern.png')] opacity-10 pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <p className="text-brand-gold font-bold tracking-widest mb-4">TRẢI NGHIỆM VỊ GIÁC</p>
              <h2 className="text-4xl md:text-5xl font-serif font-bold mb-8 leading-tight">
                Tan Chảy Trong <br /> Từng <span className="text-brand-orange italic">Khoảnh Khắc</span>
              </h2>
              <blockquote className="text-2xl font-serif italic text-gray-300 mb-8 border-l-4 border-brand-orange pl-6">
                “Miếng đầu tiên tan chảy trong miệng với vị béo của cá hồi, hòa quyện cùng hạt sen bùi bùi và lớp phô mai kéo sợi đầy mê hoặc.”
              </blockquote>
              
              <div className="space-y-6 mb-10">
                <div className="flex items-start gap-4">
                  <div className="bg-brand-orange/20 p-2 rounded-lg text-brand-orange">
                    <ShieldCheck size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg">Chất Lượng Thượng Hạng</h4>
                    <p className="text-gray-400">Nguyên liệu được kiểm duyệt khắt khe mỗi ngày.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="bg-brand-orange/20 p-2 rounded-lg text-brand-orange">
                    <Truck size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg">Giao Hàng Thần Tốc</h4>
                    <p className="text-gray-400">Cam kết 30 phút, pizza luôn nóng hổi khi đến tay.</p>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                <div className="flex items-center gap-4 mb-4">
                  <div className="flex text-brand-gold">
                    {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
                  </div>
                  <span className="text-sm font-bold">4.9/5 từ 2,500+ khách hàng</span>
                </div>
                <div className="flex -space-x-3">
                  {[1, 2, 3, 4, 5].map(i => (
                    <img 
                      key={i} 
                      src={`https://i.pravatar.cc/100?img=${i + 10}`} 
                      className="w-10 h-10 rounded-full border-2 border-dark-wood" 
                      alt="User"
                      referrerPolicy="no-referrer"
                    />
                  ))}
                  <div className="w-10 h-10 rounded-full bg-brand-orange border-2 border-dark-wood flex items-center justify-center text-xs font-bold">
                    +2k
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <img src="https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&q=80&w=400" className="rounded-2xl w-full h-64 object-cover" alt="Pizza" referrerPolicy="no-referrer" />
                  <img src="https://images.unsplash.com/photo-1593560708920-61dd98c46a4e?auto=format&fit=crop&q=80&w=400" className="rounded-2xl w-full h-48 object-cover" alt="Pizza" referrerPolicy="no-referrer" />
                </div>
                <div className="space-y-4 pt-8">
                  <img src="https://images.unsplash.com/photo-1574126154517-d1e0d89ef734?auto=format&fit=crop&q=80&w=400" className="rounded-2xl w-full h-48 object-cover" alt="Pizza" referrerPolicy="no-referrer" />
                  <img src="https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&q=80&w=400" className="rounded-2xl w-full h-64 object-cover" alt="Pizza" referrerPolicy="no-referrer" />
                </div>
              </div>
              {/* Promo Badge */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-brand-red text-white p-8 rounded-full shadow-2xl border-4 border-white/20 text-center rotate-12">
                <p className="text-sm font-bold">GIẢM NGAY</p>
                <p className="text-4xl font-serif font-black">20%</p>
                <p className="text-xs font-bold">KHI ĐẶT ONLINE</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 4️⃣ ACTION (Order Section) */}
      <section id="action" className="py-24 bg-brand-orange/5 border-t border-brand-orange/10">
        <div className="max-w-7xl mx-auto px-4">
          <SectionTitle subtitle="ĐẶT HÀNG NGAY">Thưởng Thức Ngay Tại Nhà</SectionTitle>
          
          <div className="max-w-4xl mx-auto bg-dark-wood border border-white/10 rounded-[2.5rem] overflow-hidden shadow-2xl flex flex-col md:flex-row">
            <div className="md:w-1/2 p-10 flex flex-col justify-center">
              <h3 className="text-3xl font-serif font-bold mb-4">Pizza Cá Hồi Hạt Sen</h3>
              <p className="text-gray-400 mb-8">Chọn kích thước và số lượng bạn mong muốn.</p>
              
              <div className="space-y-8">
                {/* Size Selection */}
                <div>
                  <p className="text-sm font-bold uppercase tracking-widest text-brand-gold mb-4">Kích thước</p>
                  <div className="flex gap-4">
                    {(['S', 'M', 'L'] as const).map(size => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`flex-1 py-3 rounded-xl font-bold transition-all border-2 ${
                          selectedSize === size 
                            ? 'bg-brand-orange border-brand-orange text-white' 
                            : 'bg-white/5 border-white/10 text-gray-400 hover:border-white/20'
                        }`}
                      >
                        Size {size}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Quantity Selection */}
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-bold uppercase tracking-widest text-brand-gold mb-2">Số lượng</p>
                    <div className="flex items-center gap-4 bg-white/5 rounded-xl p-1 border border-white/10">
                      <button 
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="w-10 h-10 flex items-center justify-center hover:bg-white/10 rounded-lg transition-colors"
                      >
                        <Minus size={18} />
                      </button>
                      <span className="w-8 text-center font-bold text-lg">{quantity}</span>
                      <button 
                        onClick={() => setQuantity(quantity + 1)}
                        className="w-10 h-10 flex items-center justify-center hover:bg-white/10 rounded-lg transition-colors"
                      >
                        <Plus size={18} />
                      </button>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold uppercase tracking-widest text-brand-gold mb-1">Tổng cộng</p>
                    <p className="text-3xl font-serif font-bold text-brand-orange">
                      {(prices[selectedSize] * quantity).toLocaleString('vi-VN')}đ
                    </p>
                  </div>
                </div>

                <div className="space-y-3">
                  <button 
                    onClick={() => addToCart(selectedSize, quantity)}
                    className="w-full bg-brand-orange hover:bg-brand-orange/90 text-white py-5 rounded-2xl font-bold text-xl transition-all hover:scale-[1.02] active:scale-95 shadow-xl shadow-brand-orange/20 flex items-center justify-center gap-3"
                  >
                    <ShoppingBag size={24} />
                    MUA NGAY
                  </button>
                  <button 
                    onClick={() => addToCart(selectedSize, quantity)}
                    className="w-full border border-white/10 hover:bg-white/5 text-white py-4 rounded-2xl font-bold transition-all"
                  >
                    Thêm vào giỏ hàng
                  </button>
                </div>
              </div>
            </div>

            <div className="md:w-1/2 relative bg-brand-gold/10 p-10 flex items-center justify-center">
              <img 
                src="https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&q=80&w=800" 
                alt="Pizza Hero" 
                className="w-full max-w-sm drop-shadow-[0_35px_35px_rgba(0,0,0,0.5)] rotate-6"
                referrerPolicy="no-referrer"
              />
              <div className="absolute bottom-10 left-10 right-10 grid grid-cols-3 gap-4 text-center">
                <div className="bg-dark-wood/80 backdrop-blur-sm p-3 rounded-xl border border-white/10">
                  <Clock size={20} className="mx-auto mb-1 text-brand-orange" />
                  <p className="text-[10px] font-bold">30 PHÚT</p>
                </div>
                <div className="bg-dark-wood/80 backdrop-blur-sm p-3 rounded-xl border border-white/10">
                  <Truck size={20} className="mx-auto mb-1 text-brand-orange" />
                  <p className="text-[10px] font-bold">FREE SHIP</p>
                </div>
                <div className="bg-dark-wood/80 backdrop-blur-sm p-3 rounded-xl border border-white/10">
                  <ShieldCheck size={20} className="mx-auto mb-1 text-brand-orange" />
                  <p className="text-[10px] font-bold">NÓNG HỔI</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-16 grid md:grid-cols-3 gap-8 text-center max-w-4xl mx-auto">
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 bg-brand-orange/10 rounded-full flex items-center justify-center text-brand-orange mb-4">
                <Clock size={24} />
              </div>
              <h4 className="font-bold mb-2">Giao hàng nhanh</h4>
              <p className="text-sm text-gray-400">Cam kết giao hàng trong 30 phút khu vực nội thành.</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 bg-brand-orange/10 rounded-full flex items-center justify-center text-brand-orange mb-4">
                <ShoppingBag size={24} />
              </div>
              <h4 className="font-bold mb-2">Thanh toán tiện lợi</h4>
              <p className="text-sm text-gray-400">Hỗ trợ nhiều hình thức: Tiền mặt, MoMo, Thẻ ngân hàng.</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 bg-brand-orange/10 rounded-full flex items-center justify-center text-brand-orange mb-4">
                <ShieldCheck size={24} />
              </div>
              <h4 className="font-bold mb-2">Đảm bảo nóng hổi</h4>
              <p className="text-sm text-gray-400">Sử dụng túi giữ nhiệt chuyên dụng cho mọi đơn hàng.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-white/5 bg-black/50">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-brand-red rounded-full flex items-center justify-center text-white font-bold">P</div>
            <span className="font-serif text-lg font-bold tracking-tight">THE PIZZA COMPANY</span>
          </div>
          <div className="flex gap-8 text-sm text-gray-500">
            <a href="#" className="hover:text-white transition-colors">Chính sách bảo mật</a>
            <a href="#" className="hover:text-white transition-colors">Điều khoản sử dụng</a>
            <a href="#" className="hover:text-white transition-colors">Liên hệ</a>
          </div>
          <p className="text-sm text-gray-600">© 2026 The Pizza Company. All rights reserved.</p>
        </div>
      </footer>

      {/* Sticky Mobile CTA */}
      <AnimatePresence>
        <motion.div 
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          className="fixed bottom-0 left-0 right-0 z-40 p-4 md:hidden bg-dark-wood/80 backdrop-blur-lg border-t border-white/10"
        >
          <button 
            onClick={() => addToCart('M', 1)}
            className="w-full bg-brand-orange text-white py-4 rounded-xl font-bold text-center block shadow-lg shadow-brand-orange/20"
          >
            ĐẶT NGAY - CHỈ TỪ 189K
          </button>
        </motion.div>
      </AnimatePresence>

      {/* Cart Drawer */}
      <AnimatePresence>
        {isCartOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsCartOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60]"
            />
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 bottom-0 w-full max-w-md bg-dark-wood z-[70] shadow-2xl flex flex-col"
            >
              <div className="p-6 border-b border-white/10 flex justify-between items-center">
                <h2 className="text-2xl font-serif font-bold flex items-center gap-3">
                  <ShoppingBag className="text-brand-orange" />
                  Giỏ hàng của bạn
                </h2>
                <button onClick={() => setIsCartOpen(false)} className="p-2 hover:bg-white/5 rounded-full transition-colors">
                  <X size={24} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-6 space-y-6">
                {cart.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
                    <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center text-gray-600">
                      <ShoppingBag size={40} />
                    </div>
                    <p className="text-gray-400">Giỏ hàng của bạn đang trống</p>
                    <button 
                      onClick={() => setIsCartOpen(false)}
                      className="text-brand-orange font-bold hover:underline"
                    >
                      Tiếp tục mua sắm
                    </button>
                  </div>
                ) : (
                  cart.map((item) => (
                    <div key={item.id} className="flex gap-4 bg-white/5 p-4 rounded-2xl border border-white/5">
                      <div className="w-20 h-20 rounded-xl overflow-hidden flex-shrink-0">
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-start mb-1">
                          <h4 className="font-bold">{item.name}</h4>
                          <button onClick={() => removeFromCart(item.id)} className="text-gray-500 hover:text-brand-red transition-colors">
                            <Trash2 size={18} />
                          </button>
                        </div>
                        <p className="text-xs text-brand-gold font-bold mb-3 uppercase tracking-widest">Size {item.size}</p>
                        <div className="flex justify-between items-center">
                          <div className="flex items-center gap-3 bg-black/30 rounded-lg px-2 py-1">
                            <button onClick={() => updateCartQuantity(item.id, -1)} className="text-gray-400 hover:text-white"><Minus size={14} /></button>
                            <span className="text-sm font-bold w-4 text-center">{item.quantity}</span>
                            <button onClick={() => updateCartQuantity(item.id, 1)} className="text-gray-400 hover:text-white"><Plus size={14} /></button>
                          </div>
                          <p className="font-bold text-brand-orange">{(item.price * item.quantity).toLocaleString('vi-VN')}đ</p>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {cart.length > 0 && (
                <div className="p-6 border-t border-white/10 bg-black/20 space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Tổng cộng</span>
                    <span className="text-2xl font-serif font-bold text-brand-orange">{cartTotal.toLocaleString('vi-VN')}đ</span>
                  </div>
                  <button 
                    onClick={() => {
                      setIsCartOpen(false);
                      setIsCheckoutOpen(true);
                    }}
                    className="w-full bg-brand-orange hover:bg-brand-orange/90 text-white py-4 rounded-xl font-bold text-lg transition-all shadow-xl shadow-brand-orange/20"
                  >
                    TIẾN HÀNH ĐẶT HÀNG
                  </button>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Checkout Modal */}
      <AnimatePresence>
        {isCheckoutOpen && (
          <div className="fixed inset-0 z-[80] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => !isOrderSuccess && setIsCheckoutOpen(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-md"
            />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative w-full max-w-2xl bg-dark-wood rounded-[2.5rem] border border-white/10 shadow-2xl overflow-hidden"
            >
              {isOrderSuccess ? (
                <div className="p-12 text-center space-y-6">
                  <motion.div 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="w-24 h-24 bg-brand-orange/20 rounded-full flex items-center justify-center text-brand-orange mx-auto"
                  >
                    <CheckCircle2 size={48} />
                  </motion.div>
                  <h2 className="text-4xl font-serif font-bold">Đặt hàng thành công!</h2>
                  <p className="text-gray-400 max-w-sm mx-auto">
                    Cảm ơn bạn đã tin tưởng The Pizza Company. Đơn hàng của bạn đang được chuẩn bị và sẽ giao đến trong 30 phút.
                  </p>
                </div>
              ) : (
                <div className="flex flex-col md:flex-row h-full">
                  <div className="md:w-1/2 p-8 md:p-10 space-y-6">
                    <h2 className="text-3xl font-serif font-bold">Thông tin nhận hàng</h2>
                    <form onSubmit={handleCheckout} className="space-y-4">
                      <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-widest text-brand-gold">Họ và tên</label>
                        <div className="relative">
                          <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                          <input 
                            required
                            type="text" 
                            placeholder="Nguyễn Văn A"
                            className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 focus:border-brand-orange outline-none transition-colors"
                            value={orderInfo.name}
                            onChange={e => setOrderInfo({...orderInfo, name: e.target.value})}
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-widest text-brand-gold">Số điện thoại</label>
                        <div className="relative">
                          <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                          <input 
                            required
                            type="tel" 
                            placeholder="0901 234 567"
                            className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 focus:border-brand-orange outline-none transition-colors"
                            value={orderInfo.phone}
                            onChange={e => setOrderInfo({...orderInfo, phone: e.target.value})}
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-widest text-brand-gold">Địa chỉ giao hàng</label>
                        <div className="relative">
                          <MapPin className="absolute left-4 top-3 text-gray-500" size={18} />
                          <textarea 
                            required
                            placeholder="Số nhà, tên đường, phường/xã..."
                            rows={3}
                            className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 focus:border-brand-orange outline-none transition-colors resize-none"
                            value={orderInfo.address}
                            onChange={e => setOrderInfo({...orderInfo, address: e.target.value})}
                          />
                        </div>
                      </div>
                      <button 
                        type="submit"
                        className="w-full bg-brand-orange hover:bg-brand-orange/90 text-white py-4 rounded-xl font-bold text-lg transition-all shadow-xl shadow-brand-orange/20 mt-4"
                      >
                        XÁC NHẬN ĐẶT HÀNG
                      </button>
                    </form>
                  </div>
                  <div className="md:w-1/2 bg-white/5 p-8 md:p-10 border-l border-white/10">
                    <h3 className="text-xl font-bold mb-6">Tóm tắt đơn hàng</h3>
                    <div className="space-y-4 mb-8 max-h-60 overflow-y-auto pr-2">
                      {cart.map(item => (
                        <div key={item.id} className="flex justify-between items-center text-sm">
                          <div className="flex gap-3">
                            <span className="text-brand-orange font-bold">{item.quantity}x</span>
                            <div>
                              <p className="font-bold">{item.name}</p>
                              <p className="text-xs text-gray-500">Size {item.size}</p>
                            </div>
                          </div>
                          <p className="font-bold">{(item.price * item.quantity).toLocaleString('vi-VN')}đ</p>
                        </div>
                      ))}
                    </div>
                    <div className="space-y-3 pt-6 border-t border-white/10">
                      <div className="flex justify-between text-gray-400">
                        <span>Tạm tính</span>
                        <span>{cartTotal.toLocaleString('vi-VN')}đ</span>
                      </div>
                      <div className="flex justify-between text-gray-400">
                        <span>Phí giao hàng</span>
                        <span className="text-emerald-500 font-bold">MIỄN PHÍ</span>
                      </div>
                      <div className="flex justify-between text-xl font-bold pt-2">
                        <span>Tổng cộng</span>
                        <span className="text-brand-orange">{cartTotal.toLocaleString('vi-VN')}đ</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              <button 
                onClick={() => setIsCheckoutOpen(false)}
                className="absolute top-6 right-6 p-2 hover:bg-white/5 rounded-full transition-colors"
              >
                <X size={24} />
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
