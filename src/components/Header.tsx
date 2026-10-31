import React, { useState, useEffect } from 'react';
import {
  Search,
  Bookmark,
  Bell,
  X,
  Sun,
  Moon,
  Home,
  Compass,
  Calendar,
  ShoppingBag,
  Lightbulb,
  Video,
  ChevronDown,
} from 'lucide-react';
import { ArticleCategory } from '../types/index.ts';
import { PlainsytLogo } from './PlainsytLogo.tsx';

interface HeaderProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedCategory: ArticleCategory;
  onSelectCategory: (category: ArticleCategory) => void;
  savedCount: number;
  onOpenSaved: () => void;
  onOpenNewPost: () => void;
  onScrollToReels?: () => void;
  activeNavTab?: string;
  onSelectNavTab?: (tab: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  searchQuery,
  onSearchChange,
  selectedCategory,
  onSelectCategory,
  savedCount,
  onOpenSaved,
  onOpenNewPost,
  onScrollToReels,
  activeNavTab = 'Home',
  onSelectNavTab,
}) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const [desktopSearchOpen, setDesktopSearchOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  // Keyboard shortcut listener for Command/Ctrl + K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setDesktopSearchOpen(true);
        setTimeout(() => {
          const searchInput = document.getElementById('global-search-input');
          searchInput?.focus();
        }, 50);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const navTabs = [
    { id: 'Home', label: 'Home', icon: Home },
    { id: 'Explore', label: 'Explore', icon: Compass },
    { id: 'Events', label: 'Events', icon: Calendar },
    { id: 'Store', label: 'Store', icon: ShoppingBag },
    { id: 'Ideas', label: 'Ideas', icon: Lightbulb },
  ];

  const handleTabClick = (tabId: string) => {
    if (onSelectNavTab) onSelectNavTab(tabId);
    if (tabId === 'Reels' && onScrollToReels) {
      onScrollToReels();
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-[#FDFAF5]/95 backdrop-blur-md border-b-2 border-[#04301F]/15 transition-all">
      {/* 1. Main Top Bar: 3-column symmetrical layout ensuring center tabs are in EXACT MIDDLE */}
      <div className="w-full max-w-7xl mx-auto px-3 sm:px-6 h-14 sm:h-16 flex items-center justify-between">
        
        {/* Left Column: Brand Logo & Small Round Search Button */}
        <div className="w-48 sm:w-60 lg:w-72 flex items-center gap-2.5 sm:gap-3 shrink-0">
          <a
            href="/"
            className="flex items-center gap-2 group text-[#04301F] transition-opacity hover:opacity-95"
            aria-label="Plainsyt Home"
          >
            <PlainsytLogo height={32} showTagline={false} />
          </a>

          {/* Compact round search button with circular padding */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setDesktopSearchOpen(!desktopSearchOpen)}
              className="p-2.5 rounded-full bg-white hover:bg-[#F0ECE1] active:scale-95 border-2 border-[#04301F]/20 text-[#04301F] shadow-tactile-xs transition-all flex items-center justify-center cursor-pointer"
              title="Search (⌘ K)"
              aria-label="Search"
            >
              <Search className="w-4 h-4 text-[#04301F]" />
            </button>

            {/* Desktop Popover Search Input */}
            {desktopSearchOpen && (
              <div className="absolute left-0 top-12 z-50 w-72 bg-white rounded-2xl shadow-tactile-lg border-2 border-[#04301F] p-2 animate-fadeIn">
                <div className="relative">
                  <input
                    id="global-search-input"
                    type="text"
                    value={searchQuery}
                    onChange={(e) => onSearchChange(e.target.value)}
                    placeholder="Search articles, topics, posts..."
                    className="w-full pl-8 pr-7 py-2 text-xs bg-[#F9F7F2] border border-gray-200 rounded-xl text-[#04301F] placeholder:text-gray-400 focus:outline-none focus:border-emerald-700 font-medium"
                    autoFocus
                  />
                  <Search className="w-3.5 h-3.5 text-gray-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
                  {searchQuery && (
                    <button
                      type="button"
                      onClick={() => onSearchChange('')}
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 cursor-pointer"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Center Column: EXACT MIDDLE Navigation Tabs with width corresponding to Newsfeed */}
        <nav
          className="hidden md:flex flex-1 items-center justify-center h-full max-w-[620px] lg:max-w-[640px] xl:max-w-[660px] mx-auto"
          aria-label="Main Navigation"
        >
          <div className="flex items-center justify-around w-full h-full">
            {navTabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeNavTab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => handleTabClick(tab.id)}
                  className={`relative flex-1 h-full flex flex-col items-center justify-center gap-0.5 text-xs font-bold transition-all group cursor-pointer ${
                    isActive
                      ? 'text-emerald-800 font-extrabold'
                      : 'text-gray-600 hover:text-[#04301F] hover:bg-black/5'
                  }`}
                >
                  <Icon className={`w-5 h-5 ${isActive ? 'stroke-[2.5]' : ''}`} />
                  <span className="text-[11px] font-sans">{tab.label}</span>
                  {isActive && (
                    <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-emerald-700 rounded-full" />
                  )}
                </button>
              );
            })}
          </div>
        </nav>

        {/* Right Column: Theme Toggle, Notifications & Profile Avatar */}
        <div className="w-48 sm:w-60 lg:w-72 flex items-center justify-end gap-2 sm:gap-3 shrink-0">
          
          {/* Mobile Search Button */}
          <button
            type="button"
            onClick={() => setMobileSearchOpen(!mobileSearchOpen)}
            className="md:hidden p-2 text-[#04301F] hover:bg-black/5 rounded-full"
            aria-label="Search"
          >
            <Search className="w-5 h-5" />
          </button>

          {/* Theme Switcher Toggle (Sun / Moon) */}
          <button
            type="button"
            onClick={() => setIsDarkMode(!isDarkMode)}
            className="p-2 text-[#04301F] hover:bg-black/5 rounded-full border border-gray-200 shadow-tactile-xs bg-white transition-all active:scale-95 cursor-pointer"
            title={isDarkMode ? 'Light Mode' : 'Dark Mode'}
            aria-label="Toggle Theme"
          >
            {isDarkMode ? (
              <Moon className="w-4 h-4 text-emerald-700" />
            ) : (
              <Sun className="w-4 h-4 text-amber-600" />
            )}
          </button>

          {/* Saved Articles Drawer Trigger */}
          <button
            type="button"
            onClick={onOpenSaved}
            className="relative p-2 text-[#04301F] hover:bg-black/5 rounded-full border border-gray-200 bg-white shadow-tactile-xs transition-all active:scale-95 cursor-pointer"
            title="Saved Articles"
            aria-label="Saved Articles"
          >
            <Bookmark className="w-4 h-4" />
            {savedCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-800 text-white text-[10px] font-bold rounded-full flex items-center justify-center tabular-nums">
                {savedCount}
              </span>
            )}
          </button>

          {/* Notification Bell with Badge */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative p-2 text-[#04301F] hover:bg-black/5 rounded-full border border-gray-200 bg-white shadow-tactile-xs transition-all active:scale-95 cursor-pointer"
              title="Notifications"
              aria-label="Notifications"
            >
              <Bell className="w-4 h-4" />
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-rose-600 text-white text-[10px] font-bold rounded-full flex items-center justify-center tabular-nums shadow-xs">
                3
              </span>
            </button>

            {/* Notifications Popover */}
            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 bg-white border-2 border-[#04301F] rounded-2xl shadow-tactile-lg p-3.5 z-50 text-left font-sans animate-fadeIn">
                <div className="flex items-center justify-between pb-2 border-b border-gray-100">
                  <span className="text-xs font-bold text-[#04301F] uppercase tracking-wider">
                    Notifications
                  </span>
                  <button
                    type="button"
                    onClick={() => setShowNotifications(false)}
                    className="text-gray-400 hover:text-gray-600 cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
                <div className="divide-y divide-gray-100 max-h-72 overflow-y-auto">
                  <div className="py-2.5 text-xs hover:bg-gray-50 rounded-lg p-1.5 transition-colors cursor-pointer">
                    <p className="font-bold text-[#04301F]">🌾 New Research Alert: BRRI-102</p>
                    <p className="text-gray-600 mt-0.5">Zinc-biofortified early rice yield trial published.</p>
                    <span className="text-[10px] text-gray-400 mt-1 block font-mono">10m ago</span>
                  </div>
                  <div className="py-2.5 text-xs hover:bg-gray-50 rounded-lg p-1.5 transition-colors cursor-pointer">
                    <p className="font-bold text-[#04301F]">🚁 Drone Spray Demonstration</p>
                    <p className="text-gray-600 mt-0.5">Upcoming workshop in Bogura this Thursday.</p>
                    <span className="text-[10px] text-gray-400 mt-1 block font-mono">1h ago</span>
                  </div>
                  <div className="py-2.5 text-xs hover:bg-gray-50 rounded-lg p-1.5 transition-colors cursor-pointer">
                    <p className="font-bold text-[#04301F]">🔬 Dr. Nusrat shared a research update</p>
                    <p className="text-gray-600 mt-0.5">Soil microbiome field trial in coastal saline zones.</p>
                    <span className="text-[10px] text-gray-400 mt-1 block font-mono">3h ago</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* User Profile Avatar with active green dot */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setShowProfileMenu(!showProfileMenu)}
              className="flex items-center gap-1 p-0.5 rounded-full hover:ring-2 hover:ring-emerald-600 transition-all cursor-pointer"
            >
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&h=100&q=80"
                  alt="User profile"
                  className="w-8 h-8 sm:w-9 sm:h-9 rounded-full object-cover ring-2 ring-[#04301F]/20"
                />
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 border-2 border-white rounded-full" />
              </div>
              <ChevronDown className="w-3.5 h-3.5 text-gray-500 hidden sm:block" />
            </button>

            {/* Profile Dropdown */}
            {showProfileMenu && (
              <div className="absolute right-0 mt-2 w-56 bg-white border-2 border-[#04301F] rounded-2xl shadow-tactile-lg p-2 z-50 text-left font-sans">
                <div className="p-2 border-b border-gray-100">
                  <p className="text-xs font-bold text-[#04301F]">হাসান জুবায়ের</p>
                  <p className="text-[10px] text-gray-500 font-mono">hasan@career.insyt.bd</p>
                </div>
                <div className="py-1 text-xs text-gray-700">
                  <button
                    type="button"
                    onClick={() => {
                      onOpenNewPost();
                      setShowProfileMenu(false);
                    }}
                    className="w-full text-left px-3 py-2 rounded-lg hover:bg-emerald-50 hover:text-emerald-800 font-medium cursor-pointer"
                  >
                    ✏️ নতুন পোস্ট লিখুন
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      onOpenSaved();
                      setShowProfileMenu(false);
                    }}
                    className="w-full text-left px-3 py-2 rounded-lg hover:bg-emerald-50 hover:text-emerald-800 font-medium cursor-pointer"
                  >
                    🔖 সংরক্ষিত তালিকা
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 2. Facebook Mobile Style Tab Bar (Exclusive for Mobile Screens) */}
      <nav
        className="md:hidden flex items-center justify-around border-t border-[#04301F]/10 bg-[#FDFAF5] px-1 py-1"
        aria-label="Mobile Navigation Bar"
      >
        <button
          type="button"
          onClick={() => handleTabClick('Home')}
          className={`flex-1 py-2 flex flex-col items-center justify-center relative cursor-pointer ${
            activeNavTab === 'Home' ? 'text-emerald-800' : 'text-gray-500'
          }`}
        >
          <Home className="w-5 h-5" />
          {activeNavTab === 'Home' && (
            <span className="absolute bottom-0 left-4 right-4 h-0.5 bg-emerald-700 rounded-full" />
          )}
        </button>

        <button
          type="button"
          onClick={() => handleTabClick('Explore')}
          className={`flex-1 py-2 flex flex-col items-center justify-center relative cursor-pointer ${
            activeNavTab === 'Explore' ? 'text-emerald-800' : 'text-gray-500'
          }`}
        >
          <Compass className="w-5 h-5" />
          {activeNavTab === 'Explore' && (
            <span className="absolute bottom-0 left-4 right-4 h-0.5 bg-emerald-700 rounded-full" />
          )}
        </button>

        <button
          type="button"
          onClick={() => {
            handleTabClick('Reels');
            if (onScrollToReels) onScrollToReels();
          }}
          className={`flex-1 py-2 flex flex-col items-center justify-center relative cursor-pointer ${
            activeNavTab === 'Reels' ? 'text-emerald-800' : 'text-gray-500'
          }`}
        >
          <div className="relative">
            <Video className="w-5 h-5" />
            <span className="absolute -top-1 -right-2 bg-rose-600 text-white text-[9px] font-bold px-1 rounded-full">
              15+
            </span>
          </div>
          {activeNavTab === 'Reels' && (
            <span className="absolute bottom-0 left-4 right-4 h-0.5 bg-emerald-700 rounded-full" />
          )}
        </button>

        <button
          type="button"
          onClick={() => handleTabClick('Events')}
          className={`flex-1 py-2 flex flex-col items-center justify-center relative cursor-pointer ${
            activeNavTab === 'Events' ? 'text-emerald-800' : 'text-gray-500'
          }`}
        >
          <Calendar className="w-5 h-5" />
          {activeNavTab === 'Events' && (
            <span className="absolute bottom-0 left-4 right-4 h-0.5 bg-emerald-700 rounded-full" />
          )}
        </button>

        <button
          type="button"
          onClick={() => setShowNotifications(!showNotifications)}
          className="flex-1 py-2 flex flex-col items-center justify-center relative text-gray-500 cursor-pointer"
        >
          <div className="relative">
            <Bell className="w-5 h-5" />
            <span className="absolute -top-1 -right-1.5 w-3.5 h-3.5 bg-rose-600 text-white text-[8px] font-bold rounded-full flex items-center justify-center">
              3
            </span>
          </div>
        </button>

        <button
          type="button"
          onClick={() => setShowProfileMenu(!showProfileMenu)}
          className="flex-1 py-2 flex flex-col items-center justify-center relative text-gray-500 cursor-pointer"
        >
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=80&h=80&q=80"
              alt="User"
              className="w-5 h-5 rounded-full object-cover ring-1 ring-gray-300"
            />
            <span className="absolute bottom-0 right-0 w-1.5 h-1.5 bg-emerald-500 rounded-full ring-1 ring-white" />
          </div>
        </button>
      </nav>

      {/* 3. Mobile Search Input Bar */}
      {mobileSearchOpen && (
        <div className="md:hidden px-3 py-2 border-t border-[#04301F]/10 bg-white animate-fadeIn">
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search articles, topics, posts..."
              className="w-full pl-9 pr-8 py-2 text-xs bg-[#FAF8F3] border border-gray-300 rounded-xl text-[#04301F] placeholder:text-gray-400 focus:outline-none focus:border-emerald-700"
              autoFocus
            />
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            {searchQuery && (
              <button
                type="button"
                onClick={() => onSearchChange('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 p-0.5 cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
