import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { Button } from "@cred/neopop-web/lib/components";
import { onSubmit } from '@/utils/VerifyOTP';

const VerifyOTP = () => {
  const [serverError, setServerError] = useState("");
  const [timer, setTimer] = useState(300); // 5 minutes in seconds
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm();

  useEffect(() => {
    // Decrease timer every second
    const intervalId = setInterval(() => {
      setTimer((prevTimer) => prevTimer - 1);
    }, 1000);

    // Clear interval on unmount or when timer reaches 0
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    // Redirect when timer reaches 0
    if (timer === 0) {
      // Redirect to a page indicating OTP expired
      navigate('/otp-expired');
    }
  }, [timer, navigate]);

  const formattedTime = `${Math.floor(timer / 60)}:${timer % 60 < 10 ? '0' : ''}${timer % 60}`;

  return (
    <section className="bg-white">
      <div className="container flex items-center justify-center min-h-screen px-6 mx-auto">
        <form className="w-full max-w-md" onSubmit={handleSubmit((data) => onSubmit(data, navigate, setServerError))}>
          <div className="flex justify-center mx-auto">
            <img
              className="w-auto h-12 sm:h-8 cursor-pointer"
              src="../../../images/home/Logo.png"
              alt="logo"
            />
          </div>
          
          <div className="relative flex items-center mt-5">
            <input
              type="text"
              className="block w-full py-3 text-gray-700 bg-white border rounded-lg px-11 focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
              placeholder="Enter the OTP"
              {...register("token", {
                required: "* Please Enter the OTP "
              })}
            />
          </div>
          <div className="mt-1 text-red-500 text-sm">
            {errors.token && <div>{errors.token.message}</div>}
            {serverError && <div>{serverError}</div>}
          </div>

          <div className="mt-6 flex justify-center">
            <Button
              variant="secondary"
              kind="elevated"
              size="small"
              colorMode="dark"
              type="submit"
              showArrow
            >
              Verify OTP
            </Button>
          </div>

          <div className="mt-2 text-center text-gray-500">
            OTP expires in {formattedTime} minutes
          </div>
        </form>
      </div>
    </section>
  );
};

export default VerifyOTP;
