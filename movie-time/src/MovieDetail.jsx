import { useParams } from "react-router-dom"
import useFetch from "./customHook/useFetch"

const MovieDetail = () => {
  const { id } = useParams()
  const API_KEY = "fe4e1083c94c0926ccbca5cdc54bdeab"
  const movieDetailUrl = `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&append_to_response=credits,videos`
  const watchProvidersUrl = `https://api.themoviedb.org/3/movie/${id}/watch/providers?api_key=${API_KEY}`

  const {
    data: movie,
    loading: movieLoading,
    error: movieError,
  } = useFetch(movieDetailUrl)

  const {
    data: providers,
    loading: providersLoading,
    error: providersError,
  } = useFetch(watchProvidersUrl)

  if (movieLoading || providersLoading) return <p>Loading...</p>
  if (movieError || providersError)
    return (
      <p>
        Error fetching data: {movieError?.message || providersError?.message}
      </p>
    )
  if (!movie) return null

  const director = movie.credits.crew.find(
    (person) => person.job === "Director"
  )
  const actors = movie.credits.cast.slice(0, 5)
  const trailers = movie.videos.results.filter(
    (video) => video.type === "Trailer"
  )

  const providerInfo = providers.results?.US?.flatrate || []

  return (
    <div className='movie-detail'>
      <div className='movie-info'></div>
      <div className='movie-card'>
        <h2>{movie.title}</h2>
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
        />
        <p>{movie.overview}</p>
        <p>
          <strong>Release Date:</strong> {movie.release_date}
        </p>
      </div>
      <div className='movie-credits'>
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
      </div>
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
      {providerInfo.length > 0 && (
        <div className='watch-providers'>
          <h3>Watch Providers</h3>
          <ul>
            {providerInfo.map((provider) => (
              <li key={provider.provider_id}>
                <img
                  src={`https://image.tmdb.org/t/p/w92${provider.logo_path}`}
                  alt={provider.provider_name}
                />
                {provider.provider_name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

export default MovieDetail
