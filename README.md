# pslucianogomez95

Personal portfolio of Pedro S. Luciano Gomez. Brutalist cream / Bitcoin-orange / black redesign on top of a custom desktop+windows React app.

## Development

```bash
npm install
cp .env.example .env   # fill in EmailJS credentials
npm run dev
```

## Required environment variables (for the Contact form)

| Variable | Where to find it |
|---|---|
| `VITE_EMAILJS_SERVICE_ID` | EmailJS dashboard → Email Services |
| `VITE_EMAILJS_TEMPLATE_ID` | EmailJS dashboard → Email Templates |
| `VITE_EMAILJS_PUBLIC_KEY` | EmailJS dashboard → Account → API Keys |

Without these the form will render but submission shows a red error notice.

## Design

See `docs/superpowers/specs/2026-05-23-web3-brutalist-redesign-design.md` for the full design spec.

## Build

```bash
npm run build
npm run preview
```

## Stack

React 19, TypeScript (strict), Vite 6, styled-components, react-router 7, EmailJS, @fontsource (Space Grotesk + JetBrains Mono + Inter).
