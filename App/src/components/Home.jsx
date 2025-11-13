import React, { useEffect, useRef, useState } from 'react'
import './Home.css'

// Import icons
import EyeIcon from '../icons/eye-care.png'
import MicIcon from '../icons/voice.png'
import HeadIcon from '../icons/face-id.png'

const CARDS = [
  { id: 'eye', title: 'Eye-Gaze', icon: EyeIcon },
  { id: 'voice', title: 'Voice Recognition', icon: MicIcon },
  { id: 'head', title: 'Head Tracking', icon: HeadIcon },
]

const DWELL_TIME = 2000 // 2 seconds in milliseconds

export default function Home({ onSelectModality }) {
  const containerRef = useRef(null)
  const [hoveredCard, setHoveredCard] = useState(null)
  const dwellTimerRef = useRef(null)
  const mouseRef = useRef({ x: -1000, y: -1000 })
  const rafRef = useRef(0)

  useEffect(() => {
    const handleMouseMove = (e) => {
      mouseRef.current = { x: e.clientX, y: e.clientY }
      document.body.style.setProperty('--mouse-x', `${e.clientX}px`)
      document.body.style.setProperty('--mouse-y', `${e.clientY}px`)
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  // Dwell detection for cards
  useEffect(() => {
    const checkHover = () => {
      const { x, y } = mouseRef.current
      const cards = document.querySelectorAll('.modality-card')
      let foundCard = null

      // Check modality cards
      cards.forEach((card, index) => {
        const rect = card.getBoundingClientRect()
        if (
          x >= rect.left &&
          x <= rect.right &&
          y >= rect.top &&
          y <= rect.bottom
        ) {
          foundCard = CARDS[index].id
        }
      })

      if (foundCard !== hoveredCard) {
        setHoveredCard(foundCard)
      }

      rafRef.current = requestAnimationFrame(checkHover)
    }

    rafRef.current = requestAnimationFrame(checkHover)

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [hoveredCard])

  // Handle dwell timer and navigation
  useEffect(() => {
    // Clear existing timer
    if (dwellTimerRef.current) {
      clearTimeout(dwellTimerRef.current)
      dwellTimerRef.current = null
    }

    // Start new timer if hovering over a card
    if (hoveredCard) {
      dwellTimerRef.current = setTimeout(() => {
        // Navigate after dwell time
        if (onSelectModality) {
          onSelectModality(hoveredCard)
        }
      }, DWELL_TIME)
    }

    return () => {
      if (dwellTimerRef.current) {
        clearTimeout(dwellTimerRef.current)
        dwellTimerRef.current = null
      }
    }
  }, [hoveredCard, onSelectModality])

  // Update cursor fill state (fills from bottom like water)
  useEffect(() => {
    if (hoveredCard) {
      document.body.style.setProperty('--dwell-duration', `${DWELL_TIME}ms`)
      requestAnimationFrame(() => {
        document.body.style.setProperty('--cursor-fill', 'inset(0 0 0 0 round 50%)')
      })
    } else {
      document.body.style.setProperty('--dwell-duration', '0s')
      requestAnimationFrame(() => {
        document.body.style.setProperty('--cursor-fill', 'inset(100% 0 0 0 round 50%)')
      })
    }
  }, [hoveredCard])

  return (
    <div className="content-wrapper" ref={containerRef}>
        <div className="main-content">
          <h1 className="title">SELECT YOUR INPUT MODALITY</h1>

          <div className="cards-container">
            {CARDS.map(card => (
              <button
                key={card.id}
                className="modality-card"
                aria-label={card.title}
              >
                <div className="card-header">{card.title}</div>
                <div className="icon-wrapper">
                  <img src={card.icon} alt={`${card.title} icon`} className="icon-image" />
                </div>
              </button>
            ))}
          </div>
        </div>
    </div>
  )
}
