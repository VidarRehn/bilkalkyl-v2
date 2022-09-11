import { useState, useEffect } from 'react'

const List = () => {

  const [products, setProducts] = useState()

  const getProducts = async () => {
    const response = await fetch('https://estherandvidar-shopping.herokuapp.com/api/products')
    const data = await response.json()
    return data
  }

  useEffect(() => {
    getProducts().then(data => setProducts(data))
  }, [])

    return (
        <div>
        {products && products.map(product => <p>{product.name}</p>)}
        </div>
    )
}

export default List