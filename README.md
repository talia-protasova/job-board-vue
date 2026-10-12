# DevJobs

Responsive and accessible job board built with Vue 3, TypeScript and SCSS, with URL-synced filters, persistent theme preferences, automated tests and GitHub Pages deployment.

[Live demo](https://talia-protasova.github.io/job-board-vue/) · [Repository](https://github.com/talia-protasova/job-board-vue)


---

## Overview

DevJobs is a frontend portfolio project based on the Frontend Mentor DevJobs challenge.

The goal was to build it as a small production-style application rather than a static design recreation, with a strong focus on semantic HTML, accessibility, responsive behaviour, maintainable architecture and testing.

Users can browse jobs, filter them by title/company, location and contract type, open job details, switch themes and share or restore filtered views through the URL.

---

## Key features

- Responsive desktop and mobile layouts
- Search by job title or company
- Location and full-time filters
- URL-synchronised filter state
- Browser Back/Forward support
- Job details routes and missing-job state
- Load more functionality
- Light and dark themes
- Theme persistence and system preference support
- Accessible mobile filters modal
- Keyboard-friendly interactions
- Reduced-motion support
- Dynamic document titles
- GitHub Pages SPA routing support

---

## Tech stack

**Frontend**

- Vue 3
- TypeScript
- Composition API
- Vue Router
- Vite

**Styling**

- SCSS
- CSS custom properties
- BEM
- CSS cascade layers
- Design tokens
- Logical properties
- SVG sprite assets

**Testing & quality**

- Vitest
- Vue Test Utils
- Playwright
- ESLint
- Stylelint
- Prettier

**Delivery**

- pnpm
- GitHub Actions
- GitHub Pages

---

## Architecture

The project follows a lightweight Feature-Sliced Design-inspired structure:

```text
src/
├── app/
├── entities/
├── features/
├── pages/
├── shared/
└── widgets/
```

Dependency direction:

```text
app
↓
pages
↓
widgets
↓
features
↓
entities
↓
shared
```

The architecture is intentionally lightweight: enough separation to keep responsibilities clear without over-engineering a relatively small application.

### URL as durable state

Job filters are stored in the router query:

```text
/?search=frontend&location=United+Kingdom&fullTime=true
```

This makes filtered views:

- shareable
- refresh-safe
- restorable after navigation
- compatible with browser Back and Forward

Transient UI state, such as whether the mobile filters modal is open, stays local to components.


---

## Accessibility

Accessibility was treated as part of the implementation rather than a final audit step.

The project includes:

- semantic landmarks and heading structure
- properly associated form labels
- native buttons, links and checkboxes
- visible keyboard focus states
- accessible dialog semantics
- Escape-to-close and focus restoration
- `aria-live` result feedback
- accessible theme switch
- reduced-motion support
- sufficient colour contrast

### Verified results

| Category | Score |
| --- | ---: |
| Lighthouse Performance | 100 |
| Lighthouse Accessibility | 100 |
| Lighthouse Best Practices | 100 |
| Lighthouse SEO | 100 |
| WAVE | 10 / 10 |

---

## Styling approach

Styles use an ITCSS-inspired structure with CSS cascade layers, BEM naming and reusable design tokens.

The implementation favours:

- low-specificity selectors
- shallow SCSS nesting
- logical properties
- relative units
- CSS custom properties for theming
- reusable spacing, typography, radius and colour values

Example:

```scss
color: var(--color-text-primary);
background-color: var(--color-bg-surface);
padding-inline: var(--space-300);
border-radius: var(--radius-surface);
```

---

## Testing

### Unit and component tests

Vitest and Vue Test Utils cover filtering, query parsing, pagination, modal behaviour, job pages and shared application behaviour.

Current suite:

```text
10 test files
56 tests
```

### End-to-end tests

Playwright runs across Chromium, Firefox and WebKit.

The main scenarios cover:

- job search and filtering
- opening job details
- theme persistence
- mobile filters
- browser history
- missing job routes

```text
5 scenarios × 3 browser engines = 15 Playwright executions
```

Run tests:

```bash
pnpm test:unit:run
pnpm test:e2e
```

---

## CI/CD

GitHub Actions runs the project quality checks before deployment:

```text
quality
  ↓
e2e
  ↓
deploy
```

The pipeline includes formatting checks, ESLint, Stylelint, unit tests, production build and Playwright tests.

Deployment to GitHub Pages happens only after successful checks on `master`.

The production workflow also creates an SPA `404.html` fallback so nested routes such as `/jobs/1` can be opened or refreshed directly on GitHub Pages.

---

## Local development

Requirements:

```text
Node 22.21.1
pnpm 11.13.0
```

Install and run:

```bash
pnpm install
pnpm dev
```

Production build:

```bash
pnpm build
pnpm preview
```

Run the full local quality gate:

```bash
pnpm format:check
pnpm lint
pnpm lint:styles
pnpm test:unit:run
pnpm build
pnpm test:e2e
```


---

## Author

**Natalia Protasova**

Frontend Engineer focused on Vue, Angular, TypeScript, SCSS, accessibility and UI engineering.

[LinkedIn](https://www.linkedin.com/in/talia-protasova) · [Portfolio](https://taliaprotasova.dev)


---

## Credits

Based on the [Frontend Mentor DevJobs challenge]

The Vue implementation, architecture, accessibility work, testing setup and deployment configuration were developed independently as a frontend portfolio project.
