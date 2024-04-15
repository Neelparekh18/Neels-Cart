import React, { useState, useEffect } from "react";
import Layout from "../Components/Layouts/Layout";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";


const CategoryProduct = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState({});
  const getProductsbyCat = async () => {
    try {
      const res = await axios.get(
        `/api/v1/product/product-category/${params.slug}`
      );
      if (res && res.data?.success) {
        setProducts(res.data?.productData);
        // console.log(res.data)
        setCategory(res.data?.categoryData);
        // console.log(res.data.categoryData)
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (params?.slug) getProductsbyCat();
  }, [params?.slug]);
  return (
    <>
      <Layout>
        <div className="container mt-3">
          <h1 className="text-center">Category - {category?.name} </h1>
          <h1 className="text-center">{products?.length} result found</h1>
          <div className="row">
            {/* <div className="col-md-10"> */}
              {/* <h1 className="text-center">All Products</h1> */}
              <div className="row mt-4">
                {products.map((p) => (
                  <div className="col-md-4 mb-3" key={p._id}>
                    <div className="card">
                      <img
                        src={`/api/v1/product/product-photo/${p._id}`}
                        className="card-img-top"
                        alt={p.name}
                      />
                      <div className="card-body">
                        <h5 className="card-title">{p.name}</h5>
                        <p className="card-text">
                          {p.description.substring(0, 50)}...
                        </p>
                        <p className="card-text">₹{p.price}</p>
                        <button
                          className="btn btn-primary"
                          onClick={() => navigate(`/product/${p.slug}`)}
                        >
                          More Details
                        </button>
                        <button className="btn btn-secondary ms-2">
                          Add to cart
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            {/* </div> */}
          </div>
        </div>
      </Layout>
    </>
  );
};

export default CategoryProduct;
