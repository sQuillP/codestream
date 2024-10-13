
import React, { useState, createContext } from 'react';
import './index.css';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";


import Home from './routes/home/Home';


import { createTheme } from '@mui/material/styles';
import RoomWrapper from './routes/room/RoomWrapper';






const theme = createTheme({
  colorSchemes: {
    dark: true,
  },
});


const router = createBrowserRouter([
  {
    "path":"/",
    "element": <Home/>
  },
  {
    "path":"rooms/:roomId",
    "element":<RoomWrapper/>
  }
])
 


// export const VideoSDKTokenContext = createContext(null);


export default function App() {


  // const [videoSDKToken, setVideoSDKToken] = useState(null);



    return (
        // <VideoSDKTokenContext.Provider value={{videoSDKToken, setVideoSDKToken}}>
          <RouterProvider router={router}/>
        // </VideoSDKTokenContext.Provider>
    )
}