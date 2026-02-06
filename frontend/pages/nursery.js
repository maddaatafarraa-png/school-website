import Link from "next/link";

export default function NurseryPage() {
  return (
    <div>
      <h1 style={{ color: "var(--primary-color)" }}>Nursery - KG - UPKG</h1>
      <p>
        A gentle introduction to learning through play, creativity, and
        foundational skills that build confidence for early learners.
      </p>
      <p>
        Back to{" "}
        <Link href="/" style={{ color: "var(--primary-color)" }}>
          Home
        </Link>
        .
      </p>
    </div>
  );
}
