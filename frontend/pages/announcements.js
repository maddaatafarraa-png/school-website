import Link from "next/link";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { getToken } from "@/lib/auth";

export default function AnnouncementsPage() {
  const router = useRouter();

  useEffect(() => {
    const token = getToken();
    if (!token) {
      router.replace("/login");
    }
  }, [router]);

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
