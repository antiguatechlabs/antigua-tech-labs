'use client';
import React, { useRef, useEffect } from 'react';

interface SpotlightCardProps extends React.PropsWithChildren {
  className?: string;
  spotlightColor?: `rgba(${number}, ${number}, ${number}, ${number})`;
}

const SpotlightCard: React.FC<SpotlightCardProps> = ({
  children,
  className = '',
  spotlightColor = 'rgba(255, 255, 255, 0.25)',
}) => {
  const divRef = useRef<HTMLDivElement>(null);

  const handleMouseMove: React.MouseEventHandler<HTMLDivElement> = e => {
    if (!divRef.current) return;

    const rect = divRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    divRef.current.style.setProperty('--mouse-x', `${x}px`);
    divRef.current.style.setProperty('--mouse-y', `${y}px`);
    divRef.current.style.setProperty('--spotlight-color', spotlightColor);
  };

  // Inject CSS styles once on mount
  useEffect(() => {
    const styleId = 'spotlight-card-styles';
    if (document.getElementById(styleId)) return;

    const style = document.createElement('style');
    style.id = styleId;
    style.innerHTML = `
      .card-spotlight {
        position: relative;
        border-radius: 0.75rem;
        padding: 2rem;
        overflow: hidden;
        --mouse-x: 50%;
        --mouse-y: 50%;
        --spotlight-color: rgba(255, 255, 255, 0.05);
      }

      .card-spotlight::before {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: radial-gradient(
          circle at var(--mouse-x) var(--mouse-y),
          var(--spotlight-color),
          transparent 80%
        );
        opacity: 0;
        transition: opacity 0.5s ease;
        pointer-events: none;
      }

      .card-spotlight:hover::before,
      .card-spotlight:focus-within::before {
        opacity: 0.6;
      }
    `;
    document.head.appendChild(style);
  }, []);

  return (
    <div
      ref={divRef}
      onMouseMove={handleMouseMove}
      className={`card-spotlight ${className}`}
    >
      {children}
    </div>
  );
};

export default SpotlightCard;
