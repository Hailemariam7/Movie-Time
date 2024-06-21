import { useState } from "react"

function SearchForm({ setSearchTerm }) {
  const [input, setInput] = useState("")
  function handleChange(e) {
    setInput(e.target.value)
  }
  function handleSubmit(e) {
    e.preventDefault()
    setSearchTerm(input)
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
