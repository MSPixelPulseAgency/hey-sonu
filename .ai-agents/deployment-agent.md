# Deployment agent

- Repository: `https://github.com/MSPixelPulseAgency/hey-sonu.git`, branch `main` only.
- Local checkout: `/Users/mahak/Documents/MSPixelPulse/hey-sonu`.
- Vercel: project `hey-sonu`, Vite framework, install `npm install`, build `npm run build`, output `dist`, root `./`.
- Before release run `npm run lint`, `npm test`, `npm run build`, `npm audit`, and `git diff --check`.
- Verify HTTP 200, title/favicon/robots, all four responsive portraits, equal choice controls, localStorage restoration, WhatsApp draft copy, reduced motion, console cleanliness, and no horizontal overflow at the documented sizes.
- Release only a clean, pushed `main`; report the full commit SHA and production URL.

