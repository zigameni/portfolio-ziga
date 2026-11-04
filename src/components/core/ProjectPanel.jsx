function MarketVisual() {
  return (
    <div className="pv pv-market">
      <svg viewBox="0 0 640 420" aria-hidden="true">
        <g className="pv-grid">
          {[60, 120, 180, 240, 300, 360].map((y) => (
            <path key={y} d={`M40 ${y}H600`} />
          ))}
          {[100, 180, 260, 340, 420, 500, 580].map((x) => (
            <path key={x} d={`M${x} 40V370`} />
          ))}
        </g>
        <path
          className="pv-area"
          d="M40 300 C110 286 150 246 210 252 S300 196 360 180 S450 120 520 98 S570 74 600 66 L600 370 L40 370 Z"
        />
        <path
          className="pv-line pv-line-a"
          d="M40 300 C110 286 150 246 210 252 S300 196 360 180 S450 120 520 98 S570 74 600 66"
        />
        <path
          className="pv-line pv-line-b"
          d="M40 330 C120 320 170 290 230 296 S330 240 390 230 S480 180 540 166 S580 150 600 142"
        />
        <path
          className="pv-line pv-line-c"
          d="M40 348 C110 340 180 320 240 316 S340 286 400 274 S500 244 560 232 S590 222 600 216"
        />
        <g className="pv-dots">
          <circle cx="210" cy="252" r="3.5" />
          <circle cx="360" cy="180" r="3.5" />
          <circle cx="520" cy="98" r="3.5" />
        </g>
        <g className="pv-labels">
          <text x="40" y="398">OBSERVATIONS</text>
          <text x="272" y="398">ENSEMBLE</text>
          <text x="512" y="398">SETTLE</text>
        </g>
      </svg>
      <span className="pv-flag">51 CITIES / ~2,750 MARKETS</span>
    </div>
  );
}

function ChainVisual() {
  return (
    <div className="pv pv-chain">
      <svg viewBox="0 0 640 420" aria-hidden="true">
        <g className="pv-chain-boxes">
          <rect x="44" y="160" width="150" height="100" />
          <rect x="245" y="160" width="150" height="100" className="is-hot" />
          <rect x="446" y="160" width="150" height="100" />
        </g>
        <g className="pv-chain-links">
          <path d="M194 210H245" />
          <path d="M395 210H446" />
        </g>
        <g className="pv-chain-labels">
          <text x="119" y="207">API</text>
          <text x="320" y="207">ESCROW</text>
          <text x="521" y="207">LEDGER</text>
        </g>
        <g className="pv-chain-meta">
          <text x="44" y="305">4 FLASK SERVICES</text>
          <text x="44" y="325">JWT + ROLE ACCESS</text>
          <text x="446" y="305">MYSQL / WEB3.PY</text>
          <text x="446" y="325">DOCKER COMPOSE</text>
        </g>
      </svg>
      <span className="pv-flag">4 SERVICES / 1 COMPOSE FILE</span>
    </div>
  );
}

function KernelVisual() {
  return (
    <div className="pv pv-kernel">
      <svg viewBox="0 0 640 420" aria-hidden="true">
        <g className="pv-kernel-bars">
          <rect x="120" y="62" width="400" height="54" className="is-hot" />
          <rect x="120" y="126" width="400" height="54" />
          <rect x="120" y="190" width="400" height="54" />
          <rect x="120" y="254" width="148" height="54" className="is-warm" />
        </g>
        <g className="pv-kernel-labels">
          <text x="140" y="95">KERNEL TEXT</text>
          <text x="140" y="159">HEAP — FIRST FIT</text>
          <text x="140" y="223">STACK / THREADS</text>
          <text x="140" y="287">MMIO</text>
        </g>
        <g className="pv-kernel-address">
          <text x="40" y="70">0x0000</text>
          <text x="40" y="320">0xFFFF</text>
        </g>
        <rect className="pv-scan" x="120" y="62" width="400" height="2" />
      </svg>
      <span className="pv-flag">PREEMPTIVE / TRAP-DRIVEN</span>
    </div>
  );
}

export function ProjectVisual({ project }) {
  if (project.visual === "ulus") {
    return (
      <div className="pv pv-ulus">
        <video
          src="/textures/project/ulus.mp4"
          autoPlay
          muted
          loop
          playsInline
        />
        <span className="pv-flag">PRODUCTION PLATFORM</span>
      </div>
    );
  }
  if (project.visual === "market") return <MarketVisual />;
  if (project.visual === "chain") return <ChainVisual />;
  return <KernelVisual />;
}

export default function ProjectPanel({ project }) {
  return (
    <article className="core-panel" data-cursor>
      <div className="core-panel-copy">
        <div className="core-panel-meta">
          <span>{project.index}</span>
          <span>{project.year}</span>
        </div>
        <h3>{project.title}</h3>
        <p className="core-panel-sub">{project.subtitle}</p>
        <p className="core-panel-blurb">{project.blurb}</p>
        <div className="core-panel-foot">
          <span>{project.metric}</span>
          <span>{project.tags.join(" / ")}</span>
        </div>
      </div>
      <div className="core-panel-visual">
        <ProjectVisual project={project} />
      </div>
    </article>
  );
}
