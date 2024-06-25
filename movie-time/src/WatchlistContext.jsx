import React, { createContext, useState, useEffect } from "react"

export const WatchlistContext = createContext()

const WatchlistProvider = ({ children }) => {
  const [watchlist, setWatchlist] = useState([])

  useEffect(() => {
    const savedWatchlist = localStorage.getItem("watchlist")
    if (savedWatchlist) {
      setWatchlist(JSON.parse(savedWatchlist))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("watchlist", JSON.stringify(watchlist))
  }, [watchlist])

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
