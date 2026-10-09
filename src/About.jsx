import { useState } from "react";
import { Link } from "react-router-dom";
import { assetUrl } from "./sitePaths.js";

const serviceCategories = [
  { value: "all", label: "All services" },
  { value: "daily", label: "Daily living" },
  { value: "connection", label: "Connection" },
  { value: "specialized", label: "Specialized support" },
];

const services = [
  {
    title: "Personal Care Services",
    value: "personal-care",
    image: "personal-care",
    imageAlt: "A caregiver supporting older adults during a creative activity",
    imageWidth: 1280,
    imageHeight: 1074,
    category: "daily",
    items: [
      "Bathing, grooming, and dressing assistance",
      "Mobility and transfer support",
      "Medication reminders",
      "Meal preparation and feeding assistance",
    ],
  },
  {
    title: "Companionship & Emotional Support",
    value: "companionship",
    image: "senior-companionship",
    imageAlt: "An older woman smiling during a conversation",
    imageWidth: 1280,
    imageHeight: 1074,
    category: "connection",
    paragraphs: [
      "We provide compassionate companionship and emotional support to help clients feel valued, connected, and comfortable in their own homes.",
    ],
  },
  {
    title: "Home Support Services",
    value: "home-support",
    image: "grocery-shopping",
    imageAlt: "A basket of fresh groceries in a food market",
    imageWidth: 1280,
    imageHeight: 962,
    category: "daily",
    items: [
      "Light housekeeping and laundry",
      "Grocery shopping and meal planning",
      "Errand running and appointment reminders",
      "Home organization and safety checks",
    ],
  },
  {
    title: "Specialized Care",
    value: "specialized-care",
    image: "medication-reminders",
    imageAlt: "A person using a weekly pill organizer",
    imageWidth: 1280,
    imageHeight: 800,
    category: "specialized",
    items: [
      "Alzheimer's and dementia support",
      "Post-hospitalization or post-surgery recovery care",
    ],
  },
  {
    title: "Community Engagement",
    value: "community-engagement",
    image: "child-play",
    imageAlt: "A child exploring a colorful toy camera",
    imageWidth: 1280,
    imageHeight: 962,
    category: "connection",
    paragraphs: [
      "Graceful Aging Care believes in building stronger, more connected communities.",
      "We proudly support local outreach programs that offer wellness checks, companionship visits, and caregiver education to promote awareness and compassion across our community.",
    ],
  },
  {
    title: "Flexible Care Arrangements",
    value: "general",
    image: "community-outing",
    imageAlt: "A child enjoying a treat on an outdoor outing",
    imageWidth: 1280,
    imageHeight: 797,
    category: "specialized",
    paragraphs: [
      "Our services are funded by the individuals and families we serve.",
      "Each care plan is customized based on the client's unique needs, preferences, and budget.",
      "We work closely with families to design flexible, affordable care arrangements that promote comfort and independence.",
    ],
  },
];

function AboutUsPage() {
  const [activeCategory, setActiveCategory] = useState("all");
  const visibleServices = services.filter(
    (service) => activeCategory === "all" || service.category === activeCategory,
  );

  return (
    <main id="main-content" tabIndex={-1} className="page-container about-page">
      <header className="page-header" data-reveal>
        <p className="eyebrow">About Graceful Aging Care</p>
        <h1>Care that comes from the heart.</h1>
        <p className="section-intro">
          Choosing the right home care service is one of the most important
          decisions a family can make. We believe that care should protect your
          comfort, your independence, and your sense of home.
        </p>
      </header>

      <div className="about-intro-grid" data-reveal>
        <section className="surface-card care-values" aria-labelledby="why-us-heading">
          <p className="eyebrow">The way we care</p>
          <h2 id="why-us-heading" className="section-heading">Why choose us?</h2>
          <p>At Graceful Aging Care, we stand out because we:</p>
          <ul className="values-list">
            <li>Are reliable, punctual, and empathetic in every service we provide.</li>
            <li>
              Involve clients, including children, seniors, and individuals with
              disabilities, in decisions about their care.
            </li>
            <li>Follow the Golden Rule: treat others the way you want to be treated.</li>
            <li>
              Offer personalized, one-on-one care tailored to each client's unique needs.
            </li>
            <li>
              Operate with complete transparency, honesty, and accountability in all
              interactions.
            </li>
          </ul>
          <p>When you choose Graceful Aging Care, you choose care that comes from the heart.</p>
        </section>

        <section className="surface-card goals-card" aria-labelledby="goals-heading">
          <p className="eyebrow">Our purpose</p>
          <h2 id="goals-heading" className="section-heading">Safety. Comfort. Dignity.</h2>
          <p>
            Our goal is to ensure the safety, comfort, and dignity of every person
            we serve.
          </p>
          <p>
            We recognize that we are guests in our clients' homes and treat that
            privilege with the highest level of professionalism, respect, and
            compassion.
          </p>
          <Link className="text-link" to="/founder">Meet our founder <span aria-hidden="true">↗</span></Link>
        </section>
      </div>

      <section className="services-section" aria-labelledby="services-heading" data-reveal>
        <p className="eyebrow">Support for everyday life</p>
        <h2 id="services-heading" className="section-heading">Services we offer.</h2>
        <p className="section-intro">
          Our programs are thoughtfully designed to support individuals of all
          ages and abilities through a wide range of in-home care services.
          Explore the ways we can help.
        </p>
        <div className="service-filters" role="group" aria-label="Filter services">
          {serviceCategories.map((category) => (
            <button
              key={category.value}
              type="button"
              className={`filter-button${activeCategory === category.value ? " is-active" : ""}`}
              aria-pressed={activeCategory === category.value}
              aria-controls="service-results"
              onClick={() => setActiveCategory(category.value)}
            >
              {category.label}
            </button>
          ))}
        </div>
        <p className="services-count" role="status" aria-live="polite" aria-atomic="true">
          Showing {visibleServices.length} of {services.length} services and care options
        </p>
        <div id="service-results" className="service-grid">
          {visibleServices.map((service) => (
            <article className="surface-card service-card service-photo-card" key={service.title}>
              <img className="service-photo" src={assetUrl(`images/${service.image}.webp`)} alt={service.imageAlt} width={service.imageWidth} height={service.imageHeight} loading="lazy" decoding="async" />
              <div className="service-card-content">
              <span className="service-number" aria-hidden="true">
                {String(services.indexOf(service) + 1).padStart(2, "0")}
              </span>
              <p className="service-category">
                {serviceCategories.find((category) => category.value === service.category).label}
              </p>
              <h3>{service.title}</h3>
              <div className="service-details">
                {service.items && (
                  <ul>
                    {service.items.map((item) => <li key={item}>{item}</li>)}
                  </ul>
                )}
                {service.paragraphs?.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              </div>
              <Link className="text-link" to={`/contact?service=${service.value}`}>
                Talk with us about care <span aria-hidden="true">↗</span>
                <span className="sr-only">: {service.title}</span>
              </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="page-cta" aria-labelledby="about-cta-heading" data-reveal>
        <div>
          <p className="eyebrow">Let's find the right support</p>
          <h2 id="about-cta-heading" className="section-heading">Every care story starts with a conversation.</h2>
          <p>Tell us what matters to you and your family.</p>
        </div>
        <Link className="button button-primary" to="/contact">Get in touch <span aria-hidden="true">↗</span></Link>
      </section>
    </main>
  );
}

export default AboutUsPage;
