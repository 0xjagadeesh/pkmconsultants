"use client";

import { useEffect } from "react";

/**
 * Blocks dragging images out of the page. Chromium and WebKit are covered by
 * `-webkit-user-drag: none` in globals.css; Firefox needs the dragstart guard.
 */
export function NoImageDrag() {
  useEffect(() => {
    const onDragStart = (event: DragEvent) => {
      if (event.target instanceof HTMLImageElement) event.preventDefault();
    };
    document.addEventListener("dragstart", onDragStart);
    return () => document.removeEventListener("dragstart", onDragStart);
  }, []);
  return null;
}
