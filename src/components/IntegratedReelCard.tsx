import React, { useState } from 'react';
import {
  Play,
  Heart,
  MessageCircle,
  Share2,
  Bookmark,
  MoreVertical,
  UserPlus,
  UserCheck,
} from 'lucide-react';
import { StoryReel } from '../types/index.ts';

interface IntegratedReelCardProps {
  reel?: StoryReel;
  onOpenReel: (reelId: string) => void;
  onSeeAllReels?: () => void;
}

export const IntegratedReelCard: React.FC<IntegratedReelCardProps> = ({
  reel,
  onOpenReel,
  onSeeAllReels,
}) => {
  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);
  const [likeCount, setLikeCount] = useState(2400);

  const activeReelId = reel ? reel.id : 'reel-soil-health';

  const toggleLike = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsLiked(!isLiked);
    setLikeCount((prev) => (isLiked ? prev - 1 : prev + 1));
  };

  const toggleSave = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsSaved(!isSaved);
  };

  const toggleFollow = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsFollowing(!isFollowing);
  };

  return (
    <div className="bg-white border-2 border-[#04301F]/15 rounded-2xl p-4 shadow-tactile-sm">
      {/* Header */}
      <div className="flex items-center justify-between mb-3 px-1">
        <h3 className="text-sm font-bold text-[#04301F]">Reels</h3>
        {onSeeAllReels && (
          <button
            type="button"
            onClick={onSeeAllReels}
            className="text-xs text-emerald-800 font-semibold hover:underline"
          >
            See all
          </button>
        )}
      </div>

      {/* Vertical Video Card */}
      <div
        onClick={() => onOpenReel(activeReelId)}
        className="relative w-full h-[380px] sm:h-[440px] rounded-xl overflow-hidden cursor-pointer group select-none shadow-tactile-xs border border-black/10"
      >
        {/* Background Image/Thumbnail */}
        <img
          src="https://images.unsplash.com/photo-1592417817098-8f3d69106093?auto=format&fit=crop&w=600&h=900&q=80"
          alt="The Science Behind Healthier Soil"
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-black/30" />

        {/* Center Play Button Overlay */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-14 h-14 rounded-full bg-black/40 backdrop-blur-md border border-white/40 flex items-center justify-center text-white shadow-tactile-sm group-hover:scale-110 group-hover:bg-[#04301F]/80 transition-all">
            <Play className="w-6 h-6 fill-white ml-1" />
          </div>
        </div>

        {/* Floating Right Actions Bar */}
        <div className="absolute right-3 bottom-20 z-10 flex flex-col items-center gap-3.5 text-white">
          <button
            type="button"
            onClick={toggleSave}
            className="p-2 rounded-full bg-black/30 backdrop-blur-md hover:bg-black/50 transition-colors"
            title="Save Reel"
          >
            <Bookmark className={`w-4 h-4 ${isSaved ? 'text-amber-400 fill-amber-400' : ''}`} />
          </button>

          <button
            type="button"
            onClick={toggleLike}
            className="flex flex-col items-center gap-0.5 group/btn"
          >
            <div className="p-2 rounded-full bg-black/30 backdrop-blur-md hover:bg-black/50 transition-colors">
              <Heart
                className={`w-4 h-4 ${
                  isLiked ? 'text-rose-500 fill-rose-500 scale-110' : 'text-white'
                } transition-transform`}
              />
            </div>
            <span className="text-[10px] font-mono font-semibold drop-shadow-sm">
              {(likeCount / 1000).toFixed(1)}K
            </span>
          </button>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onOpenReel(activeReelId);
            }}
            className="flex flex-col items-center gap-0.5"
          >
            <div className="p-2 rounded-full bg-black/30 backdrop-blur-md hover:bg-black/50 transition-colors">
              <MessageCircle className="w-4 h-4 text-white" />
            </div>
            <span className="text-[10px] font-mono font-semibold drop-shadow-sm">186</span>
          </button>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              navigator.clipboard?.writeText(window.location.href);
            }}
            className="flex flex-col items-center gap-0.5"
          >
            <div className="p-2 rounded-full bg-black/30 backdrop-blur-md hover:bg-black/50 transition-colors">
              <Share2 className="w-4 h-4 text-white" />
            </div>
            <span className="text-[10px] font-mono font-semibold drop-shadow-sm">512</span>
          </button>

          <button
            type="button"
            onClick={(e) => e.stopPropagation()}
            className="p-2 rounded-full bg-black/30 backdrop-blur-md hover:bg-black/50 transition-colors"
          >
            <MoreVertical className="w-4 h-4 text-white" />
          </button>
        </div>

        {/* Bottom Author & Title Overlay */}
        <div className="absolute bottom-3 left-3 right-16 z-10 text-white">
          <div className="flex items-center gap-2 mb-1.5">
            <img
              src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=100&h=100&q=80"
              alt="Dr. Nusrat Jahan"
              className="w-7 h-7 rounded-full object-cover ring-2 ring-white/80"
            />
            <span className="text-xs font-bold truncate">Dr. Nusrat Jahan</span>
            <button
              type="button"
              onClick={toggleFollow}
              className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold transition-all ${
                isFollowing
                  ? 'bg-emerald-600 text-white'
                  : 'bg-white/20 backdrop-blur-md text-white hover:bg-white/30 border border-white/40'
              }`}
            >
              {isFollowing ? 'Following' : 'Follow'}
            </button>
          </div>

          <h4 className="text-xs sm:text-sm font-bold leading-snug drop-shadow-md mb-1">
            The Science Behind Healthier Soil 🌾
          </h4>

          <div className="flex items-center gap-1.5 flex-wrap text-[10px] text-emerald-300 font-mono">
            <span>#SoilHealth</span>
            <span>#SustainableFarming</span>
            <span>#Bangladesh</span>
          </div>
        </div>
      </div>
    </div>
  );
};
