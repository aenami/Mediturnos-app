import { createContext } from "react"

export type User = {
  id: number
  nombre: string
}

export type AuthContextType = {
  user: User | null
  login: (user: User) => void
  logout: () => void
  isAuthenticated: boolean
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined)