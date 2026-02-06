import Link from "next/link";

const navStyle = {
  display: "flex",
  flexWrap: "wrap",
  gap: "16px",
  alignItems: "center",
};

const linkStyle = {
  color: "var(--primary-color)",
  fontWeight: 600,
};

export default function Header() {
  return (
    <header
      style={{
        borderBottom: "1px solid #e5e7eb",
        padding: "16px 24px",
        background: "#f8faff",
      }}
    >
      <nav style={navStyle}>
        <Link href="/" style={linkStyle}>
          Home
        </Link>
        <Link href="/about" style={linkStyle}>
          About
        </Link>
        <Link href="/nursery" style={linkStyle}>
          Nursery
        </Link>
        <Link href="/primary" style={linkStyle}>
          Primary
        </Link>
        <Link href="/high-school" style={linkStyle}>
          High School
        </Link>
        <Link href="/staff" style={linkStyle}>
          Staff
        </Link>
        <Link href="/announcements" style={linkStyle}>
          Programs & Announcements
        </Link>
        <Link href="/library" style={linkStyle}>
          Library
        </Link>
        <Link href="/contact" style={linkStyle}>
          Contact
        </Link>
      </nav>
    </header>
  );
}
