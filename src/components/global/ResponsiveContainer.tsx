import React from 'react';
import { useWindowSize } from '../../hooks/useWindowSize';

interface ResponsiveContainerProps {
  children: React.ReactNode;
  className?: string;
}

export const ResponsiveContainer = ({ children, className = '' }: ResponsiveContainerProps) => {
  const { isMobile, isTablet, isDesktop } = useWindowSize();

  return (
    <div className={`
      relative min-h-screen w-full
      ${isMobile ? 'px-4 pb-32' : ''}
      ${isTablet ? 'px-6 pb-36' : ''}
      ${isDesktop ? 'px-8 pb-0' : ''}
      ${className}
    `}>
      {children}
    </div>
  );
};
