import React from 'react';
import {
  PenSquare,
  FileText,
  Video,
  Bot,
  Radio,
  Image as ImageIcon,
} from 'lucide-react';

interface PostCreatorBarProps {
  onOpenWriteArticle: () => void;
  onOpenCreatePost: () => void;
  onOpenUploadVideo: () => void;
  onOpenAskAI: () => void;
  userName?: string;
  userAvatar?: string;
}

export const PostCreatorBar: React.FC<PostCreatorBarProps> = ({
  onOpenWriteArticle,
  onOpenCreatePost,
  onOpenUploadVideo,
  onOpenAskAI,
  userName = 'হাসান',
  userAvatar = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&h=120&q=80',
}) => {
  return (
    <div className="bg-white border-2 border-[#04301F]/15 rounded-2xl p-3 sm:p-4 shadow-tactile-sm mb-4">
      {/* Top Input Row */}
      <div className="flex items-center gap-3 pb-3 border-b border-gray-100">
        <div className="relative shrink-0">
          <img
            src={userAvatar}
            alt={userName}
            className="w-10 h-10 rounded-full object-cover ring-2 ring-[#04301F]/20"
          />
          <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-white rounded-full" />
        </div>

        {/* Input pill button */}
        <button
          type="button"
          onClick={onOpenCreatePost}
          className="flex-1 bg-[#F5F2EB] hover:bg-[#EFECE3] active:bg-[#E5E0D5] text-left px-4 py-2.5 rounded-full text-xs sm:text-sm text-gray-600 transition-colors flex items-center justify-between cursor-pointer"
        >
          <span className="truncate">What's on your mind, {userName}?</span>
          <ImageIcon className="w-4 h-4 text-emerald-700 shrink-0 ml-2" />
        </button>
      </div>

      {/* Action Buttons Row */}
      <div className="flex items-center justify-between sm:justify-start sm:gap-6 pt-2.5 overflow-x-auto scrollbar-none text-[11px] sm:text-xs font-semibold text-[#04301F]">
        <button
          type="button"
          onClick={onOpenWriteArticle}
          className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg hover:bg-[#F5F2EB] active:scale-95 transition-all shrink-0 text-emerald-800 cursor-pointer"
        >
          <PenSquare className="w-4 h-4 text-emerald-600" />
          <span>Write Article</span>
        </button>

        <button
          type="button"
          onClick={onOpenCreatePost}
          className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg hover:bg-[#F5F2EB] active:scale-95 transition-all shrink-0 text-blue-800 cursor-pointer"
        >
          <FileText className="w-4 h-4 text-blue-600" />
          <span>Create Post</span>
        </button>

        <button
          type="button"
          onClick={onOpenUploadVideo}
          className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg hover:bg-[#F5F2EB] active:scale-95 transition-all shrink-0 text-amber-800 cursor-pointer"
        >
          <Video className="w-4 h-4 text-amber-600" />
          <span>Upload Video</span>
        </button>

        <button
          type="button"
          onClick={onOpenAskAI}
          className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg hover:bg-[#F5F2EB] active:scale-95 transition-all shrink-0 text-purple-800 cursor-pointer"
        >
          <Bot className="w-4 h-4 text-purple-600" />
          <span>Ask AI</span>
        </button>
      </div>
    </div>
  );
};
