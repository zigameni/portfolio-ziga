import React, { useEffect, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import Core from "./Core.jsx";
import Studio from "./Studio.jsx";
import "./new.css";

function Cursor() {
  const dot = useRef(null);
  const ring = useRef(null);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;

    let x = window.innerWidth / 2;
    let y = window.innerHeight / 2;
    let rx = x;
    let ry = y;
    let frame = 0;

    const move = (event) => {
      x = event.clientX;
      y = event.clientY;
      if (dot.current) {
        dot.current.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      }
    };

    const over = (event) => {
      if (!ring.current) return;
      const active = event.target.closest("a, button, summary, [data-cursor]");
      ring.current.classList.toggle("is-active", Boolean(active));
    };

    const tick = () => {
      rx += (x - rx) * 0.16;
      ry += (y - ry) * 0.16;
      if (ring.current) {
        ring.current.style.transform = `translate3d(${rx}px, ${ry}px, 0)`;
      }
      frame = requestAnimationFrame(tick);
    };

    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("pointerover", over, { passive: true });
    frame = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerover", over);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <>
      <div className="cursor-dot" ref={dot} aria-hidden="true" />
      <div className="cursor-ring" ref={ring} aria-hidden="true" />
    </>
  );
}

function Intro({ done }) {
  return (
    <div className={`intro ${done ? "is-done" : ""}`} aria-hidden={done}>
      <div className="intro-top">
        <span>Gazmend Shehu</span>
        <span>Portfolio / 2026</span>
      </div>
      <div className="intro-name">
        <span>Two</span>
        <span>directions</span>
      </div>
      <div className="intro-bar">
        <span />
      </div>
    </div>
  );
}

function Picker({ value, onChange }) {
  return (
    <nav className="proto-picker" aria-label="Prototype variants">
      <span className="proto-picker-highlight" aria-hidden="true" data-pos={value} />
      <button
        type="button"
        className="proto-picker-item"
        data-active={value === 1 ? "" : undefined}
        aria-current={value === 1 ? "true" : undefined}
        onClick={() => onChange(1)}
      >
        Core
      </button>
      <button
        type="button"
        className="proto-picker-item"
        data-active={value === 2 ? "" : undefined}
        aria-current={value === 2 ? "true" : undefined}
        onClick={() => onChange(2)}
      >
        Studio
      </button>
      <span className="proto-picker-count" aria-hidden="true">
        0{value} / 02
      </span>
    </nav>
  );
}

function App() {
  const [variant, setVariant] = useState(() =>
    new URLSearchParams(window.location.search).get("v") === "2" ? 2 : 1
  );
  const [introDone, setIntroDone] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => setIntroDone(true), 1500);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    const url = new URL(window.location.href);
    url.searchParams.set("v", String(variant));
    window.history.replaceState(null, "", url);
    window.scrollTo(0, 0);
  }, [variant]);

  useEffect(() => {
    const onKey = (event) => {
      if (/^(INPUT|TEXTAREA|SELECT)$/.test(event.target.tagName)) return;
      if (event.key === "1") setVariant(1);
      if (event.key === "2") setVariant(2);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <div className="proto">
      <Cursor />
      <Intro done={introDone} />
      <div className="proto-stage" key={variant}>
        {variant === 1 ? <Core /> : <Studio />}
      </div>
      <Picker value={variant} onChange={setVariant} />
    </div>
  );
}

createRoot(document.getElementById("root")).render(<App />);
