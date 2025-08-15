import Navigation from '@/components/Navigation'
import Hero from '@/components/Hero'
import About from '@/components/About'
import Services from '@/components/Services'
import Projects from '@/components/Projects'
import Team from '@/components/Team'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <main className="min-h-screen bg-black">
      <Navigation />
      <Hero />
      <About />
      <Services />
      <Projects />
      <Team />
      <Footer />
    </main>
  )
}
