import React,{useState,useEffect} from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios'

const Notification = () => {

    const [notification, setNotification] = useState(0);
 
const notificationData=notification?.field8

  const url2 = "https://api.thingspeak.com/channels/2593001/fields/8.json?results=1";

  const handlegetClick = async () => {
    await axios
      .get(url2)
      .then((response) => {
        const [responseData] = response.data.feeds;
        
        setNotification(responseData);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      handlegetClick();
  
    }, 3017);
    return () => clearInterval(intervalId);
  }, []);
  const playBeep = () => {
    const audio = new Audio('/beep.mp3'); 
    console.log(audio)
    audio.play();
 
  };

    const handleCommand = (notificationData) => {

        switch (notificationData) {
          case '1':
            toast.success('Take Morning Before Food', {
              position: "bottom-center"
            });
            playBeep()
           
            break;
          case '2':
            playBeep()
            toast.success('Take Morning After Food', {
              position: "bottom-center"
            });
            
            break;
          case '3':
            playBeep()
            toast.success('Take Afternoon Before Food', {
              position: "bottom-center"
            });
           
            break;
          case '4':
            playBeep()
            toast.success('Take Afternoon After Food', {
              position: "bottom-center"
            });
            
            break;
          case '5':
            playBeep()
            toast.success('Take Night Before Food', {
              position: "bottom-center"
            });
            
            break;
          case '6':
            playBeep()
            toast.success('Take Night After Food', {
              position: "bottom-center"
            });
           
            break;
          default:
          
            break;
        }
      };
   
      useEffect(()=>{
        const intervalId = setInterval(() => {
          handleCommand (notificationData)
     
      
        }, 7000);
        return () => clearInterval(intervalId);
        
      },[notificationData])
     
  return (
    <div ><ToastContainer /></div>
  )
}

export default Notification
