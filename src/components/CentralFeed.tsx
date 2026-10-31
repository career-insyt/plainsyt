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
  Layers,
  FileText,
  Video,
  ExternalLink,
  CheckCircle2,
  Globe,
  Radio,
} from 'lucide-react';
import {
  Article,
  StoryReel,
  FeedFilter,
  ArticleCategory,
  Comment,
  CommunityPost,
  TopicStory,
  FormatFilter,
} from '../types/index.ts';
import { ImageGraphic } from './ImageGraphic.tsx';
import { TopicStoriesCarousel } from './TopicStoriesCarousel.tsx';
import { PostCreatorBar } from './PostCreatorBar.tsx';
import { CommunityPostCard } from './CommunityPostCard.tsx';
import { IntegratedReelCard } from './IntegratedReelCard.tsx';
import { TOPIC_STORIES, COMMUNITY_POSTS } from '../data/mockData.ts';
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
  onOpenWriteArticle?: () => void;
  onOpenUploadVideo?: () => void;
  onOpenAskAI?: () => void;
  onOpenCreateStory?: () => void;
  bookmarkedIds: string[];
  onToggleBookmark: (id: string) => void;
  onToggleLike: (article: Article) => void;
  onAddComment: (articleId: string, comment: Comment) => void;
  searchQuery: string;
  onClearSearch: () => void;
  communityPosts?: CommunityPost[];
  onTogglePostLike?: (postId: string) => void;
  onTogglePostSave?: (postId: string) => void;
  onAddPostComment?: (postId: string, comment: Comment) => void;
  topicStories?: TopicStory[];
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
  onOpenWriteArticle,
  onOpenUploadVideo,
  onOpenAskAI,
  onOpenCreateStory,
  bookmarkedIds,
  onToggleBookmark,
  onToggleLike,
  onAddComment,
  searchQuery,
  onClearSearch,
  communityPosts = COMMUNITY_POSTS,
  onTogglePostLike,
  onTogglePostSave,
  onAddPostComment,
  topicStories = TOPIC_STORIES,
}) => {
  // Format filter state ('all' | 'articles' | 'posts' | 'reels' | 'research')
  const [activeFormat, setActiveFormat] = useState<FormatFilter>('all');
  
  // Inline article comment states
  const [activeCommentBoxId, setActiveCommentBoxId] = useState<string | null>(null);
  const [inlineCommentInputs, setInlineCommentInputs] = useState<Record<string, string>>({});
  const [copiedShareId, setCopiedShareId] = useState<string | null>(null);

  // Local post state fallback if handlers not provided
  const [localPosts, setLocalPosts] = useState<CommunityPost[]>(communityPosts);

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
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&h=100&q=80',
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

  const handlePostLike = (postId: string) => {
    if (onTogglePostLike) {
      onTogglePostLike(postId);
    } else {
      setLocalPosts((prev) =>
        prev.map((p) => {
          if (p.id === postId) {
            const userLiked = !p.userLiked;
            return {
              ...p,
              userLiked,
              stats: {
                ...p.stats,
                likes: userLiked ? p.stats.likes + 1 : p.stats.likes - 1,
              },
            };
          }
          return p;
        })
      );
    }
  };

  const handlePostSave = (postId: string) => {
    if (onTogglePostSave) {
      onTogglePostSave(postId);
    } else {
      setLocalPosts((prev) =>
        prev.map((p) => (p.id === postId ? { ...p, userSaved: !p.userSaved } : p))
      );
    }
  };

  const handlePostAddComment = (postId: string, comment: Comment) => {
    if (onAddPostComment) {
      onAddPostComment(postId, comment);
    } else {
      setLocalPosts((prev) =>
        prev.map((p) => {
          if (p.id === postId) {
            return {
              ...p,
              comments: [comment, ...p.comments],
              stats: {
                ...p.stats,
                commentsCount: p.stats.commentsCount + 1,
              },
            };
          }
          return p;
        })
      );
    }
  };

  const streamTabs: { id: FeedFilter; label: string; icon: React.ReactNode }[] = [
    { id: 'trending', label: 'For You', icon: <Sparkles className="w-3.5 h-3.5" /> },
    { id: 'latest', label: 'Following', icon: <Clock className="w-3.5 h-3.5" /> },
    { id: 'research', label: 'Research', icon: <Microscope className="w-3.5 h-3.5" /> },
    { id: 'field-stories', label: 'Field Stories', icon: <Compass className="w-3.5 h-3.5" /> },
  ];

  const formatFilters: { id: FormatFilter; label: string; count?: string; icon: React.ReactNode }[] = [
    { id: 'all', label: 'All', count: '1.4K', icon: <Layers className="w-3.5 h-3.5" /> },
    { id: 'articles', label: 'Articles', count: '850', icon: <FileText className="w-3.5 h-3.5" /> },
    { id: 'posts', label: 'Posts', count: '420', icon: <MessageCircle className="w-3.5 h-3.5" /> },
    { id: 'reels', label: 'Reels', count: '180', icon: <Video className="w-3.5 h-3.5" /> },
    { id: 'research', label: 'Research', count: '45', icon: <Microscope className="w-3.5 h-3.5" /> },
  ];

  const activePostList = communityPosts.length > 0 ? communityPosts : localPosts;

  // Filter items based on format filter
  const showArticles = activeFormat === 'all' || activeFormat === 'articles' || activeFormat === 'research';
  const showPosts = activeFormat === 'all' || activeFormat === 'posts';
  const showReelsOnly = activeFormat === 'reels';

  return (
    <main className="flex-1 max-w-3xl xl:max-w-4xl py-3 sm:py-4 space-y-4 sm:space-y-5 min-w-0 font-sans" id="main-content">
      
      {/* 1. Post Creator Bar (Mobile Facebook pill + Desktop action bar) */}
      <PostCreatorBar
        onOpenWriteArticle={onOpenWriteArticle || onOpenCreatePost}
        onOpenCreatePost={onOpenCreatePost}
        onOpenUploadVideo={onOpenUploadVideo || onOpenCreatePost}
        onOpenAskAI={onOpenAskAI || onOpenCreatePost}
        onOpenLiveEvents={onOpenCreatePost}
        userName="হাসান"
        userAvatar="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&h=120&q=80"
      />

      {/* 2. Visual Topic Stories Carousel (Mobile FB Story cards with '+ Create story' & Desktop cards) */}
      <TopicStoriesCarousel
        stories={topicStories}
        selectedCategory={selectedCategory}
        onSelectCategory={onSelectCategory}
        onOpenCreateStory={onOpenCreateStory || onOpenCreatePost}
      />

      {/* 3. Dual-Layer Filter System */}
      <div className="space-y-2.5 bg-white sm:bg-transparent border sm:border-0 border-[#04301F]/15 rounded-2xl p-2.5 sm:p-0 shadow-tactile-xs sm:shadow-none">
        
        {/* Layer 1: Stream Mode (For You / Following / Research / Field Stories) */}
        <div className="flex items-center justify-between gap-2 overflow-x-auto pb-1 scrollbar-none">
          <div className="flex items-center gap-1.5 p-1 bg-[#F5F1E8] border border-[#04301F]/15 rounded-xl shadow-inner" role="tablist">
            {streamTabs.map((tab) => {
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
              <span className="text-[#04301F]/60">Filter:</span>
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

        {/* Layer 2: Format Filter Pills (All / Articles / Posts / Reels / Research) */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          {formatFilters.map((fmt) => {
            const isActive = activeFormat === fmt.id;
            return (
              <button
                key={fmt.id}
                type="button"
                onClick={() => setActiveFormat(fmt.id)}
                className={`flex items-center gap-1.5 px-3 py-1 text-xs font-bold rounded-full transition-all shrink-0 cursor-pointer ${
                  isActive
                    ? 'bg-emerald-800 text-white shadow-tactile-xs'
                    : 'bg-white hover:bg-emerald-50 text-gray-700 border border-gray-200'
                }`}
              >
                {fmt.icon}
                <span>{fmt.label}</span>
                {fmt.count && (
                  <span
                    className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                      isActive ? 'bg-emerald-950 text-emerald-200' : 'bg-gray-100 text-gray-600'
                    }`}
                  >
                    {fmt.count}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* 4. REELS VIEW ONLY (if user clicked 'Reels' pill) */}
      {showReelsOnly && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <IntegratedReelCard
              reel={reels[0]}
              onOpenReel={onOpenReel}
            />
            <IntegratedReelCard
              reel={reels[1]}
              onOpenReel={onOpenReel}
            />
          </div>
        </div>
      )}

      {/* 5. MAIN FEED STREAM (Articles, Community Posts, & In-Feed Reels) */}
      {!showReelsOnly && (
        <div className="space-y-4 sm:space-y-5">
          
          {/* Zero results placeholder */}
          {articles.length === 0 && activePostList.length === 0 ? (
            <div className="bg-white border-2 border-[#04301F] rounded-2xl p-10 text-center shadow-tactile-lg">
              <SearchX className="w-12 h-12 mx-auto text-[#04301F]/40 mb-3" />
              <h3 className="text-sm font-bold text-[#04301F] mb-1">কোনো প্রতিবেদন বা পোস্ট পাওয়া যায়নি</h3>
              <p className="text-xs text-[#04301F]/70 max-w-sm mx-auto mb-4 font-medium">
                আপনার অনুসন্ধান বা ফিল্টারের সাথে মিলে এমন কোনো ফলাফল নেই।
              </p>
              <button
                type="button"
                onClick={() => {
                  onClearSearch();
                  onSelectCategory('সকল');
                  setActiveFormat('all');
                }}
                className="px-4 py-2 text-xs font-bold text-[#FDFAF4] bg-[#04301F] hover:bg-[#09472e] rounded-lg shadow-tactile-sm transition-all cursor-pointer"
              >
                সব প্রতিবেদন ও পোস্ট দেখুন
              </button>
            </div>
          ) : (
            <>
              {/* DESKTOP SPLIT VIEW: Hero Article + Integrated Reel Card */}
              {showArticles && articles.length > 0 && activeFormat === 'all' && (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start">
                  
                  {/* Left Column: Hero Lead Article (7 or 8 cols on desktop) */}
                  <div className="lg:col-span-7 xl:col-span-7">
                    {(() => {
                      const leadArticle = articles[0];
                      const isBookmarked = bookmarkedIds.includes(leadArticle.id);
                      const isCommentBoxOpen = activeCommentBoxId === leadArticle.id;
                      const isCopied = copiedShareId === leadArticle.id;

                      return (
                        <article className="bg-white border-2 border-[#04301F] rounded-2xl overflow-hidden shadow-tactile-sm hover:shadow-tactile-lg transition-all h-full flex flex-col justify-between">
                          <div>
                            {/* Visual Graphic Header */}
                            <div
                              className="cursor-pointer group relative overflow-hidden"
                              onClick={() => onOpenArticle(leadArticle)}
                            >
                              <ImageGraphic
                                type={leadArticle.imageType}
                                title={leadArticle.title}
                                aspect="16/9"
                              />
                              <div className="absolute inset-0 bg-black/0 group-hover:bg-[#04301F]/10 transition-colors pointer-events-none" />
                              <div className="absolute top-3 left-3 z-20">
                                <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#04301F] text-[#FDFAF4] text-[11px] font-bold font-mono uppercase tracking-wider rounded-lg shadow-tactile-xs border border-[#FDFAF4]/40">
                                  <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                                  <span>প্রধান অনুসন্ধান · LEAD STORY</span>
                                </span>
                              </div>
                            </div>

                            {/* Content */}
                            <div className="p-4 sm:p-5">
                              <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#04301F] mb-2">
                                <span className="uppercase tracking-wider px-2 py-0.5 bg-[#04301F]/10 rounded text-[11px]">
                                  {leadArticle.category}
                                </span>
                                <span className="text-[#04301F]/30">·</span>
                                <span className="text-[#04301F]/70 font-sans font-medium">
                                  {toBengaliNumerals(leadArticle.readTimeMinutes)} মিনিট পাঠ
                                </span>
                              </div>

                              <h2
                                onClick={() => onOpenArticle(leadArticle)}
                                className="font-bold text-[#04301F] hover:text-emerald-800 transition-colors cursor-pointer leading-snug tracking-tight text-base sm:text-xl font-editorial mb-2"
                              >
                                {leadArticle.title}
                              </h2>

                              <p className="text-xs sm:text-sm text-[#04301F]/80 line-clamp-3 leading-relaxed mb-3">
                                {leadArticle.subtitle}
                              </p>

                              {/* Author Byline */}
                              <div className="flex items-center justify-between gap-3 pt-3 border-t border-[#04301F]/15 mb-3">
                                <div className="flex items-center gap-2 min-w-0">
                                  <div className="w-8 h-8 rounded-lg bg-[#04301F] text-[#FDFAF4] font-bold flex items-center justify-center text-xs shrink-0 shadow-tactile-xs">
                                    {leadArticle.author.name.slice(0, 2)}
                                  </div>
                                  <div className="min-w-0">
                                    <p className="text-xs font-bold text-[#04301F] truncate">
                                      {leadArticle.author.name}
                                    </p>
                                    <p className="text-[10px] text-[#04301F]/60 truncate font-mono">
                                      {leadArticle.author.organization}
                                    </p>
                                  </div>
                                </div>

                                <button
                                  type="button"
                                  onClick={() => onOpenArticle(leadArticle)}
                                  className="inline-flex items-center gap-1 text-xs font-bold text-[#04301F] hover:text-emerald-800 shrink-0 border-b border-[#04301F] pb-0.5"
                                >
                                  <span>সম্পূর্ণ পড়ুন</span>
                                  <ChevronRight className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            </div>
                          </div>

                          {/* Action Strip */}
                          <div className="px-4 pb-3 sm:px-5 sm:pb-4">
                            <div className="flex items-center justify-between pt-2.5 border-t border-[#04301F]/10 text-[#04301F]">
                              <div className="flex items-center gap-1.5 sm:gap-2">
                                <button
                                  type="button"
                                  onClick={() => onToggleLike(leadArticle)}
                                  className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                                    leadArticle.userLiked
                                      ? 'text-rose-600 bg-rose-50 border border-rose-200'
                                      : 'hover:bg-[#04301F]/10 text-[#04301F]'
                                  }`}
                                >
                                  <Heart className={`w-4 h-4 ${leadArticle.userLiked ? 'fill-rose-600' : ''}`} />
                                  <span className="font-mono tabular-nums">
                                    {formatBengaliNumberCompact(leadArticle.stats.likes)}
                                  </span>
                                </button>

                                <button
                                  type="button"
                                  onClick={() => toggleCommentBox(leadArticle.id)}
                                  className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                                    isCommentBoxOpen
                                      ? 'bg-[#04301F] text-[#FDFAF4]'
                                      : 'hover:bg-[#04301F]/10 text-[#04301F]'
                                  }`}
                                >
                                  <MessageCircle className="w-4 h-4" />
                                  <span className="font-mono tabular-nums">
                                    {toBengaliNumerals(leadArticle.comments.length)}
                                  </span>
                                </button>

                                <button
                                  type="button"
                                  onClick={() => handleShareArticle(leadArticle.id)}
                                  className="relative flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-bold hover:bg-[#04301F]/10 text-[#04301F]"
                                >
                                  <Share2 className="w-4 h-4" />
                                  {isCopied && (
                                    <span className="absolute -top-7 left-1/2 -translate-x-1/2 text-[10px] bg-[#04301F] text-[#FDFAF4] px-2 py-0.5 rounded shadow whitespace-nowrap font-mono font-bold">
                                      কপি হয়েছে!
                                    </span>
                                  )}
                                </button>
                              </div>

                              <button
                                type="button"
                                onClick={() => onToggleBookmark(leadArticle.id)}
                                className={`p-1.5 rounded-lg transition-all ${
                                  isBookmarked
                                    ? 'text-amber-800 bg-amber-100 border border-amber-300'
                                    : 'text-[#04301F]/60 hover:text-[#04301F] hover:bg-[#04301F]/10'
                                }`}
                              >
                                <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-amber-600' : ''}`} />
                              </button>
                            </div>
                          </div>
                        </article>
                      );
                    })()}
                  </div>

                  {/* Right Column: Integrated Reel Card (5 cols on desktop) */}
                  <div className="lg:col-span-5 xl:col-span-5">
                    <IntegratedReelCard
                      reel={reels[0]}
                      onOpenReel={onOpenReel}
                    />
                  </div>
                </div>
              )}

              {/* COMMUNITY POST 1: Mehedi Hasan IoT Field Visit (with 3-photo grid) */}
              {showPosts && activePostList.length > 0 && (
                <CommunityPostCard
                  post={activePostList[0]}
                  onToggleLike={handlePostLike}
                  onToggleSave={handlePostSave}
                  onAddComment={handlePostAddComment}
                />
              )}

              {/* COMMUNITY POST 2: AL Amin Nur (Facebook screenshot quote post!) */}
              {showPosts && activePostList.length > 1 && (
                <CommunityPostCard
                  post={activePostList[1]}
                  onToggleLike={handlePostLike}
                  onToggleSave={handlePostSave}
                  onAddComment={handlePostAddComment}
                />
              )}

              {/* FACEBOOK STYLED INSTITUTIONAL RESEARCH CARD (Matching screenshot bottom card) */}
              <article className="bg-white border-2 border-[#04301F]/15 rounded-2xl p-4 sm:p-5 shadow-tactile-sm">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-emerald-900 text-white font-bold flex items-center justify-center text-xs ring-2 ring-emerald-500/30">
                      ircb
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <h4 className="text-xs sm:text-sm font-bold text-[#04301F]">
                          International Research Collaboration Bangladesh - ircb
                        </h4>
                        <CheckCircle2 className="w-4 h-4 text-blue-600 fill-blue-100 shrink-0" />
                      </div>
                      <div className="flex items-center gap-1.5 text-[11px] text-gray-500 font-mono">
                        <span>Ad · Research Grant</span>
                        <span>•</span>
                        <Globe className="w-3 h-3 text-gray-400" />
                      </div>
                    </div>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-gray-800 leading-relaxed mb-3">
                  ২০২৬-২৭ অর্থবছরের জন্য কৃষি বায়োটেকনোলজি ও ড্রোন মাল্টিস্পেকট্রাল অ্যানালাইসিসে যৌথ গবেষণা প্রস্তাব আহ্বান করা হচ্ছে। নির্বাচিত ১০টি বাংলাদেশি গবেষক দলকে আন্তর্জাতিক ফান্ডিং ও ফিল্ড ইকুইপমেন্ট প্রদান করা হবে।
                </p>

                <button
                  type="button"
                  onClick={() => {
                    if (articles.length > 1) onOpenArticle(articles[1]);
                  }}
                  className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-bold text-xs sm:text-sm rounded-xl transition-all shadow-tactile-xs flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Open Call & Guidelines</span>
                  <ExternalLink className="w-4 h-4" />
                </button>
              </article>

              {/* SUBSEQUENT ARTICLES */}
              {showArticles &&
                articles.slice(1).map((article) => {
                  const isBookmarked = bookmarkedIds.includes(article.id);
                  const isCommentBoxOpen = activeCommentBoxId === article.id;
                  const isCopied = copiedShareId === article.id;

                  return (
                    <article
                      key={article.id}
                      className="bg-white border-2 border-[#04301F]/20 hover:border-[#04301F] rounded-2xl overflow-hidden transition-all shadow-tactile-sm hover:shadow-tactile-lg hover:-translate-y-0.5"
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
                      </div>

                      {/* Card Content Area */}
                      <div className="p-4 sm:p-6">
                        <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#04301F] mb-2.5">
                          <span className="uppercase tracking-wider px-2 py-0.5 bg-[#04301F]/10 rounded text-[11px]">
                            {article.category}
                          </span>
                          <span className="text-[#04301F]/30">·</span>
                          <span className="text-[#04301F]/70 font-sans font-medium">
                            {toBengaliNumerals(article.readTimeMinutes)} মিনিট পাঠ
                          </span>
                          {article.researchBasis && (
                            <>
                              <span className="text-[#04301F]/30">·</span>
                              <span className="text-emerald-800 font-sans font-semibold">
                                বিজ্ঞানভিত্তিক প্রতিবেদন
                              </span>
                            </>
                          )}
                        </div>

                        <h2
                          onClick={() => onOpenArticle(article)}
                          className="font-bold text-[#04301F] hover:text-emerald-800 transition-colors cursor-pointer leading-snug tracking-tight mb-2.5 text-base sm:text-xl font-editorial"
                        >
                          {article.title}
                        </h2>

                        <p className="text-xs sm:text-sm text-[#04301F]/80 line-clamp-2 leading-relaxed mb-4 font-normal">
                          {article.subtitle}
                        </p>

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
                            className="inline-flex items-center gap-1 text-xs font-bold text-[#04301F] hover:text-[#09472e] shrink-0 border-b border-[#04301F] pb-0.5 hover:border-b-2 transition-all cursor-pointer"
                          >
                            <span>সম্পূর্ণ পড়ুন</span>
                            <ChevronRight className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        {/* Interactive Reactions Strip */}
                        <div className="flex items-center justify-between pt-2.5 border-t border-[#04301F]/10 text-[#04301F]">
                          <div className="flex items-center gap-1.5 sm:gap-2">
                            <button
                              type="button"
                              onClick={() => onToggleLike(article)}
                              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                                article.userLiked
                                  ? 'text-rose-600 bg-rose-50 border border-rose-200'
                                  : 'hover:bg-[#04301F]/10 text-[#04301F] border border-transparent'
                              }`}
                            >
                              <Heart className={`w-4 h-4 ${article.userLiked ? 'fill-rose-600' : ''}`} />
                              <span className="font-mono tabular-nums">
                                {formatBengaliNumberCompact(article.stats.likes)}
                              </span>
                            </button>

                            <button
                              type="button"
                              onClick={() => toggleCommentBox(article.id)}
                              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                                isCommentBoxOpen
                                  ? 'bg-[#04301F] text-[#FDFAF4] shadow-tactile-xs border border-[#04301F]'
                                  : 'hover:bg-[#04301F]/10 text-[#04301F] border border-transparent'
                              }`}
                            >
                              <MessageCircle className="w-4 h-4" />
                              <span className="font-mono tabular-nums">
                                {toBengaliNumerals(article.comments.length)}
                              </span>
                            </button>

                            <button
                              type="button"
                              onClick={() => handleShareArticle(article.id)}
                              className="relative flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold hover:bg-[#04301F]/10 text-[#04301F] transition-all border border-transparent cursor-pointer"
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

                          <button
                            type="button"
                            onClick={() => onToggleBookmark(article.id)}
                            className={`p-2 rounded-lg transition-all cursor-pointer ${
                              isBookmarked
                                ? 'text-amber-800 bg-amber-100 border border-amber-300'
                                : 'text-[#04301F]/60 hover:text-[#04301F] hover:bg-[#04301F]/10'
                            }`}
                          >
                            <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-amber-600' : ''}`} />
                          </button>
                        </div>

                        {/* Inline Comments */}
                        {isCommentBoxOpen && (
                          <div className="mt-3.5 pt-3.5 border-t border-[#04301F]/15 space-y-3 animate-in fade-in duration-150">
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

              {/* COMMUNITY POST 3: Dr. Nusrat Jahan Saline Soil Note */}
              {showPosts && activePostList.length > 2 && (
                <CommunityPostCard
                  post={activePostList[2]}
                  onToggleLike={handlePostLike}
                  onToggleSave={handlePostSave}
                  onAddComment={handlePostAddComment}
                />
              )}
            </>
          )}
        </div>
      )}

    </main>
  );
};
