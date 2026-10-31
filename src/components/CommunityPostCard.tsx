import React, { useState } from 'react';
import {
  ThumbsUp,
  MessageCircle,
  Share2,
  Bookmark,
  MoreHorizontal,
  CheckCircle2,
  Globe,
  Send,
  Heart,
} from 'lucide-react';
import { CommunityPost, Comment } from '../types/index.ts';

interface CommunityPostCardProps {
  post: CommunityPost;
  onToggleLike: (postId: string) => void;
  onToggleSave?: (postId: string) => void;
  onAddComment: (postId: string, comment: Comment) => void;
}

export const CommunityPostCard: React.FC<CommunityPostCardProps> = ({
  post,
  onToggleLike,
  onToggleSave,
  onAddComment,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showCommentBox, setShowCommentBox] = useState(false);
  const [commentInput, setCommentInput] = useState('');
  const [copiedShare, setCopiedShare] = useState(false);

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopiedShare(true);
    setTimeout(() => setCopiedShare(false), 2000);
  };

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentInput.trim()) return;

    const newComment: Comment = {
      id: `comm-${Date.now()}`,
      author: 'কৃষি অনুরাগী পাঠক',
      role: 'মাঠ পর্যবেক্ষক',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&h=100&q=80',
      text: commentInput.trim(),
      timestamp: 'এইমাত্র',
      likes: 0,
    };

    onAddComment(post.id, newComment);
    setCommentInput('');
  };

  const isLongText = post.content.length > 220;
  const displayText = isLongText && !isExpanded ? `${post.content.slice(0, 220)}...` : post.content;

  return (
    <article className="bg-white border-2 border-[#04301F]/15 rounded-2xl p-4 sm:p-5 shadow-tactile-sm transition-all hover:border-[#04301F]/30">
      {/* 1. Author Row */}
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex items-center gap-3">
          <div className="relative">
            <img
              src={post.author.avatar}
              alt={post.author.name}
              className="w-10 h-10 sm:w-11 sm:h-11 rounded-full object-cover ring-2 ring-[#04301F]/15"
            />
            <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-white rounded-full" />
          </div>

          <div>
            <div className="flex items-center gap-1.5 flex-wrap">
              <h3 className="text-sm font-bold text-[#04301F] hover:underline cursor-pointer">
                {post.author.name}
              </h3>
              {post.author.isVerified && (
                <CheckCircle2 className="w-4 h-4 text-emerald-600 fill-emerald-100" />
              )}
            </div>
            <div className="flex items-center gap-1.5 text-[11px] text-gray-500 font-sans">
              <span>{post.timestamp}</span>
              <span>•</span>
              <Globe className="w-3 h-3 text-gray-400" />
            </div>
          </div>
        </div>

        <div className="flex items-center gap-1 text-gray-400">
          {onToggleSave && (
            <button
              type="button"
              onClick={() => onToggleSave(post.id)}
              className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors"
              title="Save Post"
            >
              <Bookmark
                className={`w-4 h-4 ${
                  post.userSaved ? 'text-amber-600 fill-amber-500' : 'text-gray-400'
                }`}
              />
            </button>
          )}
          <button
            type="button"
            className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <MoreHorizontal className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* 2. Text Content */}
      <div className="text-xs sm:text-sm text-gray-800 leading-relaxed whitespace-pre-line mb-3 font-sans">
        {displayText}
        {isLongText && !isExpanded && (
          <button
            type="button"
            onClick={() => setIsExpanded(true)}
            className="ml-1 text-emerald-800 font-bold hover:underline cursor-pointer"
          >
            ...আরও দেখুন (See more)
          </button>
        )}
      </div>

      {/* 3. Shared Post Box (Facebook Quote Box Style) */}
      {post.sharedPost && (
        <div className="mb-3.5 p-3.5 rounded-xl border border-gray-200 bg-[#FAF8F3] hover:bg-[#F5F2EA] transition-colors">
          <div className="flex items-center gap-2 mb-2">
            <img
              src={post.sharedPost.authorAvatar}
              alt={post.sharedPost.authorName}
              className="w-7 h-7 rounded-full object-cover"
            />
            <div>
              <h5 className="text-xs font-bold text-[#04301F]">{post.sharedPost.authorName}</h5>
              <span className="text-[10px] text-gray-500">{post.sharedPost.timestamp}</span>
            </div>
          </div>
          <p className="text-xs text-gray-700 leading-relaxed font-sans">
            {post.sharedPost.text}
          </p>
        </div>
      )}

      {/* 4. Multi-Image Grid (Facebook Style 3-Photo Grid) */}
      {post.images && post.images.length > 0 && (
        <div className="mb-3.5 rounded-xl overflow-hidden border border-gray-100 bg-gray-50">
          {post.images.length === 1 && (
            <img
              src={post.images[0]}
              alt="Post asset"
              className="w-full max-h-96 object-cover"
              loading="lazy"
            />
          )}

          {post.images.length === 2 && (
            <div className="grid grid-cols-2 gap-1">
              {post.images.map((img, idx) => (
                <img
                  key={idx}
                  src={img}
                  alt={`Post asset ${idx}`}
                  className="w-full h-48 sm:h-56 object-cover"
                  loading="lazy"
                />
              ))}
            </div>
          )}

          {post.images.length >= 3 && (
            <div className="grid grid-cols-3 gap-1">
              <div className="col-span-2 h-52 sm:h-64">
                <img
                  src={post.images[0]}
                  alt="Post asset 1"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
              <div className="col-span-1 flex flex-col gap-1 h-52 sm:h-64">
                <div className="h-1/2 overflow-hidden">
                  <img
                    src={post.images[1]}
                    alt="Post asset 2"
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
                <div className="h-1/2 relative overflow-hidden">
                  <img
                    src={post.images[2]}
                    alt="Post asset 3"
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-black/55 flex items-center justify-center text-white font-bold text-lg sm:text-xl font-mono">
                    +3
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* 5. Reactions & Comments Summary */}
      <div className="flex items-center justify-between text-[11px] sm:text-xs text-gray-500 pb-2.5 mb-2.5 border-b border-gray-100 font-sans">
        <div className="flex items-center gap-1.5">
          <div className="flex -space-x-1">
            <span className="w-5 h-5 rounded-full bg-rose-500 text-white flex items-center justify-center shadow-xs">
              <Heart className="w-3 h-3 fill-white" />
            </span>
            <span className="w-5 h-5 rounded-full bg-blue-500 text-white flex items-center justify-center shadow-xs">
              <ThumbsUp className="w-3 h-3 fill-white" />
            </span>
          </div>
          <span>
            {post.reactionsSummary ||
              `${post.stats.likes + (post.userLiked ? 1 : 0)} জন প্রতিক্রিয়া জানিয়েছেন`}
          </span>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setShowCommentBox(!showCommentBox)}
            className="hover:underline"
          >
            {post.stats.commentsCount + post.comments.length} Comments
          </button>
          <span>•</span>
          <span>{post.stats.shares} Shares</span>
        </div>
      </div>

      {/* 6. Action Buttons Bar (3-way Like/Comment/Share) */}
      <div className="grid grid-cols-3 gap-1 pt-0.5 text-xs font-semibold text-gray-600">
        <button
          type="button"
          onClick={() => onToggleLike(post.id)}
          className={`flex items-center justify-center gap-1.5 py-2 rounded-lg hover:bg-gray-100 active:scale-95 transition-all ${
            post.userLiked ? 'text-blue-600 font-bold bg-blue-50' : 'text-gray-600'
          }`}
        >
          <ThumbsUp className={`w-4 h-4 ${post.userLiked ? 'fill-blue-600' : ''}`} />
          <span>লাইক (Like)</span>
        </button>

        <button
          type="button"
          onClick={() => setShowCommentBox(!showCommentBox)}
          className="flex items-center justify-center gap-1.5 py-2 rounded-lg hover:bg-gray-100 active:scale-95 transition-all text-gray-600"
        >
          <MessageCircle className="w-4 h-4" />
          <span>মন্তব্য (Comment)</span>
        </button>

        <button
          type="button"
          onClick={handleShare}
          className="flex items-center justify-center gap-1.5 py-2 rounded-lg hover:bg-gray-100 active:scale-95 transition-all text-gray-600 relative"
        >
          <Share2 className="w-4 h-4" />
          <span>{copiedShare ? 'লিংক কপি হয়েছে!' : 'শেয়ার (Share)'}</span>
        </button>
      </div>

      {/* 7. Inline Comment Box */}
      {showCommentBox && (
        <div className="mt-3.5 pt-3 border-t border-gray-100">
          <form onSubmit={handleCommentSubmit} className="flex items-center gap-2 mb-3">
            <img
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&h=100&q=80"
              alt="You"
              className="w-7 h-7 rounded-full object-cover shrink-0"
            />
            <input
              type="text"
              value={commentInput}
              onChange={(e) => setCommentInput(e.target.value)}
              placeholder="একটি গঠনমূলক মন্তব্য লিখুন..."
              className="flex-1 bg-[#F5F2EB] px-3.5 py-2 rounded-full text-xs text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-emerald-700"
            />
            <button
              type="submit"
              disabled={!commentInput.trim()}
              className="p-2 rounded-full bg-emerald-800 text-white disabled:opacity-40 hover:bg-emerald-900 transition-colors"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>

          {/* Existing comments list */}
          <div className="space-y-2 max-h-48 overflow-y-auto scrollbar-none pr-1">
            {post.comments.map((comm) => (
              <div key={comm.id} className="flex items-start gap-2 text-xs">
                <div className="w-6 h-6 rounded-full bg-emerald-800 text-white flex items-center justify-center font-bold text-[10px] shrink-0">
                  {comm.author.charAt(0)}
                </div>
                <div className="flex-1 bg-[#FAF8F3] p-2.5 rounded-xl border border-gray-100">
                  <div className="flex items-center justify-between mb-0.5">
                    <span className="font-bold text-[#04301F] text-[11px]">{comm.author}</span>
                    <span className="text-[10px] text-gray-400">{comm.timestamp}</span>
                  </div>
                  <p className="text-gray-700 leading-snug">{comm.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </article>
  );
};
