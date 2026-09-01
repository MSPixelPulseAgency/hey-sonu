import { readFileSync, statSync } from 'node:fs'
import { resolve } from 'node:path'
import { afterEach, describe, expect, it } from 'vitest'
import { cleanup, fireEvent, render, screen, waitFor, within } from '@testing-library/react'
import App from '../src/App'
import {
  BADGE_CHOICES,
  buildWhatsAppMessage,
  buildWhatsAppUrl,
  readStoredValue,
  STORAGE_KEYS,
  TONIGHT_CHOICES,
  WHATSAPP_CTA_LABEL,
  WHATSAPP_NUMBER,
  writeStoredValue,
} from '../src/lib/choices'

afterEach(cleanup)

function createMemoryStorage() {
  const values = new Map()
  return {
    getItem: (key) => values.has(key) ? values.get(key) : null,
    setItem: (key, value) => values.set(key, value),
  }
}

describe('Catch the badge', () => {
  it('collects exactly three pieces of evidence and then settles', () => {
    render(<App storageOverride={createMemoryStorage()} />)

    let badge = screen.getByRole('button', { name: /collect evidence 1 of 3/i })
    fireEvent.click(badge)
    expect(screen.getByText(/remembered the little things/i)).toBeVisible()

    badge = screen.getByRole('button', { name: /collect evidence 2 of 3/i })
    fireEvent.click(badge)
    expect(screen.getByText(/trust, care and understanding/i)).toBeVisible()

    badge = screen.getByRole('button', { name: /collect evidence 3 of 3/i })
    fireEvent.click(badge)

    const settledBadge = screen.getByRole('button', { name: /badge evidence collected/i })
    expect(settledBadge).toBeDisabled()
    expect(screen.getByText(/brave enough to build a website/i)).toBeVisible()
    expect(screen.getByRole('link', { name: /did i earn it/i })).toHaveAttribute('href', '#badge-decision')
  })
})

describe('badge decisions', () => {
  it('keeps two primary answers and one respectful safe answer available', () => {
    render(<App storageOverride={createMemoryStorage()} />)
    const group = screen.getByRole('group', { name: /my sonu badge decision/i })

    for (const option of BADGE_CHOICES) {
      const button = screen.getByRole('button', { name: option.label })
      expect(group).toContainElement(button)
      fireEvent.click(button)
      expect(button).toHaveAttribute('aria-pressed', 'true')
      expect(screen.getAllByRole('status').some((status) => status.textContent.includes(option.status))).toBe(true)
    }
  })
})

describe('tonight decisions', () => {
  it('shows three main plans and one quiet later option after a badge answer', () => {
    render(<App storageOverride={createMemoryStorage()} />)
    expect(screen.queryByRole('heading', { name: /what are we doing tonight/i })).not.toBeInTheDocument()
    fireEvent.click(screen.getByRole('button', { name: BADGE_CHOICES[1].label }))

    const group = screen.getByRole('group', { name: /tonight options/i })
    for (const option of TONIGHT_CHOICES.slice(0, 3)) {
      const button = screen.getByRole('button', { name: new RegExp(option.label, 'i') })
      expect(group).toContainElement(button)
      fireEvent.click(button)
      expect(button).toHaveAttribute('aria-pressed', 'true')
    }

    const later = screen.getByRole('button', { name: /another day is okay too/i })
    expect(later).toBeVisible()
    fireEvent.click(later)
    expect(later).toHaveAttribute('aria-pressed', 'true')
  })
})

describe('local choice persistence', () => {
  it('round-trips badge, tonight plan and catch count values', () => {
    const storage = createMemoryStorage()
    const values = {
      [STORAGE_KEYS.badge]: 'almost',
      [STORAGE_KEYS.plan]: 'dinner',
      [STORAGE_KEYS.catchCount]: 3,
    }

    Object.entries(values).forEach(([key, value]) => writeStoredValue(storage, key, value))
    Object.entries(values).forEach(([key, value]) => expect(readStoredValue(storage, key, null)).toEqual(value))
  })

  it('hydrates prior decisions back into the interface', async () => {
    const storage = createMemoryStorage()
    writeStoredValue(storage, STORAGE_KEYS.badge, 'almost')
    writeStoredValue(storage, STORAGE_KEYS.plan, 'dinner')
    writeStoredValue(storage, STORAGE_KEYS.catchCount, 3)

    render(<App storageOverride={storage} />)

    await waitFor(() => {
      expect(screen.getByRole('button', { name: /almost\. impress me tonight/i })).toHaveAttribute('aria-pressed', 'true')
      expect(screen.getByRole('button', { name: /dinner tonight/i })).toHaveAttribute('aria-pressed', 'true')
      expect(screen.getByRole('button', { name: /badge evidence collected/i })).toBeDisabled()
    })
  })
})

describe('WhatsApp draft', () => {
  it('builds the exact reviewable copy for every badge verdict and tonight plan', () => {
    expect(WHATSAPP_NUMBER).toBe('+13658830338')
    expect(BADGE_CHOICES.map(({ message }) => message)).toEqual([
      'Okay Mahak… you officially earned the ‘My Sonu’ badge ❤️ I guess you can call me your Sonu now 😌',
      'You’re almost there 😏 You haven’t fully earned your ‘My Sonu’ badge yet… impress me tonight ❤️',
      'Not yet 😂❤️ You still have some work to do before I hand over the ‘My Sonu’ badge.',
    ])
    expect(TONIGHT_CHOICES.map(({ message }) => message)).toEqual([
      'Dinner sounds good ❤️ Let’s figure out where and when 😊',
      'Okay, I’m up for meeting you tonight 😌❤️',
      'Let’s call tonight ❤️ Maybe you can earn a few more points there 😂',
      'Not tonight, but I’d still like to plan something with you another time 😊❤️',
    ])

    for (const badge of BADGE_CHOICES) {
      const message = buildWhatsAppMessage({ badgeId: badge.id })
      const url = buildWhatsAppUrl({ badgeId: badge.id })

      expect(message).toBe(badge.message)
      expect(url).toBe(`https://wa.me/13658830338?text=${encodeURIComponent(badge.message)}`)
    }

    for (const plan of TONIGHT_CHOICES) {
      const message = buildWhatsAppMessage({ planId: plan.id })
      const url = buildWhatsAppUrl({ planId: plan.id })

      expect(message).toBe(plan.message)
      expect(url).toBe(`https://wa.me/13658830338?text=${encodeURIComponent(plan.message)}`)
    }
  })

  it('reveals one exact external draft for each badge verdict without auto-opening it', () => {
    const { container } = render(<App storageOverride={createMemoryStorage()} />)

    expect(container.querySelector('.decision-result')).not.toBeInTheDocument()
    for (const badge of BADGE_CHOICES) {
      fireEvent.click(screen.getByRole('button', { name: badge.label }))
      const result = container.querySelector('.decision-result')
      const link = within(result).getByRole('link', { name: new RegExp(badge.label.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')) })

      expect(within(result).getAllByText(WHATSAPP_CTA_LABEL)).toHaveLength(1)
      expect(link).toHaveAttribute('target', '_blank')
      expect(link.getAttribute('href')).toBe(buildWhatsAppUrl({ badgeId: badge.id }))
      expect(within(result).getByText(/nothing sends automatically/i)).toBeVisible()
    }
  })

  it('reveals one exact external draft for each tonight answer without auto-sending', () => {
    const { container } = render(<App storageOverride={createMemoryStorage()} />)
    fireEvent.click(screen.getByRole('button', { name: BADGE_CHOICES[0].label }))

    for (const plan of TONIGHT_CHOICES) {
      fireEvent.click(screen.getByRole('button', { name: new RegExp(plan.label, 'i') }))
      const result = container.querySelector('.plan-result')
      const link = within(result).getByRole('link', { name: new RegExp(plan.label, 'i') })

      expect(within(result).getAllByText(WHATSAPP_CTA_LABEL)).toHaveLength(1)
      expect(link).toHaveAttribute('target', '_blank')
      expect(link.getAttribute('href')).toBe(buildWhatsAppUrl({ planId: plan.id }))
      expect(within(result).getByText(/nothing sends automatically/i)).toBeVisible()
    }
  })
})

describe('render resilience, privacy and motion accessibility', () => {
  it('keeps the Sonu File balanced and removes the dedicated spa section', () => {
    const { container } = render(<App storageOverride={createMemoryStorage()} />)
    expect(container.querySelectorAll('.file-card')).toHaveLength(8)
    expect(screen.getByText('Future Spa Manager')).toBeVisible()
    expect(screen.queryByRole('heading', { name: /future spa manager energy/i })).not.toBeInTheDocument()
  })

  it('renders all four approved responsive portraits exactly once', () => {
    const { container } = render(<App storageOverride={createMemoryStorage()} />)
    const portraits = [...container.querySelectorAll('[data-photo-id] img')]
    expect(portraits).toHaveLength(4)
    portraits.forEach((portrait, index) => {
      expect(portrait).toHaveAttribute('src', expect.stringMatching(new RegExp(`sonu-0${index + 1}\\.webp`)))
      expect(portrait).toHaveAttribute('srcset', expect.stringContaining('-480.webp 480w'))
    })
  })

  it('renders a graceful complete page when portrait files are unavailable', () => {
    render(<App photosEnabled={false} storageOverride={createMemoryStorage()} />)
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(/sonu/i)
    expect(screen.getAllByRole('img', { name: /portrait unavailable/i })).toHaveLength(4)
  })

  it('includes CSS and component-level reduced-motion handling', () => {
    const css = `${readFileSync(resolve(process.cwd(), 'src/styles/base.css'), 'utf8')}\n${readFileSync(resolve(process.cwd(), 'src/styles/components.css'), 'utf8')}`
    const reveal = readFileSync(resolve(process.cwd(), 'src/components/Reveal.jsx'), 'utf8')
    expect(css).toContain('@media (prefers-reduced-motion: reduce)')
    expect(css).toContain('--catch-x: 0px !important')
    expect(reveal).toContain('useReducedMotion')
  })

  it('keeps the personal microsite private from indexing and points metadata at the preferred alias', () => {
    const html = readFileSync(resolve(process.cwd(), 'index.html'), 'utf8')
    expect(html).toContain('content="noindex,nofollow"')
    expect(html).toContain('https://my-sonu.vercel.app/')
    expect(html).toContain('https://my-sonu.vercel.app/og-sonu.jpg')
    expect(html).toContain('property="og:image:width" content="1200"')
    expect(html).toContain('property="og:image:height" content="630"')
    expect(html).toContain('property="og:image:type" content="image/jpeg"')
    expect(html).toContain('name="twitter:image" content="https://my-sonu.vercel.app/og-sonu.jpg"')
    expect(html).toContain('family=Caveat')
    expect(html).toContain('family=Fraunces')
    expect(html).toContain('family=DM+Sans')
    expect(html).toContain('/apple-touch-icon.png')
    expect(statSync(resolve(process.cwd(), 'public/og-sonu.jpg')).size).toBeGreaterThan(50_000)
  })
})
