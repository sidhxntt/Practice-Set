import GuesstheNumber from "./pages/GuesstheNumber";
import StonePaperScissors from "./pages/StonePaperScissors";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";

function App() {
  const routes = createBrowserRouter([
    {
      path: "/",
      element: <StonePaperScissors />
    },
    // {
    //   path: "/guess the number", 
    //   element: <GuesstheNumber />
    // },
    // {
    //   path: "/stone paper scissors", 
    //   element: <StonePaperScissors />
    // },
  ]);
  
  return (
    <RouterProvider router={routes} />
  );
}

export default App;
