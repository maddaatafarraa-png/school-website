import Link from "next/link";

export default function LibraryPage() {
  return (
    <div>
      <h1 style={{ color: "var(--primary-color)" }}>Digital Library</h1>
      <p>
        Placeholder for digital books, learning materials, and reading
        resources.
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
