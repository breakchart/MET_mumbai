import React, { useState, useEffect } from "react";
import axios from "axios";

const FillTab = ({fillTabData}) => {

  const [filterData, setFilteredData] = useState([]);
 
const feildFillTab=filterData?.field7
fillTabData(feildFillTab)
  const url2 = "https://api.thingspeak.com/channels/2593001/fields/7.json?results=1";

  const handlegetClick = async () => {
    await axios
      .get(url2)
      .then((response) => {
        const [responseData] = response.data.feeds;
        
        setFilteredData(responseData);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      handlegetClick();
  
    }, 1000);
    return () => clearInterval(intervalId);
  }, []);


};

export default FillTab;
