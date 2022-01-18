import React from "react";

const ProductDetails = ({history,match}) => {
  return ( <div>
    <h1>Product Details - {match.params.id}</h1>
    <button onClick={()=>history.push("/products")} >Save</button>
  </div> );
}

export default ProductDetails;
