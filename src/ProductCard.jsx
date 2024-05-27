import React from 'react'

const ProductCard = ({obj}) => {
   let {brand , category , price , images , rating , title} = obj 
  return (
    <div>
      <div className="card w-80 h-96 bg-white shadow-xl mx-3 mt-7  ">
  <figure className='w-full h-3/6'><img className='w-full h-full  ' src={images[0]} alt={category} /></figure>
  <div className="card-body bg-primary text-black rounded-xl h-3/6 ">
    <div className="card-tittle  flex   justify-around items-center">
       <h2 className="text-lg font-bold">{brand}</h2> 
      <div className="badge">{category}</div>
      <div className="badge ">{rating}</div>
     
    </div>
    <p>{title}</p>
    <div className="card-actions justify-end">
     <p className="text-3xl"> $ {price}</p>
     <button className='btn'> Add </button>
    </div>
  </div>
</div>
    </div>
  )
}

export default ProductCard
