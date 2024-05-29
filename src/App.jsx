import NavBar from "./Navbar";

import { Outlet } from "react-router-dom";
import ThemeContext from "./assets/ThemeContext";

const App = () => {
  return (
    <div>
     <ThemeContext>
      <NavBar></NavBar>
      <Outlet></Outlet>
      </ThemeContext>
    </div>
  );
};

export default App;
