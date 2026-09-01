# Hey Sonu design system

## Direction

Premium, romantic, confident, and mobile-first. The page should feel personally assembled rather than templated: editorial type, restrained scrapbook layers, delicate line art, and one deep-plum contrast chapter.

## Type

- Display: Fraunces 500–600, close tracking, balanced wrapping.
- Body and UI: DM Sans 400/700.
- Handwritten microcopy only: Caveat 500.
- Keep mobile headings expressive but compact; never let the H1 overwhelm the first viewport.

## Palette

- Warm cream `#FFFAF2`
- Paper `#FFFDF9`
- Blush `#F6C7D8`
- Pale lavender `#D9CFF0`
- Powder blue `#CBD8F4`
- Dusty rose `#A34F70`
- Muted plum `#68436F`
- Deep plum `#4D315F`

Use layered radial gradients, subtle grain, soft borders, and diffused plum shadows. Avoid a uniformly beige page; alternate light chapters with the deep real-talk section.

## Interaction

- Primary flow: read → three badge taps → one verdict → one tonight plan → review WhatsApp draft.
- All tap targets are at least 44px.
- Catch-the-badge movement stays within its card and becomes stationary under reduced motion.
- Fine-pointer hover may lift cards slightly; touch never depends on hover.
- Respect `prefers-reduced-motion` for reveals, steam, waveform, and badge movement.

## Mobile

- Stack choices and content cleanly below 900px.
- At 390px, use a simplified two-photo hero collage with no caption collision.
- Prevent horizontal overflow, support safe-area insets, and avoid oversized section heights.

## Safety

- Use only the four approved Sonu portraits and their responsive WebP sources.
- Keep the safe badge and later-plan routes visible and non-punitive.
- Never auto-send WhatsApp, add analytics, or expose private details.
- Preserve `noindex,nofollow` and `Disallow: /`.
