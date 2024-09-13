import { useState, useEffect } from "react"
import { RenderMovies } from "../logic/RenderMovies"
import "./TopTrending.scss" // Import the SCSS file

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
    <div className='movies-container'>
      <h2 className='section-title'>Top Rated Movies</h2>
      <RenderMovies url={url} />
      <button onClick={handleMoreClick} className='more-button'>
        More
      </button>
    </div>
  )
}

export default TopRated
