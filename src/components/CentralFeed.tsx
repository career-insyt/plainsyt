import React, { useState } from 'react';
import {
  Heart,
  MessageCircle,
  Share2,
  Bookmark,
  ChevronRight,
  Sparkles,
  Send,
  SearchX,
  ExternalLink,
  CheckCircle2,
  Globe,
} from 'lucide-react';
import {
  Article,
  StoryReel,
  ArticleCategory,
  Comment,
  CommunityPost,
  TopicStory,
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
  // Inline article comment states
  const [activeCommentBoxId, setActiveCommentBoxId] = useState<string | null>(null);
  const [inlineCommentInputs, setInlineCommentInputs] = useState<Record<string, string>>({});
  const [copiedShareId, setCopiedShareId] = useState<string | null>(null);

  // Local post state fallback
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

  const activePostList = communityPosts.length > 0 ? communityPosts : localPosts;

  return (
    <main
      className="w-full max-w-[620px] lg:max-w-[640px] xl:max-w-[660px] mx-auto py-3 sm:py-4 space-y-4 sm:space-y-5 min-w-0 font-sans"
      id="main-content"
    >
      {/* 1. Post Creator Bar (Mobile Facebook pill + Desktop action buttons without live event) */}
      <PostCreatorBar
        onOpenWriteArticle={onOpenWriteArticle || onOpenCreatePost}
        onOpenCreatePost={onOpenCreatePost}
        onOpenUploadVideo={onOpenUploadVideo || onOpenCreatePost}
        onOpenAskAI={onOpenAskAI || onOpenCreatePost}
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

      {/* 3. Social Feed Stream (Zero Filter Tabs, Clean Continuous Stream) */}
      <div className="space-y-4 sm:space-y-5">
        {/* Zero results placeholder if empty */}
        {articles.length === 0 && activePostList.length === 0 ? (
          <div className="bg-white border-2 border-[#04301F] rounded-2xl p-10 text-center shadow-tactile-lg">
            <SearchX className="w-12 h-12 mx-auto text-[#04301F]/40 mb-3" />
            <h3 className="text-sm font-bold text-[#04301F] mb-1">কোনো প্রতিবেদন বা পোস্ট পাওয়া যায়নি</h3>
            <p className="text-xs text-[#04301F]/70 max-w-sm mx-auto mb-4 font-medium">
              আপনার অনুসন্ধানের সাথে মিলে এমন কোনো ফলাফল নেই।
            </p>
            <button
              type="button"
              onClick={() => {
                onClearSearch();
                onSelectCategory('সকল');
              }}
              className="px-4 py-2 text-xs font-bold text-[#FDFAF4] bg-[#04301F] hover:bg-[#09472e] rounded-lg shadow-tactile-sm transition-all cursor-pointer"
            >
              সব প্রতিবেদন ও পোস্ট দেখুন
            </button>
          </div>
        ) : (
          <>
            {/* HERO LEAD ARTICLE CARD */}
            {articles.length > 0 && (() => {
              const leadArticle = articles[0];
              const isBookmarked = bookmarkedIds.includes(leadArticle.id);
              const isCommentBoxOpen = activeCommentBoxId === leadArticle.id;
              const isCopied = copiedShareId === leadArticle.id;

              return (
                <article className="bg-white border-2 border-[#04301F] rounded-2xl overflow-hidden shadow-tactile-sm hover:shadow-tactile-lg transition-all">
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
                        className="inline-flex items-center gap-1 text-xs font-bold text-[#04301F] hover:text-emerald-800 shrink-0 border-b border-[#04301F] pb-0.5 cursor-pointer"
                      >
                        <span>সম্পূর্ণ পড়ুন</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {/* Action Strip */}
                    <div className="flex items-center justify-between pt-2.5 border-t border-[#04301F]/10 text-[#04301F]">
                      <div className="flex items-center gap-1.5 sm:gap-2">
                        <button
                          type="button"
                          onClick={() => onToggleLike(leadArticle)}
                          className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
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
                          className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
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
                          className="relative flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-bold hover:bg-[#04301F]/10 text-[#04301F] cursor-pointer"
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
                        className={`p-1.5 rounded-lg transition-all cursor-pointer ${
                          isBookmarked
                            ? 'text-amber-800 bg-amber-100 border border-amber-300'
                            : 'text-[#04301F]/60 hover:text-[#04301F] hover:bg-[#04301F]/10'
                        }`}
                      >
                        <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-amber-600' : ''}`} />
                      </button>
                    </div>

                    {/* Inline Comment Box */}
                    {isCommentBoxOpen && (
                      <div className="mt-3.5 pt-3.5 border-t border-[#04301F]/15 space-y-3">
                        <form
                          onSubmit={(e) => handleInlineCommentSubmit(leadArticle.id, e)}
                          className="flex items-center gap-2"
                        >
                          <input
                            type="text"
                            value={inlineCommentInputs[leadArticle.id] || ''}
                            onChange={(e) =>
                              setInlineCommentInputs((prev) => ({
                                ...prev,
                                [leadArticle.id]: e.target.value,
                              }))
                            }
                            placeholder="আপনার পর্যবেক্ষণ বা মতামত লিখুন..."
                            className="flex-1 px-3 py-2 text-xs bg-[#FDFAF5] border border-[#04301F]/20 rounded-lg text-[#04301F] placeholder:text-[#04301F]/40 focus:outline-none focus:border-[#04301F] font-medium"
                          />
                          <button
                            type="submit"
                            disabled={!inlineCommentInputs[leadArticle.id]?.trim()}
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
            })()}

            {/* COMMUNITY POST 1: Mehedi Hasan IoT Field Visit (with 3-photo grid) */}
            {activePostList.length > 0 && (
              <CommunityPostCard
                post={activePostList[0]}
                onToggleLike={handlePostLike}
                onToggleSave={handlePostSave}
                onAddComment={handlePostAddComment}
              />
            )}

            {/* INTEGRATED REEL CARD (In-feed Vertical Video) */}
            {reels.length > 0 && (
              <IntegratedReelCard
                reel={reels[0]}
                onOpenReel={onOpenReel}
              />
            )}

            {/* COMMUNITY POST 2: AL Amin Nur (Facebook screenshot quote post) */}
            {activePostList.length > 1 && (
              <CommunityPostCard
                post={activePostList[1]}
                onToggleLike={handlePostLike}
                onToggleSave={handlePostSave}
                onAddComment={handlePostAddComment}
              />
            )}

            {/* INSTITUTIONAL RESEARCH CARD (IRCB Bangladesh) */}
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
            {articles.slice(1).map((article) => {
              const isBookmarked = bookmarkedIds.includes(article.id);
              const isCommentBoxOpen = activeCommentBoxId === article.id;
              const isCopied = copiedShareId === article.id;

              return (
                <article
                  key={article.id}
                  className="bg-white border-2 border-[#04301F]/20 hover:border-[#04301F] rounded-2xl overflow-hidden transition-all shadow-tactile-sm hover:shadow-tactile-lg"
                >
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

                  <div className="p-4 sm:p-5">
                    <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#04301F] mb-2">
                      <span className="uppercase tracking-wider px-2 py-0.5 bg-[#04301F]/10 rounded text-[11px]">
                        {article.category}
                      </span>
                      <span className="text-[#04301F]/30">·</span>
                      <span className="text-[#04301F]/70 font-sans font-medium">
                        {toBengaliNumerals(article.readTimeMinutes)} মিনিট পাঠ
                      </span>
                    </div>

                    <h2
                      onClick={() => onOpenArticle(article)}
                      className="font-bold text-[#04301F] hover:text-emerald-800 transition-colors cursor-pointer leading-snug tracking-tight mb-2 text-base sm:text-xl font-editorial"
                    >
                      {article.title}
                    </h2>

                    <p className="text-xs sm:text-sm text-[#04301F]/80 line-clamp-2 leading-relaxed mb-3">
                      {article.subtitle}
                    </p>

                    <div className="flex items-center justify-between gap-3 pt-3 border-t border-[#04301F]/15 mb-3">
                      <div className="flex items-center gap-2 min-w-0">
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
                        className="inline-flex items-center gap-1 text-xs font-bold text-[#04301F] hover:text-[#09472e] shrink-0 border-b border-[#04301F] pb-0.5 cursor-pointer"
                      >
                        <span>সম্পূর্ণ পড়ুন</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="flex items-center justify-between pt-2.5 border-t border-[#04301F]/10 text-[#04301F]">
                      <div className="flex items-center gap-1.5 sm:gap-2">
                        <button
                          type="button"
                          onClick={() => onToggleLike(article)}
                          className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                            article.userLiked
                              ? 'text-rose-600 bg-rose-50 border border-rose-200'
                              : 'hover:bg-[#04301F]/10 text-[#04301F]'
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
                          className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                            isCommentBoxOpen
                              ? 'bg-[#04301F] text-[#FDFAF4]'
                              : 'hover:bg-[#04301F]/10 text-[#04301F]'
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
                          className="relative flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-bold hover:bg-[#04301F]/10 text-[#04301F] cursor-pointer"
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
                        onClick={() => onToggleBookmark(article.id)}
                        className={`p-1.5 rounded-lg transition-all cursor-pointer ${
                          isBookmarked
                            ? 'text-amber-800 bg-amber-100 border border-amber-300'
                            : 'text-[#04301F]/60 hover:text-[#04301F] hover:bg-[#04301F]/10'
                        }`}
                      >
                        <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-amber-600' : ''}`} />
                      </button>
                    </div>

                    {isCommentBoxOpen && (
                      <div className="mt-3.5 pt-3.5 border-t border-[#04301F]/15 space-y-3">
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

            {/* COMMUNITY POST 3: Dr. Nusrat Jahan */}
            {activePostList.length > 2 && (
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
    </main>
  );
};
