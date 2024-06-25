import { Link, Route, Routes } from "react-router-dom"
import Home from "./Home"
import MovieDetail from "./MovieDetail"
import TrendingMovies from "./TrendingMovies"
import GenreMovies from "./GenreMovies"
import TopRated from "./TopRated"
import GenresDropdown from "./GenresDropdown"
import WatchlistProvider from "./WatchlistContext"

import "./App.css"
import Watchlist from "./Watchlist"

function App() {
  return (
    <WatchlistProvider>
      <div className='app'>
        <div className='hero-icon'>
          <img src='./mobile-app.png' alt='app-icon' />
          <span>FilmMine</span>
        </div>
        <nav className='menu-bar'>
          <ul>
            <li>
              <Link to='/' className='nav-item'>
                Home
              </Link>
            </li>
            <li>
              <Link to='/trending' className='nav-item'>
                Trending
              </Link>
            </li>
            <li>
              <Link to='/top-rated' className='nav-item'>
                Top Rated
              </Link>
            </li>
            <li>
              <GenresDropdown />
            </li>
            <li>
              <Link to='/watchlist' className='nav-item'>
                Watchlist
              </Link>
            </li>
          </ul>
        </nav>
        <div className='home-page'>
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
