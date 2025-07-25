import React, { useRef, useEffect } from 'react'
import { Outlet } from 'react-router'
import { Card, CardContent } from '@/components/ui/card'

export function BrandedLayout() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  // Particles animation effect
  useEffect(() => {
    if (!canvasRef.current) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    // Particles configuration
    const particles: Array<{
      x: number
      y: number
      vx: number
      vy: number
      radius: number
      opacity: number
    }> = []

    // Create particles
    for (let i = 0; i < 80; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        radius: Math.random() * 3 + 1,
        opacity: Math.random() * 0.5 + 0.2,
      })
    }

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Update and draw particles
      particles.forEach(particle => {
        particle.x += particle.vx
        particle.y += particle.vy

        // Wrap around edges
        if (particle.x > canvas.width) particle.x = 0
        if (particle.x < 0) particle.x = canvas.width
        if (particle.y > canvas.height) particle.y = 0
        if (particle.y < 0) particle.y = canvas.height

        // Draw particle
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(160, 174, 192, ${particle.opacity})`
        ctx.fill()
      })

      // Draw connections
      particles.forEach((particle, i) => {
        particles.slice(i + 1).forEach(otherParticle => {
          const dx = particle.x - otherParticle.x
          const dy = particle.y - otherParticle.y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < 100) {
            ctx.beginPath()
            ctx.moveTo(particle.x, particle.y)
            ctx.lineTo(otherParticle.x, otherParticle.y)
            ctx.strokeStyle = `rgba(160, 174, 192, ${0.2 * (1 - distance / 100)})`
            ctx.stroke()
          }
        })
      })

      requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener('resize', resizeCanvas)
    }
  }, [])

  return (
    <>
      {/* Canvas Background */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 w-full h-full bg-slate-800"
        style={{ width: '100%', height: '100%' }}
      />

      {/* Layout Content */}
      <div className="relative z-10 flex flex-col items-center justify-center grow bg-center bg-no-repeat min-h-screen p-4">
        {/* Logo Section */}
        <div className="flex items-center mb-8">
          <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-lg mr-4 p-2">
            <svg viewBox="0 0 100 100" className="w-full h-full">
              {/* Custom Logo SVG */}
              <g>
                {/* Top curved section */}
                <path d="M20,15 Q50,5 80,15 L80,25 Q50,15 20,25 Z" fill="#000" />
                <path d="M25,20 Q50,12 75,20 L75,25 Q50,17 25,25 Z" fill="#666" />

                {/* Main body sections */}
                <path d="M10,30 Q50,20 90,30 L85,70 Q50,60 15,70 Z" fill="#000" />
                <path d="M15,35 Q50,27 85,35 L80,65 Q50,57 20,65 Z" fill="#666" />

                {/* Side curves */}
                <path d="M10,45 Q5,50 10,75 L20,70 Q18,55 20,45 Z" fill="#000" />
                <path d="M90,45 Q95,50 90,75 L80,70 Q82,55 80,45 Z" fill="#000" />
                <path d="M12,50 Q10,55 12,70 L18,67 Q17,58 18,50 Z" fill="#666" />
                <path d="M88,50 Q90,55 88,70 L82,67 Q83,58 82,50 Z" fill="#666" />

                {/* Bottom curved section */}
                <path d="M20,75 Q50,85 80,75 L80,85 Q50,95 20,85 Z" fill="#000" />
                <path d="M25,75 Q50,83 75,75 L75,80 Q50,88 25,80 Z" fill="#666" />

                {/* Center diamond */}
                <path d="M45,40 L50,35 L55,40 L50,60 Z" fill="#666" />
                <path d="M35,45 L50,35 L65,45 L50,55 Z" fill="#fff" />
              </g>
            </svg>
          </div>
          <span className="text-white text-xl font-semibold">IOS Panel</span>
        </div>

        {/* Auth Card */}
        <Card className="w-full max-w-[400px] bg-white/95 backdrop-blur-sm border border-white/20 shadow-2xl">
          <CardContent className="p-6">
            <Outlet />
          </CardContent>
        </Card>
      </div>
    </>
  )
}
