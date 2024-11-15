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
        // forcePage={pageCount}
        breakLabel="..."
        nextLabel=">"
        onPageChange={handlePageClick}
        pageRangeDisplayed={4}
        pageCount={pageCount}
        // pageCount={50}
        previousLabel="<"
        // renderOnZeroPageCount={null}
        className="flex justify-center items-center   text-black w-full select-none"
        pageLinkClassName="px-2 md:px-3 py-1 md:py-2 border border-black  cursor-pointer"
        activeLinkClassName="bg-[#000000] text-white"
        previousLinkClassName="px-2 md:px-3 py-1 md:py-2 border  border-black  cursor-pointer"
        nextLinkClassName="px-2 md:px-3 py-1 md:py-2 border  border-black  cursor-pointer"
        disabledLinkClassName="opacity-50 cursor-not-allowed"
      />
    </div>
  );
};

export default Pagination;
