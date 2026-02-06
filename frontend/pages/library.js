import Link from "next/link";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { getToken } from "@/lib/auth";

export default function LibraryPage() {
  const router = useRouter();

  useEffect(() => {
    const token = getToken();
    if (!token) {
      router.replace("/login");
    }
  }, [router]);

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
