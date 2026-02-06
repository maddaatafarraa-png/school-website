import "@/styles/globals.css";
import Header from "@/components/Header";

export default function App({ Component, pageProps }) {
  return (
    <>
      <Header />
      <main style={{ padding: "24px" }}>
        <Component {...pageProps} />
      </main>
    </>
  );
}
