import type { HTMLAttributes, ReactNode } from "react";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  hover?: boolean;
  padding?: "sm" | "md" | "lg";
}

const paddingStyles = {
  sm: "p-4",
  md: "p-6",
  lg: "p-8",
};

export function Card({ children, hover = false, padding = "md", className = "", ...props }: CardProps) {
  return (
    <div
      className={`rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-surface)] shadow-[var(--shadow-card)] transition-all duration-200 ${paddingStyles[padding]} ${
        hover ? "hover:border-[var(--color-text-disabled)] hover:-translate-y-0.5" : ""
      } ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
