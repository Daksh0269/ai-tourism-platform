import { cn } from '../../lib/utils';
import { forwardRef } from 'react';

export const Input = forwardRef(
  ({ className, label, icon: Icon, ...props }, ref) => {
    return (
      <div className="flex flex-col gap-2">
        {label && (
          <label className="ml-1 text-xs font-medium text-slate-500">
            {label}
          </label>
        )}

        <div className="relative">
          {Icon && (
            <div className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
              <Icon size={17} strokeWidth={1.8} />
            </div>
          )}

          <input
            ref={ref}
            className={cn(
              `
                w-full
                rounded-2xl
                border border-white/70
                bg-white/45
                px-4 py-3.5
                text-sm font-medium text-slate-800
                placeholder:text-slate-400

                backdrop-blur-xl

                outline-none

                shadow-[inset_0_1px_0_rgba(255,255,255,0.75)]

                transition-all duration-300

                hover:bg-white/60

                focus:border-blue-300/60
                focus:bg-white/70
                focus:shadow-[0_0_0_4px_rgba(0,122,255,0.07)]
              `,
              Icon && 'pl-11',
              className
            )}
            {...props}
          />
        </div>
      </div>
    );
  }
);

Input.displayName = 'Input';