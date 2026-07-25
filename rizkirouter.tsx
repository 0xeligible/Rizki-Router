import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Menu, X, Phone, Instagram, Send, MapPin, CheckCircle2, 
  ArrowRight, ShieldCheck, Wrench, Droplets, Clock, Star, Bot, ChevronDown, MessageCircle, Loader2,
  Toilet, CircleDot, CookingPot, Waves, House, Factory
} from 'lucide-react';

const WA_NUMBER = "6281286330248";
const INSTA_URL = "https://www.instagram.com/pipamampetsolution";
consconstt LOGO_URL = "https://cdn.phototourl.com/free/2026-07-25-f5641874-6619-4523-aaa2-a316787cdfbb.jpg";

const generateWaLink = (text = "") => `https://wa.me/${WA_NUMBER}${text ? `?text=${encodeURIComponent(text)}` : ''}`;

const SinkIcon = ({ className }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="24" 
    height="24" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M4 14v4a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-4" />
    <path d="M22 14H2" />
    <path d="M10 2a2 2 0 0 1 4 0v4a2 2 0 0 1-4 0V2z" />
    <path d="M12 6v6" />
    <circle cx="12" cy="14" r="1" />
  </svg>
);

const SERVICES = [
  { id: 'wc', title: 'WC Mampet', icon: <Toilet className="w-[26px] h-[26px] transition-transform duration-200 group-hover:scale-[1.08]" />, desc: 'Atasi WC mampet, saluran pembuangan macet, dan masalah septic tank tanpa perlu membongkar lantai toilet Anda.' },
  { id: 'wastafel', title: 'Wastafel Mampet', icon: <SinkIcon className="w-[26px] h-[26px] transition-transform duration-200 group-hover:scale-[1.08]" />, desc: 'Pelancaran wastafel tersumbat akibat penumpukan lemak, sisa makanan, atau rambut secara cepat dan bersih.' },
  { id: 'floordrain', title: 'Floor Drain', icon: <Droplets className="w-[26px] h-[26px] transition-transform duration-200 group-hover:scale-[1.08]" />, desc: 'Solusi genangan air di kamar mandi karena floor drain tersumbat kotoran, sabun, atau rambut.' },
  { id: 'bak', title: 'Bak Kontrol', icon: <CircleDot className="w-[26px] h-[26px] transition-transform duration-200 group-hover:scale-[1.08]" />, desc: 'Pembersihan dan pelancaran bak kontrol utama rumah atau gedung agar aliran ke got utama lancar.' },
  { id: 'dapur', title: 'Saluran Dapur', icon: <CookingPot className="w-[26px] h-[26px] transition-transform duration-200 group-hover:scale-[1.08]" />, desc: 'Pembersihan kerak lemak membandel (fatberg) pada pipa pembuangan cuci piring (kitchen sink).' },
  { id: 'saluran', title: 'Saluran Air', icon: <Waves className="w-[26px] h-[26px] transition-transform duration-200 group-hover:scale-[1.08]" />, desc: 'Penanganan menyeluruh masalah aliran air tersumbat di area indoor maupun outdoor.' },
  { id: 'piparumah', title: 'Pipa Rumah', icon: <House className="w-[26px] h-[26px] transition-transform duration-200 group-hover:scale-[1.08]" />, desc: 'Inspeksi dan pelancaran instalasi pipa air bersih maupun kotor di perumahan dan apartemen.' },
  { id: 'industri', title: 'Pipa Industri', icon: <Factory className="w-[26px] h-[26px] transition-transform duration-200 group-hover:scale-[1.08]" />, desc: 'Layanan skala besar untuk restoran, hotel, pabrik, dan kawasan komersial dengan mesin rooter heavy-duty.' },
];

const SectionHeading = ({ title, subtitle }) => (
  <div className="text-center mb-16">
    <motion.h2 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      viewport={{ once: true }}
      className="text-section text-slate-900 dark:text-white mb-6"
    >
      {title}
    </motion.h2>
    {subtitle && (
      <motion.p 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2, delay: 0.1 }}
        viewport={{ once: true }}
        className="text-body text-slate-600 dark:text-slate-400 max-w-2xl mx-auto"
      >
        {subtitle}
      </motion.p>
    )}
  </div>
);

const Button = ({ children, variant = 'primary', className = '', href, onClick, type = 'button' }) => {
  const baseStyle = "text-button inline-flex items-center justify-center rounded-full transition-all duration-200 ease-out shadow-sm active:scale-95 px-8 py-4 tracking-wide";
  
  const variants = {
    primary: "bg-[#2EA7F8] hover:bg-[#1D8CF8] text-white hover:shadow-lg hover:shadow-[#2EA7F8]/30",
    secondary: "bg-white dark:bg-slate-800 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700 hover:border-[#2EA7F8] hover:text-[#2EA7F8] dark:hover:text-[#2EA7F8]",
    ghost: "bg-transparent text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
  };

  if (href) {
    if (href.startsWith('#')) {
      return (
        <a href={href} className={`${baseStyle} ${variants[variant]} ${className}`}>
          {children}
        </a>
      );
    }
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={`${baseStyle} ${variants[variant]} ${className}`}>
        {children}
      </a>
    );
  }

  return (
    <button type={type} onClick={onClick} className={`${baseStyle} ${variants[variant]} ${className}`}>
      {children}
    </button>
  );
};

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Tentang', href: '#tentang' },
    { name: 'Layanan', href: '#layanan' },
    { name: 'FAQ', href: '#faq' }
  ];

  return (
    <header className={`fixed top-0 inset-x-0 z-50 transition-all duration-200 ${scrolled ? 'bg-white/80 dark:bg-[#0F172A]/80 backdrop-blur-lg border-b border-slate-200 dark:border-slate-800 shadow-sm' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-24">
          
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <a href="#home" className="flex items-center gap-4">
              <img src={LOGO_URL} alt="Rizki Router Logo" className="h-12 w-auto rounded-md shadow-sm" />
              <div className="flex flex-col">
                <span className="text-logo text-slate-900 dark:text-white tracking-tight leading-none text-[22px]">Rizki Router</span>
                <span className="font-inter font-semibold text-[10px] text-[#2EA7F8] uppercase tracking-[0.1em] mt-1">Pipa Mampet Solution</span>
              </div>
            </a>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex space-x-10 items-center">
            {navLinks.map((link) => (
              <a key={link.name} href={link.href} className="text-nav text-slate-600 hover:text-[#2EA7F8] dark:text-slate-300 dark:hover:text-[#2EA7F8] transition-colors">
                {link.name}
              </a>
            ))}
          </nav>

          {/* Desktop CTA & Socials */}
          <div className="hidden md:flex items-center space-x-4">
            <div className="flex items-center space-x-2 mr-2">
              <Button variant="ghost" className="p-2.5 rounded-full px-3 py-3" href={generateWaLink()}>
                <MessageCircle className="w-5 h-5 text-[#25D366]" />
              </Button>
              <Button variant="ghost" className="p-2.5 rounded-full px-3 py-3" href={INSTA_URL}>
                <Instagram className="w-5 h-5 text-pink-600" />
              </Button>
            </div>
            <Button variant="primary" className="px-7 py-3 text-[15px]" href={generateWaLink("Halo Rizki Router, saya butuh jasa pelancaran pipa mampet.")}>
              Hubungi WhatsApp
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center md:hidden">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-slate-600 dark:text-slate-300 hover:text-[#2EA7F8] p-2"
            >
              {mobileMenuOpen ? <X className="h-7 w-7" /> : <Menu className="h-7 w-7" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white dark:bg-[#0F172A] border-b border-slate-200 dark:border-slate-800 overflow-hidden"
          >
            <div className="px-4 pt-4 pb-8 space-y-2">
              {navLinks.map((link) => (
                <a 
                  key={link.name} 
                  href={link.href} 
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-nav block px-4 py-4 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg"
                >
                  {link.name}
                </a>
              ))}
              <div className="pt-6 flex flex-col gap-3">
                <Button variant="primary" className="w-full justify-center text-[15px]" href={generateWaLink("Halo Rizki Router, saya butuh bantuan untuk saluran mampet.")}>
                  <MessageCircle className="w-5 h-5 mr-2" /> Hubungi WhatsApp
                </Button>
                <div className="flex justify-center gap-4 mt-4">
                  <a href={INSTA_URL} target="_blank" rel="noreferrer" className="p-3 bg-slate-50 dark:bg-slate-800 rounded-full text-pink-600">
                    <Instagram className="w-6 h-6" />
                  </a>
                  <a href={`tel:+${WA_NUMBER}`} className="p-3 bg-slate-50 dark:bg-slate-800 rounded-full text-slate-700 dark:text-slate-300">
                    <Phone className="w-6 h-6" />
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

const FaqItem = ({ faq }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-8 py-7 flex items-center justify-between text-left focus:outline-none"
      >
        <span className="font-geist font-bold text-xl text-slate-900 dark:text-white pr-4 tracking-tight">{faq.q}</span>
        <ChevronDown className={`w-6 h-6 text-slate-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <div className="px-8 pb-8 text-body text-slate-600 dark:text-slate-400 border-t border-slate-100 dark:border-slate-800 pt-6">
              {faq.a}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
};

const ChatBotWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([{ 
    role: 'bot', 
    text: 'Halo! Saya Rizki AI, asisten virtual Rizki Router. Ada keluhan saluran mampet yang ingin Anda konsultasikan atau jadwalkan pengerjaannya hari ini?' 
  }]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const getAIResponse = async (userMessage) => {
    return new Promise(resolve => {
      setTimeout(() => {
        const msg = userMessage.toLowerCase();
        let reply = "Maaf, saya kurang mengerti. Namun jangan khawatir, tim kami siap membantu. Silakan hubungi via WhatsApp untuk konsultasi lebih lanjut dan menentukan jadwal pengerjaan.";
        
        if(msg.includes('wc') || msg.includes('toilet') || msg.includes('kamar mandi')) {
          reply = "Untuk masalah WC mampet, sebaiknya jangan disiram air terus menerus agar tidak meluap. Kami memiliki alat Rooter khusus yang bisa melancarkan WC tanpa membongkar keramik. Mau berkonsultasi lebih lanjut via WhatsApp untuk atur jadwal pengerjaan?";
        } else if (msg.includes('wastafel') || msg.includes('cucian') || msg.includes('dapur')) {
          reply = "Wastafel mampet biasanya disebabkan oleh penumpukan lemak masakan (fatberg). Hindari menuangkan bahan kimia keras karena bisa merusak pipa PVC. Silakan hubungi Admin WhatsApp untuk konsultasi dan jadwalkan kedatangan teknisi kami.";
        } else if (msg.includes('harga') || msg.includes('biaya') || msg.includes('tarif')) {
          reply = "Untuk biaya jasa pelancaran bervariasi tergantung tingkat keparahan, panjang pipa, dan jenis salurannya. Kami jamin harganya transparan dan **Tanpa Bongkar**. Lebih baik konsultasikan langsung dengan Admin kami di WhatsApp ya, tekan tombol di bawah ini.";
        } else if (msg.includes('halo') || msg.includes('hai') || msg.includes('siang') || msg.includes('pagi')) {
          reply = "Halo juga! Ada masalah saluran air atau pipa mampet di rumah/kantor Anda yang bisa kami bantu jadwalkan perbaikannya?";
        }
        
        resolve(reply);
      }, 1000);
    });
  };

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userText = input;
    setMessages(prev => [...prev, { role: 'user', text: userText }]);
    setInput('');
    setIsTyping(true);

    const reply = await getAIResponse(userText);
    
    setIsTyping(false);
    setMessages(prev => [...prev, { role: 'bot', text: reply }]);
  };

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-28 md:bottom-8 left-4 md:left-8 w-14 h-14 bg-gradient-to-r from-blue-600 to-[#2EA7F8] rounded-full flex items-center justify-center shadow-[0_8px_30px_rgba(46,167,248,0.4)] hover:-translate-y-1 transition-transform z-40 ${isOpen ? 'hidden' : 'flex'}`}
      >
        <Bot className="w-7 h-7 text-white" />
        <span className="absolute -top-1 -right-1 flex h-4 w-4">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-4 w-4 bg-red-500"></span>
        </span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-24 md:bottom-28 left-4 md:left-8 w-[calc(100vw-2rem)] md:w-[380px] h-[500px] max-h-[70vh] bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-700 flex flex-col z-50 overflow-hidden"
          >
            <div className="bg-gradient-to-r from-[#2EA7F8] to-[#1D8CF8] p-5 flex items-center justify-between shadow-md z-10 relative">
              <div className="flex items-center gap-3 text-white">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm border border-white/30">
                  <Bot className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-geist font-bold text-lg leading-tight text-white tracking-tight">Rizki AI</h3>
                  <p className="font-inter font-semibold text-[10px] uppercase tracking-widest text-blue-100 flex items-center gap-2 mt-1">
                    <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
                    Online | Asisten Virtual
                  </p>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-white/80 hover:text-white p-1">
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-5 space-y-4 bg-slate-50 dark:bg-slate-900/50">
              {messages.map((msg, idx) => (
                <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div 
                    className={`text-body text-[15px] max-w-[85%] p-4 rounded-2xl shadow-sm
                      ${msg.role === 'user' 
                        ? 'bg-[#2EA7F8] text-white rounded-tr-sm' 
                        : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-100 dark:border-slate-700 rounded-tl-sm'
                      }`}
                    style={{ whiteSpace: 'pre-wrap' }}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 p-4 rounded-2xl rounded-tl-sm shadow-sm flex gap-2">
                    <div className="w-2 h-2 bg-slate-300 dark:bg-slate-500 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-slate-300 dark:bg-slate-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    <div className="w-2 h-2 bg-slate-300 dark:bg-slate-500 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            <div className="p-4 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800">
              {messages.length > 2 && (
                 <a href={generateWaLink("Halo, saya ingin lanjut konsultasi dari Chat AI.")} className="mb-3 w-full flex items-center justify-center gap-2 bg-[#25D366]/10 text-[#25D366] hover:bg-[#25D366]/20 py-2.5 rounded-lg font-inter font-semibold text-[12px] uppercase transition-colors">
                   <MessageCircle className="w-4 h-4" /> Lanjut ke WhatsApp
                 </a>
              )}
              <form onSubmit={handleSend} className="relative flex items-center">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  disabled={isTyping}
                  placeholder="Ketik pertanyaan Anda..."
                  className="text-body w-full pl-5 pr-14 py-4 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-[15px] text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#2EA7F8]/50 focus:border-[#2EA7F8] transition-all disabled:opacity-50"
                />
                <button
                  type="submit"
                  disabled={!input.trim() || isTyping}
                  className="absolute right-3 p-2.5 text-[#2EA7F8] hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded-lg transition-colors disabled:opacity-50"
                >
                  {isTyping ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

const App = () => {
  const [formData, setFormData] = useState({ nama: '', lokasi: '', jenis: 'WC Mampet', pesan: '' });

  useEffect(() => {
    document.title = "Rizki Router | Jasa Pipa Mampet Profesional Tanpa Bongkar";
    
    // Add meta tags
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.name = "description";
      document.head.appendChild(metaDesc);
    }
    metaDesc.content = "Jasa pelancaran pipa mampet profesional, cepat, tanpa bongkar. Melayani Jabodetabek. Hubungi Rizki Router untuk WC mampet, wastafel, dll.";

    // Clean up any previously injected fonts by earlier versions
    const oldFonts = ['google-fonts-jakarta', 'google-fonts-editorial', 'custom-editorial-style', 'custom-font-style'];
    oldFonts.forEach(id => {
      const el = document.getElementById(id);
      if (el) el.remove();
    });

    // Inject Geist & Inter Typography System
    if (!document.getElementById('google-fonts-geist-inter')) {
      const preconnect1 = document.createElement('link');
      preconnect1.rel = 'preconnect';
      preconnect1.href = 'https://fonts.googleapis.com';
      
      const preconnect2 = document.createElement('link');
      preconnect2.rel = 'preconnect';
      preconnect2.href = 'https://fonts.gstatic.com';
      preconnect2.crossOrigin = 'anonymous';

      const fontLink = document.createElement('link');
      fontLink.id = 'google-fonts-geist-inter';
      fontLink.rel = 'stylesheet';
      fontLink.href = 'https://fonts.googleapis.com/css2?family=Geist:wght@400;600;700;800&family=Inter:wght@400;500;600;700&display=swap';

      document.head.appendChild(preconnect1);
      document.head.appendChild(preconnect2);
      document.head.appendChild(fontLink);

      // Inject strict styling mapping
      const style = document.createElement('style');
      style.id = 'custom-geist-style';
      style.innerHTML = `
        :root {
          --font-geist: 'Geist', 'Inter', sans-serif;
          --font-inter: 'Inter', sans-serif;
        }
        
        body {
          font-family: var(--font-inter);
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
          background-color: #ffffff;
        }
        
        @media (prefers-color-scheme: dark) {
          body {
            background-color: #0F172A;
          }
        }

        .font-geist { font-family: var(--font-geist); }
        .font-inter { font-family: var(--font-inter); }

        /* Vercel/Linear Premium Typography Scale */
        .text-logo {
          font-family: var(--font-geist);
          font-weight: 700;
        }

        .text-hero {
          font-family: var(--font-geist);
          font-size: clamp(3rem, 8vw, 5.5rem);
          font-weight: 800;
          line-height: 0.95;
          letter-spacing: -0.04em;
        }

        .text-section {
          font-family: var(--font-geist);
          font-size: clamp(2rem, 4vw, 3rem);
          font-weight: 700;
          line-height: 1.1;
          letter-spacing: -0.03em;
        }

        .text-card-title {
          font-family: var(--font-geist);
          font-size: 24px;
          font-weight: 700;
          letter-spacing: -0.02em;
        }

        .text-body {
          font-family: var(--font-inter);
          font-size: 18px;
          line-height: 1.8;
          font-weight: 400;
        }

        .text-button {
          font-family: var(--font-inter);
          font-size: 16px;
          font-weight: 600;
        }

        .text-nav {
          font-family: var(--font-inter);
          font-size: 15px;
          font-weight: 500;
        }

        .text-badge {
          font-family: var(--font-inter);
          font-size: 14px;
          font-weight: 500;
        }
      `;
      document.head.appendChild(style);
    }

    // Add favicon dynamically
    let link = document.querySelector("link[rel~='icon']");
    if (!link) {
      link = document.createElement('link');
      link.rel = 'icon';
      document.head.appendChild(link);
    }
    link.href = LOGO_URL;

  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const text = `Halo Rizki Router, saya ingin memesan layanan:%0A%0A*Nama:* ${formData.nama}%0A*Lokasi:* ${formData.lokasi}%0A*Jenis Permasalahan:* ${formData.jenis}%0A*Pesan Tambahan:* ${formData.pesan}%0A%0AMohon info lebih lanjut.`;
    window.open(generateWaLink(text), '_blank');
  };

  const WHY_US = [
    { title: 'Tanpa Bongkar', desc: 'Menggunakan mesin rooter spiral berteknologi tinggi masuk langsung ke jalur pipa.', icon: <Wrench className="w-6 h-6 text-[#2EA7F8]" /> },
    { title: 'Teknisi Profesional', desc: 'Tim berpengalaman yang terlatih menangani berbagai tingkat kerumitan saluran mampet.', icon: <CheckCircle2 className="w-6 h-6 text-[#2EA7F8]" /> },
    { title: 'Peralatan Modern', desc: 'Dilengkapi spiral cable berbagai ukuran dan perlengkapan safety standar industri.', icon: <Droplets className="w-6 h-6 text-[#2EA7F8]" /> },
    { title: 'Garansi Pekerjaan', desc: 'Kami berikan garansi 100% uang kembali atau pengerjaan ulang jika saluran belum lancar.', icon: <ShieldCheck className="w-6 h-6 text-[#2EA7F8]" /> },
    { title: 'Respon Cepat', desc: 'Kami sangat responsif menanggapi keluhan Anda. Jadwalkan kedatangan teknisi sesuai waktu luang Anda.', icon: <Clock className="w-6 h-6 text-[#2EA7F8]" /> },
    { title: 'Harga Transparan', desc: 'Harga disepakati di awal setelah mengetahui kondisi masalah, tanpa biaya tersembunyi.', icon: <Star className="w-6 h-6 text-[#2EA7F8]" /> },
  ];

  const WORK_STEPS = [
    { id: '01', title: 'Hubungi Kami', desc: 'Konsultasikan masalah Anda via WhatsApp, dan kirimkan lokasi.' },
    { id: '02', title: 'Analisis Masalah', desc: 'Teknisi tiba dan melakukan pengecekan sumber penyumbatan.' },
    { id: '03', title: 'Pengerjaan', desc: 'Proses pelancaran menggunakan mesin rooter tanpa merusak pipa.' },
    { id: '04', title: 'Saluran Lancar', desc: 'Uji coba saluran. Anda hanya membayar setelah air benar-benar lancar.' },
  ];

  return (
    <div className="font-inter antialiased text-slate-900 dark:text-slate-100 bg-white dark:bg-[#0F172A] selection:bg-[#2EA7F8]/30 overflow-x-hidden">
      <Navbar />

      {/* HERO SECTION */}
      <section id="home" className="relative min-h-[90vh] lg:min-h-screen flex items-center pt-28 pb-16 overflow-hidden">
        {/* Background Gradients */}
        <div className="absolute inset-0 bg-gradient-to-b from-blue-50/40 via-white to-white dark:from-slate-900 dark:via-[#0F172A] dark:to-[#0F172A] z-0"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            
            {/* Content Left */}
            <div className="flex flex-col items-start text-left pt-10 lg:pt-0">
              <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 shadow-sm mb-8">
                <CheckCircle2 className="w-4 h-4 text-[#2EA7F8]" />
                <span className="font-inter text-[14px] font-semibold text-slate-700 dark:text-slate-300">Teknisi Profesional & Bergaransi</span>
              </motion.div>

              <motion.h1 initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }} className="font-geist font-extrabold text-[clamp(3.5rem,8vw,6rem)] leading-[0.95] tracking-[-0.05em] text-slate-900 dark:text-white mb-6">
                Jasa Pipa Mampet <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2EA7F8] to-[#1D8CF8]">Profesional Tanpa Bongkar</span>
              </motion.h1>

              <motion.p initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-[18px] md:text-[20px] text-slate-600 dark:text-slate-400 max-w-xl mb-10">
                Melayani rumah, apartemen, kantor, hotel, restoran, ruko, dan industri dengan teknisi profesional serta peralatan Rooter modern.
              </motion.p>

              <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="flex flex-col sm:flex-row gap-4 mb-12">
                <Button variant="primary" className="h-[56px] px-8" href={generateWaLink("Halo Rizki Router, saya ingin Konsultasi Gratis.")}>
                  💬 Konsultasi Gratis
                </Button>
                <Button variant="secondary" className="h-[56px] px-8" href="#layanan">
                  Lihat Layanan →
                </Button>
              </motion.div>
            </div>

            {/* Visual Right */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }} 
              animate={{ opacity: 1, scale: 1 }} 
              transition={{ delay: 0.2 }}
              className="relative w-full aspect-[4/5] lg:aspect-[4/5] mt-10 lg:mt-0"
            >
              <div className="relative w-full h-full rounded-[32px] overflow-hidden shadow-2xl bg-slate-100">
                <img 
                  src="https://cdn.phototourl.com/free/2026-07-25-81ea5d3a-8ad6-4853-8499-9457507f3968.png" 
                  alt="Teknisi Rizki Router" 
                  className="w-full h-full object-cover object-center"
                />
              </div>

              {/* Single Floating Card - Premium Glassmorphism */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }} 
                animate={{ opacity: 1, y: 0 }} 
                transition={{ delay: 0.6 }} 
                className="absolute bottom-8 right-8 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md p-6 rounded-[24px] shadow-xl border border-white/20 flex items-center gap-4 z-20 hover:-translate-y-1 transition-transform duration-200"
              >
                <div className="bg-green-100 dark:bg-green-900/30 p-3 rounded-full">
                  <ShieldCheck className="w-6 h-6 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <div className="font-geist font-bold text-lg text-slate-900 dark:text-white leading-tight">Bergaransi</div>
                  <div className="text-[14px] text-slate-600 dark:text-slate-400">Pengerjaan Profesional</div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* LAYANAN SECTION */}
      <section id="layanan" className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading 
            title="Layanan Profesional Kami" 
            subtitle="Pilih layanan sesuai dengan masalah saluran yang Anda hadapi. Kami siap menangani skala residensial hingga industrial."
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {SERVICES.map((service, i) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2, delay: i * 0.05 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
                className="bg-white dark:bg-slate-900 rounded-2xl p-8 shadow-sm border border-slate-100 dark:border-slate-800 hover:shadow-xl hover:shadow-blue-500/5 transition-all group flex flex-col h-full text-left"
              >
                <div className="w-[56px] h-[56px] shrink-0 bg-[#EFF6FF] dark:bg-blue-900/30 border border-blue-100 dark:border-blue-800/50 text-[#2EA7F8] rounded-2xl flex items-center justify-center mb-6 group-hover:bg-[#2EA7F8] group-hover:border-[#2EA7F8] group-hover:text-white transition-all duration-200">
                  {service.icon}
                </div>
                <h3 className="text-card-title text-slate-900 dark:text-white mb-4">{service.title}</h3>
                <p className="text-body flex-grow text-[16px] text-slate-600 dark:text-slate-400">{service.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>

  {/* CARA KERJA SECTION */}
  <section id="cara-kerja" className="py-24 bg-slate-900 dark:bg-slate-950 text-white relative overflow-hidden">
    <div className="absolute inset-0 opacity-10 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-400 via-transparent to-transparent"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-20">
            <h2 className="text-section text-white mb-6">Cara Kerja Kami</h2>
            <p className="text-body text-slate-400 max-w-2xl mx-auto">Proses penanganan yang transparan, mudah, dan efisien.</p>
          </div>

          <div className="relative">
            {/* Connecting Line */}
            <div className="hidden md:block absolute top-10 left-[10%] right-[10%] h-0.5 bg-slate-800"></div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-6 relative">
              {WORK_STEPS.map((step, i) => (
                <motion.div 
                  key={step.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2, delay: i * 0.1 }}
                  viewport={{ once: true }}
                  className="relative z-10 flex flex-col items-center text-center group"
                >
                  <div className="w-20 h-20 rounded-full bg-slate-900 border-4 border-slate-800 flex items-center justify-center font-geist font-bold text-3xl text-slate-500 group-hover:border-[#2EA7F8] group-hover:text-[#2EA7F8] group-hover:shadow-[0_0_20px_rgba(46,167,248,0.3)] transition-all mb-8">
                    {step.id}
                  </div>
                  <h4 className="text-card-title text-[22px] text-white mb-3">{step.title}</h4>
                  <p className="font-inter text-[15px] leading-relaxed text-slate-400">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  </section>

  {/* AREA LAYANAN SECTION */}
  <section className="py-24 bg-[#0F172A] relative overflow-hidden">
    <div className="absolute inset-0 opacity-20 bg-[url('https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=1000&auto=format&fit=crop')] bg-cover bg-center grayscale mix-blend-overlay"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-[#0F172A] via-[#0F172A]/90 to-transparent"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <h2 className="text-section text-white mb-8">Area Layanan Kami</h2>
            <p className="text-body text-slate-300 mb-12">
              Tim teknisi kami tersebar di berbagai wilayah strategis untuk memastikan kedatangan yang cepat ke lokasi Anda. Kami menjangkau seluruh area Jabodetabek dan sekitarnya.
            </p>
            
            <div className="flex flex-wrap gap-4">
              {['DKI Jakarta (Pusat, Selatan, Timur, Barat, Utara)', 'Kota & Kabupaten Bogor', 'Kota Depok', 'Kota & Kabupaten Tangerang', 'Tangerang Selatan', 'Kota & Kabupaten Bekasi', 'Bandung & Sekitarnya', 'Karawang'].map((area, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.2, delay: i * 0.05 }}
                  viewport={{ once: true }}
                  className="flex items-center gap-2.5 bg-white/10 backdrop-blur-md px-6 py-3.5 rounded-full border border-white/20"
                >
                  <MapPin className="w-5 h-5 text-[#2EA7F8]" />
                  <span className="text-badge text-white">{area}</span>
                </motion.div>
          ))}
        </div>
      </div>
    </div>
  </section>

  {/* TESTIMONI SECTION */}
  <section className="py-24 bg-slate-50 dark:bg-[#0F172A]">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading title="Apa Kata Pelanggan?" />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { name: 'Budi Santoso', city: 'Jakarta Selatan', text: 'Respon di WhatsApp sangat cepat. Saya bisa atur jadwal survei sore hari setelah pulang kerja, dan teknisinya datang tepat waktu. Pengerjaan juga sangat rapi.', rating: 5, img: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&q=80&fit=crop' },
              { name: 'Rina Andayani', city: 'Depok', text: 'Harganya transparan dan dijelaskan di awal sebelum pengerjaan. Tidak ada biaya tersembunyi, sangat profesional dan sangat direkomendasikan.', rating: 5, img: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&q=80&fit=crop' },
              { name: 'Hendra Wijaya', city: 'Tangerang', text: 'Mesin rooternya sangat canggih, wastafel mampet beres tanpa bongkar keramik sama sekali. Teknisi yang datang juga ramah dan komunikatif.', rating: 5, img: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&q=80&fit=crop' },
              { name: 'Siti Aminah', city: 'Bekasi', text: 'Sangat mudah menjadwalkan perbaikan dengan Rizki Router. Adminnya responsif dan teknisinya datang sesuai jadwal yang disepakati bersama.', rating: 5, img: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&q=80&fit=crop' },
              { name: 'Arif Rahman', city: 'Bogor', text: 'Puas sekali dengan pelayanannya. Hasil pekerjaannya bersih, rapi, dan yang paling penting ada garansi. Pokoknya terpercaya.', rating: 5, img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&q=80&fit=crop' },
              { name: 'Diana Putri', city: 'Jakarta Pusat', text: 'Sempat khawatir harus bongkar pipa, ternyata pakai alat modern semua beres dengan cepat. Sangat mudah mengatur jadwal kedatangan teknisi.', rating: 5, img: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&q=80&fit=crop' },
              { name: 'Faisal Akbar', city: 'Jakarta Timur', text: 'Admin WhatsApp-nya sangat membantu saat konsultasi. Harga yang ditawarkan masuk akal dan pelayanannya top markotop.', rating: 5, img: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&q=80&fit=crop' },
              { name: 'Linda Kusuma', city: 'Tangerang Selatan', text: 'Pengerjaan cepat dan hasilnya memuaskan. Teknisinya sopan dan menjelaskan penyebab mampet agar tidak terulang lagi di kemudian hari.', rating: 5, img: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&q=80&fit=crop' },
              { name: 'Denny Pratama', city: 'Jakarta Barat', text: 'Bisa disesuaikan dengan jadwal libur saya di akhir pekan. Kedatangan on-time dan masalah saluran tersumbat langsung dikerjakan sampai tuntas.', rating: 5, img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&q=80&fit=crop' },
              { name: 'Maya Sari', city: 'Karawang', text: 'Layanan paling profesional yang pernah saya coba. Dijelaskan secara detail masalahnya, harga deal di awal, dan pengerjaan benar-benar bergaransi.', rating: 5, img: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&q=80&fit=crop' }
            ].map((testi, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2, delay: (i % 3) * 0.1 }}
                viewport={{ once: true }}
                className="bg-white dark:bg-slate-800/50 p-10 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm flex flex-col h-full hover:shadow-md transition-shadow duration-300"
              >
                <div className="flex gap-1 mb-8">
                  {[...Array(testi.rating)].map((_, idx) => (
                    <Star key={idx} className="w-5 h-5 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-body text-[17px] text-slate-600 dark:text-slate-300 italic mb-10 flex-grow">
                  "{testi.text}"
                </p>
                <div className="flex items-center gap-5 mt-auto">
                  <img src={testi.img} alt={testi.name} className="w-14 h-14 rounded-full object-cover border border-slate-200 dark:border-slate-700" loading="lazy" />
                  <div>
                    <h5 className="font-geist font-bold text-lg text-slate-900 dark:text-white mb-1 tracking-tight">{testi.name}</h5>
                    <p className="text-badge text-slate-500 dark:text-slate-400">{testi.city}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ SECTION */}
      <section id="faq" className="py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading title="Pertanyaan Umum (FAQ)" />
          
          <div className="space-y-4">
            {[
              { q: 'Apakah pelancaran pipa benar-benar tanpa bongkar?', a: 'Ya, kami menggunakan mesin Rooter modern dengan spiral elastis berteknologi tinggi yang dapat masuk ke dalam pipa belok sekalipun untuk menghancurkan kotoran tanpa perlu merusak lantai atau pipa Anda.' },
              { q: 'Berapa biaya jasa pelancaran saluran mampet?', a: 'Biaya bervariasi tergantung tingkat keparahan dan jenis saluran (toilet, wastafel, pipa utama). Silakan hubungi kami via WhatsApp untuk konsultasi gratis dan perkiraan harga. Harga transparan dan disepakati sebelum pengerjaan.' },
              { q: 'Bagaimana sistem garansinya?', a: 'Kami memberikan garansi 100% saluran lancar. Jika setelah dikerjakan air belum mengalir lancar sesuai kesepakatan, kami tidak akan memungut biaya, atau kami berikan garansi pengerjaan ulang.' },
              { q: 'Apakah saya bisa menentukan jadwal pengerjaan?', a: 'Ya. Anda dapat menghubungi kami melalui WhatsApp untuk berkonsultasi dan menentukan jadwal survei maupun pengerjaan sesuai kesepakatan dengan tim kami.' },
            ].map((faq, i) => (
               <FaqItem key={i} faq={faq} />
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT / CTA SECTION */}
      <section className="py-12 pb-32 md:pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] overflow-hidden shadow-2xl border border-slate-100 dark:border-slate-800 flex flex-col lg:flex-row">
            
            {/* Contact Info */}
            <div className="lg:w-2/5 bg-gradient-to-br from-[#2EA7F8] to-[#1D8CF8] p-10 md:p-16 text-white relative overflow-hidden">
              <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=1000&auto=format&fit=crop')] bg-cover opacity-10 mix-blend-overlay"></div>
              
              <div className="relative z-10">
                <h3 className="text-section mb-6 text-white">Butuh Bantuan Cepat?</h3>
                <p className="text-body text-blue-100 mb-12">
                  Hubungi kami melalui WhatsApp untuk konsultasi dan menentukan jadwal survei maupun pengerjaan sesuai kesepakatan.
                </p>

                <div className="space-y-8">
                  <a href={generateWaLink("Halo Rizki Router, saya ingin berkonsultasi mengenai masalah saluran mampet.")} className="flex items-center gap-5 hover:bg-white/10 p-4 rounded-xl transition-colors w-fit -ml-4">
                    <div className="bg-white/20 p-4 rounded-full"><MessageCircle className="w-7 h-7" /></div>
                    <div>
                      <p className="text-badge text-blue-200 mb-1">Konsultasi & Penjadwalan</p>
                      <p className="font-geist font-bold text-3xl text-white tracking-tight">+62 812-8633-0248</p>
                    </div>
                  </a>
                  <a href={INSTA_URL} target="_blank" rel="noreferrer" className="flex items-center gap-5 hover:bg-white/10 p-4 rounded-xl transition-colors w-fit -ml-4">
                    <div className="bg-white/20 p-4 rounded-full"><Instagram className="w-7 h-7" /></div>
                    <div>
                      <p className="text-badge text-blue-200 mb-1">Instagram</p>
                      <p className="font-geist font-bold text-3xl text-white tracking-tight">@pipamampetsolution</p>
                    </div>
                  </a>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="p-10 md:p-16 lg:w-3/5">
              <h3 className="text-section text-slate-900 dark:text-white mb-10">Pesan Layanan</h3>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-nav text-slate-700 dark:text-slate-300 mb-3">Nama Lengkap</label>
                  <input 
                    type="text" 
                    required
                    value={formData.nama}
                    onChange={(e) => setFormData({...formData, nama: e.target.value})}
                    className="text-body w-full px-5 py-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-[#2EA7F8] focus:border-transparent transition-all outline-none"
                    placeholder="Masukkan nama Anda"
                  />
                </div>
                <div>
                  <label className="block text-nav text-slate-700 dark:text-slate-300 mb-3">Lokasi / Alamat Lengkap</label>
                  <input 
                    type="text" 
                    required
                    value={formData.lokasi}
                    onChange={(e) => setFormData({...formData, lokasi: e.target.value})}
                    className="text-body w-full px-5 py-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-[#2EA7F8] focus:border-transparent transition-all outline-none"
                    placeholder="Contoh: Jl. Sudirman, Jakarta Selatan"
                  />
                </div>
                <div>
                  <label className="block text-nav text-slate-700 dark:text-slate-300 mb-3">Jenis Permasalahan</label>
                  <select 
                    value={formData.jenis}
                    onChange={(e) => setFormData({...formData, jenis: e.target.value})}
                    className="text-body w-full px-5 py-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-[#2EA7F8] focus:border-transparent transition-all outline-none appearance-none"
                  >
                    {SERVICES.map(s => (
                      <option key={s.id} value={s.title}>{s.title}</option>
                    ))}
                    <option value="Lainnya">Lainnya / Konsultasi Dulu</option>
                  </select>
                </div>
                <div>
                  <label className="block text-nav text-slate-700 dark:text-slate-300 mb-3">Pesan Tambahan (Opsional)</label>
                  <textarea 
                    rows={4}
                    value={formData.pesan}
                    onChange={(e) => setFormData({...formData, pesan: e.target.value})}
                    className="text-body w-full px-5 py-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-[#2EA7F8] focus:border-transparent transition-all outline-none resize-none"
                    placeholder="Jelaskan sedikit tentang masalah saluran Anda"
                  ></textarea>
                </div>
                <Button type="submit" variant="primary" className="w-full mt-4 text-[16px]">
                  Kirim via WhatsApp <Send className="w-5 h-5 ml-3" />
                </Button>
              </form>
            </div>
            
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-slate-50 dark:bg-[#0F172A] border-t border-slate-200 dark:border-slate-800 pt-20 pb-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
            
            <div className="md:col-span-1">
              <div className="flex items-center gap-4 mb-8">
                <img src={LOGO_URL} alt="Rizki Router Logo" className="h-12 w-auto rounded-md shadow-sm" />
                <div className="flex flex-col">
                  <span className="text-logo text-slate-900 dark:text-white tracking-tight leading-none text-[22px]">Rizki Router</span>
                  <span className="font-inter font-semibold text-[10px] text-[#2EA7F8] uppercase tracking-[0.1em] mt-1">Pipa Mampet Solution</span>
                </div>
              </div>
              <p className="text-body text-[16px] text-slate-500 dark:text-slate-400 mb-8">
                Solusi cerdas dan cepat atasi saluran air mampet tanpa bongkar. Profesional, modern, dan bergaransi.
              </p>
              <div className="flex gap-4">
                <a href={generateWaLink()} className="w-12 h-12 rounded-full bg-slate-200 dark:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-400 hover:bg-[#25D366] hover:text-white transition-colors">
                  <MessageCircle className="w-5 h-5" />
                </a>
                <a href={INSTA_URL} target="_blank" rel="noreferrer" className="w-12 h-12 rounded-full bg-slate-200 dark:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-400 hover:bg-[#E4405F] hover:text-white transition-colors">
                  <Instagram className="w-5 h-5" />
                </a>
              </div>
            </div>

            <div>
              <h4 className="font-geist font-bold text-xl text-slate-900 dark:text-white mb-8 tracking-tight">Layanan</h4>
              <ul className="space-y-4">
                {SERVICES.slice(0, 5).map(s => (
                  <li key={s.id}><a href="#layanan" className="text-nav text-slate-500 hover:text-[#2EA7F8] dark:text-slate-400 transition-colors">{s.title}</a></li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-geist font-bold text-xl text-slate-900 dark:text-white mb-8 tracking-tight">Navigasi</h4>
              <ul className="space-y-4">
                <li><a href="#home" className="text-nav text-slate-500 hover:text-[#2EA7F8] dark:text-slate-400 transition-colors">Home</a></li>
                <li><a href="#tentang" className="text-nav text-slate-500 hover:text-[#2EA7F8] dark:text-slate-400 transition-colors">Tentang Kami</a></li>
                <li><a href="#cara-kerja" className="text-nav text-slate-500 hover:text-[#2EA7F8] dark:text-slate-400 transition-colors">Cara Kerja</a></li>
                <li><a href="#faq" className="text-nav text-slate-500 hover:text-[#2EA7F8] dark:text-slate-400 transition-colors">FAQ</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-geist font-bold text-xl text-slate-900 dark:text-white mb-8 tracking-tight">Area Layanan</h4>
              <ul className="space-y-4">
                {['Jakarta', 'Bogor & Depok', 'Tangerang', 'Bekasi', 'Bandung'].map((area, i) => (
                   <li key={i}><span className="text-nav text-slate-500 dark:text-slate-400">{area}</span></li>
                ))}
              </ul>
            </div>
            
          </div>
          
          <div className="pt-8 border-t border-slate-200 dark:border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-body text-[15px] text-slate-500 dark:text-slate-400">
              &copy; {new Date().getFullYear()} Rizki Router. All rights reserved.
            </p>
            <div className="text-body text-[15px] text-slate-500 dark:text-slate-400">
              Jasa Pelancaran Pipa Mampet Profesional
            </div>
          </div>
        </div>
      </footer>

      {}
      {/* Floating Action Buttons (Desktop) */}
      <div className="hidden md:flex fixed bottom-8 right-8 flex-col gap-4 z-50">
        <a 
          href={INSTA_URL} target="_blank" rel="noreferrer"
          className="w-14 h-14 bg-white dark:bg-slate-800 rounded-full flex items-center justify-center shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:-translate-y-1 transition-transform border border-slate-100 dark:border-slate-700 group"
        >
          <Instagram className="w-6 h-6 text-slate-600 dark:text-slate-300 group-hover:text-pink-600 transition-colors" />
        </a>
        <a 
          href={generateWaLink()}
          className="w-14 h-14 bg-[#25D366] rounded-full flex items-center justify-center shadow-[0_8px_30px_rgba(37,211,102,0.3)] hover:-translate-y-1 transition-transform"
        >
          <MessageCircle className="w-7 h-7 text-white" />
        </a>
      </div>

      {}
      {/* Mobile Sticky Bottom Nav */}
      <div className="md:hidden fixed bottom-0 inset-x-0 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 pb-safe z-50 shadow-[0_-4px_10px_rgba(0,0,0,0.05)]">
        <div className="flex items-center justify-around p-3">
          <a href={`tel:+${WA_NUMBER}`} className="flex flex-col items-center justify-center gap-1.5 text-slate-500 dark:text-slate-400 w-full">
            <Phone className="w-5 h-5" />
            <span className="font-inter font-semibold text-[10px] uppercase tracking-widest">Telepon</span>
          </a>
          <a href={INSTA_URL} target="_blank" rel="noreferrer" className="flex flex-col items-center justify-center gap-1.5 text-slate-500 dark:text-slate-400 w-full border-l border-slate-100 dark:border-slate-800">
            <Instagram className="w-5 h-5 text-pink-600" />
            <span className="font-inter font-semibold text-[10px] uppercase tracking-widest">Instagram</span>
          </a>
          <a href={generateWaLink()} className="flex flex-col items-center justify-center gap-1 text-[#25D366] w-full border-l border-slate-100 dark:border-slate-800">
            <div className="bg-[#25D366]/10 p-1.5 rounded-full mb-0.5">
              <MessageCircle className="w-5 h-5" />
            </div>
            <span className="font-inter font-semibold text-[10px] uppercase tracking-widest">WhatsApp</span>
          </a>
        </div>
      </div>

      <ChatBotWidget />
    </div>
  );
};

export default App;