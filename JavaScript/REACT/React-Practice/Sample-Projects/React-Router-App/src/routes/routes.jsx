import {createBrowserRouter} from "react-router-dom";
import RootLayout from "@Layout/RootLayout";
import Home from "@Components/Home";
import About from "@Components/About";
import ErrorPage from "@Layout/error_page";

import HelpLayout from "@Layout/Help_Layout";
import Faq from "@Components/FAQ";
import Contact, { contactAction } from "@Components//Contact";

import CareersLayout from "@Layout/Career_layout";
import Careers, {careersLoader} from "@Components/Careers";
import CareerDetails, {careersDetailsLoader} from "@Components/CareerDetails";

const routes = createBrowserRouter([
    {
      path: "/",
      // Anything wrong with route/URL will trigger this errorElement
      errorElement: <ErrorPage />,
      element: <RootLayout />,
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
              action: contactAction
            },
          ],
        },
        {
          path: 'careers',
          element: <CareersLayout/>,
          children:[
            {
              path: '',
              element: <Careers/>,
              loader: careersLoader
            },
            {
              path: ':id',
              errorElement: <ErrorPage />,
              element: <CareerDetails/>,
              loader: careersDetailsLoader
            },
          ]
        }
      ],
    },
  ]);

  export default routes