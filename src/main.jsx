import React ,{lazy, Suspense}from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AboutUs from "./AboutUs.jsx";
import Cart from "./Cart.jsx";
import Home from "./Home.jsx";
import Error from "./Error.jsx";
import ProductInfo from "./ProductInfo.jsx";
import Shimmer from "./Shimmer.jsx";
import ThemeContext from "./assets/ThemeContext.jsx";

const FoodApp = lazy (() => import('./FoodApp.jsx'));

let appRouter = createBrowserRouter([
  { path: "/", 
  element: <App></App> ,
  children : [
    {
        path: "/",
        element:<Home></Home>
    },
    {
        path:"/about",
        element:<AboutUs></AboutUs>
    },
    {
        path:"/cart",
        element:<Cart></Cart>
    },
    {
      path : "/prodInfo/:id",
      element:<ProductInfo></ProductInfo>
    },{
      path : "/food",
      element: (
        <Suspense fallback={<Shimmer></Shimmer>}>
          <FoodApp></FoodApp>
        </Suspense>
      )
    }
  ],
  errorElement : <Error></Error>
},

  
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  
  <RouterProvider router={appRouter}></RouterProvider>
  
);
