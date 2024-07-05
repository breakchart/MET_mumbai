import React, { useEffect, useState } from "react";
import axios from "axios";
import ThingsData from "./ThingsData";
import Navbar from "./Navbar";

const App = () => {
  const [buttonsEnabled, setButtonsEnabled] = useState(false);
  const [notification, setNotification] = useState("");
  const [times, setTimes] = useState(Array(6).fill(""));
  

  const handleTimeChange = (index, event) => {
    const newTimes = [...times];
    newTimes[index] = event.target.value;
    setTimes(newTimes);
  };

  const field1 = times[0];
  const field2 = times[1];
  const field3 = times[2];
  const field4 = times[3];
  const field5 = times[4];
  const field6 = times[5];

  

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
    <div>
    <Navbar/>
    <div className="p-5 min-h-screen flex md:flex-row flex-col gap-5 items-center justify-center bg-gray-100">
      <button
        className="px-4 py-2 mb-4 bg-blue-500 text-white rounded-md"
        onClick={handleInitialButtonClick}
      >
        Fill Tablets
      </button>

      <div className={`flex flex-col items-center space-y-4 ${!buttonsEnabled ? "opacity-50 cursor-not-allowed" : ""}`}>
        <form
          onSubmit={handleSubmit}
          className={`px-4 mx-2 py-2 bg-green-500 text-white rounded-md `}
        >
          {times.map((time, index) => (
            <div key={index} className="mb-4 gap-4 flex flex-row ">
              <label
                className="block text-gray-700 text-sm font-bold mb-2  "
                htmlFor={`time${index}`}
              >
                Select Time {index + 1}
              </label>
              <input
                id={`time${index}`}
                type="time"
                value={time}
                onChange={(event) => handleTimeChange(index, event)}
                className="border rounded py-2 px-3 text-gray-700"
              />
            </div>
          ))}
        </form>

        <button
          className="bg-blue-500 text-white font-bold py-2 px-4 rounded"
          onClick={handleSubmit}
        >
          Submit
        </button>
      </div>

<ThingsData/>
    </div>
    </div>
  );
};

export default App;
