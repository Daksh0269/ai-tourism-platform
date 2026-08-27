import { cn } from '../../lib/utils';

export function Badge({
  children,
  variant = 'default',
  className,
}) {
  const variants = {
    default:
      'bg-white/55 text-slate-600 border-white/70',

    success:
      'bg-emerald-50/70 text-emerald-600 border-emerald-100/70',

    warning:
      'bg-amber-50/70 text-amber-600 border-amber-100/70',

    danger:
      'bg-red-50/70 text-red-600 border-red-100/70',

    active:
      'bg-[#007aff] text-white border-blue-400/30 shadow-[0_4px_14px_rgba(0,122,255,0.18)]',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center justify-center',
        'rounded-full border',
        'px-3 py-1',
        'text-[11px] font-medium tracking-normal',
        'backdrop-blur-xl',
        'transition-all duration-200',
        variants[variant],
        className
      )}
    >
      {children}
    </span>
  );
}