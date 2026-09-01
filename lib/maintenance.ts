/**
 * Self-contained holding page served while MAINTENANCE_MODE is on.
 *
 * Inlined as a string rather than built as a route because it is returned with
 * a 503 status, which a Next page cannot set. A 503 (plus Retry-After) is the
 * point: a portfolio that answers 200 with "back soon" for days invites Google
 * to index that in place of the real content.
 *
 * Colours mirror the minimal system in globals.css, resolved to hex so the page
 * has no dependency on the app's CSS being built or loaded.
 */
export type MaintenanceIdentity = {
  name: string;
  email: string;
  linkedin: string;
  github: string;
};

const escapeHtml = (value: string): string =>
  value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');

/**
 * Built per request rather than exported as a constant: two sites run from this
 * repo, and each one's holding page must carry its own contact details. A
 * hardcoded page would have advertised the wrong person during an outage.
 */
export function maintenanceHtml(identity: MaintenanceIdentity): string {
  const name = escapeHtml(identity.name);
  const email = escapeHtml(identity.email);
  const linkedin = escapeHtml(identity.linkedin);
  const github = escapeHtml(identity.github);

  const links = [
    email && `<a href="mailto:${email}">${email}</a>`,
    linkedin && `<a href="${linkedin}" rel="noreferrer">LinkedIn</a>`,
    github && `<a href="${github}" rel="noreferrer">GitHub</a>`,
  ]
    .filter(Boolean)
    .join('\n      ');

  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex">
<title>Back soon — ${name}</title>
<style>
  :root { color-scheme: light dark; }
  * { box-sizing: border-box; }
  body {
    margin: 0;
    min-height: 100svh;
    display: flex;
    align-items: center;
    padding: 1.5rem;
    background: #fcfbfa;
    color: #2e2d2b;
    font-family: ui-sans-serif, system-ui, -apple-system, "Segoe UI", sans-serif;
    -webkit-font-smoothing: antialiased;
  }
  main { max-width: 34rem; margin: 0 auto; width: 100%; }
  .eyebrow { font-size: 0.75rem; color: #9c9a96; margin: 0; }
  h1 {
    margin: 0.75rem 0 0;
    font-size: 1.75rem;
    font-weight: 500;
    letter-spacing: -0.025em;
    line-height: 1.2;
  }
  p { margin: 1rem 0 0; line-height: 1.7; color: #6f6d69; }
  hr { margin: 2.5rem 0 0; border: 0; border-top: 1px solid #e6e4e1; }
  a { color: inherit; text-underline-offset: 3px; text-decoration-color: #cfccc8; }
  a:hover { text-decoration-color: currentColor; }
  .links { margin-top: 1.5rem; display: flex; flex-wrap: wrap; gap: 1.25rem; font-size: 0.875rem; }
  @media (prefers-color-scheme: dark) {
    body { background: #1a1918; color: #f2f1ef; }
    .eyebrow { color: #78766f; }
    p { color: #a6a39d; }
    hr { border-top-color: #3a3835; }
    a { text-decoration-color: #57534e; }
  }
</style>
</head>
<body>
  <main>
    <p class="eyebrow">Back soon</p>
    <h1>This site is being rebuilt.</h1>
    <p>
      I'm reworking the design. It'll be back shortly — in the meantime the
      quickest way to reach me is email.
    </p>
    <hr>
    <div class="links">
      ${links}
    </div>
  </main>
</body>
</html>`;
}
