"use client";
import { OnLogin } from "@/app/utils/login";
import Image from "next/image";
import Link from "next/link";
import { useForm } from "react-hook-form";
import isEmail from "validator/lib/isEmail";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid, isSubmitSuccessful },
  } = useForm();
  
  return (
    <div className="w-full max-w-sm mx-auto overflow-hidden bg-white rounded-lg shadow-md">
      <div className="px-6 py-4">
        <div className="flex justify-center mx-auto">
          <Image
            height={100}
            width={100}
            className="w-auto h-7 sm:h-8"
            src="https://merakiui.com/images/logo.svg"
            alt="logo"
          />
        </div>

        <h3 className="mt-3 text-xl font-medium text-center text-gray-600">
          Welcome Back
        </h3>

        <form onSubmit={handleSubmit(OnLogin)}>
          <div className="w-full mt-4">
            <input
              className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-500 bg-white border rounded-lg  focus:border-blue-400 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300"
              type="email"
              placeholder="Email Address"
              aria-label="Email Address"
              {...register("email", {
                required: "* Email is required",
                validate: (value) =>
                  isEmail(value) || "* Please enter a valid email",
              })}
            />
          </div>
          <div className="mt-1 text-red-500 text-sm">
            {errors.email && <span>{errors.email.message}</span>}
          </div>

          <div className="w-full mt-4">
            <input
              className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-500 bg-white border rounded-lg  focus:border-blue-400 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300"
              type="password"
              placeholder="Password"
              aria-label="Password"
              {...register("password", {
                required: "* Password is required",
              })}
            />
          </div>
          <div className="mt-1 text-red-500 text-sm">
            {errors.password && <span>{errors.password.message}</span>}
          </div>

          <div className="flex items-center justify-center mt-4">
      
            <button
              type="submit"
              className="px-6 py-2 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500 rounded-lg hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50"
            >
              Sign In
            </button>
          </div>
        </form>
      </div>

      <div className="flex items-center justify-center py-4 text-center bg-gray-50">
        <span className="text-sm text-gray-600">Don't have an account? </span>

        <Link
          href="/signup"
          className="mx-2 text-sm font-bold text-blue-500 hover:underline"
        >
          Register
        </Link>
      </div>
    </div>
  );
};

export default Login;