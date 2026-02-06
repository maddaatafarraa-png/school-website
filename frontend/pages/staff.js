import Link from "next/link";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { getToken } from "@/lib/auth";

export default function StaffPage() {
  const router = useRouter();

  useEffect(() => {
    const token = getToken();
    if (!token) {
      router.replace("/login");
    }
  }, [router]);

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
