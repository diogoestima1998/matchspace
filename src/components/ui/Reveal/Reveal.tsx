"use client";

import { useEffect, useRef, useState } from "react";

import { classNames } from "@/lib/class-names";

import type { RevealProps } from "./types";

export function Reveal({ children, className }: RevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(function observeVisibility() {
    const element = containerRef.current;
    if (!element) {
      return;
    }

    const observer = new IntersectionObserver(
      function handleIntersection(entries) {
        if (entries[0]?.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 },
    );

    observer.observe(element);
    return function cleanup() {
      observer.disconnect();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={classNames({
        classes: ["reveal", isVisible ? "reveal-visible" : null, className],
      })}
    >
      {children}
    </div>
  );
}
