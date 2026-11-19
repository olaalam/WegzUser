# Dynamic landing page

React, JavaScript, Vite, Tailwind CSS, and Sonner starter. The landing page
header, navigation, footer, and section content are loaded from the backend;
only the available section renderers are defined in the frontend.

## Getting started

1. Optionally copy `.env.example` to `.env` to override the backend URLs. By
   default, the landing page is requested from
   `https://api-admin1.wegz.org//api/public/landing`, and `VITE_API_BASE_URL` defaults
   to `https://api-admin1.wegz.org/`.
2. Run `npm install`.
3. Run `npm run dev`.

The endpoint must allow browser requests from the frontend origin (CORS).
Loading and request errors are shown in the page and through Sonner. Use the
retry button after fixing a connection or configuration issue.

## API hooks

Axios is configured in `src/lib/api-client.js`; TanStack Query handles request
state, caching, and cancellation. Reusable hooks are available in `src/hooks`:

```jsx
function Users() {
  const users = useGet('/users', ['users'])
  const createUser = usePost('/users')
  const updateUser = useUpdate(
    (input) => `/users/${input.id}`,
    'patch', // use 'put' for a full replacement
  )

  // Call mutate from event handlers:
  // createUser.mutate({ name: 'Wegz' })
  // updateUser.mutate({ id: 1, name: 'Updated name' })
}
```

The hooks return TanStack Query results, so loading/error states and methods
such as `mutate`, `mutateAsync`, and `refetch` are available to components.

## Landing page response

`/api/public/landing` returns page settings and a `sections` object. Every
section's text, links, image paths, visibility, and colors are read from this
response. Set `isVisible` to `false` to hide a section; sections with `null`
values are not rendered. Relative image paths such as `/uploads/logo.png` are
resolved against `VITE_API_BASE_URL`. Additional content sections are rendered
from their response fields without adding hardcoded copy to the frontend.

```json
{
  "theme": "Theme 1",
  "mode": "light",
  "sections": {
    "announcement": {
      "text": "Announcement text from the backend",
      "bgColor": "#ff0000",
      "textColor": "#ffffff",
      "isVisible": true
    },
    "header": {
      "logo": "/uploads/logo.png",
      "brandName": "Brand from the backend",
      "bgColor": "#ffffff",
      "textColor": "#000000",
      "isVisible": true,
      "links": [
        { "label": "Home", "url": "/", "isActive": true, "order": 1 },
        { "label": "About", "url": "/about", "isActive": true, "order": 2 }
      ]
    },
    "hero": {
      "title": "Hero title from the backend",
      "subtitle": "Hero description from the backend",
      "ctaText": "Get started",
      "ctaUrl": "/contact",
      "ctaColor": "#ffffff",
      "image": "/uploads/hero.png",
      "bgColor": "#ffffff",
      "textColor": "#000000",
      "isVisible": true
    },
    "info": null,
    "info2": null,
    "testimonials": null,
    "contact": null,
    "footer": null
  }
}
```

Section names and content are supplied by the API. The frontend gives the
announcement, header, hero, testimonials, and footer their page layouts; other
content sections are rendered from their returned fields.

## Commands

- `npm run dev` — start the development server.
- `npm run build` — create a production build.
- `npm run lint` — run Oxlint.
