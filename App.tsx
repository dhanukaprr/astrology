import React, { useState, useEffect } from 'react';
import { BirthInfo, LagnaReading, Lagna } from './types';
import { getPersonalizedReading, getDailyHoroscope } from './services/geminiService';
import LiveAstrologer from './components/LiveAstrologer';
import { Sun, Moon, Star, Calendar, Clock, MapPin, User, ArrowRight, Sparkles, Shield, Award, Users, Quote, ChevronRight, Compass, Heart, Gem, BookOpen } from 'lucide-react';

const App: React.FC = () => {
  const [birthInfo, setBirthInfo] = useState<BirthInfo>({
    name: '',
    birthDate: '',
    birthTime: '',
    birthPlace: ''
  });
  const [reading, setReading] = useState<LagnaReading | null>(null);
  const [loading, setLoading] = useState(false);
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

  const handleCalculate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const result = await getPersonalizedReading(birthInfo);
      setReading(result);
    } catch (err) {
      console.error(err);
      alert("The stars are currently obscured. Please check your connection and try again.");
    } finally {
      setLoading(false);
    }
  };

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
    <div className="min-h-screen celestial-bg-light pb-20 overflow-x-hidden text-slate-800">
      {/* Navigation */}
      <nav className="px-6 py-5 flex justify-between items-center border-b border-slate-100 sticky top-0 z-50 bg-white/95 backdrop-blur-xl shadow-sm">
        <div className="flex items-center gap-3">
          <div className="bg-yellow-500 p-2.5 rounded-xl shadow-md">
            <Sun className="text-white" size={24} />
          </div>
          <h1 className="text-2xl font-bold gold-glow text-slate-900 tracking-tighter serif uppercase">Surya Astrology</h1>
        </div>
        <div className="hidden lg:flex gap-10 text-slate-500 font-semibold text-[11px] tracking-[0.2em] uppercase">
          <a href="#" className="hover:text-yellow-600 transition-colors">Home</a>
          <a href="#heritage" className="hover:text-yellow-600 transition-colors">Heritage</a>
          <a href="#guidance" className="hover:text-yellow-600 transition-colors">Daily Guidance</a>
          <a href="#readings" className="hover:text-yellow-600 transition-colors">Readings</a>
          <a href="#reading-form" className="px-6 py-2.5 bg-yellow-500 text-white rounded-full hover:bg-yellow-600 transition-all shadow-lg shadow-yellow-500/20">Analyze Chart</a>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="px-6 py-24 md:py-40 text-center relative max-w-7xl mx-auto overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 opacity-30 pointer-events-none">
          <Sparkles size={240} className="text-yellow-200 animate-pulse" />
        </div>
        <div className="animate-float relative z-10">
          <h2 className="text-5xl md:text-8xl font-black mb-8 leading-[1.1] tracking-tight text-slate-900 serif">
            Illuminate Your <br /> <span className="gradient-text-gold">Spiritual Path</span>
          </h2>
        </div>
        <p className="text-slate-500 text-lg md:text-2xl max-w-3xl mx-auto mb-14 leading-relaxed font-light">
          Experience the authentic precision of Ceylonese Vedic Astrology. From Ancient Nadi Palm Leaves 
          to Modern Cosmic Alignment, discover the destiny written for you.
        </p>
        <div className="flex flex-col md:flex-row items-center justify-center gap-8">
          <a href="#reading-form" className="inline-flex items-center gap-3 bg-slate-900 hover:bg-black text-white px-12 py-6 rounded-full font-bold text-lg transition-all transform hover:scale-105 shadow-2xl shadow-slate-200">
            Get Your Destiny Report <ArrowRight size={22} />
          </a>
          <a href="#heritage" className="text-slate-500 hover:text-yellow-600 flex items-center gap-2 border-b-2 border-slate-100 hover:border-yellow-500 pb-1 transition-all uppercase tracking-[0.2em] text-[11px] font-bold">
            Explore Ancient Wisdom
          </a>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 space-y-40">
        
        {/* Daily Highlights Section */}
        <section id="guidance" className="space-y-16">
          <div className="text-center">
            <span className="text-yellow-600 font-bold tracking-[0.4em] uppercase text-[10px] block mb-4">Cosmic Rhythms</span>
            <h3 className="text-5xl font-bold serif text-slate-900">Today's Celestial Guidance</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {Object.entries(dailyPredictions).map(([lagna, pred], idx) => (
              <div key={idx} className="card-light p-10 rounded-3xl group">
                <div className="flex items-center gap-4 mb-8">
                  <div className="p-4 bg-yellow-50 rounded-2xl group-hover:bg-yellow-500 group-hover:text-white transition-all duration-500">
                    <Moon size={32} className="text-yellow-600 group-hover:text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-slate-900 serif">{lagna}</h3>
                    <span className="text-[10px] text-slate-400 font-black uppercase tracking-widest">Daily Alignment</span>
                  </div>
                </div>
                <p className="text-slate-600 leading-relaxed text-lg font-light italic">"{pred}"</p>
                <div className="mt-10 pt-6 border-t border-slate-50">
                    <button className="text-yellow-700 font-bold hover:text-yellow-500 transition-colors text-[10px] uppercase tracking-widest flex items-center gap-2">
                        View Detailed Forecast <ChevronRight size={14} />
                    </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Heritage Section */}
        <section id="heritage" className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center py-10">
          <div className="relative group">
            <div className="absolute -inset-10 bg-yellow-100/30 blur-[100px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="relative z-10 p-4 border border-slate-100 rounded-[3rem] bg-slate-50">
                <img 
                  src="https://images.unsplash.com/photo-1515516089376-88db1e26e9c0?auto=format&fit=crop&q=80&w=1200" 
                  alt="Traditional Astrology Tools" 
                  className="rounded-[2.5rem] shadow-xl hover:contrast-125 transition-all duration-700"
                />
            </div>
            <div className="absolute -bottom-12 -left-8 bg-white p-10 rounded-3xl z-20 border border-slate-100 shadow-2xl max-w-sm hidden md:block">
              <Compass className="text-yellow-600 mb-6" size={48} />
              <h4 className="font-bold text-2xl mb-3 serif text-slate-900">Palm Leaf Heritage</h4>
              <p className="text-slate-500 leading-relaxed text-sm">Centuries ago, Sri Lankan sages decoded the destiny of souls on palm leaves. We bridge this heritage with modern insights.</p>
            </div>
          </div>
          <div className="space-y-10">
            <span className="text-yellow-600 font-bold tracking-[0.4em] uppercase text-[10px] block">Our Sacred Philosophy</span>
            <h3 className="text-6xl font-bold leading-tight serif text-slate-900">Rooted in Tradition, Enhanced by Clarity</h3>
            <p className="text-slate-500 text-xl leading-relaxed font-light">
              Following the spiritual standards of <i>Jothishya.lk</i> and <i>Srisiva Nadi Astrology</i>, we offer 
              more than just predictions. We provide a cosmic map based on precise planetary longitudes 
              inherited from the Royal Astrologers of Ancient Ceylon.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 pt-4">
              <div className="space-y-4">
                <div className="w-12 h-12 bg-slate-900 rounded-xl flex items-center justify-center shadow-lg">
                    <Shield className="text-yellow-500" size={24} />
                </div>
                <h4 className="font-bold text-xl serif text-slate-900">Total Integrity</h4>
                <p className="text-sm text-slate-500">Every reading is calculated using authentic mathematical algorithms from the Ola Leaf tradition.</p>
              </div>
              <div className="space-y-4">
                <div className="w-12 h-12 bg-yellow-500 rounded-xl flex items-center justify-center shadow-lg">
                    <BookOpen className="text-white" size={24} />
                </div>
                <h4 className="font-bold text-xl serif text-slate-900">Pure Wisdom</h4>
                <p className="text-sm text-slate-500">No generic forecasts. Only deep-dive cosmic analysis unique to your exact moment of birth.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Live AI Integration Section */}
        <section className="py-10">
          <div className="max-w-4xl mx-auto">
            <LiveAstrologer />
          </div>
        </section>

        {/* Reading Tool Form */}
        <section id="reading-form" className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start scroll-mt-24">
          <div className="bg-white p-12 rounded-[3rem] border border-slate-100 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
                <Star size={200} className="text-yellow-500" />
            </div>
            <h3 className="text-4xl font-black mb-6 text-slate-900 serif">
              Analyze Birth Chart
            </h3>
            <p className="text-slate-500 mb-12 max-w-sm">Enter your precise birth details to unlock a multi-dimensional Vedic destiny report.</p>
            
            <form onSubmit={handleCalculate} className="space-y-8 relative z-10">
              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">Your Full Name</label>
                  <div className="relative">
                    <User className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300" size={20} />
                    <input
                      type="text"
                      placeholder="e.g. Anura Perera"
                      className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-5 pl-14 pr-6 focus:ring-2 focus:ring-yellow-500 focus:bg-white outline-none transition-all text-slate-800"
                      value={birthInfo.name}
                      onChange={(e) => setBirthInfo({...birthInfo, name: e.target.value})}
                      required
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">Birth Date</label>
                    <div className="relative">
                      <Calendar className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300" size={20} />
                      <input
                        type="date"
                        className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-5 pl-14 pr-6 focus:ring-2 focus:ring-yellow-500 outline-none transition-all text-slate-800"
                        value={birthInfo.birthDate}
                        onChange={(e) => setBirthInfo({...birthInfo, birthDate: e.target.value})}
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">Birth Time</label>
                    <div className="relative">
                      <Clock className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300" size={20} />
                      <input
                        type="time"
                        className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-5 pl-14 pr-6 focus:ring-2 focus:ring-yellow-500 outline-none transition-all text-slate-800"
                        value={birthInfo.birthTime}
                        onChange={(e) => setBirthInfo({...birthInfo, birthTime: e.target.value})}
                        required
                      />
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">Birth Place</label>
                  <div className="relative">
                    <MapPin className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300" size={20} />
                    <input
                      type="text"
                      placeholder="e.g. Kandy, Sri Lanka"
                      className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-5 pl-14 pr-6 focus:ring-2 focus:ring-yellow-500 outline-none transition-all text-slate-800"
                      value={birthInfo.birthPlace}
                      onChange={(e) => setBirthInfo({...birthInfo, birthPlace: e.target.value})}
                      required
                    />
                  </div>
                </div>
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full py-6 bg-slate-900 hover:bg-black text-white font-bold text-xl rounded-2xl transition-all shadow-xl shadow-slate-200 disabled:opacity-50 uppercase tracking-widest"
              >
                {loading ? "Consulting Stars..." : "Generate Analysis"}
              </button>
            </form>
          </div>

          <div className="flex flex-col min-h-[600px]">
            {reading ? (
              <div className="animate-in fade-in slide-in-from-bottom-10 duration-700 space-y-8 h-full">
                <div className="bg-white p-12 rounded-[3rem] border border-yellow-200 shadow-2xl h-full flex flex-col relative">
                  <div className="absolute top-0 left-0 w-full h-1.5 bg-yellow-500 rounded-t-[3rem]"></div>
                  <div className="flex items-center justify-between mb-10">
                    <div>
                      <h4 className="text-5xl font-black text-slate-900 serif">{reading.lagna} <span className="text-yellow-600 text-3xl">Ascendant</span></h4>
                      <p className="text-slate-400 mt-2 font-bold tracking-[0.2em] uppercase text-[10px]">Natal Alignment Confirmed</p>
                    </div>
                    <div className="px-6 py-2 bg-yellow-50 text-yellow-700 text-[10px] font-black rounded-full uppercase tracking-[0.2em]">Authentic Report</div>
                  </div>
                  
                  <p className="text-slate-700 leading-relaxed text-xl mb-12 border-b border-slate-50 pb-12 font-light italic">"{reading.summary}"</p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 flex-1">
                    {[
                      { label: "Vitality & Health", val: reading.predictions.health, icon: <Sun size={20} className="text-yellow-600" /> },
                      { label: "Prosperity & Wealth", val: reading.predictions.wealth, icon: <Gem size={20} className="text-yellow-600" /> },
                      { label: "Vocation & Career", val: reading.predictions.career, icon: <ChevronRight size={20} className="text-yellow-600" /> },
                      { label: "Harmony & Relationships", val: reading.predictions.love, icon: <Heart size={20} className="text-yellow-600" /> }
                    ].map((item, i) => (
                      <div key={i} className="p-6 bg-slate-50 rounded-[2rem] border border-slate-100 hover:border-yellow-200 transition-colors">
                        <div className="flex items-center gap-3 mb-4">
                          {item.icon}
                          <h5 className="text-slate-900 font-bold uppercase text-[10px] tracking-widest">{item.label}</h5>
                        </div>
                        <p className="text-slate-500 text-sm leading-relaxed">{item.val}</p>
                      </div>
                    ))}
                  </div>

                  <div className="mt-12 pt-10 border-t border-slate-50 flex flex-wrap justify-between items-center gap-10">
                    <div className="space-y-4">
                      <span className="text-slate-400 text-[10px] uppercase block font-black tracking-widest">Auspicious Numbers</span>
                      <div className="flex gap-4">
                        {reading.luckyNumbers.map(n => (
                          <span key={n} className="w-12 h-12 rounded-xl bg-slate-900 text-white flex items-center justify-center font-black text-xl shadow-lg">{n}</span>
                        ))}
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-slate-400 text-[10px] uppercase block mb-2 font-black tracking-widest">Power Color</span>
                      <span className="text-3xl text-slate-900 font-black serif uppercase">{reading.luckyColor}</span>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-center p-20 bg-slate-50 rounded-[3rem] border-2 border-dashed border-slate-200">
                <div className="w-32 h-32 bg-white rounded-full flex items-center justify-center mb-10 shadow-sm">
                  <Sparkles size={64} className="text-slate-200" />
                </div>
                <h4 className="text-3xl font-bold text-slate-400 mb-6 serif">Your Chart Analysis <br /> Will Appear Here</h4>
                <p className="text-slate-400 text-lg font-light leading-relaxed max-w-sm">Ensure your birth time is as accurate as possible for the most precise celestial alignment.</p>
              </div>
            )}
          </div>
        </section>

        {/* Zodiac Grid */}
        <section id="zodiac" className="space-y-20 py-10">
          <div className="text-center">
            <span className="text-yellow-600 font-bold tracking-[0.4em] uppercase text-[10px] block mb-4">Cosmic Signs</span>
            <h3 className="text-6xl font-bold serif text-slate-900">Explore the Zodiac</h3>
            <p className="text-slate-500 mt-6 max-w-2xl mx-auto text-lg font-light">The twelve constellations form the framework of the soul's journey. Discover your fundamental archetype.</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {zodiacSigns.map((z, i) => (
              <div key={i} className="bg-white p-10 rounded-3xl text-center border border-slate-100 hover:border-yellow-200 hover:shadow-2xl transition-all group">
                <div className="text-5xl mb-6 group-hover:scale-125 transition-transform duration-500 inline-block grayscale group-hover:grayscale-0">{z.icon}</div>
                <h4 className="text-xl font-bold text-slate-900 mb-2 serif">{z.name}</h4>
                <p className="text-[10px] text-slate-400 uppercase font-black tracking-widest">{z.range}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Testimonials - Inspired by ceylonastrology.com */}
        <section className="space-y-20 py-10">
          <div className="text-center">
            <h3 className="text-5xl font-bold serif text-slate-900">Voices of Enlightenment</h3>
            <div className="w-24 h-1.5 bg-yellow-500 mx-auto mt-6 rounded-full shadow-lg"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: "Saman Kumara", text: "The accuracy regarding my career transition was truly remarkable. It provided me the confidence I needed.", location: "Colombo, Sri Lanka" },
              { name: "Elizabeth J.", text: "A profoundly spiritual experience. Surya Astrology maintains the high standards of traditional Nadi readings.", location: "Victoria, Australia" },
              { name: "Nimal Wickramasinghe", text: "The auspicious timing service helped us select the perfect date for our daughter's wedding. Excellent guidance.", location: "Kandy, Sri Lanka" }
            ].map((t, idx) => (
              <div key={idx} className="bg-white p-10 rounded-[2.5rem] border border-slate-50 shadow-sm relative group">
                <Quote className="text-yellow-100 absolute top-8 right-8" size={64} />
                <p className="text-slate-600 mb-10 italic text-xl leading-relaxed font-light relative z-10">"{t.text}"</p>
                <div className="flex items-center gap-4 relative z-10">
                  <div className="w-12 h-12 bg-slate-900 text-yellow-500 rounded-full flex items-center justify-center font-bold text-lg serif">
                    {t.name[0]}
                  </div>
                  <div>
                    <h5 className="font-bold text-slate-900 serif">{t.name}</h5>
                    <p className="text-[10px] text-slate-400 uppercase font-bold tracking-widest">{t.location}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Professional Call to Action */}
        <section className="bg-slate-900 p-16 md:p-28 rounded-[4rem] text-center relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-10"></div>
          <div className="relative z-10 space-y-10">
            <h3 className="text-5xl md:text-7xl font-bold leading-tight serif text-white">Unlock Your <span className="text-yellow-500">Ancient Potential</span></h3>
            <p className="text-2xl text-slate-400 max-w-3xl mx-auto font-light leading-relaxed">
              Don't leave your life to chance. Align with the cosmic design already written for you by the universe.
            </p>
            <div className="pt-6">
                <button 
                  onClick={() => document.getElementById('reading-form')?.scrollIntoView()}
                  className="bg-yellow-500 hover:bg-yellow-400 text-white px-16 py-7 rounded-full font-black text-2xl transition-all shadow-2xl hover:scale-105 active:scale-95 uppercase tracking-widest"
                >
                    Analyze My Destiny Now
                </button>
            </div>
          </div>
        </section>

      </main>

      {/* Footer */}
      <footer className="mt-40 border-t border-slate-100 py-24 px-6 bg-slate-50">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-16">
          <div className="space-y-8">
            <div className="flex items-center gap-4">
              <Sun className="text-yellow-600" size={32} />
              <span className="text-2xl font-black text-slate-900 serif">Surya</span>
            </div>
            <p className="text-slate-500 leading-relaxed font-light">
              Sri Lanka's leading sanctuary for Vedic and Nadi Astrology. 
              Preserving ancient wisdom for a modern world.
            </p>
          </div>
          <div>
            <h5 className="text-slate-900 font-bold mb-10 uppercase text-[10px] tracking-[0.3em]">Our Services</h5>
            <ul className="space-y-6 text-slate-500 text-sm">
              <li><a href="#" className="hover:text-yellow-600 transition-colors">Vedic Birth Analysis</a></li>
              <li><a href="#" className="hover:text-yellow-600 transition-colors">Marriage Compatibility</a></li>
              <li><a href="#" className="hover:text-yellow-600 transition-colors">Vastu Consultants</a></li>
              <li><a href="#" className="hover:text-yellow-600 transition-colors">Ola Leaf Decoding</a></li>
            </ul>
          </div>
          <div>
            <h5 className="text-slate-900 font-bold mb-10 uppercase text-[10px] tracking-[0.3em]">Knowledge Base</h5>
            <ul className="space-y-6 text-slate-500 text-sm">
              <li><a href="#" className="hover:text-yellow-600 transition-colors">Ola Leaf History</a></li>
              <li><a href="#" className="hover:text-yellow-600 transition-colors">Planetary Transits</a></li>
              <li><a href="#" className="hover:text-yellow-600 transition-colors">Sri Lankan Traditions</a></li>
              <li><a href="#" className="hover:text-yellow-600 transition-colors">Jyotish Basics</a></li>
            </ul>
          </div>
          <div>
            <h5 className="text-slate-900 font-bold mb-10 uppercase text-[10px] tracking-[0.3em]">Connect with Us</h5>
            <div className="space-y-6 text-slate-500 text-sm">
              <p className="leading-relaxed">No. 45, Spiritual Lane,<br />Colombo 07, Sri Lanka.</p>
              <p className="font-bold text-slate-900">Contact: +94 11 234 5678</p>
              <div className="flex gap-8 pt-4">
                <a href="#" className="text-slate-300 hover:text-yellow-600 transition-all"><Users size={24} /></a>
                <a href="#" className="text-slate-300 hover:text-yellow-600 transition-all"><Star size={24} /></a>
                <a href="#" className="text-slate-300 hover:text-yellow-600 transition-all"><Moon size={24} /></a>
              </div>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto border-t border-slate-100 mt-24 pt-12 flex flex-col md:flex-row justify-between items-center gap-8 text-slate-400 text-[10px] font-bold uppercase tracking-widest">
          <p>© {new Date().getFullYear()} Surya Astrology Heritage. All Rights Reserved.</p>
          <div className="flex gap-10">
            <a href="#" className="hover:text-slate-900">Privacy Charter</a>
            <a href="#" className="hover:text-slate-900">Terms of Wisdom</a>
          </div>
          <p>Powered by Advanced Gemini AI</p>
        </div>
      </footer>
    </div>
  );
};

export default App;