import Link from "next/link";

export default function HomePage() {
  return (
    <div>
      <h1 style={{ color: "var(--primary-color)" }}>Home</h1>
      <p>
        Welcome to our school portal. Use the navigation above to explore
        academics, programs, and resources for students and families.
      </p>
      <p>
        Learn more on the{" "}
        <Link href="/about" style={{ color: "var(--primary-color)" }}>
          About Us
        </Link>{" "}
        page or reach out via{" "}
        <Link href="/contact" style={{ color: "var(--primary-color)" }}>
          Contact
        </Link>
        .
      </p>
    </div>
  );
}
