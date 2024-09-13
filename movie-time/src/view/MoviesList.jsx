import { useState, useEffect } from "react"
import { RenderMovies } from "../logic/RenderMovies"
import "./MoviesList.scss"

const MoviesList = ({ query }) => {
  const [page, setPage] = useState(1)
  const [url, setUrl] = useState("")
  const [reset, setReset] = useState(false)
  const [currentQuery, setCurrentQuery] = useState(
    query || localStorage.getItem("query") || ""
  )
  const API_KEY = "fe4e1083c94c0926ccbca5cdc54bdeab"

  useEffect(() => {
    if (query) {
      localStorage.setItem("query", query)
      setCurrentQuery(query)
      setPage(1)
      setReset(true)
    }
  }, [query])

  useEffect(() => {
    setUrl(
      `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${currentQuery}&page=${page}`
    )
  }, [page, currentQuery])

  const handleMoreClick = () => {
    setPage((prevPage) => prevPage + 1)
    setReset(false)
  }

  return (
    <div className='movies-list-container'>
      <RenderMovies
        title={`Search result for "${currentQuery}"`}
        url={url}
        reset={reset}
      />
      <button onClick={handleMoreClick} className='more-button'>
        More
      </button>
    </div>
  )
}

export default MoviesList
