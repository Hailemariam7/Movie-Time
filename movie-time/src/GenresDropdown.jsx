import React, { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"

const GenresDropdown = () => {
  const [genres, setGenres] = useState([])
  const API_KEY = "fe4e1083c94c0926ccbca5cdc54bdeab"
  const navigate = useNavigate()

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}&language=en-US`
        )
        const data = await response.json()
        setGenres(data.genres)
      } catch (error) {
        console.error("Error fetching genres:", error)
      }
    }

    fetchGenres()
  }, [])

  return (
    <select onChange={(e) => navigate(`/genres/${e.target.value}`)}>
      <option value=''>Select Genre</option>
      {genres.map((genre) => (
        <option key={genre.id} value={genre.id}>
          {genre.name}
        </option>
      ))}
    </select>
  )
}

export default GenresDropdown
