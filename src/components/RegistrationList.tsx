import { useRegistrations } from '../context/RegistrationContext'
import { useState } from 'react'
import { courses } from '../data/courses'
import type { Course } from '../data/courses'

export default function RegistrationList() {
  const { registrations, removeRegistration } = useRegistrations()
  const [selectedCourse, setSelectedCourse] = useState<Course | ''>('')
  const visibleRegistrations = registrations.filter(
    registration => selectedCourse === '' || registration.course === selectedCourse
  )
  return (
    <section className="panel">
      <h2>Registrations</h2>
      <label htmlFor="course-filter">Filter by course</label>
      <select id="course-filter" value={selectedCourse}
        onChange={event => setSelectedCourse(event.target.value as Course | '')}>
        <option value="">All courses</option>
        {courses.map(course => <option key={course} value={course}>{course}</option>)}
      </select>
      {visibleRegistrations.length === 0 ? (
        <p className="muted">{registrations.length === 0 ? 'No registrations yet.' : 'No registrations for this course.'}</p>
      ) : (
        <ul>
          {visibleRegistrations.map(registration => (
            <li key={registration.id}>
              <p><strong>{registration.name}</strong><br />{registration.email}<br />{registration.course}</p>
              <p>Study goal: {registration.studyGoal}</p>
              <button type="button" onClick={() => removeRegistration(registration.id)}
                aria-label={`Remove ${registration.name} from ${registration.course}`}>Remove</button>
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}
