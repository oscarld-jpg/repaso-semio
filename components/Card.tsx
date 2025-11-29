import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  title?: string;
  icon?: React.ReactNode;
}

export const Card: React.FC<CardProps> = ({ children, className = '', title, icon }) => {
  return (
    <div className={`bg-white rounded-xl shadow-md border border-slate-100 overflow-hidden ${className}`}>
      {(title || icon) && (
        <div className="bg-slate-50 px-4 py-3 border-b border-slate-100 flex items-center gap-2">
          {icon && <span className="text-blue-600">{icon}</span>}
          {title && <h3 className="font-bold text-slate-700">{title}</h3>}
        </div>
      )}
      <div className="p-5">
        {children}
      </div>
    </div>
  );
};