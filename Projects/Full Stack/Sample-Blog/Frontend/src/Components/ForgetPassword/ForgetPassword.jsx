import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import isEmail from "validator/lib/isEmail";
import { Button,ToastContainer } from "@cred/neopop-web/lib/components";
import { useForm } from 'react-hook-form';
import { onSubmit, handleToastMessages } from '@/utils/ForgetPassword';

const ForgotPassword = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate()
  const {register, handleSubmit,formState: { errors, isSubmitting, isValid, isSubmitSuccessful},} = useForm();

  useEffect(() => {
    handleToastMessages( errorMessage,setErrorMessage,isSubmitting, isValid,successMessage,setSuccessMessage)
  }, [errorMessage,isSubmitting,successMessage])
  
  return (
    <section className="bg-white">
       <ToastContainer />
      <div className="container flex items-center justify-center min-h-screen px-6 mx-auto">
        <form className="w-full max-w-md"  onSubmit={handleSubmit((data) => onSubmit(data, setErrorMessage, setSuccessMessage))}>
          <div className="flex justify-center mx-auto">
            <img
              className="w-auto h-12 sm:h-8 cursor-pointer"
              src="../../../images/home/Logo.png"
              alt="logo"
              onClick={() => {
                navigate("/");
              }}
            />
          </div>
        
          <div className="relative flex items-center mt-5">
            <span className="absolute">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6 mx-3 text-gray-300"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
            </span>

            <input
              type="email"
              className="block w-full py-3 text-gray-700 bg-white border rounded-lg px-11 focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
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

          <div className="mt-6 flex justify-center">
            <Button
              variant="secondary"
              kind="elevated"
              size="small"
              colorMode="dark"
              type="submit"
              disabled={isSubmitting || isSubmitSuccessful}
              showArrow
            >
              Send OTP
            </Button>
          </div>
        
        </form>
      </div>
    </section>
  );
};

export default ForgotPassword;
