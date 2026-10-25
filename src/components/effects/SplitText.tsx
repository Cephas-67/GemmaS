"use client";

import { useEffect, useRef, useState } from 'react'

type SplitTextProps = {
  text: string
  /** Découpe par lettre plutôt que par mot. */
  byLetter?: boolean
  /** Écart entre deux apparitions, en ms. */
  stagger?: number
  className?: string
}

// Titre qui apparaît morceau par morceau, opt-in.
// Le texte complet reste lisible par les lecteurs d'écran (aria-label +
// fragments masqués) : découper un titre en <span> le rend sinon
// incompréhensible à l'oral, c'est le piège classique de cet effet.
function SplitText({ text, byLetter = false, stagger = 40, className }: SplitTextProps) {
  const elementRef = useRef<HTMLSpanElement>(null)
  const [visible, setVisible] = useState(false)
  const parts = byLetter ? Array.from(text) : text.split(' ')

  useEffect(() => {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setVisible(true)
      return
    }

    const element = elementRef.current
    if (!element) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.3 }
    )

    observer.observe(element)
    return () => observer.disconnect()
  }, [])

  return (
    <span ref={elementRef} aria-label={text} className={className}>
      {parts.map((part, index) => (
        <span
          key={`${part}-${index}`}
          aria-hidden="true"
          className={`inline-block transition-all duration-500 ease-out motion-reduce:transition-none ${
            visible ? 'translate-y-0 opacity-100' : 'translate-y-3 opacity-0'
          }`}
          style={{ transitionDelay: `${index * stagger}ms` }}
        >
          {part}
          {byLetter ? '' : ' '}
        </span>
      ))}
    </span>
  )
}

export default SplitText
