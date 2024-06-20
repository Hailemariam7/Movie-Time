import { useEffect, useState } from "react"

function useFetch(searchTerm) {
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function fetchMovies() {
      const API_KEY = "fe4e1083c94c0926ccbca5cdc54bdeab"
      const url = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${searchTerm}`

      try {
        setLoading(true)
        const response = await fetch(url)
        const data = await response.json()
        setMovies(data.results)
        setLoading(false)
      } catch (error) {
        setError(error)
        setLoading(false)
      }
    }

    if (searchTerm) {
      fetchMovies()
    }
  }, [searchTerm])

  return { movies, loading, error }
}

export default useFetch
