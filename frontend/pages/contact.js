import Link from "next/link";

export default function ContactPage() {
  return (
    <div>
      <h1 style={{ color: "var(--primary-color)" }}>Contact</h1>
      <p>
        Phone: (000) 000-0000
        <br />
        Email: info@school.edu
        <br />
        Address: 123 School Lane, Your City
      </p>
      <p>
        Go back to{" "}
        <Link href="/" style={{ color: "var(--primary-color)" }}>
          Home
        </Link>
        .
      </p>
    </div>
  );
}
