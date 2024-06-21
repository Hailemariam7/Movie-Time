//import "dotenv/config"
import { useNavigate } from "react-router-dom"
import useFetch from "./useFetch"

const TopRated = ({ query }) => {
  const navigate = useNavigate()
  //const API_KEY = process.env.REACT_APP_API_KEY
  const API_KEY = "fe4e1083c94c0926ccbca5cdc54bdeab"
  const topRatedUrl = `https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}&language=en-US&page=1`

  const { data: movies, loading, error } = useFetch(topRatedUrl)

  function handleMovieClick(id) {
    navigate(`/movie/${id}`)
  }

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error fetching movies: {error.message}</p>
  if (!movies) return null

  return (
    <div className='movies-list'>
      <h2>'Trending Movies'</h2>
      <div className='movies-grid'>
        {movies.results.map((movie) => (
          <div
            key={movie.id}
            className='movie-card'
            onClick={() => handleMovieClick(movie.id)}
          >
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
            />
            <h3>{movie.title}</h3>
            {/* <p>{movie.overview}</p> */}
          </div>
        ))}
      </div>
    </div>
  )
}

export default TopRated
