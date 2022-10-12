import { useEffect, useState, useCallback } from "react";

export const useMouseCoordinates = () => {
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [screen, setScreen] = useState({ width: 0, height: 0 });

  const getCoords = useCallback(
    (e: MouseEvent) => {
      const { clientX, clientY } = e;

      setCoords({ x: clientX, y: clientY });
    },
    [coords]
  );

  useEffect(() => {
    const { offsetWidth, offsetHeight } = document.getElementById("main")!;
    setScreen({ width: offsetWidth, height: offsetHeight });
    document.getElementById("main")?.addEventListener("mousemove", getCoords);

    return () =>
      document
        .getElementById("main")
        ?.removeEventListener("mousemove", getCoords);
  }, []);

  const { x, y } = coords;
  const { width, height } = screen;

  return { x, y, width, height };
};
