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

import "./App.css"

function App() {
  const [openMenu, setOpenMenu] = useState(true)

  const handleResize = () => {
    if (window.innerWidth > 600) {
      setOpenMenu(true)
    } else {
      setOpenMenu(false)
    }
  }

  window.addEventListener("resize", handleResize)

  const toggleMenu = () => {
    setOpenMenu(!openMenu)
  }

  return (
    <WatchlistProvider>
      <div>
        <div className='logo'>
          <Link to='/' className='logo'>
            <img src='./mobile-app.png' alt='app-icon' />
            <span>FilmMine</span>
          </Link>
        </div>
        <div className='menu-toggle'>
          <img
            src={openMenu ? "./menuIcon.svg" : "./closeMenu.svg"}
            alt='menu'
            onClick={toggleMenu}
          />
        </div>
        <nav
          className='menu-bar'
          style={{ display: openMenu ? "flex" : "none" }}
        >
          <ul>
            <li>
              <Link to='/' className='nav-item' onClick={handleResize}>
                Home
              </Link>
            </li>
            <li>
              <Link to='/trending' className='nav-item' onClick={handleResize}>
                Trending
              </Link>
            </li>
            <li>
              <Link to='/top-rated' className='nav-item' onClick={handleResize}>
                Top Rated
              </Link>
            </li>
            <li>
              <GenresDropdown setOpenMenu={setOpenMenu} />
            </li>
            <li>
              <Link to='/watchlist' className='nav-item' onClick={handleResize}>
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
