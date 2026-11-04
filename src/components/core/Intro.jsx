export default function Intro({ done }) {
  return (
    <div className={`intro ${done ? "is-done" : ""}`} aria-hidden={done}>
      <div className="intro-top">
        <span>Software engineer</span>
        <span>Portfolio / 2026</span>
      </div>
      <div className="intro-name">
        <span>Gazmend</span>
        <span>Shehu</span>
      </div>
      <div className="intro-bar">
        <span />
      </div>
    </div>
  );
}
