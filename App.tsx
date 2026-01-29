import React, { useState, useEffect } from 'react';
import { Sun, Moon, Star, Calendar, MapPin, User, ArrowRight, Shield, Award, Users, Quote, ChevronRight, Compass, Heart, Gem, BookOpen, Mail, Phone, Clock, Menu, X } from 'lucide-react';
import { getDailyHoroscope } from './services/geminiService';
import { Lagna } from './types';

const App: React.FC = () => {
  const [dailyPredictions, setDailyPredictions] = useState<Record<string, string>>({});
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const fetchDailies = async () => {
      try {
        const lagnas = [Lagna.Aries, Lagna.Leo, Lagna.Sagittarius];
        const preds: Record<string, string> = {};
        for (const l of lagnas) {
          const prediction = await getDailyHoroscope(l);
          preds[l] = prediction;
        }
        setDailyPredictions(preds);
      } catch (error) {
        console.error("Error fetching daily horoscopes:", error);
      }
    };
    fetchDailies();
  }, []);

  const services = [
    {
      title: "Natal Chart Analysis",
      desc: "Comprehensive Kendaraya reading decoding the influence of Navagrahas to reveal your life's karma.",
      icon: <Star size={32} />
    },
    {
      title: "Marriage Harmony",
      desc: "Traditional Vimsathi Porondam matching to ensure spiritual and physical union for a lifetime.",
      icon: <Heart size={32} />
    },
    {
      title: "Nadi Palm Readings",
      desc: "Ancient wisdom inscribed by Rishis. Discover your specific leaf and past life karma.",
      icon: <BookOpen size={32} />
    },
    {
      title: "Vastu Shastra",
      desc: "Align your home or business with cosmic energies for prosperity and peace using Vedic architecture.",
      icon: <Compass size={32} />
    },
    {
      title: "Auspicious Neketh",
      desc: "Precise calculation of Subha Muhurtha for weddings, business launches, and housewarmings.",
      icon: <Clock size={32} />
    },
    {
      title: "Gem Therapy",
      desc: "Prescription of Navaratna gemstones to balance planetary influences and strengthen your aura.",
      icon: <Gem size={32} />
    }
  ];

  const zodiacSigns = [
    { name: "Mesha", sub: "Aries", icon: "♈" },
    { name: "Vrushabha", sub: "Taurus", icon: "♉" },
    { name: "Mithuna", sub: "Gemini", icon: "♊" },
    { name: "Kataka", sub: "Cancer", icon: "♋" },
    { name: "Simha", sub: "Leo", icon: "♌" },
    { name: "Kanya", sub: "Virgo", icon: "♍" },
    { name: "Thula", sub: "Libra", icon: "♎" },
    { name: "Vrischika", sub: "Scorpio", icon: "♏" },
    { name: "Dhanu", sub: "Sagittarius", icon: "♐" },
    { name: "Makara", sub: "Capricorn", icon: "♑" },
    { name: "Kumbha", sub: "Aquarius", icon: "♒" },
    { name: "Meena", sub: "Pisces", icon: "♓" }
  ];

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <div className="min-h-screen selection:bg-terracotta selection:text-white overflow-x-hidden">
      {/* Top Bar - decorative scroll style */}
      <div className="bg-terracotta text-white py-2 px-4 shadow-md border-b-4 border-gold relative z-20">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center text-[10px] sm:text-xs tracking-[0.15em] uppercase font-bold text-center sm:text-left gap-2">
          <span className="flex items-center gap-2"><div className="w-2 h-2 bg-gold rotate-45"></div> Authentic Knowledge of the Ancients</span>
          <div className="flex gap-6 items-center">
            <span className="flex items-center gap-2 text-gold"><Phone size={12} /> +94 11 234 5678</span>
            <span className="hidden sm:flex items-center gap-2 text-gold"><Mail size={12} /> wisdom@surya.lk</span>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="px-4 sm:px-6 py-6 sticky top-0 z-50 bg-[#F2E8D5]/95 backdrop-blur-sm border-b border-terracotta/20 shadow-lg">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-4 group cursor-pointer">
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full border-4 double border-terracotta bg-white flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform duration-500 sesath-circle">
              <Sun size={32} className="text-saffron animate-spin-slow" strokeWidth={1.5} />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-terracotta tracking-tight serif uppercase leading-none drop-shadow-sm">Surya</h1>
              <div className="flex items-center gap-2">
                <div className="h-[1px] w-8 bg-gold"></div>
                <span className="text-[9px] sm:text-[10px] tracking-[0.3em] uppercase text-charcoal/70 font-bold">Astrology</span>
                <div className="h-[1px] w-8 bg-gold"></div>
              </div>
            </div>
          </div>

          {/* Desktop Menu */}
          <div className="hidden lg:flex gap-8 text-charcoal font-bold text-sm uppercase tracking-[0.15em] items-center">
            {["Home", "Lineage", "Services", "Zodiac"].map((item) => (
              <a key={item} href={`#${item.toLowerCase()}`} className="hover:text-terracotta transition-colors relative group py-2">
                {item}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-terracotta transition-all duration-300 group-hover:w-full"></span>
              </a>
            ))}
            <a href="#booking" className="btn-traditional text-sm px-6 py-3 ml-4">
              Consult Now
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button onClick={toggleMenu} className="lg:hidden text-terracotta p-2 hover:bg-terracotta/10 rounded-full transition-colors">
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Sidebar */}
        {isMenuOpen && (
          <div className="lg:hidden absolute top-full left-0 w-full bg-[#E6DBC6] border-b-4 border-terracotta shadow-2xl py-8 px-6 flex flex-col gap-6 animate-in slide-in-from-top duration-300 z-40">
            {["Home", "Lineage", "Services", "Zodiac"].map((item) => (
              <a key={item} href={`#${item.toLowerCase()}`} onClick={toggleMenu} className="text-charcoal font-bold text-base tracking-widest uppercase flex items-center justify-between border-b border-terracotta/20 pb-3">
                {item} <ChevronRight size={16} className="text-terracotta" />
              </a>
            ))}
            <a href="#booking" onClick={toggleMenu} className="btn-traditional text-center w-full mt-4">Book Consultation</a>
          </div>
        )}
      </nav>

      <main className="space-y-32 overflow-hidden">

        {/* Hero Section */}
        <header id="home" className="relative pt-20 pb-40 px-4 text-center">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-gradient-radial from-saffron/10 to-transparent opacity-50 pointer-events-none rounded-full blur-3xl z-0"></div>

          <div className="relative z-10 max-w-5xl mx-auto space-y-8">
            <div className="inline-flex items-center gap-4 text-terracotta font-bold tracking-[0.3em] uppercase text-xs sm:text-sm border-y border-gold py-2 px-8 mb-4">
              <span>✦</span> Wisdom of 7 Generations <span>✦</span>
            </div>

            <h2 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black text-charcoal serif leading-[0.9] drop-shadow-sm">
              <span className="block text-terracotta">Sacred</span>
              <span className="block italic font-light relative">
                Horoscopes
                <img src="/sun-motif.svg" alt="" className="absolute -top-10 -right-10 w-24 h-24 opacity-20 hidden md:block" />
              </span>
            </h2>

            <p className="text-xl sm:text-2xl md:text-3xl max-w-3xl mx-auto font-serif italic text-charcoal/80 leading-relaxed">
              Unlock the secrets of your destiny through the precise mathematical purity of ancient Ceylon's astrological heritage.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-8">
              <a href="#booking" className="btn-traditional text-lg px-12 py-5 shadow-2xl shadow-terracotta/20">
                Reveal Your Path
              </a>
            </div>
          </div>

          {/* Decorative Bottom Border */}
          <div className="absolute bottom-0 left-0 w-full h-16 bg-repeat-x opacity-40" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'40\' height=\'12\' viewBox=\'0 0 40 12\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M20 0L40 12H0L20 0Z\' fill=\'%23A03018\'/%3E%3C/svg%3E")' }}></div>
        </header>

        {/* Heritage Section */}
        <section id="lineage" className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            <div className="order-2 lg:order-1 relative">
              <div className="absolute -inset-4 border-2 border-dashed border-terracotta/30 rounded-full animate-spin-slower hidden lg:block"></div>
              <div className="relative rounded-t-full overflow-hidden border-8 border-white shadow-2xl mx-auto max-w-md lg:max-w-full">
                <img
                  src="/heritage-statue.jpg"
                  alt="Ancient Stone Statue"
                  className="w-full aspect-[3/4] object-cover sepia-[.15] hover:sepia-0 transition-all duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-terracotta/40 to-transparent mix-blend-multiply"></div>
              </div>
            </div>

            <div className="order-1 lg:order-2 space-y-10 text-center lg:text-left">
              <div className="space-y-4">
                <h3 className="text-4xl sm:text-6xl font-black serif text-terracotta">The Royal Lineage</h3>
                <div className="h-1 w-24 bg-gold mx-auto lg:mx-0"></div>
              </div>

              <p className="text-xl sm:text-2xl leading-relaxed serif italic text-charcoal/80">
                "Astrology is not superstition; it is the mathematics of karma. We preserve the methods used in the court of kings."
              </p>

              <div className="prose prose-lg text-charcoal/70 mx-auto lg:mx-0">
                <p>
                  Rooted in the ancient Jyotish traditions, Surya Astrology offers guidance that has been protected and passed down through seven generations of master astrologers. We perform every calculation manually, ensuring the spiritual integrity of the reading.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 pt-6">
                <div className="bg-white/40 p-6 border border-terracotta/10 rounded-lg">
                  <Shield className="text-terracotta w-10 h-10 mb-4 mx-auto lg:mx-0" />
                  <h4 className="font-bold text-lg uppercase tracking-wide mb-2">Purity of Method</h4>
                  <p className="text-sm">Strict adherence to Vedic calculations without modern simplifications.</p>
                </div>
                <div className="bg-white/40 p-6 border border-terracotta/10 rounded-lg">
                  <Users className="text-terracotta w-10 h-10 mb-4 mx-auto lg:mx-0" />
                  <h4 className="font-bold text-lg uppercase tracking-wide mb-2">Ancestral Trust</h4>
                  <p className="text-sm">Serving families across the island for over two centuries.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Daily Guidance - Styled like a Palm Leaf */}
        <section className="bg-terracotta text-parchment py-16 relative overflow-hidden">
          <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 50% 50%, #C29A45 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>
          <div className="max-w-7xl mx-auto px-4 relative z-10">
            <div className="text-center mb-16">
              <h3 className="text-3xl sm:text-5xl font-bold serif mb-4 text-gold">Celestial Rhythms</h3>
              <p className="text-white/70 italic">Daily guidance for the primary ascendants</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {Object.entries(dailyPredictions).map(([lagna, pred], idx) => (
                <div key={idx} className="bg-[#8a2510] p-8 border border-gold/30 rounded-sm relative group hover:bg-[#721e0d] transition-colors">
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -mt-4 bg-terracotta text-gold p-2 border border-gold rounded-full">
                    <Moon size={24} />
                  </div>
                  <h4 className="text-2xl font-bold text-center mt-4 mb-6 uppercase tracking-[0.2em] text-gold">{lagna}</h4>
                  <p className="text-center font-serif italic text-lg opacity-90 leading-relaxed">"{pred}"</p>
                  <div className="mt-6 flex justify-center">
                    <span className="text-[10px] uppercase tracking-widest opacity-50 font-bold">Today's Energy</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section id="services" className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16 sm:mb-24">
            <span className="text-terracotta font-bold tracking-[0.3em] uppercase text-xs block mb-4">Our Sacred Offerings</span>
            <h3 className="text-4xl sm:text-6xl font-black serif text-charcoal">Divine Services</h3>
            <div className="section-ornament">
              <div className="ornament-line"></div>
              <span className="text-terracotta text-2xl">✥</span>
              <div className="ornament-line"></div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
            {services.map((s, i) => (
              <div key={i} className="card-tradition p-8 sm:p-10 flex flex-col items-center text-center group">
                <div className="mb-6 p-4 rounded-full border-2 border-terracotta/20 text-terracotta group-hover:bg-terracotta group-hover:text-white transition-all duration-300">
                  {s.icon}
                </div>
                <h4 className="text-2xl font-bold text-charcoal serif mb-4">{s.title}</h4>
                <p className="text-charcoal/70 leading-relaxed mb-8 font-light">{s.desc}</p>
                <div className="mt-auto">
                  <a href="#booking" className="text-xs font-bold uppercase tracking-[0.2em] text-terracotta border-b border-terracotta pb-1 hover:text-charcoal hover:border-charcoal transition-all">Read More</a>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Zodiac Strip */}
        <section id="zodiac" className="bg-[#E6DBC6] py-20 border-y-4 border-double border-terracotta/30">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <h3 className="text-3xl sm:text-4xl font-black serif text-terracotta mb-12 uppercase tracking-widest">The Twelve Rashis</h3>
            <div className="flex flex-wrap justify-center gap-6 sm:gap-10">
              {zodiacSigns.map((z, i) => (
                <div key={i} className="w-24 sm:w-32 flex flex-col items-center group cursor-pointer">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center text-4xl sm:text-5xl bg-white/50 rounded-full border-2 border-transparent group-hover:border-terracotta group-hover:bg-white transition-all duration-300 shadow-sm">
                    {z.icon}
                  </div>
                  <span className="mt-4 font-bold text-charcoal text-sm uppercase tracking-wider">{z.name}</span>
                  <span className="text-[10px] text-terracotta font-bold uppercase tracking-widest opacity-60 group-hover:opacity-100">{z.sub}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Booking Section */}
        <section id="booking" className="max-w-4xl mx-auto px-4 pb-20">
          <div className="traditional-border bg-white/80 p-8 sm:p-16 shadow-2xl">
            <div className="text-center mb-12">
              <h3 className="text-3xl sm:text-5xl font-black serif text-terracotta mb-4">Request Consultation</h3>
              <p className="text-charcoal/60 italic">"The planets do not compel, they impel. Take the first step towards understanding."</p>
            </div>

            <form className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-terracotta">Your Name</label>
                  <input type="text" className="w-full bg-transparent border-b-2 border-charcoal/20 py-3 focus:border-terracotta outline-none transition-colors font-serif text-lg" placeholder="Full Name" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-terracotta">Birth Date</label>
                  <input type="text" className="w-full bg-transparent border-b-2 border-charcoal/20 py-3 focus:border-terracotta outline-none transition-colors font-serif text-lg" placeholder="DD / MM / YYYY" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-terracotta">Select Service</label>
                <select className="w-full bg-transparent border-b-2 border-charcoal/20 py-3 focus:border-terracotta outline-none transition-colors font-serif text-lg appearance-none cursor-pointer">
                  <option>Natal Chart Analysis</option>
                  <option>Marriage Compatibility</option>
                  <option>Vastu Consultation</option>
                  <option>General Guidance</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-terracotta">Your Query</label>
                <textarea className="w-full bg-transparent border-b-2 border-charcoal/20 py-3 focus:border-terracotta outline-none transition-colors font-serif text-lg h-32 resize-none" placeholder="How may we assist you?"></textarea>
              </div>

              <div className="pt-8 text-center">
                <button type="button" onClick={() => alert("Request sent. May the stars guide you.")} className="btn-traditional w-full sm:w-auto min-w-[200px] text-lg font-bold">
                  Send to Astrologer
                </button>
              </div>
            </form>
          </div>
        </section>

      </main>

      {/* Footer */}
      <footer className="bg-[#E6DBC6] text-[#252525] pt-20 pb-10 border-t-8 border-terracotta">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-16 text-center md:text-left">
          <div className="space-y-6">
            <div className="flex items-center justify-center md:justify-start gap-4">
              <Sun className="text-terracotta w-10 h-10" />
              <span className="text-3xl font-black text-terracotta serif uppercase">Surya</span>
            </div>
            <p className="text-[#252525] font-serif italic leading-relaxed opacity-90">
              Preserving the sacred science of Jyotish for the betterment of humanity.
            </p>
          </div>

          <div className="space-y-6">
            <h5 className="text-terracotta font-bold uppercase tracking-[0.2em] text-xs">Temple Office</h5>
            <p className="text-[#252525] leading-relaxed opacity-80">
              No. 45, Spiritual Lane,<br />
              Colombo 07, Sri Lanka
            </p>
            <p className="text-terracotta font-bold tracking-widest">+94 11 234 5678</p>
          </div>

          <div className="space-y-6">
            <h5 className="text-terracotta font-bold uppercase tracking-[0.2em] text-xs">Sacred Hours</h5>
            <p className="text-[#252525] opacity-80">
              Mon - Sat: 9:00 AM - 6:00 PM<br />
              Poya Days: Closed for Meditation
            </p>
            <div className="flex gap-6 justify-center md:justify-start pt-4 text-[#252525]/60">
              <a href="#" className="hover:text-terracotta transition-colors"><Users /></a>
              <a href="#" className="hover:text-terracotta transition-colors"><Mail /></a>
            </div>
          </div>
        </div>

        <div className="text-center mt-20 pt-8 border-t border-[#252525]/10 text-[#252525]/50 text-[10px] uppercase tracking-[0.2em]">
          © {new Date().getFullYear()} Surya Astrology Heritage. All Rights Reserved.
        </div>
      </footer>
    </div>
  );
};

export default App;