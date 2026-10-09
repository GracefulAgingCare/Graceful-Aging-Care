# Graceful Aging Care

A responsive React and Vite website for Graceful Aging Care, a non-medical home care agency in Charlotte, North Carolina.

## Development

```sh
npm install
npm run dev
```

Run `npm run lint` to check the source and `npm run build` to create the production site in `dist`. Run `npm run preview` to inspect the production build locally.

## Contact details and email delivery

The contact page displays **980-337-0060**, **240-417-0561**, and **Gracefulagingllc@gmail.com** as clickable phone/email links. These details live in `src/businessContact.js` and also appear in the organization metadata.

The form defaults to a normal HTTPS POST to **FormSubmit**, addressed to **Gracefulagingllc@gmail.com**. After local validation, visitors complete FormSubmit's verification on its own page. CAPTCHA remains enabled, the visitor's email is included for replies, and inquiries have the subject `New care inquiry | Graceful Aging Care`. The site does not claim delivery before the provider handles the request.

**Required one-time activation:** Open the contact page through the website, submit an inquiry, complete the provider's verification, and open FormSubmit's activation email in **Gracefulagingllc@gmail.com**. Check Spam if necessary and click its activation link. Until the mailbox is activated, FormSubmit holds submissions instead of forwarding them. Verify this flow from the published site's domain before launch. See [FormSubmit setup](https://formsubmit.co/) and [activation help](https://formsubmit.co/help). No live submission or inbox-delivery claim was made by the local browser checks.

No environment variables are required for this default recipient. To customize, copy `.env.example` to `.env.local` and restart Vite; rebuild production after changes:

- `VITE_CONTACT_EMAIL`: overrides the default public recipient. Changing it requires activating the new recipient with FormSubmit.
- `VITE_CONTACT_DELIVERY=formsubmit`: the default verification-and-send flow. Use `email` instead to open an email-app draft; the visitor must press Send in that app.
- `VITE_CONTACT_ENDPOINT`: optional custom HTTPS JSON endpoint, which takes precedence. It must accept cross-origin JSON POST requests and return a successful HTTP status with JSON containing `ok: true` or `success: true` after accepting an inquiry. Errors or timeouts preserve the visitor's message. The payload includes `name`, `email`, `phone`, `service`, and `message`.

The copy-message fallback remains available. Drafts are kept only in component memory, not local or session storage. All `VITE_` variables are public: never put SMTP passwords or private provider keys in them. Service links can preselect an option using `/contact?service=personal-care`, `companionship`, `home-support`, `specialized-care`, `community-engagement`, or `general`.

## Photos and design

All 13 supplied photographs are included as WebP assets in `public/images`. The unmodified PNG originals are preserved in `../Source Photos`. Home features the family and friendship photos, four Values photo cards, and labeled service previews. About includes six service photographs; the Founder page includes the supplied portrait. Below-the-fold images use lazy loading, dimensions, and descriptive alternative text.

## SEO and hosting

`npm run build` creates prerendered HTML for `/`, `/about`, `/founder`, and `/contact`, plus `404.html`. Page text, unique titles, descriptions, social metadata, and organization structured data are present in the generated HTML before JavaScript runs. React hydrates the pages to enable menus, filters, and forms.

Set `VITE_SITE_URL` in `.env.local` to the full public HTTPS website URL, including a repository path when applicable, then rebuild. This adds canonical URLs, absolute social image URLs, and `dist/sitemap.xml`; `dist/robots.txt` points to that sitemap. Canonical page URLs end with a slash to match the generated directory indexes. No domain is invented when the setting is empty. Submit the resulting sitemap through your search-console account. Structured data includes only the existing business and contact information, with no invented reviews or hours.

Deploy the whole `dist` directory. The site uses ordinary browser paths instead of hash routes. A static host that serves directory indexes can serve the generated pages directly; configure it to use `404.html` with HTTP 404 status for unknown paths. Existing hash-route links continue to work. The generated `.nojekyll` file lets GitHub Pages serve the built assets without Jekyll processing.

### GitHub Pages

For a project site, configure matching values before building:

```dotenv
VITE_SITE_URL=https://YOUR-USERNAME.github.io/YOUR-REPOSITORY
VITE_BASE_PATH=/YOUR-REPOSITORY/
```

Replace both placeholders with the actual account and repository names. For a custom domain or an account site such as `https://YOUR-USERNAME.github.io`, use `VITE_BASE_PATH=/`. Vite asset URLs, the browser router, prerendered links, and image paths all use the same base path. Changing either variable requires a fresh build; do not copy a build made for a different base path.

Publish `dist` with GitHub Pages after the build. The generated `about/index.html`, `founder/index.html`, and `contact/index.html` support direct navigation and refresh on those pages. Submit the full project sitemap URL (`https://YOUR-USERNAME.github.io/YOUR-REPOSITORY/sitemap.xml`) for indexing. Search engines read `robots.txt` only at the hostname root, so a project site's `robots.txt` does not control other repositories or the account's root site.

Page-level metadata and the rendered content follow the [Google JavaScript SEO guidance](https://developers.google.com/search/docs/crawling-indexing/javascript/javascript-seo-basics). Search ranking and indexing depend on the live site; they are not guaranteed by these changes.
