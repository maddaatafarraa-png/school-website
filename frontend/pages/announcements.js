import Link from "next/link";

export default function AnnouncementsPage() {
  return (
    <div>
      <h1 style={{ color: "var(--primary-color)" }}>
        Student Programs & Announcements
      </h1>
      <p>
        This section will contain upcoming programs and announcements fetched
        from the backend in a later phase.
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
