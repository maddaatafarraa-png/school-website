import Link from "next/link";
import { useMemo } from "react";
import styles from "@/styles/Header.module.css";

const pillClasses = [styles.pillRed, styles.pillBlue, styles.pillPurple];

export default function Header({ isHome }) {
  const navItems = useMemo(() => {
    return [
      { href: "/", label: "Home" },
      { href: "/about", label: "About Us" },
    ];
  }, []);

  return (
    <header
      className={`wave-target ${styles.header} ${
        isHome ? styles.headerHome : ""
      }`}
    >
      <div className={styles.navGrid}>
        <div className={styles.navLeft} aria-hidden="true" />
        <nav
          className={`${styles.navList} wave-target`}
          aria-label="Main navigation"
        >
          {navItems.map((item, index) => (
            <Link
              key={item.href}
              href={item.href}
              className={`${styles.pill} ${
                pillClasses[index % pillClasses.length]
              }`}
            >
              {item.label}
            </Link>
          ))}

          <div className={styles.dropdown}>
            <span className={`${styles.pill} ${styles.pillPurple}`}>
              Academics
            </span>
            <div className={styles.dropdownMenu}>
              <Link href="/nursery" className={styles.dropdownItem}>
                Nursery
              </Link>
              <Link href="/primary" className={styles.dropdownItem}>
                Primary
              </Link>
              <Link href="/high-school" className={styles.dropdownItem}>
                High School
              </Link>
              <Link href="/staff" className={styles.dropdownItem}>
                Staff
              </Link>
              <Link href="/library" className={styles.dropdownItem}>
                Library
              </Link>
              <Link href="/announcements" className={styles.dropdownItem}>
                Programs & Announcements
              </Link>
            </div>
          </div>
        </nav>

        <div className={`${styles.navRight} wave-target`}>
          <Link href="/login" className={`${styles.pill} ${styles.pillGold}`}>
            Login
          </Link>
        </div>
      </div>
    </header>
  );
}
