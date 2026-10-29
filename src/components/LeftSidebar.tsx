import React from 'react';
import {
  Wheat,
  Cpu,
  Microscope,
  Snowflake,
  CloudRain,
  Rocket,
  Fish,
  Bookmark,
  PlaySquare,
  TrendingUp,
  Award,
  ShieldCheck,
  Compass,
  Search,
} from 'lucide-react';
import { ArticleCategory } from '../types/index.ts';
import { toBengaliNumerals } from '../utils/pureLogic.ts';

interface LeftSidebarProps {
  selectedCategory: ArticleCategory;
  onSelectCategory: (category: ArticleCategory) => void;
  savedCount: number;
  onOpenSaved: () => void;
  onScrollToReels: () => void;
  onOpenEditorialPolicy: () => void;
}

export const LeftSidebar: React.FC<LeftSidebarProps> = ({
  selectedCategory,
  onSelectCategory,
  savedCount,
  onOpenSaved,
  onScrollToReels,
  onOpenEditorialPolicy,
}) => {
  const categories: { label: ArticleCategory; icon: React.ReactNode; count: number }[] = [
    { label: 'সকল', icon: <Compass className="w-4 h-4" />, count: 8 },
    { label: 'শস্য ও কৃষিবিজ্ঞান', icon: <Wheat className="w-4 h-4" />, count: 3 },
    { label: 'এগ্রি-টেক ও ড্রোন', icon: <Cpu className="w-4 h-4" />, count: 4 },
    { label: 'গবেষণা সহজ ভাষায়', icon: <Microscope className="w-4 h-4" />, count: 3 },
    { label: 'খাদ্য ও কোল্ড চেইন', icon: <Snowflake className="w-4 h-4" />, count: 2 },
    { label: 'জলবায়ু ও স্থায়িত্ব', icon: <CloudRain className="w-4 h-4" />, count: 3 },
    { label: 'স্টার্টআপ ও উদ্ভাবন', icon: <Rocket className="w-4 h-4" />, count: 2 },
    { label: 'মৎস্য ও প্রাণিসম্পদ', icon: <Fish className="w-4 h-4" />, count: 2 },
  ];

  return (
    <aside className="w-64 xl:w-72 shrink-0 py-4 hidden lg:block sticky top-16 h-[calc(100vh-4rem)] overflow-y-auto scrollbar-none pr-2">
      {/* User profile / Reader info */}
      <div className="p-3 mb-3.5 bg-white border-2 border-[#04301F]/15 rounded-xl shadow-tactile-xs flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-[#04301F] text-[#FDFAF4] font-bold flex items-center justify-center text-sm shadow-tactile-xs">
          <Search className="w-5 h-5 text-emerald-300" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-xs font-bold text-[#04301F] truncate">কৃষি পাঠক ও পর্যবেক্ষক</p>
          <p className="text-[11px] text-[#04301F]/60 truncate font-mono">ঢাকা, বাংলাদেশ · পোর্টাল</p>
        </div>
      </div>

      {/* Main Categories Menu */}
      <div className="mb-4">
        <div className="px-2 mb-2 flex items-center justify-between">
          <span className="text-[11px] font-bold text-[#04301F] uppercase tracking-wider font-mono">
            বিষয়ভিত্তিক অন্বেষণ
          </span>
        </div>
        <nav className="space-y-1" aria-label="বিষয়ভিত্তিক ক্যাটাগরি">
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat.label;
            return (
              <button
                key={cat.label}
                type="button"
                onClick={() => onSelectCategory(cat.label)}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-semibold transition-all text-left ${
                  isSelected
                    ? 'bg-[#04301F] text-[#FDFAF4] shadow-tactile-sm border border-[#04301F]'
                    : 'text-[#04301F]/80 hover:bg-white hover:text-[#04301F] border border-transparent hover:border-[#04301F]/20 hover:shadow-tactile-xs'
                }`}
              >
                <div className="flex items-center gap-2.5 truncate">
                  <span className={isSelected ? 'text-emerald-300' : 'text-[#04301F]/60'}>
                    {cat.icon}
                  </span>
                  <span className="truncate">{cat.label}</span>
                </div>
                <span
                  className={`text-[11px] font-mono tabular-nums px-1.5 py-0.5 rounded font-bold ${
                    isSelected ? 'bg-white/20 text-[#FDFAF4]' : 'bg-[#04301F]/10 text-[#04301F]'
                  }`}
                >
                  {toBengaliNumerals(cat.count)}
                </span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Shortcuts */}
      <div className="mb-4 pt-3 border-t-2 border-[#04301F]/15">
        <div className="px-2 mb-2">
          <span className="text-[11px] font-bold text-[#04301F] uppercase tracking-wider font-mono">
            দ্রুত নেভিগেশন
          </span>
        </div>
        <div className="space-y-1">
          <button
            type="button"
            onClick={onOpenSaved}
            className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-semibold text-[#04301F] hover:bg-white border border-transparent hover:border-[#04301F]/20 hover:shadow-tactile-xs transition-all text-left"
          >
            <div className="flex items-center gap-2.5">
              <Bookmark className="w-4 h-4 text-amber-700" />
              <span>সংরক্ষিত প্রতিবেদন</span>
            </div>
            {savedCount > 0 && (
              <span className="bg-amber-100 text-amber-900 border border-amber-300 text-[10px] font-bold px-1.5 py-0.5 rounded-full tabular-nums">
                {toBengaliNumerals(savedCount)}
              </span>
            )}
          </button>

          <button
            type="button"
            onClick={onScrollToReels}
            className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-semibold text-[#04301F] hover:bg-white border border-transparent hover:border-[#04301F]/20 hover:shadow-tactile-xs transition-all text-left"
          >
            <PlaySquare className="w-4 h-4 text-rose-600" />
            <span>ভিডিও রিলস ও মাঠের চিত্র</span>
          </button>

          <button
            type="button"
            onClick={() => onSelectCategory('শস্য ও কৃষিবিজ্ঞান')}
            className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-semibold text-[#04301F] hover:bg-white border border-transparent hover:border-[#04301F]/20 hover:shadow-tactile-xs transition-all text-left"
          >
            <TrendingUp className="w-4 h-4 text-emerald-700" />
            <span>বাজারদর ও মৌসুম বিশ্লেষণ</span>
          </button>
        </div>
      </div>

      {/* Institutional Network */}
      <div className="mb-4 pt-3 border-t-2 border-[#04301F]/15">
        <div className="px-2 mb-2 flex items-center gap-1.5 text-[11px] font-bold text-[#04301F] uppercase tracking-wider font-mono">
          <Award className="w-3.5 h-3.5 text-emerald-700" />
          <span>গবেষণা সহযোগী নেটওয়ার্ক</span>
        </div>
        <div className="grid grid-cols-2 gap-1.5 px-1">
          <div className="p-2 bg-white border border-[#04301F]/20 rounded-lg text-[11px] text-[#04301F] hover:border-[#04301F] hover:shadow-tactile-xs transition-all">
            <span className="font-bold text-[#04301F] block font-mono">BRRI</span>
            <span className="text-[10px] text-[#04301F]/70 line-clamp-1 font-medium">ধান গবেষণা</span>
          </div>
          <div className="p-2 bg-white border border-[#04301F]/20 rounded-lg text-[11px] text-[#04301F] hover:border-[#04301F] hover:shadow-tactile-xs transition-all">
            <span className="font-bold text-[#04301F] block font-mono">BAU</span>
            <span className="text-[10px] text-[#04301F]/70 line-clamp-1 font-medium">কৃষি বিশ্ববিদ্যালয়</span>
          </div>
          <div className="p-2 bg-white border border-[#04301F]/20 rounded-lg text-[11px] text-[#04301F] hover:border-[#04301F] hover:shadow-tactile-xs transition-all">
            <span className="font-bold text-[#04301F] block font-mono">BARI</span>
            <span className="text-[10px] text-[#04301F]/70 line-clamp-1 font-medium">কৃষি গবেষণা</span>
          </div>
          <div className="p-2 bg-white border border-[#04301F]/20 rounded-lg text-[11px] text-[#04301F] hover:border-[#04301F] hover:shadow-tactile-xs transition-all">
            <span className="font-bold text-[#04301F] block font-mono">SAU</span>
            <span className="text-[10px] text-[#04301F]/70 line-clamp-1 font-medium">শেরেবাংলা কৃষি</span>
          </div>
        </div>
      </div>

      {/* Editorial Standard Card */}
      <div className="p-3.5 bg-[#F5F1E8] border-2 border-[#04301F] rounded-xl shadow-tactile-sm text-[#04301F]">
        <div className="flex items-center gap-1.5 text-xs font-bold text-[#04301F] mb-1.5">
          <ShieldCheck className="w-4 h-4 text-[#04301F]" />
          <span className="font-mono uppercase tracking-wide">প্লেইনসাইট অঙ্গীকার</span>
        </div>
        <p className="text-[11px] text-[#04301F]/80 leading-relaxed mb-2 font-medium">
          আমরা কৃষক ও তরুণ গবেষকদের কাছে জটিল গবেষণাপত্র সহজ ও তথ্যবহুল বাংলায় উপস্থাপন করি।
        </p>
        <button
          type="button"
          onClick={onOpenEditorialPolicy}
          className="text-[11px] font-bold text-[#04301F] hover:underline flex items-center gap-1 cursor-pointer"
        >
          <span>আমাদের সম্পাদকীয় নীতিমালা</span>
          <span>&rarr;</span>
        </button>
      </div>
    </aside>
  );
};
