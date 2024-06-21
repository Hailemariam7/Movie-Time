import { Link, Route, Routes } from "react-router-dom"
import Home from "./Home"
import MovieDetail from "./MovieDetail"
import TrendingMovies from "./TrendingMovies"
import GenreMovies from "./GenreMovies"
import TopRated from "./TopRated"
import GenresDropdown from "./GenresDropdown"
import "./App.css"

function App() {
  return (
    <>
      <nav>
        <ul>
          <li>
            <Link to='/trending'>Trending</Link>
          </li>
          <li>
            <Link to='/top-rated'>Top Rated</Link>
          </li>
          <li>
            Genres <GenresDropdown />
          </li>
        </ul>
      </nav>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/movie/:id' element={<MovieDetail />}></Route>
        <Route path='/trending' element={<TrendingMovies />}></Route>
        <Route path='/top-rated' element={<TopRated />}></Route>
        <Route path='/genres/:genreId' element={<GenreMovies />}></Route>
      </Routes>
    </>
  )
}

export default App
