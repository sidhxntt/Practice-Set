import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import HomePageLayout from '@/Layouts/HomePage';
import ErrorPage from '@/Layouts/ErrorPage';
import Home from '@/Components/Home/Home';
import Login from '@Components/Login/Login';
import LatestBlogContent from '@Components/LatestBlogContent/LatestBlogContent';
import AllBlogs from '@Components/AllBlogs/AllBlogs';
import AllBlogsContent from '@Components/AllBlogs/AllBlogsContent';
import Signup from '@Components/Signup/Signup';
import AccountPage from '@Layouts/AccountPage';
import Profile from '@Components/Profile/Profile';
import YourBlogs from '@Components/YourBlogs/YourBlogs';
import UploadBlog from '@Components/UploadBlogs/UploadBlog';
import AccountHome from '@Components/AccountHome/AccountHome';
import ProtectedRoute from '../Global/Auth/ProtectedRoute';
import YourBlogsContent from '@Components/YourBlogsContent/YourBlogsContent';
import Pricing from '@Components/Pricing/Pricing';
import PrivacyPolicy from '@Components/T&C/PrivacyPolicy';
import ContactUs from '@Components/ContactUs/ContactUs';
import ForgotPassword from '@Components/ForgetPassword/ForgetPassword';
import VerifyOTP from '@Components/VerifyOTP/VerifyOTP';
import ResetPassword from '@Components/ResetPassword/ResetPassword';


const routes = createBrowserRouter([
  {
    path: '/',
    element: <HomePageLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '',
        element: <Home/>
      },
      {
        path: '/privacy-policy',
        element: <PrivacyPolicy/>
      },
      {
        path: '/contact-us',
        element: <ContactUs/>
      },
      {
        path: 'blogs/blog/:id',
        element: <LatestBlogContent/>
      },
      {
        path: 'blogs/:page',
        element: <AllBlogs/>
      },
      {
        path: 'blogs/:page/:id',
        element: <AllBlogsContent/>
      },
      {
        path: 'account',
        element: <ProtectedRoute/>, 
        children: [
          {
            path: '',
            element: <AccountPage/>,
            children: [
              {
                path: '',
                element: <AccountHome/>
              },
              {
                path: 'home',
                element: <AccountHome/>
              },
              {
                path: 'profile',
                element: <Profile/>
              },
              {
                path: 'your-blogs',
                element: <YourBlogs/>
              },
              {
                path: 'your-blogs/:id',
                element: <YourBlogsContent/>
              },
              {
                path: 'upload-blog',
                element: <UploadBlog/>
              },
              {
                path: 'premium',
                element: <Pricing/>
              },
            ]
          }
        ]
      }
    ]
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/sign-up',
    element: <Signup />
  },
  {
    path: '/forget-password',
    element: <ForgotPassword />
  },
  {
    path: '/verify-otp',
    element: <VerifyOTP/>
  },
  {
    path: '/reset-password',
    element: <ResetPassword/>
  }
]);

export default routes;
