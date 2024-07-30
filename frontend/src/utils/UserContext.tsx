import { createContext, useContext, useState } from "react"

export const CurrentUserContext = createContext()

export const CurrentUserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null)

  const fetchCurrentUser = async () => {
    let res = await fetch("http://localhost:4000/user")
    setCurrentUser(await res.json())
  }
  fetchCurrentUser()

  return (
    <CurrentUserContext.Provider value={{ currentUser, setCurrentUser }}>
      {children}
    </CurrentUserContext.Provider>
  )
}

export const useCurrentUser = () => useContext(CurrentUserContext)