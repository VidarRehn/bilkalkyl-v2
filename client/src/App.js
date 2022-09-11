import {useState, useEffect} from 'react'

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
      {products && products.map(product => <h1>{product.name}</h1>)}

    </div>
  );
}

export default App;
