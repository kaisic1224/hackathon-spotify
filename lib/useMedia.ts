import { useEffect, useState } from "react";

export default function useMedia() {
  const [screen, setScreen] = useState<number>();
  useEffect(() => {
    setScreen(window.innerWidth);

    window.addEventListener("resize", () => setScreen(window.innerWidth));
    return () => {
      window.removeEventListener("resize", () => setScreen(window.innerWidth));
    };
  }, []);

  return screen;
}
