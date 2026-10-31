import React, { useState } from 'react';
import {
  Bot,
  X,
  Send,
  Sparkles,
  Sprout,
  HelpCircle,
  Lightbulb,
  CheckCircle2,
} from 'lucide-react';

interface AskAIModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Message {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: string;
}

export const AskAIModal: React.FC<AskAIModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const [inputQuestion, setInputQuestion] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'm-intro',
      sender: 'ai',
      text: 'আসসালামু আলাইকুম! আমি Plainsyt AI কৃষি সহকারী। ফসল উৎপাদন, রোগবালাই দমন, ড্রোন স্প্রে বা সাম্প্রতিক কৃষি গবেষণা নিয়ে যেকোনো প্রশ্ন করতে পারেন।',
      timestamp: 'এইমাত্র',
    },
  ]);
  const [isThinking, setIsThinking] = useState(false);

  const suggestedQuestions = [
    'লবণাক্ত জমিতে বোরো ধানের জন্য কোন জাতটি সবচেয়ে ভালো?',
    'ইউরিয়া সারের অতিরিক্ত ব্যবহার কমাতে ড্রোন কীভাবে সাহায্য করে?',
    'টমেটোর ব্যাকটেরিয়াল উইল্ট দমনে ট্রাইকোডার্মা কীভাবে কাজ করে?',
    'মাটির পিএইচ (pH) মাপার সহজ ঘরোয়া পদ্ধতি কী?',
  ];

  const handleSend = (textToSend?: string) => {
    const question = textToSend || inputQuestion.trim();
    if (!question) return;

    const userMsg: Message = {
      id: `usr-${Date.now()}`,
      sender: 'user',
      text: question,
      timestamp: 'এইমাত্র',
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputQuestion('');
    setIsThinking(true);

    // AI Response simulation with real agronomic knowledge
    setTimeout(() => {
      let reply = '';
      if (question.includes('লবণাক্ত') || question.includes('ধান')) {
        reply = 'দক্ষিণাঞ্চলের উপকূলীয় লবণাক্ত মাটিতে বোরো মৌসুমে **ব্রি ধান-৬৭** এবং **ব্রি ধান-১০২** অত্যন্ত কার্যকর। এগুলো ১০-১২ ডিএস/মিটার লবণাক্ততা সহ্য করে হেক্টরে গড়ে ৭.৫-৮.২ টন ফলন দিতে সক্ষম। অকাল বন্যার ঝুঁকি থাকলে ব্রি-১০২ জাতটি প্রায় ১৫ দিন আগে পাকে।';
      } else if (question.includes('ড্রোন') || question.includes('ইউরিয়া')) {
        reply = 'মাল্টিস্পেকট্রাল এনডিভিআই (NDVI) সেন্সরযুক্ত ড্রোনের মাধ্যমে ফসলের পাতার ক্লোরোফিল পর্যবেক্ষণ করে নাইট্রোজেন ঘাটতি চিহ্নিত করা যায়। গবেষণায় দেখা গেছে, সুনির্দিষ্ট স্থানে স্প্রে করায় ইউরিয়া সারের ব্যবহার ১৮-২৫% পর্যন্ত সাশ্রয় হয়।';
      } else if (question.includes('ট্রাইকোডার্মা') || question.includes('টমেটো')) {
        reply = 'ট্রাইকোডার্মা হলো একটি উপকারী বায়ো-ফাংগাস যা ক্ষতিকর ছত্রাকের বৃদ্ধি রোধ করে এবং উদ্ভিদের শিকড় পচন ও ব্যাকটেরিয়াল উইল্ট প্রায় ৯৫% নিয়ন্ত্রণ করে। এটি রাসায়নিক ছত্রাকনাশকের চমৎকার প্রাকৃতিক বিকল্প।';
      } else {
        reply = `আপনার প্রশ্নের জন্য ধন্যবাদ। Plainsyt কৃষি জ্ঞানভাণ্ডার অনুযায়ী, আধুনিক কৃষি ব্যবস্থাপনায় মাটির জৈব পদার্থ কমপক্ষে ২% নিশ্চিত করা এবং আবহাওয়ার পূর্বাভাস অনুযায়ী সেচ দেওয়া সবচেয়ে গুরুত্বপূর্ণ। এ বিষয়ে OpenAlex গবেষণাপত্রে বিস্তর তথ্য রয়েছে।`;
      }

      const aiMsg: Message = {
        id: `ai-${Date.now()}`,
        sender: 'ai',
        text: reply,
        timestamp: 'এইমাত্র',
      };

      setMessages((prev) => [...prev, aiMsg]);
      setIsThinking(false);
    }, 700);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-[#FDFAF5] border-2 border-[#04301F] rounded-2xl w-full max-w-xl h-[600px] max-h-[90vh] flex flex-col shadow-tactile-lg overflow-hidden">
        {/* Header */}
        <div className="bg-[#04301F] text-[#FDFAF4] px-4 py-3.5 flex items-center justify-between border-b-2 border-[#09472E]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center text-emerald-300">
              <Bot className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold tracking-tight flex items-center gap-1.5">
                Plainsyt Agri AI Assistant
                <span className="text-[10px] bg-emerald-400 text-[#04301F] font-mono px-1.5 py-0.2 rounded font-semibold">
                  BETA
                </span>
              </h3>
              <p className="text-[11px] text-[#A3E5C7]">গবেষণা ও মাঠপর্যায়ের স্মার্ট সমাধান</p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-white/10 text-white/80 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Chat Messages */}
        <div className="flex-1 p-4 overflow-y-auto space-y-3.5 scrollbar-none font-sans">
          {messages.map((m) => (
            <div
              key={m.id}
              className={`flex items-start gap-2.5 ${
                m.sender === 'user' ? 'justify-end' : 'justify-start'
              }`}
            >
              {m.sender === 'ai' && (
                <div className="w-7 h-7 rounded-full bg-[#04301F] text-emerald-300 flex items-center justify-center shrink-0 text-xs border border-emerald-600">
                  <Bot className="w-4 h-4" />
                </div>
              )}

              <div
                className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-xs sm:text-sm leading-relaxed shadow-tactile-xs ${
                  m.sender === 'user'
                    ? 'bg-[#04301F] text-white rounded-br-none'
                    : 'bg-white border border-[#04301F]/15 text-gray-800 rounded-bl-none'
                }`}
              >
                <div className="whitespace-pre-line">{m.text}</div>
                <div
                  className={`text-[9px] mt-1 font-mono ${
                    m.sender === 'user' ? 'text-emerald-200/70 text-right' : 'text-gray-400'
                  }`}
                >
                  {m.timestamp}
                </div>
              </div>
            </div>
          ))}

          {isThinking && (
            <div className="flex items-center gap-2 text-xs text-emerald-800 font-semibold p-2">
              <Sparkles className="w-4 h-4 animate-spin text-emerald-600" />
              <span>কৃষি তথ্য বিশ্লেষণ করা হচ্ছে...</span>
            </div>
          )}
        </div>

        {/* Suggested Prompts */}
        <div className="px-4 py-2 border-t border-[#04301F]/10 bg-white/60">
          <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1.5 flex items-center gap-1">
            <Lightbulb className="w-3 h-3 text-amber-500" />
            প্রস্তাবিত প্রশ্নাবলী:
          </p>
          <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none pb-1">
            {suggestedQuestions.map((q, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleSend(q)}
                className="shrink-0 px-2.5 py-1 rounded-full text-[11px] bg-[#FAF8F3] hover:bg-emerald-50 text-[#04301F] border border-[#04301F]/15 hover:border-emerald-600 transition-colors truncate max-w-[240px]"
              >
                {q}
              </button>
            ))}
          </div>
        </div>

        {/* Input Bar */}
        <div className="p-3 bg-white border-t border-[#04301F]/15 flex items-center gap-2">
          <input
            type="text"
            value={inputQuestion}
            onChange={(e) => setInputQuestion(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleSend();
            }}
            placeholder="আপনার প্রশ্ন লিখুন (যেমন: ধানের ব্লাস্ট রোগ প্রতিরোধে কী করণীয়?)..."
            className="flex-1 bg-[#F5F2EB] px-3.5 py-2.5 rounded-xl text-xs sm:text-sm text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-emerald-700 font-sans"
          />
          <button
            type="button"
            onClick={() => handleSend()}
            disabled={!inputQuestion.trim() || isThinking}
            className="p-2.5 rounded-xl bg-[#04301F] text-white hover:bg-[#06462D] disabled:opacity-40 transition-colors shadow-tactile-xs shrink-0"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
