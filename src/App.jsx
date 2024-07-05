import React, { useEffect, useState } from "react";
import axios from "axios";
import ThingsData from "./ThingsData";
import Navbar from "./Navbar";


const App = () => {
  const [buttonsEnabled, setButtonsEnabled] = useState(false);
  const [notification, setNotification] = useState("");
  const [timesName, setTimesName] = useState([
    "Morning Before Food",
    "Morning After Food",
    "Afternoon Before Food",
    "Afternoon After Food",
    "Night Before Food",
    "Night After Food",
  ]);
  const [times, setTimes] = useState([]);

  const handleTimeChange = (index, event) => {
    event.preventDefault();
    const newTimes = [...times];
    newTimes[index] = event.target.value;
    setTimes(newTimes);
  };

 
    const playBeep = () => {
      const audio = new Audio('/beep.mp3'); 
      audio.play();
      alert('Notification')
    };

  const field1 = times[0]!==undefined?times[0]:'00:00'
  const field2 = times[1]!==undefined?times[1]:'00:00'
  const field3 = times[2]!==undefined?times[2]:'00:00'
  const field4 = times[3]!==undefined?times[3]:'00:00'
  const field5 = times[4]!==undefined?times[4]:'00:00'
  const field6 = times[5]!==undefined?times[5]:'00:00'

  const handleSubmit = async (event) => {
    event.preventDefault();

    const url = `https://api.thingspeak.com/update?api_key=ZFKEAFACA0YTHBPT&field1=${field1}&field2=${field2}&field3=${field3}&field4=${field4}&field5=${field5}&field6=${field6}`;
    try {
      const response = await axios.get(url);

      if (response.status === 200) {
        console.log("Data sent successfully:", response.data);
      } else {
        console.error(
          "Failed to send data:",
          response.status,
          response.statusText
        );
      }
    } catch (error) {
      console.error("Error sending data:", error);
    }
  };

  const handleInitialButtonClick = () => {
    setButtonsEnabled(true);
  };

  return (
    <div className="bg-blue-100 min-h-screen">
      <Navbar />
      <div className="p-5 mt-5 flex md:flex-row flex-col gap-5 items-center justify-center ">
        <button
          className="px-4 py-2 mb-4 bg-blue-500 text-white rounded-md"
          onClick={handleInitialButtonClick}
        >
          Fill Tablets
        </button>

        <div
          className={`flex flex-row  space-y-4 ${
            !buttonsEnabled ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          <form
            onSubmit={handleSubmit}
            className={`px-6 mx-2 py-4 bg-green-500  rounded-md `}
          >
            {timesName.map((time, index) => (
              <tr
                key={index}
                className="mb-4 gap-4 flex flex-row justify-between "
              >
                <td>
                  <label
                    className="block text-gray-900 text-lg font-bold mb-2  "
                    htmlFor={`time${index}`}
                  >
                    {time}
                  </label>
                </td>
                <td>
                  <input
                    id={`time${index}`}
                    type="time"
                    value={times[index]}
                    onChange={(event) => handleTimeChange(index, event)}
                    className="border rounded-lg py-1 px-3 text-gray-700 "
                  />
                </td>
              </tr>
            ))}
            <div
              className={`flex justify-center ${!buttonsEnabled ? "hidden" : ""}`}
            >
              <button
                className="  font-bold py-2 px-6  bg-blue-600 rounded-md text-white outline-none focus:ring-4 shadow-lg transform active:scale-x-75 transition-transform  "
                onClick={handleSubmit}
              >
                Submit
              </button>
            </div>
          </form>

          <ThingsData />
        </div>
      </div>
      <div className="flex justify-center">
      <h2>Beep Notification Example</h2>
      <button onClick={playBeep} className=" font-bold py-2 px-6  bg-blue-600 rounded-md text-white outline-none focus:ring-4 shadow-lg transform active:scale-x-75 transition-transform ">Play Beep</button>
    </div>
    </div>
  );
};

export default App;
