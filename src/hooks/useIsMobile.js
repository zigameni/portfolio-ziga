import { useEffect, useState } from "react";

export default function useIsMobile(breakpoint = 900) {
  const [mobile, setMobile] = useState(() =>
    window.matchMedia(`(max-width: ${breakpoint}px)`).matches
  );

  useEffect(() => {
    const query = window.matchMedia(`(max-width: ${breakpoint}px)`);
    const update = (event) => setMobile(event.matches);
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, [breakpoint]);

  return mobile;
}
