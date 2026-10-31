import React, { useRef } from 'react';
import {
  Plus,
  ChevronRight,
  ChevronLeft,
  Plane,
  Sprout,
  CloudRain,
  Apple,
  Home,
  TrendingUp,
  Layers,
} from 'lucide-react';
import { TopicStory, ArticleCategory } from '../types/index.ts';

interface TopicStoriesCarouselProps {
  stories: TopicStory[];
  selectedCategory: ArticleCategory;
  onSelectCategory: (category: ArticleCategory) => void;
  onOpenCreateStory?: () => void;
}

export const TopicStoriesCarousel: React.FC<TopicStoriesCarouselProps> = ({
  stories,
  selectedCategory,
  onSelectCategory,
  onOpenCreateStory,
}) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 280, behavior: 'smooth' });
    }
  };

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -280, behavior: 'smooth' });
    }
  };

  const renderIcon = (iconName: string) => {
    switch (iconName) {
      case 'drone':
        return <Plane className="w-4 h-4 text-emerald-300" />;
      case 'seedling':
        return <Sprout className="w-4 h-4 text-emerald-300" />;
      case 'climate':
        return <CloudRain className="w-4 h-4 text-sky-300" />;
      case 'food':
        return <Apple className="w-4 h-4 text-rose-300" />;
      case 'rural':
        return <Home className="w-4 h-4 text-amber-300" />;
      case 'policy':
        return <TrendingUp className="w-4 h-4 text-teal-300" />;
      default:
        return <Layers className="w-4 h-4 text-emerald-300" />;
    }
  };

  return (
    <div className="relative group/carousel mb-4">
      {/* Scroll controls for desktop */}
      <button
        onClick={scrollLeft}
        className="hidden md:flex absolute -left-3 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-white/95 text-[#04301F] shadow-tactile-sm border border-[#04301F]/20 items-center justify-center opacity-0 group-hover/carousel:opacity-100 transition-opacity hover:bg-white hover:scale-105 active:scale-95"
        aria-label="Previous Stories"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>

      <button
        onClick={scrollRight}
        className="hidden md:flex absolute -right-3 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-white/95 text-[#04301F] shadow-tactile-sm border border-[#04301F]/20 items-center justify-center opacity-0 group-hover/carousel:opacity-100 transition-opacity hover:bg-white hover:scale-105 active:scale-95"
        aria-label="Next Stories"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      {/* Stories Scrollable Track */}
      <div
        ref={scrollContainerRef}
        className="flex items-center gap-2.5 sm:gap-3.5 overflow-x-auto scrollbar-none py-1 px-0.5 scroll-smooth"
      >
        {/* Mobile First Item: Facebook style "+ Create Story" card */}
        <div
          onClick={onOpenCreateStory}
          className="md:hidden shrink-0 w-24 sm:w-28 h-36 sm:h-44 rounded-xl sm:rounded-2xl bg-white border border-[#04301F]/15 overflow-hidden flex flex-col cursor-pointer relative shadow-tactile-xs active:scale-[0.98] transition-transform select-none"
        >
          <div className="h-24 sm:h-28 w-full bg-slate-200 overflow-hidden relative">
            <img
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&h=180&q=80"
              alt="User"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex-1 bg-white flex flex-col items-center justify-center relative pt-3 px-1 text-center">
            <div className="absolute -top-4 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#04301F] text-white flex items-center justify-center border-2 border-white shadow-tactile-xs">
              <Plus className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2.5]" />
            </div>
            <span className="text-[10px] sm:text-[11px] font-bold text-[#04301F] leading-tight">
              Create Story
            </span>
          </div>
        </div>

        {/* Stories / Topic Cards */}
        {stories.map((story) => {
          const isSelected = selectedCategory === story.category;

          return (
            <div
              key={story.id}
              onClick={() => onSelectCategory(story.category)}
              className={`shrink-0 w-24 sm:w-32 md:w-40 h-36 sm:h-44 md:h-36 rounded-xl sm:rounded-2xl relative overflow-hidden cursor-pointer select-none transition-all duration-200 group border-2 ${
                isSelected
                  ? 'border-emerald-600 ring-2 ring-emerald-500/30 scale-[1.02] shadow-tactile-sm'
                  : 'border-transparent hover:border-[#04301F]/30 hover:scale-[1.02] shadow-tactile-xs'
              }`}
            >
              {/* Background Photo */}
              <img
                src={story.imageUrl}
                alt={story.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                loading="lazy"
              />

              {/* Gradient Scrim */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent" />

              {/* Mobile top circular author badge (FB style) */}
              <div className="md:hidden absolute top-2 left-2 z-10">
                <div className="w-7 h-7 rounded-full p-0.5 bg-emerald-600 ring-2 ring-white overflow-hidden shadow-tactile-xs">
                  <img
                    src={story.authorAvatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&h=100&q=80'}
                    alt={story.authorName || 'User'}
                    className="w-full h-full object-cover rounded-full"
                  />
                </div>
              </div>

              {/* Desktop top category icon */}
              <div className="hidden md:flex absolute top-2.5 left-2.5 z-10 w-7 h-7 rounded-lg bg-black/40 backdrop-blur-md items-center justify-center border border-white/20">
                {renderIcon(story.iconName)}
              </div>

              {/* Bottom text info */}
              <div className="absolute bottom-2.5 left-2.5 right-2.5 z-10 text-white">
                <div className="flex items-center gap-1.5 mb-0.5">
                  <span className="md:hidden">{renderIcon(story.iconName)}</span>
                  <h4 className="text-[11px] sm:text-xs md:text-sm font-bold tracking-tight leading-tight line-clamp-1 drop-shadow-sm">
                    {story.title}
                  </h4>
                </div>
                {story.readsCount && (
                  <p className="text-[9px] sm:text-[10px] text-emerald-200/90 font-medium font-mono hidden sm:block">
                    {story.readsCount} reads
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
