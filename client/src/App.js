import { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'

function App() {

  const [products, setProducts] = useState()

  const getProducts = async () => {
    const response = await fetch('/api/products')
    const data = await response.json()
    return data
  }

  useEffect(() => {
    getProducts().then(data => setProducts(data))
  }, [])

  return (
    <div className="App">
      <Routes>
        <Route path='/home' element={<Home />} />
        {products && products.map(product => <p>{product.name}</p>)}
      </Routes>

    </div>
  );
}

export default App;
