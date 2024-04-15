import React, { useState, useEffect } from "react";
import Layout from "../Components/Layouts/Layout";
import { toast } from "react-toastify";
import axios from "axios";
import { Checkbox, Radio } from "antd";
import { Prices } from "../Components/Prices";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);

  // Get all categories
  const getAllCategories = async () => {
    try {
      const res = await axios.get("/api/v1/category/getAll-categories");
      // const res = await axios.get("/api/v1/category/getAll-categories", {timeout:5000});
      if (res && res.data?.success) {
        console.log(res.data?.data)
        setCategories(res.data?.data);
      }
    } catch (error) {
      console.log(error);
      toast.error(
        error.response.data.message ||
          "Something went wrong while getting categories"
      );
    }
  };

  useEffect(() => {
    getAllCategories();
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Get all products
  const getAllProducts = async () => {
    try {
      const res = await axios.get("/api/v1/product/get-products");
      if (res && res.data?.success) {
        setProducts(res.data?.data);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    if (!checked.length && !radio.length) getAllProducts();
  }, [checked.length, radio.length]);

  // Filter by category
  const handleFilter = (value, id) => {
    let all = [...checked];
    if (value) {
      all.push(id);
    } else {
      all = all.filter((c) => c !== id);
    }
    setChecked(all);
  };

  // Get filtered products
  const filteredProduct = async () => {
    try {
      const res = await axios.post("/api/v1/product/product-filter", {
        checked,
        radio,
      });
      console.log(res.data);
      if (res && res.data?.success) {
        setProducts(res.data?.data);
      } else {
        toast.error(res.data?.message || "Something went wrong!");
      }
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message);
    }
  };

  useEffect(() => {
    if (checked.length || radio.length) filteredProduct();
  }, [checked, radio]);

  return (
    <Layout>
      <div className="container mt-4">
        <div className="row">
          <div className="col-md-2" >
            <h4 className="text-center mt-3">Filter By Category</h4>
            <div className="d-flex flex-column">
              {categories.map((c) => (
                <Checkbox
                  key={c._id}
                  onChange={(e) => handleFilter(e.target.checked, c._id)}
                >
                  <label>{c.name}</label>
                </Checkbox>
              ))}
            </div>
            <h4 className="text-center mt-4">Filter By Price</h4> 
            <div className="d-flex flex-column">
              <Radio.Group onChange={(e) => setRadio(e.target.value)}>
                {Prices?.map((p) => (
                  <div key={p._id}>
                    <Radio value={p.array}>{p.price}</Radio>
                  </div>
                ))}
              </Radio.Group>
            </div>
            <div className="d-flex flex-column mt-3">
              <button
                className="btn btn-danger"
                onClick={() => window.location.reload()}
              >
                Reset Filters
              </button>
            </div>
          </div>
          <div className="col-md-10" >
            <h1 className="text-center">All Products</h1>
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
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;

// import React, { useState, useEffect } from "react";
// import Layout from "../Components/Layouts/Layout";
// import { toast } from "react-toastify";
// import axios from "axios";
// import { Checkbox, Radio } from "antd";
// import { Prices } from "../Components/Prices";
// import { useNavigate } from "react-router-dom";
// const HomePage = () => {
//   const navigate = useNavigate();

//   const [products, setProducts] = useState([]);
//   const [categories, setCategories] = useState([]);
//   const [checked, setChecked] = useState([]);
//   const [radio, setRadio] = useState([]);

//   //get All categories
//   const getAllCategories = async () => {
//     try {
//       const res = await axios.get("/api/v1/category/getAll-categories");
//       if (res && res.data?.success) {
//         // console.log(res.data.data);
//         setCategories(res.data?.data);
//       }
//     } catch (error) {
//       console.log(error);
//       toast.error(
//         error.response.data.message ||
//           "Something went wrong while getting categories"
//       );
//     }
//   };

//   useEffect(() => {
//     getAllCategories();
//     //eslint-disable-next-line react-hooks/exhaustive-deps
//   }, []);

//   //get Products
//   const getAllProducts = async () => {
//     try {
//       const res = await axios.get("/api/v1/product/get-products");
//       if (res && res.data?.success) {
//         setProducts(res.data?.data);
//         // console.log(res);
//       }
//     } catch (error) {
//       console.log(error);
//       toast.error(error.response.data.message);
//     }
//   };

//   useEffect(() => {
//     if (!checked.length && !radio.length) getAllProducts();
//   }, [checked.length, radio.length]);

//   //filter by category
//   const handleFilter = (value, id) => {
//     let all = [...checked];
//     if (value) {
//       all.push(id);
//     } else {
//       all = all.filter((c) => c !== id);
//     }
//     setChecked(all);
//     // console.log(checked)
//   };

//   //get filtered product
//   const filteredProduct = async () => {
//     try {
//       const res = await axios.post("/api/v1/product/product-filter", {
//         checked,
//         radio,
//       });
//       if (res && res.data?.success) {
//         setProducts(res.data?.data);
//       } else {
//         toast.error(res.data?.message || "Something went wrong!");
//       }
//     } catch (error) {
//       console.log(error);
//       toast.error(error.response.data?.message);
//     }
//   };
//   useEffect(() => {
//     if (checked.length || radio.length) filteredProduct();
//   }, [checked, radio]);

//   // //get photo
//   // const getPhoto = async () => {
//   //   const res = await axios.get(
//   //     `/api/v1/product/product-photo/660aaee7fde95f816a651058`
//   //   );
//   //   if (res) {
//   //     console.log(res.data);
//   //   }
//   // };
//   // useEffect(() => {
//   //   getPhoto();
//   // }, []);
//   return (
//     // <Layout title={"All Products - Best offers"}>
//     <Layout>
//       <div className="row mt-3">
//         <div className="col-md-2 ms-2">
//           <h4 className="text-center">Filter By Category</h4>
//           <div className="d-flex flex-column">
//             {categories.map((c) => (
//               <Checkbox
//                 key={c._id}
//                 onChange={(e) => handleFilter(e.target.checked, c._id)}
//               >
//                 <label>{c.name}</label>
//               </Checkbox>
//             ))}
//           </div>
//           <h4 className="text-center">Filter By Price</h4>
//           <div className="d-flex flex-column">
//             <Radio.Group onChange={(e) => setRadio(e.target.value)}>
//               {Prices?.map((p) => (
//                 <div key={p._id}>
//                   <Radio value={p.array}>{p.price}</Radio>
//                 </div>
//               ))}
//             </Radio.Group>
//           </div>
//           <div className="d-flex flex-column mt-3">
//             <button
//               className="btn btn-danger"
//               onClick={() => window.location.reload()}
//             >
//               Reset Filters
//             </button>
//           </div>
//         </div>
//         <div className="col-md-9">
//           {/* {JSON.stringify(radio, null, 4)} */}
//           <h1 className="text-center">All Products</h1>
//           <div className="d-flex flex-wrap">
//             {/* <h1 className="mt-3">Products</h1> */}
//             {products.map((p) => (
//               <div className="card m-2" key={p._id} style={{ width: "18rem" }}>
//                 <img
//                   src={`/api/v1/product/product-photo/${p._id}`}
//                   className="card-img-top"
//                   alt={p.name}
//                 />

//                 <div className="card-body">
//                   <h5 className="card-title">{p.name}</h5>
//                   <p className="card-text">
//                     {p.description.substring(0, 33)}...
//                   </p>
//                   <p className="card-text">₹{p.price}</p>
//                   <button
//                     className="btn btn-primary"
//                     onClick={() => navigate(`/product/${p.slug}`)}
//                   >
//                     More Details
//                   </button>
//                   <button className="btn btn-secondary ms-2">
//                     Add to cart
//                   </button>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </Layout>
//   );
// };

// export default HomePage;
