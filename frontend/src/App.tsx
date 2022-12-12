import React from 'react';
import logo from './logo.svg';
import ReactDOM from 'react-dom/client';
import Homepage from './Homepage';
import Gamepage from './Gamepage';
import { createBrowserRouter, RouterProvider, Route } from 'react-router-dom';
import './App.css';
import Results from 'Results';
import { UserProvider } from 'Context/users';
import { GameProvider } from 'Context/game';
const router = createBrowserRouter([
  {
    path: '/',
    element: <Homepage />,
    errorElement: <div className="errorPage">Something went wrong, please try again!</div>,
  },
  {
    path: '/game',
    element: <Gamepage />,
    errorElement: <div className="errorPage">Something went wrong, please try again!</div>,
  },
  {
    path: '/results',
    element: <Results />,
    errorElement: <div className="errorPage">Something went wrong, please try again!</div>,
  },
]);

function App() {
  return (
    <div className="appWrapper">
      <UserProvider>
        <GameProvider>
          <RouterProvider router={router}></RouterProvider>
        </GameProvider>
      </UserProvider>
    </div>
  );
}

export default App;
