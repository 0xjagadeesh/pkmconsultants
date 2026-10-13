"use client";

import { useRef, useState, useEffect, useId, useCallback } from "react";
import gsap from "gsap";

export function CursorTracker({
  theme = "light",
  syncId,
}: {
  theme?: "light" | "dark";
  syncId?: string;
} = {}) {
  const instanceId = useId();
  const containerRef = useRef<HTMLDivElement>(null);
  const xLineRef = useRef<HTMLDivElement>(null);
  const yLineRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const xTextRef = useRef<HTMLDivElement>(null);
  const yTextRef = useRef<HTMLDivElement>(null);

  const isDark = theme === "dark";

  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [dragStart, setDragStart] = useState<{ x: number; y: number } | null>(null);
  const [dragCurrent, setDragCurrent] = useState<{ x: number; y: number } | null>(null);
  const [syncedDrag, setSyncedDrag] = useState<{
    start: { x: number; y: number };
    current: { x: number; y: number };
    leftToRight: boolean;
  } | null>(null);

  // Helper to animate crosshairs smoothly
  const animateCrosshair = useCallback((x: number, y: number) => {
    gsap.to(xLineRef.current, {
      x,
      duration: 0.12,
      ease: "power1.out",
    });
    gsap.to(yLineRef.current, {
      y,
      duration: 0.12,
      ease: "power1.out",
    });
    gsap.to(dotRef.current, {
      x,
      y,
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
  }, []);

  // Standard mouse hover coordinate animation (GSAP)
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    // If we're dragging, the window mousemove handler takes priority
    if (dragStart !== null) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const x = Math.round(e.clientX - rect.left);
    const y = Math.round(e.clientY - rect.top);

    setCoords({ x, y });
    animateCrosshair(x, y);
  };

  // Start selection drag
  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.button !== 0) return; // Only allow left click
    e.preventDefault();

    const container = containerRef.current;
    if (!container) return;

    const rect = container.getBoundingClientRect();
    const x = Math.round(e.clientX - rect.left);
    const y = Math.round(e.clientY - rect.top);
    const width = rect.width || 1;
    const height = rect.height || 1;

    setDragStart({ x, y });
    setDragCurrent({ x, y });
    setCoords({ x, y });
    animateCrosshair(x, y);

    if (syncId) {
      window.dispatchEvent(
        new CustomEvent("cursor-tracker-sync", {
          detail: {
            syncId,
            sourceId: instanceId,
            type: "drag-start",
            normStart: { x: x / width, y: y / height },
            normCurrent: { x: x / width, y: y / height },
          },
        })
      );
    }
  };

  // Handle active window drag (AutoCAD-style selection box)
  useEffect(() => {
    if (dragStart === null) return;

    const handleWindowMouseMove = (e: MouseEvent) => {
      const container = containerRef.current;
      if (!container) return;

      const rect = container.getBoundingClientRect();
      const x = Math.round(e.clientX - rect.left);
      const y = Math.round(e.clientY - rect.top);
      const width = rect.width || 1;
      const height = rect.height || 1;

      setDragCurrent({ x, y });
      setCoords({ x, y });
      animateCrosshair(x, y);

      if (syncId) {
        window.dispatchEvent(
          new CustomEvent("cursor-tracker-sync", {
            detail: {
              syncId,
              sourceId: instanceId,
              type: "drag-move",
              normStart: { x: dragStart.x / width, y: dragStart.y / height },
              normCurrent: { x: x / width, y: y / height },
            },
          })
        );
      }
    };

    const handleWindowMouseUp = () => {
      setDragStart(null);
      setDragCurrent(null);

      if (syncId) {
        window.dispatchEvent(
          new CustomEvent("cursor-tracker-sync", {
            detail: {
              syncId,
              sourceId: instanceId,
              type: "drag-end",
            },
          })
        );
      }
    };

    window.addEventListener("mousemove", handleWindowMouseMove);
    window.addEventListener("mouseup", handleWindowMouseUp);

    return () => {
      window.removeEventListener("mousemove", handleWindowMouseMove);
      window.removeEventListener("mouseup", handleWindowMouseUp);
    };
  }, [dragStart, syncId, instanceId, animateCrosshair]);

  // Synchronize with other CursorTracker instances sharing the same syncId
  useEffect(() => {
    if (!syncId) return;

    const handleSync = (e: Event) => {
      const event = e as CustomEvent<{
        syncId: string;
        sourceId: string;
        type: "drag-start" | "drag-move" | "drag-end";
        normStart?: { x: number; y: number };
        normCurrent?: { x: number; y: number };
      }>;

      const detail = event.detail;
      if (!detail || detail.syncId !== syncId || detail.sourceId === instanceId) {
        return;
      }

      const container = containerRef.current;
      if (!container) return;
      const rect = container.getBoundingClientRect();
      const width = rect.width || 1;
      const height = rect.height || 1;

      if (detail.type === "drag-start" || detail.type === "drag-move") {
        if (detail.normStart && detail.normCurrent) {
          const startX = Math.round(detail.normStart.x * width);
          const startY = Math.round(detail.normStart.y * height);
          const curX = Math.round(detail.normCurrent.x * width);
          const curY = Math.round(detail.normCurrent.y * height);

          setSyncedDrag({
            start: { x: startX, y: startY },
            current: { x: curX, y: curY },
            leftToRight: curX >= startX,
          });

          setCoords({ x: curX, y: curY });
          animateCrosshair(curX, curY);
        }
      } else if (detail.type === "drag-end") {
        setSyncedDrag(null);
      }
    };

    window.addEventListener("cursor-tracker-sync", handleSync);
    return () => {
      window.removeEventListener("cursor-tracker-sync", handleSync);
    };
  }, [syncId, instanceId, animateCrosshair]);

  // Active selection box properties (local or synchronized)
  const isLocalDragging = dragStart !== null && dragCurrent !== null;
  const isSynced = syncedDrag !== null;

  const activeBox = isLocalDragging
    ? {
        left: Math.min(dragStart.x, dragCurrent.x),
        top: Math.min(dragStart.y, dragCurrent.y),
        width: Math.abs(dragStart.x - dragCurrent.x),
        height: Math.abs(dragStart.y - dragCurrent.y),
        leftToRight: dragCurrent.x >= dragStart.x,
      }
    : syncedDrag
    ? {
        left: Math.min(syncedDrag.start.x, syncedDrag.current.x),
        top: Math.min(syncedDrag.start.y, syncedDrag.current.y),
        width: Math.abs(syncedDrag.start.x - syncedDrag.current.x),
        height: Math.abs(syncedDrag.start.y - syncedDrag.current.y),
        leftToRight: syncedDrag.leftToRight,
      }
    : null;

  const visibleClass = isSynced
    ? "opacity-100"
    : "opacity-0 group-hover:opacity-100";

  return (
    <div
      ref={containerRef}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onDragStart={(e) => e.preventDefault()}
      className="relative w-full h-full bg-white/[0.001] overflow-hidden flex items-center justify-center group select-none cursor-crosshair"
    >
      {/* Structural grid background hint */}
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute inset-0 ${
          isSynced
            ? isDark
              ? "opacity-[0.16]"
              : "opacity-[0.06]"
            : isDark
            ? "opacity-[0.08] group-hover:opacity-[0.16]"
            : "opacity-[0.03] group-hover:opacity-[0.06]"
        } transition-opacity duration-500`}
        style={{
          backgroundImage: isDark
            ? "linear-gradient(rgba(255,255,255,0.2) 1px,transparent 1px), linear-gradient(90deg,rgba(255,255,255,0.2) 1px,transparent 1px)"
            : "linear-gradient(rgba(0,0,0,0.15) 1px,transparent 1px), linear-gradient(90deg,rgba(0,0,0,0.15) 1px,transparent 1px)",
          backgroundSize: "20px 20px",
        }}
      />

      {/* Vertical tracking line (follows X) */}
      <div
        ref={xLineRef}
        className={`absolute top-0 bottom-0 w-px ${
          isDark ? "bg-white/30" : "bg-black/10"
        } pointer-events-none ${visibleClass} transition-opacity duration-300 z-10`}
        style={{ left: 0 }}
      />

      {/* Horizontal tracking line (follows Y) */}
      <div
        ref={yLineRef}
        className={`absolute left-0 right-0 h-px ${
          isDark ? "bg-white/30" : "bg-black/10"
        } pointer-events-none ${visibleClass} transition-opacity duration-300 z-10`}
        style={{ top: 0 }}
      />

      {/* CAD selection box overlay (Local or Synced) */}
      {activeBox && (
        <div
          className={`absolute border pointer-events-none z-20 ${
            activeBox.leftToRight ? "border-solid" : "border-dashed"
          }`}
          style={{
            left: activeBox.left,
            top: activeBox.top,
            width: activeBox.width,
            height: activeBox.height,
            borderColor: activeBox.leftToRight
              ? isDark
                ? "#38bdf8"
                : "#0055ff"
              : isDark
              ? "#4ade80"
              : "#00b050",
            backgroundColor: activeBox.leftToRight
              ? isDark
                ? "rgba(56, 189, 248, 0.2)"
                : "rgba(0, 85, 255, 0.12)"
              : isDark
              ? "rgba(74, 222, 128, 0.2)"
              : "rgba(0, 176, 80, 0.12)",
          }}
        />
      )}

      {/* Intersection dot (cursor replacement) */}
      <div
        ref={dotRef}
        className={`absolute w-4 h-4 ${
          isDark
            ? "bg-white border-2 border-sky-400 shadow-md shadow-sky-500/30"
            : "bg-white border-2 border-black/40"
        } pointer-events-none ${visibleClass} transition-opacity duration-300 -ml-[8px] -mt-[8px] z-30`}
        style={{ left: 0, top: 0 }}
      />

      {/* X Coordinate Label */}
      <div
        ref={xTextRef}
        className={`absolute text-[0.8rem] font-mono font-bold ${
          isDark ? "text-white/80" : "text-black/40"
        } pointer-events-none ${visibleClass} transition-opacity duration-300 z-30`}
        style={{ left: 0, top: 0 }}
      >
        X: {coords.x}
      </div>

      {/* Y Coordinate Label */}
      <div
        ref={yTextRef}
        className={`absolute text-[0.8rem] font-mono font-bold ${
          isDark ? "text-white/80" : "text-black/40"
        } pointer-events-none ${visibleClass} transition-opacity duration-300 z-30`}
        style={{ left: 0, top: 0 }}
      >
        Y: {coords.y}
      </div>
    </div>
  );
}
