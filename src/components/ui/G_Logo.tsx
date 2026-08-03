import React from 'react';

const VIEWBOX = '-360 0 922 922';

// Exact paths from the source SVG (unmodified) — the small slivers are real
// geometry needed to close the shape correctly, not artifacts to discard.
const G_MASK_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${VIEWBOX}">
  <path fill-rule="evenodd" clip-rule="evenodd" d="M465.116 384.168C516.254 384.168 558.138 423.789 561.748 474.009C558.661 423.867 517.028 384.168 466.111 384.168H465.116Z" fill="white"/>
  <path fill-rule="evenodd" clip-rule="evenodd" d="M560.45 498.413C561.468 492.781 562 486.981 562 481.056C562 478.686 561.915 476.336 561.748 474.009C561.869 475.987 561.931 477.982 561.931 479.991V480.429C561.931 485.862 561.479 491.189 560.611 496.375C560.62 496.257 560.629 496.139 560.638 496.021C560.645 495.931 560.652 495.842 560.659 495.753C560.663 495.696 560.667 495.64 560.671 495.583C560.673 495.556 560.675 495.529 560.677 495.501L560.671 495.583L560.659 495.753L560.638 496.021L560.611 496.375C560.586 496.697 560.561 497.018 560.536 497.339L560.515 497.598L560.509 497.673C560.49 497.92 560.47 498.167 560.45 498.413Z" fill="white"/>
  <path fill-rule="evenodd" clip-rule="evenodd" d="M560.659 495.753L560.638 496.021L560.611 496.375C560.633 496.084 560.656 495.793 560.677 495.501L560.671 495.583L560.659 495.753Z" fill="white"/>
  <path d="M343.293 576.252C331.459 601.133 315.78 624.221 296.657 644.603C254.655 689.368 198.575 718.379 137.771 726.793C76.9684 735.21 15.1165 722.523 -37.4632 690.849C-90.0445 659.176 -130.176 610.431 -151.163 552.744C-172.151 495.058 -172.726 431.92 -152.792 373.863C-132.858 315.803 -93.6218 266.336 -41.6266 233.71C10.3686 201.084 71.9793 187.273 132.926 194.579C193.179 201.804 249.181 229.236 291.814 272.368C309.517 292.402 335.403 305.035 364.24 305.035C417.601 305.035 460.859 261.776 460.859 208.415C460.859 178.629 447.381 151.992 426.192 134.268C353.286 61.6957 258.137 15.5415 155.862 3.27883C51.1512 -9.27561 -54.6964 14.4526 -144.026 70.5055C-233.357 126.559 -300.768 211.546 -335.016 311.293C-369.263 411.04 -368.275 519.514 -332.217 618.62C-296.16 717.727 -227.212 801.473 -136.877 855.891C-46.5406 910.307 59.7223 932.105 164.187 917.646C268.65 903.186 364.997 853.345 437.158 776.438C508.543 700.354 551.988 602.333 560.45 498.413L560.509 497.673L560.515 497.598L560.536 497.339C560.561 497.018 560.586 496.697 560.611 496.375C561.479 491.189 561.931 485.862 561.931 480.429V479.991C561.931 477.982 561.869 475.987 561.748 474.009C558.138 423.789 516.254 384.168 465.116 384.168H158.352C105.424 384.168 62.5314 427.062 62.5314 479.991V480.429C62.5314 533.358 105.424 576.252 158.352 576.252H343.293ZM560.611 496.375L560.638 496.021L560.659 495.753L560.671 495.583L560.677 495.501C560.656 495.793 560.633 496.084 560.611 496.375Z" fill="white"/>
</svg>`;

const maskUrl = `url("data:image/svg+xml,${encodeURIComponent(G_MASK_SVG)}")`;

const GLogo: React.FC<{ size?: number }> = ({ size = 250 }) => {
  return (
    <div style={{ position: 'relative', width: 400, height: 400 }} className='flex flex-col items-center justify-center'>
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

      {/* the glass panel, G-shaped via mask */}
      <div
        style={{
          position: 'absolute',
          top: 25,
          left: 75,
          width: size,
          height: (size * 683) / 562,
          background: 'rgba(255,255,255,0.1)',
          boxShadow: 'inset 0 0 20px rgba(255,255,255,0.4)',
          backdropFilter: 'url(#liquid-glass)',
          WebkitBackdropFilter: 'url(#liquid-glass)',
          WebkitMaskImage: maskUrl,
          maskImage: maskUrl,
          WebkitMaskSize: '100% 100%',
          maskSize: '100% 100%',
          WebkitMaskRepeat: 'no-repeat',
          maskRepeat: 'no-repeat',
        }}
      />
    </div>
  );
};

export default GLogo;