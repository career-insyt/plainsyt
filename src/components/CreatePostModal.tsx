import React, { useState } from 'react';
import { X, Sparkles, Send, MapPin } from 'lucide-react';
import { Article, ArticleCategory } from '../types/index.ts';

interface CreatePostModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmitArticle: (article: Article) => void;
}

export const CreatePostModal: React.FC<CreatePostModalProps> = ({
  isOpen,
  onClose,
  onSubmitArticle,
}) => {
  if (!isOpen) return null;

  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [category, setCategory] = useState<ArticleCategory>('শস্য ও কৃষিবিজ্ঞান');
  const [authorName, setAuthorName] = useState('');
  const [location, setLocation] = useState('');
  const [content, setContent] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;

    const newArticle: Article = {
      id: `user-post-${Date.now()}`,
      title: title.trim(),
      subtitle: subtitle.trim() || `${location ? `[${location}] ` : ''}মাঠ পর্যায়ের পর্যবেক্ষণ ও অভিজ্ঞতা।`,
      category,
      categoryEn: 'Field Insights',
      imageType: 'sensor',
      author: {
        name: authorName.trim() || 'মাঠ গবেষক / উদ্যোক্তা',
        designation: 'কৃষি অনুরাগী ও অবদানকারী',
        organization: location ? `মাঠ প্রতিনিধি, ${location}` : 'প্লেইনসাইট কমিউনিটি',
        avatar: '',
      },
      publishedAt: new Date().toISOString(),
      readTimeMinutes: 2,
      takeaways: [
        'মাঠ পর্যায়ের বাস্তব পর্যবেক্ষণ থেকে সরাসরি সংগৃহীত তথ্য।',
        'অন্যান্য কৃষক ও উদ্যোক্তাদের সঙ্গে তাৎক্ষণিক অভিজ্ঞতা বিনিময়।',
      ],
      content: [content.trim()],
      stats: {
        views: 12,
        likes: 1,
        commentsCount: 0,
        shares: 0,
      },
      comments: [],
      userLiked: true,
    };

    onSubmitArticle(newArticle);
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 1200);
  };

  const categories: ArticleCategory[] = [
    'শস্য ও কৃষিবিজ্ঞান',
    'এগ্রি-টেক ও ড্রোন',
    'গবেষণা সহজ ভাষায়',
    'খাদ্য ও কোল্ড চেইন',
    'জলবায়ু ও স্থায়িত্ব',
    'স্টার্টআপ ও উদ্ভাবন',
  ];

  return (
    <div
      className="fixed inset-0 z-50 bg-[#04301F]/80 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4"
      role="dialog"
      aria-modal="true"
      aria-label="নতুন কৃষি তথ্য বা অভিজ্ঞতা শেয়ার করুন"
    >
      <div className="w-full max-w-lg bg-[#FDFAF5] rounded-2xl shadow-tactile-lg border-2 border-[#04301F] overflow-hidden text-[#04301F] animate-in fade-in zoom-in-95 duration-150">
        
        {/* Header */}
        <div className="px-5 py-4 border-b-2 border-[#04301F]/15 flex items-center justify-between bg-white">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#04301F] text-[#FDFAF4] flex items-center justify-center shadow-tactile-xs">
              <Sparkles className="w-4 h-4 text-amber-300" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-[#04301F] font-mono uppercase tracking-wide">
                মাঠের তথ্য বা অভিজ্ঞতা জানান
              </h3>
              <p className="text-[11px] text-[#04301F]/70">আপনার এলাকার কৃষি সমস্যা বা উদ্ভাবন সবার সাথে শেয়ার করুন</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-[#04301F] hover:bg-[#04301F]/10 cursor-pointer"
            aria-label="বন্ধ করুন"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {submitted ? (
          <div className="p-8 text-center">
            <div className="w-12 h-12 rounded-full bg-[#04301F] text-[#FDFAF4] mx-auto flex items-center justify-center mb-3 shadow-tactile-xs font-bold text-lg">
              ✓
            </div>
            <h4 className="text-base font-bold text-[#04301F] mb-1 font-editorial">সফলভাবে ফিডে যুক্ত হয়েছে!</h4>
            <p className="text-xs text-[#04301F]/80">আপনার মাঠ রিপোর্টটি এখন প্লেইনসাইট ফিডের শীর্ষে প্রদর্শিত হচ্ছে।</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-5 space-y-3.5">
            <div>
              <label className="block text-xs font-bold text-[#04301F] mb-1 font-mono uppercase tracking-wider">
                শিরোনাম বা প্রধান বিষয় <span className="text-rose-600">*</span>
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="যেমন: বগুড়ায় আলুর আগাম ব্লাইট প্রতিরোধে নতুন ট্রাইকোডার্মা স্প্রে"
                className="w-full px-3 py-2 text-xs bg-white border-2 border-[#04301F]/20 rounded-lg text-[#04301F] placeholder:text-[#04301F]/40 focus:outline-none focus:border-[#04301F] font-medium"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-[#04301F] mb-1 font-mono uppercase tracking-wider">
                  বিষয় / ক্যাটাগরি
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as ArticleCategory)}
                  className="w-full px-3 py-2 text-xs bg-white border-2 border-[#04301F]/20 rounded-lg text-[#04301F] focus:outline-none focus:border-[#04301F] font-medium"
                >
                  {categories.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#04301F] mb-1 font-mono uppercase tracking-wider">
                  এলাকা / জেলা
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="যেমন: শিবগঞ্জ, বগুড়া"
                    className="w-full pl-8 pr-3 py-2 text-xs bg-white border-2 border-[#04301F]/20 rounded-lg text-[#04301F] placeholder:text-[#04301F]/40 focus:outline-none focus:border-[#04301F] font-medium"
                  />
                  <MapPin className="w-3.5 h-3.5 text-[#04301F]/50 absolute left-2.5 top-1/2 -translate-y-1/2" />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#04301F] mb-1 font-mono uppercase tracking-wider">
                আপনার নাম
              </label>
              <input
                type="text"
                value={authorName}
                onChange={(e) => setAuthorName(e.target.value)}
                placeholder="নাম বা প্রতিষ্ঠানের পরিচয়"
                className="w-full px-3 py-2 text-xs bg-white border-2 border-[#04301F]/20 rounded-lg text-[#04301F] placeholder:text-[#04301F]/40 focus:outline-none focus:border-[#04301F] font-medium"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#04301F] mb-1 font-mono uppercase tracking-wider">
                বিস্তারিত বিবরণ বা পর্যবেক্ষণ <span className="text-rose-600">*</span>
              </label>
              <textarea
                rows={4}
                required
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="কী প্রযুক্তি ব্যবহার করলেন? ফলন বা খরচে কী প্রভাব পড়ল? সংক্ষেপে লিখুন..."
                className="w-full px-3 py-2 text-xs bg-white border-2 border-[#04301F]/20 rounded-lg text-[#04301F] placeholder:text-[#04301F]/40 focus:outline-none focus:border-[#04301F] font-medium"
              />
            </div>

            <div className="pt-2 border-t-2 border-[#04301F]/15 flex items-center justify-end gap-2.5">
              <button
                type="button"
                onClick={onClose}
                className="px-3.5 py-1.5 text-xs text-[#04301F] hover:bg-[#04301F]/10 rounded-lg font-bold"
              >
                বাতিল
              </button>
              <button
                type="submit"
                className="px-4 py-2 text-xs font-bold text-[#FDFAF4] bg-[#04301F] hover:bg-[#09472e] rounded-lg transition-all shadow-tactile-xs hover:shadow-tactile hover:-translate-y-0.5 flex items-center gap-1.5 cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" />
                <span>ফিডে প্রকাশ করুন</span>
              </button>
            </div>
          </form>
        )}

      </div>
    </div>
  );
};
