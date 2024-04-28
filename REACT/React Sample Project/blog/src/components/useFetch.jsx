import { useState, useEffect } from 'react';

const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [isPending, setPending] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setTimeout(async () => {
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error("Error! Could not fetch the data");
        } else {
          const data = await response.json();
          setData(data);
          setPending(false);
        }
      } catch (error) {
        setError(error.message);
        setPending(null);
      }
    }, 2000);
  }, [url]); 
  return { data, isPending, error };
};
 
export default useFetch;