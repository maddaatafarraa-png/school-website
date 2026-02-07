import { useState } from "react";
import { useRouter } from "next/router";

const API_BASE =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3000";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch(`${API_BASE}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        setError(data.error || "Login failed");
        setLoading(false);
        return;
      }

      const data = await response.json();
      if (!data.token) {
        setError("No token returned");
        setLoading(false);
        return;
      }

      localStorage.setItem("token", data.token);
      setLoading(false);
      router.push("/announcements");
    } catch (err) {
      setError("Network error");
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "calc(100vh - 86px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
      className="wave-target"
    >
      <div
        style={{
          background: "rgba(12, 16, 28, 0.72)",
          padding: "32px",
          borderRadius: "20px",
          boxShadow: "0 20px 40px rgba(0, 0, 0, 0.35)",
          width: "100%",
          maxWidth: "420px",
        }}
        className="wave-target"
      >
        <h1 style={{ color: "#fff", textAlign: "center", marginBottom: "12px" }}>
          Login
        </h1>
        <form onSubmit={handleSubmit} className="wave-target">
          <label htmlFor="email" style={{ display: "block", marginTop: "12px" }}>
            Email
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            style={{
              width: "100%",
              padding: "10px 12px",
              marginTop: "6px",
              borderRadius: "12px",
              border: "1px solid rgba(255, 255, 255, 0.2)",
              background: "rgba(255, 255, 255, 0.08)",
              color: "#fff",
            }}
            required
          />

          <label
            htmlFor="password"
            style={{ display: "block", marginTop: "12px" }}
          >
            Password
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            style={{
              width: "100%",
              padding: "10px 12px",
              marginTop: "6px",
              borderRadius: "12px",
              border: "1px solid rgba(255, 255, 255, 0.2)",
              background: "rgba(255, 255, 255, 0.08)",
              color: "#fff",
            }}
            required
          />

          {error ? (
            <p style={{ color: "#ffb3b3", marginTop: "12px" }}>{error}</p>
          ) : null}

          <button
            type="submit"
            disabled={loading}
            style={{
              marginTop: "16px",
              padding: "12px 16px",
              width: "100%",
              background: "var(--primary-color)",
              color: "#fff",
              border: "none",
              borderRadius: "999px",
              cursor: "pointer",
              fontWeight: 700,
              boxShadow: "0 10px 18px rgba(51, 102, 255, 0.35)",
            }}
            className="glow-button wave-target"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
}
