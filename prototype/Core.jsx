import React, { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial } from "@react-three/drei";
import * as THREE from "three";
import { motion, useScroll, useTransform } from "framer-motion";
import { projects, roles, stackRows, stats } from "./data.js";

function useIsMobile() {
  const [mobile, setMobile] = useState(() =>
    window.matchMedia("(max-width: 900px)").matches
  );

  useEffect(() => {
    const query = window.matchMedia("(max-width: 900px)");
    const update = (event) => setMobile(event.matches);
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  return mobile;
}

function Reveal({ children, className = "", delay = 0 }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-70px" }}
      transition={{ duration: 0.72, delay, ease: [0.23, 1, 0.32, 1] }}
    >
      {children}
    </motion.div>
  );
}

function Clock() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const format = new Intl.DateTimeFormat("en-GB", {
      timeZone: "Europe/Belgrade",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
    const update = () => setTime(format.format(new Date()));
    update();
    const timer = window.setInterval(update, 30000);
    return () => window.clearInterval(timer);
  }, []);

  return <span>{time} CET</span>;
}

function Dust() {
  const points = useRef();

  const positions = useMemo(() => {
    const values = new Float32Array(760 * 3);
    for (let i = 0; i < 760; i += 1) {
      const radius = 2.7 + Math.random() * 4.4;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      values[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      values[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      values[i * 3 + 2] = radius * Math.cos(phi);
    }
    return values;
  }, []);

  useFrame((state, delta) => {
    if (points.current) points.current.rotation.y += delta * 0.018;
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        color="#ff8a63"
        size={0.022}
        sizeAttenuation
        transparent
        opacity={0.6}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

function Sculpture() {
  const group = useRef();
  const rings = useRef();

  useFrame((state, delta) => {
    if (!group.current) return;
    const time = state.clock.elapsedTime;

    group.current.rotation.y += delta * 0.1;
    group.current.rotation.x = THREE.MathUtils.lerp(
      group.current.rotation.x,
      state.pointer.y * 0.3,
      0.045
    );
    group.current.rotation.z = THREE.MathUtils.lerp(
      group.current.rotation.z,
      -state.pointer.x * 0.18,
      0.045
    );

    if (rings.current) {
      rings.current.rotation.z = time * 0.14;
      rings.current.rotation.x = Math.sin(time * 0.22) * 0.24;
    }
  });

  return (
    <group ref={group} scale={1.06}>
      <Float speed={1.1} rotationIntensity={0.24} floatIntensity={0.85}>
        <mesh scale={1.32}>
          <torusKnotGeometry args={[1.22, 0.4, 220, 36]} />
          <MeshDistortMaterial
            color="#27282e"
            metalness={0.92}
            roughness={0.2}
            distort={0.16}
            speed={1.3}
            emissive="#ff4d1f"
            emissiveIntensity={0.07}
          />
        </mesh>
      </Float>

      <group ref={rings}>
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[2.55, 0.006, 6, 220]} />
          <meshBasicMaterial color="#ff5a2a" transparent opacity={0.65} />
        </mesh>
        <mesh rotation={[Math.PI / 2.4, 0.4, 0.3]}>
          <torusGeometry args={[2.95, 0.0035, 6, 220]} />
          <meshBasicMaterial color="#f2ecdf" transparent opacity={0.3} />
        </mesh>
        <mesh rotation={[0, 0, Math.PI / 2.8]}>
          <torusGeometry args={[2.15, 0.004, 6, 220]} />
          <meshBasicMaterial color="#7d8cff" transparent opacity={0.42} />
        </mesh>
      </group>

      <mesh position={[2.45, 0.85, -0.5]}>
        <sphereGeometry args={[0.035, 12, 12]} />
        <meshBasicMaterial color="#ff5a2a" />
      </mesh>
      <mesh position={[-2.1, -1.1, 0.8]}>
        <sphereGeometry args={[0.025, 12, 12]} />
        <meshBasicMaterial color="#f2ecdf" />
      </mesh>

      <Dust />
    </group>
  );
}

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

function ProjectPanel({ project }) {
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

export default function Core() {
  const isMobile = useIsMobile();
  const [scrolled, setScrolled] = useState(false);
  const [copied, setCopied] = useState(false);
  const workRef = useRef(null);

  const { scrollYProgress } = useScroll();
  const { scrollYProgress: workProgress } = useScroll({
    target: workRef,
    offset: ["start start", "end end"],
  });
  const trackX = useTransform(workProgress, [0, 1], ["0vw", "-212vw"]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 36);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText("shehu.meni@gmail.com");
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      window.location.href = "mailto:shehu.meni@gmail.com";
    }
  };

  return (
    <div className="core">
      <motion.div className="core-progress" style={{ scaleX: scrollYProgress }} />

      <header className={`core-nav ${scrolled ? "is-scrolled" : ""}`}>
        <a className="core-logo" href="#top" aria-label="Gazmend Shehu, home">
          <span>GS</span>
          <i>/26</i>
        </a>
        <nav className="core-links" aria-label="Primary">
          <a href="#work">Work</a>
          <a href="#about">About</a>
          <a href="#experience">Experience</a>
          <a href="#contact">Contact</a>
        </nav>
        <div className="core-nav-right">
          <span className="core-clock"><Clock /></span>
          <a className="core-nav-cta" href="#contact">
            Start a conversation
            <svg viewBox="0 0 12 12" aria-hidden="true">
              <path d="M2 10 10 2M4 2h6v6" fill="none" stroke="currentColor" strokeWidth="1.3" />
            </svg>
          </a>
        </div>
      </header>

      <section className="core-hero" id="top">
        <div className="core-scene" aria-hidden="true">
          <Canvas
            dpr={[1, 1.75]}
            camera={{ position: [0, 0, 6.4], fov: 42 }}
            gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
          >
            <ambientLight intensity={0.55} />
            <spotLight
              position={[6, 5, 6]}
              angle={0.55}
              penumbra={1}
              intensity={140}
              color="#ff6a3d"
            />
            <spotLight
              position={[-6, -3, 5]}
              angle={0.7}
              penumbra={1}
              intensity={90}
              color="#7c89ff"
            />
            <pointLight position={[0, 4, 3]} intensity={35} color="#f2ecdf" />
            <Sculpture />
          </Canvas>
        </div>

        <div className="core-hero-grid">
          <div className="core-hero-copy">
            <motion.h1
              initial={{ opacity: 0, y: 34 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.12, ease: [0.23, 1, 0.32, 1] }}
            >
              <span>I build</span>
              <span>systems</span>
              <span>that hold<i>.</i></span>
            </motion.h1>

            <motion.div
              className="core-hero-bottom"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4, ease: [0.23, 1, 0.32, 1] }}
            >
              <p>
                Full-stack engineer in Belgrade. I work from the interface down
                to the database, the container, and sometimes the kernel.
              </p>
              <div className="core-hero-actions">
                <a className="core-btn" href="#work">
                  See the systems
                  <svg viewBox="0 0 12 12" aria-hidden="true">
                    <path d="M6 1v9M2.5 6.5 6 10l3.5-3.5" fill="none" stroke="currentColor" strokeWidth="1.3" />
                  </svg>
                </a>
                <a className="core-btn core-btn-ghost" href="/prototype/assets/Gazmend-Shehu-Resume.pdf" download>
                  Résumé
                </a>
              </div>
            </motion.div>
          </div>

          <div className="core-hero-side" aria-hidden="true">
            <span>Portfolio / 2026</span>
            <i />
            <span>Belgrade, RS</span>
          </div>
        </div>

        <div className="core-hero-strip" aria-hidden="true">
          <div>
            <span>Full-stack engineer</span><b>·</b>
            <span>Interfaces</span><b>·</b>
            <span>Services</span><b>·</b>
            <span>Systems</span><b>·</b>
            <span>Belgrade, RS</span><b>·</b>
            <span>Full-stack engineer</span><b>·</b>
            <span>Interfaces</span><b>·</b>
            <span>Services</span><b>·</b>
            <span>Systems</span><b>·</b>
            <span>Belgrade, RS</span><b>·</b>
          </div>
        </div>
      </section>

      <section className={`core-work ${isMobile ? "is-mobile" : ""}`} id="work" ref={workRef}>
        <div className="core-work-sticky">
          <div className="core-work-head">
            <span className="core-eyebrow">01 / Selected systems</span>
            <span className="core-work-hint">
              {isMobile ? "Scroll through the work" : "Scroll across the work"}
              <i />
            </span>
          </div>

          {isMobile ? (
            <div className="core-track is-mobile">
              {projects.map((project) => (
                <ProjectPanel key={project.id} project={project} />
              ))}
            </div>
          ) : (
            <motion.div className="core-track" style={{ x: trackX }}>
              {projects.map((project) => (
                <ProjectPanel key={project.id} project={project} />
              ))}
            </motion.div>
          )}
        </div>
      </section>

      <section className="core-about" id="about">
        <Reveal className="core-sec-head">
          <span className="core-eyebrow">02 / About</span>
          <h2>
            The seams<br />are the work.
          </h2>
        </Reveal>

        <div className="core-about-grid">
          <Reveal className="core-portrait" delay={0.05}>
            <img src="/prototype/assets/gazmend.jpg" alt="Gazmend Shehu" />
            <div className="core-portrait-tag">
              <span>Belgrade, Serbia</span>
              <span>44.8°N / 20.4°E</span>
            </div>
          </Reveal>

          <div className="core-about-copy">
            <Reveal delay={0.1}>
              <p className="core-lead">
                I like the part after the demo: typed boundaries, isolated I/O,
                tests that run without a network, and a deploy you can repeat.
                That&apos;s where software stops being a prototype.
              </p>
            </Reveal>
            <Reveal delay={0.16}>
              <p>
                Most of my work sits between React and the infrastructure under
                it. I&apos;ve built art platforms, trading engines, escrowed
                storefronts, and a small operating system kernel. Different
                surfaces, same question: does it hold when it matters?
              </p>
            </Reveal>
            <Reveal className="core-stats" delay={0.22}>
              {stats.map((stat) => (
                <div className="core-stat" key={stat.label}>
                  <strong>{stat.value}</strong>
                  <span>{stat.label}</span>
                </div>
              ))}
            </Reveal>
          </div>
        </div>
      </section>

      <section className="core-xp" id="experience">
        <Reveal className="core-sec-head">
          <span className="core-eyebrow">03 / Experience</span>
          <h2>Track record</h2>
        </Reveal>

        <div className="core-xp-list">
          {roles.map((role, index) => (
            <Reveal key={role.company} delay={index * 0.05}>
              <article className="core-xp-row" data-cursor>
                <span className="core-xp-year">{role.year}</span>
                <div className="core-xp-title">
                  <h3>{role.company}</h3>
                  <p>{role.role} / {role.place}</p>
                </div>
                <p className="core-xp-line">{role.line}</p>
                <span className="core-xp-index">0{index + 1}</span>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="core-toolkit" id="toolkit">
        <Reveal className="core-sec-head">
          <span className="core-eyebrow">04 / Toolkit</span>
          <h2>Tools of the trade</h2>
        </Reveal>

        <div className="core-stack">
          {stackRows.map((row, index) => (
            <div className={`core-marquee ${index === 1 ? "is-reverse" : ""}`} key={row[0]}>
              <div className="core-marquee-track">
                {[0, 1, 2].map((copy) => (
                  <span key={copy}>
                    {row.map((item) => (
                      <React.Fragment key={item}>
                        {item}<i>·</i>
                      </React.Fragment>
                    ))}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="core-toolkit-foot">
          <span>Languages</span>
          <span>Product &amp; services</span>
          <span>Data &amp; infrastructure</span>
        </div>
      </section>

      <footer className="core-contact" id="contact">
        <div className="core-contact-top">
          <span className="core-eyebrow">05 / Contact</span>
          <span>Belgrade, RS — <Clock /></span>
        </div>
        <Reveal>
          <h2>
            Have something<br />that needs to hold?
          </h2>
        </Reveal>
        <a className="core-email" href="mailto:shehu.meni@gmail.com" data-cursor>
          shehu.meni@gmail.com
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M4 20 20 4M7 4h13v13" fill="none" stroke="currentColor" strokeWidth="1.5" />
          </svg>
        </a>
        <div className="core-contact-row">
          <button type="button" className="core-copy" onClick={copyEmail}>
            {copied ? "Copied" : "Copy address"}
          </button>
          <div className="core-socials">
            <a href="https://github.com/zigameni" target="_blank" rel="noreferrer">GitHub</a>
            <a href="https://linkedin.com/in/gazmend-shehu" target="_blank" rel="noreferrer">LinkedIn</a>
            <a href="/prototype/assets/Gazmend-Shehu-Resume.pdf" download>Résumé</a>
          </div>
        </div>
        <div className="core-foot">
          <span>© 2026 Gazmend Shehu</span>
          <span>Built in Belgrade</span>
          <a href="#top">Back to top ↑</a>
        </div>
      </footer>
    </div>
  );
}
