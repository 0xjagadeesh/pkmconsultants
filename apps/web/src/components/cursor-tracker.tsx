"use client";

import { useRef, useState, useEffect } from "react";
import gsap from "gsap";

export function CursorTracker() {
  const containerRef = useRef<HTMLDivElement>(null);
  const xLineRef = useRef<HTMLDivElement>(null);
  const yLineRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const xTextRef = useRef<HTMLDivElement>(null);
  const yTextRef = useRef<HTMLDivElement>(null);

  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [dragStart, setDragStart] = useState<{ x: number; y: number; } | null>(null);
  const [dragCurrent, setDragCurrent] = useState<{ x: number; y: number; } | null>(null);

  // Standard mouse hover coordinate animation (GSAP)
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = Math.round(e.clientX - rect.left);
    const y = Math.round(e.clientY - rect.top);

    setCoords({ x, y });

    // Smooth line and tag positioning
    gsap.to(xLineRef.current, {
      x: x,
      duration: 0.12,
      ease: "power1.out",
    });
    gsap.to(yLineRef.current, {
      y: y,
      duration: 0.12,
      ease: "power1.out",
    });
    gsap.to(dotRef.current, {
      x: x,
      y: y,
      duration: 0.12,
      ease: "power1.out",
    });
    gsap.to(xTextRef.current, {
      x: x + 15,
      y: y - 22,
      duration: 0.12,
      ease: "power1.out",
    });
    gsap.to(yTextRef.current, {
      x: x - 55,
      y: y + 10,
      duration: 0.12,
      ease: "power1.out",
    });
  };

  // Start selection drag
  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.button !== 0) return; // Only allow left click
    e.preventDefault();

    const rect = e.currentTarget.getBoundingClientRect();
    const x = Math.round(e.clientX - rect.left);
    const y = Math.round(e.clientY - rect.top);

    setDragStart({ x, y });
    setDragCurrent({ x, y });
  };

  // AutoCAD-style window selection window drag handler via window listeners
  useEffect(() => {
    if (dragStart === null) return;

    const handleWindowMouseMove = (e: MouseEvent) => {
      const container = containerRef.current;
      if (!container) return;

      const rect = container.getBoundingClientRect();
      const x = Math.round(e.clientX - rect.left);
      const y = Math.round(e.clientY - rect.top);

      setDragCurrent({ x, y });
    };

    const handleWindowMouseUp = () => {
      setDragStart(null);
      setDragCurrent(null);
    };

    window.addEventListener("mousemove", handleWindowMouseMove);
    window.addEventListener("mouseup", handleWindowMouseUp);

    return () => {
      window.removeEventListener("mousemove", handleWindowMouseMove);
      window.removeEventListener("mouseup", handleWindowMouseUp);
    };
  }, [dragStart]);

  // Determine selection box styling properties
  const isDragging = dragStart !== null && dragCurrent !== null;
  const leftToRight = isDragging ? dragCurrent.x >= dragStart.x : true;
  const rectLeft = isDragging ? Math.min(dragStart.x, dragCurrent.x) : 0;
  const rectTop = isDragging ? Math.min(dragStart.y, dragCurrent.y) : 0;
  const rectWidth = isDragging ? Math.abs(dragStart.x - dragCurrent.x) : 0;
  const rectHeight = isDragging ? Math.abs(dragStart.y - dragCurrent.y) : 0;

  return (
    <div
      ref={containerRef}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onDragStart={(e) => e.preventDefault()}
      className="relative w-full h-full bg-white/[0.001] overflow-hidden flex items-center justify-center group select-none"
    >
      {/* Structural grid background hint */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.03] group-hover:opacity-[0.06] transition-opacity duration-500"
        style={{
          backgroundImage: "linear-gradient(rgba(0,0,0,0.15) 1px,transparent 1px), linear-gradient(90deg,rgba(0,0,0,0.15) 1px,transparent 1px)",
          backgroundSize: "20px 20px"
        }}
      />

      {/* Vertical tracking line (follows X) */}
      <div
        ref={xLineRef}
        className="absolute top-0 bottom-0 w-px bg-black/10 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"
        style={{ left: 0 }}
      />

      {/* Horizontal tracking line (follows Y) */}
      <div
        ref={yLineRef}
        className="absolute left-0 right-0 h-px bg-black/10 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"
        style={{ top: 0 }}
      />

      {/* CAD selection box overlay */}
      {isDragging && (
        <div
          className={`absolute border pointer-events-none z-20 ${leftToRight ? "border-solid" : "border-dashed"
            }`}
          style={{
            left: rectLeft,
            top: rectTop,
            width: rectWidth,
            height: rectHeight,
            borderColor: leftToRight ? "#0055ff" : "#00b050",
            backgroundColor: leftToRight ? "rgba(0, 85, 255, 0.12)" : "rgba(0, 176, 80, 0.12)",
          }}
        />
      )}

      {/* Intersection dot (cursor replacement) */}
      <div
        ref={dotRef}
        className="absolute w-4 h-4 bg-white border-2 border-black/40 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300 -ml-[8px] -mt-[8px] z-30"
        style={{ left: 0, top: 0 }}
      />

      {/* X Coordinate Label */}
      <div
        ref={xTextRef}
        className="absolute text-[0.8rem] font-mono font-bold text-black/40 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-30"
        style={{ left: 0, top: 0 }}
      >
        X: {coords.x}
      </div>

      {/* Y Coordinate Label */}
      <div
        ref={yTextRef}
        className="absolute text-[0.8rem] font-mono font-bold text-black/40 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-30"
        style={{ left: 0, top: 0 }}
      >
        Y: {coords.y}
      </div>
    </div>
  );
}
