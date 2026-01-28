import React, { forwardRef } from 'react';

interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label: React.ReactNode;
  error?: string;
}

const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ label, error, className = '', ...props }, ref) => {
    return (
      <div className="w-full">
        <label className="flex items-start gap-3 cursor-pointer group">
          <div className="relative flex items-center justify-center mt-0.5">
            <input
              ref={ref}
              type="checkbox"
              className={`
                peer w-5 h-5 rounded border-2 transition-all duration-200
                appearance-none cursor-pointer
                bg-white dark:bg-gray-700
                ${error 
                  ? 'border-red-500' 
                  : 'border-gray-300 dark:border-gray-600 checked:border-cyan-500 dark:checked:border-cyan-400'
                }
                checked:bg-cyan-500 dark:checked:bg-cyan-500
                focus:outline-none focus:ring-4 focus:ring-cyan-500/20 
                ${className}
              `}
              {...props}
            />
            <svg
              className="absolute w-3 h-3 text-white pointer-events-none opacity-0 peer-checked:opacity-100"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={3}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <span className="text-sm text-gray-600 dark:text-gray-400 select-none group-hover:text-gray-800 dark:group-hover:text-gray-200 transition-colors">{label}</span>
        </label>
        {error && (
          <p className="mt-1.5 text-xs text-red-500 ml-8">{error}</p>
        )}
      </div>
    );
  }
);

Checkbox.displayName = 'Checkbox';

export default Checkbox;
