import React from 'react';
import { Mail, Globe, MapPin, ShieldCheck, Heart, ArrowUpRight } from 'lucide-react';
import { ArticleCategory } from '../types/index.ts';
import { PlainsytLogo } from './PlainsytLogo.tsx';

interface FooterProps {
  onSelectCategory: (category: ArticleCategory) => void;
  onOpenCreatePost: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onSelectCategory,
  onOpenCreatePost,
}) => {
  return (
    <footer className="bg-[#04301F] text-[#E8F2EC] border-t-4 border-[#09472E] mt-16 py-14 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
        
        {/* Col 1: Brand & Editorial Mission */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-[#FDFAF4] rounded-xl shadow-tactile-sm border border-[#FDFAF4]">
              <PlainsytLogo height={32} />
            </div>
          </div>
          <p className="text-xs text-[#C5DDD1] leading-relaxed">
            বাংলাদেশের কৃষি রূপান্তর, এগ্রি-টেক, বিশ্ববিদ্যালয় পর্যায়ের গবেষণা ও টেকসই খাদ্যব্যবস্থার তথ্যবহুল ও নিরপেক্ষ ডিজিটাল মিডিয়া ইকোসিস্টেম।
          </p>
          <div className="flex items-center gap-2 text-xs text-[#A3E5C7] font-semibold pt-1">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>বিজ্ঞানসম্মত ও জনস্বার্থে স্বাধীন সাংবাদিকতা</span>
          </div>
        </div>

        {/* Col 2: Categories */}
        <div>
          <h4 className="text-xs font-bold text-[#FDFAF4] uppercase tracking-wider mb-3.5 pb-1 border-b border-[#0F5E3E]">
            বিষয়ভিত্তিক বিভাগ
          </h4>
          <ul className="space-y-2.5 text-xs text-[#C5DDD1]">
            <li>
              <button
                type="button"
                onClick={() => onSelectCategory('শস্য ও কৃষিবিজ্ঞান')}
                className="hover:text-[#FDFAF4] hover:translate-x-1 transition-all text-left flex items-center gap-1.5"
              >
                <span>&rarr;</span>
                <span>শস্য ও উদ্ভিদবিজ্ঞান (Crop Science)</span>
              </button>
            </li>
            <li>
              <button
                type="button"
                onClick={() => onSelectCategory('এগ্রি-টেক ও ড্রোন')}
                className="hover:text-[#FDFAF4] hover:translate-x-1 transition-all text-left flex items-center gap-1.5"
              >
                <span>&rarr;</span>
                <span>এগ্রি-টেক ও ড্রোন প্রযুক্তি (Agri-Tech)</span>
              </button>
            </li>
            <li>
              <button
                type="button"
                onClick={() => onSelectCategory('গবেষণা সহজ ভাষায়')}
                className="hover:text-[#FDFAF4] hover:translate-x-1 transition-all text-left flex items-center gap-1.5"
              >
                <span>&rarr;</span>
                <span>গবেষণা সহজ ভাষায় (Simplified Science)</span>
              </button>
            </li>
            <li>
              <button
                type="button"
                onClick={() => onSelectCategory('খাদ্য ও কোল্ড চেইন')}
                className="hover:text-[#FDFAF4] hover:translate-x-1 transition-all text-left flex items-center gap-1.5"
              >
                <span>&rarr;</span>
                <span>খাদ্য সংরক্ষণ ও কোল্ড চেইন (Cold Storage)</span>
              </button>
            </li>
            <li>
              <button
                type="button"
                onClick={() => onSelectCategory('জলবায়ু ও স্থায়িত্ব')}
                className="hover:text-[#FDFAF4] hover:translate-x-1 transition-all text-left flex items-center gap-1.5"
              >
                <span>&rarr;</span>
                <span>জলবায়ু ও ভূগর্ভস্থ পানি (Climate & Water)</span>
              </button>
            </li>
          </ul>
        </div>

        {/* Col 3: Research Partners */}
        <div>
          <h4 className="text-xs font-bold text-[#FDFAF4] uppercase tracking-wider mb-3.5 pb-1 border-b border-[#0F5E3E]">
            গবেষণা তথ্যসূত্র ও ইনস্টিটিউট
          </h4>
          <ul className="space-y-2.5 text-xs text-[#C5DDD1]">
            <li className="flex items-start gap-2">
              <span className="text-[#FDFAF4] bg-[#09472E] px-1.5 py-0.5 rounded text-[10px] font-mono font-bold">BRRI</span>
              <span>বাংলাদেশ ধান গবেষণা ইনস্টিটিউট</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#FDFAF4] bg-[#09472E] px-1.5 py-0.5 rounded text-[10px] font-mono font-bold">BAU</span>
              <span>বাংলাদেশ কৃষি বিশ্ববিদ্যালয়, ময়মনসিংহ</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#FDFAF4] bg-[#09472E] px-1.5 py-0.5 rounded text-[10px] font-mono font-bold">BARI</span>
              <span>বাংলাদেশ কৃষি গবেষণা ইনস্টিটিউট, গাজীপুর</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#FDFAF4] bg-[#09472E] px-1.5 py-0.5 rounded text-[10px] font-mono font-bold">SAU</span>
              <span>শেরেবাংলা কৃষি বিশ্ববিদ্যালয়, ঢাকা</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#FDFAF4] bg-[#09472E] px-1.5 py-0.5 rounded text-[10px] font-mono font-bold">BARC</span>
              <span>বাংলাদেশ কৃষি গবেষণা কাউন্সিল</span>
            </li>
          </ul>
        </div>

        {/* Col 4: Contact & Pitch */}
        <div>
          <h4 className="text-xs font-bold text-[#FDFAF4] uppercase tracking-wider mb-3.5 pb-1 border-b border-[#0F5E3E]">
            যোগাযোগ ও তথ্য প্রেরণ
          </h4>
          <p className="text-xs text-[#C5DDD1] leading-relaxed mb-3.5">
            আপনার এলাকায় কোনো সফল কৃষি প্রযুক্তি উদ্ভাবন বা মাঠের গবেষণা প্রতিবেদন থাকলে আমাদের জানান।
          </p>
          <button
            type="button"
            onClick={onOpenCreatePost}
            className="w-full py-2 px-3 text-xs font-bold text-[#04301F] bg-[#FDFAF4] hover:bg-white rounded-lg transition-all shadow-tactile-sm hover:shadow-tactile hover:-translate-y-0.5 mb-3.5 flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <span>মাঠ রিপোর্ট পাঠান &rarr;</span>
          </button>
          <div className="text-[11px] text-[#A3C8B7] space-y-1 font-mono">
            <p>editorial@plainsyt.media</p>
            <p>ঢাকা, বাংলাদেশ</p>
          </div>
        </div>

      </div>

      {/* Bottom Bar */}
      <div className="max-w-7xl mx-auto pt-8 border-t border-[#09472E] flex flex-col sm:flex-row items-center justify-between text-xs text-[#A3C8B7] gap-3">
        <p>© ২০২৬ প্লেইনসাইট মিডিয়া (Plainsyt)। সর্বস্বত্ব সংরক্ষিত।</p>
        <div className="flex items-center gap-4">
          <a href="#" className="hover:text-[#FDFAF4] transition-colors">গোপনীয়তা নীতি</a>
          <span>·</span>
          <a href="#" className="hover:text-[#FDFAF4] transition-colors">ব্যবহারের শর্তাবলী</a>
          <span>·</span>
          <a href="#" className="hover:text-[#FDFAF4] transition-colors">সম্পাদকীয় নীতিমালা</a>
        </div>
      </div>
    </footer>
  );
};
