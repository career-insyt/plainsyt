import React from 'react';

interface ImageGraphicProps {
  type: 'drone' | 'lab' | 'solar' | 'floating' | 'biotech' | 'sensor' | 'water' | 'fisheries';
  title?: string;
  className?: string;
  aspect?: '16/9' | '4/3' | '1/1' | '9/16';
}

export const ImageGraphic: React.FC<ImageGraphicProps> = ({
  type,
  title,
  className = '',
  aspect = '16/9',
}) => {
  const aspectClass =
    aspect === '16/9'
      ? 'aspect-[16/9]'
      : aspect === '4/3'
      ? 'aspect-[4/3]'
      : aspect === '9/16'
      ? 'aspect-[9/16]'
      : 'aspect-square';

  // Render distinctive, crafted SVG vector scenes for each category
  return (
    <div
      className={`relative w-full overflow-hidden bg-stone-900 select-none ${aspectClass} ${className}`}
      aria-label={title || 'কৃষি প্রযুক্তি চিত্র'}
      role="img"
    >
      {type === 'drone' && (
        <div className="absolute inset-0 bg-gradient-to-br from-[#04301F] via-[#09472E] to-[#0F5E3E] flex items-center justify-center">
          {/* Subtle paddy field contours */}
          <svg className="absolute inset-0 w-full h-full opacity-35" viewBox="0 0 600 340" preserveAspectRatio="none">
            <path d="M0,180 Q150,140 300,190 T600,160 L600,340 L0,340 Z" fill="#064E3B" />
            <path d="M0,230 Q200,190 400,240 T600,210 L600,340 L0,340 Z" fill="#047857" opacity="0.6" />
            <path d="M0,280 Q250,250 500,290 L600,340 L0,340 Z" fill="#059669" opacity="0.7" />
            {/* Field rows */}
            <line x1="100" y1="200" x2="160" y2="340" stroke="#6EE7B7" strokeWidth="1" strokeDasharray="4 4" opacity="0.4" />
            <line x1="220" y1="200" x2="310" y2="340" stroke="#6EE7B7" strokeWidth="1" strokeDasharray="4 4" opacity="0.4" />
            <line x1="360" y1="200" x2="480" y2="340" stroke="#6EE7B7" strokeWidth="1" strokeDasharray="4 4" opacity="0.4" />
          </svg>

          {/* Central drone iconographic motif */}
          <div className="relative z-10 flex flex-col items-center text-emerald-100">
            <div className="p-3.5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 shadow-lg text-emerald-300 mb-2">
              <svg className="w-10 h-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
                <path d="M12 12m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" />
                <path d="M4 8l5 2.5" />
                <path d="M20 8l-5 2.5" />
                <path d="M4 16l5 -2.5" />
                <path d="M20 16l-5 -2.5" />
                <circle cx="4" cy="8" r="2.5" fill="currentColor" fillOpacity="0.2" />
                <circle cx="20" cy="8" r="2.5" fill="currentColor" fillOpacity="0.2" />
                <circle cx="4" cy="16" r="2.5" fill="currentColor" fillOpacity="0.2" />
                <circle cx="20" cy="16" r="2.5" fill="currentColor" fillOpacity="0.2" />
                <path d="M12 9v-3" strokeDasharray="2 2" />
                <circle cx="12" cy="5" r="1" fill="currentColor" />
              </svg>
            </div>
            <span className="text-xs font-medium tracking-wide uppercase text-emerald-200/90 font-mono">
              AI Precision Drone · NDVI 2026
            </span>
          </div>

          <div className="absolute bottom-3 left-4 right-4 z-10 flex items-center justify-between text-[11px] text-emerald-100/80 border-t border-emerald-500/20 pt-2 font-mono">
            <span>কভারেজ: ৩ বিঘা/১৫ মিনিট</span>
            <span>বালাইনাশক সাশ্রয়: ৬০%</span>
          </div>
        </div>
      )}

      {type === 'solar' && (
        <div className="absolute inset-0 bg-gradient-to-br from-[#854D0E] via-[#A16207] to-[#713F12] flex items-center justify-center">
          <svg className="absolute inset-0 w-full h-full opacity-25" viewBox="0 0 600 340">
            {/* Solar panel grid lines */}
            <polygon points="120,80 480,80 540,240 60,240" fill="none" stroke="#FDE047" strokeWidth="1.5" />
            <line x1="240" y1="80" x2="220" y2="240" stroke="#FDE047" strokeWidth="1" />
            <line x1="360" y1="80" x2="380" y2="240" stroke="#FDE047" strokeWidth="1" />
            <line x1="85" y1="130" x2="515" y2="130" stroke="#FDE047" strokeWidth="1" />
            <line x1="72" y1="185" x2="528" y2="185" stroke="#FDE047" strokeWidth="1" />
          </svg>

          <div className="relative z-10 flex flex-col items-center text-amber-100">
            <div className="p-3.5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 shadow-lg text-amber-300 mb-2">
              <svg className="w-10 h-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
                <circle cx="12" cy="12" r="4" />
                <path d="M12 2v2" />
                <path d="M12 20v2" />
                <path d="M4.93 4.93l1.41 1.41" />
                <path d="M17.66 17.66l1.41 1.41" />
                <path d="M2 12h2" />
                <path d="M20 12h2" />
                <path d="M6.34 17.66l-1.41 1.41" />
                <path d="M19.07 4.93l-1.41 1.41" />
              </svg>
            </div>
            <span className="text-xs font-medium tracking-wide uppercase text-amber-200 font-mono">
              Solar Climate Control · Pabna
            </span>
          </div>

          <div className="absolute bottom-3 left-4 right-4 z-10 flex items-center justify-between text-[11px] text-amber-100/80 border-t border-amber-500/20 pt-2 font-mono">
            <span>স্টোরেজ মেয়াদ: ৮ মাস</span>
            <span>পচন রোধ: ৮৫%</span>
          </div>
        </div>
      )}

      {type === 'floating' && (
        <div className="absolute inset-0 bg-gradient-to-br from-[#0F766E] via-[#047857] to-[#064E3B] flex items-center justify-center">
          <svg className="absolute inset-0 w-full h-full opacity-30" viewBox="0 0 600 340">
            {/* Water waves */}
            <path d="M0,200 C150,180 250,220 400,195 C500,180 550,210 600,200 L600,340 L0,340 Z" fill="#0D9488" />
            <path d="M0,240 C120,225 280,260 420,235 C520,220 570,250 600,245 L600,340 L0,340 Z" fill="#0F766E" />
            {/* Raft outlines */}
            <rect x="180" y="140" width="240" height="40" rx="10" fill="#14532D" stroke="#A7F3D0" strokeWidth="1.5" />
          </svg>

          <div className="relative z-10 flex flex-col items-center text-teal-100">
            <div className="p-3.5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 shadow-lg text-teal-300 mb-2">
              <svg className="w-10 h-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
                <path d="M12 2a10 10 0 0 0-7.07 17.07l.07 .07a10 10 0 0 0 14 0l.07 -.07a10 10 0 0 0 -7.07 -17.07z" />
                <path d="M12 6v6l4 2" />
                <path d="M8 14c1.5-1 3.5-1 5 0s3.5 1 5 0" />
              </svg>
            </div>
            <span className="text-xs font-medium tracking-wide uppercase text-teal-200 font-mono">
              GIAHS Floating Bed · IoT Sensor
            </span>
          </div>

          <div className="absolute bottom-3 left-4 right-4 z-10 flex items-center justify-between text-[11px] text-teal-100/80 border-t border-teal-500/20 pt-2 font-mono">
            <span>শতভাগ অর্গানিক উৎপাদন</span>
            <span>চারা ফলন: +২৫%</span>
          </div>
        </div>
      )}

      {type === 'lab' && (
        <div className="absolute inset-0 bg-gradient-to-br from-[#1E293B] via-[#0F172A] to-[#042F2E] flex items-center justify-center">
          <svg className="absolute inset-0 w-full h-full opacity-25" viewBox="0 0 600 340">
            {/* DNA double helix */}
            <path d="M150,60 Q225,120 300,60 T450,60" fill="none" stroke="#2DD4BF" strokeWidth="2" />
            <path d="M150,120 Q225,60 300,120 T450,120" fill="none" stroke="#60A5FA" strokeWidth="2" />
            <line x1="225" y1="90" x2="225" y2="90" stroke="#F43F5E" strokeWidth="4" />
            <line x1="375" y1="90" x2="375" y2="90" stroke="#FBBF24" strokeWidth="4" />
          </svg>

          <div className="relative z-10 flex flex-col items-center text-slate-100">
            <div className="p-3.5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 shadow-lg text-cyan-300 mb-2">
              <svg className="w-10 h-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
                <path d="M9 3v4m6-4v4" />
                <path d="M6 7h12" />
                <path d="M9 11v8a3 3 0 0 0 6 0v-8" />
                <path d="M9 15h6" />
              </svg>
            </div>
            <span className="text-xs font-medium tracking-wide uppercase text-cyan-200 font-mono">
              Genomic Rice Research · BRRI
            </span>
          </div>

          <div className="absolute bottom-3 left-4 right-4 z-10 flex items-center justify-between text-[11px] text-slate-200/80 border-t border-slate-700 pt-2 font-mono">
            <span>জীবনকাল: ১৪২ দিন</span>
            <span>জিংক: ২৫.৫ মি.গ্রা./কেজি</span>
          </div>
        </div>
      )}

      {type === 'biotech' && (
        <div className="absolute inset-0 bg-gradient-to-br from-[#3B0764] via-[#4C1D95] to-[#1E1B4B] flex items-center justify-center">
          <div className="relative z-10 flex flex-col items-center text-purple-100">
            <div className="p-3.5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 shadow-lg text-purple-300 mb-2">
              <svg className="w-10 h-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
                <path d="M12 21a9 9 0 0 0 9 -9c0 -4.97 -4.03 -9 -9 -9s-9 4.03 -9 9a9 9 0 0 0 9 9z" />
                <path d="M9 10h.01" />
                <path d="M15 10h.01" />
                <path d="M9.5 15a3.5 3.5 0 0 0 5 0" />
              </svg>
            </div>
            <span className="text-xs font-medium tracking-wide uppercase text-purple-200 font-mono">
              Black Bengal Goat Genetics · BAU
            </span>
          </div>

          <div className="absolute bottom-3 left-4 right-4 z-10 flex items-center justify-between text-[11px] text-purple-200/80 border-t border-purple-500/20 pt-2 font-mono">
            <span>ডিএনএ মার্কার ট্র্যাকিং</span>
            <span>ওজন বৃদ্ধি: +১৮%</span>
          </div>
        </div>
      )}

      {type === 'sensor' && (
        <div className="absolute inset-0 bg-gradient-to-br from-[#04301F] via-[#0D5E3A] to-[#15803D] flex items-center justify-center">
          <div className="relative z-10 flex flex-col items-center text-teal-100">
            <div className="p-3.5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 shadow-lg text-teal-300 mb-2">
              <svg className="w-10 h-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
                <rect x="5" y="2" width="14" height="20" rx="3" />
                <line x1="12" y1="18" x2="12" y2="18.01" strokeWidth="2" />
                <path d="M9 7h6" />
                <path d="M9 11h6" />
              </svg>
            </div>
            <span className="text-xs font-medium tracking-wide uppercase text-teal-200 font-mono">
              Krishi-Setu AI · Mobile Diagnostic
            </span>
          </div>

          <div className="absolute bottom-3 left-4 right-4 z-10 flex items-center justify-between text-[11px] text-teal-200/80 border-t border-teal-500/20 pt-2 font-mono">
            <span>শনাক্তকরণ সময়: ৩ সেকেন্ড</span>
            <span>সঠিকতা: ৯৪.২%</span>
          </div>
        </div>
      )}

      {type === 'water' && (
        <div className="absolute inset-0 bg-gradient-to-br from-[#0369A1] via-[#0284C7] to-[#075985] flex items-center justify-center">
          <div className="relative z-10 flex flex-col items-center text-sky-100">
            <div className="p-3.5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 shadow-lg text-sky-300 mb-2">
              <svg className="w-10 h-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
                <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
              </svg>
            </div>
            <span className="text-xs font-medium tracking-wide uppercase text-sky-200 font-mono">
              Precision Drip Irrigation · Teesta
            </span>
          </div>

          <div className="absolute bottom-3 left-4 right-4 z-10 flex items-center justify-between text-[11px] text-sky-200/80 border-t border-sky-400/20 pt-2 font-mono">
            <span>পানির সাশ্রয়: ৬০%</span>
            <span>ফার্টিগেশন দক্ষতা দ্বিগুণ</span>
          </div>
        </div>
      )}

      {type === 'fisheries' && (
        <div className="absolute inset-0 bg-gradient-to-br from-[#1E3A8A] via-[#1D4ED8] to-[#172554] flex items-center justify-center">
          <div className="relative z-10 flex flex-col items-center text-blue-100">
            <div className="p-3.5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 shadow-lg text-blue-300 mb-2">
              <svg className="w-10 h-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
                <path d="M2 16h20M2 12h20M2 20h20" strokeDasharray="3 3" opacity="0.3" />
                <path d="M18 10c-3 0-5 2-8 2s-4-2-7-2" />
                <circle cx="18" cy="8" r="1.5" fill="currentColor" />
              </svg>
            </div>
            <span className="text-xs font-medium tracking-wide uppercase text-blue-200 font-mono">
              Biofloc & IoT Shrimp · Khulna
            </span>
          </div>

          <div className="absolute bottom-3 left-4 right-4 z-10 flex items-center justify-between text-[11px] text-blue-200/80 border-t border-blue-400/20 pt-2 font-mono">
            <span>পোনা বেঁচে থাকার হার: ৮০%+</span>
            <span>অ্যামোনিয়া ট্র্যাকিং ২৪/৭</span>
          </div>
        </div>
      )}

      {/* Subtle top glare reflection */}
      <div className="absolute inset-x-0 top-0 h-1/3 bg-gradient-to-b from-white/15 to-transparent pointer-events-none" />
    </div>
  );
};
