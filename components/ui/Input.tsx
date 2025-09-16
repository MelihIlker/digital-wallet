import React, { useId } from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: React.ReactNode;
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  icon,
  className = '',
  id,
  ...props
}) => {
  const reactId = useId();
  const inputId = id || `input-${reactId.replace(/[:]/g, '')}`;
  
  return (
    <div className="w-full">
      {label && (
        <label htmlFor={inputId} className="block text-sm font-medium text-white mb-2">
          {label}
        </label>
      )}
      <div className="relative">
        {icon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <span className="text-slate-400 text-sm">
              {icon}
            </span>
          </div>
        )}
        <input
          id={inputId}
          className={`
            w-full px-4 py-3 bg-slate-800/50 border border-slate-600 rounded-xl
            text-white placeholder-slate-400
            focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:bg-slate-800
            transition-all duration-200
            ${icon ? 'pl-10' : ''}
            ${error ? 'border-red-500 bg-red-900/20' : ''}
            ${className}
          `}
          {...props}
        />
      </div>
      {error && (
        <p className="mt-1 text-sm text-red-400">{error}</p>
      )}
    </div>
  );
};
