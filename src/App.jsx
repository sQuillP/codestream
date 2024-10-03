
import React from 'react';
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



export default function App() {



    return (
        <RouterProvider router={router}/>
    )
}