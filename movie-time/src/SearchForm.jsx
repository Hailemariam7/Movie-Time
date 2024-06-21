import { useState } from "react"

function SearchForm({ setQuery }) {
  const [input, setInput] = useState("")

  function handleChange(e) {
    setInput(e.target.value)
    setQuery(e.target.value)
  }
  function handleSubmit(e) {
    e.preventDefault()
    setQuery(input)
  }

  return (
    <div>
      <form action='' onSubmit={handleSubmit}>
        <input type='text' onChange={handleChange} />
        <button type='submit'>Search</button>
      </form>
    </div>
  )
}

export default SearchForm
