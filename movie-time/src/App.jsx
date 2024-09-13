import React, { useState, useEffect } from "react"
import { Link, Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import MovieDetail from "./pages/MovieDetail"
import TrendingMovies from "./pages/TrendingMovies"
import GenreMovies from "./pages/GenreMovies"
import TopRated from "./pages/TopRated"
import GenresDropdown from "./components/GenresDropdown"
import WatchlistProvider from "./context/WatchlistContext"
import Watchlist from "./pages/Watchlist"
import closeMenu from "/closeMenu.JPG"
import menuIcon from "/menuIcon.JPG"

import "./App.scss"

function App() {
  const [openMenu, setOpenMenu] = useState(false) // Changed to false for default closed state

  const handleResize = () => {
    if (window.innerWidth > 600) {
      setOpenMenu(true)
    } else {
      setOpenMenu(false)
    }
  }

  useEffect(() => {
    window.addEventListener("resize", handleResize)
    handleResize() // Ensure correct state on initial load
    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  const toggleMenu = () => {
    setOpenMenu((prevOpenMenu) => !prevOpenMenu)
  }

  return (
    <WatchlistProvider>
      <div className='app'>
        <div className='logo'>
          <Link to='/' className='logo'>
            <img src='./mobile-app.png' alt='app-icon' />
            <span>Movie-Time</span>
          </Link>
        </div>
        <div className='menu-toggle'>
          <img
            src={openMenu ? menuIcon : closeMenu}
            alt='menu'
            onClick={toggleMenu}
          />
        </div>
        <nav className={`menu-bar ${openMenu ? "open" : ""}`}>
          <ul>
            <li>
              <Link
                to='/'
                className='nav-item'
                onClick={() => setOpenMenu(false)}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to='/trending'
                className='nav-item'
                onClick={() => setOpenMenu(false)}
              >
                Trending
              </Link>
            </li>
            <li>
              <Link
                to='/top-rated'
                className='nav-item'
                onClick={() => setOpenMenu(false)}
              >
                Top Rated
              </Link>
            </li>
            {/*       <li>
              <GenresDropdown setOpenMenu={setOpenMenu} />
            </li> */}
            <li>
              <Link
                to='/watchlist'
                className='nav-item'
                onClick={() => setOpenMenu(false)}
              >
                Watchlist
              </Link>
            </li>
          </ul>
        </nav>
        <div>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/movie/:id' element={<MovieDetail />} />
            <Route path='/trending' element={<TrendingMovies />} />
            <Route path='/top-rated' element={<TopRated />} />
            <Route path='/genres/:genreId' element={<GenreMovies />} />
            <Route path='/watchlist' element={<Watchlist />} />
          </Routes>
        </div>
      </div>
    </WatchlistProvider>
  )
}

export default App
