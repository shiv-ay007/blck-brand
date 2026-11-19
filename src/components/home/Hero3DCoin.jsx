import { useEffect, useRef, useState, useCallback } from 'react';
import './Hero3DCoin.css';

const SLICE_COUNT = 17;
const edgeSlices = Array.from({ length: SLICE_COUNT }, (_, i) => -7 + (i * 14) / (SLICE_COUNT - 1));

export default function Hero3DCoin() {
  const coinRef = useRef(null);
  const animFrameRef = useRef(null);
  const dragRef = useRef({
    isDragging: false,
    startX: 0,
    startY: 0,
    startRotX: 62,
    startRotY: 0,
    lastX: 0,
    lastY: 0,
    lastTime: 0,
    vx: 0,
    vy: 0,
    totalDist: 0,
  });

  // Current visual angles & offsets
  const stateRef = useRef({
    rotX: 62, // 3D tilt perspective matching Bluorng reference
    rotY: -15, // continuous spinning angle
    rotZ: 0,
    levitateY: 0,
    mouseTiltX: 0,
    mouseTiltY: 0,
    time: 0,
  });


  // Smooth animation loop using requestAnimationFrame
  useEffect(() => {
    let prevTimestamp = performance.now();

    const loop = (timestamp) => {
      const dt = Math.min((timestamp - prevTimestamp) / 1000, 0.1);
      prevTimestamp = timestamp;

      const s = stateRef.current;
      const d = dragRef.current;

      s.time += dt;

      if (!d.isDragging) {
        // Inertia damping after release
        if (Math.abs(d.vx) > 0.05) {
          s.rotY += d.vx;
          d.vx *= 0.94;
        } else {
          // Continuous auto-spin
          s.rotY += 28 * dt;
        }

        // Return rotX gently back to default tilt (62deg)
        const targetRotX = 62 + s.mouseTiltY;
        s.rotX += (targetRotX - s.rotX) * Math.min(dt * 3, 0.15);

        // Anti-gravity floating oscillation
        s.levitateY = Math.sin(s.time * 2.2) * 9;
        // Subtle rhythmic roll wobble
        s.rotZ = Math.sin(s.time * 1.5) * 3.5;
      }

      // Update DOM transform directly for 60/120fps performance
      if (coinRef.current) {
        const totalRotX = s.rotX;
        const totalRotY = s.rotY + s.mouseTiltX;
        const totalRotZ = s.rotZ;
        const levY = s.levitateY;

        coinRef.current.style.transform = `translate3d(0, ${levY}px, 0) rotateX(${totalRotX}deg) rotateY(${totalRotY}deg) rotateZ(${totalRotZ}deg)`;

        // Update shadow scaling with levitation
        const shadowEl = coinRef.current.parentElement?.querySelector('.hero-3d-coin__shadow');
        if (shadowEl) {
          const shadowScale = 1 - levY * 0.015;
          const shadowOpacity = Math.max(0.18, 0.42 - levY * 0.01);
          shadowEl.style.transform = `translate(-50%, -50%) translate3d(0, 48px, -40px) rotateX(90deg) scale(${shadowScale})`;
          shadowEl.style.opacity = shadowOpacity.toString();
        }
      }

      animFrameRef.current = requestAnimationFrame(loop);
    };

    animFrameRef.current = requestAnimationFrame(loop);
    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, []);

  // Parallax tilt on hero mousemove
  useEffect(() => {
    const onMouseMove = (e) => {
      if (dragRef.current.isDragging) return;
      const { innerWidth, innerHeight } = window;
      const nx = (e.clientX / innerWidth - 0.5) * 2;
      const ny = (e.clientY / innerHeight - 0.5) * 2;

      stateRef.current.mouseTiltX = nx * 14;
      stateRef.current.mouseTiltY = -ny * 10;
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', onMouseMove);
  }, []);

  // Pointer Drag Handlers
  const handlePointerDown = useCallback((e) => {
    if (e.button !== undefined && e.button !== 0) return;

    e.currentTarget.setPointerCapture(e.pointerId);

    const d = dragRef.current;
    d.isDragging = true;
    d.startX = e.clientX;
    d.startY = e.clientY;
    d.lastX = e.clientX;
    d.lastY = e.clientY;
    d.lastTime = performance.now();
    d.startRotX = stateRef.current.rotX;
    d.startRotY = stateRef.current.rotY;
    d.totalDist = 0;
    d.vx = 0;
    d.vy = 0;
  }, []);

  const handlePointerMove = useCallback((e) => {
    const d = dragRef.current;
    if (!d.isDragging) return;

    const dx = e.clientX - d.startX;
    const dy = e.clientY - d.startY;
    d.totalDist = Math.hypot(e.clientX - d.lastX, e.clientY - d.lastY) + d.totalDist;

    const now = performance.now();
    const dt = Math.max(1, now - d.lastTime);
    d.vx = ((e.clientX - d.lastX) / dt) * 16;
    d.vy = ((e.clientY - d.lastY) / dt) * 16;
    d.lastX = e.clientX;
    d.lastY = e.clientY;
    d.lastTime = now;

    stateRef.current.rotY = d.startRotY + dx * 0.85;
    stateRef.current.rotX = Math.max(20, Math.min(85, d.startRotX - dy * 0.55));
  }, []);

  const handlePointerUp = useCallback((e) => {
    const d = dragRef.current;
    if (!d.isDragging) return;
    d.isDragging = false;

    try {
      e.currentTarget.releasePointerCapture(e.pointerId);
    } catch {}
  }, []);

  return (
    <div className="hero-3d-scene">
      {/* Dynamic 3D soft contact shadow on background */}
      <div className="hero-3d-coin__shadow" aria-hidden="true" />

      {/* Interactive 3D Coin Trigger */}
      <div
        role="presentation"
        className="hero-3d-coin-trigger"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
      >
        <div ref={coinRef} className="hero-3d-coin">
          {/* 3D Solid Cylinder Edge Extrusion (Thick "mota" 3D coin depth matching Bluorng reference) */}
          {edgeSlices.map((z, idx) => (
            <div
              key={idx}
              className="hero-3d-coin__edge-slice"
              style={{ transform: `translateZ(${z.toFixed(2)}px)` }}
              aria-hidden="true"
            />
          ))}

          {/* Front Face: Single Clean Circular Face (Only One Circle matching reference) */}
          <div className="hero-3d-coin__face hero-3d-coin__face--front">
            <img
              src="/assets/blck-monogram.png"
              alt="BLCK Logo"
              className="hero-3d-coin__logo"
              draggable="false"
            />
          </div>

          {/* Back Face: Single Clean Circular Face */}
          <div className="hero-3d-coin__face hero-3d-coin__face--back">
            <img
              src="/assets/blck-monogram.png"
              alt="BLCK Logo"
              className="hero-3d-coin__logo"
              draggable="false"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
