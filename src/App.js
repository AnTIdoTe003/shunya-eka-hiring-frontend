import React from 'react'
import axios from 'axios'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Home from './components/Home/Home'


axios.defaults.baseURL = 'http://localhost:4000'
axios.defaults.withCredentials = true

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home/>}/>
      </Routes>
    </Router>
  )
}

export default App