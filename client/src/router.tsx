import { createBrowserRouter } from "react-router-dom";
import { Home } from "./pages/Home";
import { UserFavourites } from "./components/UserFavourites";
import { Layout } from "./pages/Layout";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
        index: true,
      },
      {
        path: "/favourites",
        element: <UserFavourites />,
      },
    ],
  },
]);
