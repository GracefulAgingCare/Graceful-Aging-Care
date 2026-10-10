import { Link } from "react-router-dom";

import { assetUrl } from "./sitePaths.js";

function FounderPage() {
  return (
    <main id="main-content" tabIndex={-1} className="page-container founder-page">
      <header className="page-header" data-reveal>
        <p className="eyebrow">Meet our founder</p>
        <h1>A life shaped by compassion.</h1>
        <p className="section-intro">
          Learn more about our founder and the journey behind Graceful Aging Care.
          A story of family, perseverance, and a calling to care for others.
        </p>
      </header>

      <div className="founder-layout">
        <div className="founder-story">
          <section className="story-section" aria-labelledby="early-life-heading" data-reveal>
            <span className="story-step" aria-hidden="true">01</span>
            <p className="eyebrow">Where it began</p>
            <h2 id="early-life-heading" className="section-heading">Early childhood</h2>
            <p>
              I was born and raised in Africa, where our culture places deep value
              on honoring and caring for our elders. In my homeland, there are no
              nursing homes — we open our doors and our hearts to aging parents and
              grandparents, caring for them until their final days. We believe that
              God blesses those who honor and care for their elders.
            </p>
            <p>
              As a child, I dreamed of becoming a physician. My father, my greatest
              teacher and supporter, once told me, <em>“Dee, life will be tough, but
              always prioritize your education. Be a good person.”</em> His words
              continue to shape my journey today.
            </p>
            <p>
              After surviving the hardships of civil war and exile, I returned home
              determined to rebuild my life. I earned a Bachelor of Science in
              Accounting with a minor in Economics, graduating with honors in just
              two and a half years, followed by a Master's degree in Banking and Finance.
            </p>
          </section>

          <section className="story-section" aria-labelledby="career-heading" data-reveal>
            <span className="story-step" aria-hidden="true">02</span>
            <p className="eyebrow">A calling to serve</p>
            <h2 id="career-heading" className="section-heading">Career and experience</h2>
            <p>
              My early career in accounting and auditing provided a strong
              professional foundation, but my heart longed for a more personal way
              to serve others.
            </p>
            <p>
              That calling led me to healthcare, where I became a Certified Adult
              Care Administrator, a Medication Technician (MedTech), and a
              Certified Nursing Assistant (CNA), while pursuing a nursing degree.
            </p>
            <p>
              Through this work, I witnessed many patients experiencing neglect,
              loneliness, and the loss of dignity after leaving their homes for
              care in facilities.
            </p>
            <p>
              I came to understand that, although I could not transform an entire
              system, I could build a compassionate alternative — one that enables
              individuals to stay in the place they treasure most: their home.
            </p>
            <p>
              That vision gave birth to Graceful Aging Care, a ministry founded on
              compassion, dignity, and respect for life at every stage.
            </p>
          </section>

          <section className="story-section" aria-labelledby="family-heading" data-reveal>
            <span className="story-step" aria-hidden="true">03</span>
            <p className="eyebrow">The heart of it all</p>
            <h2 id="family-heading" className="section-heading">Family and life today</h2>
            <p>
              Today, I am blessed with a loving husband, Hilton.
            </p>
            <p>Hilton has the following credentials:</p>
            <ul className="founder-credentials">
              <li>MBA IT management</li>
              <li>MPS Computer Networking</li>
              <li>BS Industrial Technology (IT/ Network Management)</li>
            </ul>
            <p>
              Together, we are proud parents of two wonderful children who fear
              God, value education, and treat others with fairness and respect.
            </p>
          </section>
        </div>

        <aside className="founder-sidebar" aria-label="Our founder's mission" data-reveal>
          <figure className="founder-portrait"><img src={assetUrl("images/founder.webp")} width="493" height="532" alt="The founder of Graceful Aging Care wearing an orange blazer" fetchPriority="high" /><figcaption><span>Our founder</span><strong>The heart behind Graceful Aging Care</strong></figcaption></figure>
          <div className="founder-quote">
            <p className="eyebrow">Our guiding belief</p>
            <blockquote>
              “I could build a compassionate alternative — one that enables
              individuals to stay in the place they treasure most: their home.”
            </blockquote>
            <p>Our founder, Graceful Aging Care</p>
          </div>
          <section className="surface-card founder-mission" aria-labelledby="mission-heading">
            <h2 id="mission-heading">Compassion. Dignity. Respect.</h2>
            <p>
              A ministry founded on compassion, dignity, and respect for life at
              every stage.
            </p>
            <Link className="text-link" to="/about">Explore our approach <span aria-hidden="true">↗</span></Link>
          </section>
        </aside>
      </div>

      <section className="page-cta" aria-labelledby="founder-cta-heading" data-reveal>
        <div>
          <p className="eyebrow">Care begins with connection</p>
          <h2 id="founder-cta-heading" className="section-heading">We'd love to hear your story.</h2>
          <p>Let's talk about the support you or your loved one needs.</p>
        </div>
        <Link className="button button-primary" to="/contact">Start a conversation <span aria-hidden="true">↗</span></Link>
      </section>
    </main>
  );
}

export default FounderPage;
