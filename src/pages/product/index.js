import React, {useState, useEffect} from 'react';

import api from '../../services/api'

import './styles.css';

export default function Product(props) {
  const [product, setProduct] = useState({})

  useEffect(() =>{
    async function getProduct(){
      const {id} = props.match.params; 
      const response = await api.get(`/products/${id}`)
      setProduct(response.data)
    }
    getProduct()
  })
  
  return (
    <div className='product-info'>
      <h1>{product.title}</h1>
      <p>{product.description}</p>
      <p>
        URL: <a href={product.url}>{product.url}</a>
      </p>
    </div>
  );
}
