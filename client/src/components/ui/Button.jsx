import { motion } from 'framer-motion';
import { cn } from '../../lib/utils';

export function Button({ children, variant = 'primary', className, isLoading, ...props }) {
  const baseStyles = "inline-flex items-center justify-center font-medium rounded-full px-5 py-2.5 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variants = {
    primary: "bg-apple-blue text-white hover:bg-apple-blue-hover focus:ring-apple-blue shadow-sm",
    secondary: "bg-glass text-apple-text hover:bg-white focus:ring-gray-200 shadow-apple",
    ghost: "bg-transparent text-apple-text-muted hover:text-apple-text hover:bg-black/5"
  };

  return (
    <motion.button
      whileTap={{ scale: 0.97 }}
      className={cn(baseStyles, variants[variant], className)}
      disabled={isLoading || props.disabled}
      {...props}
    >
      {isLoading ? (
        <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
      ) : null}
      {children}
    </motion.button>
  );
}