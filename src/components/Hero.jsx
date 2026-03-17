import { useEffect, useRef } from "react"

export default function Hero() {
  const imageRef = useRef(null)

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!imageRef.current) return

      const { innerWidth, innerHeight } = window
      const x = (e.clientX / innerWidth - 0.5) * 30
      const y = (e.clientY / innerHeight - 0.5) * 30

      imageRef.current.style.transform = `
        translate(${x}px, ${y}px) scale(1.05)
      `
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  return (
    <section className="hero section-blur-divider">
    <div className="purple-fog"></div>
      <div className="hero-content">
        <div className="hero-left">
          <span className="badge">ENTREGA SEMIAUTOMÁTICA</span>

          <h1>
            BEM-VINDO À <span>LOJA</span>
          </h1>

          <p className="hero-text">
  Conheça nossos principais <span>VIPs</span> e benefícios exclusivos
  para você dominar as ruas do <span className="glow-title">Florida Roleplay</span>!
</p>

<a 
  href="https://discord.gg/TZYmunkHkc" 
  target="_blank" 
  rel="noreferrer" 
  className="discord-btn"
>
  Entrar no Discord
</a>
        </div>

<img
  ref={imageRef}
  src="/banner1.png" // ✅ MUDE DE "/src/assets/banner1.png" PARA "/banner1.png"
  className="hero-image parallax"
/>
      <div className="particles"></div>
      </div>
    </section>
  )
}


