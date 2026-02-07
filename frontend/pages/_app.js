import "@/styles/globals.css";
import Header from "@/components/Header";
import { useRouter } from "next/router";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export default function App({ Component, pageProps }) {
  const router = useRouter();
  const isHome = router.pathname === "/";
  const waveTimeline = useRef(null);

  useEffect(() => {
    if (typeof window === "undefined") {
      return undefined;
    }

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced) {
      return undefined;
    }

    const targets = gsap.utils.toArray(".wave-target");
    if (!targets.length) {
      return undefined;
    }

    if (waveTimeline.current) {
      waveTimeline.current.kill();
      waveTimeline.current = null;
    }

    const originElement =
      document.querySelector(".hero") || document.querySelector(".app-main");
    const originRect = originElement?.getBoundingClientRect();
    const center = originRect
      ? {
          x: originRect.left + originRect.width / 2,
          y: originRect.top + originRect.height / 2,
        }
      : {
          x: window.innerWidth / 2,
          y: window.innerHeight / 2,
        };

    const weightedTargets = targets.map((target) => {
      const rect = target.getBoundingClientRect();
      const x = rect.left + rect.width / 2;
      const y = rect.top + rect.height / 2;
      const dx = x - center.x;
      const dy = y - center.y;
      const distance = Math.hypot(dx, dy);
      return { target, dx, dy, distance };
    });

    const maxDistance = Math.max(...weightedTargets.map((t) => t.distance), 1);
    const tl = gsap.timeline();

    weightedTargets.forEach((item) => {
      const distanceRatio = item.distance / maxDistance;
      const delay = distanceRatio * 0.8;
      const ampY = 14 - distanceRatio * 8;
      const ampX = 6 - distanceRatio * 3;
      const dirX = item.dx === 0 ? 0 : item.dx / Math.abs(item.dx);
      const dirY = item.dy === 0 ? 0 : item.dy / Math.abs(item.dy);
      const xShift = dirX * ampX;
      const yShift = dirY * ampY;

      tl.to(
        item.target,
        {
          x: xShift,
          y: yShift,
          duration: 0.8,
          ease: "sine.out",
        },
        delay
      )
        .to(
          item.target,
          {
            x: -xShift * 0.5,
            y: -yShift * 0.5,
            duration: 0.9,
            ease: "sine.inOut",
          },
          delay + 0.6
        )
        .to(
          item.target,
          {
            x: 0,
            y: 0,
            duration: 1.2,
            ease: "sine.inOut",
          },
          delay + 1.4
        );
    });

    tl.eventCallback("onComplete", () => {
      gsap.set(targets, { clearProps: "x,y" });
    });

    waveTimeline.current = tl;

    return () => {
      tl.kill();
      waveTimeline.current = null;
    };
  }, [router.pathname]);

  return (
    <>
      <Header isHome={isHome} />
      <main
        className={`wave-target ${
          isHome ? "app-main app-main-home" : "app-main"
        }`}
      >
        <Component {...pageProps} />
      </main>
    </>
  );
}
