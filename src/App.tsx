import Hero from './components/Hero'
import BackgroundElements from './components/BackgroundElements'
import { useEffect } from 'react'
import Lenis from 'lenis'
import About from './components/About'
import Projects from './components/Projects'
import Contact from './components/Contact'
import Navigation from './components/Navigation'
import Footer from './components/Footer'
import { githubData } from './data/githubData'
import { Analytics } from "@vercel/analytics/next"
import CustomCursor from './components/CustomCursor'
import Preloader from './components/Preloader'

function App() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    })

    function raf(time: number) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)

    return () => {
      lenis.destroy()
    }
  }, [])

  return (
    <div className="min-h-screen bg-transparent transition-colors duration-300 relative noise-bg overflow-x-hidden">
      <Preloader />
      <BackgroundElements />
      <CustomCursor />
      <Navigation />
      <Hero />
      <About />
      <Projects githubData={githubData} />
      <Contact />
      <Footer />
      <Analytics />
    </div>
  )
}

export default App
