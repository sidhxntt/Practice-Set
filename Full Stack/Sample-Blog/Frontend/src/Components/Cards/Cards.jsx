import useFetch from "@utils/hooks/useFetch";
import { Link } from "react-router-dom";

const Cards = () => {
  const { data, loading } = useFetch(`http://localhost:3000/latest-blogs`, []);

  return (
    <>
      <div className="flex p-5 justify-center">
        <h1 className="text-3xl font-bold text-center">Latest Stories</h1>
      </div>
      <div className="flex justify-center mx-auto md:flex-nowrap p-12">
        {loading ? (
             <div class="w-full max-w-md mx-auto animate-pulse p-9">
             <h1 class="h-2 bg-gray-300 rounded-lg w-52 "></h1>
             <p class="w-48 h-2 mt-6 bg-gray-200 rounded-lg "></p>
             <p class="w-full h-2 mt-4 bg-gray-200 rounded-lg "></p>
             <p class="w-64 h-2 mt-4 bg-gray-200 rounded-lg "></p>
             <p class="w-4/5 h-2 mt-4 bg-gray-200 rounded-lg"></p>
           </div>
        ) : (
          data.map((blog, index) => (
            <Link to={`/blogs/blog/${blog.id}`} key={index}>
              <div className="flex w-full">
                <div className="relative flex flex-col items-start m-1 transition duration-300 ease-in-out delay-150 transform bg-white shadow-2xl rounded-xl md:w-80 md:-ml-16 md:hover:-translate-x-16 md:hover:-translate-y-8">
                  <img
                    className="object-cover object-center w-full rounded-t-xl lg:h-48 md:h-36"
                    src={blog.image}
                    alt="blog"
                  />
                  <div className="px-6 py-8">
                    <h4 className="mt-4 text-2xl font-semibold text-neutral-600">
                      {blog.title}
                    </h4>
                    <p className="mt-4 text-base font-normal text-gray-500 leading-relaxed">
                      {blog.description}
                    </p>
                  </div>
                </div>
              </div>
            </Link>
          ))
        )}
      </div>
    </>
  );
};

export default Cards;
