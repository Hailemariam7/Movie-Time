import { useState, createContext } from "react"

export const WatchlistContext = createContext()

export function WatchlistProvider({ children }) {
  const [watchlist, setWatchlist] = useState([])
  function toggleWatchlist(id) {
    setWatchlist((prevWatchList) =>
      prevWatchList.includes(id)
        ? prevWatchList.filter((existingId) => existingId !== id)
        : [...prevWatchList, id]
    )
  }

  return (
    <WatchlistContext.Provider value={{ watchlist, toggleWatchlist }}>
      {children}
    </WatchlistContext.Provider>
  )
}
export default WatchlistProvider
