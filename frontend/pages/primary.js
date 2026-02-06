import Link from "next/link";

export default function PrimaryPage() {
  return (
    <div>
      <h1 style={{ color: "var(--primary-color)" }}>Primary (Grades 1-8)</h1>
      <p>
        Core subjects, critical thinking, and character development form the
        foundation of our primary program.
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
