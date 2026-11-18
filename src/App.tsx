import RegistrationForm from './components/RegistrationForm'
import RegistrationDashboard from './components/RegistrationDashboard'
import { RegistrationProvider } from './context/RegistrationContext'

export default function App() {
  return (
    <RegistrationProvider>
    <main className="container">
      <header><span className="eyebrow">React learning lab</span><h1>Course Registration</h1><p>Build a form, validate it, then share registration data across components.</p></header>
      <div className="layout">
        <RegistrationForm />
        <RegistrationDashboard />
      </div>
    </main>
    </RegistrationProvider>
  )
}
