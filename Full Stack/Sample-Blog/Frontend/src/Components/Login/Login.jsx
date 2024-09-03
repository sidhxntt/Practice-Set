import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import isEmail from "validator/lib/isEmail";
import { useAuth } from '@/Global/Auth/AuthContext';
import { onSubmit, handleGoogleLoginSuccess, handleGoogleLoginError } from "@utils/Login";
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import style from "./styles.module.css";
import { Button } from "@cred/neopop-web/lib/components";
import Carousel from "@Components/Carousel/Carousel";

const Login = () => {
  const [CredentialError, setCredentialError] = useState(null);
  const navigate = useNavigate();
  const { login } = useAuth();
  const { register, handleSubmit, formState: { errors } } = useForm();

  return (
    <GoogleOAuthProvider clientId="343165432518-e7c46hq021lbsdmo8d43jbgk3mdog0nf.apps.googleusercontent.com">
      <section className={style.login}>
        <div className="flex w-full max-w-sm mx-auto overflow-hidden bg-white rounded-lg shadow-lg lg:max-w-4xl">
          <div className={style.Carousel_holder}>
            <Carousel />
          </div>
          <form 
            onSubmit={handleSubmit((data) => onSubmit(data, login, setCredentialError, navigate))}
            className="w-full px-6 py-8 md:px-8 lg:w-1/2"
          >
            <div className="flex justify-center mx-auto">
              <img
                className="w-auto h-7 sm:h-8 cursor-pointer"
                src="../../../images/home/Logo.png"
                alt="image"
                onClick={() => navigate("/")}
              />
            </div>
            <p className="mt-3 text-xl text-center text-gray-600 ">
              Welcome back!
            </p>
            <div className="flex items-center justify-center mt-4">
              <GoogleLogin
                onSuccess={(response) => handleGoogleLoginSuccess(response, login, navigate, setCredentialError)}
                onError={() => handleGoogleLoginError(setCredentialError)}
                useOneTap
              />
            </div>
            <div className="flex items-center justify-between mt-4">
              <span className="w-1/5 border-b lg:w-1/4" />
              <p className="text-xs text-center text-gray-500 uppercase">
                or login with email
              </p>
              <span className="w-1/5 border-b lg:w-1/4" />
            </div>
            <div className="mt-4">
              <label
                className="block mb-2 text-sm font-medium text-gray-600"
                htmlFor="LoggingEmailAddress"
              >
                Email Address
              </label>
              <input
                id="LoggingEmailAddress"
                className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg focus:border-blue-400 focus:ring-opacity-40focus:outline-none focus:ring focus:ring-blue-300"
                type="email"
                {...register("email", {
                  required: "* Email is required",
                  validate: value => isEmail(value) || "* Please enter a valid email"
                })}
              />
            </div>
            <div className="mt-1 text-red-500 text-sm">
              {errors.email && <span>{errors.email.message}</span>}
            </div>
            <div className="mt-4">
              <div className="flex justify-between">
                <label
                  className="block mb-2 text-sm font-medium text-gray-600"
                  htmlFor="loggingPassword"
                >
                  Password
                </label>
                <Link to="/forget-password" className="text-xs text-gray-500 hover:underline">
                  Forget Password?
                </Link>
              </div>
              <input
                id="loggingPassword"
                className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg focus:border-blue-400 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300"
                type="password"
                {...register("password", {
                  required: "* Password is required",
                })}
              />
            </div>
            <div className="mt-1 text-red-500 text-sm">
              {errors.password && <span>{errors.password.message}</span>}
            </div>
            <div className="flex justify-center mt-3 text-red-500 text-sm font-semibold">
              {CredentialError}
            </div>
            <div className="mt-6 flex justify-center">
              <Button
                variant="primary"
                kind="elevated"
                size="small"
                colorMode="dark"
                showArrow
                type="submit" // Ensuring the button submits the form
              >
                Sign In
              </Button>
            </div>
            <div className="flex items-center justify-between mt-4">
              <span className="w-1/5 border-b  md:w-1/4" />
              <Link
                to={'/sign-up'}
                className="text-xs text-gray-500 uppercase hover:underline"
              >
                or sign up
              </Link>
              <span className="w-1/5 border-b  md:w-1/4" />
            </div>
          </form>
        </div>
      </section>
    </GoogleOAuthProvider>
  );
};

export default Login;
