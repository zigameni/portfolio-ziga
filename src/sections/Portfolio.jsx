import React, { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

import Clock from "../components/core/Clock.jsx";
import Cursor from "../components/core/Cursor.jsx";
import HeroScene from "../components/core/HeroScene.jsx";
import Intro from "../components/core/Intro.jsx";
import ProjectPanel from "../components/core/ProjectPanel.jsx";
import Reveal from "../components/core/Reveal.jsx";
import { projects, roles, stackRows, stats } from "../data/portfolio.js";
import useIsMobile from "../hooks/useIsMobile.js";

export default function Portfolio() {
  const isMobile = useIsMobile();
  const [scrolled, setScrolled] = useState(false);
  const [copied, setCopied] = useState(false);
  const [introDone, setIntroDone] = useState(false);
  const workRef = useRef(null);

  const { scrollYProgress } = useScroll();
  const { scrollYProgress: workProgress } = useScroll({
    target: workRef,
    offset: ["start start", "end end"],
  });
  const trackX = useTransform(workProgress, [0, 1], ["0vw", "-212vw"]);

  useEffect(() => {
    const timer = window.setTimeout(() => setIntroDone(true), 1500);
    return () => window.clearTimeout(timer);
  }, []);

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
    <div className="proto">
      <Cursor />
      <Intro done={introDone} />

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
          <HeroScene />

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
                  Software engineer. I work from the interface down
                  to the database, the container, and sometimes the kernel.
                </p>
                <div className="core-hero-actions">
                  <a className="core-btn" href="#work">
                    See the systems
                    <svg viewBox="0 0 12 12" aria-hidden="true">
                      <path d="M6 1v9M2.5 6.5 6 10l3.5-3.5" fill="none" stroke="currentColor" strokeWidth="1.3" />
                    </svg>
                  </a>
                  <a className="core-btn core-btn-ghost" href="/assets/Gazmend-Shehu-Resume.pdf" download>
                    Résumé
                  </a>
                </div>
              </motion.div>
            </div>

            <div className="core-hero-side" aria-hidden="true">
              <span>Portfolio / 2026</span>
            </div>
          </div>

          <div className="core-hero-strip" aria-hidden="true">
            <div>
              <span>Software engineer</span><b>·</b>
              <span>Interfaces</span><b>·</b>
              <span>Services</span><b>·</b>
              <span>Systems</span><b>·</b>
              <span>Software engineer</span><b>·</b>
              <span>Interfaces</span><b>·</b>
              <span>Services</span><b>·</b>
              <span>Systems</span><b>·</b>
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
              <img src="/assets/gazmend.jpg" alt="Gazmend Shehu" />
              <div className="core-portrait-tag">
                <span>Gazmend Shehu</span>
                <span>Software engineer</span>
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
            <span><Clock /></span>
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
          <div className="core-social-block">
            <div className="core-social-head">
              <span className="core-socials-label">Elsewhere</span>
              <button type="button" className="core-copy" onClick={copyEmail}>
                {copied ? "Copied" : "Copy address"}
              </button>
            </div>
            <div className="core-socials">
              <a className="core-social" href="https://github.com/zigameni" target="_blank" rel="noreferrer">
                <svg className="core-social-icon" viewBox="0 0 24 24" aria-hidden="true">
                  <path
                    fill="currentColor"
                    d="M12 2C6.48 2 2 6.58 2 12.25c0 4.53 2.87 8.37 6.84 9.73.5.09.68-.22.68-.49 0-.24-.01-.87-.01-1.71-2.78.62-3.37-1.37-3.37-1.37-.45-1.18-1.11-1.49-1.11-1.49-.91-.64.07-.63.07-.63 1 .07 1.53 1.06 1.53 1.06.89 1.56 2.34 1.11 2.91.85.09-.66.35-1.11.63-1.37-2.22-.26-4.56-1.14-4.56-5.07 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.3.1-2.71 0 0 .84-.28 2.75 1.05A9.34 9.34 0 0 1 12 6.84c.85 0 1.71.12 2.51.35 1.91-1.33 2.75-1.05 2.75-1.05.55 1.41.2 2.45.1 2.71.64.72 1.03 1.63 1.03 2.75 0 3.94-2.34 4.81-4.57 5.06.36.32.68.94.68 1.9 0 1.37-.01 2.47-.01 2.81 0 .27.18.59.69.49A10.02 10.02 0 0 0 22 12.25C22 6.58 17.52 2 12 2Z"
                  />
                </svg>
                <svg className="core-social-arrow" viewBox="0 0 12 12" aria-hidden="true">
                  <path d="M2 10 10 2M4 2h6v6" fill="none" stroke="currentColor" strokeWidth="1.3" />
                </svg>
                <span className="core-social-name">GitHub</span>
                <span className="core-social-meta">@zigameni</span>
              </a>
              <a className="core-social" href="https://linkedin.com/in/gazmend-shehu" target="_blank" rel="noreferrer">
                <svg className="core-social-icon" viewBox="0 0 24 24" aria-hidden="true">
                  <path
                    fill="currentColor"
                    d="M6.94 8.5H3.56V20h3.38V8.5ZM5.25 3.5a1.96 1.96 0 1 0 0 3.92 1.96 1.96 0 0 0 0-3.92ZM20.44 13.28c0-3.1-.66-5.48-4.28-5.48-1.74 0-2.9.95-3.38 1.85h-.05V8.5H9.42V20h3.38v-5.69c0-1.5.29-2.95 2.15-2.95 1.83 0 1.86 1.71 1.86 3.05V20h3.63v-6.72Z"
                  />
                </svg>
                <svg className="core-social-arrow" viewBox="0 0 12 12" aria-hidden="true">
                  <path d="M2 10 10 2M4 2h6v6" fill="none" stroke="currentColor" strokeWidth="1.3" />
                </svg>
                <span className="core-social-name">LinkedIn</span>
                <span className="core-social-meta">in/gazmend-shehu</span>
              </a>
              <a className="core-social" href="/assets/Gazmend-Shehu-Resume.pdf" download>
                <svg className="core-social-icon" viewBox="0 0 24 24" aria-hidden="true">
                  <path
                    d="M12 3v11m0 0 4-4m-4 4-4-4M5 19h14"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <svg className="core-social-arrow" viewBox="0 0 12 12" aria-hidden="true">
                  <path
                    d="M6 1v8M2.5 6 6 9.5 9.5 6M2 11h8"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span className="core-social-name">Résumé</span>
                <span className="core-social-meta">PDF / download</span>
              </a>
            </div>
          </div>
          <div className="core-foot">
            <span>© 2026 Gazmend Shehu</span>
            <span>Portfolio / 2026</span>
            <a href="#top">Back to top ↑</a>
          </div>
        </footer>
      </div>
    </div>
  );
}
