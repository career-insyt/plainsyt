import React from 'react';
import {
  Wheat,
  Cpu,
  Microscope,
  Snowflake,
  CloudRain,
  Rocket,
  Bookmark,
  PlaySquare,
  ShieldCheck,
  Bot,
  Layers,
  ChevronRight,
  ExternalLink,
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
  onOpenAskAI?: () => void;
  userName?: string;
  userAvatar?: string;
}

export const LeftSidebar: React.FC<LeftSidebarProps> = ({
  selectedCategory,
  onSelectCategory,
  savedCount,
  onOpenSaved,
  onScrollToReels,
  onOpenEditorialPolicy,
  onOpenAskAI,
  userName = 'হাসান জুবায়ের',
  userAvatar = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&h=120&q=80',
}) => {
  const openAlexTopics: { label: ArticleCategory; icon: React.ReactNode; en: string }[] = [
    { label: 'এগ্রি-টেক ও ড্রোন', icon: <Cpu className="w-4 h-4 text-emerald-600" />, en: 'Precision Drones & Robotics' },
    { label: 'শস্য ও কৃষিবিজ্ঞান', icon: <Wheat className="w-4 h-4 text-amber-600" />, en: 'Agronomy & Crop Genomics' },
    { label: 'গবেষণা সহজ ভাষায়', icon: <Microscope className="w-4 h-4 text-purple-600" />, en: 'Research Explained' },
    { label: 'জলবায়ু ও স্থায়িত্ব', icon: <CloudRain className="w-4 h-4 text-sky-600" />, en: 'Salinity & Water Tech' },
    { label: 'খাদ্য ও কোল্ড চেইন', icon: <Snowflake className="w-4 h-4 text-cyan-600" />, en: 'Post-Harvest Cold Chain' },
    { label: 'স্টার্টআপ ও উদ্ভাবন', icon: <Rocket className="w-4 h-4 text-rose-600" />, en: 'Agri Startups & IoT' },
  ];

  return (
    <aside className="w-60 xl:w-72 shrink-0 py-3 sm:py-4 hidden lg:block sticky top-16 h-[calc(100vh-4rem)] overflow-y-auto scrollbar-none pr-1 space-y-3 font-sans">
      
      {/* 1. User Profile Shortcut (Facebook Style) */}
      <div className="p-2.5 bg-white border-2 border-[#04301F]/15 rounded-2xl shadow-tactile-xs flex items-center gap-3 hover:border-emerald-700 transition-colors cursor-pointer">
        <div className="relative shrink-0">
          <img
            src={userAvatar}
            alt={userName}
            className="w-10 h-10 rounded-full object-cover ring-2 ring-emerald-600/30"
          />
          <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 border-2 border-white rounded-full" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-xs font-bold text-[#04301F] truncate">{userName}</p>
          <p className="text-[10px] text-gray-500 truncate font-mono">মাঠ পর্যবেক্ষক • ঢাকা</p>
        </div>
      </div>

      {/* 2. Main Shortcuts */}
      <div className="bg-white border-2 border-[#04301F]/15 rounded-2xl p-2 shadow-tactile-xs space-y-0.5">
        
        {/* All Feed */}
        <button
          type="button"
          onClick={() => onSelectCategory('সকল')}
          className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-all text-left cursor-pointer ${
            selectedCategory === 'সকল'
              ? 'bg-[#04301F] text-[#FDFAF4] shadow-tactile-xs'
              : 'text-[#04301F] hover:bg-[#F5F2EB]'
          }`}
        >
          <div className="flex items-center gap-2.5">
            <Layers className="w-4 h-4 text-emerald-400" />
            <span>নিউজফিড ও পোস্ট</span>
          </div>
        </button>

        {/* Video Reels */}
        <button
          type="button"
          onClick={onScrollToReels}
          className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold text-[#04301F] hover:bg-[#F5F2EB] transition-all text-left cursor-pointer"
        >
          <div className="flex items-center gap-2.5">
            <PlaySquare className="w-4 h-4 text-rose-600" />
            <span>ভিডিও রিলস ও মাঠের দৃশ্য</span>
          </div>
          <span className="bg-rose-600 text-white text-[9px] font-bold px-1.5 py-0.2 rounded-full font-mono">
            15+
          </span>
        </button>

        {/* Saved Articles */}
        <button
          type="button"
          onClick={onOpenSaved}
          className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold text-[#04301F] hover:bg-[#F5F2EB] transition-all text-left cursor-pointer"
        >
          <div className="flex items-center gap-2.5">
            <Bookmark className="w-4 h-4 text-amber-700" />
            <span>সংরক্ষিত তালিকা</span>
          </div>
          {savedCount > 0 && (
            <span className="bg-amber-100 text-amber-900 border border-amber-300 text-[10px] font-bold px-1.5 py-0.2 rounded-full tabular-nums">
              {toBengaliNumerals(savedCount)}
            </span>
          )}
        </button>

        {/* Ask AI Advisor */}
        {onOpenAskAI && (
          <button
            type="button"
            onClick={onOpenAskAI}
            className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold text-purple-900 hover:bg-purple-50 transition-all text-left cursor-pointer"
          >
            <div className="flex items-center gap-2.5">
              <Bot className="w-4 h-4 text-purple-600" />
              <span>Plainsyt AI কৃষি সহকারী</span>
            </div>
            <span className="text-[10px] text-purple-600 font-mono font-bold">24/7</span>
          </button>
        )}
      </div>

      {/* 3. OpenAlex Agriculture Pillars */}
      <div className="bg-white border-2 border-[#04301F]/15 rounded-2xl p-2.5 shadow-tactile-xs">
        <div className="px-1.5 mb-2 flex items-center justify-between">
          <span className="text-[11px] font-bold text-[#04301F] uppercase tracking-wider font-mono">
            গবেষণা ও বিষয় অন্বেষণ
          </span>
        </div>
        <div className="space-y-1">
          {openAlexTopics.map((item) => {
            const isSelected = selectedCategory === item.label;
            return (
              <button
                key={item.label}
                type="button"
                onClick={() => onSelectCategory(item.label)}
                className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-all text-left cursor-pointer ${
                  isSelected
                    ? 'bg-emerald-800 text-white shadow-tactile-xs'
                    : 'text-[#04301F] hover:bg-[#F5F2EB]'
                }`}
              >
                <div className="flex items-center gap-2 truncate">
                  <span>{item.icon}</span>
                  <span className="truncate">{item.label}</span>
                </div>
                <ChevronRight className={`w-3.5 h-3.5 shrink-0 ${isSelected ? 'text-white' : 'text-gray-400'}`} />
              </button>
            );
          })}
        </div>
      </div>

      {/* 4. Research Institutes Network */}
      <div className="bg-white border-2 border-[#04301F]/15 rounded-2xl p-2.5 shadow-tactile-xs">
        <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider font-mono block px-1 mb-2">
          গবেষণা সহযোগী প্রতিষ্ঠানসমূহ
        </span>
        <div className="grid grid-cols-2 gap-1.5">
          <div className="p-1.5 bg-[#FAF8F3] border border-gray-200 rounded-lg text-center">
            <span className="font-bold text-xs text-[#04301F] block font-mono">BRRI</span>
            <span className="text-[9px] text-gray-500">ধান গবেষণা</span>
          </div>
          <div className="p-1.5 bg-[#FAF8F3] border border-gray-200 rounded-lg text-center">
            <span className="font-bold text-xs text-[#04301F] block font-mono">BAU</span>
            <span className="text-[9px] text-gray-500">কৃষি বিশ্ববিদ্যালয়</span>
          </div>
          <div className="p-1.5 bg-[#FAF8F3] border border-gray-200 rounded-lg text-center">
            <span className="font-bold text-xs text-[#04301F] block font-mono">BARI</span>
            <span className="text-[9px] text-gray-500">কৃষি গবেষণা</span>
          </div>
          <div className="p-1.5 bg-[#FAF8F3] border border-gray-200 rounded-lg text-center">
            <span className="font-bold text-xs text-[#04301F] block font-mono">SAU</span>
            <span className="text-[9px] text-gray-500">শেরেবাংলা কৃষি</span>
          </div>
        </div>
      </div>

      {/* 5. Editorial Footer */}
      <div className="px-2 pt-1 text-[11px] text-gray-500 space-y-1">
        <button
          type="button"
          onClick={onOpenEditorialPolicy}
          className="hover:underline text-emerald-800 font-semibold block"
        >
          সম্পাদকীয় নীতিমালা ও ফ্যাক্ট-চেক
        </button>
        <p className="text-[10px] text-gray-400">Plainsyt Digital Media © 2026</p>
      </div>

    </aside>
  );
};
