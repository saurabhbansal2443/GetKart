import { useEffect, useState ,useContext } from "react";
import { ThemeData } from "./assets/ThemeContext";
import ProductCard from "./ProductCard";
import Shimmer from "./Shimmer";
import NoProduct from "./NoProduct";
import { Link } from "react-router-dom";

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
    setSearch("");
  };

  if (showData.length == 0) {
    return <Shimmer></Shimmer>;
  }

  let {theme  } = useContext(ThemeData);

  let lightTheme = "min-h-screen w-screen bg-gray-200 p-4";
  let darkTheme = "min-h-screen w-screen bg-gray-500 text-black p-4"

  return (
    <div className={theme=="light"?lightTheme:darkTheme}>
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
            className="input input-bordered input-info w-full max-w-xs bg-white mx-2 text-black"
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
           <Link  key={obj.id} to={`/prodInfo/${obj.id}`}> <ProductCard obj={obj}></ProductCard></Link>
          ) : (
            <NoProduct></NoProduct>
          );
        })}
      </div>
    </div>
  );
};

export default Home;
