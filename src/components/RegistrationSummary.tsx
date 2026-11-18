import { courses } from '../data/courses'
import { useRegistrations } from '../context/RegistrationContext'

export default function RegistrationSummary() {
  const { registrations } = useRegistrations()
  return (
    <section className="panel">
      <h2>Summary</h2>
      <p>Total registrations: {registrations.length}</p>
      <ul>
        {courses.map(course => (
          <li key={course}>{course}: {registrations.filter(registration => registration.course === course).length}</li>
        ))}
      </ul>
    </section>
  )
}
