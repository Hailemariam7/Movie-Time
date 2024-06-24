import { useState, useEffect } from "react"
import { RenderMovies } from "./RenderMovies"

const TopRated = () => {
  const [page, setPage] = useState(1)
  const [url, setUrl] = useState("")
  const API_KEY = "fe4e1083c94c0926ccbca5cdc54bdeab"

  const handleMoreClick = () => {
    setPage((prevPage) => prevPage + 1)
  }

  useEffect(() => {
    setUrl(
      `https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}&language=en-US&page=${page}`
    )
  }, [page])

  return (
    <div>
      <RenderMovies title='Top Rated' url={url} />
      <button onClick={handleMoreClick}>More</button>
    </div>
  )
}

export default TopRated
