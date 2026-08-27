import { cn } from '../../lib/utils';
import { motion } from 'framer-motion';

export function GlassCard({ children, className, animate = false }) {
  const CardWrapper = animate ? motion.div : 'div';
  const animationProps = animate ? {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.4, ease: [0.23, 1, 0.32, 1] }
  } : {};

  return (
    <CardWrapper 
      className={cn("bg-glass rounded-3xl p-6 md:p-8 shadow-apple", className)}
      {...animationProps}
    >
      {children}
    </CardWrapper>
  );
}