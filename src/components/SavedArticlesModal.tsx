import React from 'react';
import { X, Bookmark, Trash2, BookOpen } from 'lucide-react';
import { Article } from '../types/index.ts';
import { toBengaliNumerals } from '../utils/pureLogic.ts';
import { ImageGraphic } from './ImageGraphic.tsx';

interface SavedArticlesModalProps {
  isOpen: boolean;
  onClose: () => void;
  savedArticles: Article[];
  onOpenArticle: (article: Article) => void;
  onRemoveBookmark: (id: string) => void;
}

export const SavedArticlesModal: React.FC<SavedArticlesModalProps> = ({
  isOpen,
  onClose,
  savedArticles,
  onOpenArticle,
  onRemoveBookmark,
}) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-[#04301F]/80 backdrop-blur-xs flex items-center justify-end"
      role="dialog"
      aria-modal="true"
      aria-label="সংরক্ষিত প্রতিবেদন তালিকা"
    >
      <div className="w-full max-w-md h-full bg-[#FDFAF5] border-l-4 border-[#04301F] shadow-tactile-lg flex flex-col p-6 animate-in slide-in-from-right duration-200 text-[#04301F]">
        
        {/* Drawer Header */}
        <div className="flex items-center justify-between pb-4 border-b-2 border-[#04301F]/15 mb-4">
          <div className="flex items-center gap-2">
            <div className="p-1.5 bg-[#04301F] text-[#FDFAF4] rounded-lg shadow-tactile-xs">
              <Bookmark className="w-4 h-4 fill-[#FDFAF4]" />
            </div>
            <h2 className="text-base font-bold text-[#04301F] uppercase font-mono tracking-wide">
              সংরক্ষিত প্রতিবেদন ({toBengaliNumerals(savedArticles.length)})
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-[#04301F] hover:bg-[#04301F]/10 transition-colors"
            aria-label="বন্ধ করুন"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Saved List */}
        <div className="flex-1 overflow-y-auto space-y-3 pr-1 scrollbar-thin">
          {savedArticles.length === 0 ? (
            <div className="text-center py-16 text-[#04301F]/60">
              <BookOpen className="w-12 h-12 mx-auto text-[#04301F]/30 mb-3" />
              <p className="text-sm font-bold text-[#04301F]">কোনো সংরক্ষিত প্রতিবেদন নেই</p>
              <p className="text-xs text-[#04301F]/60 mt-1 max-w-xs mx-auto font-medium">
                যে কোনো প্রতিবেদনের বুকমার্ক আইকনে ক্লিক করে পরবর্তীতে পড়ার জন্য সংরক্ষণ করুন।
              </p>
            </div>
          ) : (
            savedArticles.map((art) => (
              <div
                key={art.id}
                className="p-3 bg-white border-2 border-[#04301F]/20 rounded-xl hover:border-[#04301F] hover:shadow-tactile-xs transition-all flex gap-3 group"
              >
                <div className="w-20 h-16 rounded-lg overflow-hidden shrink-0 border border-[#04301F]/20">
                  <ImageGraphic type={art.imageType} aspect="4/3" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[10px] font-bold text-[#04301F] font-mono uppercase bg-[#04301F]/10 px-1.5 py-0.2 rounded">
                      {art.category}
                    </span>
                    <button
                      type="button"
                      onClick={() => onRemoveBookmark(art.id)}
                      className="text-stone-400 hover:text-rose-600 p-0.5 cursor-pointer"
                      title="সংরক্ষণ তালিকা থেকে মুছুন"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <h4
                    onClick={() => {
                      onOpenArticle(art);
                      onClose();
                    }}
                    className="text-xs font-bold text-[#04301F] line-clamp-2 cursor-pointer group-hover:text-[#09472e] transition-colors leading-snug font-editorial"
                  >
                    {art.title}
                  </h4>
                  <p className="text-[10px] text-[#04301F]/60 font-mono mt-1 font-medium">
                    {art.author.name} · {toBengaliNumerals(art.readTimeMinutes)} মিনিট পাঠ
                  </p>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Drawer Footer */}
        <div className="pt-4 border-t-2 border-[#04301F]/15 mt-2 flex items-center justify-between text-xs text-[#04301F]/70">
          <span>অফলাইনে পড়ার সুযোগ শীঘ্রই চালু হচ্ছে</span>
          <button
            type="button"
            onClick={onClose}
            className="text-[#04301F] font-bold hover:underline"
          >
            ফিরে যান &rarr;
          </button>
        </div>

      </div>
    </div>
  );
};
