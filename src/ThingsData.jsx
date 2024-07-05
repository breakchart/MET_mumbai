import React,{useState,useEffect} from 'react'
import axios from 'axios';

const ThingsData = () => {
    const [thingsdata, setThingsdata] = useState([]);
    const [filterData, setFilteredData] = useState([]);
    const url2='https://api.thingspeak.com/channels/2589884/feeds.json'

  
    const handlegetClick = async () => {
    await axios.get(url2)
    .then(response => {
        const responseData = response.data.feeds;
        const nonNullObjects = responseData.filter(item => 
          Object.values(item).every(value => value !== null)
        );
        setThingsdata(responseData);
        setFilteredData(nonNullObjects);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
    };

    useEffect(()=>{
      const intervalId = setInterval(() => {
          handlegetClick()
        }, 1000) 
        return () => clearInterval(intervalId)
      
    },[])

  return (
    <div>      {filterData && (
        <div className=" p-2 bg-yellow-100 text-yellow-300 rounded-md">
    <table >
          {filterData.slice(-1).reverse().map((data)=>(
          <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 flex flex-col"  key={data.entry_id}>
                 
            <td className="px-6 py-4">{data.field1}</td>
            <td className="px-6 py-4">{data.field2}</td>
            <td className="px-6 py-4"> {data.field3}</td>
            <td className="px-6 py-4" >{data.field4}</td>
            <td className="px-6 py-4" >{data.field5}</td>
            <td className="px-6 py-4">{data.field6}</td>
            </tr>
          ))}
      </table>
        </div>
      )}</div>
  )
}

export default ThingsData