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
      <>
        <nav>
          <ul>
            <li>
              <Link to='/'>Home</Link>
            </li>
            <li>
              <Link to='/trending'>Trending</Link>
            </li>
            <li>
              <Link to='/top-rated'>Top Rated</Link>
            </li>
            <li>
              Genres <GenresDropdown />
            </li>
            <li>
              <Link to='/watchlist'>Watchlist</Link>
            </li>
          </ul>
        </nav>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/movie/:id' element={<MovieDetail />} />
          <Route path='/trending' element={<TrendingMovies />} />
          <Route path='/top-rated' element={<TopRated />} />
          <Route path='/genres/:genreId' element={<GenreMovies />} />
          <Route path='/watchlist' element={<Watchlist />} />
        </Routes>
      </>
    </WatchlistProvider>
  )
}

export default App
