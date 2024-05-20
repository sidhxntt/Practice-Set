"use client";
import { useForm } from "react-hook-form";
import DataEntry from "./DataEntry";

const page = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm();

  const delay = (d)=>{
    return new Promise((resolve, reject)=>{
      setTimeout(() => {
        resolve()
      }, d * 1000);
    })
  }
const onsubmit = async(data)=>{
  try {
    await delay(3)
    await DataEntry(data)
  } catch (error) {
    console.log(error.message)
  }
}

  return (
    <form action={handleSubmit(onsubmit)}>
      <h3>Login</h3>
      <input
        type="text"
        placeholder="Username"
        {...register("Username", { required: "Username is required" })}
      />
      {errors.Username && <p>{errors.Username.message}</p>}
      <div>
        <input
          type="Password"
          placeholder="Password"
          {...register("Password", {
            required: "Password is required",
            maxLength: {
              value: 10,
              message: "Max length of your Password is 10",
            },
            minLength: {
              value: 5,
              message: "Min length of your Password is 5",
            },
          })}
        />
         {errors.Password && <p>{errors.Password.message}</p>}
      </div>
      <button type="submit">Submit</button>
      {isSubmitting && <p>Submitting...</p>}
      {isSubmitSuccessful && <p>Submitted successfully</p>}
    </form>
  );
};

export default page;
