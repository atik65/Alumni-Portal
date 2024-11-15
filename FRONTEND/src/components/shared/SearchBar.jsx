"use client";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import { IoSearch } from "react-icons/io5";

const SearchBar = ({ handleShowSearchBar, showSearchBar }) => {
  const route = useRouter();

  const { values, handleChange, handleSubmit, resetForm } = useFormik({
    initialValues: {
      search: "",
    },
    onSubmit: (values) => {
      handleShowSearchBar(false);
      route.push(`/category/blog?search=${values.search}`);
      // console.log(values);
      resetForm();
    },
  });

  return (
    <div
      onClick={() => {
        handleShowSearchBar(false);
      }}
      className={`fixed top-0 right-0 left-0 bottom-0 bg-[#000000aa]   ${
        showSearchBar
          ? "h-[100vh] w-[100vw] opacity-100 translate-y-0 "
          : "h-0  opacity-0 translate-y-48 "
      } ${
        showSearchBar ? "z-10" : "z-[-1]"
      } transition-all duration-5 overflow-hidden`}
    >
      <div className="bg-black h-[120px] ">
        <form className="w-full" onSubmit={handleSubmit}>
          {/* make a center align search field */}
          <div
            onClick={(e) => {
              e.stopPropagation();
            }}
            style={{
              zIndex: -50,
            }}
            className={`
          ${
            showSearchBar ? "flex " : "hidden"
          } justify-center items-center px-5 sm:px-0 w-full sm:w-3/4 mx-auto  bg-black   pt-6
          `}
          >
            {/* search field */}
            <div className="w-full pt-1 border bg-inherit border-[#8D8787] shadow-md shadow-gray-200 px-5">
              <label htmlFor="search" className=" text-sm">
                Search
              </label>
              <input
                autoFocus={true}
                type="text"
                id="search"
                className="w-full h-[40px]  outline-none bg-inherit  placeholder:font-bold placeholder:text-gray-500"
                placeholder="Search here"
                name="search"
                value={values.search}
                onChange={handleChange}
              />

              {/* {errors.email && touched.email && (
            <p className="text-red-500 text-sm pb-1">{errors.email}</p>
          )} */}
            </div>

            {/* search submit button */}
            <button
              type="submit"
              className=" flex items-center justify-center bg-gradient-to-r from-[#C2CE3B] to-[#60BA08] w-[80px] md:w-[198px]  h-[70px] text-black font-bold "
            >
              <span className="mr-2 md:block hidden">Search</span>

              <IoSearch className="text-2xl" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SearchBar;
