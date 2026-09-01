export const STORAGE_KEYS = {
  badge: 'hey-sonu:badge',
  plan: 'hey-sonu:tonight',
  availability: 'hey-sonu:availability',
  game: 'hey-sonu:game',
}

export const BADGE_CHOICES = [
  {
    id: 'yes',
    label: 'Yes, you earned it',
    iconLabel: 'heart',
    status: 'Officially approved by Sonu',
    line: 'Okay… I am definitely smiling now.',
    message: "Okay Mahak 😂❤️ you earned the ‘My Sonu’ badge.",
  },
  {
    id: 'almost',
    label: 'Almost… keep trying',
    iconLabel: 'smile',
    status: 'Still under review',
    line: 'Challenge accepted. I will keep earning it.',
    message: "You’re close 😌 keep earning that ‘My Sonu’ badge.",
  },
  {
    id: 'not-yet',
    label: 'Not yet, mister',
    iconLabel: 'laugh',
    status: 'Application still pending',
    line: 'Fair. I will behave… mostly.',
    message: "Not yet mister 😂 your ‘My Sonu’ application is still pending.",
  },
]

export const TONIGHT_CHOICES = [
  {
    id: 'call',
    label: 'Call tonight',
    copy: 'Nothing formal. Just finally hear each other properly.',
    message: 'Okay Mahak 😌 call me tonight. Tell me when you’re free 📞❤️',
  },
  {
    id: 'video',
    label: 'Quick video call',
    copy: 'Five minutes that will probably become thirty.',
    message: 'Okay 😂 a quick video call tonight sounds cute. Tell me when you’re free 👀',
  },
  {
    id: 'dinner',
    label: 'Dinner after work',
    copy: 'Simple dinner, easy conversation.',
    message: 'If timing works, I’m up for dinner after work 😊 Tell me your plan.',
  },
  {
    id: 'chat',
    label: 'Keep talking for now',
    copy: 'No rush. I am still enjoying this.',
    message: 'Not tonight 😌 but keep talking to me here/WhatsApp 🤍',
  },
]

export const AVAILABILITY_CHOICES = [
  'After work',
  'After dinner',
  'Later tonight',
  'I’ll tell you on WhatsApp',
]

export const WHATSAPP_NUMBER = '13658830338'

export function getChoice(options, id) {
  return options.find((option) => option.id === id) ?? null
}

export function buildWhatsAppMessage({ badgeId, planId, availability }) {
  const badge = getChoice(BADGE_CHOICES, badgeId)
  const plan = getChoice(TONIGHT_CHOICES, planId)
  const parts = [badge?.message, plan?.message]

  if (availability && availability !== 'I’ll tell you on WhatsApp') {
    parts.push(`I’m usually free ${availability.toLowerCase()}.`)
  }

  return parts.filter(Boolean).join('\n\n')
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

