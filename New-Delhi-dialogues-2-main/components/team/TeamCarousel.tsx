'use client'

import { useState, useRef, useEffect } from 'react'
import Image from 'next/image'

const team = [
  {
    name:        'Mr. Prabhat Kumar',
    suffix:      'IAS (Retd.)',
    role:        'Chairperson',
    bio:         [
      'Former Cabinet Secretary, Govt. of India',
      'Former Governor, Government of Jharkhand',
      'President, IC Centre for Governance',
    ],
    photo:       '/team-prabhat.png',
    initials:    'PK',
  },
  {
    name:        'Mr. Balvinder Kumar',
    suffix:      'IAS (Retd.)',
    role:        'Vice-Chairperson',
    bio:         [
      'Former Secretary, Ministry of Mines, Government of India',
      'Chairperson, TESG Center for Health & Wellness Research',
    ],
    photo:       '/team-balvinder.png',
    initials:    'BK',
  },
  {
    name:        'Mr. Aman Bandvi',
    suffix:      '',
    role:        'Co-Founder',
    bio:         [
      'Co-Founder, Bharat Responsible AI Forum',
    ],
    photo:       '/team-aman.png',
    initials:    'AB',
  },
  {
    name:        'Mr. Yash Arya',
    suffix:      '',
    role:        'Strategic Partner',
    bio:         [
      'Founder, IAMKHADI Advisory & Globalspin Forum',
    ],
    photo:       '/team-yash.png',
    initials:    'YA',
  },
  {
    name:        'Ms. Shrishti Nautiyal',
    suffix:      '',
    role:        'Co-Founder',
    bio:         [
      'Founder & CEO, New Delhi Dialogues',
    ],
    photo:       '/team-shrishti.png',
    initials:    'SN',
  },
  {
    name:        'Ms. Yukta Arun Sachdev',
    suffix:      '',
    role:        'Website Architect',
    bio:         [
      'Web Development Lead, New Delhi Dialogues',
    ],
    photo:       '/team-yukta.jpeg',
    initials:    'YS',
  },
]

export default function TeamCarousel() {
  const [active,   setActive]   = useState(0)
  const [dragging, setDragging] = useState(false)
  const startX   = useRef(0)
  const trackRef = useRef<HTMLDivElement>(null)

  const prev = () => setActive((a) => (a - 1 + team.length) % team.length)
  const next = () => setActive((a) => (a + 1) % team.length)

  /* Keyboard navigation */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft')  prev()
      if (e.key === 'ArrowRight') next()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  /* Touch/drag swipe */
  const onPointerDown = (e: React.PointerEvent) => {
    startX.current = e.clientX
    setDragging(true)
  }
  const onPointerUp = (e: React.PointerEvent) => {
    if (!dragging) return
    const diff = e.clientX - startX.current
    if (diff < -50) next()
    if (diff >  50) prev()
    setDragging(false)
  }

  const member = team[active]

  return (
    <div style={{ width: '100%' }}>

      {/* ── MAIN CARD ── */}
      <div
        ref={trackRef}
        onPointerDown={onPointerDown}
        onPointerUp={onPointerUp}
        style={{ userSelect: 'none', cursor: dragging ? 'grabbing' : 'grab' }}
      >
        <div style={{
          display: 'grid',
          gridTemplateColumns: '320px 1fr',
          gap: 0,
          background: 'var(--white)',
          border: '1px solid var(--gray-100)',
          borderTop: '4px solid var(--brand-orange)',
          minHeight: 380,
        }}>

          {/* Photo */}
          <div style={{ position: 'relative', background: 'var(--gray-50)', overflow: 'hidden' }}>
            <Image
              src={member.photo}
              alt={member.name}
              fill
              style={{ objectFit: 'cover', objectPosition: 'top center' }}
              priority
              sizes="320px"
            />
            {/* Role badge */}
            <div style={{
              position: 'absolute', bottom: 0, left: 0, right: 0,
              background: 'linear-gradient(to top, rgba(10,10,10,0.85), transparent)',
              padding: '32px 24px 20px',
            }}>
              <span style={{
                fontSize: '0.6rem', fontWeight: 700, letterSpacing: '0.16em',
                textTransform: 'uppercase', color: 'var(--brand-orange)',
                display: 'block', marginBottom: 4,
              }}>
                {member.role}
              </span>
            </div>
          </div>

          {/* Info */}
          <div style={{
            padding: '44px 48px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            gap: 20,
          }}>
            <div>
              <h3 style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 'clamp(1.4rem, 2.5vw, 1.9rem)',
                fontWeight: 800,
                color: 'var(--black)',
                lineHeight: 1.1,
                marginBottom: 4,
              }}>
                {member.name}
              </h3>
              {member.suffix && (
                <span style={{
                  fontSize: '0.78rem', fontWeight: 600,
                  color: 'var(--brand-orange)', letterSpacing: '0.04em',
                }}>
                  {member.suffix}
                </span>
              )}
            </div>

            <div style={{
              width: 40, height: 2,
              background: 'var(--brand-orange)',
              borderRadius: 1,
            }} />

            <ul style={{ display: 'flex', flexDirection: 'column', gap: 8, listStyle: 'none', padding: 0, margin: 0 }}>
              {member.bio.map((line) => (
                <li key={line} style={{
                  fontSize: '0.9rem',
                  color: 'var(--gray-600)',
                  lineHeight: 1.65,
                  paddingLeft: 16,
                  borderLeft: '2px solid var(--sandstone-mid)',
                }}>
                  {line}
                </li>
              ))}
            </ul>

            {/* Counter */}
            <div style={{
              marginTop: 'auto',
              fontSize: '0.72rem',
              fontWeight: 600,
              color: 'var(--gray-400)',
              letterSpacing: '0.04em',
            }}>
              {String(active + 1).padStart(2, '0')} / {String(team.length).padStart(2, '0')}
            </div>
          </div>
        </div>
      </div>

      {/* ── CONTROLS ── */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 24,
        gap: 16,
      }}>

        {/* Prev / Next buttons */}
        <div style={{ display: 'flex', gap: 8 }}>
          <button
            onClick={prev}
            aria-label="Previous team member"
            style={{
              width: 44, height: 44,
              background: 'var(--white)',
              border: '1px solid var(--gray-200)',
              borderRadius: '50%',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer',
              fontSize: '1rem',
              color: 'var(--black)',
              transition: 'all 0.18s',
            }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'var(--black)'; (e.currentTarget as HTMLElement).style.color = 'white' }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'var(--white)'; (e.currentTarget as HTMLElement).style.color = 'var(--black)' }}
          >
            ←
          </button>
          <button
            onClick={next}
            aria-label="Next team member"
            style={{
              width: 44, height: 44,
              background: 'var(--black)',
              border: '1px solid var(--black)',
              borderRadius: '50%',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer',
              fontSize: '1rem',
              color: 'var(--white)',
              transition: 'all 0.18s',
            }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'var(--brand-orange)'; (e.currentTarget as HTMLElement).style.borderColor = 'var(--brand-orange)' }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'var(--black)'; (e.currentTarget as HTMLElement).style.borderColor = 'var(--black)' }}
          >
            →
          </button>
        </div>

        {/* Dot indicators */}
        <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
          {team.map((m, i) => (
            <button
              key={m.name}
              onClick={() => setActive(i)}
              aria-label={`Go to ${m.name}`}
              style={{
                width: i === active ? 24 : 8,
                height: 8,
                borderRadius: 4,
                background: i === active ? 'var(--brand-orange)' : 'var(--gray-200)',
                border: 'none',
                cursor: 'pointer',
                transition: 'all 0.25s ease',
                padding: 0,
              }}
            />
          ))}
        </div>

        {/* Thumbnail strip */}
        <div style={{ display: 'flex', gap: 8 }}>
          {team.map((m, i) => (
            <button
              key={m.name}
              onClick={() => setActive(i)}
              aria-label={m.name}
              style={{
                width: 40, height: 40,
                borderRadius: '50%',
                overflow: 'hidden',
                border: i === active ? '2px solid var(--brand-orange)' : '2px solid transparent',
                cursor: 'pointer',
                padding: 0,
                background: 'var(--gray-100)',
                position: 'relative',
                transition: 'border-color 0.18s',
                flexShrink: 0,
              }}
            >
              <Image
                src={m.photo}
                alt={m.name}
                fill
                style={{ objectFit: 'cover', objectPosition: 'top center' }}
                sizes="40px"
              />
            </button>
          ))}
        </div>
      </div>

      {/* ── MOBILE: stacked grid ── */}
      <style>{`
        @media (max-width: 768px) {
          .team-carousel-grid { grid-template-columns: 1fr !important; }
          .team-carousel-photo { height: 280px; }
        }
      `}</style>
    </div>
  )
}cd C:\Users\LENOVO\new
New-Item -Path "components\TeamCarousel.tsx" -ItemType File -Force