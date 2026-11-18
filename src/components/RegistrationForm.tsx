import { courses, Course } from '../data/courses'
import { useState } from 'react';
import { useRegistrations } from '../context/RegistrationContext';


export default function RegistrationForm() {
  const { addRegistration } = useRegistrations();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [course, setCourse] = useState<Course|''>('');
  const [studyGoal, setStudyGoal] = useState('');
  const [errors, setErrors] = useState<{name?: string; email?: string; course?: string; studyGoal?: string}>({});
  const [success, setSuccess] = useState('');

  const refresh_cooly = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSuccess('');
    const nextErrors: typeof errors = {};
    const trimmedName = name.trim();
    const trimmedEmail = email.trim();
    const trimmedStudyGoal = studyGoal.trim();

    if (trimmedName.length < 2) {
      nextErrors.name = 'Name must have at least two characters.';
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
      nextErrors.email = 'Enter a valid email address, like alex@example.com.';
    }
    if (!course) {
      nextErrors.course = 'Choose a course.';
    }
    if (trimmedStudyGoal.length < 10) {
      nextErrors.studyGoal = 'Describe your study goal in at least 10 characters.';
    }

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0 || !course) return;

    addRegistration({ name: trimmedName, email: trimmedEmail, course, studyGoal: trimmedStudyGoal });
    setSuccess(`Thanks, ${trimmedName}! You are registered for ${course}.`);
    setName('');
    setEmail('');
    setCourse('');
    setStudyGoal('');
  };
  return (
    <section className="panel">
      <h2>Register for a course</h2>
      <p className="muted">Enter your details and choose a course to register.</p>
      <form onSubmit={refresh_cooly} noValidate onChange={() => setSuccess('')}>
        <label htmlFor="student-name">Full name</label>
        <input id="student-name" name="name" value={name} placeholder="Alex Rivera"
         onChange ={event => setName(event.target.value)}
         aria-invalid={Boolean(errors.name)} aria-describedby={errors.name ? 'name-error' : undefined}/>
        {errors.name && <span id="name-error" className="error" role="alert">{errors.name}</span>}
        <label htmlFor="student-email">Email</label>
        <input id="student-email" name="email" type="email" value={email} placeholder="alex@example.com" onChange={event => setEmail(event.target.value)}
          aria-invalid={Boolean(errors.email)} aria-describedby={errors.email ? 'email-error' : undefined}/>
        {errors.email && <span id="email-error" className="error" role="alert">{errors.email}</span>}
        <label htmlFor="student-course">Course</label>
        <select id="student-course" name="course" value={course} onChange = {event => setCourse(event.target.value as Course | '')}
          aria-invalid={Boolean(errors.course)} aria-describedby={errors.course ? 'course-error' : undefined}>
          <option value="" disabled>Choose a course</option>
          {courses.map(course => <option key={course} value={course}>{course}</option>)}
        </select>
        {errors.course && <span id="course-error" className="error" role="alert">{errors.course}</span>}
        <label htmlFor="study-goal">Study goal</label>
        <input id="study-goal" name="studyGoal" value={studyGoal}
          placeholder="Learn to build accessible websites"
          onChange={event => setStudyGoal(event.target.value)}
          aria-invalid={Boolean(errors.studyGoal)} aria-describedby={errors.studyGoal ? 'study-goal-error' : undefined}/>
        {errors.studyGoal && <span id="study-goal-error" className="error" role="alert">{errors.studyGoal}</span>}
        <button type="submit">Register</button>
        {success && <p className="success" role="status">{success}</p>}
      </form>
    </section>
  )
}
