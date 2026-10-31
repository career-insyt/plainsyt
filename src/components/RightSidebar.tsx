import React, { useState } from 'react';
import {
  TrendingUp,
  Calendar,
  UserCheck,
  UserPlus,
  ExternalLink,
  MapPin,
  CheckCircle2,
  Clock,
  Sparkles,
} from 'lucide-react';
import {
  ResearchPaper,
  FeaturedScientist,
  MarketCommodity,
  TrendingRankedItem,
  UpcomingEvent,
  ArticleCategory,
} from '../types/index.ts';
import { TRENDING_RANKED, UPCOMING_EVENTS } from '../data/mockData.ts';

interface RightSidebarProps {
  researchPapers?: ResearchPaper[];
  scientists: FeaturedScientist[];
  marketData?: MarketCommodity[];
  onOpenResearch?: (paper: ResearchPaper) => void;
  onSelectCategory?: (category: ArticleCategory) => void;
  onSelectArticleTitle?: (title: string) => void;
  onSelectTag?: (tag: string) => void;
}

export const RightSidebar: React.FC<RightSidebarProps> = ({
  scientists: initialScientists,
  onSelectCategory,
  onSelectArticleTitle,
  onSelectTag,
}) => {
  const [scientists, setScientists] = useState<FeaturedScientist[]>(initialScientists);
  const [events, setEvents] = useState<UpcomingEvent[]>(UPCOMING_EVENTS);

  const toggleFollow = (id: string) => {
    setScientists((prev) =>
      prev.map((s) => (s.id === id ? { ...s, isFollowing: !s.isFollowing } : s))
    );
  };

  const toggleEventRegistration = (id: string) => {
    setEvents((prev) =>
      prev.map((ev) => (ev.id === id ? { ...ev, isRegistered: !ev.isRegistered } : ev))
    );
  };

  return (
    <aside className="w-72 xl:w-80 shrink-0 py-4 hidden xl:block sticky top-16 h-[calc(100vh-4rem)] overflow-y-auto scrollbar-none pl-1 space-y-4 font-sans">
      
      {/* 1. Trending Now (01 - 05) */}
      <div className="bg-white border-2 border-[#04301F]/15 rounded-2xl p-4 shadow-tactile-xs">
        <div className="flex items-center justify-between mb-3.5">
          <div className="flex items-center gap-1.5 text-xs font-bold text-[#04301F] uppercase font-mono tracking-wider">
            <TrendingUp className="w-4 h-4 text-emerald-700" />
            <span>Trending Now</span>
          </div>
          <span className="text-[11px] font-semibold text-emerald-800 hover:underline cursor-pointer">
            See all
          </span>
        </div>

        <div className="space-y-3">
          {TRENDING_RANKED.map((item) => (
            <div
              key={item.id}
              onClick={() => onSelectArticleTitle && onSelectArticleTitle(item.title)}
              className="flex items-start gap-2.5 group cursor-pointer p-1.5 -mx-1.5 rounded-xl hover:bg-[#F9F7F2] transition-colors"
            >
              {/* Rank number */}
              <span className="text-xs font-mono font-bold text-gray-400 group-hover:text-emerald-700 pt-0.5 shrink-0 w-5">
                {item.rank}
              </span>

              {/* Title & Stats */}
              <div className="flex-1 min-w-0">
                <h4 className="text-xs font-bold text-[#04301F] group-hover:text-emerald-800 transition-colors leading-snug line-clamp-2">
                  {item.title}
                </h4>
                <div className="flex items-center gap-2 mt-1 text-[10px] text-gray-500 font-mono">
                  <span>{item.reads}</span>
                  <span>•</span>
                  <span>{item.comments} comments</span>
                </div>
              </div>

              {/* Thumbnail */}
              <img
                src={item.imageUrl}
                alt={item.title}
                className="w-12 h-10 rounded-lg object-cover shrink-0 border border-gray-100 group-hover:scale-105 transition-transform"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>

      {/* 2. Upcoming Events */}
      <div className="bg-white border-2 border-[#04301F]/15 rounded-2xl p-4 shadow-tactile-xs">
        <div className="flex items-center justify-between mb-3.5">
          <div className="flex items-center gap-1.5 text-xs font-bold text-[#04301F] uppercase font-mono tracking-wider">
            <Calendar className="w-4 h-4 text-emerald-700" />
            <span>Upcoming Events</span>
          </div>
          <span className="text-[11px] font-semibold text-emerald-800 hover:underline cursor-pointer">
            See all
          </span>
        </div>

        <div className="space-y-3">
          {events.map((ev) => (
            <div
              key={ev.id}
              className="flex items-start justify-between gap-3 p-2 rounded-xl bg-[#FAF8F3] border border-gray-100"
            >
              {/* Date Box */}
              <div className="w-11 h-11 rounded-lg bg-white border border-[#04301F]/20 flex flex-col items-center justify-center shrink-0 shadow-tactile-xs">
                <span className="text-[9px] font-bold text-rose-600 uppercase font-mono leading-none">
                  {ev.dateMonth}
                </span>
                <span className="text-sm font-extrabold text-[#04301F] font-mono leading-tight">
                  {ev.dateDay}
                </span>
              </div>

              {/* Event Info */}
              <div className="flex-1 min-w-0">
                <h5 className="text-xs font-bold text-[#04301F] leading-snug line-clamp-1">
                  {ev.title}
                </h5>
                <p className="text-[10px] text-gray-500 flex items-center gap-1 mt-0.5 truncate">
                  <MapPin className="w-3 h-3 text-gray-400 shrink-0" />
                  <span>{ev.location}</span>
                </p>
                <p className="text-[10px] text-emerald-700 font-mono mt-0.5">
                  {ev.attendeesCount}
                </p>
              </div>

              {/* Register Button */}
              <button
                type="button"
                onClick={() => toggleEventRegistration(ev.id)}
                className={`text-[10px] font-bold px-2.5 py-1 rounded-lg transition-all shrink-0 active:scale-95 ${
                  ev.isRegistered
                    ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                    : 'bg-[#04301F] text-white hover:bg-[#06462D]'
                }`}
              >
                {ev.isRegistered ? 'Registered' : 'Register'}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* 3. Who to Follow */}
      <div className="bg-white border-2 border-[#04301F]/15 rounded-2xl p-4 shadow-tactile-xs">
        <div className="flex items-center justify-between mb-3.5">
          <div className="flex items-center gap-1.5 text-xs font-bold text-[#04301F] uppercase font-mono tracking-wider">
            <UserPlus className="w-4 h-4 text-emerald-700" />
            <span>Who to Follow</span>
          </div>
          <span className="text-[11px] font-semibold text-emerald-800 hover:underline cursor-pointer">
            See all
          </span>
        </div>

        <div className="space-y-3">
          {scientists.slice(0, 3).map((sci) => (
            <div key={sci.id} className="flex items-center justify-between gap-2.5">
              <div className="flex items-center gap-2.5 min-w-0">
                <img
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=100&h=100&q=80"
                  alt={sci.name}
                  className="w-9 h-9 rounded-full object-cover shrink-0 ring-1 ring-gray-200"
                />
                <div className="min-w-0">
                  <h5 className="text-xs font-bold text-[#04301F] truncate">{sci.name}</h5>
                  <p className="text-[10px] text-gray-500 truncate">{sci.organization}</p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => toggleFollow(sci.id)}
                className={`text-[10px] font-bold px-3 py-1 rounded-lg transition-all shrink-0 active:scale-95 ${
                  sci.isFollowing
                    ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                    : 'bg-[#FAF8F3] text-[#04301F] border border-gray-300 hover:bg-gray-100'
                }`}
              >
                {sci.isFollowing ? 'Following' : 'Follow'}
              </button>
            </div>
          ))}
        </div>
      </div>

    </aside>
  );
};
