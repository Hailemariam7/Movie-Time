import React, { useState } from "react"
import SearchForm from "./SearchForm"
import MoviesList from "./MoviesList"

function Home() {
  const [searchTerm, setSearchTerm] = useState("")
  return (
    <div>
      <SearchForm searchTerm={setSearchTerm} />
      <MoviesList searchTerm={searchTerm} />
    </div>
  )
}

export default Home
