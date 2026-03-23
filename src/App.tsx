import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ShoppingBag, 
  Menu as MenuIcon, 
  X, 
  ChevronRight, 
  Star, 
  Smartphone, 
  Flame, 
  Clock,
  ArrowRight,
  Instagram,
  Twitter,
  Facebook
} from 'lucide-react';

// --- Components ---

const Navbar = ({ onCartOpen, cartCount }: { onCartOpen: () => void, cartCount: number }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Menu', href: '#menu' },
    { name: 'Deals', href: '#deals' },
    { name: 'Locations', href: '#locations' },
    { name: 'App', href: '#app' },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white shadow-md py-3' : 'bg-transparent py-5'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="bg-brand-red p-1.5 rounded-lg">
            <Flame className="text-white w-6 h-6 fill-current" />
          </div>
          <span className={`text-2xl font-black tracking-tighter ${isScrolled ? 'text-brand-red' : 'text-white'}`}>FLAMEGRILL</span>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href} 
              className={`font-bold hover:text-brand-orange transition-colors ${isScrolled ? 'text-brand-black' : 'text-white'}`}
            >
              {link.name}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <button 
            onClick={onCartOpen}
            className="relative p-2 rounded-full hover:bg-black/5 transition-colors"
          >
            <ShoppingBag className={isScrolled ? 'text-brand-black' : 'text-white'} />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-brand-red text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full border-2 border-white">
                {cartCount}
              </span>
            )}
          </button>
          <button className="hidden md:block bg-brand-red text-white px-6 py-2.5 rounded-full font-bold hover:bg-brand-orange transition-all transform hover:scale-105 shadow-lg shadow-brand-red/20">
            Order Now
          </button>
          <button 
            className="md:hidden p-2"
            onClick={() => setIsMobileMenuOpen(true)}
          >
            <MenuIcon className={isScrolled ? 'text-brand-black' : 'text-white'} />
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            className="fixed inset-0 bg-white z-[60] p-6 flex flex-col"
          >
            <div className="flex justify-between items-center mb-12">
              <span className="text-2xl font-black text-brand-red italic">FLAMEGRILL</span>
              <button onClick={() => setIsMobileMenuOpen(false)}>
                <X className="w-8 h-8 text-brand-black" />
              </button>
            </div>
            <div className="flex flex-col gap-8">
              {navLinks.map((link) => (
                <a 
                  key={link.name} 
                  href={link.href} 
                  className="text-3xl font-black text-brand-black hover:text-brand-red"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.name}
                </a>
              ))}
            </div>
            <div className="mt-auto">
              <button className="w-full bg-brand-red text-white py-4 rounded-2xl font-black text-xl shadow-xl">
                ORDER NOW
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = () => {
  return (
    <section className="relative h-screen min-h-[700px] flex items-center overflow-hidden bg-brand-black">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1571091718767-18b5b1457add?auto=format&fit=crop&q=80&w=2000" 
          alt="Juicy Burger" 
          className="w-full h-full object-cover opacity-60"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-brand-black via-brand-black/40 to-transparent" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-2xl"
        >
          <div className="inline-flex items-center gap-2 bg-brand-red/20 border border-brand-red/30 px-4 py-1.5 rounded-full mb-6">
            <Flame className="w-4 h-4 text-brand-red fill-current" />
            <span className="text-brand-red font-bold text-sm tracking-wide uppercase">Limited Time Deal</span>
          </div>
          <h1 className="text-6xl md:text-8xl font-black text-white leading-[0.9] mb-6 tracking-tighter">
            FLAME-GRILLED <br />
            <span className="text-brand-orange">PERFECTION 🍔</span>
          </h1>
          <p className="text-xl text-gray-300 mb-10 max-w-lg leading-relaxed">
            Hot, fresh, and made your way. Experience the authentic taste of real fire-grilled beef since 1954.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <button className="bg-brand-red text-white px-10 py-5 rounded-2xl font-black text-xl hover:bg-brand-orange transition-all transform hover:scale-105 shadow-2xl shadow-brand-red/40 flex items-center justify-center gap-2">
              Order Now <ArrowRight className="w-6 h-6" />
            </button>
            <button className="bg-white/10 backdrop-blur-md border border-white/20 text-white px-10 py-5 rounded-2xl font-black text-xl hover:bg-white/20 transition-all flex items-center justify-center">
              View Menu
            </button>
          </div>
        </motion.div>
      </div>

      {/* Floating Badge */}
      <motion.div 
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-10 right-10 hidden lg:flex flex-col items-center bg-brand-yellow p-6 rounded-full w-40 h-40 justify-center rotate-12 shadow-2xl"
      >
        <span className="text-brand-black font-black text-4xl leading-none">FREE</span>
        <span className="text-brand-black font-bold text-sm uppercase">Fries Today</span>
        <div className="mt-1 bg-brand-red text-white text-[10px] font-black px-2 py-0.5 rounded">APP ONLY</div>
      </motion.div>
    </section>
  );
};

const Deals = () => {
  const deals = [
    {
      id: 1,
      title: "Family Feast Bundle",
      description: "2 Whoppers, 2 Cheeseburgers, 4 Small Fries & 4 Drinks",
      price: "$24.99",
      discount: "Save 30%",
      image: "https://images.unsplash.com/photo-1610614819513-58e34989848b?auto=format&fit=crop&q=80&w=800",
      timer: "02:45:12"
    },
    {
      id: 2,
      title: "Spicy Chicken Combo",
      description: "Crispy Spicy Chicken, Medium Fries & Large Shake",
      price: "$9.99",
      discount: "Bestseller",
      image: "https://images.unsplash.com/photo-1562967914-608f82629710?auto=format&fit=crop&q=80&w=800",
      timer: "05:12:44"
    },
    {
      id: 3,
      title: "The King's Breakfast",
      description: "Double Croissan'wich, Hash Browns & Coffee",
      price: "$6.49",
      discount: "Morning Special",
      image: "https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?auto=format&fit=crop&q=80&w=800",
      timer: "01:20:05"
    }
  ];

  return (
    <section id="deals" className="py-24 bg-brand-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <h2 className="text-5xl font-black text-brand-black mb-4 tracking-tight">FEATURED DEALS</h2>
            <p className="text-gray-600 max-w-md">Grab these exclusive offers before they're gone. Fresh, hot, and delicious.</p>
          </div>
          <button className="text-brand-red font-bold flex items-center gap-2 hover:gap-3 transition-all">
            View All Offers <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {deals.map((deal) => (
            <motion.div 
              key={deal.id}
              whileHover={{ y: -10 }}
              className="bg-white rounded-3xl overflow-hidden shadow-xl border border-black/5 group"
            >
              <div className="relative h-64">
                <img 
                  src={deal.image} 
                  alt={deal.title} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-4 left-4 bg-brand-red text-white font-black px-4 py-1 rounded-full text-sm">
                  {deal.discount}
                </div>
                <div className="absolute bottom-4 right-4 bg-black/70 backdrop-blur-md text-white px-3 py-1.5 rounded-xl flex items-center gap-2 text-sm font-bold">
                  <Clock className="w-4 h-4 text-brand-orange" />
                  {deal.timer}
                </div>
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-black mb-2 text-brand-black">{deal.title}</h3>
                <p className="text-gray-500 mb-6 line-clamp-2">{deal.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-3xl font-black text-brand-red">{deal.price}</span>
                  <button className="bg-brand-black text-white px-6 py-3 rounded-xl font-bold hover:bg-brand-red transition-colors">
                    Grab Deal
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const MenuPreview = ({ onAddToCart }: { onAddToCart: (item: any) => void }) => {
  const [activeCategory, setActiveCategory] = useState('Burgers');

  const categories = ['Burgers', 'Chicken', 'Sides', 'Drinks'];
  
  const menuItems = {
    Burgers: [
      { id: 101, name: "The Flame King", price: 8.99, image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&q=80&w=400" },
      { id: 102, name: "Double Bacon BBQ", price: 10.49, image: "https://images.unsplash.com/photo-1553979459-d2229ba7433b?auto=format&fit=crop&q=80&w=400" },
      { id: 103, name: "Classic Cheeseburger", price: 5.99, image: "https://images.unsplash.com/photo-1572802419224-296b0aeee0d9?auto=format&fit=crop&q=80&w=400" },
      { id: 104, name: "Mushroom Swiss", price: 9.29, image: "https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?auto=format&fit=crop&q=80&w=400" },
    ],
    Chicken: [
      { id: 201, name: "Crispy Royal Chicken", price: 7.49, image: "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&q=80&w=400" },
      { id: 202, name: "Spicy Tender Box", price: 12.99, image: "https://images.unsplash.com/photo-1567620832903-9fc6debc209f?auto=format&fit=crop&q=80&w=400" },
    ],
    Sides: [
      { id: 301, name: "Golden Fries", price: 3.49, image: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&q=80&w=400" },
      { id: 302, name: "Onion Ring Tower", price: 4.99, image: "https://images.unsplash.com/photo-1639024471283-03518883512d?auto=format&fit=crop&q=80&w=400" },
    ],
    Drinks: [
      { id: 401, name: "Classic Milkshake", price: 4.49, image: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&q=80&w=400" },
      { id: 402, name: "Fountain Soda", price: 2.49, image: "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&q=80&w=400" },
    ]
  };

  return (
    <section id="menu" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-black text-brand-black mb-4">EXPLORE OUR MENU</h2>
          <div className="flex flex-wrap justify-center gap-4 mt-8">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-8 py-3 rounded-full font-bold text-lg transition-all ${
                  activeCategory === cat 
                    ? 'bg-brand-red text-white shadow-lg shadow-brand-red/30' 
                    : 'bg-brand-cream text-brand-black hover:bg-brand-orange hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <AnimatePresence mode="wait">
            {menuItems[activeCategory as keyof typeof menuItems].map((item) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="group"
              >
                <div className="relative bg-brand-cream rounded-3xl p-6 transition-all group-hover:shadow-2xl group-hover:bg-white border border-transparent group-hover:border-brand-orange/20">
                  <div className="relative h-48 mb-6">
                    <img 
                      src={item.image} 
                      alt={item.name} 
                      className="w-full h-full object-contain transform group-hover:scale-110 group-hover:-rotate-6 transition-all duration-500"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <h3 className="text-xl font-black text-brand-black mb-2">{item.name}</h3>
                  <div className="flex items-center justify-between mt-4">
                    <span className="text-2xl font-black text-brand-red">${item.price}</span>
                    <button 
                      onClick={() => onAddToCart(item)}
                      className="bg-brand-orange text-white p-3 rounded-2xl hover:bg-brand-red transition-colors shadow-lg shadow-brand-orange/20"
                    >
                      <ShoppingBag className="w-6 h-6" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

const AppDownload = () => {
  return (
    <section id="app" className="py-24 bg-brand-black overflow-hidden relative">
      <div className="absolute top-0 right-0 w-1/2 h-full bg-brand-red/10 skew-x-12 transform translate-x-20" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-16">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-5xl md:text-7xl font-black text-white mb-8 leading-tight">
              SKIP THE LINE <br />
              <span className="text-brand-orange">ORDER ON APP 🚀</span>
            </h2>
            <div className="space-y-6 mb-12">
              {[
                "Earn points with every bite",
                "Exclusive app-only daily deals",
                "Customize your meal exactly how you like",
                "Faster pickup and delivery"
              ].map((benefit, i) => (
                <div key={i} className="flex items-center gap-4">
                  <div className="bg-brand-orange rounded-full p-1">
                    <ChevronRight className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-xl text-gray-300 font-medium">{benefit}</span>
                </div>
              ))}
            </div>
            <div className="flex flex-wrap gap-4">
              <button className="bg-white text-brand-black px-8 py-4 rounded-2xl font-black flex items-center gap-3 hover:bg-brand-yellow transition-colors">
                <Smartphone className="w-6 h-6" />
                App Store
              </button>
              <button className="bg-white text-brand-black px-8 py-4 rounded-2xl font-black flex items-center gap-3 hover:bg-brand-yellow transition-colors">
                <Smartphone className="w-6 h-6" />
                Google Play
              </button>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative flex justify-center"
          >
            <div className="relative z-10 w-64 md:w-80">
               <img 
                src="https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&q=80&w=800" 
                alt="App Screenshot" 
                className="rounded-[3rem] border-8 border-gray-800 shadow-2xl"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="absolute -bottom-10 -left-10 bg-brand-red p-8 rounded-3xl shadow-2xl rotate-6 hidden md:block">
              <span className="text-white font-black text-4xl">50% OFF</span>
              <p className="text-white/80 font-bold">First App Order</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const SocialProof = () => {
  const reviews = [
    { name: "Alex J.", text: "Best flame-grilled taste ever. The Whopper is unbeatable!", rating: 5 },
    { name: "Sarah M.", text: "The app deals are insane. I save so much every week.", rating: 5 },
    { name: "Mike R.", text: "Fast service and always hot. My go-to lunch spot.", rating: 4 }
  ];

  return (
    <section className="py-24 bg-brand-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="mb-16">
          <h2 className="text-4xl font-black text-brand-black mb-4">OVER 1M+ HAPPY CUSTOMERS</h2>
          <div className="flex justify-center gap-1">
            {[1, 2, 3, 4, 5].map((s) => (
              <Star key={s} className="w-8 h-8 text-brand-yellow fill-current" />
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((review, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="bg-white p-10 rounded-[2.5rem] shadow-xl relative"
            >
              <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-brand-orange text-white p-4 rounded-full">
                <Star className="w-6 h-6 fill-current" />
              </div>
              <p className="text-xl italic text-gray-600 mb-6 mt-4">"{review.text}"</p>
              <div className="font-black text-brand-black text-lg">— {review.name}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const BrandStory = () => {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="order-2 lg:order-1">
            <img 
              src="https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&q=80&w=1000" 
              alt="Grilling" 
              className="rounded-[3rem] shadow-2xl"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="order-1 lg:order-2">
            <h2 className="text-5xl font-black text-brand-black mb-8 leading-tight">
              REAL FIRE. <br />
              REAL FLAVOR. 🔥
            </h2>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Since 1954, we've been flame-grilling our burgers to perfection. No shortcuts, no fake smoke—just real fire and fresh ingredients. That's the secret to the taste you love.
            </p>
            <div className="grid grid-cols-2 gap-8">
              <div>
                <span className="text-4xl font-black text-brand-red">100%</span>
                <p className="text-gray-500 font-bold uppercase text-sm">Real Beef</p>
              </div>
              <div>
                <span className="text-4xl font-black text-brand-red">Fresh</span>
                <p className="text-gray-500 font-bold uppercase text-sm">Every Day</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const CTABanner = () => {
  return (
    <section className="py-20 bg-brand-red relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-full h-full flex flex-wrap gap-4 p-4">
          {Array.from({ length: 20 }).map((_, i) => (
            <Flame key={i} className="w-20 h-20 text-white" />
          ))}
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <h2 className="text-5xl md:text-7xl font-black text-white mb-10">HUNGRY? ORDER NOW.</h2>
        <button className="bg-white text-brand-red px-12 py-6 rounded-2xl font-black text-2xl hover:bg-brand-yellow hover:text-brand-black transition-all transform hover:scale-110 shadow-2xl">
          GET STARTED
        </button>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="bg-brand-black text-white pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div>
            <div className="flex items-center gap-2 mb-8">
              <Flame className="text-brand-red w-8 h-8 fill-current" />
              <span className="text-3xl font-black tracking-tighter">FLAMEGRILL</span>
            </div>
            <p className="text-gray-400 mb-8 leading-relaxed">
              Serving the best flame-grilled burgers since 1954. Quality you can taste in every bite.
            </p>
            <div className="flex gap-4">
              {[Instagram, Twitter, Facebook].map((Icon, i) => (
                <a key={i} href="#" className="bg-white/10 p-3 rounded-xl hover:bg-brand-red transition-colors">
                  <Icon className="w-6 h-6" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-xl font-black mb-8">QUICK LINKS</h4>
            <ul className="space-y-4 text-gray-400 font-medium">
              <li><a href="#menu" className="hover:text-white transition-colors">Our Menu</a></li>
              <li><a href="#deals" className="hover:text-white transition-colors">Special Deals</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Locations</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xl font-black mb-8">SUPPORT</h4>
            <ul className="space-y-4 text-gray-400 font-medium">
              <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
              <li><a href="#" className="hover:text-white transition-colors">FAQs</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xl font-black mb-8">NEWSLETTER</h4>
            <p className="text-gray-400 mb-6">Get the latest deals and news delivered to your inbox.</p>
            <div className="flex gap-2">
              <input 
                type="email" 
                placeholder="Your email" 
                className="bg-white/10 border border-white/20 rounded-xl px-4 py-3 w-full focus:outline-none focus:border-brand-orange"
              />
              <button className="bg-brand-red px-4 py-3 rounded-xl font-bold hover:bg-brand-orange transition-colors">
                JOIN
              </button>
            </div>
          </div>
        </div>

        <div className="pt-12 border-t border-white/10 text-center text-gray-500 font-medium">
          <p>© 2026 FLAMEGRILL Corporation. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

const CartDrawer = ({ isOpen, onClose, cartItems, onRemove }: { 
  isOpen: boolean, 
  onClose: () => void, 
  cartItems: any[],
  onRemove: (id: number) => void
}) => {
  const total = cartItems.reduce((sum, item) => sum + item.price, 0);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[70]"
          />
          <motion.div 
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 bottom-0 w-full max-w-md bg-white z-[80] shadow-2xl flex flex-col"
          >
            <div className="p-6 border-b flex items-center justify-between">
              <h3 className="text-2xl font-black text-brand-black">YOUR CART</h3>
              <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6">
              {cartItems.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center">
                  <ShoppingBag className="w-16 h-16 text-gray-300 mb-4" />
                  <p className="text-xl font-bold text-gray-400">Your cart is empty</p>
                  <button 
                    onClick={onClose}
                    className="mt-6 text-brand-red font-bold"
                  >
                    Start Ordering
                  </button>
                </div>
              ) : (
                <div className="space-y-6">
                  {cartItems.map((item, i) => (
                    <div key={`${item.id}-${i}`} className="flex gap-4 items-center">
                      <div className="w-20 h-20 bg-brand-cream rounded-2xl p-2">
                        <img src={item.image} alt={item.name} className="w-full h-full object-contain" referrerPolicy="no-referrer" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-bold text-brand-black">{item.name}</h4>
                        <p className="text-brand-red font-black">${item.price}</p>
                      </div>
                      <button 
                        onClick={() => onRemove(i)}
                        className="text-gray-400 hover:text-brand-red"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {cartItems.length > 0 && (
              <div className="p-6 border-t bg-gray-50">
                <div className="flex justify-between mb-6">
                  <span className="text-xl font-bold text-gray-500">Subtotal</span>
                  <span className="text-2xl font-black text-brand-black">${total.toFixed(2)}</span>
                </div>
                <button className="w-full bg-brand-red text-white py-5 rounded-2xl font-black text-xl shadow-xl hover:bg-brand-orange transition-all">
                  CHECKOUT NOW
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

// --- Main App ---

export default function App() {
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const addToCart = (item: any) => {
    setCartItems([...cartItems, item]);
    setIsCartOpen(true);
  };

  const removeFromCart = (index: number) => {
    const newItems = [...cartItems];
    newItems.splice(index, 1);
    setCartItems(newItems);
  };

  return (
    <div className="min-h-screen selection:bg-brand-orange selection:text-white">
      <Navbar onCartOpen={() => setIsCartOpen(true)} cartCount={cartItems.length} />
      
      <main>
        <Hero />
        <Deals />
        <MenuPreview onAddToCart={addToCart} />
        <AppDownload />
        <SocialProof />
        <BrandStory />
        <CTABanner />
      </main>

      <Footer />

      <CartDrawer 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
        cartItems={cartItems}
        onRemove={removeFromCart}
      />

      {/* Sticky Mobile CTA */}
      <div className="md:hidden fixed bottom-6 left-6 right-6 z-40">
        <button className="w-full bg-brand-red text-white py-4 rounded-2xl font-black text-xl shadow-2xl flex items-center justify-center gap-3">
          <ShoppingBag className="w-6 h-6" />
          ORDER NOW
        </button>
      </div>
    </div>
  );
}
