const handleNextClick = ( setCurrentPage, currentPage, navigate) => {
    const nextPage = currentPage + 1;
    navigate(`/blogs/${nextPage}`);
    setCurrentPage(nextPage);
};

const handlePreviousClick = (setCurrentPage, currentPage, navigate) => {
    const previousPage = currentPage - 1;
    navigate(`/blogs/${previousPage}`);
    setCurrentPage(previousPage);
};

const handleReverse = (data, setData, setIsReversed, isReversed) => {
  const reversedResults = [...data.results].reverse();
  setData({ ...data, results: reversedResults });
  setIsReversed(!isReversed);
};

const handlelimit = (setLimit, limit) => {
  if (limit == 6) setLimit(12);
  if (limit == 12) setLimit(6);
};


export { handleNextClick, handlePreviousClick, handleReverse, handlelimit };
