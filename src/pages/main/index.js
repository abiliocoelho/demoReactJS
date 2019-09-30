import React, { useState, useEffect } from "react";
import {Link} from 'react-router-dom'

import "./styles.css";
import api from "../../services/api";

export default function Main() {
  const [products, setProducts] = useState([]);
  const [productInfo, setProductInfo] = useState({});
  const [page, setPage] = useState(1);
  
  async function getData(page = 1) {
    const response = await api.get(`/products/?page=${page}`);
    const { docs, ...info } = response.data;
    setProducts(docs);
    setProductInfo(info);
    setPage(page)
  }

  useEffect(() => {
    
    getData();
  }, []);

  function prevPage() {
    if (page === 1) return;
    const pageNumber = page - 1;
    getData(pageNumber)
  }

  function nextPage() {
    if (page === productInfo.pages) return;
    const pageNumber = page + 1;
    getData(pageNumber)
  }

  return (
    <div className="product-list">
      {products.map(product => (
        <article key={product._id}>
          <strong>{product.title}</strong>
          <p>{product.description}</p>
          <Link to={`/products/${product._id}`}>Acessar</Link>
        </article>
      ))}
      <div className="actions">
        <button disabled={page===1} onClick={prevPage}>Anterior</button>
        <button disabled={page===productInfo.pages} onClick={nextPage}>Próxima</button>
      </div>
    </div>
  );
}
