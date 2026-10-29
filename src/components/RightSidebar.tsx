import React, { useState } from 'react';
import {
  TrendingUp,
  Microscope,
  UserCheck,
  UserPlus,
  Mail,
  CheckCircle2,
  ExternalLink,
  CloudSun,
  ArrowUpRight,
  ArrowDownRight,
  Minus,
} from 'lucide-react';
import { ResearchPaper, FeaturedScientist, MarketCommodity } from '../types/index.ts';
import { toBengaliNumerals } from '../utils/pureLogic.ts';
import { TRENDING_TAGS } from '../data/mockData.ts';

interface RightSidebarProps {
  researchPapers: ResearchPaper[];
  scientists: FeaturedScientist[];
  marketData: MarketCommodity[];
  onOpenResearch: (paper: ResearchPaper) => void;
  onSelectTag: (tag: string) => void;
}

export const RightSidebar: React.FC<RightSidebarProps> = ({
  researchPapers,
  scientists: initialScientists,
  marketData,
  onOpenResearch,
  onSelectTag,
}) => {
  const [scientists, setScientists] = useState<FeaturedScientist[]>(initialScientists);
  const [emailInput, setEmailInput] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const toggleFollow = (id: string) => {
    setScientists((prev) =>
      prev.map((s) => (s.id === id ? { ...s, isFollowing: !s.isFollowing } : s))
    );
  };

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (emailInput.trim()) {
      setSubscribed(true);
      setEmailInput('');
    }
  };

  const featuredPaper = researchPapers[0];

  return (
    <aside className="w-72 xl:w-80 shrink-0 py-4 hidden xl:block sticky top-16 h-[calc(100vh-4rem)] overflow-y-auto scrollbar-none pl-2">
      <div className="space-y-4">
        
        {/* 1. Trending Topics */}
        <div className="bg-white border-2 border-[#04301F]/15 rounded-xl p-4 shadow-tactile-xs">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-1.5 text-xs font-bold text-[#04301F] uppercase font-mono tracking-wider">
              <TrendingUp className="w-4 h-4 text-[#04301F]" />
              <span>আজকের শীর্ষ ট্রেন্ডিং</span>
            </div>
            <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 bg-[#04301F] text-[#FDFAF4] rounded">
              LIVE
            </span>
          </div>

          <div className="space-y-2">
            {TRENDING_TAGS.map((item, idx) => (
              <button
                key={item.tag}
                type="button"
                onClick={() => onSelectTag(item.tag)}
                className="w-full text-left group flex items-start justify-between py-1.5 px-2 rounded-lg hover:bg-[#FDFAF5] border border-transparent hover:border-[#04301F]/20 transition-all cursor-pointer"
              >
                <div className="flex items-start gap-2">
                  <span className="text-xs font-mono font-bold text-[#04301F] group-hover:text-emerald-700 mt-0.5">
                    {toBengaliNumerals(idx + 1)}.
                  </span>
                  <div>
                    <p className="text-xs font-bold text-[#04301F] group-hover:text-[#09472e] transition-colors leading-snug">
                      #{item.tag}
                    </p>
                    <p className="text-[11px] text-[#04301F]/60 font-mono">{item.count}</p>
                  </div>
                </div>
                <span className="text-[10px] font-medium text-[#04301F] bg-[#F5F1E8] px-2 py-0.5 rounded border border-[#04301F]/10">
                  {item.topic}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* 2. Research Explained Simply */}
        {featuredPaper && (
          <div className="bg-[#FDFAF5] border-2 border-[#04301F] rounded-xl p-4 shadow-tactile-sm">
            <div className="flex items-center justify-between mb-2.5">
              <div className="flex items-center gap-1.5 text-xs font-bold text-[#04301F] font-mono uppercase tracking-wider">
                <Microscope className="w-4 h-4 text-[#04301F]" />
                <span>গবেষণা সহজ ভাষায়</span>
              </div>
              <span className="text-[10px] font-bold font-mono px-2 py-0.5 bg-[#04301F] text-[#FDFAF4] rounded shadow-xs">
                {featuredPaper.institutionCode}
              </span>
            </div>

            <h4 className="text-xs font-bold text-[#04301F] leading-snug mb-2 font-editorial">
              {featuredPaper.title}
            </h4>
            <p className="text-[11px] text-[#04301F]/80 line-clamp-3 leading-relaxed mb-3 font-medium">
              {featuredPaper.summary}
            </p>

            <div className="p-2.5 bg-white border border-[#04301F]/20 rounded-lg mb-3 shadow-xs">
              <span className="text-[10px] font-bold text-[#04301F] font-mono uppercase block mb-0.5">
                মাঠের প্রভাব:
              </span>
              <p className="text-[11px] text-emerald-900 font-semibold leading-tight">
                {featuredPaper.practicalImpact}
              </p>
            </div>

            <button
              type="button"
              onClick={() => onOpenResearch(featuredPaper)}
              className="w-full flex items-center justify-center gap-1.5 py-2 text-xs font-bold text-[#FDFAF4] bg-[#04301F] hover:bg-[#09472e] rounded-lg transition-all shadow-tactile-xs hover:shadow-tactile hover:-translate-y-0.5 cursor-pointer"
            >
              <span>গবেষণা বিশ্লেষণ পড়ুন</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        {/* 3. Live Agri-Market & Weather Bulletin */}
        <div className="bg-white border-2 border-[#04301F]/15 rounded-xl p-4 shadow-tactile-xs">
          <div className="flex items-center justify-between mb-2.5">
            <div className="flex items-center gap-1.5 text-xs font-bold text-[#04301F] uppercase font-mono tracking-wider">
              <CloudSun className="w-4 h-4 text-amber-600" />
              <span>কৃষি বাজারদর ও আবহাওয়া</span>
            </div>
            <span className="text-[10px] font-mono text-[#04301F]/60">দৈনিক পাইকারি</span>
          </div>

          <div className="space-y-2 mb-3 divide-y divide-[#04301F]/10">
            {marketData.map((item) => (
              <div key={item.id} className="pt-2 first:pt-0 flex items-center justify-between text-xs">
                <div>
                  <span className="font-bold text-[#04301F] block leading-tight">{item.name}</span>
                  <span className="text-[10px] text-[#04301F]/60 font-mono">{item.market}</span>
                </div>
                <div className="text-right">
                  <span className="font-mono font-bold text-[#04301F] tabular-nums">
                    ৳{toBengaliNumerals(item.pricePerKg.toFixed(1))}/কেজি
                  </span>
                  <div className="flex items-center justify-end gap-0.5 text-[10px] font-mono font-bold">
                    {item.trend === 'up' && (
                      <span className="text-emerald-700 flex items-center">
                        <ArrowUpRight className="w-3 h-3" />
                        +{toBengaliNumerals(item.priceChange)}%
                      </span>
                    )}
                    {item.trend === 'down' && (
                      <span className="text-rose-700 flex items-center">
                        <ArrowDownRight className="w-3 h-3" />
                        {toBengaliNumerals(item.priceChange)}%
                      </span>
                    )}
                    {item.trend === 'stable' && (
                      <span className="text-[#04301F]/50 flex items-center">
                        <Minus className="w-3 h-3" /> অপরিবর্তিত
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="p-2.5 bg-amber-50 border-2 border-amber-300 rounded-lg text-[11px] text-amber-950 leading-snug font-medium">
            🌧️ <span className="font-bold">পূর্বাভাস:</span> আগামী ৪৮ ঘণ্টায় রংপুর ও সিলেটে মাঝারি বৃষ্টিপাত হতে পারে; বোরো বীজতলায় নিষ্কাশন নিশ্চিত করুন।
          </div>
        </div>

        {/* 4. Featured Scientists & Agripreneurs */}
        <div className="bg-white border-2 border-[#04301F]/15 rounded-xl p-4 shadow-tactile-xs">
          <div className="mb-2.5">
            <span className="text-xs font-bold text-[#04301F] block uppercase font-mono tracking-wider">
              মাঠের উদ্ভাবক ও বিজ্ঞানী
            </span>
            <span className="text-[10px] text-[#04301F]/60 font-mono">অনুসরণ করুন নতুন গবেষণার জন্য</span>
          </div>

          <div className="space-y-3">
            {scientists.slice(0, 3).map((sci) => (
              <div key={sci.id} className="flex items-start justify-between gap-2">
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-bold text-[#04301F] truncate">{sci.name}</p>
                  <p className="text-[10px] text-[#04301F]/70 truncate font-mono">{sci.organization}</p>
                  <p className="text-[10px] text-emerald-800 font-semibold truncate">{sci.focusArea}</p>
                </div>
                <button
                  type="button"
                  onClick={() => toggleFollow(sci.id)}
                  className={`px-2.5 py-1 text-[11px] font-bold rounded-lg transition-all shrink-0 flex items-center gap-1 cursor-pointer ${
                    sci.isFollowing
                      ? 'bg-[#F5F1E8] text-[#04301F] border border-[#04301F]/20'
                      : 'bg-[#04301F] text-[#FDFAF4] hover:bg-[#09472e] shadow-tactile-xs'
                  }`}
                  aria-label={`${sci.name} কে ${sci.isFollowing ? 'আনফলো' : 'ফলো'} করুন`}
                >
                  {sci.isFollowing ? (
                    <>
                      <UserCheck className="w-3 h-3 text-[#04301F]" />
                      <span>যুক্ত</span>
                    </>
                  ) : (
                    <>
                      <UserPlus className="w-3 h-3" />
                      <span>ফলো</span>
                    </>
                  )}
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* 5. Plainsyt Weekly Brief Newsletter */}
        <div className="bg-[#04301F] text-[#FDFAF4] rounded-xl p-4 shadow-tactile-sm border-2 border-[#09472E]">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-7 h-7 rounded-lg bg-[#FDFAF4] flex items-center justify-center text-[#04301F] shadow-tactile-xs">
              <Mail className="w-4 h-4 text-[#04301F]" />
            </div>
            <span className="text-xs font-bold text-[#FDFAF4] uppercase font-mono tracking-wider">
              প্লেইনসাইট সাপ্তাহিক ব্রিফ
            </span>
          </div>
          <p className="text-[11px] text-[#C5DDD1] leading-relaxed mb-3.5">
            প্রতি রবিবার সকালে কৃষি প্রযুক্তি, স্টার্টআপ ফান্ডিং ও গবেষণার সারাংশ আপনার ইনবক্সে।
          </p>

          {subscribed ? (
            <div className="flex items-center gap-2 p-2.5 bg-white/10 border border-emerald-400/40 rounded-lg text-emerald-300 text-xs font-medium">
              <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400" />
              <span>ধন্যবাদ! আপনি সফলভাবে যুক্ত হয়েছেন।</span>
            </div>
          ) : (
            <form onSubmit={handleSubscribe} className="space-y-2.5">
              <input
                type="email"
                required
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
                placeholder="আপনার ইমেইল দিন..."
                className="w-full px-3 py-2 text-xs bg-white text-[#04301F] placeholder:text-stone-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-400 font-medium"
              />
              <button
                type="submit"
                className="w-full py-2 text-xs font-bold text-[#04301F] bg-[#FDFAF4] hover:bg-white rounded-lg transition-all shadow-tactile-xs hover:shadow-tactile hover:-translate-y-0.5 cursor-pointer"
              >
                বিনামূল্যে যুক্ত হোন &rarr;
              </button>
            </form>
          )}
        </div>

      </div>
    </aside>
  );
};
