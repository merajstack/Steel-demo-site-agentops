import Link from "next/link";

export default function Header() {
  return (
    <header className="site-header">
      <Link className="brand" href="/#top" aria-label="Apex Steel Pipes home">
        <span className="brand-mark">A</span>
        <span>
          <strong>Apex Steel Pipes</strong>
          <small>Manufacturing Co.</small>
        </span>
      </Link>
      <nav className="site-nav" aria-label="Primary navigation">
        <Link href="/#products">Products</Link>
        <Link href="/#quality">Quality</Link>
        <Link href="/#industries">Industries</Link>
        <Link href="/#contact">Contact</Link>
        <Link href="/contact">Form Page</Link>
      </nav>
      <Link className="nav-cta" href="/#contact">
        Request Quote
      </Link>
    </header>
  );
}
