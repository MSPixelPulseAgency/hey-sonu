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

describe('badge decisions', () => {
  it('shows every badge choice equally and reports each outcome', () => {
    render(<App storageOverride={createMemoryStorage()} />)
    const group = screen.getByRole('group', { name: /my sonu badge decision/i })

    for (const option of BADGE_CHOICES) {
      const button = screen.getByRole('button', { name: option.label })
      expect(group).toContainElement(button)
      expect(button).toHaveClass('choice-button--large')
      fireEvent.click(button)
      expect(button).toHaveAttribute('aria-pressed', 'true')
      expect(screen.getAllByRole('status').some((status) => status.textContent.includes(option.status))).toBe(true)
    }
  })
})

describe('tonight decisions', () => {
  it('reveals all four equal choices after a badge answer and supports every choice', () => {
    render(<App storageOverride={createMemoryStorage()} />)
    fireEvent.click(screen.getByRole('button', { name: BADGE_CHOICES[1].label }))

    const group = screen.getByRole('group', { name: /tonight options/i })
    for (const option of TONIGHT_CHOICES) {
      const button = screen.getByRole('button', { name: new RegExp(option.label, 'i') })
      expect(group).toContainElement(button)
      expect(button).toHaveClass('plan-card')
      fireEvent.click(button)
      expect(button).toHaveAttribute('aria-pressed', 'true')
    }
  })

  it('keeps every important alternative visible and uses no deceptive hiding attributes', () => {
    render(<App storageOverride={createMemoryStorage()} />)
    fireEvent.click(screen.getByRole('button', { name: BADGE_CHOICES[0].label }))

    const controls = TONIGHT_CHOICES.map((option) => screen.getByRole('button', { name: new RegExp(option.label, 'i') }))
    expect(controls).toHaveLength(4)
    controls.forEach((control) => {
      expect(control).toBeVisible()
      expect(control).not.toHaveAttribute('hidden')
      expect(control).not.toHaveAttribute('disabled')
    })
  })
})

describe('local choice persistence', () => {
  it('round-trips badge, tonight, availability and game values', () => {
    const storage = createMemoryStorage()
    const values = {
      [STORAGE_KEYS.badge]: 'almost',
      [STORAGE_KEYS.plan]: 'dinner',
      [STORAGE_KEYS.availability]: 'After work',
      [STORAGE_KEYS.game]: { trust: 'Consistency' },
    }

    Object.entries(values).forEach(([key, value]) => writeStoredValue(storage, key, value))
    Object.entries(values).forEach(([key, value]) => expect(readStoredValue(storage, key, null)).toEqual(value))
  })

  it('hydrates prior decisions back into the interface', async () => {
    const storage = createMemoryStorage()
    writeStoredValue(storage, STORAGE_KEYS.badge, 'almost')
    writeStoredValue(storage, STORAGE_KEYS.plan, 'dinner')
    writeStoredValue(storage, STORAGE_KEYS.availability, 'After dinner')

    render(<App storageOverride={storage} />)

    await waitFor(() => {
      expect(screen.getByRole('button', { name: /almost… keep trying/i })).toHaveAttribute('aria-pressed', 'true')
      expect(screen.getByRole('button', { name: /dinner after work/i })).toHaveAttribute('aria-pressed', 'true')
      expect(screen.getByRole('radio', { name: /after dinner/i })).toBeChecked()
    })
  })
})

describe('WhatsApp draft', () => {
  it('builds correct copy for every badge and tonight choice without auto-sending', () => {
    for (const badge of BADGE_CHOICES) {
      for (const plan of TONIGHT_CHOICES) {
        const selection = { badgeId: badge.id, planId: plan.id, availability: 'Later tonight' }
        const message = buildWhatsAppMessage(selection)
        const url = buildWhatsAppUrl(selection)

        expect(message).toContain(badge.message)
        expect(message).toContain(plan.message)
        expect(message).toContain('later tonight')
        expect(url).toBe(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`)
      }
    }
  })

  it('exposes only a reviewable external draft link in the interface', () => {
    render(<App storageOverride={createMemoryStorage()} />)
    fireEvent.click(screen.getByRole('button', { name: BADGE_CHOICES[2].label }))
    fireEvent.click(screen.getByRole('button', { name: /keep talking for now/i }))
    const link = screen.getByRole('link', { name: /open your answer as a whatsapp draft/i })

    expect(link).toHaveAttribute('target', '_blank')
    expect(link.getAttribute('href')).toMatch(/^https:\/\/wa\.me\//)
    expect(screen.getByText(/nothing sends automatically/i)).toBeVisible()
  })
})

describe('render resilience and motion accessibility', () => {
  it('renders the complete page with all four approved photos', () => {
    render(<App storageOverride={createMemoryStorage()} />)
    const portraits = screen.getAllByRole('img')
    expect(portraits).toHaveLength(4)
    portraits.forEach((portrait) => expect(portrait).toHaveAttribute('src', expect.stringMatching(/sonu-0[1-4]\.webp/)))
  })

  it('renders a graceful complete page when portrait files are unavailable', () => {
    render(<App photosEnabled={false} storageOverride={createMemoryStorage()} />)
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(/sonu/i)
    expect(screen.getAllByRole('img', { name: /portrait unavailable/i })).toHaveLength(4)
  })

  it('includes both CSS and component-level reduced-motion handling', () => {
    const css = readFileSync(resolve(process.cwd(), 'src/styles/responsive.css'), 'utf8')
    const reveal = readFileSync(resolve(process.cwd(), 'src/components/Reveal.jsx'), 'utf8')
    expect(css).toContain('@media (prefers-reduced-motion: reduce)')
    expect(reveal).toContain('useReducedMotion')
  })
})
