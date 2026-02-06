import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { getToken, isAdminToken } from "@/lib/auth";

const API_BASE =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3000";

export default function AdminPage() {
  const router = useRouter();
  const [token, setToken] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [announcementTitle, setAnnouncementTitle] = useState("");
  const [announcementContent, setAnnouncementContent] = useState("");
  const [libraryTitle, setLibraryTitle] = useState("");
  const [libraryContent, setLibraryContent] = useState("");

  useEffect(() => {
    const storedToken = getToken();
    if (!storedToken) {
      router.replace("/login");
      return;
    }

    if (!isAdminToken(storedToken)) {
      router.replace("/");
      return;
    }

    setToken(storedToken);
  }, [router]);

  const handleAnnouncementSubmit = async (event) => {
    event.preventDefault();
    setMessage("");
    setError("");

    try {
      const response = await fetch(`${API_BASE}/api/announcements`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title: announcementTitle,
          content: announcementContent,
        }),
      });

      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        setError(data.error || "Failed to add announcement");
        return;
      }

      setAnnouncementTitle("");
      setAnnouncementContent("");
      setMessage("Announcement added.");
    } catch (err) {
      setError("Network error");
    }
  };

  const handleLibrarySubmit = async (event) => {
    event.preventDefault();
    setMessage("");
    setError("");

    try {
      const response = await fetch(`${API_BASE}/api/library`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title: libraryTitle,
          content: libraryContent,
        }),
      });

      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        setError(data.error || "Failed to add library item");
        return;
      }

      setLibraryTitle("");
      setLibraryContent("");
      setMessage("Library item added.");
    } catch (err) {
      setError("Network error");
    }
  };

  return (
    <div>
      <h1 style={{ color: "var(--primary-color)" }}>Admin Dashboard</h1>
      <p>Use these forms to add announcements and library items.</p>

      {message ? <p style={{ color: "green" }}>{message}</p> : null}
      {error ? <p style={{ color: "crimson" }}>{error}</p> : null}

      <section style={{ marginTop: "24px" }}>
        <h2 style={{ color: "var(--primary-color)" }}>New Announcement</h2>
        <form onSubmit={handleAnnouncementSubmit}>
          <label style={{ display: "block", marginTop: "12px" }}>
            Title
          </label>
          <input
            value={announcementTitle}
            onChange={(event) => setAnnouncementTitle(event.target.value)}
            style={{ width: "100%", padding: "8px", marginTop: "6px" }}
            required
          />

          <label style={{ display: "block", marginTop: "12px" }}>
            Content
          </label>
          <textarea
            value={announcementContent}
            onChange={(event) => setAnnouncementContent(event.target.value)}
            style={{ width: "100%", padding: "8px", marginTop: "6px" }}
            rows={4}
            required
          />

          <button
            type="submit"
            style={{
              marginTop: "12px",
              padding: "10px 16px",
              background: "var(--primary-color)",
              color: "#fff",
              border: "none",
              cursor: "pointer",
            }}
          >
            Add Announcement
          </button>
        </form>
      </section>

      <section style={{ marginTop: "32px" }}>
        <h2 style={{ color: "var(--primary-color)" }}>New Library Item</h2>
        <form onSubmit={handleLibrarySubmit}>
          <label style={{ display: "block", marginTop: "12px" }}>
            Title
          </label>
          <input
            value={libraryTitle}
            onChange={(event) => setLibraryTitle(event.target.value)}
            style={{ width: "100%", padding: "8px", marginTop: "6px" }}
            required
          />

          <label style={{ display: "block", marginTop: "12px" }}>
            Content
          </label>
          <textarea
            value={libraryContent}
            onChange={(event) => setLibraryContent(event.target.value)}
            style={{ width: "100%", padding: "8px", marginTop: "6px" }}
            rows={4}
            required
          />

          <button
            type="submit"
            style={{
              marginTop: "12px",
              padding: "10px 16px",
              background: "var(--primary-color)",
              color: "#fff",
              border: "none",
              cursor: "pointer",
            }}
          >
            Add Library Item
          </button>
        </form>
      </section>
    </div>
  );
}
