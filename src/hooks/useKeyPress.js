import { useEffect } from "react";

function useKeyPress(key, action) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === key) {
        e.stopPropagation();
        e.preventDefault();
        e.stopImmediatePropagation();
        action();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}

export default useKeyPress;
