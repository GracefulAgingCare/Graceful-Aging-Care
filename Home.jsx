import { Link } from "react-router-dom";
import Icon from "./Icon.jsx";
import { assetUrl } from "./sitePaths.js";

const services = [
  { icon: "heart", number: "01", title: "A hand with the everyday", text: "Thoughtful support with personal care, getting ready, mobility, and daily routines.", service: "personal-care", label: "Personal care" },
  { icon: "people", number: "02", title: "Someone to share the day", text: "Meaningful conversation, a familiar face, and companionship that comes from the heart.", service: "companionship", label: "Companionship" },
  { icon: "home", number: "03", title: "A home that feels like home", text: "A little help with meals, light housekeeping, and errands so life feels more manageable.", service: "home-support", label: "Home support" },
];
const faqs = [
  ["What kind of care do you provide?", "We provide non-medical home care, including help with personal care, companionship, meal preparation, light housekeeping, and everyday routines. Visit our About us page to explore the services available."],
  ["Who can receive support?", "Our services support individuals of all ages and abilities, with a special focus on older adults and people with disabilities. We work with individuals and families to understand their needs."],
  ["Can care be tailored to our family?", "Yes. Each care plan is built around the individual’s needs, preferences, and budget. We believe clients and their families should have a voice in the care they receive."],
  ["How do we get started?", "Start with a conversation. Visit our Contact page and tell us a little about the support you’re looking for. We can discuss your needs and the next steps together."],
];

function HomePhotos() {
  return (
    <div className="hero-art hero-photo-art">
      <div className="art-orbit art-orbit-one" /><div className="art-orbit art-orbit-two" />
      <img className="hero-photo" src={assetUrl("images/family-at-home.webp")} width="887" height="848" alt="Three children enjoying time together at home" fetchPriority="high" />
      <div className="art-note art-note-top"><span className="note-icon"><Icon name="sun" /></span><span>A brighter everyday<small>Little moments. Meaningful care.</small></span></div>
      <div className="art-note art-note-bottom"><span className="note-icon"><Icon name="heart" /></span><span>Right where you belong.<small>At home, with a helping hand.</small></span></div>
      <span className="art-spark art-spark-one" aria-hidden="true">✳</span>
    </div>
  );
}

const values = [
  { label: "Compassion", image: "compassion-hands", alt: "A hand gently holding an older adult's hand", width: 332, height: 332 },
  { label: "Integrity", image: "integrity-children", alt: "Three smiling children sitting together", width: 1280, height: 1280 },
  { label: "Respect", image: "respect-book", alt: "A person reading a book titled Love and Respect", width: 1280, height: 1280 },
  { label: "Excellence and faith", image: "faith-hope-love", alt: "Faith, hope, and love print beside a book and a cup of coffee", width: 1280, height: 1280 },
];

export default function Home() {
  return (
    <main id="main-content" tabIndex={-1}>
      <section className="hero page-container">
        <div className="hero-copy">
          <p className="eyebrow"><span className="eyebrow-line" /> CARE THAT FEELS LIKE FAMILY</p>
          <h1>A little support.<br />A lot more<br /><span>life at home.</span></h1>
          <p className="hero-description">Familiar surroundings. Favorite routines. The freedom to be yourself. Compassionate, personalized home care for the people you love.</p>
          <div className="hero-actions"><Link className="button button-primary" to="/contact">Let’s find your care <Icon name="arrow" size={19} /></Link><Link className="button button-secondary" to="/about">Explore our services</Link></div>
          <p className="hero-location"><Icon name="pin" size={16} /> Rooted in Charlotte, North Carolina</p>
        </div>
        <HomePhotos />
      </section>
      <div className="care-strip page-container" aria-label="Our approach to care"><span><Icon name="check" size={19} /> Licensed &amp; insured</span><span><Icon name="heart" size={19} /> People first, always</span><span><Icon name="home" size={19} /> The comfort of home</span><span><Icon name="people" size={19} /> Care as unique as you</span></div>
      <section className="home-services page-container section-space" data-reveal>
        <div className="section-topline"><div><p className="eyebrow">A HELPING HAND, YOUR WAY</p><h2 className="section-heading">Everyday care.<br /><span className="muted-heading">Extraordinary compassion.</span></h2></div><Link className="text-link" to="/about">Discover all our services <Icon name="arrow" size={18} /></Link></div>
        <div className="home-service-grid">{services.map((service) => <article className="home-service-card" key={service.service}><div className="service-card-top"><span className="service-icon"><Icon name={service.icon} size={28} /></span><span className="service-index">{service.number}</span></div><p className="service-label">{service.label}</p><h3>{service.title}</h3><p>{service.text}</p><Link className="text-link" to={`/contact?service=${service.service}`}>Let’s talk {service.label.toLowerCase()} <Icon name="arrow" size={18} /></Link></article>)}</div>
      </section>
      <section className="home-promise page-container" data-reveal>
        <figure className="promise-photo"><img src={assetUrl("images/together-in-care.webp")} width="1280" height="719" alt="Friends standing together with their arms around each other" loading="lazy" decoding="async" /><figcaption>Home is more than a place.<br /><em>It’s a feeling.</em></figcaption></figure>
        <div className="promise-copy"><p className="eyebrow">WELCOME TO GRACEFUL AGING CARE</p><h2 className="section-heading">Your home.<br />Your rhythm. Your care.</h2><p>We are a licensed and insured non-medical home care agency based in Charlotte, North Carolina. We support individuals of all ages, with a special focus on older adults and people with disabilities.</p><p>We know the comfort, love, and memories a home holds. Our mission is to help people remain safely and comfortably in their own space, with dependable care that protects their dignity and independence.</p><Link className="text-link" to="/founder">Meet the heart behind our care <Icon name="arrow" size={18} /></Link></div>
      </section>
      <section className="home-values page-container section-space" aria-labelledby="values-heading" data-reveal>
        <div className="section-topline"><div><p className="eyebrow">THE HEART OF EVERYTHING WE DO</p><h2 id="values-heading" className="section-heading">Our values, brought to life.</h2></div><p>More than words.<br />The way we show up, every day.</p></div>
        <div className="values-photo-grid">{values.map((value) => <figure className="value-photo-card" key={value.label}><img src={assetUrl(`images/${value.image}.webp`)} width={value.width} height={value.height} alt={value.alt} loading="lazy" decoding="async" /><figcaption><span>{value.label}</span></figcaption></figure>)}</div>
      </section>
      <section className="home-process page-container section-space" data-reveal>
        <div className="section-intro"><p className="eyebrow">LET’S TAKE IT ONE STEP AT A TIME</p><h2 className="section-heading">A thoughtful start to better days.</h2><p>Finding support should feel reassuring. We start by listening.</p></div>
        <div className="process-grid">{[["01", "Tell us your story", "Share what everyday life looks like and where a little help would make a difference."], ["02", "Make it personal", "Together, we consider your needs, preferences, routines, and budget."], ["03", "Feel at home", "Build a care arrangement around comfort, connection, and the things that matter to you."]].map(([number, title, description]) => <article key={number}><span className="process-number">{number}</span><h3>{title}</h3><p>{description}</p></article>)}</div>
      </section>
      <section className="home-faq page-container" data-reveal><div><p className="eyebrow">A LITTLE CLARITY</p><h2 className="section-heading">Good questions.<br />Thoughtful answers.</h2><p>Every family’s journey is different.<br />We’re here to help you find your next step.</p><Link to="/contact" className="text-link">Have another question? <Icon name="arrow" size={18} /></Link></div><div className="faq-list">{faqs.map(([question, answer]) => <details key={question}><summary>{question}<span className="faq-plus" aria-hidden="true" /></summary><p>{answer}</p></details>)}</div></section>
      <section className="home-cta page-container" data-reveal><div><p className="eyebrow">YOU DON’T HAVE TO FIGURE IT OUT ALONE</p><h2>Let’s make home<br />an even better place to be.</h2><p>A conversation is a good place to start.</p></div><Link className="button button-light" to="/contact">Let’s talk about care <Icon name="arrow" size={20} /></Link><span className="cta-flower" aria-hidden="true">✳</span></section>
    </main>
  );
}
