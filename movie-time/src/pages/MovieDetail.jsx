import { useParams } from "react-router-dom"
import useFetch from "../hooks/useFetch"
import "./MovieDetail.scss"

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

  if (movieLoading || providersLoading)
    return <p className='loading'>Loading...</p>
  if (movieError || providersError)
    return (
      <p className='error'>
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
      <div className='movie-info'>
        <div className='movie-card'>
          <img
            className='movie-poster'
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
          />
          <div className='movie-details'>
            <h2 className='movie-title'>{movie.title}</h2>
            <p className='movie-overview'>{movie.overview}</p>
            <p className='release-date'>
              <strong>Release Date:</strong> {movie.release_date}
            </p>
          </div>
        </div>
      </div>
      <div className='movie-credits'>
        <p className='director'>
          <strong>Director:</strong> {director ? director.name : "N/A"}
        </p>
        <h3 className='top-actors-title'>Top Actors:</h3>
        <ul className='actor-list'>
          {actors.map((actor) => (
            <li key={actor.id} className='actor'>
              {actor.name} as {actor.character}
            </li>
          ))}
        </ul>
      </div>
      {trailers.length > 0 && (
        <div className='trailers'>
          <h3 className='trailers-title'>Trailers</h3>
          <div className='trailer-list'>
            {trailers.map((video) => (
              <div key={video.id} className='trailer'>
                <h4 className='trailer-title'>{video.name}</h4>
                <iframe
                  title={video.name}
                  className='trailer-video'
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
          <h3 className='watch-providers-title'>Watch Providers</h3>
          <ul className='provider-list'>
            {providerInfo.map((provider) => (
              <li key={provider.provider_id} className='provider'>
                <img
                  className='provider-logo'
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
