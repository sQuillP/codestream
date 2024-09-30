import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";


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

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <RouterProvider router={router}/>
    </ThemeProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
