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
    message: 'Okay Mahak… you officially earned the ‘My Sonu’ badge ❤️ I guess you can call me your Sonu now 😌',
  },
  {
    id: 'almost',
    label: 'Almost. Impress me tonight 😏',
    status: 'Final interview: tonight 😏',
    line: 'Okay, now you’re making this interesting.',
    message: 'You’re almost there 😏 You haven’t fully earned your ‘My Sonu’ badge yet… impress me tonight ❤️',
  },
  {
    id: 'not-yet',
    label: 'Not yet 😂',
    status: 'Application still pending 😂',
    line: 'I clearly need a stronger portfolio.',
    message: 'Not yet 😂❤️ You still have some work to do before I hand over the ‘My Sonu’ badge.',
  },
]

export const TONIGHT_CHOICES = [
  {
    id: 'dinner',
    label: 'Dinner tonight',
    copy: 'Simple food, public place, easy conversation.',
    heading: 'Okay… now I actually have to impress you.',
    response: 'No giant plan. Just somewhere comfortable, good food, and me trying not to smile like an idiot when you show up.',
    message: 'Dinner sounds good ❤️ Let’s figure out where and when 😊',
  },
  {
    id: 'meet',
    label: 'Meet me tonight',
    copy: 'Tea, a walk, dessert — you choose what feels comfortable.',
    heading: 'Finally leaving the chat bubbles.',
    response: 'You choose what feels comfortable — tea, a walk, dessert, anything simple.',
    message: 'Okay, I’m up for meeting you tonight 😌❤️',
  },
  {
    id: 'call',
    label: 'Call tonight',
    copy: 'If timing doesn’t work for meeting, at least let me finally hear you.',
    heading: 'Voice compatibility test unlocked.',
    response: 'You said you don’t like typing anyway 😂',
    message: 'Let’s call tonight ❤️ Maybe you can earn a few more points there 😂',
  },
  {
    id: 'later',
    label: 'Another day is okay too',
    copy: 'No pressure. I meant that.',
    heading: 'No pressure. I meant that.',
    response: 'The invitation stays open whenever you feel comfortable.',
    message: 'Not tonight, but I’d still like to plan something with you another time 😊❤️',
  },
]

export const WHATSAPP_NUMBER = '+13658830338'
export const WHATSAPP_CTA_LABEL = 'Send my answer to Mahak ❤️'

export function getChoice(options, id) {
  return options.find((option) => option.id === id) ?? null
}

export function buildWhatsAppMessage({ badgeId, planId }) {
  const badge = getChoice(BADGE_CHOICES, badgeId)
  const plan = getChoice(TONIGHT_CHOICES, planId)
  return badge?.message ?? plan?.message ?? ''
}

export function buildWhatsAppUrl(selection) {
  const recipient = WHATSAPP_NUMBER.replace(/\D/g, '')
  return `https://wa.me/${recipient}?text=${encodeURIComponent(buildWhatsAppMessage(selection))}`
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
