import Link from "next/link";

export default function StaffPage() {
  return (
    <div>
      <h1 style={{ color: "var(--primary-color)" }}>Staff</h1>
      <p>Meet our dedicated teachers and support team (placeholder).</p>
      <ul>
        <li>Principal: TBD</li>
        <li>Vice Principal: TBD</li>
        <li>Faculty: TBD</li>
      </ul>
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
