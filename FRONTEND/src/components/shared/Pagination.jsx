"use client";

import { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";

const Pagination = ({ itemsPerPage, setOffSet, count, offset }) => {
  // const pageCount = Math.ceil(count / itemsPerPage);

  const [pageCount, setPageCount] = useState(0);

  const handlePageClick = (event) => {
    const newOffset = (event?.selected * itemsPerPage) % count;

    setOffSet(newOffset);
  };

  useEffect(() => {
    setPageCount(Math.ceil(count / itemsPerPage));
  }, [count]);

  return (
    <div>
      <ReactPaginate
        forcePage={offset / itemsPerPage}
        breakLabel="..."
        nextLabel=">"
        onPageChange={handlePageClick}
        pageRangeDisplayed={4}
        pageCount={pageCount}
        previousLabel="<"
        className="flex justify-center items-center w-full select-none gap-2 text-black"
        pageLinkClassName="w-10 h-10 rounded-full flex items-center justify-center border border-[#ecedee] bg-[#112240] text-white hover:bg-[#1e3a8a] transition-colors"
        activeLinkClassName="w-10 h-10 rounded-full flex items-center justify-center bg-gray-600 border border-[#ecedee] text-black hover:bg-[#1e3a8a] hover:text-white  transition-colors"
        previousLinkClassName="w-10 h-10 rounded-full flex items-center justify-center border border-[#ecedee] bg-[#112240] text-white hover:bg-[#1e3a8a] transition-colors"
        nextLinkClassName="w-10 h-10 rounded-full flex items-center justify-center border border-[#ecedee] bg-[#112240] text-white hover:bg-[#1e3a8a] transition-colors"
        disabledLinkClassName="opacity-50 cursor-not-allowed"
      />
    </div>
  );
};

export default Pagination;
