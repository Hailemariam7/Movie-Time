import React, { useState } from "react"
import SearchForm from "../components/SearchForm"
import HomePageSlideShow from "../components/HomePageSlideShow"
import MoviesList from "../view/MoviesList"

function Home() {
  const [query, setQuery] = useState("")

  return (
    <div className='home'>
      <SearchForm setQuery={setQuery} />
      {!query && <HomePageSlideShow />}
      {query && <MoviesList query={query} />}
    </div>
  )
}

export default Home
