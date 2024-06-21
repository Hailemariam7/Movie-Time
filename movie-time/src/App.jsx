import { Route, Routes } from "react-router-dom"
import Home from "./Home"
import MovieDetail from "./MovieDetail"
import "./App.css"

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/movie/:id' element={<MovieDetail />}></Route>
      </Routes>
    </>
  )
}

export default App
