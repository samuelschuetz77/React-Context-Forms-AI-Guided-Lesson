import { createContext, useContext, useState } from 'react'
import type { ReactNode } from 'react'
import type { Registration } from '../data/courses'

type RegistrationContextValue = {
  registrations: Registration[];
  addRegistration: (details: Omit<Registration, 'id'>) => void;
  removeRegistration: (id: string) => void;
}

const RegistrationContext = createContext<RegistrationContextValue | undefined>(undefined)

export function RegistrationProvider({ children }: { children: ReactNode }) {
  const [registrations, setRegistrations] = useState<Registration[]>([])

  function addRegistration(details: Omit<Registration, 'id'>) {
    const registration = { ...details, id: crypto.randomUUID() }
    setRegistrations(current => [...current, registration])
  }

  function removeRegistration(id: string) {
    setRegistrations(current => current.filter(registration => registration.id !== id))
  }

  return (
    <RegistrationContext.Provider value={{ registrations, addRegistration, removeRegistration }}>
      {children}
    </RegistrationContext.Provider>
  )
}

export function useRegistrations() {
  const context = useContext(RegistrationContext)
  if (context === undefined) {
    throw new Error('useRegistrations must be used inside a RegistrationProvider')
  }
  return context
}
