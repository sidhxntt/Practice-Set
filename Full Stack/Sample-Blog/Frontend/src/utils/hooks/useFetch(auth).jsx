import { useEffect, useState } from "react";
import Cookies from "js-cookie";

const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = Cookies.get("jwt");
        const google_token = Cookies.get("google_jwt")
        setLoading(true);
        const response = await fetch(url, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token||google_token}`,
          },
        });
        if (!response.ok) {
          const errorResponse = await response.json();
          throw new Error(`Error: ${errorResponse.message}`);
        }
        const result = await response.json();
        setData(result);
      } catch (error) {
        setError(error);
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return { data,setData, loading, error };
};

export default useFetch;
