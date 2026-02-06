import Link from "next/link";

export default function HighSchoolPage() {
  return (
    <div>
      <h1 style={{ color: "var(--primary-color)" }}>
        High School (Grades 9-12)
      </h1>
      <p>
        Advanced coursework, leadership opportunities, and preparation for
        college and career pathways.
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
