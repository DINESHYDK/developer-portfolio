/**
 * About Section 1 — "Who am I?"
 * Pixar-style animated developer illustration.
 */
const IntroSvg = () => (
  <div className="flex justify-center items-center bg-[#050508] p-10 rounded-xl w-full">
    <svg
      viewBox="0 0 500 500"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full max-w-lg"
    >
      <defs>
        {/* Soft glow — screen + floating files */}
        <filter id="intro-softGlow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="5" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>

        {/* 3D depth on the head */}
        <radialGradient id="intro-skin" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#ffdbac" />
          <stop offset="100%" stopColor="#d2a679" />
        </radialGradient>

        {/* Screen lighting spill on scene */}
        <linearGradient id="intro-screenLight" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#8ECAE6" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#8ECAE6" stopOpacity="0" />
        </linearGradient>

        <style>{`
          @keyframes intro-armType {
            0%, 100% { transform: rotate(0deg); }
            50%       { transform: rotate(-3deg) translateY(-2px); }
          }
          @keyframes intro-floatFile {
            0%   { transform: translate(0,   0)    scale(0.8) rotate(0deg);  opacity: 0; }
            20%  {                                                             opacity: 1; }
            100% { transform: translate(120px, -150px) scale(0.4) rotate(15deg); opacity: 0; }
          }
          @keyframes intro-screenPulse {
            0%, 100% { filter: brightness(1);           }
            50%      { filter: brightness(1.3) contrast(1.1); }
          }
          .intro-arm-l   { animation: intro-armType 0.12s infinite;         transform-origin: 200px 320px; }
          .intro-arm-r   { animation: intro-armType 0.15s infinite reverse; transform-origin: 300px 320px; }
          .intro-file-0  { animation: intro-floatFile 3s 0s  infinite cubic-bezier(0.4,0,0.2,1); }
          .intro-file-1  { animation: intro-floatFile 3s 1s  infinite cubic-bezier(0.4,0,0.2,1); }
          .intro-file-2  { animation: intro-floatFile 3s 2s  infinite cubic-bezier(0.4,0,0.2,1); }
          .intro-monitor { animation: intro-screenPulse 3s infinite ease-in-out; }
        `}</style>
      </defs>

      {/* ── Table ── */}
      <rect x="50" y="380" width="400" height="15" rx="5" fill="#121218" />

      {/* ── Monitor ── */}
      <rect
        x="180" y="240" width="140" height="110" rx="10"
        fill="#000" stroke="#1e293b" strokeWidth="4"
        className="intro-monitor"
        filter="url(#intro-softGlow)"
      />
      {/* Screen reflection/lighting overlay */}
      <rect
        x="190" y="250" width="120" height="90" rx="6"
        fill="url(#intro-screenLight)" opacity="0.4"
      />

      {/* ── Character ── */}
      {/* Chair */}
      <rect x="190" y="330" width="120" height="60" rx="10" fill="#1a1a2e" />

      {/* Body / hoodie */}
      <path d="M190 400 Q250 320 310 400 L310 450 L190 450 Z" fill="#0f172a" />

      {/* Head */}
      <circle cx="250" cy="280" r="35" fill="url(#intro-skin)" />

      {/* Hair */}
      <path
        d="M215 265 Q250 240 285 265 L285 280 Q250 260 215 280 Z"
        fill="#2d3436"
      />

      {/* Left arm */}
      <path
        className="intro-arm-l"
        d="M210 350 Q180 370 200 385"
        stroke="#1e40af" strokeWidth="18" strokeLinecap="round" fill="none"
      />
      {/* Right arm */}
      <path
        className="intro-arm-r"
        d="M290 350 Q320 370 300 385"
        stroke="#1e40af" strokeWidth="18" strokeLinecap="round" fill="none"
      />

      {/* Hands */}
      <circle className="intro-arm-l" cx="200" cy="385" r="8" fill="#ffdbac" />
      <circle className="intro-arm-r" cx="300" cy="385" r="8" fill="#ffdbac" />

      {/* Keyboard */}
      <rect x="210" y="380" width="80" height="6" rx="2" fill="#334155" />

      {/* ── Floating MERN file icons ── */}
      {/* JS file */}
      <g className="intro-file-0">
        <rect x="320" y="250" width="40" height="50" rx="4" fill="#61DBFB" filter="url(#intro-softGlow)" />
        <text x="328" y="280" fontSize="10" fill="#fff" fontWeight="bold">JS</text>
      </g>

      {/* React file */}
      <g className="intro-file-1">
        <rect x="320" y="250" width="40" height="50" rx="4" fill="#38bdf8" filter="url(#intro-softGlow)" />
        <circle cx="340" cy="275" r="8" stroke="#fff" fill="none" strokeWidth="2" />
      </g>

      {/* Node / DB file */}
      <g className="intro-file-2">
        <rect x="320" y="250" width="40" height="50" rx="4" fill="#4ade80" filter="url(#intro-softGlow)" />
        <rect x="330" y="265" width="20" height="20" fill="#fff" opacity="0.6" />
      </g>
    </svg>
  </div>
);

export default IntroSvg;
