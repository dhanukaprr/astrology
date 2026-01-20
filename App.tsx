import React, { useState, useEffect } from 'react';
import { Sun, Moon, Star, Calendar, MapPin, User, ArrowRight, Shield, Award, Users, Quote, ChevronRight, Compass, Heart, Gem, BookOpen, Mail, Phone, Clock } from 'lucide-react';
import { getDailyHoroscope } from './services/geminiService';
import { Lagna } from './types';

const App: React.FC = () => {
  const [dailyPredictions, setDailyPredictions] = useState<Record<string, string>>({});

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
      title: "Natal Chart Analysis (Kendaraya)",
      desc: "A comprehensive mapping of the heavens at the moment of your birth. We decode the influence of the Navagrahas (Nine Planets) to understand your life's purpose and karma.",
      icon: <Star size={32} />
    },
    {
      title: "Marriage Compatibility (Porondam)",
      desc: "Using the traditional 20-point matching system (Vimsathi Porondam), we ensure spiritual, mental, and physical harmony between partners for a lifelong union.",
      icon: <Heart size={32} />
    },
    {
      title: "Nadi Palm Leaf Reading",
      desc: "Ancestral wisdom inscribed on palm leaves by ancient Rishis. We facilitate the search for your specific leaf, revealing past lives and future path.",
      icon: <BookOpen size={32} />
    },
    {
      title: "Vastu Shastra Consulting",
      desc: "Traditional Vedic architecture to harmonize your home or business with nature's energies, ensuring prosperity, health, and peace of mind.",
      icon: <Compass size={32} />
    },
    {
      title: "Auspicious Timing (Neketh)",
      desc: "Selecting the 'Subha Muhurtha' for significant life events—weddings, housewarmings, or business launches—to ensure cosmic support.",
      icon: <Clock size={32} />
    },
    {
      title: "Navaratna Gemstones",
      desc: "Prescribing high-quality, natural gemstones to balance planetary weaknesses and amplify your natural strengths based on your natal chart.",
      icon: <Gem size={32} />
    }
  ];

  const zodiacSigns = [
    { name: "Aries", range: "Mar 21 - Apr 19", icon: "♈" },
    { name: "Taurus", range: "Apr 20 - May 20", icon: "♉" },
    { name: "Gemini", range: "May 21 - Jun 20", icon: "♊" },
    { name: "Cancer", range: "Jun 21 - Jul 22", icon: "♋" },
    { name: "Leo", range: "Jul 23 - Aug 22", icon: "♌" },
    { name: "Virgo", range: "Aug 23 - Sep 22", icon: "♍" },
    { name: "Libra", range: "Sep 23 - Oct 22", icon: "♎" },
    { name: "Scorpio", range: "Oct 23 - Nov 21", icon: "♏" },
    { name: "Sagittarius", range: "Nov 22 - Dec 21", icon: "♐" },
    { name: "Capricorn", range: "Dec 22 - Jan 19", icon: "♑" },
    { name: "Aquarius", range: "Jan 20 - Feb 18", icon: "♒" },
    { name: "Pisces", range: "Feb 19 - Mar 20", icon: "♓" }
  ];

  return (
    <div className="min-h-screen selection:bg-maroon selection:text-white">
      {/* Top Bar */}
      <div className="bg-[#800000] text-white text-sm py-3 px-6 flex justify-between items-center tracking-[0.2em] uppercase font-bold">
        <span>Authentic Sri Lankan Jyotish Heritage</span>
        <div className="flex gap-8">
          <span className="flex items-center gap-2"><Phone size={14} /> +94 11 234 5678</span>
          <span className="hidden md:flex items-center gap-2"><Mail size={14} /> wisdom@surya.lk</span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="px-6 py-8 flex flex-col md:flex-row justify-between items-center border-b border-slate-100 sticky top-0 z-50 bg-white/95 backdrop-blur-md">
        <div className="flex items-center gap-4 mb-6 md:mb-0">
          <div className="text-maroon">
            <Sun size={48} strokeWidth={1.5} />
          </div>
          <div>
            <h1 className="text-4xl font-black text-maroon tracking-tighter serif uppercase leading-none">Surya Astrology</h1>
            <span className="text-xs tracking-[0.4em] uppercase text-slate-400 font-bold">The Sanctuary of Light</span>
          </div>
        </div>
        <div className="flex gap-10 text-slate-800 font-bold text-sm tracking-[0.1em] uppercase">
          <a href="#" className="hover:text-maroon transition-colors">Home</a>
          <a href="#heritage" className="hover:text-maroon transition-colors">Lineage</a>
          <a href="#services" className="hover:text-maroon transition-colors">Services</a>
          <a href="#zodiac" className="hover:text-maroon transition-colors">Zodiac</a>
          <a href="#booking" className="text-maroon border-b-2 border-maroon pb-1">Book Consultation</a>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="px-6 py-24 md:py-36 text-center relative max-w-7xl mx-auto overflow-hidden">
        <div className="relative z-10 max-w-4xl mx-auto">
          <div className="section-ornament">
            <div className="ornament-line"></div>
            <span className="text-gold text-xl">✥</span>
            <div className="ornament-line"></div>
          </div>
          <h2 className="text-6xl md:text-9xl font-black mb-10 leading-[1.1] text-slate-900 serif italic">
            Ancestral Wisdom <br /> <span className="text-maroon">for the Modern Soul</span>
          </h2>
          <p className="text-slate-600 text-2xl md:text-3xl max-w-3xl mx-auto mb-16 leading-relaxed italic font-light">
            Rooted in the ancient Jyotish traditions of Sri Lanka, Surya Astrology offers precise 
            astrological guidance passed down through seven generations of traditional practitioners.
          </p>
          <div className="flex flex-col md:flex-row items-center justify-center gap-10">
            <a href="#booking" className="btn-traditional text-xl font-bold shadow-xl px-12 py-5">
              Schedule Your Session
            </a>
            <a href="#heritage" className="text-maroon font-bold flex items-center gap-2 border-b-2 border-transparent hover:border-maroon pb-1 transition-all uppercase tracking-[0.2em] text-xs">
              Our Sacred Lineage <ChevronRight size={16} />
            </a>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 space-y-40">
        
        {/* Heritage Section */}
        <section id="heritage" className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          <div className="relative p-4 md:p-8">
            <div className="traditional-border">
              <img 
                src="https://images.unsplash.com/photo-1543336783-b563a7692cd0?auto=format&fit=crop&q=80&w=1200" 
                alt="Traditional Sri Lankan Lamp" 
                className="w-full grayscale brightness-90 hover:grayscale-0 transition-all duration-1000"
              />
            </div>
          </div>
          <div className="space-y-10">
            <span className="text-maroon font-bold tracking-[0.4em] uppercase text-xs block">A Legacy of Seven Generations</span>
            <h3 className="text-6xl font-bold leading-tight serif text-slate-900">The Tradition of Surya</h3>
            <p className="text-slate-600 text-2xl leading-relaxed font-light italic">
              "We do not merely predict; we interpret the cosmic language of the Rishis. In our lineage, 
              astrology is a sacred responsibility—a service to humanity to navigate life's stormy seas 
              with the light of the Navagrahas."
            </p>
            <p className="text-slate-500 text-lg leading-relaxed">
              At Surya Astrology, we maintain the strict mathematical purity of the Vedic tradition. 
              Our practitioners are trained in the same methods used in the Royal Courts of Ancient Ceylon, 
              using precise planetary calculations to offer clarity on health, wealth, and spiritual growth.
            </p>
            <div className="grid grid-cols-2 gap-10 pt-4">
              <div className="space-y-4">
                <Shield className="text-maroon" size={36} />
                <h4 className="font-bold text-xl serif text-slate-900">Ethical Guidance</h4>
                <p className="text-base text-slate-500 leading-relaxed">Unbiased, compassionate advice based purely on celestial truth.</p>
              </div>
              <div className="space-y-4">
                <Users className="text-maroon" size={36} />
                <h4 className="font-bold text-xl serif text-slate-900">Ancestral Roots</h4>
                <p className="text-base text-slate-500 leading-relaxed">A documented history of astrological service dating back centuries.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Dynamic Daily Insights */}
        <section id="guidance" className="bg-parchment p-16 md:p-24 rounded-sm border border-slate-100">
          <div className="text-center mb-20">
            <h3 className="text-5xl font-bold serif text-slate-900 italic">Celestial Rhythms</h3>
            <div className="w-32 h-[1px] bg-maroon mx-auto mt-6"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
            {Object.entries(dailyPredictions).map(([lagna, pred], idx) => (
              <div key={idx} className="text-center space-y-8">
                <div className="flex flex-col items-center">
                   <Moon className="text-gold mb-6" size={40} />
                   <h4 className="text-3xl font-bold text-maroon serif uppercase tracking-widest">{lagna}</h4>
                   <span className="text-xs text-slate-400 uppercase tracking-widest font-bold">Daily Guidance</span>
                </div>
                <p className="text-slate-600 leading-relaxed text-xl italic font-light">"{pred}"</p>
              </div>
            ))}
          </div>
        </section>

        {/* Services Section */}
        <section id="services" className="space-y-24">
          <div className="text-center">
            <span className="text-maroon font-bold tracking-[0.4em] uppercase text-xs block mb-6">Our Sacred Offerings</span>
            <h3 className="text-6xl font-bold serif text-slate-900">Astrological Services</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16">
            {services.map((s, i) => (
              <div key={i} className="card-tradition p-12 space-y-8 flex flex-col items-start">
                <div className="text-maroon opacity-80">{s.icon}</div>
                <h4 className="text-3xl font-bold text-slate-900 serif italic">{s.title}</h4>
                <p className="text-slate-500 leading-relaxed text-lg flex-grow font-light">{s.desc}</p>
                <a href="#booking" className="text-maroon font-bold text-sm uppercase tracking-widest border-b-2 border-transparent hover:border-maroon pt-6 transition-all flex items-center gap-3">
                  Learn More <ArrowRight size={18} />
                </a>
              </div>
            ))}
          </div>
        </section>

        {/* Zodiac Section */}
        <section id="zodiac" className="space-y-24 py-10">
          <div className="text-center">
            <span className="text-maroon font-bold tracking-[0.4em] uppercase text-xs block mb-6">The Twelve Constellations</span>
            <h3 className="text-6xl font-bold serif text-slate-900">The Rashis</h3>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-12">
            {zodiacSigns.map((z, i) => (
              <div key={i} className="text-center group cursor-pointer">
                <div className="text-7xl mb-8 text-slate-200 group-hover:text-maroon transition-colors duration-500">{z.icon}</div>
                <h4 className="text-2xl font-bold text-slate-900 serif group-hover:text-maroon transition-colors uppercase tracking-wider">{z.name}</h4>
                <p className="text-xs text-slate-400 uppercase font-black tracking-widest mt-2">{z.range}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Testimonials */}
        <section className="space-y-24 py-10 bg-parchment rounded-sm border border-slate-100 p-16 md:p-24">
          <div className="text-center">
            <h3 className="text-5xl font-bold serif text-slate-900 italic">Client Gratitude</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
            {[
              { name: "Devinda Ratnayake", text: "The consultation was life-changing. Surya Astrology doesn't just give predictions; they provide spiritual solutions.", location: "Colombo, SL" },
              { name: "Sarah Mitchell", text: "Their Vastu guidance transformed my home. I felt a palpable shift in peace and harmony within days.", location: "London, UK" },
              { name: "Kasun Jayasundara", text: "Truly authentic. No commercial gimmicks—just pure, ancestral wisdom and accurate calculations.", location: "Kandy, SL" }
            ].map((t, idx) => (
              <div key={idx} className="relative text-center">
                <Quote className="text-maroon/10 mx-auto mb-8" size={56} />
                <p className="text-slate-600 mb-10 italic text-xl leading-relaxed font-light">"{t.text}"</p>
                <h5 className="text-xl font-bold text-slate-900 serif">{t.name}</h5>
                <p className="text-xs text-slate-400 uppercase font-bold tracking-widest mt-2">{t.location}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Booking Form */}
        <section id="booking" className="max-w-5xl mx-auto space-y-20 py-10">
          <div className="text-center space-y-6">
            <h3 className="text-6xl font-bold serif text-slate-900 italic">Book a Private Consultation</h3>
            <p className="text-slate-500 text-xl max-w-2xl mx-auto leading-relaxed">Please provide your details below. Our senior astrologer will review your request and contact you for a private session.</p>
          </div>
          
          <form className="grid grid-cols-1 md:grid-cols-2 gap-16 bg-white p-12 md:p-20 traditional-border">
            <div className="space-y-10">
              <div className="space-y-4">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Full Name</label>
                <input type="text" className="w-full border-b-2 border-slate-100 py-4 focus:border-maroon outline-none transition-all italic text-xl" placeholder="e.g. Priyantha Perera" />
              </div>
              <div className="space-y-4">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Contact Email</label>
                <input type="email" className="w-full border-b-2 border-slate-100 py-4 focus:border-maroon outline-none transition-all italic text-xl" placeholder="email@address.com" />
              </div>
              <div className="space-y-4">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Phone Number</label>
                <input type="tel" className="w-full border-b-2 border-slate-100 py-4 focus:border-maroon outline-none transition-all italic text-xl" placeholder="+94 7X XXX XXXX" />
              </div>
            </div>
            <div className="space-y-10">
              <div className="space-y-4">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Interested Service</label>
                <select className="w-full border-b-2 border-slate-100 py-4 focus:border-maroon outline-none transition-all italic text-xl bg-transparent appearance-none">
                  <option>Natal Chart Analysis</option>
                  <option>Marriage Compatibility</option>
                  <option>Nadi Palm Leaf Reading</option>
                  <option>Vastu Consulting</option>
                  <option>Other Services</option>
                </select>
              </div>
              <div className="space-y-4">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Brief Message</label>
                <textarea className="w-full border-b-2 border-slate-100 py-4 focus:border-maroon outline-none transition-all italic text-xl h-40 resize-none" placeholder="Tell us about your requirements..."></textarea>
              </div>
              <div className="pt-6">
                <button type="button" onClick={() => alert("Thank you. We will contact you shortly.")} className="btn-traditional w-full font-bold uppercase tracking-widest shadow-lg text-lg py-5">Submit Request</button>
              </div>
            </div>
          </form>
        </section>

      </main>

      {/* Footer */}
      <footer className="mt-40 border-t border-slate-100 py-32 px-6 bg-[#2d241e] text-slate-300">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-20">
          <div className="space-y-10">
            <div className="flex items-center gap-4">
              <Sun className="text-gold" size={48} />
              <span className="text-4xl font-black text-white serif tracking-tighter uppercase">Surya</span>
            </div>
            <p className="text-lg leading-relaxed font-light italic opacity-80">
              Sri Lanka's premier sanctuary for authentic Jyotish and Vedic tradition. 
              Preserving cosmic wisdom for future generations.
            </p>
          </div>
          <div>
            <h5 className="text-white font-bold mb-10 uppercase text-xs tracking-[0.3em]">Our Services</h5>
            <ul className="space-y-6 text-slate-400 text-base italic">
              <li><a href="#" className="hover:text-gold transition-colors">Personal Horoscopes</a></li>
              <li><a href="#" className="hover:text-gold transition-colors">Marriage Porondam</a></li>
              <li><a href="#" className="hover:text-gold transition-colors">Vastu Architecture</a></li>
              <li><a href="#" className="hover:text-gold transition-colors">Nadi Astrology</a></li>
            </ul>
          </div>
          <div>
            <h5 className="text-white font-bold mb-10 uppercase text-xs tracking-[0.3em]">The Heritage</h5>
            <ul className="space-y-6 text-slate-400 text-base italic">
              <li><a href="#" className="hover:text-gold transition-colors">Our Ancient Lineage</a></li>
              <li><a href="#" className="hover:text-gold transition-colors">Vedic Principles</a></li>
              <li><a href="#" className="hover:text-gold transition-colors">Palm Leaf History</a></li>
              <li><a href="#" className="hover:text-gold transition-colors">Spiritual Practices</a></li>
            </ul>
          </div>
          <div>
            <h5 className="text-white font-bold mb-10 uppercase text-xs tracking-[0.3em]">Contact Center</h5>
            <div className="space-y-8 text-slate-400 text-base italic">
              <p className="leading-relaxed">No. 45, Spiritual Lane,<br />Colombo 07, Sri Lanka.</p>
              <p className="font-bold text-white text-xl tracking-widest">+94 11 234 5678</p>
              <div className="flex gap-10 pt-6">
                <a href="#" className="text-slate-500 hover:text-gold transition-all"><Users size={24} /></a>
                <a href="#" className="text-slate-500 hover:text-gold transition-all"><Mail size={24} /></a>
                <a href="#" className="text-slate-500 hover:text-gold transition-all"><Phone size={24} /></a>
              </div>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto border-t border-white/5 mt-28 pt-16 flex flex-col md:flex-row justify-between items-center gap-10 text-slate-500 text-xs font-bold uppercase tracking-widest">
          <p>© {new Date().getFullYear()} Surya Astrology Heritage. All Rights Reserved.</p>
          <div className="flex gap-12">
            <a href="#" className="hover:text-white transition-colors">Privacy Charter</a>
            <a href="#" className="hover:text-white transition-colors">Ancestral Terms</a>
          </div>
          <p>Traditional Business Platform</p>
        </div>
      </footer>
    </div>
  );
};

export default App;