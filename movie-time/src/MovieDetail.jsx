import { useParams } from "react-router-dom"
import useFetch from "./useFetch"

const MovieDetail = () => {
  const { id } = useParams()
  const API_KEY = "fe4e1083c94c0926ccbca5cdc54bdeab"
  const movieDetailUrl = `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&append_to_response=credits,videos`

  const {
    data: movie,
    loading: movieLoading,
    error: movieError,
  } = useFetch(movieDetailUrl)

  if (movieLoading) return <p>Loading...</p>
  if (movieError)
    return <p>Error fetching movie details: {movieError.message}</p>
  if (!movie) return null

  const director = movie.credits.crew.find(
    (person) => person.job === "Director"
  )
  const actors = movie.credits.cast.slice(0, 5)
  const trailers = movie.videos.results.filter(
    (video) => video.type === "Trailer"
  )

  return (
    <div className='movie-detail'>
      <h2>{movie.title}</h2>
      <img
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={movie.title}
      />
      <p>{movie.overview}</p>
      <p>
        <strong>Release Date:</strong> {movie.release_date}
      </p>
      <p>
        <strong>Director:</strong> {director ? director.name : "N/A"}
      </p>
      <h3>Top Actors:</h3>
      <ul>
        {actors.map((actor) => (
          <li key={actor.id}>
            {actor.name} as {actor.character}
          </li>
        ))}
      </ul>
      {trailers.length > 0 && (
        <div className='trailers'>
          <h3>Trailers</h3>
          <div className='trailer-list'>
            {trailers.map((video) => (
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
      )}
    </div>
  )
}

export default MovieDetail
