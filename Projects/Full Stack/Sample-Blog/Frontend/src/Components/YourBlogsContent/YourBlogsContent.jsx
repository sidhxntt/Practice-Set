import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@cred/neopop-web/lib/components";
import useFetch from "@/utils/hooks/useFetch(auth)";
import Loading from "./Loading";
import { onPublish } from "@utils/YourBlogsContent";
import { useState, useEffect } from "react";

const YourBlogsContent = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data, loading, error } = useFetch(`http://localhost:3000/user-blogs-content/${id}`, [id]);
  const [publishStatus, setPublishStatus] = useState(false);

  useEffect(() => {
    // Retrieve publish status from localStorage
    const savedStatus = localStorage.getItem(`publishStatus-${id}`);
    if (savedStatus === 'true') {
      setPublishStatus(true);
    }
  }, [id]);

  if (error) return <p>{error.message}</p>;
  if (loading) return <Loading />;

  return (
    <>
      {data.map((blog, index) => (
        <article
          key={index}
          itemScope
          itemType="http://schema.org/BlogPosting"
        >
          <div className="grid items-center grid-cols-1 md:grid-cols-2">
            <div className="order-2 h-64 md:order-1 md:h-full">
              <img
                src={`../../../../images/user_uploads/${blog.image}`} // Check the image path
                className="object-cover w-full h-full bg-center"
                alt={blog.image}
              />
            </div>
            <div className="order-1 w-full px-4 py-12 mx-auto text-left md:w-3/4 md:py-48 md:px-0">
              <p className="mb-3 text-gray-500">
                <time
                  itemProp="datePublished dateModified"
                  dateTime={blog.date}
                >
                  {blog.date}
                </time>
              </p>
              <h1
                className="mb-5 text-3xl font-bold text-gray-900 md:leading-tight md:text-4xl"
                itemProp="headline"
              >
                {blog.title}
              </h1>
              <div className="ml-2 flex items-center text-gray-700">
                <p className="text-sm font-semibold text-gray-800">
                  {blog.author}
                </p>
              </div>
              <div className="mt-6 relative left-3">
                <Button
                  variant="secondary"
                  kind="flat"
                  size="small"
                  colorMode="dark"
                  showArrow
                  onClick={() => { onPublish(blog._id, navigate, setPublishStatus) }}
                  disabled={publishStatus}
                >
                  Publish
                </Button>
              </div>
            </div>
          </div>

          <div className="flex justify-center px-80 py-20 mx-auto prose">
            <p>{blog.content}</p>
          </div>
          <div className="flex justify-center">
            <Button
              variant="secondary"
              kind="elevated"
              size="small"
              colorMode="dark"
              onClick={() => {
                navigate(-1);
              }}
            >
              Go Back
            </Button>
          </div>
        </article>
      ))}
    </>
  );
};

export default YourBlogsContent;
