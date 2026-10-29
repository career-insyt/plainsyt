import React, { useState } from 'react';
import { Search, Bookmark, Bell, X, Sparkles } from 'lucide-react';
import { ArticleCategory } from '../types/index.ts';
import { toBengaliNumerals } from '../utils/pureLogic.ts';
import { PlainsytLogo } from './PlainsytLogo.tsx';

interface HeaderProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedCategory: ArticleCategory;
  onSelectCategory: (category: ArticleCategory) => void;
  savedCount: number;
  onOpenSaved: () => void;
  onOpenNewPost: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  searchQuery,
  onSearchChange,
  selectedCategory,
  onSelectCategory,
  savedCount,
  onOpenSaved,
  onOpenNewPost,
}) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);

  // Top nav categories (concise single-line)
  const navCategories: { label: string; value: ArticleCategory }[] = [
    { label: 'সকল', value: 'সকল' },
    { label: 'শস্যবিজ্ঞান', value: 'শস্য ও কৃষিবিজ্ঞান' },
    { label: 'এগ্রি-টেক', value: 'এগ্রি-টেক ও ড্রোন' },
    { label: 'গবেষণা', value: 'গবেষণা সহজ ভাষায়' },
    { label: 'কোল্ড চেইন', value: 'খাদ্য ও কোল্ড চেইন' },
    { label: 'জলবায়ু', value: 'জলবায়ু ও স্থায়িত্ব' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#FDFAF5]/95 backdrop-blur-md border-b-2 border-[#04301F]/15 transition-all">
      {/* Primary Top Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4 lg:gap-6">
        
        {/* Zone 1: Official Plainsyt Logo */}
        <div className="flex items-center gap-3 shrink-0">
          <a
            href="/"
            className="flex items-center gap-2 group text-[#04301F] transition-opacity hover:opacity-95"
            aria-label="Plainsyt হোমপেজ"
          >
            <PlainsytLogo height={38} showTagline={true} />
          </a>
        </div>

        {/* Zone 2: Concise Single-Line Navigation Categories */}
        <nav
          className="hidden lg:flex items-center gap-1.5 overflow-x-auto py-1 scrollbar-none"
          aria-label="মূল বিভাগসমূহ"
        >
          {navCategories.map((cat) => {
            const isActive = selectedCategory === cat.value;
            return (
              <button
                key={cat.value}
                type="button"
                onClick={() => onSelectCategory(cat.value)}
                className={`px-3 py-1.5 text-[13px] font-medium transition-all whitespace-nowrap shrink-0 rounded-lg ${
                  isActive
                    ? 'bg-[#04301F] text-[#FDFAF4] font-semibold shadow-tactile-sm border border-[#04301F]'
                    : 'text-[#04301F]/80 hover:text-[#04301F] hover:bg-[#04301F]/5 border border-transparent hover:border-[#04301F]/15'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: Search & Actions */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {/* Desktop Search Bar */}
          <div className="relative hidden md:block w-48 lg:w-64">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="সংবাদ, গবেষণা বা ড্রোন খুঁজুন..."
              className="w-full pl-9 pr-8 py-1.5 text-xs bg-white border-2 border-[#04301F]/20 rounded-lg text-[#04301F] placeholder:text-[#04301F]/40 focus:outline-none focus:border-[#04301F] focus:ring-1 focus:ring-[#04301F] transition-all font-medium"
            />
            <Search className="w-4 h-4 text-[#04301F]/50 absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            {searchQuery && (
              <button
                type="button"
                onClick={() => onSearchChange('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#04301F]/50 hover:text-[#04301F] p-0.5"
                aria-label="অনুসন্ধান মুছুন"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Mobile Search Toggle */}
          <button
            type="button"
            onClick={() => setMobileSearchOpen(!mobileSearchOpen)}
            className="md:hidden p-2 text-[#04301F] hover:bg-[#04301F]/10 rounded-lg border border-transparent hover:border-[#04301F]/20"
            aria-label="অনুসন্ধান খুলুন"
          >
            <Search className="w-5 h-5" />
          </button>

          {/* Saved Articles / Bookmarks Drawer Trigger */}
          <button
            type="button"
            onClick={onOpenSaved}
            className="relative p-2 text-[#04301F] hover:bg-[#04301F]/10 rounded-lg border border-[#04301F]/15 hover:border-[#04301F] transition-all"
            title="সংরক্ষিত প্রতিবেদন"
            aria-label={`সংরক্ষিত প্রতিবেদন (${toBengaliNumerals(savedCount)})`}
          >
            <Bookmark className="w-5 h-5" />
            {savedCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#04301F] text-[#FDFAF4] text-[10px] font-bold rounded-full flex items-center justify-center tabular-nums border border-[#FDFAF4]">
                {toBengaliNumerals(savedCount)}
              </span>
            )}
          </button>

          {/* Notifications Dropdown */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setShowNotifications(!showNotifications)}
              className="p-2 text-[#04301F] hover:bg-[#04301F]/10 rounded-lg border border-[#04301F]/15 hover:border-[#04301F] transition-all"
              title="বিজ্ঞপ্তি"
              aria-label="বিজ্ঞপ্তি দেখুন"
            >
              <Bell className="w-5 h-5" />
            </button>

            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 bg-white border-2 border-[#04301F] rounded-xl shadow-tactile-lg p-3.5 z-50 text-left">
                <div className="flex items-center justify-between pb-2 border-b border-[#04301F]/15">
                  <span className="text-xs font-bold text-[#04301F] uppercase tracking-wider">
                    সর্বশেষ আপডেট ও বুলেটিন
                  </span>
                  <button
                    type="button"
                    onClick={() => setShowNotifications(false)}
                    className="text-[#04301F]/50 hover:text-[#04301F]"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
                <div className="divide-y divide-[#04301F]/10 max-h-72 overflow-y-auto">
                  <div className="py-2.5 text-xs">
                    <p className="font-bold text-[#04301F]">🌾 বিআরআরআই (BRRI) নতুন গবেষণা প্রকাশ</p>
                    <p className="text-[#04301F]/70 mt-0.5">হাওরে ব্রি-১০২ ধানের প্রাথমিক ফলন প্রতিবেদন উন্মুক্ত হয়েছে।</p>
                    <span className="text-[10px] text-[#04301F]/50 mt-1 block font-mono">২০ মিনিট আগে</span>
                  </div>
                  <div className="py-2.5 text-xs">
                    <p className="font-bold text-[#04301F]">🚁 বগুড়া ড্রোন স্প্রে ওয়ার্কশপ</p>
                    <p className="text-[#04301F]/70 mt-0.5">আগামী বৃহস্পতিবার শিবগঞ্জে মাঠ প্রদর্শনী অনুষ্ঠিত হবে।</p>
                    <span className="text-[10px] text-[#04301F]/50 mt-1 block font-mono">২ ঘণ্টা আগে</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Primary Action Button: তথ্য জানান / মাঠ রিপোর্ট */}
          <button
            type="button"
            onClick={onOpenNewPost}
            className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-bold text-[#FDFAF4] bg-[#04301F] hover:bg-[#09472e] border border-[#04301F] rounded-lg shadow-tactile-sm hover:shadow-tactile hover:-translate-y-0.5 active:translate-y-0 transition-all whitespace-nowrap cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>তথ্য জানান</span>
          </button>
        </div>
      </div>

      {/* Mobile Search Bar Expansion */}
      {mobileSearchOpen && (
        <div className="md:hidden px-4 pb-3 pt-1 border-t border-[#04301F]/10 bg-white">
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="খুঁজুন (যেমন: ড্রোন, পেঁয়াজ সংরক্ষণ, ব্রি-১০২)..."
              className="w-full pl-9 pr-8 py-2 text-sm bg-[#FDFAF5] border-2 border-[#04301F]/30 rounded-lg text-[#04301F] placeholder:text-[#04301F]/40 focus:outline-none focus:border-[#04301F]"
              autoFocus
            />
            <Search className="w-4 h-4 text-[#04301F]/50 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            {searchQuery && (
              <button
                type="button"
                onClick={() => onSearchChange('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#04301F]/50"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      )}

      {/* Mobile Horizontal Category Bar */}
      <div className="lg:hidden border-t border-[#04301F]/10 px-4 py-2 overflow-x-auto scrollbar-none flex items-center gap-2 bg-[#FDFAF5]">
        {navCategories.map((cat) => {
          const isActive = selectedCategory === cat.value;
          return (
            <button
              key={cat.value}
              type="button"
              onClick={() => onSelectCategory(cat.value)}
              className={`px-3 py-1 text-xs whitespace-nowrap rounded-lg font-bold transition-all ${
                isActive
                  ? 'bg-[#04301F] text-[#FDFAF4] shadow-tactile-xs border border-[#04301F]'
                  : 'bg-white border border-[#04301F]/20 text-[#04301F]'
              }`}
            >
              {cat.label}
            </button>
          );
        })}
      </div>
    </header>
  );
};
