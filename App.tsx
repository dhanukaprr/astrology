import React, { useState, useEffect } from 'react';
import { BirthInfo, LagnaReading, Lagna } from './types';
import { getPersonalizedReading, getDailyHoroscope } from './services/geminiService';
import { Sun, Moon, Star, Calendar, Clock, MapPin, User, ArrowRight, Sparkles, Shield, Award, Users, Quote, ChevronRight } from 'lucide-react';

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
      const lagnas = [Lagna.Mesha, Lagna.Kataka, Lagna.Sinha];
      const preds: Record<string, string> = {};
      for (const l of lagnas) {
        preds[l] = await getDailyHoroscope(l);
      }
      setDailyPredictions(preds);
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
      alert("දෝෂයක් සිදු විය. කරුණාකර නැවත උත්සාහ කරන්න.");
    } finally {
      setLoading(false);
    }
  };

  const zodiacSigns = [
    { name: "මේෂ", range: "අප්‍රේල් 14 - මැයි 14", icon: "♈" },
    { name: "වෘෂභ", range: "මැයි 15 - ජූනි 14", icon: "♉" },
    { name: "මිථුන", range: "ජූනි 15 - ජූලි 16", icon: "♊" },
    { name: "කටක", range: "ජූලි 17 - අගෝස්තු 16", icon: "♋" },
    { name: "සිංහ", range: "අගෝස්තු 17 - සැප්තැම්බර් 16", icon: "♌" },
    { name: "කන්‍යා", range: "සැප්තැම්බර් 17 - ඔක්තෝබර් 17", icon: "♍" },
    { name: "තුලා", range: "ඔක්තෝබර් 18 - නොවැම්බර් 16", icon: "♎" },
    { name: "වෘශ්චික", range: "නොවැම්බර් 17 - දෙසැම්බර් 15", icon: "♏" },
    { name: "ධනු", range: "දෙසැම්බර් 16 - ජනවාරි 14", icon: "♐" },
    { name: "මකර", range: "ජනවාරි 15 - පෙබරවාරි 12", icon: "♑" },
    { name: "කුම්භ", range: "පෙබරවාරි 13 - මාර්තු 14", icon: "♒" },
    { name: "මීන", range: "මාර්තු 15 - අප්‍රේල් 13", icon: "♓" }
  ];

  return (
    <div className="min-h-screen celestial-bg pb-20 overflow-x-hidden text-slate-100">
      {/* Navigation */}
      <nav className="p-6 flex justify-between items-center border-b border-white/5 sticky top-0 z-50 bg-[#0c0e14]/90 backdrop-blur-xl">
        <div className="flex items-center gap-3">
          <div className="bg-gradient-to-tr from-yellow-600 to-yellow-400 p-2 rounded-full shadow-lg shadow-yellow-500/20">
            <Sun className="text-black" size={24} />
          </div>
          <h1 className="text-2xl font-bold gold-glow text-yellow-500 tracking-tighter">සූර්යා ජ්‍යොතිෂය</h1>
        </div>
        <div className="hidden lg:flex gap-10 text-gray-400 font-medium">
          <a href="#" className="hover:text-yellow-500 transition-colors">මුල් පිටුව</a>
          <a href="#about" className="hover:text-yellow-500 transition-colors">අප ගැන</a>
          <a href="#services" className="hover:text-yellow-500 transition-colors">ලග්න පලාඵල</a>
          <a href="#zodiac" className="hover:text-yellow-500 transition-colors">රාශි චක්‍රය</a>
          <a href="#reading-form" className="px-5 py-2 bg-yellow-600/10 text-yellow-500 border border-yellow-600/30 rounded-full hover:bg-yellow-600 hover:text-white transition-all">කේන්දර පරීක්ෂාව</a>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="px-6 py-28 text-center relative max-w-7xl mx-auto">
        <div className="absolute top-10 left-1/2 -translate-x-1/2 opacity-20 pointer-events-none">
          <Sparkles size={180} className="text-yellow-500 animate-pulse" />
        </div>
        <div className="animate-float">
          <h2 className="text-5xl md:text-8xl font-black mb-8 leading-tight tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-500">
            තරුවල රහස් <br /> ඔබේ ජීවිතයට...
          </h2>
        </div>
        <p className="text-gray-400 text-lg md:text-2xl max-w-3xl mx-auto mb-12 leading-relaxed font-light">
          වසර දහස් ගණනක හෙළ ජ්‍යොතිෂ ඥානය සහ ග්‍රහ වස්තූන්ගේ බලපෑම තුළින් <br /> ඔබේ අනාගතය නිවැරදිව ජයගන්න.
        </p>
        <div className="flex flex-col md:flex-row items-center justify-center gap-6">
          <a href="#reading-form" className="inline-flex items-center gap-3 bg-yellow-600 hover:bg-yellow-500 text-black px-10 py-5 rounded-full font-black text-xl transition-all transform hover:scale-105 shadow-2xl shadow-yellow-900/30">
            කේන්දර පලාඵල බලන්න <ArrowRight size={24} />
          </a>
          <a href="#about" className="text-gray-300 hover:text-white flex items-center gap-2 border-b border-gray-700 hover:border-yellow-500 pb-1 transition-all">
            තවදුරටත් දැනගන්න
          </a>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 space-y-32">
        
        {/* Daily Highlights Section */}
        <section id="services" className="space-y-12">
          <div className="flex flex-col md:flex-row items-end justify-between gap-6">
            <div className="max-w-2xl">
              <span className="text-yellow-500 font-bold tracking-widest uppercase text-sm">Today's Guidance</span>
              <h3 className="text-4xl font-bold mt-2">අද දින ලග්න පලාඵල</h3>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {Object.entries(dailyPredictions).map(([lagna, pred], idx) => (
              <div key={idx} className="card-glass p-8 rounded-3xl border-l-8 border-yellow-600 transition-all hover:-translate-y-2 hover-glow">
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-3 bg-yellow-600/20 rounded-2xl">
                    <Moon className="text-yellow-500" size={32} />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-yellow-500">{lagna} ලග්නය</h3>
                    <span className="text-xs text-gray-500 font-bold uppercase">Daily Prediction</span>
                  </div>
                </div>
                <p className="text-gray-300 leading-relaxed text-lg">{pred}</p>
                <button className="mt-8 flex items-center gap-2 text-yellow-600 font-bold hover:text-yellow-400 transition-colors">
                  වැඩි විස්තර <ChevronRight size={18} />
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className="relative">
            <div className="absolute -inset-4 bg-yellow-600/10 blur-3xl rounded-full"></div>
            <img 
              src="https://images.unsplash.com/photo-1532667449560-72a95c8d381b?auto=format&fit=crop&q=80&w=1000" 
              alt="Astrology Background" 
              className="rounded-3xl shadow-2xl relative z-10 border border-white/5"
            />
            <div className="absolute -bottom-10 -right-10 card-glass p-8 rounded-2xl z-20 border-yellow-500/50 max-w-xs hidden md:block">
              <Award className="text-yellow-500 mb-4" size={40} />
              <h4 className="font-bold text-xl mb-2">පාරම්පරික විශ්වාසය</h4>
              <p className="text-sm text-gray-400">වසර 40කට අධික කාලයක් ශ්‍රී ලංකාවේ ප්‍රමුඛතම ජ්‍යොතිෂ සේවාව.</p>
            </div>
          </div>
          <div className="space-y-8">
            <span className="text-yellow-500 font-bold tracking-widest uppercase text-sm">Why Choose Us</span>
            <h3 className="text-5xl font-bold leading-tight">ගුණාත්මක සහ විශ්වසනීය ජ්‍යොතිෂ සේවාව</h3>
            <p className="text-gray-400 text-xl leading-relaxed">
              සූර්යා ජ්‍යොතිෂය යනු හුදෙක් පලාඵල ප්‍රකාශ කරන්නෙකු නොවේ. අපි පාරම්පරික පුස්කොළ පොත් සහ පැරණි සෘෂි වරුන්ගේ ඥානය නවීන තාක්ෂණය සමඟ මුසු කර ඔබ වෙත ගෙන එන්නෙමු.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              <div className="flex gap-4">
                <Shield className="text-yellow-500 shrink-0" size={28} />
                <div>
                  <h4 className="font-bold text-lg">100% රහස්‍යභාවය</h4>
                  <p className="text-sm text-gray-500">ඔබේ තොරතුරු අප සතු ව ඉතාම සුරක්ෂිතයි.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <Users className="text-yellow-500 shrink-0" size={28} />
                <div>
                  <h4 className="font-bold text-lg">ප්‍රවීණ මණ්ඩලයක්</h4>
                  <p className="text-sm text-gray-500">පළපුරුදු ජ්‍යොතිර්වේදීන්ගේ අධීක්ෂණය.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Personalized Reading Form */}
        <section id="reading-form" className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start scroll-mt-24">
          <div className="card-glass p-10 rounded-[2.5rem] border border-white/10 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-10">
              <Star size={120} className="text-yellow-500" />
            </div>
            <h3 className="text-4xl font-black mb-10 flex items-center gap-4 text-white">
               කේන්දර පරීක්ෂාව
            </h3>
            <form onSubmit={handleCalculate} className="space-y-8 relative z-10">
              <div className="grid grid-cols-1 gap-8">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-500 uppercase tracking-widest ml-1">Full Name (නම)</label>
                  <div className="relative">
                    <User className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-500" size={22} />
                    <input
                      type="text"
                      placeholder="ඔබේ නම ඇතුළත් කරන්න"
                      className="w-full bg-white/5 border border-white/10 rounded-2xl py-5 pl-14 pr-6 focus:ring-2 focus:ring-yellow-500 focus:bg-white/10 outline-none transition-all text-white text-lg"
                      value={birthInfo.name}
                      onChange={(e) => setBirthInfo({...birthInfo, name: e.target.value})}
                      required
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-500 uppercase tracking-widest ml-1">Birth Date (උපන් දිනය)</label>
                    <div className="relative">
                      <Calendar className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-500" size={22} />
                      <input
                        type="date"
                        className="w-full bg-white/5 border border-white/10 rounded-2xl py-5 pl-14 pr-6 focus:ring-2 focus:ring-yellow-500 outline-none transition-all text-white"
                        value={birthInfo.birthDate}
                        onChange={(e) => setBirthInfo({...birthInfo, birthDate: e.target.value})}
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-500 uppercase tracking-widest ml-1">Birth Time (වේලාව)</label>
                    <div className="relative">
                      <Clock className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-500" size={22} />
                      <input
                        type="time"
                        className="w-full bg-white/5 border border-white/10 rounded-2xl py-5 pl-14 pr-6 focus:ring-2 focus:ring-yellow-500 outline-none transition-all text-white"
                        value={birthInfo.birthTime}
                        onChange={(e) => setBirthInfo({...birthInfo, birthTime: e.target.value})}
                        required
                      />
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-500 uppercase tracking-widest ml-1">Birth Place (ස්ථානය)</label>
                  <div className="relative">
                    <MapPin className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-500" size={22} />
                    <input
                      type="text"
                      placeholder="උපන් නගරය හෝ ගම"
                      className="w-full bg-white/5 border border-white/10 rounded-2xl py-5 pl-14 pr-6 focus:ring-2 focus:ring-yellow-500 outline-none transition-all text-white text-lg"
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
                className="w-full py-6 bg-gradient-to-r from-yellow-700 to-yellow-500 text-black font-black text-xl rounded-2xl transition-all shadow-2xl shadow-yellow-500/10 hover:shadow-yellow-500/40 disabled:opacity-50"
              >
                {loading ? "ගණනය කරමින්..." : "කේන්දරය පරීක්ෂා කරන්න"}
              </button>
            </form>
          </div>

          <div className="min-h-[500px]">
            {reading ? (
              <div className="animate-in fade-in slide-in-from-bottom-10 duration-700 space-y-8">
                <div className="card-glass p-10 rounded-[2.5rem] border border-yellow-500/30 bg-yellow-500/5 shadow-2xl">
                  <div className="flex items-center justify-between mb-8">
                    <div>
                      <h4 className="text-5xl font-black text-yellow-500">{reading.lagna} ලග්නය</h4>
                      <p className="text-gray-500 mt-2 font-bold tracking-widest uppercase">Birth Chart Analysis</p>
                    </div>
                    <div className="px-6 py-2 bg-yellow-500 text-black text-sm font-black rounded-full shadow-lg">ප්‍රධාන පලාඵල</div>
                  </div>
                  
                  <p className="text-gray-200 leading-relaxed text-xl mb-10 border-b border-white/5 pb-10">{reading.summary}</p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {[
                      { label: "සෞඛ්‍යය", val: reading.predictions.health, icon: <Sun size={20} /> },
                      { label: "ධනය", val: reading.predictions.wealth, icon: <Star size={20} /> },
                      { label: "වෘත්තිය", val: reading.predictions.career, icon: <ChevronRight size={20} /> },
                      { label: "ආදරය", val: reading.predictions.love, icon: <Moon size={20} /> }
                    ].map((item, i) => (
                      <div key={i} className="p-6 bg-white/5 rounded-3xl border border-white/5 hover:bg-white/10 transition-colors">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="text-yellow-500">{item.icon}</div>
                          <h5 className="text-yellow-500 font-black uppercase text-xs tracking-widest">{item.label}</h5>
                        </div>
                        <p className="text-gray-300 text-base leading-relaxed">{item.val}</p>
                      </div>
                    ))}
                  </div>

                  <div className="mt-12 pt-8 border-t border-white/5 flex flex-wrap justify-between items-center gap-8">
                    <div>
                      <span className="text-gray-500 text-xs uppercase block mb-3 font-black tracking-tighter">ජය අංක (Lucky Numbers)</span>
                      <div className="flex gap-3">
                        {reading.luckyNumbers.map(n => (
                          <span key={n} className="w-12 h-12 rounded-2xl bg-yellow-500/10 border border-yellow-500/40 flex items-center justify-center text-yellow-500 font-black text-xl">{n}</span>
                        ))}
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-gray-500 text-xs uppercase block mb-2 font-black tracking-tighter">ජය වර්ණය (Lucky Color)</span>
                      <span className="text-2xl text-white font-black">{reading.luckyColor}</span>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-center p-16 card-glass rounded-[2.5rem] border border-dashed border-white/10">
                <div className="w-32 h-32 bg-white/5 rounded-full flex items-center justify-center mb-8 animate-pulse">
                  <Sparkles size={64} className="text-yellow-500/40" />
                </div>
                <h4 className="text-2xl font-black text-gray-400 mb-4">ඔබේ ජීවිත ගමන මෙතැනින් බලන්න</h4>
                <p className="text-gray-500 text-lg">ප්‍රවීණ ජ්‍යොතිර්වේදියෙකුගේ විශ්ලේෂණයක් හා සමාන පූර්ණ පලාඵල විස්තරයක් ඔබට මෙහිදී ලැබෙනු ඇත.</p>
              </div>
            )}
          </div>
        </section>

        {/* Zodiac Grid */}
        <section id="zodiac" className="space-y-16">
          <div className="text-center">
            <span className="text-yellow-500 font-bold tracking-widest uppercase text-sm">Zodiac Signs</span>
            <h3 className="text-5xl font-black mt-2">රාශි චක්‍රය</h3>
            <p className="text-gray-400 mt-4 max-w-2xl mx-auto">ඔබේ උපන් මාසය අනුව ඔබ අයත් වන රාශිය මෙතැනින් හඳුනාගන්න.</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {zodiacSigns.map((z, i) => (
              <div key={i} className="card-glass p-8 rounded-3xl text-center group hover-glow transition-all">
                <div className="text-5xl mb-4 group-hover:scale-125 transition-transform duration-500 inline-block">{z.icon}</div>
                <h4 className="text-xl font-bold text-yellow-500 mb-1">{z.name}</h4>
                <p className="text-[10px] text-gray-500 uppercase font-black tracking-tighter">{z.range}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Testimonials */}
        <section className="space-y-16 py-10">
          <div className="text-center">
            <h3 className="text-4xl font-bold">පාරිභෝගික අදහස්</h3>
            <div className="w-24 h-1 bg-yellow-600 mx-auto mt-4 rounded-full"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: "සුනිල් පෙරේරා", text: "සූර්යා ජ්‍යොතිෂය මගින් ලබා දුන් පලාඵල ඉතාමත් නිවැරදියි. මගේ ව්‍යාපාරික කටයුතු සාර්ථක කර ගැනීමට එය ලොකු පිටුවහලක් වුණා.", location: "නුගේගොඩ" },
              { name: "කමලා විජේසිංහ", text: "මගේ දුවගේ විවාහ කටයුතු සඳහා පොරොන්දම් පරීක්ෂාව ඉතා හොඳින් සිදු කර දුන්නා. අද ඇය සතුටින් පවුල් ජීවිතය ගත කරනවා.", location: "මහනුවර" },
              { name: "චමිත් බණ්ඩාර", text: "ඉතාම කෙටි කාලයකින් මගේ කේන්දරය පරීක්ෂා කර පලාඵල ලබා දුන්නා. ඉතා විශ්වසනීය සේවාවක්.", location: "ගාල්ල" }
            ].map((t, idx) => (
              <div key={idx} className="card-glass p-8 rounded-3xl relative">
                <Quote className="text-yellow-600/20 absolute top-6 right-6" size={48} />
                <p className="text-gray-300 mb-8 italic text-lg leading-relaxed">"{t.text}"</p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-yellow-600/30 rounded-full flex items-center justify-center font-bold text-yellow-500">
                    {t.name[0]}
                  </div>
                  <div>
                    <h5 className="font-bold">{t.name}</h5>
                    <p className="text-xs text-gray-500 uppercase font-bold tracking-widest">{t.location}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA Banner */}
        <section className="bg-gradient-to-r from-yellow-700/20 to-yellow-500/20 border border-yellow-500/20 p-12 md:p-20 rounded-[3rem] text-center relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-30"></div>
          <div className="relative z-10">
            <h3 className="text-4xl md:text-5xl font-black mb-8 leading-tight">ඔබේ සුබ අනාගතයට අදම අඩිතාලම දමන්න</h3>
            <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">දක්ෂ පාරම්පරික ජ්‍යොතිර්වේදීන්ගේ මගපෙන්වීම යටතේ ඔබේ ජීවිතය සාර්ථක කරගන්න.</p>
            <button className="bg-yellow-600 hover:bg-yellow-500 text-black px-12 py-5 rounded-full font-black text-xl transition-all shadow-xl">සජීවීව සම්බන්ධ වන්න</button>
          </div>
        </section>

      </main>

      {/* Footer */}
      <footer className="mt-32 border-t border-white/5 py-20 px-6 bg-black/60 backdrop-blur-3xl">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <Sun className="text-yellow-500" size={32} />
              <span className="text-2xl font-black gold-glow text-yellow-500">සූර්යා ජ්‍යොතිෂය</span>
            </div>
            <p className="text-gray-500 leading-relaxed">
              ශ්‍රී ලංකාවේ විශ්වසනීයම සහ පැරණිතම ජ්‍යොතිෂ සේවාව. ඔබේ අනාගතය තරු පෙන්වන මාවතේ ජයගන්න.
            </p>
          </div>
          <div>
            <h5 className="text-white font-black mb-6 uppercase text-sm tracking-widest">ප්‍රධාන සේවා</h5>
            <ul className="space-y-4 text-gray-500">
              <li><a href="#" className="hover:text-yellow-500 transition-colors">කේන්දර පරීක්ෂාව</a></li>
              <li><a href="#" className="hover:text-yellow-500 transition-colors">පොරොන්දම් පරීක්ෂාව</a></li>
              <li><a href="#" className="hover:text-yellow-500 transition-colors">වස්තු විද්‍යාව</a></li>
              <li><a href="#" className="hover:text-yellow-500 transition-colors">සුබ නැකැත්</a></li>
            </ul>
          </div>
          <div>
            <h5 className="text-white font-black mb-6 uppercase text-sm tracking-widest">වැදගත් පිටු</h5>
            <ul className="space-y-4 text-gray-500">
              <li><a href="#" className="hover:text-yellow-500 transition-colors">අප ගැන</a></li>
              <li><a href="#" className="hover:text-yellow-500 transition-colors">සම්බන්ධතා</a></li>
              <li><a href="#" className="hover:text-yellow-500 transition-colors">පුවත්පත් අතිරේක</a></li>
              <li><a href="#" className="hover:text-yellow-500 transition-colors">ප්‍රතිපත්ති</a></li>
            </ul>
          </div>
          <div>
            <h5 className="text-white font-black mb-6 uppercase text-sm tracking-widest">සම්බන්ධ වන්න</h5>
            <div className="space-y-4 text-gray-500">
              <p>නො. 45, විහාර මාවත, කොළඹ 07.</p>
              <p>දුරකථන: +94 11 234 5678</p>
              <div className="flex gap-6 pt-4">
                <a href="#" className="hover:text-yellow-500"><Users size={24} /></a>
                <a href="#" className="hover:text-yellow-500"><Users size={24} /></a>
                <a href="#" className="hover:text-yellow-500"><Users size={24} /></a>
              </div>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto border-t border-white/5 mt-20 pt-10 text-center text-gray-600 text-sm">
          © {new Date().getFullYear()} සූර්යා ජ්‍යොතිෂය. සියලුම හිමිකම් ඇවිරිණි. | මෘදුකාංග නිර්මාණය Gemini AI මගිනි.
        </div>
      </footer>
    </div>
  );
};

export default App;