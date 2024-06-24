import React, { useState } from "react"
import SearchForm from "./SearchForm"
import MoviesList from "./MoviesList"

function Home() {
  const [query, setQuery] = useState("")

  return (
    <div>
      <SearchForm setQuery={setQuery} />

      {/*  {query !== "" && (
        <div>
          <h1>Discover the movie your next movie</h1>
        </div>
      )} */}
      <MoviesList query={query} />
    </div>
  )
}

export default Home
