import { useContext, useState } from "react";

import { Link } from "react-router-dom";
import { UserAuth } from "./context/AuthContext";
//import Signin from "./components/Signin";
//import Signin from "./components/Signin";
import Signin from "./components/Signin";




function App() {
  const { user } = UserAuth();

  // console.log(user);

  return (
    <>
      <Signin />
    </>
  );
}

export default App;