import {RouterProvider,createBrowserRouter} from "react-router-dom";
import RootLayout from "./Layout/RootLayout";
import Home from "./Components/Home";
import About from "./Components/About";
import ErrorPage from "./Layout/error_page";
import HelpLayout from "./Layout/Help_Layout";
import Faq from "./Components/FAQ";
import Contact from "./Components/Contact";
import CareersLayout from "./Layout/Career_layout";
import Careers from "./Components/Careers";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "about",
        element: <About />,
      },
      {
        path: "help", 
        element: <HelpLayout />,
        children: [
          {
            path: "faq",
            element: <Faq />,
          },
          {
            path: "contact",
            element: <Contact />,
          },
        ],
      },
      {
        path: 'careers',
        element: <CareersLayout/>,
        children:[
          {
            path: '',
            element: <Careers/>
          },
        ]
      }
    ],
  },
]);

const App = () => {
  return <RouterProvider router={routes} />;
};

export default App;
