import React, { useState, useEffect } from 'react';
import {
  X,
  Heart,
  MessageCircle,
  Share2,
  Volume2,
  VolumeX,
  Play,
  Pause,
  ChevronLeft,
  ChevronRight,
  Send,
  MapPin,
} from 'lucide-react';
import { StoryReel } from '../types/index.ts';
import { toBengaliNumerals, formatBengaliNumberCompact } from '../utils/pureLogic.ts';

interface ReelPlayerModalProps {
  reels: StoryReel[];
  activeReelId: string | null;
  onClose: () => void;
}

export const ReelPlayerModal: React.FC<ReelPlayerModalProps> = ({
  reels,
  activeReelId,
  onClose,
}) => {
  if (!activeReelId) return null;

  const initialIndex = Math.max(
    0,
    reels.findIndex((r) => r.id === activeReelId)
  );
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [likedMap, setLikedMap] = useState<Record<string, boolean>>({});
  const [likeCountDelta, setLikeCountDelta] = useState<Record<string, number>>({});
  const [commentInput, setCommentInput] = useState('');
  const [commentsMap, setCommentsMap] = useState<Record<string, string[]>>({
    'reel-1': ['মাটির পিএইচ মাপার জন্য এই ডিভাইসটি কোথায় পাওয়া যাবে ভাই?', 'অসাধারণ সহজ ভিডিও!'],
    'reel-2': ['ড্রোন লাইসেন্সিং সংক্রান্ত নিয়মগুলো বিস্তারিত বললে ভালো হতো।'],
    'reel-3': ['পাবনার এই সোলার কোল্ড চেম্বার আসলেই কৃষকদের বড় বাঁচা বাঁচিয়েছে।'],
  });

  const reel = reels[currentIndex];
  if (!reel) return null;

  const isLiked = Boolean(likedMap[reel.id]);
  const currentLikes = reel.likes + (likeCountDelta[reel.id] || 0);

  const toggleLike = () => {
    setLikedMap((prev) => ({ ...prev, [reel.id]: !isLiked }));
    setLikeCountDelta((prev) => ({
      ...prev,
      [reel.id]: (prev[reel.id] || 0) + (isLiked ? -1 : 1),
    }));
  };

  const handleNext = () => {
    if (currentIndex < reels.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  const handleSendComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentInput.trim()) return;
    setCommentsMap((prev) => ({
      ...prev,
      [reel.id]: [...(prev[reel.id] || []), commentInput.trim()],
    }));
    setCommentInput('');
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowUp') handlePrev();
      if (e.key === 'ArrowDown') handleNext();
      if (e.key === ' ') {
        e.preventDefault();
        setIsPlaying((p) => !p);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex]);

  const reelComments = commentsMap[reel.id] || [];

  return (
    <div
      className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-2 sm:p-4"
      role="dialog"
      aria-modal="true"
      aria-label="ভিডিও রিলস প্লেয়ার"
    >
      {/* Top Close Button */}
      <button
        type="button"
        onClick={onClose}
        className="absolute top-4 right-4 z-50 p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
        aria-label="বন্ধ করুন"
      >
        <X className="w-6 h-6" />
      </button>

      {/* Main Container */}
      <div className="relative flex flex-col md:flex-row items-center max-w-4xl w-full h-[90vh] max-h-[820px] bg-stone-950 rounded-2xl overflow-hidden shadow-2xl border border-stone-800">
        
        {/* Navigation Arrows (Desktop) */}
        {currentIndex > 0 && (
          <button
            type="button"
            onClick={handlePrev}
            className="absolute left-3 top-1/2 -translate-y-1/2 z-40 p-2 rounded-full bg-black/50 text-white hover:bg-black/80 transition-colors"
            aria-label="পূর্ববর্তী রিল"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
        )}
        {currentIndex < reels.length - 1 && (
          <button
            type="button"
            onClick={handleNext}
            className="absolute right-3 md:right-[340px] top-1/2 -translate-y-1/2 z-40 p-2 rounded-full bg-black/50 text-white hover:bg-black/80 transition-colors"
            aria-label="পরবর্তী রিল"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        )}

        {/* Video Player Column (9:16 aspect simulated) */}
        <div className="relative flex-1 h-full w-full bg-stone-900 flex items-center justify-center overflow-hidden">
          {/* Animated gradient visual representation */}
          <div
            className={`w-full h-full bg-gradient-to-b ${reel.gradientTheme} flex flex-col justify-between p-6 text-white relative`}
          >
            {/* Ambient dynamic graphic */}
            <div className="absolute inset-0 flex items-center justify-center opacity-30 pointer-events-none">
              <div className="w-72 h-72 rounded-full border border-white/20 animate-spin" style={{ animationDuration: '24s' }} />
              <div className="absolute w-48 h-48 rounded-full border-2 border-white/30" />
            </div>

            {/* Video Header Overlay */}
            <div className="relative z-10 flex items-center justify-between">
              <div className="flex items-center gap-2 bg-black/50 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/20 text-xs">
                <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                <span>{reel.location}</span>
                <span>·</span>
                <span className="font-mono">{toBengaliNumerals(reel.duration)}</span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setIsMuted(!isMuted)}
                  className="p-2 rounded-full bg-black/40 hover:bg-black/60 text-white transition-colors"
                  aria-label={isMuted ? 'সাউন্ড চালু করুন' : 'মিউট করুন'}
                >
                  {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Center Play/Pause button */}
            <div className="relative z-10 self-center">
              <button
                type="button"
                onClick={() => setIsPlaying(!isPlaying)}
                className="w-16 h-16 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-md flex items-center justify-center text-white transition-transform active:scale-95 border border-white/30 shadow-lg cursor-pointer"
                aria-label={isPlaying ? 'ভিডিও থামান' : 'ভিডিও চালু করুন'}
              >
                {isPlaying ? <Pause className="w-7 h-7" /> : <Play className="w-7 h-7 fill-white ml-1" />}
              </button>
            </div>

            {/* Bottom Details Overlay */}
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-full ring-2 ring-emerald-400 overflow-hidden bg-stone-700 flex items-center justify-center text-sm font-bold text-white shadow-md">
                  {reel.creator.slice(0, 2)}
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white leading-tight">{reel.creator}</h4>
                  <p className="text-xs text-white/80">কৃষি প্রযুক্তি উদ্ভাবক · ভেরিফাইড</p>
                </div>
              </div>

              <h3 className="text-base sm:text-lg font-bold text-white leading-snug mb-3 drop-shadow font-editorial">
                {reel.title}
              </h3>

              {/* Progress bar simulation */}
              <div className="w-full bg-white/20 h-1.5 rounded-full overflow-hidden mb-2">
                <div
                  className="bg-emerald-400 h-full rounded-full transition-all duration-300"
                  style={{ width: isPlaying ? '65%' : '30%' }}
                />
              </div>

              <div className="flex items-center justify-between text-xs text-white/70 font-mono">
                <span>{formatBengaliNumberCompact(reel.views)} ভিউ</span>
                <span>রিল {toBengaliNumerals(currentIndex + 1)} / {toBengaliNumerals(reels.length)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Interaction & Comments Column */}
        <div className="w-full md:w-80 h-64 md:h-full bg-stone-900 border-t md:border-t-0 md:border-l border-stone-800 flex flex-col justify-between p-4">
          
          {/* Reaction Bar */}
          <div className="flex items-center justify-around py-3 border-b border-stone-800">
            <button
              type="button"
              onClick={toggleLike}
              className="flex flex-col items-center gap-1 group"
              aria-label="পছন্দ করুন"
            >
              <div
                className={`p-2.5 rounded-full transition-colors ${
                  isLiked ? 'bg-rose-500/20 text-rose-500' : 'bg-stone-800 text-stone-300 group-hover:text-white'
                }`}
              >
                <Heart className={`w-5 h-5 ${isLiked ? 'fill-rose-500' : ''}`} />
              </div>
              <span className="text-[11px] text-stone-300 font-mono">
                {formatBengaliNumberCompact(currentLikes)}
              </span>
            </button>

            <div className="flex flex-col items-center gap-1">
              <div className="p-2.5 rounded-full bg-stone-800 text-stone-300">
                <MessageCircle className="w-5 h-5" />
              </div>
              <span className="text-[11px] text-stone-300 font-mono">
                {toBengaliNumerals(reelComments.length)}
              </span>
            </div>

            <button
              type="button"
              onClick={() => {
                navigator.clipboard?.writeText(window.location.href);
              }}
              className="flex flex-col items-center gap-1 group"
              aria-label="শেয়ার করুন"
            >
              <div className="p-2.5 rounded-full bg-stone-800 text-stone-300 group-hover:text-white">
                <Share2 className="w-5 h-5" />
              </div>
              <span className="text-[11px] text-stone-300">শেয়ার</span>
            </button>
          </div>

          {/* Comments List */}
          <div className="flex-1 overflow-y-auto py-3 space-y-2.5 text-xs text-left scrollbar-none">
            <span className="text-[11px] font-semibold text-stone-400 uppercase tracking-wider block mb-1">
              মন্তব্যসমূহ ({toBengaliNumerals(reelComments.length)})
            </span>
            {reelComments.map((comment, i) => (
              <div key={i} className="p-2.5 rounded-lg bg-stone-800/70 border border-stone-700/50">
                <p className="text-stone-200">{comment}</p>
                <span className="text-[10px] text-stone-400 mt-1 block">পাঠক প্রতিক্রিয়া</span>
              </div>
            ))}
          </div>

          {/* Comment Input */}
          <form onSubmit={handleSendComment} className="pt-2 border-t border-stone-800 flex items-center gap-2">
            <input
              type="text"
              value={commentInput}
              onChange={(e) => setCommentInput(e.target.value)}
              placeholder="আপনার মতামত লিখুন..."
              className="flex-1 px-3 py-2 text-xs bg-stone-800 border border-stone-700 rounded-lg text-white placeholder:text-stone-500 focus:outline-none focus:border-emerald-400 font-medium"
            />
            <button
              type="submit"
              disabled={!commentInput.trim()}
              className="p-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 disabled:opacity-40 text-white transition-colors cursor-pointer"
              aria-label="মন্তব্য পোস্ট করুন"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>

        </div>
      </div>
    </div>
  );
};
