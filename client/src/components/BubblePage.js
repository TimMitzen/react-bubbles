import React, { useState, useEffect } from "react";
import axios from "axios";

import Bubbles from "./Bubbles";
import ColorList from "./ColorList";
import { authWithAxios } from "../utils/authWithAxios";

const BubblePage = () => {
  const [colorList, setColorList] = useState([]);
  // fetch your colors data from the server when the component mounts
  // set that data to the colorList state property

  useEffect(()=>{
    authWithAxios()
    .get('colors',colorList)
    .then(response=>{
      setColorList(response.data)
    })
    .catch(error=>console.log('ERROR',error))

  },[colorList])

  return (
    <>
      <ColorList colors={colorList} updateColors={setColorList} />
      <Bubbles colors={colorList} />
    </>
  );
};

export default BubblePage;
