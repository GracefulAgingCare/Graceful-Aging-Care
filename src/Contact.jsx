import { useEffect, useRef, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { contactServices, createContactPayload, createMailto, createMessageDraft, getContactConfig, MESSAGE_LIMIT, validateContact } from "./contactForm.js";
import { businessContact } from "./businessContact.js";
import Icon from "./Icon.jsx";

const contactConfig = getContactConfig();
const emptyFields = { name: "", email: "", phone: "", service: "", message: "", website: "" };

export default function Contact() {
  const [searchParams] = useSearchParams();
  const [fields, setFields] = useState(() => ({
    ...emptyFields,
    service: contactServices.some((service) => service.value === searchParams.get("service")) ? searchParams.get("service") : "",
  }));
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState(null);
  const [busyAction, setBusyAction] = useState(null);
  const [manualDraft, setManualDraft] = useState("");
  const formRef = useRef(null);
  const draftRef = useRef(null);
  const inFlight = useRef(false);
  const abortRef = useRef(null);
  const usesFormSubmit = Boolean(contactConfig.formAction);
  const canSend = Boolean(contactConfig.endpoint || contactConfig.formAction);
  const canEmail = Boolean(contactConfig.email);
  const isBusy = busyAction !== null;

  useEffect(() => () => {
    abortRef.current?.abort();
    abortRef.current = null;
  }, []);

  useEffect(() => {
    const restoreForm = () => {
      inFlight.current = false;
      setBusyAction(null);
    };
    window.addEventListener("pageshow", restoreForm);
    return () => window.removeEventListener("pageshow", restoreForm);
  }, []);

  useEffect(() => {
    if (manualDraft) {
      draftRef.current?.focus();
      draftRef.current?.select();
    }
  }, [manualDraft]);

  function updateField(event) {
    const { name, value } = event.target;
    setFields((previous) => ({ ...previous, [name]: value }));
    setErrors((previous) => {
      const next = { ...previous };
      delete next[name];
      return next;
    });
    setStatus(null);
    setManualDraft("");
  }

  function validate() {
    const nextErrors = validateContact(fields);
    setErrors(nextErrors);
    const firstError = Object.keys(nextErrors)[0];
    if (firstError) {
      setStatus({ type: "error", message: "Please check the highlighted fields." });
      formRef.current?.elements.namedItem(firstError)?.focus();
      return false;
    }
    if (fields.website) {
      setStatus({ type: "error", message: "We couldn't prepare your inquiry. Please try again." });
      return false;
    }
    return true;
  }

  async function copyDraft() {
    if (inFlight.current || !validate()) return;
    inFlight.current = true;
    setBusyAction("copy");
    const draft = createMessageDraft(fields);
    try {
      if (!navigator.clipboard?.writeText) throw new Error("Clipboard unavailable");
      await navigator.clipboard.writeText(draft);
      setStatus({ type: "success", message: "Your message draft is copied. It has not been sent." });
    } catch {
      setManualDraft(draft);
      setStatus({ type: "info", message: "Automatic copying isn't available. Select and copy your draft below. It has not been sent." });
    } finally {
      inFlight.current = false;
      setBusyAction(null);
    }
  }

  async function handleSubmit(event) {
    event.preventDefault();
    if (inFlight.current || !validate()) return;
    if (usesFormSubmit) {
      // Let the provider handle its CAPTCHA, mailbox activation, and delivery.
      // Never report success before that verification has completed.
      inFlight.current = true;
      setBusyAction("send");
      setStatus({ type: "info", message: "Continue on the next page to complete verification and send your inquiry." });
      try {
        formRef.current.elements.namedItem("_url").value = window.location.origin + window.location.pathname;
        HTMLFormElement.prototype.submit.call(formRef.current);
      } catch {
        inFlight.current = false;
        setBusyAction(null);
        setStatus({ type: "error", message: "We couldn't open the sending page. Please email or call us using the details on this page." });
      }
      return;
    }
    if (!canSend) {
      if (!canEmail) {
        await copyDraft();
        return;
      }
      window.location.href = createMailto(contactConfig.email, fields);
      setStatus({ type: "info", message: "Your email app should open with a draft. Review it and press Send there to contact us. If it doesn't open, copy your message below." });
      return;
    }

    inFlight.current = true;
    setBusyAction("send");
    setStatus({ type: "info", message: "Sending your inquiry…" });
    const controller = new AbortController();
    abortRef.current = controller;
    let timedOut = false;
    const timer = window.setTimeout(() => {
      timedOut = true;
      controller.abort();
    }, 15000);
    try {
      const response = await fetch(contactConfig.endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(createContactPayload(fields)),
        signal: controller.signal,
        credentials: "omit",
        referrerPolicy: "no-referrer",
      });
      const result = await response.json().catch(() => null);
      if (!response.ok || (result?.ok !== true && result?.success !== true)) throw new Error("Inquiry not acknowledged");
      setStatus({ type: "success", message: "Thank you. Your inquiry has been accepted. We look forward to learning how we can help." });
      setFields({ ...emptyFields });
      setManualDraft("");
    } catch {
      if (abortRef.current === controller) {
        setStatus({ type: "error", message: timedOut
          ? "The request took too long, so we couldn't confirm it was received. Your message is still here; you can copy it or try again."
          : "We couldn't confirm your inquiry was received. Your message is still here; you can copy it or try again." });
      }
    } finally {
      window.clearTimeout(timer);
      if (abortRef.current === controller) {
        abortRef.current = null;
        inFlight.current = false;
        setBusyAction(null);
      }
    }
  }

  const fieldProps = (name) => ({
    id: `contact-${name}`, name, value: fields[name], onChange: updateField,
    "aria-invalid": Boolean(errors[name]),
    "aria-describedby": [errors[name] ? `contact-${name}-error` : "", name === "message" ? "contact-message-hint contact-message-count" : ""].filter(Boolean).join(" ") || undefined,
  });
  const fieldError = (name) => errors[name] && <span className="contact-field-error" id={`contact-${name}-error`}>{errors[name]}</span>;

  return (
    <main id="main-content" tabIndex={-1} className="contact-page page-container">
      <header className="contact-intro">
        <p className="eyebrow">LET'S TALK ABOUT CARE</p>
        <h1>A little conversation.<br /><em>A meaningful beginning.</em></h1>
        <p>Finding care starts with being heard. Tell us a little about yourself or someone you love, and the support you're looking for.</p>
      </header>
      <div className="contact-layout">
        <aside className="contact-aside" aria-labelledby="contact-aside-title">
          <div className="contact-location">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true"><path d="M20 10c0 6-8 11-8 11S4 16 4 10a8 8 0 1 1 16 0Z" /><circle cx="12" cy="10" r="2.5" /></svg>
            <span>Based in Charlotte, North Carolina</span>
          </div>
          <h2 id="contact-aside-title">Care is personal.<br />So is our approach.</h2>
          <p>Whether you know exactly what you need or are just exploring, there is a place to begin.</p>
          <dl className="contact-methods">
            <div className="contact-method contact-method-phone">
              <dt><Icon name="phone" size={20} /> Contact numbers</dt>
              <dd>{businessContact.phones.map((phone) => <a key={phone.href} href={phone.href}>{phone.label}</a>)}</dd>
            </div>
            {canEmail && <div className="contact-method contact-method-email">
              <dt><Icon name="mail" size={20} /> Email</dt>
              <dd><a href={`mailto:${encodeURIComponent(contactConfig.email)}`}>{contactConfig.email}</a></dd>
            </div>}
          </dl>
          <ol className="contact-steps">
            <li><span aria-hidden="true">01</span><div><h3>Share what matters</h3><p>Tell us about the support you're considering and the questions on your mind.</p></div></li>
            <li><span aria-hidden="true">02</span><div><h3>Explore care together</h3><p>Talk through personal needs, preferences, and everyday routines.</p></div></li>
            <li><span aria-hidden="true">03</span><div><h3>Find a thoughtful fit</h3><p>Discuss a personalized approach that respects your family and your budget.</p></div></li>
          </ol>
          <div className="contact-aside-note">
            <p>Compassionate, non-medical care. In the place you call home.</p>
            <Link className="text-link" to="/about">Explore our services <span aria-hidden="true">↗</span></Link>
          </div>
        </aside>
        <section className="contact-form-card surface-card" aria-labelledby="contact-form-title">
          <div className="contact-form-heading">
            <p className="eyebrow">YOUR NEXT CHAPTER STARTS HERE</p>
            <h2 id="contact-form-title">How can we help?</h2>
            <p>Fields marked <span aria-hidden="true">*</span><span className="sr-only">with an asterisk</span> are required.</p>
          </div>
          {!canSend && <p className="contact-notice" id="contact-delivery-note">{canEmail ? "This form prepares a draft in your email app. You'll review and send the email there." : "Online inquiries are not available yet. You can prepare and copy your message below; copying does not send it to us."}</p>}
          {usesFormSubmit && <p className="contact-notice" id="contact-delivery-note">Your inquiry goes to <strong>{contactConfig.email}</strong>. Complete the verification on the next page to send it.</p>}
          <form ref={formRef} className="contact-form" action={contactConfig.formAction || undefined} method={usesFormSubmit ? "POST" : undefined} onSubmit={handleSubmit} noValidate aria-describedby={!canSend || usesFormSubmit ? "contact-delivery-note" : undefined}>
            {usesFormSubmit && <>
              <input type="hidden" name="_subject" value="New care inquiry | Graceful Aging Care" />
              <input type="hidden" name="_template" value="table" />
              <input type="hidden" name="_honey" value={fields.website} />
              <input type="hidden" name="_url" defaultValue="" />
            </>}
            <fieldset disabled={isBusy} className="contact-form-fields">
              <legend className="sr-only">Your contact details and care inquiry</legend>
              <div className="contact-form-grid">
                <div className="contact-field">
                  <label htmlFor="contact-name">Your name <span aria-hidden="true">*</span></label>
                  <input {...fieldProps("name")} type="text" autoComplete="name" placeholder="Full name" maxLength={100} required />
                  {fieldError("name")}
                </div>
                <div className="contact-field">
                  <label htmlFor="contact-email">Email address <span aria-hidden="true">*</span></label>
                  <input {...fieldProps("email")} type="email" autoComplete="email" placeholder="you@example.com" maxLength={254} required />
                  {fieldError("email")}
                </div>
                <div className="contact-field">
                  <label htmlFor="contact-phone">Phone number <span className="contact-optional">(optional)</span></label>
                  <input {...fieldProps("phone")} type="tel" autoComplete="tel" placeholder="Your phone number" maxLength={30} />
                  {fieldError("phone")}
                </div>
                <div className="contact-field">
                  <label htmlFor="contact-service">I'm interested in <span aria-hidden="true">*</span></label>
                  <select {...fieldProps("service")} required>
                    <option value="">Choose a service</option>
                    {contactServices.map((service) => <option key={service.value} value={service.value}>{service.label}</option>)}
                  </select>
                  {fieldError("service")}
                </div>
                <div className="contact-field contact-field-full">
                  <label htmlFor="contact-message">How can we support you? <span aria-hidden="true">*</span></label>
                  <textarea {...fieldProps("message")} rows={6} maxLength={MESSAGE_LIMIT} placeholder="Tell us about the kind of support you're looking for…" required />
                  <div className="contact-field-meta">
                    <span className="contact-field-hint" id="contact-message-hint">A brief overview is plenty. Please leave out private medical details.</span>
                    <span className="contact-counter" id="contact-message-count">{fields.message.length}/{MESSAGE_LIMIT}</span>
                  </div>
                  {fieldError("message")}
                </div>
              </div>
              <div hidden aria-hidden="true"><label htmlFor="contact-website">Leave this field empty</label><input id="contact-website" name="website" value={fields.website} onChange={updateField} tabIndex={-1} autoComplete="off" /></div>
            </fieldset>
            <div className="contact-form-actions">
              <button className="button button-primary" type="submit" disabled={isBusy}>{isBusy ? (busyAction === "send" ? "Sending…" : "Preparing…") : canSend ? "Send inquiry" : canEmail ? "Open email draft" : "Copy message draft"}<span aria-hidden="true">↗</span></button>
              {(canSend || canEmail) && <button className="button button-secondary" type="button" onClick={copyDraft} disabled={isBusy}>Copy message</button>}
            </div>
            <div className={`contact-status${status ? ` is-${status.type}` : ""}`} role="status" aria-live="polite" aria-atomic="true">{status?.message}</div>
            {manualDraft && <div className="contact-draft-preview contact-field"><label htmlFor="contact-draft">Your message draft</label><textarea ref={draftRef} id="contact-draft" value={manualDraft} readOnly rows={8} onFocus={(event) => event.target.select()} /></div>}
            <p className="contact-privacy">Share only what you feel comfortable sharing. We don't save your draft in this browser.{usesFormSubmit && <> Inquiries are processed by <a href="https://formsubmit.co/privacy.pdf" target="_blank" rel="noreferrer">FormSubmit</a>.</>}</p>
          </form>
        </section>
      </div>
    </main>
  );
}
