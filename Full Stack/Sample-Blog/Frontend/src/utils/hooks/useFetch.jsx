import { useState, useEffect } from "react";

const useFetch = (url, dependencies = []) => {
  const [data, setData] = useState({ results: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalblogs, setTotalBlogs] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await fetch(url);
        if (!res.ok) {
          const errorResponse = await res.json();
          throw new Error(`Error: ${errorResponse.message}`);
        }
        const result = await res.json();
        setData(result);
        setTotalBlogs(result.total);
      } catch (error) {
        setError(error);
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, dependencies);

  return { data, setData, loading, error, totalblogs };
};

export default useFetch;
