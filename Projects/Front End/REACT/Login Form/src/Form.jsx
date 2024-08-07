import React from "react";
import { useForm } from "react-hook-form";

const Form = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitSuccessful},
  } = useForm();

  const delay = (d)=>{
    return new Promise((resolve, reject)=>{
      setTimeout(() => {
        resolve()
      }, d * 1000);
    })
  }
// we are making the entire onsubmit function wait for 3 secs until delay is resolved then it logs the data
  const onSubmit = async (data) => {
    try {
      await delay(5)
      let r = await fetch("http://localhost:3000/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      });
  
    } catch (error) {
      console.log(error.message)
    }
  };

  // // WHY CANT WE USE THIS? because here onsubmit function has already run and it has logged the data after 3s
  // const onSubmit = (data) => {
  //   setTimeout(() => {
  //     console.log(data);
  //   }, 3000);
  // };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h1>Login</h1>
      <div className="input-field-1">
        <input
          type="text"
          placeholder="Username"
          {...register("username", {
            required: "Username is required",
          })}
        />
        <i className="bx bxs-user"></i>
      </div>
      <div className="username_error">
         {errors.username && <span>{errors.username.message}</span>}
      </div>
     
      <div className="input-field-2">
        <input
          type="password"
          placeholder="Password"
          {...register("password", {
            required: "Password is required",
            maxLength: {
              value: 15,
              message: "Max length of your password is 15",
            },
            minLength: {
              value: 5,
              message: "Min length of your password is 5",
            },
          })}
        />
        <i className="bx bxs-lock-alt"></i>
      </div>
          <div className="password_error">
          {errors.password && <span>{errors.password.message}</span>}
          </div>
      <div className="remember-forgot">
        <label htmlFor="remember-me">
          <input type="checkbox" />
          Remember me
        </label>
        <a href="#">Forgot password?</a>
      </div>

      <input disabled={isSubmitting} className="input_field_3" type="submit" value="Login" />

      <div className="footer-1">
        <p>Don't have an account?</p>
        <a href="#">Register</a>
      </div>
      <div className="footer-2">
        {isSubmitting && <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200"><radialGradient id="a12" cx=".66" fx=".66" cy=".3125" fy=".3125" gradientTransform="scale(1.5)"><stop offset="0" stopColor="#FFFFFF"></stop><stop offset=".3" stopColor="#FFFFFF" stopOpacity=".9"></stop><stop offset=".6" stopColor="#FFFFFF" stopOpacity=".6"></stop><stop offset=".8" stopColor="#FFFFFF" stopOpacity=".3"></stop><stop offset="1" stopColor="#FFFFFF" stopOpacity="0"></stop></radialGradient><circle transform-origin="center" fill="none" stroke="url(#a12)" strokeWidth="15" strokeLinecap="round" strokeDasharray="200 1000" strokeDashoffset="0" cx="100" cy="100" r="70"><animateTransform type="rotate" attributeName="transform" calcMode="spline" dur="2" values="360;0" keyTimes="0;1" keySplines="0 0 1 1" repeatCount="indefinite"></animateTransform></circle><circle transform-origin="center" fill="none" opacity=".2" stroke="#FFFFFF" strokeWidth="15" strokeLinecap="round" cx="100" cy="100" r="70"></circle></svg>}
        {isSubmitSuccessful && <span>Successfully Submitted</span>}
      </div>
    </form>
  );
};

export default Form;
