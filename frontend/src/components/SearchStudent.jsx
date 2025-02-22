import React, { useState, useCallback } from "react";
import { useDispatch } from "react-redux";
import { fetchStudents, searchStudents } from "../App/studentsSlice";
import { debounce } from "lodash";

const SearchStudent = () => {
  const [query, setQuery] = useState("");
  const dispatch = useDispatch();

  // Debounced search function
  const debouncedSearch = useCallback(
    debounce((searchTerm) => {
      if (searchTerm.trim()) {
        dispatch(searchStudents(searchTerm));
      }else{
        dispatch(fetchStudents())
      }
    }, 500), // 300ms debounce time
    [dispatch]
  );

  const handleSearch = (e) => {
    const searchValue = e.target.value;
    setQuery(searchValue);
    debouncedSearch(searchValue);
  };

  return (
    <div className="p-5">
      <h2 className="text-lg font-semibold mb-3">Search Students</h2>
      <input
        className="p-2 border rounded w-full mb-2"
        type="text"
        placeholder="Search by name..."
        value={query}
        onChange={handleSearch}
      />
    </div>
  );
};

export default SearchStudent;
