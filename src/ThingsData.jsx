import React, { useState, useEffect } from "react";
import axios from "axios";

const ThingsData = () => {
  const [thingsdata, setThingsdata] = useState([]);
  const [filterData, setFilteredData] = useState([]);
  const url2 = "https://api.thingspeak.com/channels/2589884/feeds.json";

  const handlegetClick = async () => {
    await axios
      .get(url2)
      .then((response) => {
        const responseData = response.data.feeds;
        const last2Value = responseData.map((item) => {
          const values = Object.entries(item);
          const removeEntries = values.slice(0, -2);
          return Object.fromEntries(removeEntries);
        });
        const nonNullObjects = last2Value.filter((item) =>
          Object.values(item).every((value) => value !== null)
        );
        setThingsdata(responseData);
        setFilteredData(nonNullObjects);
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

  return (
    <div>
   
      {filterData && (
        <div className="align-middle overflow-x-auto shadow-md sm:rounded-lg ">
          <table className="w-full text-lg text-center rtl:text-right text-gray-700 ">
          <thead className="text-lg  uppercase  bg-green-700 text-gray-100">
            <tr className="  ">
           
                <th>mbf</th>
    <th>maf</th>
    <th>abf</th>
    <th>Aaf</th>
    <th>nbf</th>
    <th>naf</th>
            </tr>
            </thead>
            <tbody>
            {filterData
              .slice(-1)
              .reverse()
              .map((data) => (
                <tr
                  className="  "
                  key={data.entry_id}
                >
                  <td className="px-2 py-2">{data.field1}</td>
                  <td className="px-2 py-2">{data.field2}</td>
                  <td className="px-2 py-2"> {data.field3}</td>
                  <td className="px-2 py-2">{data.field4}</td>
                  <td className="px-2 py-2">{data.field5}</td>
                  <td className="px-2 py-2">{data.field6}</td>
                </tr>
              ))}
              </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ThingsData;
