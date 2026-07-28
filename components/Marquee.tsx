"use client";

import { useRef, type CSSProperties } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const MAX_BOOST = 6;
const VELOCITY_DIVISOR = 300;
const SETTLE_DELAY = 140;
const RUNWAY_CYCLES = 1000;
const GROUP_COPIES = 2;

export type MarqueeItem = {
  name: string;
  logo?: string;
  width?: number;
  height?: number;
  scale?: number;
};

type MarqueeProps = {
  items: MarqueeItem[];
  speed?: number;
  label?: string;
};

function Item({ item }: { item: MarqueeItem }) {
  return (
    <li className="marquee_item">
      {item.logo ? (
        <Image
          src={item.logo}
          alt={item.name}
          width={item.width ?? 160}
          height={item.height ?? 40}
          className="marquee_logo"
          style={{ "--logo-scale": item.scale ?? 1 } as CSSProperties}
        />
      ) : (
        <span className="marquee_wordmark">{item.name}</span>
      )}
    </li>
  );
}

function Group({
  items,
  copies,
  ariaHidden,
}: {
  items: MarqueeItem[];
  copies: number;
  ariaHidden?: boolean;
}) {
  return (
    <ul
      className="marquee_group"
      data-marquee-group={ariaHidden ? undefined : true}
      aria-hidden={ariaHidden}
    >
      {Array.from({ length: copies }).flatMap((_, copy) =>
        items.map((item) => <Item key={`${copy}-${item.name}`} item={item} />),
      )}
    </ul>
  );
}

export function Marquee({ items, speed = 30, label }: MarqueeProps) {
  const rootRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const root = rootRef.current;
      if (!root) return;

      const track = root.querySelector<HTMLElement>("[data-marquee-track]");
      const group = root.querySelector<HTMLElement>("[data-marquee-group]");
      if (!track || !group) return;

      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      const tween = gsap.to(track, {
        xPercent: -50,
        ease: "none",
        repeat: -1,
        duration: group.getBoundingClientRect().width / speed,
      });

      const seed = (progress = 0) =>
        tween.totalTime(tween.duration() * (RUNWAY_CYCLES + progress));

      seed();

      const observer = new ResizeObserver(() => {
        const progress = tween.progress();
        tween.duration(group.getBoundingClientRect().width / speed);
        seed(progress);
      });
      observer.observe(group);

      let direction = 1;
      let settle: ReturnType<typeof setTimeout>;

      const trigger = ScrollTrigger.create({
        onUpdate: (self) => {
          const velocity = self.getVelocity();
          if (velocity !== 0) direction = velocity > 0 ? 1 : -1;

          const boost =
            1 + Math.min(Math.abs(velocity) / VELOCITY_DIVISOR, MAX_BOOST);

          gsap.to(tween, {
            timeScale: direction * boost,
            duration: 0.2,
            overwrite: true,
          });

          clearTimeout(settle);
          settle = setTimeout(() => {
            gsap.to(tween, {
              timeScale: direction,
              duration: 0.8,
              ease: "power2.out",
              overwrite: true,
            });
          }, SETTLE_DELAY);
        },
      });

      return () => {
        clearTimeout(settle);
        observer.disconnect();
        trigger.kill();
        tween.kill();
      };
    },
    { scope: rootRef },
  );

  return (
    <div className="marquee" ref={rootRef}>
      {label && (
        <div className="padding-global">
          <div className="container-col-12">
            <div className="marquee_label-mask">
              <p className="marquee_label">{label}</p>
            </div>
          </div>
        </div>
      )}

      <div className="marquee_viewport">
        <div className="marquee_track" data-marquee-track>
          <Group items={items} copies={GROUP_COPIES} />
          <Group items={items} copies={GROUP_COPIES} ariaHidden />
        </div>
      </div>
    </div>
  );
}
