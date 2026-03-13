import { tokenManager } from "../utils/tokenManager"

const API_URL = import.meta.env.VITE_API_URL_BASE

export async function apiFetch<T = any>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {

  const token = tokenManager.getToken()

  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      Authorization: token ? `Bearer ${token}` : "",
      ...options.headers
    }
  })

  const data: T = await response.json()

  if (!response.ok) {
    throw new Error("API request failed")
  }

  return data
}