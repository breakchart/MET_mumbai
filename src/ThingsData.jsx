import React,{useState,useEffect} from 'react'
import axios from 'axios';

const ThingsData = () => {
    const [thingsdata, setThingsdata] = useState([]);
    const url2='https://api.thingspeak.com/channels/2589884/feeds.json'
    const handlegetClick = async () => {
        try {
          
          const response = await axios.get(url2);
          setThingsdata(response.data.feeds);
        } catch (error) {
          console.error('Error sending data:', error);
        }
      };
      useEffect(()=>{
        const intervalId = setInterval(() => {
            handlegetClick()
          }, 1000) 
          return () => clearInterval(intervalId)
        
      },[])
  return (
    <div>      {thingsdata && (
        <div className="mt-4 p-4 bg-yellow-100 text-yellow-300 rounded-md">
    <table >
          {thingsdata.slice(-5).reverse().map((data)=>(
          <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"  key={data.entry_id}>
                  <td className="px-6 py-4">{data.entry_id}</td>
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