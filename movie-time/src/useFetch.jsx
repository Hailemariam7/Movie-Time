import { useEffect, useState } from "react"

function useFetch(url) {
  const [data, setMovies] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function fetchMovies() {
      setLoading(true)
      try {
        const response = await fetch(url)
        const data = await response.json()
        setMovies(data)
        setLoading(false)
      } catch (error) {
        setError(error)
        setLoading(false)
      }
    }

    if (url) {
      fetchMovies()
    }
  }, [url])

  return { data, loading, error }
}

export default useFetch
