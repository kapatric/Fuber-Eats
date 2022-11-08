import React from 'react';
import { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { getProduct } from "../../services/products";
import "./ProductDetail.css";

function ProductDetail() {
  const [product, setProduct] = useState([])
  let { id } = useParams()
  let navigate = useNavigate()

  useEffect(() => {
    const fetchProduct = async () => {
      let oneProduct = await getProduct(id)
      setProduct(oneProduct)
    }
  
    fetchProduct()
  }, [id])

  function addToCart(product){
    console.log(product._id);
   }

  return (
    <div>
    <Link to={`/Products/`}>
      <div className="back">Back to Products</div>
    </Link>
    <div className="product-detail">
      <img className="product-detail-img" src={product.img} alt={product.name} />
      <div className="detail">
          <div className="name"><h1>{product.name}</h1></div>
          <div className="description"><h3>{product.dsc}</h3></div>
          <div className="price"><h3>{product.price}</h3></div>
          <div className="cart"><button>Add to Cart</button></div>
      </div>
      </div>
      </div>
  )
}

export default ProductDetail