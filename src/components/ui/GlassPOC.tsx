import React from 'react';

const GlassPOC: React.FC = () => {
  return (
    <div style={{ position: 'relative', width: 400, height: 300 }}>
      {/* SVG filter def, rendered nowhere visible */}
      <svg width="0" height="0" style={{ position: 'absolute' }}>
        <defs>
          <filter id="liquid-glass" x="-50%" y="-50%" width="200%" height="200%">
            <feTurbulence type="fractalNoise" baseFrequency="0.01" numOctaves="3" result="noise" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="40" xChannelSelector="R" yChannelSelector="G" />
          </filter>
        </defs>
      </svg>

      {/* background pattern to prove refraction is happening */}
      {/* <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage:
            'repeating-linear-gradient(0deg, #333 0 10px, #999 10px 20px), repeating-linear-gradient(90deg, #333 0 10px, #999 10px 20px)',
          backgroundBlendMode: 'difference',
        }}
      /> */}

      {/* the glass panel */}
      <div
        style={{
          position: 'absolute',
          top: 60,
          left: 100,
          width: 200,
          height: 150,
          borderRadius: 24,
          background: 'rgba(255,255,255,0.1)',
          boxShadow: 'inset 0 0 20px rgba(255,255,255,0.4)',
          backdropFilter: 'url(#liquid-glass)',
          WebkitBackdropFilter: 'url(#liquid-glass)',
        }}
      />
    </div>
  );
};

export default GlassPOC;