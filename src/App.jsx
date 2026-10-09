import { Link, Route, Routes } from "react-router-dom";
import Home from "./Home.jsx";
import About from "./About.jsx";
import Founder from "./Founder.jsx";
import Contact from "./Contact.jsx";
import Layout from "./Layout.jsx";

function NotFound() {
  return (
    <main id="main-content" tabIndex={-1} className="page-container not-found">
      <p className="eyebrow">A little off the path</p>
      <span className="not-found-number" aria-hidden="true">404</span>
      <h1>Let’s help you find your way.</h1>
      <p>This page isn’t here, but a little support is only a click away.</p>
      <Link className="button button-primary" to="/">Back to home</Link>
    </main>
  );
}

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/founder" element={<Founder />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Layout>
  );
}
