"use client"
import { onSignup ,validatePassword} from "@/utils/signup";
import Image from "next/image";
import Link from "next/link";
import { useForm } from "react-hook-form";
import isEmail from "validator/lib/isEmail";
import { useState,useEffect } from "react";
import { useRouter } from 'next/navigation'

const Signup = () => {
    const {register, handleSubmit,watch,formState: {errors}} = useForm();
    const [sucess, setSuccess] = useState("")
    const [error, setError] = useState("")
    const router = useRouter()

    useEffect(() => {
      if(sucess){
        setTimeout(() => {
          router.push("/")
        }, 2000);
      }
    }, [sucess,router])
    

  return (
    <section class="bg-white">
      <div class="container flex items-center justify-center min-h-screen px-6 mx-auto">
        <form 
       onSubmit={handleSubmit((data) => onSignup(data, setSuccess, setError))}
        class="w-full max-w-md">
          <div class="flex justify-center mx-auto">
            <Image
              height={100}
              width={100}
              class="w-auto h-7 sm:h-8"
              src="https://merakiui.com/images/logo.svg"
              alt="logo"
            />
          </div>

          <div class="flex items-center justify-center mt-6">
            <p
              class="w-1/3 pb-4 font-medium text-center text-gray-800 capitalize border-b-2 border-blue-500"
            >
              sign up
            </p>
          </div>

          <div class="relative flex items-center mt-8">
            <span class="absolute">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="w-6 h-6 mx-3 text-gray-300 "
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
            </span>

            <input
              type="text"
              class="block w-full py-3 text-gray-700 bg-white border rounded-lg px-11  focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
              placeholder="Username"
              {...register("username", {
                required: "* Username is required",
                minLength: { value: 5, message: "* Username too short" },
                maxLength: { value: 15, message: "* Username too long" },
              })}
            />
          </div>
          <div className="mt-1 text-red-500 text-sm">
            {errors.username && <span>{errors.username.message}</span>}
          </div>
      
          <div class="relative flex items-center mt-6">
            <span class="absolute">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="w-6 h-6 mx-3 text-gray-300"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
            </span>

            <input
              type="email"
              class="block w-full py-3 text-gray-700 bg-white border rounded-lg px-11 focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
              placeholder="Email address"
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

          <div class="relative flex items-center mt-4">
            <span class="absolute">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="w-6 h-6 mx-3 text-gray-300"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
            </span>

            <input
              type="password"
              class="block w-full px-10 py-3 text-gray-700 bg-white border rounded-lg focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
              placeholder="Password"
              {...register("password", {
                required: "* Password is required",
                minLength: { value: 5, message: "* Password too short" },
                maxLength: { value: 15, message: "* Password too long" },
                validate: validatePassword,
              })}
            />
          </div>
          <div className="mt-1 text-red-500 text-sm">
            {errors.password && <span>{errors.password.message}</span>}
          </div>

          <div class="relative flex items-center mt-4">
            <span class="absolute">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="w-6 h-6 mx-3 text-gray-300"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
            </span>

            <input
              type="password"
              class="block w-full px-10 py-3 text-gray-700 bg-white border rounded-lg focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
              placeholder="Confirm Password"
              onCopy={(e) => e.preventDefault()}
              onPaste={(e) => e.preventDefault()}
              {...register("confirm_password", {
                required: "* Confirm Password is required",
                validate: (value) =>
                  value === watch("password") || "* Passwords do not match",
              })}
            />
          </div>
          <div className="mt-1 text-red-500 text-sm">
            {errors.confirm_password && <span>{errors.confirm_password.message}</span>}
          </div>

          <div class="mt-6">
            <button class="w-full px-6 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500 rounded-lg hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50">
              Sign Up
            </button>
              <div className="flex justify-centertext-sm mt-2">
                {error && <p className=" text-red-600 ">{error}</p>}
                {sucess && <p className=" text-green-600 ">{sucess}</p>}
              </div>
            <div class="mt-6 text-center ">
              <Link
                href="/"
                class="text-sm text-blue-500 hover:underline"
              >
                Already have an account?
              </Link>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Signup;
