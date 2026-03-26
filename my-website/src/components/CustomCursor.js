"use client";

import { useEffect } from "react";

export default function CustomCursor() {
  useEffect(() => {
    const dot = document.querySelector('.custom-cursor-dot');
    const ring = document.querySelector('.custom-cursor-ring');

    if (!dot || !ring) return;

    let mouseX = 0;
    let mouseY = 0;
    let ringX = 0;
    let ringY = 0;

    const onMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      dot.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
    };

    const animateRing = () => {
      ringX += (mouseX - ringX) * 0.15;
      ringY += (mouseY - ringY) * 0.15;
      ring.style.transform = `translate(${ringX}px, ${ringY}px)`;
      requestAnimationFrame(animateRing);
    };

    window.addEventListener("mousemove", onMouseMove);
    requestAnimationFrame(animateRing);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
    };
  }, []);

  return (
    <>
      <div className="custom-cursor-dot"></div>
      <div className="custom-cursor-ring"></div>
    </>
  );
}
