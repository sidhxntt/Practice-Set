import React, { useState, useEffect } from "react";
import { Button } from "@cred/neopop-web/lib/components";
import { useNavigate, Link, useParams } from "react-router-dom";
import { SearchBar } from '@cred/neopop-web/lib/components';
import { colorGuide } from '@cred/neopop-web/lib/primitives';
import { handleNextClick, handlePreviousClick, handleReverse, handlelimit } from "../../utils/AllBlogs";
import Loading from "./Loading";
import Error from "./Error";
import useFetch from "@utils/hooks/useFetch";

const AllBlogs = () => {
  const navigate = useNavigate();
  const { page } = useParams(); 
  const [currentPage, setCurrentPage] = useState(parseInt(page) || 1); 
  const [isReversed, setIsReversed] = useState(false);
  const [limit, setLimit] = useState(6);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredData, setFilteredData] = useState(null);
  const { data, setData, loading, error, totalblogs } = useFetch(`http://localhost:3000/all-blogs?page=${currentPage}&limit=${limit}`, [currentPage, limit]);

  useEffect(() => {
    if (searchQuery) {
      const filtered = data.results.filter(blog =>
        blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        blog.body.toLowerCase().includes(searchQuery.toLowerCase()) ||
        blog.author.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredData({ ...data, results: filtered });
    } else {
      setFilteredData(data);
    }
  }, [searchQuery, data]);

  const handleChange = (value) => {
    setSearchQuery(value);
  };

  if (loading) {
    return <Loading />;
  }
  if (error) { 
    return <Error />;
  }

  return (
    <section className="px-4 py-24 mx-auto max-w-7xl">
      <div>
        <h2 className="mb-2 text-3xl font-extrabold leading-tight text-gray-900">
        Our Stories
      </h2>
      <div className="flex justify-between mb-4">
        <p className="mb-2 text-lg text-gray-500">
          Comes directly from the desk of bloggers, creators and writers at Blog.
        </p>
        <div className="flex gap-2">
        <Button
          variant="secondary"
          kind="flat"
          size="small"
          colorMode="dark"
          onClick={() => handlelimit(setLimit, limit)}
          disabled={limit === 6 && page > 5}
        >
          {limit === 6 ? 'See All' : 'See Less'}
        </Button>
        <Button
          variant="secondary"
          kind="flat"
          size="small"
          colorMode="dark"
          onClick={() => handleReverse(data, setData, setIsReversed, isReversed)}
        >
          {isReversed ? 'Newest' : 'Oldest'}
        </Button>
        </div>
      </div>
      
      <div className="mb-8">
        <SearchBar
          iconUrl="https://cdn-icons-png.flaticon.com/512/482/482631.png"
          placeholder="search here"
          colorConfig={colorGuide.lightComponents.searchBar}
          inputColorConfig={colorGuide.lightComponents.inputFields}
          handleSearchInput={handleChange}
        />
      </div>
      
      </div>
      
      {filteredData && filteredData.results && (
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
          {filteredData.results.map((blog, index) => (
            <div key={index}>
              <Link to={`/blogs/${currentPage}/${blog._id}`}>
                <img
                  src={`../../../images/all-blogs/${blog.image}`}
                  className="object-cover w-full h-56 mb-5 bg-center rounded"
                  alt={blog.title}
                  loading="lazy"
                />
              </Link>
              <h2 className="mb-2 text-lg font-semibold text-gray-900">
                <Link
                  to={`/blogs/${currentPage}/${blog._id}`}
                  className="text-gray-900 hover:text-purple-700"
                >
                  {blog.title}
                </Link>
              </h2>
              <p className="mb-3 text-sm font-normal line-clamp-3 text-gray-500">
                {blog.body}
              </p>
              <p className="mb-3 text-sm font-normal text-gray-500">
                <span className="font-medium text-gray-900 hover:text-purple-700">
                  {blog.author}
                </span>
                • {blog.date}
              </p>
            </div>
          ))}
        </div>
      )}
      
      <div className="flex flex-col items-center justify-center mt-20 space-x-0 space-y-2 md:space-x-2 md:space-y-0 md:flex-row">
        {currentPage > 1 && (
          <Button
            variant="primary"
            kind="flat"
            size="big"
            colorMode="dark"
            onClick={() => handlePreviousClick(setCurrentPage, currentPage, navigate)}
          >
            Previous Page
          </Button>
        )}
        {data.results.length === limit && totalblogs < 60 && (
          <Button
            variant="secondary"
            kind="elevated"
            size="big"
            colorMode="dark"
            onClick={() => handleNextClick(setCurrentPage, currentPage, navigate)}
          >
            Next Page
          </Button>
        )}
      </div>
    </section>
  );
};

export default AllBlogs;
