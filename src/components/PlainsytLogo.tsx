import React from 'react';

interface PlainsytLogoProps {
  className?: string;
  height?: number | string;
  variant?: 'light-bg' | 'dark-bg';
  showTagline?: boolean;
}

export const PlainsytLogo: React.FC<PlainsytLogoProps> = ({
  className = '',
  height = 36,
  variant = 'light-bg',
  showTagline = false,
}) => {
  return (
    <div className={`inline-flex items-center gap-2.5 select-none ${className}`}>
      {/* Official Plainsyt SVG Logo */}
      <img
        src="/logo/plainsyt.svg"
        alt="Plainsyt — Modern Agriculture & Agri-Tech Media"
        style={{ height: typeof height === 'number' ? `${height}px` : height }}
        className="w-auto max-w-full object-contain filter drop-shadow-[0_1px_1px_rgba(4,48,31,0.08)] transition-transform hover:scale-[1.02]"
        loading="eager"
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
