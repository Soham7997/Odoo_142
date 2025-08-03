import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface User {
  data: any
}

interface UserStore {
  user: User | null
  setUser: (user: User) => void
  removeUser: () => void
  logout: () => void
}

export const userStore = create<UserStore>()(
  persist(
    (set) => ({
      user: null,
      setUser: (user) => set({ user }),
      removeUser: () => set({ user: null }),
      logout: () => {
        set({ user: null })
        localStorage.removeItem('user-storage')
        document.cookie.split(';').forEach((cookie) => {
          const eqPos = cookie.indexOf('=')
          const name = eqPos > -1 ? cookie.substring(0, eqPos) : cookie
          document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/`
        })
      },
    }),
    {
      name: 'user-storage',
    }
  )
)