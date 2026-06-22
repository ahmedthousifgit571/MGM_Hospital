import { Stats } from './sections/Stats'
import { About } from './sections/About'
import { Specialities } from './sections/Specialities'
import { Reviews } from './sections/Reviews'
import { Doctors } from './sections/Doctors'
import { Stories } from './sections/Stories'
import { Appointment } from './sections/Appointment'
import { Footer } from './sections/Footer'

export function ContentSections() {
  return (
    <main className="relative z-10 bg-white">
      <Stats />
      <Doctors />
      <About />
      <Specialities />
      <Reviews />
      <Stories />
      <Appointment />
      <Footer />
    </main>
  )
}
