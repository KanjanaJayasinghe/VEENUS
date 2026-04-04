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
      {subtitle && (
        <p className="text-gold-400 text-[11px] uppercase tracking-[0.4em] mb-5 font-medium">
          {subtitle}
        </p>
      )}
      <h2
        className={`heading-section ${
          light ? 'text-luxury-cream' : 'text-gradient-gold'
        }`}
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
        className={`divider-gold mt-6 ${align === 'left' ? 'mx-0' : ''}`}
      />
    </div>
  );
}
