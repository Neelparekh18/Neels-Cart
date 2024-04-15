import React from "react";
import Layout from "../Components/Layouts/Layout";
import { useSearch } from "../context/search";
const Search = () => {
  const [values, setValues] = useSearch();
  return (
    <>
      <Layout>
        <div className="container">
          <div className="text-center">
            <h1>Search results</h1>
            <h6>
              {values?.results.length < 1
                ? "No search yet"
                : `found ${values?.results.length}`}{" "}
            </h6>
            <div className="d-flex flex-wrap mt-5">
            {/* <h1 className="mt-3">Products</h1> */}
            {values?.results.map((p) => (
              <div className="card m-2" style={{ width: "18rem" }}>
                <img
                  src={`/api/v1/product/product-photo/${p._id}`}
                  className="card-img-top"
                  alt={p.name}
                />

                <div className="card-body">
                  <h5 className="card-title">{p.name}</h5>
                  <p className="card-text">
                    {p.description.substring(0, 33)}...
                  </p>
                  <p className="card-text">₹{p.price}</p>
                  <button className="btn btn-primary">More Details</button>
                  <button className="btn btn-secondary ms-2">
                    Add to cart
                  </button>
                </div>
              </div>
            ))}
          </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default Search;
