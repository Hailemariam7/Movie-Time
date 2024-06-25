import React, { useState } from "react"
import SearchForm from "./SearchForm"
import MoviesList from "./MoviesList"

function Home() {
  const [query, setQuery] = useState("")

  return (
    <div className='home'>
      <SearchForm setQuery={setQuery} />

      {query && <MoviesList query={query} />}
    </div>
  )
}

export default Home
