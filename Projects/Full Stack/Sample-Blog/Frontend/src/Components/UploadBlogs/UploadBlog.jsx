import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@cred/neopop-web/lib/components";
import SubmittingToast from "./SubmittingToast";
import SubmittedToast from "./SubmittedToast";
import { useNavigate } from "react-router-dom";
import { onSubmit, handleFileChange, redirect } from "@/utils/UploadBlogs";

const UploadBlog = () => {
  const [preview, setPreview] = useState(null);
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors, isSubmitting, isValid, isSubmitSuccessful } } = useForm();


  useEffect(() => {
    redirect(isSubmitSuccessful, navigate);
  }, [isSubmitSuccessful, navigate]);

  return (
    <>
      <div className="p-5 px-48">
        <form 
          onSubmit={handleSubmit((data) => { onSubmit(data); })}
          enctype="multipart/form-data"
        >
          <div className="mb-4">
            <label
              htmlFor="title"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Blog Title
            </label>
            <input
              type="text"
              placeholder="Enter Title"
              id="title"
              className="mt-1 p-2 block w-full rounded-md border border-gray-900/25 border-dashed focus:ring-indigo-500 sm:text-sm"
              {...register("title", {
                required: "* Title is required",
                minLength: { value: 5, message: "* Title too short" },
                maxLength: { value: 30, message: "* Title too long" },
              })}
            />
            <div className="mt-1 text-red-500 text-sm">
              {errors.title && <span>{errors.title.message}</span>}
            </div>
          </div>
          <div className="mb-4">
            <label
              htmlFor="author"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Author Name
            </label>
            <input
              type="text"
              id="author"
              placeholder="Enter Name"
              className="mt-1 p-2 block w-full rounded-md border border-gray-900/25 border-dashed focus:ring-indigo-500 sm:text-sm"
              {...register("author", {
                required: "* Author is required",
                minLength: { value: 5, message: "* Author too short" },
                maxLength: { value: 30, message: "* Author too long" },
              })}
            />
            <div className="mt-1 text-red-500 text-sm">
              {errors.author && <span>{errors.author.message}</span>}
            </div>
          </div>
          <div className="mb-4">
            <label
              htmlFor="date"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Date
            </label>
            <input
              type="date"
              id="date"
              className="mt-1 p-2 block cursor-pointer w-full rounded-md border border-gray-900/25 border-dashed focus:ring-indigo-500 sm:text-sm"
              {...register("date", {
                required: "* Date is required",
              })}
            />
            <div className="mt-1 text-red-500 text-sm">
              {errors.date && <span>{errors.date.message}</span>}
            </div>
          </div>
          <div className="mb-4">
            <label
              htmlFor="content"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Blog Content
            </label>
            <textarea
              placeholder="Write your mind here"
              id="content"
              rows="10"
              className="mt-1 p-2 block w-full rounded-md border border-gray-900/25 border-dashed focus:ring-indigo-500 sm:text-sm"
              {...register("content", {
                required: "* Content is required",
                minLength: { value: 20, message: "* content too short" },
              })}
            />
            <div className="mt-1 text-red-500 text-sm">
              {errors.content && <span>{errors.content.message}</span>}
            </div>
          </div>

          <label
            htmlFor="file-upload"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Cover photo
          </label>
          <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
            <div className="text-center">
              {preview ? (
                <img
                  src={preview}
                  alt="Preview"
                  className="mx-auto h-48 w-auto object-cover"
                />
              ) : (
                <div className="text-gray-300">
                  <svg
                    className="mx-auto h-12 w-12"
                    stroke="currentColor"
                    fill="none"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M3 7V5a2 2 0 012-2h14a2 2 0 012 2v2M5 15l7-7 7 7M5 10h14M12 10v10"
                    ></path>
                  </svg>
                </div>
              )}
              <div className="mt-4 flex text-sm leading-6 text-gray-600">
                <label
                  htmlFor="file-upload"
                  className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                >
                  <span>Upload a file</span>
                  <input
                    id="file-upload"
                    type="file"
                    className="sr-only"
                    {...register("blog_pic", {
                      required: "* Cover pic is required",
                    })}
                    onChange={(e) => handleFileChange(e, setPreview)}
                  />
                </label>
                <p className="pl-1">or drag and drop</p>
              </div>
              <p className="text-xs leading-5 text-gray-600">
                PNG, JPG, JPEG up to 10MB
              </p>
            </div>
          </div>
          <div className="mt-1 text-red-500 text-sm">
            {errors.blog_pic && <span>{errors.blog_pic.message}</span>}
          </div>
          <div className="mt-6 flex justify-center">
            <Button
              variant="secondary"
              kind="elevated"
              size="small"
              colorMode="dark"
              type="submit"
              disabled={isSubmitting || isSubmitSuccessful}
            >
              Submit
            </Button>
          </div>
        </form>
      </div>
      <div className="flex justify-end">
        {isSubmitting && isValid && <SubmittingToast />}
        {isSubmitSuccessful && <SubmittedToast />}
      </div>
    </>
  );
};

export default UploadBlog;
