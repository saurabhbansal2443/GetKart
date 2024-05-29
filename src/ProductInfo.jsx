import React, { useEffect ,useState } from "react";
// import obj from "./assets/SingleCard";
import { useParams } from "react-router-dom";

const ProductInfo = () => {
    const [obj , setObj ] = useState(null);

    let {id} = useParams();

    let getData = async () => {
        let data = await fetch(`https://dummyjson.com/products/${id}`);
        let object = await data.json();
        setObj(object)
    }

    useEffect(()=>{
      getData()
    },[])

    if (obj == null){
        return <h1> ....loading </h1>
    }

  let {
    title,
    description,
    category,
    price,
    rating,
    stock,
    tags,
    brand,
    images,
  } = obj;
  return (
    <div className="w-screen h-screen bg-white flex justify-center ">
      <div className=" w-3/4 h-1/2 mt-9 card lg:card-side bg-gray-700 shadow-xl">
        <figure className=" m-5  w-full">
          <img
            src={images[0]}
            alt="Album"
            className="h-full w-full  rounded-xl bg-white"
          />
        </figure>
        <div className="card-body">
          <h2 className="card-title text-3xl">{title}</h2>
          <p className="text-lg"> {brand}</p>
          <p className="text-lg">{description}</p>

          <div className="badge bg-white text-black ">{rating}</div>
          <div className="badge  bg-white text-black">{category}</div>
          {tags.map((ele) => {
              return <div className="badge  bg-white text-black "> {ele}</div>;
            })}

          <div className="badge bg-white text-black ">Stock : {stock}</div>

          <div className="card-actions flex  justify-between">
            <div className="text-3xl ">Price : {price} $</div>
            

            <button className="btn btn-primary">Add</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductInfo;
