import { useState, useEffect } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform } from 'motion/react';
import { cn } from '@/lib/utils';
import { Wind, Sun, Moon, Package, Heart, X, ArrowLeft } from 'lucide-react';

// --- Types ---
type LifeStage = 'morning' | 'afternoon' | 'dusk';

// --- Constants ---
const THEMES = {
  morning: {
    bg: 'from-blue-50 to-sky-100',
    text: 'text-sky-900',
    accent: 'bg-sky-200',
    label: '清晨 (Morning)',
    quote: '此时，我的生命正值清晨微光。',
  },
  afternoon: {
    bg: 'from-amber-50 to-orange-100',
    text: 'text-amber-900',
    accent: 'bg-amber-200',
    label: '午后 (Afternoon)',
    quote: '此时，我的生命正值午后暖阳。',
  },
  dusk: {
    bg: 'from-indigo-50 to-purple-100',
    text: 'text-indigo-900',
    accent: 'bg-indigo-200',
    label: '黄昏 (Dusk)',
    quote: '此时，我的生命正值静谧黄昏。',
  },
};

// --- Components ---

// 1. Calendar Section
function CalendarSection({ onTear }: { onTear: () => void }) {
  const y = useMotionValue(0);
  const rotate = useTransform(y, [0, 200], [0, 5]);
  const opacity = useTransform(y, [0, 300], [1, 0]);
  const [isTorn, setIsTorn] = useState(false);

  const handleDragEnd = (_: any, info: any) => {
    if (info.offset.y > 150) {
      setIsTorn(true);
      onTear();
    }
  };

  if (isTorn) return null;

  return (
    <motion.div
      style={{ y, rotate, opacity }}
      drag="y"
      dragConstraints={{ top: 0, bottom: 0 }}
      dragElastic={0.7}
      onDragEnd={handleDragEnd}
      exit={{ 
        y: 1000, 
        rotate: 15, 
        opacity: 0, 
        transition: { duration: 0.8, ease: "easeIn" } 
      }}
      className="absolute top-0 left-0 right-0 h-1/2 z-20 cursor-grab active:cursor-grabbing perspective-1000"
    >
      <div className="relative h-full mx-6 mt-6 bg-[#FDFBF7] shadow-2xl flex flex-col items-center justify-center overflow-visible origin-top">
        {/* Paper Texture Overlay */}
        <div className="absolute inset-0 opacity-30 pointer-events-none mix-blend-multiply bg-[url('https://www.transparenttextures.com/patterns/cream-paper.png')]"></div>
        
        {/* Jagged Edge at Bottom */}
        <div className="absolute -bottom-3 left-0 right-0 h-4 w-full overflow-hidden leading-none">
           <svg viewBox="0 0 1200 12" preserveAspectRatio="none" className="w-full h-full text-[#FDFBF7] fill-current drop-shadow-sm">
             <path d="M0,0 L0,12 L10,0 L20,12 L30,0 L40,12 L50,0 L60,12 L70,0 L80,12 L90,0 L100,12 L110,0 L120,12 L130,0 L140,12 L150,0 L160,12 L170,0 L180,12 L190,0 L200,12 L210,0 L220,12 L230,0 L240,12 L250,0 L260,12 L270,0 L280,12 L290,0 L300,12 L310,0 L320,12 L330,0 L340,12 L350,0 L360,12 L370,0 L380,12 L390,0 L400,12 L410,0 L420,12 L430,0 L440,12 L450,0 L460,12 L470,0 L480,12 L490,0 L500,12 L510,0 L520,12 L530,0 L540,12 L550,0 L560,12 L570,0 L580,12 L590,0 L600,12 L610,0 L620,12 L630,0 L640,12 L650,0 L660,12 L670,0 L680,12 L690,0 L700,12 L710,0 L720,12 L730,0 L740,12 L750,0 L760,12 L770,0 L780,12 L790,0 L800,12 L810,0 L820,12 L830,0 L840,12 L850,0 L860,12 L870,0 L880,12 L890,0 L900,12 L910,0 L920,12 L930,0 L940,12 L950,0 L960,12 L970,0 L980,12 L990,0 L1000,12 L1010,0 L1020,12 L1030,0 L1040,12 L1050,0 L1060,12 L1070,0 L1080,12 L1090,0 L1100,12 L1110,0 L1120,12 L1130,0 L1140,12 L1150,0 L1160,12 L1170,0 L1180,12 L1190,0 L1200,12 V0 Z" />
           </svg>
        </div>

        {/* Content */}
        <div className="text-center space-y-4 pointer-events-none select-none z-10">
          <h2 className="text-3xl font-serif text-stone-500 italic tracking-widest">February</h2>
          <h1 className="text-[10rem] leading-none font-serif text-stone-900 font-bold tracking-tighter mix-blend-multiply opacity-90">25</h1>
          <div className="w-12 h-1 bg-stone-300 mx-auto rounded-full" />
          <p className="text-2xl font-serif text-stone-400 uppercase tracking-[0.2em]">Wednesday</p>
        </div>

        <div className="absolute bottom-8 text-stone-400 text-xs tracking-widest uppercase animate-pulse opacity-60">
          Swipe down to tear
        </div>
      </div>
    </motion.div>
  );
}

// 2. Soul Section (Background & Slider)
function SoulSection({ lifeStage, setLifeStage }: { lifeStage: LifeStage, setLifeStage: (s: LifeStage) => void }) {
  const [showSlider, setShowSlider] = useState(false);
  const theme = THEMES[lifeStage];

  return (
    <div className={cn("absolute inset-0 transition-colors duration-1000 bg-gradient-to-b", theme.bg)}>
      <div className="absolute top-1/2 left-0 right-0 -translate-y-1/2 flex flex-col items-center justify-center p-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          onClick={() => setShowSlider(!showSlider)}
          className="cursor-pointer group"
        >
          <p className={cn("text-2xl font-serif italic transition-colors duration-500", theme.text)}>
            {theme.quote}
          </p>
          <p className="text-xs mt-4 opacity-0 group-hover:opacity-50 transition-opacity text-stone-500">
            (点击调整生命状态 / Tap to adjust)
          </p>
        </motion.div>

        <AnimatePresence>
          {showSlider && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-8 w-full max-w-xs"
            >
              <div className="relative h-12 bg-white/30 backdrop-blur-md rounded-full p-1 flex items-center justify-between shadow-inner">
                {/* Slider Track */}
                <div className="absolute inset-x-4 h-1 bg-stone-900/10 rounded-full top-1/2 -translate-y-1/2" />
                
                {/* Knobs (Simplified as clickable zones for prototype) */}
                {(['morning', 'afternoon', 'dusk'] as LifeStage[]).map((stage) => (
                  <button
                    key={stage}
                    onClick={() => setLifeStage(stage)}
                    className={cn(
                      "relative z-10 w-10 h-10 rounded-full flex items-center justify-center transition-all",
                      lifeStage === stage ? "bg-white shadow-md scale-110" : "hover:bg-white/50"
                    )}
                  >
                    {stage === 'morning' && <Wind className="w-4 h-4 text-sky-500" />}
                    {stage === 'afternoon' && <Sun className="w-4 h-4 text-amber-500" />}
                    {stage === 'dusk' && <Moon className="w-4 h-4 text-indigo-500" />}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

// 3. Foundation Section (Confetti & Hidden Entrances)
function FoundationSection({ 
  hasTorn, 
  onOpenResonance, 
  onOpenLuggage 
}: { 
  hasTorn: boolean, 
  onOpenResonance: () => void, 
  onOpenLuggage: () => void 
}) {
  // Confetti Pile
  const confettiCount = hasTorn ? 50 : 0; // Simple representation

  return (
    <div className="absolute bottom-0 left-0 right-0 h-32 z-10 overflow-hidden">
      {/* Swipe Area for Resonance */}
      <motion.div 
        className="absolute inset-0 z-20 cursor-ew-resize"
        drag="x"
        dragConstraints={{ left: -100, right: 0 }}
        onDragEnd={(_, info) => {
          if (info.offset.x < -50) {
            onOpenResonance();
          }
        }}
      >
         {/* Visual Cue for Swipe */}
         <div className="absolute right-4 top-1/2 -translate-y-1/2 opacity-30 animate-pulse">
            <ArrowLeft className="w-6 h-6 text-stone-500" />
         </div>
      </motion.div>

      {/* Confetti Visuals */}
      <div className="absolute bottom-0 w-full h-full flex items-end justify-center px-4 pointer-events-none overflow-hidden">
        {hasTorn && Array.from({ length: confettiCount }).map((_, i) => (
          <motion.div
            key={i}
            initial={{ y: -600, rotate: 0, opacity: 0, scale: 0.5 }}
            animate={{ 
              y: 0, 
              rotate: Math.random() * 360, 
              opacity: 1,
              scale: 1,
              x: (Math.random() - 0.5) * 300
            }}
            transition={{ 
              duration: 2.5, 
              delay: Math.random() * 0.8,
              type: "spring",
              damping: 12,
              stiffness: 50
            }}
            className="absolute bottom-0 bg-[#FDFBF7] shadow-sm border border-stone-100"
            style={{
              left: `${50 + (Math.random() - 0.5) * 90}%`,
              bottom: `${Math.random() * 60}px`,
              width: `${10 + Math.random() * 20}px`,
              height: `${10 + Math.random() * 20}px`,
              borderRadius: Math.random() > 0.5 ? '2px' : '50%',
              clipPath: Math.random() > 0.7 ? 'polygon(0 0, 100% 0, 100% 80%, 0 100%)' : 'none'
            }}
          />
        ))}
      </div>

      {/* Hidden Entrance: Luggage List */}
      <motion.button
        onClick={onOpenLuggage}
        initial={{ opacity: 0 }}
        animate={{ opacity: hasTorn ? 0.8 : 0 }}
        whileHover={{ scale: 1.1, opacity: 1 }}
        className="absolute bottom-4 left-1/2 -translate-x-1/2 z-30 p-2 bg-white/40 backdrop-blur-sm rounded-full shadow-sm border border-white/50"
      >
        <Package className="w-5 h-5 text-stone-600" />
      </motion.button>
    </div>
  );
}

// 4. Overlays (Resonance & Luggage)
function ResonanceOverlay({ onClose }: { onClose: () => void }) {
  const messages = [
    "今天虽然很累，但看到晚霞了。",
    "I hope you are treating yourself kindly.",
    "抱抱自己，没关系的。",
    "Life is a long afternoon.",
    "喝了一杯很好喝的咖啡。"
  ];

  return (
    <motion.div
      initial={{ x: '100%' }}
      animate={{ x: 0 }}
      exit={{ x: '100%' }}
      className="fixed inset-0 z-50 bg-stone-900/90 backdrop-blur-md text-white p-6 flex flex-col"
    >
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-xl font-serif italic">共鸣广场 (Resonance)</h2>
        <button onClick={onClose}><X className="w-6 h-6" /></button>
      </div>
      
      <div className="flex-1 overflow-y-auto space-y-6">
        {messages.map((msg, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="p-4 rounded-2xl bg-white/10 border border-white/5 hover:bg-white/20 transition-colors cursor-pointer group"
          >
            <p className="font-serif text-lg opacity-90">{msg}</p>
            <div className="mt-2 flex justify-end opacity-0 group-hover:opacity-100 transition-opacity">
               <Heart className="w-4 h-4 text-pink-400" />
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

function LuggageOverlay({ onClose }: { onClose: () => void }) {
  const items = [
    { title: "全女维修 (All-Female Maintenance)", icon: "🔧" },
    { title: "全女民宿 (All-Female B&B)", icon: "🏠" },
    { title: "死亡分期 (Death Installment)", icon: "🍂" },
  ];

  return (
    <motion.div
      initial={{ y: '100%' }}
      animate={{ y: 0 }}
      exit={{ y: '100%' }}
      className="fixed inset-0 z-50 bg-[#F5F5DC] text-stone-800 p-6 flex flex-col"
    >
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-xl font-serif italic">余晖委托 (Luggage List)</h2>
        <button onClick={onClose}><X className="w-6 h-6" /></button>
      </div>

      <div className="grid gap-4">
        {items.map((item, i) => (
          <motion.div
            key={i}
            whileHover={{ scale: 1.02 }}
            className="p-6 bg-white rounded-xl shadow-sm border border-stone-200 flex items-center gap-4"
          >
            <span className="text-2xl">{item.icon}</span>
            <span className="font-serif text-lg">{item.title}</span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

// --- Main App Component ---
export default function App() {
  const [lifeStage, setLifeStage] = useState<LifeStage>('afternoon');
  const [hasTorn, setHasTorn] = useState(false);
  const [activeOverlay, setActiveOverlay] = useState<'resonance' | 'luggage' | null>(null);

  return (
    <div className="relative w-full h-screen overflow-hidden bg-stone-100 font-sans">
      {/* Middle Layer: Soul (Background) */}
      <SoulSection lifeStage={lifeStage} setLifeStage={setLifeStage} />

      {/* Top Layer: Calendar */}
      <AnimatePresence>
        {!hasTorn && (
          <CalendarSection onTear={() => setHasTorn(true)} />
        )}
      </AnimatePresence>

      {/* Bottom Layer: Foundation */}
      <FoundationSection 
        hasTorn={hasTorn} 
        onOpenResonance={() => setActiveOverlay('resonance')}
        onOpenLuggage={() => setActiveOverlay('luggage')}
      />

      {/* Overlays */}
      <AnimatePresence>
        {activeOverlay === 'resonance' && (
          <ResonanceOverlay onClose={() => setActiveOverlay(null)} />
        )}
        {activeOverlay === 'luggage' && (
          <LuggageOverlay onClose={() => setActiveOverlay(null)} />
        )}
      </AnimatePresence>
    </div>
  );
}
