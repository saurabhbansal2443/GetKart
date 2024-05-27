import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import Shimmer from "./Shimmer";
import NoProduct from "./NoProduct";

let Home = () => {
  let [allData, setAllData] = useState([]);
  let [showData, setShowData] = useState([]);
  let [search, setSearch] = useState("");

  let getData = async () => {
    let data = await fetch("https://dummyjson.com/products");
    let obj = await data.json();
    setAllData(obj.products);
    setShowData(obj.products);
  };

  useEffect(() => {
    getData();
  }, []);

  let handleTopRating = () => {
    let filteredData = showData.filter((obj) => {
      return obj.rating > 4;
    });
    setShowData(filteredData);
  };

  let handleCategory = (category) => {
    let filteredData = allData.filter((obj) => {
      return obj.category == category;
    });
    setShowData(filteredData);
  };

  let handleSearch = () => {
    let filteredData = allData.filter((obj) => {
      if (obj.brand != undefined) {
        return obj.brand.toLowerCase().includes(search.toLowerCase());
      } else if (search == "") {
        return true;
      } else {
        return false;
      }
    });

    if (filteredData == 0) {
      let obj = {
        id: "no",
      };

      setShowData([obj]);
    } else {
      setShowData(filteredData);
    }
  };

  if (showData.length == 0) {
    return <Shimmer></Shimmer>;
  }

  return (
    <div className="min-h-screen w-screen bg-gray-300 p-4">
      <div className="utility flex justify-around ">
        <button onClick={handleTopRating} className="btn  ">
          {" "}
          Top-rating{" "}
        </button>
        <button onClick={() => handleCategory("furniture")} className="btn ">
          {" "}
          Furnitures{" "}
        </button>
        <div className="searchBar flex justify-between">
          <input
            type="text"
            placeholder="Type here"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
            }}
            className="input input-bordered input-info w-full max-w-xs bg-white mx-2"
          />
          <button
            className="btn btn-outline btn-primary"
            onClick={handleSearch}
          >
            Search
          </button>
        </div>
        <button className="btn " onClick={() => handleCategory("fragrances")}>
          Fragrance{" "}
        </button>
        <button className="btn " onClick={() => handleCategory("groceries")}>
          Grocery{" "}
        </button>
      </div>

      <div className="AllCards flex flex-wrap justify-around">
        {showData.map((obj) => {
          return obj.id != "no" ? (
            <ProductCard key={obj.id} obj={obj}></ProductCard>
          ) : (
            <NoProduct></NoProduct>
          );
        })}
      </div>
    </div>
  );
};

export default Home;
