"use client";

import { useEffect, useRef, useState } from "react";

type RevealVariant = "default" | "clip";

export default function Reveal({
  children,
  delay = 0,
  className = "",
  variant = "default",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  variant?: RevealVariant;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const baseClass = variant === "clip"
    ? `reveal-clip ${visible ? "is-visible" : ""}`
    : `reveal ${visible ? "is-visible" : ""}`;

  return (
    <div
      ref={ref}
      className={`${baseClass} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}
