import React from 'react';
import logo from './logo.svg';
import ReactDOM from 'react-dom/client';
import Homepage from './Homepage';
import Gamepage from './Gamepage';
import { createBrowserRouter, RouterProvider, Route } from 'react-router-dom';
import './App.css';
import Results from 'Results';
import { UserProvider } from 'Context/users';
const router = createBrowserRouter([
  {
    path: '/',
    element: <Homepage />,
  },
  {
    path: '/game',
    element: <Gamepage />,
  },
  {
    path: '/results',
    element: <Results />,
  },
]);

function App() {
  return (
    <div className="appWrapper">
      <UserProvider>
        <RouterProvider router={router}></RouterProvider>
      </UserProvider>
    </div>
  );
}

export default App;
