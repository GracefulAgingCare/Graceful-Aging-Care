import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import Icon from "./Icon.jsx";
import ScrollReveal from "./ScrollReveal.jsx";
import Seo from "./Seo.jsx";

const links = [["/", "Home"], ["/about", "About us"], ["/founder", "Our founder"], ["/contact", "Contact"]];

function Brand() {
  return (
    <Link to="/" className="brand" aria-label="Graceful Aging Care home">
      <span className="brand-mark"><Icon name="heart" size={25} /></span>
      <span>Graceful<span className="brand-subtitle">AGING CARE</span></span>
    </Link>
  );
}

function Navigation() {
  const [open, setOpen] = useState(false);
  const toggleRef = useRef(null);
  const navRef = useRef(null);

  useEffect(() => {
    if (!open) return;
    const closeOnEscape = (event) => {
      if (event.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    const closeOutside = (event) => {
      if (!navRef.current?.contains(event.target)) setOpen(false);
    };
    document.addEventListener("keydown", closeOnEscape);
    document.addEventListener("pointerdown", closeOutside);
    return () => {
      document.removeEventListener("keydown", closeOnEscape);
      document.removeEventListener("pointerdown", closeOutside);
    };
  }, [open]);

  return (
    <div className="nav-container" ref={navRef}>
      <Brand />
      <button ref={toggleRef} className="menu-toggle" type="button" aria-label={open ? "Close navigation" : "Open navigation"} aria-expanded={open} aria-controls="primary-navigation" onClick={() => setOpen(!open)}>
        <Icon name={open ? "close" : "menu"} />
      </button>
      <nav id="primary-navigation" className={`site-nav${open ? " is-open" : ""}`} aria-label="Main navigation">
        {links.map(([to, label]) => <NavLink key={to} to={to} end={to === "/"} onClick={() => setOpen(false)}>{label}</NavLink>)}
        <Link className="button button-primary nav-cta" to="/contact" onClick={() => setOpen(false)}>Let’s talk care <Icon name="arrow" size={17} /></Link>
      </nav>
    </div>
  );
}

export default function Layout({ children }) {
  const { pathname } = useLocation();
  const previousPath = useRef(pathname);
  const progressRef = useRef(null);
  const [showTop, setShowTop] = useState(false);

  useLayoutEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    if (previousPath.current !== pathname) document.getElementById("main-content")?.focus({ preventScroll: true });
    previousPath.current = pathname;
  }, [pathname]);

  useEffect(() => {
    let frame;
    const update = () => {
      const height = document.documentElement.scrollHeight - window.innerHeight;
      const progress = height > 0 ? Math.min(1, Math.max(0, window.scrollY / height)) : 0;
      if (progressRef.current) progressRef.current.style.transform = `scaleX(${progress})`;
      setShowTop(window.scrollY > 600);
      frame = undefined;
    };
    const schedule = () => { if (frame === undefined) frame = requestAnimationFrame(update); };
    schedule();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    const resizeObserver = typeof ResizeObserver !== "undefined" ? new ResizeObserver(schedule) : null;
    resizeObserver?.observe(document.body);
    return () => {
      cancelAnimationFrame(frame);
      resizeObserver?.disconnect();
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth" });
    document.getElementById("main-content")?.focus({ preventScroll: true });
  };

  return (
    <>
      <Seo />
      <a className="skip-link" href="#main-content" onClick={(event) => { event.preventDefault(); document.getElementById("main-content")?.focus(); }}>Skip to content</a>
      <div className="announcement"><span className="status-dot" /> Thoughtful care. Familiar surroundings. <span className="announcement-location">Charlotte, North Carolina</span></div>
      <header className="site-header"><Navigation key={pathname} /><div ref={progressRef} className="reading-progress" aria-hidden="true" /></header>
      {children}
      <footer className="site-footer">
        <div className="footer-main page-container">
          <div><Brand /><p>Compassion in every visit.<br />Comfort in your own home.</p></div>
          <div className="footer-location"><Icon name="pin" /><div><strong>Rooted in Charlotte</strong><p>Non-medical home care<br />North Carolina</p></div></div>
          <nav aria-label="Footer navigation">{links.map(([to, label]) => <Link to={to} key={to}>{label}</Link>)}</nav>
        </div>
        <div className="footer-bottom page-container"><span>© {new Date().getFullYear()} Graceful Aging Care LLC</span><span>Built around compassion, dignity &amp; you.</span></div>
      </footer>
      {showTop && <button className="back-to-top" type="button" aria-label="Back to top" onClick={scrollToTop}><Icon name="up" /></button>}
      <ScrollReveal />
    </>
  );
}
