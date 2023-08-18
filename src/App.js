

import * as ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './App.css';
import Home from "./Pages/Home";
import Registration from "./Pages/Registration";
import SignIn from "./Pages/SignIn";
function App() {

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Registration />,
    },
    {
      path: "/signin",
      element: <SignIn />,
    },
    {
      path: "/Home",
      element: <Home />,
    },
  ]);
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
