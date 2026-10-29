import React, { useState } from 'react';
import {
  Play,
  Heart,
  MessageCircle,
  Share2,
  Bookmark,
  ChevronRight,
  Sparkles,
  Flame,
  Clock,
  Microscope,
  Compass,
  Send,
  SearchX,
  Search,
} from 'lucide-react';
import { Article, StoryReel, FeedFilter, ArticleCategory, Comment } from '../types/index.ts';
import { ImageGraphic } from './ImageGraphic.tsx';
import { toBengaliNumerals, formatBengaliNumberCompact } from '../utils/pureLogic.ts';

interface CentralFeedProps {
  articles: Article[];
  reels: StoryReel[];
  activeFilter: FeedFilter;
  onFilterChange: (filter: FeedFilter) => void;
  selectedCategory: ArticleCategory;
  onSelectCategory: (category: ArticleCategory) => void;
  onOpenArticle: (article: Article) => void;
  onOpenReel: (reelId: string) => void;
  onOpenCreatePost: () => void;
  bookmarkedIds: string[];
  onToggleBookmark: (id: string) => void;
  onToggleLike: (article: Article) => void;
  onAddComment: (articleId: string, comment: Comment) => void;
  searchQuery: string;
  onClearSearch: () => void;
}

export const CentralFeed: React.FC<CentralFeedProps> = ({
  articles,
  reels,
  activeFilter,
  onFilterChange,
  selectedCategory,
  onSelectCategory,
  onOpenArticle,
  onOpenReel,
  onOpenCreatePost,
  bookmarkedIds,
  onToggleBookmark,
  onToggleLike,
  onAddComment,
  searchQuery,
  onClearSearch,
}) => {
  // Inline card comment input states
  const [activeCommentBoxId, setActiveCommentBoxId] = useState<string | null>(null);
  const [inlineCommentInputs, setInlineCommentInputs] = useState<Record<string, string>>({});
  const [copiedShareId, setCopiedShareId] = useState<string | null>(null);

  const toggleCommentBox = (articleId: string) => {
    setActiveCommentBoxId((prev) => (prev === articleId ? null : articleId));
  };

  const handleInlineCommentSubmit = (articleId: string, e: React.FormEvent) => {
    e.preventDefault();
    const text = inlineCommentInputs[articleId]?.trim();
    if (!text) return;

    const newComment: Comment = {
      id: `comm-${Date.now()}`,
      author: 'কৃষি অনুরাগী পাঠক',
      role: 'মাঠ পর্যবেক্ষক',
      avatar: '',
      text,
      timestamp: 'এইমাত্র',
      likes: 0,
    };

    onAddComment(articleId, newComment);
    setInlineCommentInputs((prev) => ({ ...prev, [articleId]: '' }));
  };

  const handleShareArticle = (articleId: string) => {
    navigator.clipboard?.writeText(window.location.href);
    setCopiedShareId(articleId);
    setTimeout(() => setCopiedShareId(null), 2000);
  };

  const filterTabs: { id: FeedFilter; label: string; icon: React.ReactNode }[] = [
    { id: 'trending', label: 'আলোচিত', icon: <Flame className="w-3.5 h-3.5" /> },
    { id: 'latest', label: 'সাম্প্রতিক', icon: <Clock className="w-3.5 h-3.5" /> },
    { id: 'research', label: 'গবেষণা সহজ ভাষায়', icon: <Microscope className="w-3.5 h-3.5" /> },
    { id: 'field-stories', label: 'মাঠের গল্প', icon: <Compass className="w-3.5 h-3.5" /> },
  ];

  return (
    <main className="flex-1 max-w-2xl xl:max-w-3xl py-4 space-y-5 min-w-0" id="main-content">
      
      {/* 1. Horizontal Short-Form Video Reels Carousel */}
      <section
        id="reels-carousel"
        aria-label="কৃষি রিলস ও মাঠের ভিডিও"
        className="bg-white border-2 border-[#04301F]/15 rounded-2xl p-4 shadow-tactile-sm"
      >
        <div className="flex items-center justify-between mb-3 px-1">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-[#04301F] text-[#FDFAF4] flex items-center justify-center shadow-tactile-xs">
              <Play className="w-3.5 h-3.5 fill-[#FDFAF4] ml-0.5" />
            </div>
            <div>
              <h2 className="text-xs sm:text-sm font-bold text-[#04301F] tracking-tight">
                কৃষি রিলস ও মাঠের ভিডিও
              </h2>
            </div>
          </div>
          <span className="text-[11px] font-bold text-[#04301F] hover:underline cursor-pointer flex items-center gap-1 font-mono">
            <span>সকল রিলস</span>
            <span>&rarr;</span>
          </span>
        </div>

        {/* Carousel container */}
        <div className="flex gap-3 overflow-x-auto pb-1.5 scrollbar-thin scroll-smooth snap-x snap-mandatory">
          {reels.map((reel) => (
            <div
              key={reel.id}
              onClick={() => onOpenReel(reel.id)}
              className="relative w-32 sm:w-36 h-52 sm:h-56 shrink-0 rounded-xl overflow-hidden cursor-pointer group shadow-tactile-xs border border-[#04301F]/20 snap-start transition-all hover:-translate-y-1 hover:shadow-tactile select-none"
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter') onOpenReel(reel.id);
              }}
              aria-label={`ভিডিও দেখুন: ${reel.title}`}
            >
              {/* Vibrant gradient backdrop */}
              <div className={`absolute inset-0 bg-gradient-to-b ${reel.gradientTheme} opacity-95 transition-opacity group-hover:opacity-100`} />

              {/* Creator avatar on top */}
              <div className="absolute top-2.5 left-2.5 z-10 flex items-center gap-1.5">
                <div className="w-7 h-7 rounded-full ring-2 ring-white/90 bg-[#04301F] text-[#FDFAF4] flex items-center justify-center text-[10px] font-bold">
                  {reel.creator.slice(0, 2)}
                </div>
              </div>

              {/* Center Play Button Overlay */}
              <div className="absolute inset-0 flex items-center justify-center z-10">
                <div className="w-10 h-10 rounded-full bg-[#04301F]/80 group-hover:bg-[#04301F] border-2 border-[#FDFAF4] text-white flex items-center justify-center transition-all shadow-md group-hover:scale-110">
                  <Play className="w-4 h-4 fill-white ml-0.5" />
                </div>
              </div>

              {/* Bottom details */}
              <div className="absolute inset-x-0 bottom-0 p-2.5 z-10 bg-gradient-to-t from-black/90 via-black/50 to-transparent text-white">
                <p className="text-[11px] font-bold line-clamp-2 leading-tight drop-shadow mb-1">
                  {reel.title}
                </p>
                <div className="flex items-center justify-between text-[10px] text-white/90 font-mono font-medium">
                  <span>{formatBengaliNumberCompact(reel.views)} ভিউ</span>
                  <span>{toBengaliNumerals(reel.duration)}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 2. Create Post / Share Tip Box */}
      <section
        aria-label="মাঠের তথ্য জানান"
        className="bg-white border-2 border-[#04301F]/15 rounded-2xl p-4 shadow-tactile-sm"
      >
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-[#04301F] text-[#FDFAF4] font-bold flex items-center justify-center text-xs shrink-0 shadow-tactile-xs">
            <Search className="w-4 h-4 text-emerald-300" />
          </div>
          <button
            type="button"
            onClick={onOpenCreatePost}
            className="flex-1 text-left px-4 py-2.5 bg-[#FDFAF5] hover:bg-[#F5F1E8] border border-[#04301F]/20 rounded-xl text-xs text-[#04301F]/70 font-medium transition-all truncate shadow-inner cursor-pointer"
          >
            আপনার এলাকার ফসলের রোগ, ড্রোন বা মাঠের অভিজ্ঞতা জানান...
          </button>
        </div>

        <div className="flex items-center justify-between pt-3 mt-3 border-t border-[#04301F]/10 text-xs font-semibold text-[#04301F]">
          <button
            type="button"
            onClick={onOpenCreatePost}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg hover:bg-[#04301F]/5 transition-colors text-emerald-800"
          >
            <Sparkles className="w-4 h-4 text-emerald-700" />
            <span>মাঠের আপডেট</span>
          </button>
          <button
            type="button"
            onClick={() => onSelectCategory('গবেষণা সহজ ভাষায়')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg hover:bg-[#04301F]/5 transition-colors text-[#04301F]"
          >
            <Microscope className="w-4 h-4 text-[#04301F]" />
            <span>গবেষণা প্রশ্ন</span>
          </button>
          <button
            type="button"
            onClick={onOpenCreatePost}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg hover:bg-[#04301F]/5 transition-colors text-amber-800"
          >
            <span>💡 সফল চাষাবাদ টিপস</span>
          </button>
        </div>
      </section>

      {/* 3. Feed Filter Controls */}
      <div className="flex items-center justify-between gap-2 overflow-x-auto pb-1 scrollbar-none">
        <div className="flex items-center gap-1.5 p-1.5 bg-[#F5F1E8] border border-[#04301F]/15 rounded-xl shadow-inner" role="tablist">
          {filterTabs.map((tab) => {
            const isActive = activeFilter === tab.id;
            return (
              <button
                key={tab.id}
                role="tab"
                aria-selected={isActive}
                type="button"
                onClick={() => onFilterChange(tab.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-lg transition-all whitespace-nowrap shrink-0 cursor-pointer ${
                  isActive
                    ? 'bg-[#04301F] text-[#FDFAF4] shadow-tactile-sm border border-[#04301F]'
                    : 'text-[#04301F]/80 hover:text-[#04301F] hover:bg-white/60'
                }`}
              >
                <span className={isActive ? 'text-amber-300' : 'text-[#04301F]/60'}>
                  {tab.icon}
                </span>
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Active search or category tag indicator */}
        {(searchQuery || selectedCategory !== 'সকল') && (
          <div className="flex items-center gap-1.5 text-xs font-mono text-[#04301F] whitespace-nowrap shrink-0 bg-white border border-[#04301F]/20 px-2.5 py-1 rounded-lg">
            <span className="text-[#04301F]/60">ফিল্টার:</span>
            <span className="font-bold text-[#04301F]">
              {selectedCategory !== 'সকল' ? selectedCategory : `"${searchQuery}"`}
            </span>
            <button
              type="button"
              onClick={() => {
                onClearSearch();
                onSelectCategory('সকল');
              }}
              className="text-[#04301F] hover:underline ml-1 font-bold"
            >
              [✕]
            </button>
          </div>
        )}
      </div>

      {/* 4. Article Feed List */}
      {articles.length === 0 ? (
        <div className="bg-white border-2 border-[#04301F] rounded-2xl p-10 text-center shadow-tactile-lg">
          <SearchX className="w-12 h-12 mx-auto text-[#04301F]/40 mb-3" />
          <h3 className="text-sm font-bold text-[#04301F] mb-1">কোনো প্রতিবেদন খুঁজে পাওয়া যায়নি</h3>
          <p className="text-xs text-[#04301F]/70 max-w-sm mx-auto mb-4 font-medium">
            আপনার অনুসন্ধান বা নির্বাচিত ক্যাটাগরির সাথে মিলে এমন কোনো ফলাফল নেই। অন্য কোনো শব্দ দিয়ে চেষ্টা করুন।
          </p>
          <button
            type="button"
            onClick={() => {
              onClearSearch();
              onSelectCategory('সকল');
            }}
            className="px-4 py-2 text-xs font-bold text-[#FDFAF4] bg-[#04301F] hover:bg-[#09472e] rounded-lg shadow-tactile-sm transition-all"
          >
            সব প্রতিবেদন দেখুন
          </button>
        </div>
      ) : (
        <div className="space-y-5">
          {articles.map((article, index) => {
            const isBookmarked = bookmarkedIds.includes(article.id);
            const isCommentBoxOpen = activeCommentBoxId === article.id;
            const isCopied = copiedShareId === article.id;
            const isLeadStory = index === 0 && selectedCategory === 'সকল' && !searchQuery;

            return (
              <article
                key={article.id}
                className={`bg-white border-2 rounded-2xl overflow-hidden transition-all shadow-tactile-sm hover:shadow-tactile-lg hover:-translate-y-0.5 ${
                  isLeadStory
                    ? 'border-[#04301F] ring-2 ring-[#04301F]/20'
                    : 'border-[#04301F]/20 hover:border-[#04301F]'
                }`}
              >
                {/* Visual Header Graphic */}
                <div
                  className="cursor-pointer group relative overflow-hidden"
                  onClick={() => onOpenArticle(article)}
                >
                  <ImageGraphic
                    type={article.imageType}
                    title={article.title}
                    aspect="16/9"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-[#04301F]/10 transition-colors pointer-events-none" />
                  
                  {isLeadStory && (
                    <div className="absolute top-3 left-3 z-20">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#04301F] text-[#FDFAF4] text-[11px] font-bold font-mono uppercase tracking-wider rounded-lg shadow-tactile-xs border border-[#FDFAF4]/40">
                        <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                        <span>প্রধান অনুসন্ধান · LEAD STORY</span>
                      </span>
                    </div>
                  )}
                </div>

                {/* Card Content Area */}
                <div className="p-5 sm:p-6">
                  
                  {/* Clean unboxed metadata kicker */}
                  <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#04301F] mb-2.5">
                    <span className="uppercase tracking-wider px-2 py-0.5 bg-[#04301F]/10 rounded text-[11px]">
                      {article.category}
                    </span>
                    <span aria-hidden="true" className="text-[#04301F]/30">·</span>
                    <span className="text-[#04301F]/70 font-sans font-medium">
                      {toBengaliNumerals(article.readTimeMinutes)} মিনিট পাঠ
                    </span>
                    {article.researchBasis && (
                      <>
                        <span aria-hidden="true" className="text-[#04301F]/30">·</span>
                        <span className="text-emerald-800 font-sans font-semibold">
                          বিজ্ঞানভিত্তিক প্রতিবেদন
                        </span>
                      </>
                    )}
                  </div>

                  {/* Title & Deck */}
                  <h2
                    onClick={() => onOpenArticle(article)}
                    className={`font-bold text-[#04301F] hover:text-[#09472e] transition-colors cursor-pointer leading-snug tracking-tight mb-2.5 ${
                      isLeadStory ? 'text-lg sm:text-2xl font-editorial' : 'text-base sm:text-xl font-editorial'
                    }`}
                    style={{ textWrap: 'balance' }}
                  >
                    {article.title}
                  </h2>

                  <p className="text-xs sm:text-sm text-[#04301F]/80 line-clamp-2 leading-relaxed mb-4 font-normal">
                    {article.subtitle}
                  </p>

                  {/* Key Takeaways preview for lead story */}
                  {isLeadStory && article.takeaways && article.takeaways.length > 0 && (
                    <div className="mb-4 p-3.5 bg-[#F5F1E8] border-2 border-[#04301F]/20 rounded-xl">
                      <span className="text-[11px] font-bold text-[#04301F] uppercase font-mono tracking-wider block mb-1">
                        প্রধান প্রাপ্তি ও সারসংক্ষেপ:
                      </span>
                      <p className="text-xs text-[#04301F] leading-relaxed flex items-start gap-2 font-medium">
                        <span className="w-2 h-2 rounded-full bg-[#04301F] mt-1 shrink-0" />
                        <span>{article.takeaways[0]}</span>
                      </p>
                    </div>
                  )}

                  {/* Author Byline */}
                  <div className="flex items-center justify-between gap-3 pt-3.5 border-t border-[#04301F]/15 mb-3.5">
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div className="w-8 h-8 rounded-lg bg-[#04301F] text-[#FDFAF4] font-bold flex items-center justify-center text-xs shrink-0 shadow-tactile-xs">
                        {article.author.name.slice(0, 2)}
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs font-bold text-[#04301F] truncate">
                          {article.author.name}
                        </p>
                        <p className="text-[10px] text-[#04301F]/60 truncate font-mono">
                          {article.author.organization}
                        </p>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => onOpenArticle(article)}
                      className="inline-flex items-center gap-1 text-xs font-bold text-[#04301F] hover:text-[#09472e] shrink-0 border-b border-[#04301F] pb-0.5 hover:border-b-2 transition-all"
                    >
                      <span>সম্পূর্ণ পড়ুন</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Interactive Reactions Strip */}
                  <div className="flex items-center justify-between pt-2.5 border-t border-[#04301F]/10 text-[#04301F]">
                    <div className="flex items-center gap-1.5 sm:gap-2">
                      {/* Like Reaction */}
                      <button
                        type="button"
                        onClick={() => onToggleLike(article)}
                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                          article.userLiked
                            ? 'text-rose-600 bg-rose-50 border border-rose-200'
                            : 'hover:bg-[#04301F]/10 text-[#04301F] border border-transparent'
                        }`}
                        aria-label={`লাইক করুন (${formatBengaliNumberCompact(article.stats.likes)})`}
                      >
                        <Heart className={`w-4 h-4 ${article.userLiked ? 'fill-rose-600' : ''}`} />
                        <span className="font-mono tabular-nums">
                          {formatBengaliNumberCompact(article.stats.likes)}
                        </span>
                      </button>

                      {/* Comments toggle */}
                      <button
                        type="button"
                        onClick={() => toggleCommentBox(article.id)}
                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                          isCommentBoxOpen
                            ? 'bg-[#04301F] text-[#FDFAF4] shadow-tactile-xs border border-[#04301F]'
                            : 'hover:bg-[#04301F]/10 text-[#04301F] border border-transparent'
                        }`}
                        aria-label={`মন্তব্য দেখুন (${toBengaliNumerals(article.comments.length)})`}
                      >
                        <MessageCircle className="w-4 h-4" />
                        <span className="font-mono tabular-nums">
                          {toBengaliNumerals(article.comments.length)}
                        </span>
                      </button>

                      {/* Share */}
                      <button
                        type="button"
                        onClick={() => handleShareArticle(article.id)}
                        className="relative flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold hover:bg-[#04301F]/10 text-[#04301F] transition-all border border-transparent"
                        aria-label="প্রতিবেদন লিংক কপি করুন"
                      >
                        <Share2 className="w-4 h-4" />
                        <span className="hidden sm:inline font-mono tabular-nums">
                          {toBengaliNumerals(article.stats.shares)}
                        </span>
                        {isCopied && (
                          <span className="absolute -top-7 left-1/2 -translate-x-1/2 text-[10px] bg-[#04301F] text-[#FDFAF4] px-2 py-0.5 rounded shadow whitespace-nowrap font-mono font-bold">
                            কপি হয়েছে!
                          </span>
                        )}
                      </button>
                    </div>

                    {/* Bookmark */}
                    <button
                      type="button"
                      onClick={() => onToggleBookmark(article.id)}
                      className={`p-2 rounded-lg transition-all ${
                        isBookmarked
                          ? 'text-amber-800 bg-amber-100 border border-amber-300'
                          : 'text-[#04301F]/60 hover:text-[#04301F] hover:bg-[#04301F]/10'
                      }`}
                      title={isBookmarked ? 'সংরক্ষিত' : 'সংরক্ষণ করুন'}
                      aria-label={isBookmarked ? 'সংরক্ষণ বাতিল' : 'সংরক্ষণ করুন'}
                    >
                      <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-amber-600' : ''}`} />
                    </button>
                  </div>

                  {/* Expandable Inline Comments Area */}
                  {isCommentBoxOpen && (
                    <div className="mt-3.5 pt-3.5 border-t border-[#04301F]/15 space-y-3 animate-in fade-in duration-150">
                      {/* Comments stream */}
                      {article.comments.length > 0 && (
                        <div className="space-y-2 max-h-48 overflow-y-auto pr-1 text-xs scrollbar-none">
                          {article.comments.map((comm) => (
                            <div key={comm.id} className="p-3 rounded-xl bg-[#FDFAF5] border border-[#04301F]/20">
                              <div className="flex items-center justify-between mb-1">
                                <span className="font-bold text-[#04301F]">{comm.author}</span>
                                <span className="text-[10px] text-[#04301F]/50 font-mono">{comm.timestamp}</span>
                              </div>
                              <p className="text-[#04301F]/80 font-medium">{comm.text}</p>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Comment Input */}
                      <form
                        onSubmit={(e) => handleInlineCommentSubmit(article.id, e)}
                        className="flex items-center gap-2"
                      >
                        <input
                          type="text"
                          value={inlineCommentInputs[article.id] || ''}
                          onChange={(e) =>
                            setInlineCommentInputs((prev) => ({
                              ...prev,
                              [article.id]: e.target.value,
                            }))
                          }
                          placeholder="আপনার পর্যবেক্ষণ বা মতামত লিখুন..."
                          className="flex-1 px-3 py-2 text-xs bg-[#FDFAF5] border border-[#04301F]/20 rounded-lg text-[#04301F] placeholder:text-[#04301F]/40 focus:outline-none focus:border-[#04301F] font-medium"
                        />
                        <button
                          type="submit"
                          disabled={!inlineCommentInputs[article.id]?.trim()}
                          className="px-3.5 py-2 text-xs font-bold text-[#FDFAF4] bg-[#04301F] hover:bg-[#09472e] disabled:opacity-40 rounded-lg transition-all shadow-tactile-xs flex items-center gap-1 cursor-pointer"
                        >
                          <Send className="w-3.5 h-3.5" />
                          <span>পাঠান</span>
                        </button>
                      </form>
                    </div>
                  )}

                </div>
              </article>
            );
          })}
        </div>
      )}

    </main>
  );
};
