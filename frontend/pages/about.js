import Link from "next/link";

export default function AboutPage() {
  return (
    <div>
      <h1 style={{ color: "var(--primary-color)" }}>About Us</h1>
      <p>
        This is a placeholder for the school mission, history, and values. We
        will expand this section with details about our learning community.
      </p>
      <p>
        Return to{" "}
        <Link href="/" style={{ color: "var(--primary-color)" }}>
          Home
        </Link>
        .
      </p>
    </div>
  );
}
