import { useEffect } from "react";

export type ScrollObject = { x: number; y: number };

const useWindowScroll = (callback: (param: ScrollObject) => void) => {
  const f = () => {
    callback({
      x: window.scrollX,
      y: window.scrollY,
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", f);

    return () => window.removeEventListener("scroll", f);
  }, []);
};

export default useWindowScroll;
