import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@cred/neopop-web/lib/components";
import useFetch from "@/utils/hooks/useFetch(auth)";
import { handleReverse, onDelete } from "@utils/YourBlogs";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import SimpleSnackbar from "./SimpleSnackBar";

const YourBlogs = () => {
  const [isReversed, setIsReversed] = useState(false);
  const { data, setData, loading, error } = useFetch(`http://localhost:3000/user-blogs`,[]);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  if (loading)
    return (
      <div className="flex justify-center h-auto">
        <span className="loading loading-bars loading-lg"></span>
      </div>
    );
  if (error) return <p>{error}</p>;

  return (
    <section className="px-4 pt-3 pb-5 mb-80 mx-auto max-w-7xl">
      <div className="flex justify-between pb-8 mb-12 text-2xl font-extrabold leading-tight text-gray-900 border-b border-gray-200 md:text-4xl">
        <h1>All Blogs</h1>
        <Button
          variant="secondary"
          kind="flat"
          size="small"
          colorMode="dark"
          onClick={() => {
            handleReverse(data, setData, setIsReversed, isReversed);
          }}
        >
          {isReversed ? "Oldest" : "Newest"}
        </Button>
      </div>

      {data.length > 0 ? (
        <div className="w-full xl:w-4/6">
          <div className="flex flex-col space-y-16">
            {data.map((blog, index) => (
              <div
                key={index}
                className="grid grid-cols-1 gap-6 md:grid-cols-4"
              >
                <img
                  src={`../../../images/user_uploads/${blog.image}`}
                  className="object-cover w-full h-40 col-span-1 bg-center"
                  alt={blog.title}
                  loading="lazy"
                />
                <div className="col-span-1 md:col-span-3">
                  <p className="mb-2 -mt-1 text-sm font-normal text-gray-500">
                    {new Date(blog.date).toLocaleDateString()}
                  </p>
                  <h2 className="mb-2 text-xl font-extrabold leading-snug text-gray-800">
                    <p className="text-gray-900 hover:text-purple-700 inline">
                      {blog.title}
                    </p>
                  </h2>
                  <p className="mb-3 text-sm font-normal text-gray-500 line-clamp-3">
                    {blog.content}
                  </p>
                  <div className="flex gap-3 ">
                    <Link to={`${blog._id}`} className="btn btn-light btn-sm">
                      Read More
                    </Link>
                    <div
                      onClick={() => onDelete(blog._id, setData, data, setSnackbarOpen)}
                      className="scale-75 cursor-pointer hover:scale-90 hover:rotate-6 transition"
                    >
                      <Tooltip title="Delete">
                        <IconButton>
                          <DeleteIcon />
                        </IconButton>
                      </Tooltip>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="mb-40">
          <p>No blogs found.</p>
        </div>
      )}
      <SimpleSnackbar open={snackbarOpen} setOpen={setSnackbarOpen} />
    </section>
  );
};

export default YourBlogs;

