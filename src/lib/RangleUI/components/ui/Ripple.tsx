import React, {useState, useCallback, useRef} from "react";

import "./Ripple.scss";

const ANIMATION_DURATION = 610;

const Ripple: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentRipple, setCurrentRipple] = useState<HTMLDivElement | null>(null);

  const handlePointerDown = (e: React.PointerEvent) => {
    const container = containerRef.current;

    if (!container) {
      return;
    }

    e.preventDefault();
    e.stopPropagation();

    const containerRect = container.getBoundingClientRect();
    const x = e.clientX - containerRect.left;
    const y = e.clientY - containerRect.top;
    const maxWidth = Math.max(x, containerRect.width - x);
    const maxHeight = Math.max(y, containerRect.height - y);
    const size = Math.sqrt(maxWidth ** 2 + maxHeight ** 2);

    const effectElement = document.createElement("div");
    effectElement.classList.add("effect");

    effectElement.style.top = (y - size) + "px";
    effectElement.style.left = (x - size) + "px";
    effectElement.style.height = size * 2 + "px";
    effectElement.style.width = size * 2 + "px";

    container.appendChild(effectElement);

    setTimeout(() => {
      effectElement.style.transform = "scale(1)";
    }, 10);

    setCurrentRipple(effectElement);
  }

  const handleCleanUp = useCallback((e: React.PointerEvent) => {
    if (!currentRipple) {
      return;
    }

    e.preventDefault();
    e.stopPropagation();

    currentRipple.style.opacity = "0";

    setTimeout(() => {
      currentRipple.parentNode?.removeChild(currentRipple);
    }, ANIMATION_DURATION);
  }, [currentRipple]);

  return (
    <div 
      ref={containerRef}
      className="Ripple"
      onPointerDown={handlePointerDown}
      onPointerUp={handleCleanUp}
      onPointerCancel={handleCleanUp}
      onPointerLeave={handleCleanUp}
    />
  );
}

export default Ripple;