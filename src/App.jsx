
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import {
  MeetingProvider
} from '@videosdk.live/react-sdk';

import Home from './routes/home/Home';
import Room from './routes/room/Room';



import { ThemeProvider, createTheme } from '@mui/material/styles';






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
    "element":<Room/>
  }
])


export default function App() {


    

    return (
        <MeetingProvider
            config={{
                meetingId:'abc123',
                micEnabled: true,
                webcamEnabled: true,
                name:"C.J Wilikers"
            }}
            token="abc123"
        >

            <RouterProvider router={router}/>
        </MeetingProvider>
    )
}