import { useState } from 'react'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Cart from "./pages/Cart";

function App() {
  const [cartItems, setCartItems] = useState(0)

  return (
    <div>
    <Router>
      <Routes>
        <Route path='/' element={<HomePage/>}/>
        <Route path='/cart' element={<Cart/>}/>
      </Routes>
    </Router>
  </div>
  )
}

export default App
