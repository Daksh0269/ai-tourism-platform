import { cn } from '../../lib/utils';

export function Badge({ children, variant = 'default', className }) {
  const variants = {
    default: "bg-black/5 text-apple-text-muted",
    success: "bg-green-100 text-green-800",
    warning: "bg-orange-100 text-orange-800",
    danger: "bg-red-100 text-red-800",
    active: "bg-apple-blue text-white",
  };

  return (
    <span className={cn("px-2.5 py-1 rounded-full text-xs font-semibold tracking-wide uppercase", variants[variant], className)}>
      {children}
    </span>
  );
}