import React, { useState } from 'react';
import {
  X,
  Users,
  Smile,
  MapPin,
  UserCheck,
  Image as ImageIcon,
  Globe,
  Sparkles,
  Calendar,
  ThumbsUp,
  MessageCircle,
  Share2,
  CheckCircle2,
  MoreHorizontal,
  UploadCloud,
} from 'lucide-react';
import { CommunityPost } from '../types/index.ts';

interface FacebookCreatePostModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmitPost: (post: CommunityPost) => void;
  userName?: string;
  userAvatar?: string;
}

export const FacebookCreatePostModal: React.FC<FacebookCreatePostModalProps> = ({
  isOpen,
  onClose,
  onSubmitPost,
  userName = 'Hasan Zubair',
  userAvatar = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&h=120&q=80',
}) => {
  if (!isOpen) return null;

  const [postText, setPostText] = useState('');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [location, setLocation] = useState('');
  const [selectedGradient, setSelectedGradient] = useState<string | null>(null);
  const [attachedImage, setAttachedImage] = useState<string | null>(null);
  const [isAiLabeled, setIsAiLabeled] = useState(false);
  const [shareToStory, setShareToStory] = useState(false);
  const [audience, setAudience] = useState<'Public' | 'Community' | 'Only Me'>('Public');
  const [isPosting, setIsPosting] = useState(false);

  const gradients = [
    { id: 'none', label: 'Plain', bg: 'bg-white text-gray-900 border border-gray-200' },
    { id: 'g1', label: 'Emerald', bg: 'bg-gradient-to-tr from-emerald-800 to-teal-600 text-white font-bold' },
    { id: 'g2', label: 'Forest', bg: 'bg-gradient-to-tr from-[#04301F] to-[#0d5939] text-white font-bold' },
    { id: 'g3', label: 'Sunset', bg: 'bg-gradient-to-tr from-amber-600 to-rose-600 text-white font-bold' },
    { id: 'g4', label: 'Ocean', bg: 'bg-gradient-to-tr from-sky-600 to-indigo-800 text-white font-bold' },
  ];

  const sampleAgriImages = [
    'https://images.unsplash.com/photo-1586771107445-d3ca888129ff?auto=format&fit=crop&w=800&h=600&q=80',
    'https://images.unsplash.com/photo-1592417817098-8f3d69106093?auto=format&fit=crop&w=800&h=600&q=80',
    'https://images.unsplash.com/photo-1527842891421-42eec6e703ea?auto=format&fit=crop&w=800&h=600&q=80',
    'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=800&h=600&q=80',
  ];

  const handlePostSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!postText.trim() && !attachedImage) return;

    setIsPosting(true);

    const newPost: CommunityPost = {
      id: `post-${Date.now()}`,
      author: {
        name: userName,
        avatar: userAvatar,
        role: location ? `মাঠ পর্যবেক্ষক • ${location}` : 'Plainsyt Community Contributor',
        isVerified: true,
      },
      timestamp: 'এইমাত্র • পাবলিক',
      content: postText.trim(),
      images: attachedImage ? [attachedImage] : undefined,
      stats: {
        likes: 1,
        commentsCount: 0,
        shares: 0,
      },
      reactionsSummary: 'আপনি ও আরও অনেকে',
      comments: [],
      userLiked: true,
      userSaved: false,
    };

    setTimeout(() => {
      onSubmitPost(newPost);
      setIsPosting(false);
      onClose();
    }, 400);
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4 overflow-y-auto"
      role="dialog"
      aria-modal="true"
    >
      <div className="bg-[#242526] text-[#E4E6EB] w-full max-w-4xl rounded-2xl shadow-2xl border border-white/10 overflow-hidden my-auto animate-fadeIn font-sans">
        
        {/* Header */}
        <div className="relative px-4 py-3.5 border-b border-white/10 flex items-center justify-between">
          <div className="w-8" />
          <h2 className="text-base sm:text-lg font-bold text-white text-center">
            Create Post
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-gray-300 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 2-Column Desktop Grid / Responsive Stacked on Mobile */}
        <div className="grid grid-cols-1 lg:grid-cols-12 max-h-[85vh] overflow-y-auto">
          
          {/* Left Column: Post Editor Form (7 cols on desktop) */}
          <div className="lg:col-span-7 p-4 sm:p-5 border-b lg:border-b-0 lg:border-r border-white/10 space-y-4">
            
            {/* User row + Audience */}
            <div className="flex items-center gap-3">
              <div className="relative">
                <img
                  src={userAvatar}
                  alt={userName}
                  className="w-11 h-11 rounded-full object-cover ring-2 ring-emerald-500/50"
                />
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-[#242526] rounded-full" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white flex items-center gap-1.5">
                  <span>{userName}</span>
                </h3>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <button
                    type="button"
                    onClick={() => setAudience(audience === 'Public' ? 'Community' : 'Public')}
                    className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-white/10 hover:bg-white/15 text-[11px] text-gray-300 font-medium transition-colors"
                  >
                    <Globe className="w-3 h-3" />
                    <span>{audience}</span>
                    <span className="text-[9px]">▼</span>
                  </button>
                  {location && (
                    <span className="text-[11px] text-emerald-400 font-medium truncate">
                      • 📍 {location}
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Tags Pill Row (People / Feeling / Location / Collaborator) */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none text-xs">
              <button
                type="button"
                onClick={() => setSelectedTag(selectedTag === 'People' ? null : 'People')}
                className={`flex items-center gap-1 px-3 py-1.5 rounded-full border transition-all cursor-pointer ${
                  selectedTag === 'People'
                    ? 'bg-emerald-600/30 border-emerald-500 text-emerald-300 font-semibold'
                    : 'border-white/15 hover:bg-white/10 text-gray-300'
                }`}
              >
                <Users className="w-3.5 h-3.5 text-gray-400" />
                <span>People</span>
              </button>

              <button
                type="button"
                onClick={() => setSelectedTag(selectedTag === 'Feeling' ? null : 'Feeling')}
                className={`flex items-center gap-1 px-3 py-1.5 rounded-full border transition-all cursor-pointer ${
                  selectedTag === 'Feeling'
                    ? 'bg-emerald-600/30 border-emerald-500 text-emerald-300 font-semibold'
                    : 'border-white/15 hover:bg-white/10 text-gray-300'
                }`}
              >
                <Smile className="w-3.5 h-3.5 text-amber-400" />
                <span>Feeling/activity</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  const place = prompt('খামার বা জেলার নাম লিখুন (যেমন: বগুড়া, ময়মনসিংহ):', location || 'বগুড়া');
                  if (place !== null) setLocation(place);
                }}
                className={`flex items-center gap-1 px-3 py-1.5 rounded-full border transition-all cursor-pointer ${
                  location
                    ? 'bg-emerald-600/30 border-emerald-500 text-emerald-300 font-semibold'
                    : 'border-white/15 hover:bg-white/10 text-gray-300'
                }`}
              >
                <MapPin className="w-3.5 h-3.5 text-rose-400" />
                <span>{location ? location : 'Location'}</span>
              </button>

              <button
                type="button"
                onClick={() => setSelectedTag(selectedTag === 'Collaborator' ? null : 'Collaborator')}
                className={`flex items-center gap-1 px-3 py-1.5 rounded-full border transition-all cursor-pointer ${
                  selectedTag === 'Collaborator'
                    ? 'bg-emerald-600/30 border-emerald-500 text-emerald-300 font-semibold'
                    : 'border-white/15 hover:bg-white/10 text-gray-300'
                }`}
              >
                <UserCheck className="w-3.5 h-3.5 text-blue-400" />
                <span>Collaborator</span>
              </button>
            </div>

            {/* Textarea Area */}
            <div
              className={`rounded-xl border border-white/10 p-3 transition-all relative ${
                selectedGradient
                  ? gradients.find((g) => g.id === selectedGradient)?.bg + ' min-h-[140px] flex items-center justify-center'
                  : 'bg-[#18191A]'
              }`}
            >
              <textarea
                value={postText}
                onChange={(e) => setPostText(e.target.value)}
                placeholder={`What's on your mind, ${userName}?`}
                rows={selectedGradient ? 3 : 4}
                className={`w-full bg-transparent resize-none focus:outline-none placeholder:text-gray-400 text-sm sm:text-base ${
                  selectedGradient ? 'text-center font-bold text-white text-lg placeholder:text-white/70' : 'text-gray-100'
                }`}
              />

              {/* Bottom icons: Aa background toggle & smiley */}
              <div className="flex items-center justify-between pt-2 mt-2 border-t border-white/10">
                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={() => {
                      const curIndex = gradients.findIndex((g) => g.id === (selectedGradient || 'none'));
                      const next = gradients[(curIndex + 1) % gradients.length];
                      setSelectedGradient(next.id === 'none' ? null : next.id);
                    }}
                    className="w-7 h-7 rounded-lg bg-gradient-to-tr from-pink-500 to-amber-400 text-white font-bold text-xs flex items-center justify-center shadow-sm cursor-pointer hover:scale-105 transition-transform"
                    title="Change background theme"
                  >
                    Aa
                  </button>
                  <span className="text-[11px] text-gray-400 ml-1 hidden sm:inline">
                    {selectedGradient ? 'Background On' : 'Colors'}
                  </span>
                </div>

                <div className="flex items-center gap-1.5">
                  {['🌱', '🌾', '🚜', '🔬', '💡'].map((emoji) => (
                    <button
                      key={emoji}
                      type="button"
                      onClick={() => setPostText((prev) => prev + emoji)}
                      className="p-1 hover:bg-white/10 rounded text-base cursor-pointer transition-transform hover:scale-125"
                    >
                      {emoji}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Media Upload Area (Dashed box matching Facebook screenshot) */}
            <div className="p-3.5 rounded-xl border-2 border-dashed border-white/20 bg-[#18191A] hover:border-emerald-500/60 transition-colors">
              <div className="text-center space-y-2">
                <div className="w-10 h-10 mx-auto rounded-full bg-white/10 flex items-center justify-center text-emerald-400">
                  <ImageIcon className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs sm:text-sm font-semibold text-white">
                    Add photos or videos or drag and drop
                  </p>
                  <p className="text-[11px] text-gray-400 mt-0.5">
                    অথবা নিচের মাঠের ছবিগুলো থেকে বেছে নিন:
                  </p>
                </div>

                {/* Sample agricultural photos to attach */}
                <div className="grid grid-cols-4 gap-2 pt-1">
                  {sampleAgriImages.map((img, idx) => (
                    <div
                      key={idx}
                      onClick={() => setAttachedImage(attachedImage === img ? null : img)}
                      className={`h-14 rounded-lg overflow-hidden cursor-pointer relative border-2 transition-all ${
                        attachedImage === img ? 'border-emerald-500 ring-2 ring-emerald-500/50 scale-95' : 'border-transparent hover:opacity-90'
                      }`}
                    >
                      <img src={img} alt="Preset" className="w-full h-full object-cover" />
                      {attachedImage === img && (
                        <div className="absolute inset-0 bg-emerald-600/40 flex items-center justify-center text-white">
                          <CheckCircle2 className="w-4 h-4" />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Share Settings (Matching Screenshot 2) */}
            <div className="space-y-2.5 pt-2 border-t border-white/10 text-xs">
              <h4 className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                Share Settings
              </h4>

              {/* Add AI Label Toggle */}
              <div className="flex items-center justify-between p-2.5 rounded-xl bg-[#18191A] border border-white/10">
                <div className="flex items-start gap-2.5 max-w-[80%]">
                  <Sparkles className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-white block">Add AI label</span>
                    <span className="text-[11px] text-gray-400 leading-tight">
                      We require you to label certain realistic content that's made with AI.
                    </span>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setIsAiLabeled(!isAiLabeled)}
                  className={`w-11 h-6 rounded-full transition-colors relative cursor-pointer ${
                    isAiLabeled ? 'bg-emerald-600' : 'bg-gray-700'
                  }`}
                >
                  <span
                    className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white transition-transform ${
                      isAiLabeled ? 'translate-x-5' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>

              {/* Share to Story Toggle */}
              <div className="flex items-center justify-between p-2.5 rounded-xl bg-[#18191A] border border-white/10">
                <div>
                  <span className="font-semibold text-white block">Share to story</span>
                  <span className="text-[11px] text-gray-400">
                    {shareToStory ? 'On • স্টোরিতেও স্বয়ংক্রিয়ভাবে দেখাবে' : 'Off'}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setShareToStory(!shareToStory)}
                  className={`w-11 h-6 rounded-full transition-colors relative cursor-pointer ${
                    shareToStory ? 'bg-emerald-600' : 'bg-gray-700'
                  }`}
                >
                  <span
                    className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white transition-transform ${
                      shareToStory ? 'translate-x-5' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>
            </div>

            {/* Bottom Form Actions */}
            <div className="flex items-center justify-between gap-3 pt-3 border-t border-white/10">
              <button
                type="button"
                onClick={() => alert('পোস্টটি সফলভাবে শিডিউল করা হয়েছে!')}
                className="p-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-gray-300 transition-colors cursor-pointer"
                title="Schedule Post"
              >
                <Calendar className="w-5 h-5" />
              </button>

              <button
                type="button"
                onClick={handlePostSubmit}
                disabled={(!postText.trim() && !attachedImage) || isPosting}
                className="flex-1 py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-700 disabled:opacity-40 disabled:hover:bg-emerald-600 text-white font-bold text-sm transition-all shadow-md cursor-pointer text-center"
              >
                {isPosting ? 'Posting...' : 'Post'}
              </button>
            </div>
          </div>

          {/* Right Column: Live Facebook Preview (5 cols on desktop) */}
          <div className="lg:col-span-5 p-4 sm:p-5 bg-[#18191A] flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3 px-1">
                <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                  Preview
                </h4>
                <span className="text-[10px] text-emerald-400 font-mono">
                  Live Feed Rendering
                </span>
              </div>

              {/* Preview Card */}
              <div className="bg-[#242526] rounded-xl border border-white/10 overflow-hidden shadow-lg">
                {/* Preview Author Header */}
                <div className="p-3.5 flex items-start justify-between">
                  <div className="flex items-center gap-2.5">
                    <img
                      src={userAvatar}
                      alt={userName}
                      className="w-10 h-10 rounded-full object-cover ring-1 ring-white/20"
                    />
                    <div>
                      <h4 className="text-xs sm:text-sm font-bold text-white flex items-center gap-1">
                        <span>{userName}</span>
                        {location && (
                          <span className="text-gray-400 font-normal text-xs">
                            is in <span className="text-white font-semibold">{location}</span>
                          </span>
                        )}
                      </h4>
                      <div className="flex items-center gap-1 text-[10px] text-gray-400 font-sans mt-0.5">
                        <span>Just now</span>
                        <span>•</span>
                        <Globe className="w-3 h-3 text-gray-400" />
                        {isAiLabeled && (
                          <>
                            <span>•</span>
                            <span className="text-emerald-400 font-semibold font-mono">AI Labeled</span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                  <MoreHorizontal className="w-4 h-4 text-gray-400" />
                </div>

                {/* Preview Text Content */}
                {selectedGradient ? (
                  <div
                    className={`p-6 text-center ${
                      gradients.find((g) => g.id === selectedGradient)?.bg
                    }`}
                  >
                    <p className="text-base sm:text-lg font-bold leading-snug drop-shadow-sm whitespace-pre-line">
                      {postText || `What's on your mind, ${userName}?`}
                    </p>
                  </div>
                ) : (
                  <div className="px-3.5 pb-3 text-xs sm:text-sm text-gray-200 leading-relaxed whitespace-pre-line">
                    {postText || (
                      <span className="text-gray-500 italic">
                        আপনার পোস্টের টেক্সট এখানে রিয়েল-টাইমে প্রদর্শিত হবে...
                      </span>
                    )}
                  </div>
                )}

                {/* Attached Image Preview */}
                {attachedImage && (
                  <div className="relative max-h-64 overflow-hidden border-t border-white/10">
                    <img
                      src={attachedImage}
                      alt="Post Attachment"
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}

                {/* Preview Social Stats */}
                <div className="px-3.5 py-2 flex items-center justify-between text-[11px] text-gray-400 border-t border-white/10 font-sans">
                  <div className="flex items-center gap-1">
                    <div className="w-4 h-4 rounded-full bg-emerald-600 flex items-center justify-center text-white text-[9px]">
                      👍
                    </div>
                    <span>1</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span>0 comments</span>
                    <span>0 shares</span>
                  </div>
                </div>

                {/* Preview Action Buttons */}
                <div className="px-2 py-1.5 border-t border-white/10 flex items-center justify-around text-xs text-gray-300 font-semibold">
                  <div className="flex-1 py-1.5 flex items-center justify-center gap-1.5 hover:bg-white/5 rounded-lg text-emerald-400">
                    <ThumbsUp className="w-4 h-4 fill-emerald-500/20" />
                    <span>Like</span>
                  </div>
                  <div className="flex-1 py-1.5 flex items-center justify-center gap-1.5 hover:bg-white/5 rounded-lg">
                    <MessageCircle className="w-4 h-4" />
                    <span>Comment</span>
                  </div>
                  <div className="flex-1 py-1.5 flex items-center justify-center gap-1.5 hover:bg-white/5 rounded-lg">
                    <Share2 className="w-4 h-4" />
                    <span>Share</span>
                  </div>
                </div>
              </div>
            </div>

            <p className="text-[10px] text-gray-500 text-center mt-4">
              Plainsyt Community Guidelines • Science & Agriculture First
            </p>
          </div>

        </div>

      </div>
    </div>
  );
};
