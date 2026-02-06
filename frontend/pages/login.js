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
    <div>
      <h1 style={{ color: "var(--primary-color)" }}>Login</h1>
      <form onSubmit={handleSubmit} style={{ maxWidth: "420px" }}>
        <label htmlFor="email" style={{ display: "block", marginTop: "12px" }}>
          Email
        </label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          style={{ width: "100%", padding: "8px", marginTop: "6px" }}
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
          style={{ width: "100%", padding: "8px", marginTop: "6px" }}
          required
        />

        {error ? (
          <p style={{ color: "crimson", marginTop: "12px" }}>{error}</p>
        ) : null}

        <button
          type="submit"
          disabled={loading}
          style={{
            marginTop: "16px",
            padding: "10px 16px",
            background: "var(--primary-color)",
            color: "#fff",
            border: "none",
            cursor: "pointer",
          }}
        >
          {loading ? "Signing in..." : "Sign In"}
        </button>
      </form>
    </div>
  );
}
