import React, { createContext, useState, useEffect } from "react"

export const WatchlistContext = createContext()

const WatchlistProvider = ({ children }) => {
  const [watchlist, setWatchlist] = useState([])

  localStorage.setItem("watchlist", JSON.stringify(watchlist))

  const toggleWatchlist = (movieId) => {
    setWatchlist((prevWatchlist) => {
      if (prevWatchlist.includes(movieId)) {
        return prevWatchlist.filter((id) => id !== movieId)
      } else {
        return [...prevWatchlist, movieId]
      }
    })
  }

  return (
    <WatchlistContext.Provider value={{ watchlist, toggleWatchlist }}>
      {children}
    </WatchlistContext.Provider>
  )
}

export default WatchlistProvider
