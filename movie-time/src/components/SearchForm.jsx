import { useState } from "react"
import "./SearchForm.scss"

function SearchForm({ setQuery }) {
  const [input, setInput] = useState("")

  function handleChange(e) {
    setInput(e.target.value)
    setQuery(e.target.value)
    localStorage.removeItem("query")
    localStorage.setItem("query", e.target.value)
  }

  function handleSubmit(e) {
    e.preventDefault()
    setQuery(input)
  }

  return (
    <div className='search-bar'>
      <form onSubmit={handleSubmit}>
        <input
          type='text'
          onChange={handleChange}
          placeholder='Search for movies...'
        />
        <button type='submit'>Search</button>
      </form>
    </div>
  )
}

export default SearchForm
