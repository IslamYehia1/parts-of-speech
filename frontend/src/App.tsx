import React from 'react';
import logo from './logo.svg';
import ReactDOM from 'react-dom/client';
import Homepage from './Homepage';
import { createBrowserRouter, RouterProvider, Route } from 'react-router-dom';
import './App.css';
const router = createBrowserRouter([
  {
    path: '/',
    element: <Homepage />,
  },
]);

function App() {
  return (
    <div className="appWrapper">
      <RouterProvider router={router}></RouterProvider>
    </div>
  );
}

export default App;
