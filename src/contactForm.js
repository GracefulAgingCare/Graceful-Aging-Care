import { businessContact } from "./businessContact.js";

export const MESSAGE_LIMIT = 2000;

export const contactServices = [
  { value: "personal-care", label: "Personal care" },
  { value: "companionship", label: "Companionship" },
  { value: "home-support", label: "Home support" },
  { value: "specialized-care", label: "Specialized care" },
  { value: "community-engagement", label: "Community engagement" },
  { value: "general", label: "I'm not sure yet / general question" },
];

const emailPattern = /^[^\s@<>,;]+@[^\s@<>,;]+\.[^\s@<>,;]+$/;

export function getContactConfig(env = import.meta.env ?? {}) {
  const email = (env.VITE_CONTACT_EMAIL || businessContact.email).trim();
  const copyEmail = (env.VITE_CONTACT_CC ?? businessContact.secondaryEmail).trim();
  let endpoint = "";
  try {
    const url = new URL((env.VITE_CONTACT_ENDPOINT || "").trim());
    if (url.protocol === "https:" && !url.username && !url.password) endpoint = url.href;
  } catch {
    // An unset or invalid endpoint leaves the email/copy options available.
  }
  const recipient = email.length <= 254 && emailPattern.test(email) ? email : "";
  const cc = recipient && copyEmail.length <= 254 && emailPattern.test(copyEmail) && copyEmail.toLowerCase() !== recipient.toLowerCase() ? copyEmail : "";
  const formAction = recipient && !endpoint && env.VITE_CONTACT_DELIVERY !== "email"
    ? `https://formsubmit.co/${encodeURIComponent(recipient)}`
    : "";
  return { email: recipient, cc, endpoint, formAction };
}

export function validateContact(values) {
  const errors = {};
  if (values.name.trim().length < 2 || values.name.trim().length > 100) errors.name = "Please enter your name (2–100 characters).";
  if (!emailPattern.test(values.email.trim()) || values.email.trim().length > 254) errors.email = "Please enter a valid email address.";
  if (values.phone.trim()) {
    const digits = values.phone.replace(/\D/g, "");
    if (!/^[+\d\s().-]+$/.test(values.phone) || digits.length < 7 || digits.length > 15) errors.phone = "Please enter a phone number with 7–15 digits, or leave it blank.";
  }
  if (!contactServices.some((service) => service.value === values.service)) errors.service = "Please choose a service, or select the general question option.";
  if (values.message.trim().length < 10 || values.message.length > MESSAGE_LIMIT) errors.message = `Please add a little detail (10–${MESSAGE_LIMIT} characters).`;
  return errors;
}

export function createContactPayload(values) {
  return {
    name: values.name.trim(),
    email: values.email.trim(),
    phone: values.phone.trim(),
    service: contactServices.find((service) => service.value === values.service)?.label || "General question",
    message: values.message.trim(),
  };
}

export function createMessageDraft(values) {
  const payload = createContactPayload(values);
  return ["Hello Graceful Aging Care,", "", payload.message, "", `Name: ${payload.name}`, `Email: ${payload.email}`, ...(payload.phone ? [`Phone: ${payload.phone}`] : []), `Interested in: ${payload.service}`].join("\n");
}

export function createMailto(email, values, cc = "") {
  return `mailto:${encodeURIComponent(email)}?${cc ? `cc=${encodeURIComponent(cc)}&` : ""}subject=${encodeURIComponent("Care inquiry — Graceful Aging Care")}&body=${encodeURIComponent(createMessageDraft(values))}`;
}
