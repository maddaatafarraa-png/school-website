import Link from "next/link";
import styles from "@/styles/Home.module.css";

export default function HomePage() {
  return (
    <div className={`${styles.hero} wave-target`}>
      <div className={`${styles.heroContent} wave-target`}>
        <div className={`${styles.brandRow} wave-target`}>
          <div>
            <h1 className={styles.brandTitle}>Shadow Garden</h1>
            <div className={styles.brandSubtitle}>Community School</div>
            <div className={styles.brandTagline}>
              Growing confident learners through curiosity, care, and
              collaboration.
            </div>
          </div>
          <div className={styles.divider} />
          <div className={`${styles.logoGroup} wave-target`}>
            <div className={styles.logoBadge} aria-hidden="true">
              <svg width="46" height="46" viewBox="0 0 64 64" fill="none">
                <path
                  d="M12 8h40v20c0 16-12 26-20 28-8-2-20-12-20-28V8z"
                  stroke="white"
                  strokeWidth="3"
                />
                <path
                  d="M20 22c6 4 18 4 24 0M20 30c6 4 18 4 24 0M20 38c6 4 18 4 24 0"
                  stroke="white"
                  strokeWidth="2"
                />
              </svg>
            </div>
            <div className={styles.logoSeal}>
              Shadow
              <br />
              Garden
              <br />
              Trust
            </div>
          </div>
        </div>

        <section className={`${styles.vision} wave-target`}>
          <h1>Vision Statement</h1>
          <p>
            We nurture an inclusive, ambitious community where every student
            feels known, supported, and inspired to reach their potential. Our
            focus is on meaningful learning, strong character, and lifelong
            curiosity.
          </p>
        </section>

        <div className={`${styles.featureRow} wave-target`}>
          <Link
            href="/about"
            className={`${styles.featureCard} ${styles.cardWarm} wave-target`}
          >
            Welcome
          </Link>
          <Link
            href="/about"
            className={`${styles.featureCard} ${styles.cardCrimson} wave-target`}
          >
            Our Values
          </Link>
          <Link
            href="/contact"
            className={`${styles.featureCard} ${styles.cardGreen} wave-target`}
          >
            Admissions
          </Link>
          <Link
            href="/announcements"
            className={`${styles.featureCard} ${styles.cardPurple} wave-target`}
          >
            Clubs & Programs
          </Link>
        </div>
      </div>

      <aside className={`${styles.quickLinks} wave-target`}>Quick Links</aside>
      <div className={`${styles.footerNote} wave-target`}>
        SHADOW GARDEN SCHOOL
        <br />
        123 Evergreen Lane, Your City
        <br />
        Contact: (000) 000-0000
      </div>
      <div className={`${styles.leaf} wave-target`} aria-hidden="true" />
    </div>
  );
}
