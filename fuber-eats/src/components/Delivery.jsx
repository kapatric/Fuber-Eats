import React from "react"
import { FaMapPin } from 'react-icons/fa';
import {Link } from "react-router-dom";
import Food from './Food.jsx'


export default function Delivery() {

  
  
  return (
   
    <div>
      <p>Get food now!</p>
      <form id="form">
        <p>
         <FaMapPin className="pin"/>
        <input className="delivery" type="text"
            placeholder="Enter delivery address" />
          <button><Link to="/food">Find Food</Link></button>
          
        </p>  
      </form>
      
    </div>
    
  )
}