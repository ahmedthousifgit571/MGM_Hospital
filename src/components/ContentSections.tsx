import { Stats } from './sections/Stats'
import { About } from './sections/About'
import { Specialities } from './sections/Specialities'
import { Facilities } from './sections/Facilities'
import { Doctors } from './sections/Doctors'
import { Stories } from './sections/Stories'
import { Appointment } from './sections/Appointment'

/**
 * Normal-flow content that begins AFTER the cinematic flythrough.
 * Each section is standalone with its own entrance reveal — none are tied to
 * the frame scroll. Sits above the cinematic canvas (z-10) on solid black so
 * the canvas is fully covered once it scrolls away.
 */
export function ContentSections() {
  return (
    <main className="relative z-10 bg-black">
      <Stats />
      <About />
      <Specialities />
      <Facilities />
      <Doctors />
      <Stories />
      <Appointment />
    </main>
  )
}
