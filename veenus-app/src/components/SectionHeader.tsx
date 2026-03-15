interface SectionHeaderProps {
  subtitle?: string;
  title: string;
  description?: string;
  align?: 'left' | 'center';
  light?: boolean;
}

export default function SectionHeader({
  subtitle,
  title,
  description,
  align = 'center',
  light = false,
}: SectionHeaderProps) {
  return (
    <div
      className={`mb-10 md:mb-16 lg:mb-20 ${
        align === 'center' ? 'text-center' : 'text-left'
      }`}
    >
      {/* Top ornamental line */}
      <div className={`ornament-line mb-4 md:mb-8 ${align === 'left' ? 'justify-start' : ''}`} />

      {subtitle && (
        <p className="text-gold-400 text-[11px] uppercase tracking-[0.5em] mb-6 font-medium" style={{ textShadow: '0 0 15px rgba(184,134,11,0.3)' }}>
          {subtitle}
        </p>
      )}
      <h2
        className={`heading-section ${
          light ? 'text-luxury-cream' : 'text-gradient-gold'
        }`}
        style={{ textShadow: light ? 'none' : '0 2px 20px rgba(184,134,11,0.15)' }}
      >
        {title}
      </h2>
      {description && (
        <p
          className={`mt-4 md:mt-6 text-sm sm:text-base md:text-lg max-w-2xl leading-relaxed ${
            align === 'center' ? 'mx-auto' : ''
          } ${light ? 'text-luxury-cream/60' : 'text-luxury-cream/40'}`}
        >
          {description}
        </p>
      )}
      <div
        className={`divider-gold mt-8 ${align === 'left' ? 'mx-0' : ''}`}
      />
    </div>
  );
}
