import React from 'react';

interface PlainsytLogoProps {
  className?: string;
  height?: number | string;
  variant?: 'light-bg' | 'dark-bg';
  showTagline?: boolean;
  usePng?: boolean;
}

export const PlainsytLogo: React.FC<PlainsytLogoProps> = ({
  className = '',
  height = 36,
  variant = 'light-bg',
  showTagline = false,
  usePng = false,
}) => {
  const primarySrc = usePng ? '/logo/Plainsyt 3D Green Wordmark.png' : '/logo/plainsyt.svg';
  const fallbackSrc = '/logo/Plainsyt 3D Green Wordmark.png';

  return (
    <div className={`inline-flex items-center gap-2.5 select-none ${className}`}>
      {/* Official Plainsyt Logo from /logo folder */}
      <img
        src={primarySrc}
        alt="Plainsyt — Modern Agriculture & Agri-Tech Media"
        style={{ height: typeof height === 'number' ? `${height}px` : height }}
        className="w-auto max-w-full object-contain filter drop-shadow-[0_1px_1px_rgba(4,48,31,0.08)] transition-transform hover:scale-[1.02]"
        loading="eager"
        onError={(e) => {
          if (e.currentTarget.src !== fallbackSrc) {
            e.currentTarget.src = fallbackSrc;
          }
        }}
      />

      {showTagline && (
        <div className="hidden sm:flex flex-col justify-center border-l border-[#04301F]/20 pl-2.5 leading-tight">
          <span className="text-[11px] font-bold tracking-tight text-[#04301F] font-sans">
            প্লেইনসাইট
          </span>
          <span className="text-[9px] font-mono tracking-widest text-[#09472e] uppercase font-semibold">
            AGRI-TECH MEDIA
          </span>
        </div>
      )}
    </div>
  );
};
