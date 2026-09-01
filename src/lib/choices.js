export const STORAGE_KEYS = {
  badge: 'hey-sonu:badge',
  plan: 'hey-sonu:tonight',
  catchCount: 'hey-sonu:catch-count',
}

export const BADGE_CHOICES = [
  {
    id: 'yes',
    label: 'Yes… you earned it ❤️',
    status: 'Officially approved by Sonu ❤️',
    line: 'You have no idea how proudly I’m wearing this.',
  },
  {
    id: 'almost',
    label: 'Almost. Impress me tonight 😏',
    status: 'Final interview: tonight 😏',
    line: 'Okay, now you’re making this interesting.',
  },
  {
    id: 'not-yet',
    label: 'Not yet 😂',
    status: 'Application still pending 😂',
    line: 'I clearly need a stronger portfolio.',
  },
]

export const TONIGHT_CHOICES = [
  {
    id: 'dinner',
    label: 'Dinner tonight',
    copy: 'Simple food, public place, easy conversation.',
    heading: 'Okay… now I actually have to impress you.',
    response: 'No giant plan. Just somewhere comfortable, good food, and me trying not to smile like an idiot when you show up.',
    cta: 'Plan tonight on WhatsApp',
    message: 'Okay Mahak 😌 dinner tonight sounds nice. Tell me what you’re thinking ❤️',
  },
  {
    id: 'meet',
    label: 'Meet me tonight',
    copy: 'Tea, a walk, dessert — you choose what feels comfortable.',
    heading: 'Finally leaving the chat bubbles.',
    response: 'You choose what feels comfortable — tea, a walk, dessert, anything simple.',
    cta: 'Plan our meet',
    message: 'Okay Mahak 👀 I’m up for meeting tonight. Tell me the plan ❤️',
  },
  {
    id: 'call',
    label: 'Call tonight',
    copy: 'If timing doesn’t work for meeting, at least let me finally hear you.',
    heading: 'Voice compatibility test unlocked.',
    response: 'You said you don’t like typing anyway 😂',
    cta: 'Set up our call',
    message: 'Okay Mahak 😌 call me tonight. Tell me when you’re free 📞',
  },
  {
    id: 'later',
    label: 'Another day is okay too',
    copy: 'No pressure. I meant that.',
    heading: 'No pressure. I meant that.',
    response: 'The invitation stays open whenever you feel comfortable.',
    cta: 'Keep the invite open',
    message: 'Not tonight 😌 but keep the invite open for me 🤍',
  },
]

export const WHATSAPP_NUMBER = '13658830338'

export function getChoice(options, id) {
  return options.find((option) => option.id === id) ?? null
}

export function buildWhatsAppMessage({ planId }) {
  const plan = getChoice(TONIGHT_CHOICES, planId)
  return plan?.message ?? ''
}

export function buildWhatsAppUrl(selection) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(buildWhatsAppMessage(selection))}`
}

export function readStoredValue(storage, key, fallback) {
  if (!storage) return fallback

  try {
    const value = storage.getItem(key)
    return value === null ? fallback : JSON.parse(value)
  } catch {
    return fallback
  }
}

export function writeStoredValue(storage, key, value) {
  if (!storage) return

  try {
    storage.setItem(key, JSON.stringify(value))
  } catch {
    // Browser privacy settings can block storage. The interaction still works in memory.
  }
}
