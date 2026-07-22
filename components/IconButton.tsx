import type { ReactNode } from "react";
import Link from "next/link";

function Arrow() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 28 16"
      fill="none"
      className="btn-arrow"
      aria-hidden="true"
    >
      <line
        className="btn-arrow__shaft"
        x1="1"
        y1="8"
        x2="15"
        y2="8"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="square"
        vectorEffect="non-scaling-stroke"
      />
      <path
        className="btn-arrow__head"
        d="M10.5 3.5L15 8L10.5 12.5"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="square"
        strokeLinejoin="miter"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}

type IconButtonProps = {
  href: string;
  label: string;
  ariaLabel?: string;
  variant?: "primary" | "secondary";
  withArrow?: boolean;
};

export function IconButton({
  href,
  label,
  ariaLabel,
  variant = "primary",
  withArrow = true,
}: IconButtonProps) {
  const secondary = variant === "secondary";

  return (
    <Link href={href} aria-label={ariaLabel ?? label} className="btn-icon-link">
      <div className={`btn-icon-content${secondary ? " is-secondary" : ""}`}>
        <div className="btn-icon-content__mask">
          <span className="btn-icon-content__text">{label}</span>
        </div>
        {withArrow && <Arrow />}
        <div
          className={`btn-icon-content__bg${secondary ? " is-secondary" : ""}`}
        />
      </div>
    </Link>
  );
}

export function IconOnlyButton({
  href,
  ariaLabel,
  children,
}: {
  href: string;
  ariaLabel: string;
  children: ReactNode;
}) {
  return (
    <Link href={href} aria-label={ariaLabel} className="btn-icon-link">
      <div className="btn-icon-content is-icon">
        <div className="btn-icon-content__mask">{children}</div>
        <div className="btn-icon-content__bg is-accent" />
      </div>
    </Link>
  );
}
