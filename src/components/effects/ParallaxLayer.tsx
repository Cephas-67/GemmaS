"use client";

import { useEffect, useRef, type ReactNode } from 'react'

type ParallaxLayerProps = {
  children: ReactNode
  /** Vitesse relative au défilement : 0.2 = lent, 1 = suit le scroll normalement. */
  speed?: number
  className?: string
}

// Effet de parallaxe, opt-in : enveloppe le contenu à faire flotter.
// Se désactive tout seul si l'utilisateur préfère moins d'animation.
function ParallaxLayer({ children, speed = 0.3, className }: ParallaxLayerProps) {
  const layerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const layer = layerRef.current
    if (!layer) return

    function handleScroll() {
      if (!layer) return
      const offset = window.scrollY * speed
      layer.style.transform = `translate3d(0, ${offset}px, 0)`
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [speed])

  return (
    <div ref={layerRef} className={className} style={{ willChange: 'transform' }}>
      {children}
    </div>
  )
}

export default ParallaxLayer
