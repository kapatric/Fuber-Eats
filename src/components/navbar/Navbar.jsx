import React from 'react'
import { FaShoppingCart } from 'react-icons/fa';
import { Link } from "react-router-dom";
import "./navbar.css"

export default function Navbar() {
  return (
    <div className='navbar'>
      <div className='hamburger'>
        <span className="bar"></span>
        <span className="bar"></span>
        <span className="bar"></span>
      </div>
      <div className="logo"><Link className="links" to="/">Fübar Eats</Link></div>
    <button className='login btn'><Link to="/LoginRegister">Login</Link></button>
    <button className="reg btn"><Link to="/LoginRegister">Register</Link></button>
    <Link className="links" to="/ShoppingCart">< FaShoppingCart className='cart' /></Link>
    </div>
  )
}