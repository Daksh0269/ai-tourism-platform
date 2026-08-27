import { cn } from '../../lib/utils';
import { forwardRef } from 'react';

export const Input = forwardRef(({ className, label, icon: Icon, ...props }, ref) => {
  return (
    <div className="flex flex-col gap-1.5">
      {label && <label className="text-sm font-medium text-apple-text ml-1">{label}</label>}
      <div className="relative">
        {Icon && (
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-apple-text-muted">
            <Icon size={18} />
          </div>
        )}
        <input
          ref={ref}
          className={cn(
            "w-full bg-black/[0.03] hover:bg-black/[0.05] border border-transparent rounded-2xl px-4 py-3.5 text-apple-text placeholder:text-apple-text-muted focus:bg-white focus:border-apple-blue/30 focus:ring-4 focus:ring-apple-blue/10 transition-all outline-none",
            Icon && "pl-11",
            className
          )}
          {...props}
        />
      </div>
    </div>
  );
});
Input.displayName = 'Input';