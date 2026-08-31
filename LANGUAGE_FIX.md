# Language switch fix

The PT/EN switch now controls previously hardcoded UI labels and project content.

Updated:
- Hero role/location/accessibility labels
- About profile label
- Experience stack label
- Projects case-study labels and Library Management API content
- Project specification labels
- Skills panel headings
- Footer labels
- Contact form note synchronization when changing language

The visual CSS was intentionally left unchanged.

Validation:
- translations.js passes Node syntax check.
- Full Vite build could not be executed in this environment because the uploaded node_modules contains platform-specific native bindings; reinstall dependencies locally with `npm install` before `npm run build`.
