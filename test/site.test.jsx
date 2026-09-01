import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { afterEach, describe, expect, it } from 'vitest'
import { cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react'
import App from '../src/App'
import {
  BADGE_CHOICES,
  buildWhatsAppMessage,
  buildWhatsAppUrl,
  readStoredValue,
  STORAGE_KEYS,
  TONIGHT_CHOICES,
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
  it('builds the exact reviewable copy for every tonight plan', () => {
    for (const plan of TONIGHT_CHOICES) {
      const message = buildWhatsAppMessage({ planId: plan.id })
      const url = buildWhatsAppUrl({ planId: plan.id })

      expect(message).toBe(plan.message)
      expect(url).toBe(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(plan.message)}`)
    }
  })

  it('opens an external draft and never implies automatic sending', () => {
    render(<App storageOverride={createMemoryStorage()} />)
    fireEvent.click(screen.getByRole('button', { name: BADGE_CHOICES[2].label }))
    fireEvent.click(screen.getByRole('button', { name: /call tonight/i }))
    const link = screen.getByRole('link', { name: /open your tonight answer as a whatsapp draft/i })

    expect(link).toHaveAttribute('target', '_blank')
    expect(link.getAttribute('href')).toBe(buildWhatsAppUrl({ planId: 'call' }))
    expect(screen.getByText(/nothing sends automatically/i)).toBeVisible()
  })
})

describe('render resilience, privacy and motion accessibility', () => {
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
    expect(html).toContain('/apple-touch-icon.png')
  })
})
