import { useState } from "react"
import SearchForm from "./SearchForm"
import MoviesList from "./MoviesList"
import "./App.css"

function App() {
  const [searchTerm, setSearchTerm] = useState("")

  return (
    <>
      <SearchForm setSearchTerm={setSearchTerm} />
      <MoviesList searchTerm={searchTerm} />
    </>
  )
}

export default App
