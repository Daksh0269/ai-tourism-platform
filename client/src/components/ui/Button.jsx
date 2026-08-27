import { motion } from 'framer-motion';
import { cn } from '../../lib/utils';

export function Button({
  children,
  variant = 'primary',
  className,
  isLoading,
  ...props
}) {
  const baseStyles = `
    inline-flex items-center justify-center
    rounded-full
    px-5 py-2.5
    text-sm font-medium
    transition-all duration-300
    focus:outline-none
    focus-visible:ring-2
    focus-visible:ring-apple-blue/30
    disabled:cursor-not-allowed
    disabled:opacity-50
    select-none
  `;

  const variants = {
    primary: `
      bg-[#007aff]
      text-white
      shadow-[0_6px_20px_rgba(0,122,255,0.18)]
      hover:bg-[#006ee6]
      hover:-translate-y-0.5
      hover:shadow-[0_10px_28px_rgba(0,122,255,0.25)]
    `,

    secondary: `
      border border-white/70
      bg-white/50
      text-slate-700
      backdrop-blur-xl
      shadow-[0_4px_15px_rgba(15,23,42,0.04)]
      hover:bg-white/75
      hover:shadow-[0_8px_25px_rgba(15,23,42,0.07)]
    `,

    ghost: `
      bg-transparent
      text-slate-500
      hover:bg-white/45
      hover:text-slate-800
      backdrop-blur-xl
    `,
  };

  return (
    <motion.button
      whileTap={{ scale: 0.97 }}
      className={cn(
        baseStyles,
        variants[variant],
        className
      )}
      disabled={isLoading || props.disabled}
      {...props}
    >
      {isLoading && (
        <span
          className="
            mr-2
            h-4 w-4
            rounded-full
            border-2
            border-white/30
            border-t-white
            animate-spin
          "
        />
      )}

      {children}
    </motion.button>
  );
}