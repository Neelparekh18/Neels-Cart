import React from "react";
import { useSearch } from "../../context/search";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const SearchInput = () => {
  const [values, setValues] = useSearch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.get(
        `/api/v1/product/search-product/${values.keyword}`
      );
      if (res && res.data?.success) {
        setValues({ ...values, results: res.data?.data });
        navigate("/search");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <form className="d-flex" role="search" onSubmit={handleSubmit}>
        <input
          type="search"
          placeholder="search"
          className="form-control me-2"
          value={values.keyword}
          onChange={(e) => setValues({ ...values, keyword: e.target.value })}
        />

        <button className="btn btn-outline-success" type="submit">
          Search
        </button>
      </form>
    </>
  );
};

export default SearchInput;
