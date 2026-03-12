import { useState, type ReactNode } from "react"
import { AuthContext,type User } from "./authContext"
import {tokenManager} from "../utils/tokenManager"

type Props = {
  children: ReactNode
}

export function AuthProvider({ children }: Props) {

  const [user, setUser] = useState<User | null>(() => {
    return tokenManager.getUser()
  })

  const login = (userData: User) => {
    setUser(userData)
  }

  const logout = () => {
    tokenManager.clearSession()
    setUser(null)
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        isAuthenticated: !!user
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}