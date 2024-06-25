import { useState, useEffect } from "react"
import { RenderMovies } from "../logic/RenderMovies"

const TrendingMovies = () => {
  const [page, setPage] = useState(1)
  const [url, setUrl] = useState("")
  const API_KEY = "fe4e1083c94c0926ccbca5cdc54bdeab"
  const handleMoreClick = () => {
    setPage((prevPage) => prevPage + 1)
  }

  useEffect(() => {
    setUrl(
      `https://api.themoviedb.org/3/trending/movie/week?api_key=${API_KEY}&page=${page}`
    )
  }, [page])

  return (
    <div>
      <RenderMovies title='Top Rated' url={url} />
      <button onClick={handleMoreClick} className='more-button'>
        More
      </button>
    </div>
  )
}

export default TrendingMovies
