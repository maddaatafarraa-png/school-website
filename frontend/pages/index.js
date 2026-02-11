import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "@/styles/Home.module.css";

export default function HomePage() {
  const heroRef = useRef(null);

  useEffect(() => {
    if (typeof window === "undefined") {
      return undefined;
    }

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const trigger = heroRef.current;

      gsap.to(`.${styles.heroText}`, {
        yPercent: 8,
        ease: "none",
        overwrite: "auto",
        scrollTrigger: {
          trigger,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      gsap.to(`.${styles.heroImageWrap}`, {
        yPercent: -6,
        ease: "none",
        overwrite: "auto",
        scrollTrigger: {
          trigger,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={heroRef} className={`${styles.hero} wave-target`}>
      <div className={`${styles.heroContent} wave-target`}>
        <div className={styles.heroLayout}>
          <div className={`${styles.heroText} wave-target`}>
            <h1 className={styles.brandTitle}>Shadow Garden Academy</h1>
            <p className={styles.brandTagline}>
              A modern academy where discipline, curiosity, and purpose shape
              tomorrow's leaders.
            </p>
          </div>

          <div className={`${styles.heroImageWrap} wave-target`}>
            <img
              src="/images/hero-campus.jpg"
              alt="Shadow Garden Academy campus"
              className={styles.heroImage}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

