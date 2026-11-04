import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { projects, roles, stackRows, stats } from "./data.js";
import { ProjectVisual } from "./Core.jsx";

const rotations = [-7, 5, 13];

function DotField() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext("2d");
    const pointer = { x: -999, y: -999 };
    let width = 0;
    let height = 0;
    let frame = 0;
    let dots = [];

    const build = () => {
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      canvas.width = Math.floor(width * ratio);
      canvas.height = Math.floor(height * ratio);
      context.setTransform(ratio, 0, 0, ratio, 0, 0);

      dots = [];
      const gap = 32;
      for (let x = gap / 2; x < width; x += gap) {
        for (let y = gap / 2; y < height; y += gap) {
          dots.push({ x, y, ox: 0, oy: 0 });
        }
      }
    };

    const move = (event) => {
      const rect = canvas.getBoundingClientRect();
      pointer.x = event.clientX - rect.left;
      pointer.y = event.clientY - rect.top;
    };

    const leave = () => {
      pointer.x = -999;
      pointer.y = -999;
    };

    const draw = () => {
      context.clearRect(0, 0, width, height);
      context.fillStyle = "rgba(13, 13, 12, 0.28)";

      dots.forEach((dot) => {
        const dx = dot.x - pointer.x;
        const dy = dot.y - pointer.y;
        const distance = Math.hypot(dx, dy);
        const force = distance < 150 ? (150 - distance) / 150 : 0;
        const targetX = force ? (dx / distance) * force * 22 : 0;
        const targetY = force ? (dy / distance) * force * 22 : 0;

        dot.ox += (targetX - dot.ox) * 0.12;
        dot.oy += (targetY - dot.oy) * 0.12;

        context.beginPath();
        context.arc(dot.x + dot.ox, dot.y + dot.oy, 1.15, 0, Math.PI * 2);
        context.fill();
      });

      frame = requestAnimationFrame(draw);
    };

    build();
    draw();

    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("pointerleave", leave);
    window.addEventListener("resize", build);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerleave", leave);
      window.removeEventListener("resize", build);
    };
  }, []);

  return <canvas className="studio-dots" ref={canvasRef} aria-hidden="true" />;
}

function StudioBadge() {
  return (
    <svg className="studio-badge" viewBox="0 0 140 140" aria-hidden="true">
      <defs>
        <path
          id="studio-badge-path"
          d="M70,70 m-52,0 a52,52 0 1,1 104,0 a52,52 0 1,1 -104,0"
        />
      </defs>
      <text>
        <textPath href="#studio-badge-path">
          FULL-STACK ENGINEER · BELGRADE · PORTFOLIO 2026 ·
        </textPath>
      </text>
      <circle cx="70" cy="70" r="3.5" />
    </svg>
  );
}

function StudioThumb({ project }) {
  if (project.visual === "ulus") {
    return (
      <div className="studio-thumb">
        <video src="/textures/project/ulus.mp4" autoPlay muted loop playsInline />
      </div>
    );
  }

  if (project.visual === "market") {
    return (
      <div className="studio-thumb">
        <svg viewBox="0 0 420 260" aria-hidden="true">
          <g className="st-grid">
            {[50, 90, 130, 170, 210].map((y) => (
              <path key={y} d={`M24 ${y}H396`} />
            ))}
          </g>
          <path
            className="st-market-line"
            d="M24 204 C70 196 92 164 132 172 S196 130 236 118 S306 78 344 62 S380 44 396 36"
          />
          <path
            className="st-market-line st-market-line-b"
            d="M24 226 C78 220 108 196 150 200 S220 158 262 150 S332 112 370 102 S390 94 396 90"
          />
          <circle className="st-market-dot" cx="236" cy="118" r="4" />
          <circle className="st-market-dot" cx="344" cy="62" r="4" />
        </svg>
      </div>
    );
  }

  if (project.visual === "chain") {
    return (
      <div className="studio-thumb">
        <svg viewBox="0 0 420 260" aria-hidden="true">
          <g className="st-chain-box">
            <rect x="32" y="104" width="96" height="60" />
            <rect x="162" y="104" width="96" height="60" className="st-chain-hot" />
            <rect x="292" y="104" width="96" height="60" />
          </g>
          <g className="st-chain-link">
            <path d="M128 134H162" />
            <path d="M258 134H292" />
          </g>
          <g className="st-chain-text">
            <text x="80" y="138">API</text>
            <text x="210" y="138">ESCROW</text>
            <text x="340" y="138">LEDGER</text>
          </g>
        </svg>
      </div>
    );
  }

  return (
    <div className="studio-thumb">
      <svg viewBox="0 0 420 260" aria-hidden="true">
        <g className="st-kernel-bar">
          <rect x="80" y="46" width="260" height="40" className="st-kernel-hot" />
          <rect x="80" y="96" width="260" height="40" />
          <rect x="80" y="146" width="260" height="40" />
          <rect x="80" y="196" width="94" height="40" className="st-kernel-warm" />
        </g>
        <g className="st-kernel-text">
          <text x="94" y="71">KERNEL TEXT</text>
          <text x="94" y="121">HEAP</text>
          <text x="94" y="171">STACK / THREADS</text>
          <text x="94" y="221">MMIO</text>
        </g>
      </svg>
    </div>
  );
}

function Deck() {
  const [order, setOrder] = useState(projects.slice(0, 3));

  const shift = (direction) => {
    setOrder((current) => {
      if (direction === "next") {
        return [...current.slice(1), current[0]];
      }
      return [current[current.length - 1], ...current.slice(0, -1)];
    });
  };

  return (
    <div className="studio-deck" aria-label="Project deck. Drag the top card or use the arrows.">
      <div className="studio-deck-stack">
        {order.map((project, index) => (
          <motion.div
            key={project.id}
            className={`studio-card tone-${project.id}`}
            style={{ zIndex: 4 - index }}
            animate={{
              rotate: rotations[index],
              x: index * 26,
              y: index * 22,
              scale: 1 - index * 0.045,
            }}
            transition={{ type: "spring", stiffness: 260, damping: 26 }}
            drag={index === 0 ? "x" : false}
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.42}
            onDragEnd={(event, info) => {
              if (info.offset.x < -52) shift("next");
              else if (info.offset.x > 52) shift("prev");
            }}
            data-cursor
          >
            <div className="studio-card-top">
              <span>{project.index}</span>
              <span>{project.year}</span>
            </div>
            <div className="studio-card-title">{project.title}</div>
            <div className="studio-card-sub">{project.subtitle}</div>
            <StudioThumb project={project} />
            <div className="studio-card-foot">
              <span>{project.metric}</span>
              <span>{project.tags.slice(0, 2).join(" / ")}</span>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="studio-deck-controls">
        <button type="button" onClick={() => shift("prev")} aria-label="Previous project">←</button>
        <span>Drag the stack</span>
        <button type="button" onClick={() => shift("next")} aria-label="Next project">→</button>
      </div>
    </div>
  );
}

function Rise({ children, className = "", delay = 0 }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-70px" }}
      transition={{ duration: 0.7, delay, ease: [0.23, 1, 0.32, 1] }}
    >
      {children}
    </motion.div>
  );
}

const stickerRotations = [-4, 2, -2, 5, -3, 1, 4, -1, 3, -5, 2, -2, 4, -3, 1, 5, -1, 2, -4, 3, -2];

export default function Studio() {
  const [active, setActive] = useState(0);
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText("shehu.meni@gmail.com");
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      window.location.href = "mailto:shehu.meni@gmail.com";
    }
  };

  const activeProject = projects[active];
  const allTools = stackRows.flat();

  return (
    <div className="studio">
      <header className="studio-nav">
        <a className="studio-logo" href="#top" aria-label="Gazmend Shehu, home">
          GS<span>/26</span>
        </a>
        <nav className="studio-links" aria-label="Primary">
          <a href="#work">Work</a>
          <a href="#about">About</a>
          <a href="#experience">Experience</a>
          <a href="#contact">Contact</a>
        </nav>
        <a className="studio-nav-mail" href="mailto:shehu.meni@gmail.com">
          Email me
          <svg viewBox="0 0 12 12" aria-hidden="true">
            <path d="M2 10 10 2M4 2h6v6" fill="none" stroke="currentColor" strokeWidth="1.4" />
          </svg>
        </a>
      </header>

      <main>
        <section className="studio-hero" id="top">
          <DotField />
          <div className="studio-wrap studio-hero-grid">
            <div className="studio-hero-copy">
              <motion.div
                className="studio-hero-meta"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                <span>Portfolio / 2026</span>
                <span>Belgrade, RS</span>
                <span>44.8°N / 20.4°E</span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 0.15, ease: [0.23, 1, 0.32, 1] }}
              >
                <span>Gazmend</span>
                <span className="is-outline">Shehu</span>
              </motion.h1>

              <motion.div
                className="studio-role"
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.35, ease: [0.23, 1, 0.32, 1] }}
              >
                <span>Full-stack</span>
                <span>engineer</span>
              </motion.div>

              <motion.p
                className="studio-lede"
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.45, ease: [0.23, 1, 0.32, 1] }}
              >
                Interfaces, services, and the systems underneath. Built in
                Belgrade, shipped wherever the work is.
              </motion.p>

              <motion.div
                className="studio-actions"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.55, ease: [0.23, 1, 0.32, 1] }}
              >
                <a className="studio-btn" href="#work">
                  Explore the work
                  <svg viewBox="0 0 12 12" aria-hidden="true">
                    <path d="M6 1v9M2.5 6.5 6 10l3.5-3.5" fill="none" stroke="currentColor" strokeWidth="1.4" />
                  </svg>
                </a>
                <a className="studio-text-link" href="/prototype/assets/Gazmend-Shehu-Resume.pdf" download>
                  Download résumé
                </a>
              </motion.div>

              <motion.div
                className="studio-hero-foot"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.7 }}
              >
                <span><i />Scroll to explore</span>
                <span>4 projects / 2024—2026</span>
              </motion.div>
            </div>

            <motion.div
              className="studio-hero-right"
              initial={{ opacity: 0, y: 26 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.3, ease: [0.23, 1, 0.32, 1] }}
            >
              <StudioBadge />
              <Deck />
            </motion.div>
          </div>
        </section>

        <div className="studio-ticker" aria-hidden="true">
          <div>
            <span>Full-stack engineer</span><b>✳</b>
            <span>Interfaces</span><b>✳</b>
            <span>Services</span><b>✳</b>
            <span>Systems</span><b>✳</b>
            <span>Belgrade, RS</span><b>✳</b>
            <span>Full-stack engineer</span><b>✳</b>
            <span>Interfaces</span><b>✳</b>
            <span>Services</span><b>✳</b>
            <span>Systems</span><b>✳</b>
            <span>Belgrade, RS</span><b>✳</b>
          </div>
        </div>

        <section className="studio-about" id="about">
          <div className="studio-wrap">
            <Rise className="studio-sec-head">
              <span className="studio-kicker">01 / About</span>
              <h2>A builder,<br />not a slide deck.</h2>
            </Rise>

            <div className="studio-about-grid">
              <Rise className="studio-about-copy">
                <p className="studio-lead">
                  I care about the unglamorous parts: clean boundaries, real
                  tests, a deploy that behaves the same twice. The demo is the
                  easy bit.
                </p>
                <p>
                  I&apos;ve spent the last few years between React and the
                  infrastructure under it — art platforms, market engines,
                  escrowed storefronts, and a small kernel. Different surfaces,
                  same standard: it has to hold.
                </p>
                <div className="studio-stat-row">
                  {stats.map((stat) => (
                    <div className="studio-stat" key={stat.label}>
                      <strong>{stat.value}</strong>
                      <span>{stat.label}</span>
                    </div>
                  ))}
                </div>
              </Rise>

              <Rise className="studio-portrait" delay={0.08}>
                <img src="/prototype/assets/gazmend.jpg" alt="Gazmend Shehu" />
                <div className="studio-portrait-label">
                  <span>Gazmend Shehu</span>
                  <span>Belgrade / 2026</span>
                </div>
              </Rise>
            </div>
          </div>
        </section>

        <section className="studio-work" id="work">
          <div className="studio-wrap">
            <Rise className="studio-sec-head">
              <span className="studio-kicker">02 / Selected work</span>
              <h2>Things<br />I&apos;ve shipped.</h2>
            </Rise>

            <div className="studio-work-grid">
              <div className="studio-work-list">
                {projects.map((project, index) => (
                  <button
                    type="button"
                    key={project.id}
                    className={`studio-work-row ${active === index ? "is-active" : ""}`}
                    onMouseEnter={() => setActive(index)}
                    onFocus={() => setActive(index)}
                    onClick={() => setActive(index)}
                  >
                    <span className="studio-work-index">{project.index}</span>
                    <span className="studio-work-title">{project.title}</span>
                    <span className="studio-work-year">{project.year}</span>
                    <span className="studio-work-arrow">↗</span>
                  </button>
                ))}
              </div>

              <div className="studio-preview" aria-live="polite">
                <ProjectVisual project={activeProject} />
                <div className="studio-preview-copy">
                  <div className="studio-preview-meta">
                    <span>{activeProject.subtitle}</span>
                    <span>{activeProject.year}</span>
                  </div>
                  <p>{activeProject.blurb}</p>
                  <div className="studio-preview-tags">
                    {activeProject.tags.map((tag) => (
                      <span key={tag}>{tag}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="studio-xp" id="experience">
          <div className="studio-wrap">
            <Rise className="studio-sec-head">
              <span className="studio-kicker">03 / Experience</span>
              <h2>Where<br />I&apos;ve been.</h2>
            </Rise>

            <div className="studio-xp-list">
              {roles.map((role, index) => (
                <Rise key={role.company} delay={index * 0.05}>
                  <article className="studio-xp-row" data-cursor>
                    <span className="studio-xp-year">{role.year}</span>
                    <div className="studio-xp-main">
                      <h3>{role.company}</h3>
                      <p>{role.role} / {role.place}</p>
                    </div>
                    <p className="studio-xp-line">{role.line}</p>
                    <span className="studio-xp-index">0{index + 1}</span>
                  </article>
                </Rise>
              ))}
            </div>
          </div>
        </section>

        <section className="studio-toolkit" id="toolkit">
          <div className="studio-wrap">
            <Rise className="studio-sec-head">
              <span className="studio-kicker">04 / Toolkit</span>
              <h2>Stickers<br />on the laptop.</h2>
            </Rise>

            <div className="studio-stickers">
              {allTools.map((tool, index) => (
                <span
                  className={`studio-sticker tone-${index % 4}`}
                  key={`${tool}-${index}`}
                  style={{ "--rot": `${stickerRotations[index % stickerRotations.length]}deg` }}
                  data-cursor
                >
                  {tool}
                </span>
              ))}
            </div>

            <div className="studio-toolkit-foot">
              <div>
                <span className="studio-kicker">Education</span>
                <p>B.S. Software Engineering — University of Belgrade, School of Electrical Engineering.</p>
              </div>
              <div>
                <span className="studio-kicker">Languages</span>
                <p>Albanian (native), English (fluent), Serbian (fluent).</p>
              </div>
              <div>
                <span className="studio-kicker">Based</span>
                <p>Belgrade, Serbia. Working remotely with teams across time zones.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="studio-contact" id="contact">
          <div className="studio-wrap">
            <div className="studio-contact-top">
              <span className="studio-kicker">05 / Contact</span>
              <span>Belgrade, RS</span>
            </div>
            <Rise>
              <h2>Let&apos;s build<br />something.</h2>
            </Rise>
            <a className="studio-email" href="mailto:shehu.meni@gmail.com" data-cursor>
              shehu.meni@gmail.com
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M4 20 20 4M7 4h13v13" fill="none" stroke="currentColor" strokeWidth="1.6" />
              </svg>
            </a>
            <div className="studio-contact-row">
              <button type="button" className="studio-copy" onClick={copyEmail}>
                {copied ? "Copied" : "Copy address"}
              </button>
              <div className="studio-socials">
                <a href="https://github.com/zigameni" target="_blank" rel="noreferrer">GitHub ↗</a>
                <a href="https://linkedin.com/in/gazmend-shehu" target="_blank" rel="noreferrer">LinkedIn ↗</a>
                <a href="/prototype/assets/Gazmend-Shehu-Resume.pdf" download>Résumé ↓</a>
              </div>
            </div>
            <footer className="studio-foot">
              <span>© 2026 Gazmend Shehu</span>
              <span>Portfolio / 2026</span>
              <a href="#top">Back to top ↑</a>
            </footer>
          </div>
        </section>
      </main>
    </div>
  );
}
