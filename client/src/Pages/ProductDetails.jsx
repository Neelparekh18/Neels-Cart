import React, { useEffect, useState } from "react";
import Layout from "../Components/Layouts/Layout";
import axios from "axios";
import { useParams } from "react-router-dom";

const ProductDetails = () => {
  const params = useParams();
  const [product, setProduct] = useState({});
  const [relatedProduct, setRelatedProduct] = useState([]);

  // Fetch similar products
  const getSimilarProduct = async (pid, cid) => {
    try {
      const res = await axios.get(
        `/api/v1/product/related-product/${pid}/${cid}`
      );
      if (res && res.data?.success) {
        setRelatedProduct(res.data?.data);
      } else {
        console.log(res.data?.message);
      }
    } catch (error) {
      console.log(error.response.data.message);
    }
  };

  // Fetch product details
  const getProduct = async () => {
    try {
      const res = await axios.get(`/api/v1/product/get-product/${params.slug}`);
      if (res && res.data?.success) {
        setProduct(res.data?.data);
        getSimilarProduct(res.data?.data._id, res.data?.data.category?._id);
      }
    } catch (error) {
      console.log(error.response?.data.message);
    }
  };

  useEffect(() => {
    if (params?.slug) getProduct();
  }, [params.slug]);

  return (
    <Layout>
      <div className="container mt-4">
        <div className="row">
          <div className="col-md-6">
            <img
              src={`/api/v1/product/product-photo/${product._id}`}
              className="img-fluid rounded"
              alt={product.name}
            />
          </div>
          <div className="col-md-6">
            <h1 className="mb-4">{product.name}</h1>
            <p className="lead">{product.description}</p>
            <p className="lead">Price: ₹{product.price}</p>
            <p className="lead">Category: {product.category?.name}</p>
            <button className="btn btn-primary mt-3">Add to Cart</button>
          </div>
        </div>

        <hr />

        <h2 className="mt-4">Similar Products</h2>
        {relatedProduct.length<1 ? "no similar product found":""}
        <div className="row">
          {relatedProduct.map((p) => (
            <div className="col-md-3" key={p._id}>
              <div className="card mb-4">
                <img
                  src={`/api/v1/product/product-photo/${p._id}`}
                  className="card-img-top"
                  alt={p.name}
                />
                <div className="card-body">
                  <h5 className="card-title">{p.name}</h5>
                  <p className="card-text">{p.description.substring(0, 50)}...</p>
                  <p className="card-text">₹{p.price}</p>
                  <button className="btn btn-secondary">Add to Cart</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default ProductDetails;
