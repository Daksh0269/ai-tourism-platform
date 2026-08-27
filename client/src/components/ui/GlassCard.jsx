import { cn } from '../../lib/utils';
import { motion } from 'framer-motion';

export function GlassCard({
  children,
  className,
  animate = false,
}) {
  const CardWrapper = animate ? motion.div : 'div';

  const animationProps = animate
    ? {
        initial: {
          opacity: 0,
          y: 20,
          scale: 0.98,
        },
        animate: {
          opacity: 1,
          y: 0,
          scale: 1,
        },
        transition: {
          duration: 0.55,
          ease: [0.23, 1, 0.32, 1],
        },
      }
    : {};

  return (
    <CardWrapper
      className={cn(
        `
          relative
          overflow-hidden
          rounded-[2rem]
          border border-white/70
          bg-white/45
          p-6 md:p-8

          backdrop-blur-2xl
          backdrop-saturate-150

          shadow-[0_20px_60px_rgba(15,23,42,0.07)]
          shadow-[inset_0_1px_0_rgba(255,255,255,0.9)]

          transition-all duration-300

          hover:bg-white/55
          hover:shadow-[0_25px_70px_rgba(15,23,42,0.09)]
        `,
        className
      )}
      {...animationProps}
    >
      {/* Subtle Liquid Glass Highlight */}
      <div
        className="
          pointer-events-none
          absolute inset-x-0 top-0
          h-px
          bg-white/90
        "
      />

      <div
        className="
          pointer-events-none
          absolute -left-20 -top-20
          h-40 w-40
          rounded-full
          bg-white/30
          blur-3xl
        "
      />

      <div className="relative z-10">
        {children}
      </div>
    </CardWrapper>
  );
}