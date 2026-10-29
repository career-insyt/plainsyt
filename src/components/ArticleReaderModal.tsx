import React, { useState } from 'react';
import {
  X,
  Bookmark,
  Share2,
  Heart,
  Volume2,
  Play,
  Pause,
  CheckCircle2,
  MessageCircle,
  Send,
  Building2,
  Calendar,
  Clock,
} from 'lucide-react';
import { Article, Comment } from '../types/index.ts';
import { ImageGraphic } from './ImageGraphic.tsx';
import { toBengaliNumerals, formatBengaliNumberCompact } from '../utils/pureLogic.ts';
import { PlainsytLogo } from './PlainsytLogo.tsx';

interface ArticleReaderModalProps {
  article: Article | null;
  onClose: () => void;
  isBookmarked: boolean;
  onToggleBookmark: (id: string) => void;
  onToggleLike: (article: Article) => void;
  onAddComment: (articleId: string, comment: Comment) => void;
}

export const ArticleReaderModal: React.FC<ArticleReaderModalProps> = ({
  article,
  onClose,
  isBookmarked,
  onToggleBookmark,
  onToggleLike,
  onAddComment,
}) => {
  if (!article) return null;

  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [commentText, setCommentText] = useState('');
  const [commentAuthor, setCommentAuthor] = useState('');
  const [copiedShare, setCopiedShare] = useState(false);

  // Keyboard Escape listener
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentText.trim()) return;

    const newComment: Comment = {
      id: `c-${Date.now()}`,
      author: commentAuthor.trim() || 'সম্মানিত পাঠক',
      role: 'কৃষি অনুরাগী',
      avatar: '',
      text: commentText.trim(),
      timestamp: 'এইমাত্র',
      likes: 0,
    };

    onAddComment(article.id, newComment);
    setCommentText('');
    setCommentAuthor('');
  };

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopiedShare(true);
    setTimeout(() => setCopiedShare(false), 2000);
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-[#04301F]/80 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4 overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="reader-article-title"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <div className="relative w-full max-w-3xl bg-[#FDFAF5] rounded-2xl shadow-tactile-lg border-2 border-[#04301F] overflow-hidden my-4 sm:my-8 text-[#04301F] flex flex-col max-h-[92vh]">
        
        {/* Sticky Header Bar */}
        <div className="sticky top-0 z-20 bg-[#FDFAF5]/98 backdrop-blur-md px-6 py-3.5 border-b-2 border-[#04301F]/15 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <PlainsytLogo height={26} />
            <div className="hidden sm:flex items-center gap-2 text-xs font-bold text-[#04301F] font-mono uppercase tracking-wide border-l border-[#04301F]/20 pl-2.5">
              <span>{article.category}</span>
              <span>·</span>
              <span className="text-[#04301F]/60 font-sans">{toBengaliNumerals(article.readTimeMinutes)} মিনিট পাঠ</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => onToggleBookmark(article.id)}
              className={`p-2 rounded-lg border transition-all ${
                isBookmarked
                  ? 'bg-amber-100 border-amber-300 text-amber-900 shadow-tactile-xs'
                  : 'bg-white border-[#04301F]/20 text-[#04301F] hover:border-[#04301F]'
              }`}
              title="সংরক্ষণ করুন"
              aria-label={isBookmarked ? 'সংরক্ষণ বাতিল' : 'সংরক্ষণ করুন'}
            >
              <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-amber-600' : ''}`} />
            </button>

            <button
              type="button"
              onClick={handleShare}
              className="p-2 rounded-lg bg-white border border-[#04301F]/20 text-[#04301F] hover:border-[#04301F] transition-all relative"
              title="লিংক কপি করুন"
              aria-label="প্রতিবেদন শেয়ার করুন"
            >
              <Share2 className="w-4 h-4" />
              {copiedShare && (
                <span className="absolute -bottom-8 right-0 text-[10px] bg-[#04301F] text-[#FDFAF4] px-2 py-0.5 rounded shadow font-mono font-bold whitespace-nowrap">
                  লিংক কপি হয়েছে!
                </span>
              )}
            </button>

            <button
              type="button"
              onClick={onClose}
              className="p-2 rounded-lg bg-white border border-[#04301F]/20 text-[#04301F] hover:bg-[#04301F] hover:text-[#FDFAF4] hover:border-[#04301F] transition-all ml-1 cursor-pointer"
              aria-label="বন্ধ করুন"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Article Body */}
        <div className="flex-1 overflow-y-auto px-6 sm:px-10 py-6 scrollbar-thin">
          
          {/* Main Visual Graphic Banner */}
          <div className="mb-6 rounded-xl overflow-hidden border-2 border-[#04301F] shadow-tactile-sm">
            <ImageGraphic type={article.imageType} aspect="16/9" />
          </div>

          {/* Title & Deck */}
          <h1
            id="reader-article-title"
            className="text-2xl sm:text-3xl font-bold text-[#04301F] font-editorial tracking-tight leading-snug mb-3"
            style={{ textWrap: 'balance' }}
          >
            {article.title}
          </h1>

          <p className="text-base sm:text-lg text-[#04301F]/80 leading-relaxed mb-6 font-medium">
            {article.subtitle}
          </p>

          {/* Byline Strip */}
          <div className="flex flex-wrap items-center justify-between gap-4 py-3.5 border-y-2 border-[#04301F]/15 mb-6 bg-[#F5F1E8] -mx-6 sm:-mx-10 px-6 sm:px-10">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-xl bg-[#04301F] text-[#FDFAF4] font-bold flex items-center justify-center text-sm shadow-tactile-xs">
                {article.author.name.slice(0, 2)}
              </div>
              <div>
                <p className="text-xs font-bold text-[#04301F]">{article.author.name}</p>
                <p className="text-[11px] text-[#04301F]/70 font-mono">{article.author.designation}</p>
                <div className="flex items-center gap-1 text-[10px] text-emerald-800 font-semibold mt-0.5">
                  <Building2 className="w-3 h-3" />
                  <span>{article.author.organization}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 text-xs text-[#04301F]/70 font-mono font-medium">
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" />
                <span>{new Date(article.publishedAt).toLocaleDateString('bn-BD', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
              </span>
              <span>·</span>
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                <span>{toBengaliNumerals(article.readTimeMinutes)} মিনিট</span>
              </span>
            </div>
          </div>

          {/* Audio Explainer Player Simulation */}
          <div className="p-4 bg-[#04301F] text-[#FDFAF4] border-2 border-[#09472E] rounded-xl mb-6 flex items-center justify-between gap-4 shadow-tactile-sm">
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setIsPlayingAudio(!isPlayingAudio)}
                className="w-10 h-10 rounded-full bg-[#FDFAF4] text-[#04301F] flex items-center justify-center hover:bg-white transition-all shadow-tactile-xs cursor-pointer"
                aria-label={isPlayingAudio ? 'অডিও থামান' : 'অডিও শুনুন'}
              >
                {isPlayingAudio ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-[#04301F] ml-0.5" />}
              </button>
              <div>
                <span className="text-xs font-bold text-[#FDFAF4] block leading-tight uppercase font-mono tracking-wider">
                  শুনুন: প্রতিবেদনের অডিও সারাংশ
                </span>
                <span className="text-[11px] text-[#C5DDD1] font-medium">
                  {isPlayingAudio ? 'চলছে... (১:৪৫ মিনিট)' : 'কৃষি গবেষকদের তৈরি কণ্ঠ সংস্করণ'}
                </span>
              </div>
            </div>
            <div className="hidden sm:flex items-center gap-1.5 text-xs text-amber-300 font-mono font-bold">
              <Volume2 className="w-4 h-4" />
              <span>বাংলা অডিও</span>
            </div>
          </div>

          {/* Key Takeaways Box */}
          <div className="p-4 bg-white border-2 border-[#04301F] rounded-xl shadow-tactile-sm mb-6">
            <h3 className="text-xs font-bold text-[#04301F] uppercase font-mono tracking-wider mb-2.5 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-700" />
              <span>গবেষণার মূল প্রাপ্তি ও কৃষকের লাভ</span>
            </h3>
            <ul className="space-y-2">
              {article.takeaways.map((takeaway, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-[13px] text-[#04301F] leading-relaxed font-medium">
                  <span className="w-2 h-2 rounded-full bg-[#04301F] mt-1.5 shrink-0" />
                  <span>{takeaway}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Editorial Long-form Body with Drop Cap on the First Paragraph */}
          <div className="prose max-w-none text-[#04301F] space-y-4 text-sm sm:text-base leading-relaxed mb-8 font-normal">
            {article.content.map((paragraph, index) => (
              <p
                key={index}
                className={
                  index === 0
                    ? 'first-letter:text-5xl first-letter:font-bold first-letter:text-[#04301F] first-letter:font-editorial first-letter:float-left first-letter:mr-3 first-letter:mt-1 leading-relaxed'
                    : 'leading-relaxed'
                }
              >
                {paragraph}
              </p>
            ))}
          </div>

          {/* Research Basis / Citation Box */}
          {article.researchBasis && (
            <div className="p-4 bg-[#F5F1E8] border-2 border-[#04301F]/20 rounded-xl text-xs text-[#04301F] mb-8">
              <span className="font-bold text-[#04301F] font-mono uppercase block mb-1">গবেষণার উৎস ও তথ্যসূত্র:</span>
              <p className="text-[#04301F]/80 mb-1 font-medium">{article.researchBasis.journalOrInst}</p>
              <div className="flex items-center justify-between text-[11px] text-[#04301F]/60 font-mono pt-2 border-t border-[#04301F]/15 mt-2">
                <span>সূত্র কোড: {article.researchBasis.doiOrSource}</span>
                <span className="text-[#04301F] font-bold">{article.researchBasis.keyMetric}</span>
              </div>
            </div>
          )}

          {/* Interactive Reactions Bar */}
          <div className="flex items-center justify-between py-3.5 border-y-2 border-[#04301F]/15 mb-8 bg-[#F5F1E8] -mx-6 sm:-mx-10 px-6 sm:px-10">
            <button
              type="button"
              onClick={() => onToggleLike(article)}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                article.userLiked
                  ? 'bg-rose-50 text-rose-600 border border-rose-300'
                  : 'bg-white border border-[#04301F]/20 text-[#04301F] hover:border-[#04301F]'
              }`}
            >
              <Heart className={`w-4 h-4 ${article.userLiked ? 'fill-rose-600 text-rose-600' : ''}`} />
              <span>{formatBengaliNumberCompact(article.stats.likes)} পছন্দ</span>
            </button>

            <div className="flex items-center gap-4 text-xs text-[#04301F]/70 font-mono font-medium">
              <span className="flex items-center gap-1">
                <MessageCircle className="w-4 h-4 text-[#04301F]" />
                <span>{toBengaliNumerals(article.comments.length)} মন্তব্য</span>
              </span>
              <span>·</span>
              <span>{formatBengaliNumberCompact(article.stats.views)} বার পঠিত</span>
            </div>
          </div>

          {/* Comments Section */}
          <div className="mb-4">
            <h3 className="text-sm font-bold text-[#04301F] uppercase font-mono tracking-wider mb-3">
              পাঠকদের প্রতিক্রিয়া ও অভিজ্ঞতা ({toBengaliNumerals(article.comments.length)})
            </h3>

            {/* Comment Form */}
            <form onSubmit={handleCommentSubmit} className="p-4 bg-white border-2 border-[#04301F]/20 rounded-xl mb-4 shadow-tactile-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-2">
                <input
                  type="text"
                  value={commentAuthor}
                  onChange={(e) => setCommentAuthor(e.target.value)}
                  placeholder="আপনার নাম বা পদবি (ঐচ্ছিক)"
                  className="px-3 py-1.5 text-xs bg-[#FDFAF5] border border-[#04301F]/20 rounded-lg text-[#04301F] placeholder:text-[#04301F]/40 focus:outline-none focus:border-[#04301F] font-medium"
                />
              </div>
              <textarea
                rows={2}
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                placeholder="আপনার মাঠের অভিজ্ঞতা বা প্রশ্ন লিখুন..."
                className="w-full px-3 py-2 text-xs bg-[#FDFAF5] border border-[#04301F]/20 rounded-lg text-[#04301F] placeholder:text-[#04301F]/40 focus:outline-none focus:border-[#04301F] font-medium mb-2"
              />
              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={!commentText.trim()}
                  className="px-4 py-2 text-xs font-bold text-[#FDFAF4] bg-[#04301F] hover:bg-[#09472e] disabled:opacity-40 rounded-lg transition-all shadow-tactile-xs flex items-center gap-1.5 cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>মন্তব্য যোগ করুন</span>
                </button>
              </div>
            </form>

            {/* Comments List */}
            <div className="space-y-2.5">
              {article.comments.map((comm) => (
                <div key={comm.id} className="p-3.5 bg-white border border-[#04301F]/20 rounded-xl text-xs">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-[#04301F]">{comm.author}</span>
                    <span className="text-[10px] text-[#04301F]/50 font-mono">{comm.timestamp}</span>
                  </div>
                  {comm.role && <p className="text-[10px] text-emerald-800 font-semibold mb-1 font-mono">{comm.role}</p>}
                  <p className="text-[#04301F]/80 font-medium leading-relaxed">{comm.text}</p>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
