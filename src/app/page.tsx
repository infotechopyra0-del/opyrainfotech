import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import Services from '@/components/Services'
import About from '@/components/About'
import Clients from '@/components/Clients'
import WhyChooseUs from '@/components/WhyChooseUs'
import CTA from '@/components/CTA'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <Hero />
      <Services />
      <About />
      <Clients />
      <WhyChooseUs />
      <CTA />
      <Footer />
    </main>
  )
}