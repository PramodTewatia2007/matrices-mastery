import React, { useMemo } from 'react';
import katex from 'katex';

interface KaTeXProps {
  math: string;
  block?: boolean;
  className?: string;
}

export const KaTeX: React.FC<KaTeXProps> = ({ math, block = false, className = '' }) => {
  const html = useMemo(() => {
    try {
      return katex.renderToString(math, {
        displayMode: block,
        throwOnError: false,
      });
    } catch (error) {
      console.error("KaTeX rendering error:", error);
      return `<span class="text-rose-400 font-mono text-sm">${math}</span>`;
    }
  }, [math, block]);

  if (block) {
    return (
      <div 
        className={`my-3 overflow-x-auto py-1 text-center ${className}`}
        dangerouslySetInnerHTML={{ __html: html }} 
      />
    );
  }

  return (
    <span 
      className={`inline-block mx-0.5 ${className}`}
      dangerouslySetInnerHTML={{ __html: html }} 
    />
  );
};

export default KaTeX;
