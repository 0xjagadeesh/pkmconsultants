"use client";

import { type ReactNode, useEffect, useId, useRef, useState } from "react";

export type FixedAccordionItem = {
  id: string;
  question: ReactNode;
  answer: ReactNode;
};

type FixedAccordionProps = {
  items: FixedAccordionItem[];
  /** Index open on load; `null` starts with everything closed */
  defaultOpen?: number | null;
  /** Each item wrapper (borders) */
  itemClassName?: string;
  /** The question button (layout, padding) */
  triggerClassName?: string;
  /** Question text */
  questionClassName?: string;
  /** Plus / minus icon (size, colour, margin) */
  iconClassName?: string;
  /** Answer wrapper inside the panel (padding, type) */
  answerClassName?: string;
};

// Panel and spacer share one timing, so their heights always sum to the same total
const MOTION =
  "transition-[height] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none";

/**
 * Single-open accordion whose total height never changes.
 * - Only one answer is open at a time; the first is open by default.
 * - A spacer under the last item fills `tallest answer − open answer`, and it
 *   animates with the same timing as the panels, so the list (and the section
 *   around it) keeps exactly the same height while answers open and close.
 * - Answers stay in the DOM (closed ones are `inert`) for SEO and FAQ schema.
 */
export function FixedAccordion({
  items,
  defaultOpen = 0,
  itemClassName = "",
  triggerClassName = "",
  questionClassName = "",
  iconClassName = "",
  answerClassName = "",
}: FixedAccordionProps) {
  const baseId = useId();
  const [open, setOpen] = useState<number | null>(defaultOpen);
  const [heights, setHeights] = useState<number[] | null>(null);
  const [animate, setAnimate] = useState(false);
  const innerRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Measure every answer's natural height; re-measure when widths change
  useEffect(() => {
    const els = innerRefs.current.filter(
      (el): el is HTMLDivElement => el !== null
    );
    const measure = () =>
      setHeights(innerRefs.current.map((el) => el?.offsetHeight ?? 0));
    measure();
    // Enable transitions only after the first measured paint (no load jump)
    const frame = requestAnimationFrame(() => setAnimate(true));
    const observer = new ResizeObserver(measure);
    for (const el of els) observer.observe(el);
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
    };
  }, []);

  const tallest = heights ? Math.max(0, ...heights) : 0;
  const openHeight = heights && open !== null ? (heights[open] ?? 0) : 0;
  const motion = animate ? MOTION : "";

  return (
    <div>
      {items.map((item, index) => {
        const isOpen = open === index;
        const buttonId = `${baseId}-q${index}`;
        const panelId = `${baseId}-a${index}`;
        // Before measuring: open panel at its natural height, others closed
        let panelHeight: number | "auto" = isOpen ? "auto" : 0;
        if (heights) panelHeight = isOpen ? (heights[index] ?? 0) : 0;

        return (
          <div className={itemClassName} data-open={isOpen} key={item.id}>
            <h3 className="m-0">
              <button
                aria-controls={panelId}
                aria-expanded={isOpen}
                className={`group w-full cursor-pointer text-left ${triggerClassName}`}
                data-open={isOpen}
                id={buttonId}
                onClick={() => setOpen((o) => (o === index ? null : index))}
                type="button"
              >
                <span className={questionClassName}>{item.question}</span>
                {/* Plus → minus drafting icon */}
                <span
                  aria-hidden="true"
                  className={`relative flex shrink-0 items-center justify-center ${iconClassName}`}
                >
                  <span className="absolute h-[1.5px] w-full bg-current" />
                  <span className="absolute h-full w-[1.5px] bg-current transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-data-[open=true]:scale-y-0" />
                </span>
              </button>
            </h3>
            <section
              aria-labelledby={buttonId}
              className={`overflow-hidden ${motion}`}
              id={panelId}
              inert={!isOpen}
              style={{ height: panelHeight }}
            >
              <div
                className={answerClassName}
                ref={(el) => {
                  innerRefs.current[index] = el;
                }}
              >
                {item.answer}
              </div>
            </section>
          </div>
        );
      })}
      {/* Reserve: keeps the total height fixed at "tallest answer open" */}
      <div
        aria-hidden="true"
        className={motion}
        style={{ height: Math.max(0, tallest - openHeight) }}
      />
    </div>
  );
}
