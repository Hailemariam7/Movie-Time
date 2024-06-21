import { useParams } from "react-router-dom"
import useFetch from "./useFetch"

const MovieDetail = () => {
  const { id } = useParams()
  const API_KEY = "fe4e1083c94c0926ccbca5cdc54bdeab"
  const movieDetailUrl = `https://api.themoviedb.org/3/movie/${id}?&append_to_response=videos&api_key=${API_KEY}`

  const {
    data: movie,
    loading: movieLoading,
    error: movieError,
  } = useFetch(movieDetailUrl)

  if (movieLoading) return <p>Loading...</p>
  if (movieError)
    return <p>Error fetching movie details: {movieError.message}</p>

  console.log("movie", movie)
  if (!movie) return null

  return (
    <div className='movie-detail'>
      <h2>{movie.title}</h2>
      <img
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={movie.title}
      />
      <p>{movie.overview}</p>
      <div className='trailers'>
        <h3>Trailers</h3>
        <div className='trailer-list'>
          {movie.videos.results.splice(0, 5).map((video) => (
            <div key={video.id} className='trailer'>
              <h4>{video.name}</h4>
              <iframe
                title={video.name}
                width='560'
                height='315'
                src={`https://www.youtube.com/embed/${video.key}`}
                allowFullScreen
              ></iframe>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default MovieDetail
