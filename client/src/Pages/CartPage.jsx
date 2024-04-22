// import React from "react";
// import Layout from "../Components/Layouts/Layout";
// import { useCart } from "../context/cart";
// import { useAuth } from "../context/auth";
// import { json, useNavigate } from "react-router-dom";
// const CartPage = () => {
//   const [cart, setCart] = useCart();
//   const [auth, setAuth] = useAuth();
//   const navigate = useNavigate();

//   //total price
//   const totalPrice = () => {
//     try {
//       let total = 0;
//       cart?.map((item) => {
//         total = total + item?.price;
//       });
//       return total.toLocaleString("en-IN", {
//         style:"currency",
//         currency: "INR"
//       })
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   //delete item
//   const removeCartItem = async (pid) => {
//     try {
//       let myCart = [...cart];
//       let index = myCart.findIndex((item) => item._id === pid);
//       myCart.splice(index, 1);
//       setCart(myCart);
//       localStorage.setItem("cart", JSON.stringify(myCart));
//     } catch (error) {
//       console.log(error);
//     }
//   };
//   return (
//     <>
//       <Layout>
//         <div className="container">
//           <div className="row">
//             <div className="col-md-12">
//               <h1 className="text-center bg-light p-2">
//                 {`Hello ${auth?.token && auth?.user?.name}`}
//               </h1>
//               <h4 className="text-center">
//                 {cart?.length
//                   ? `you have ${cart?.length} items in your cart ${
//                       auth?.token ? "" : "please login to checkout"
//                     }`
//                   : "Your cart is empty"}
//               </h4>
//             </div>
//           </div>
//           <div className="row">
//             <div className="col-md-8">
//               {cart?.map((p) => (
//                 <div className="row mb-2 p-3 card flex-row">
//                   <div className="col-md-4">
//                     <img
//                       src={`/api/v1/product/product-photo/${p._id}`}
//                       className="card-img-top"
//                       alt={p.name}
//                     />
//                   </div>
//                   <div className="col-md-8">
//                     <p>{p.name}</p>
//                     <p>{p.description.substring(0, 30)}</p>
//                     <p>{p.price}</p>
//                     <button
//                       className="btn btn-danger"
//                       onClick={() => removeCartItem(p._id)}
//                     >
//                       Remove
//                     </button>
//                   </div>
//                 </div>
//               ))}
//             </div>
//             <div className="col-md-4 text-center">
//               <h4>Cart Summary</h4>
//               <p>Total | checkout | payment</p>
//               <hr />
//               <h4>Total: {totalPrice()}</h4>
//             </div>
//           </div>
//         </div>
//       </Layout>
//     </>
//   );
// };

// export default CartPage;

import React from "react";
import Layout from "../Components/Layouts/Layout";
import { useCart } from "../context/cart";
import { useAuth } from "../context/auth";
import { useNavigate } from "react-router-dom";

const CartPage = () => {
  const [cart, setCart] = useCart();
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();

  // Total price
  const totalPrice = () => {
    let total = 0;
    cart?.forEach((item) => {
      total += item?.price;
    });
    return total.toLocaleString("en-IN", {
      style: "currency",
      currency: "INR",
    });
  };

  // Remove item from cart
  const removeCartItem = (pid) => {
    const updatedCart = cart.filter((item) => item._id !== pid);
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  return (
    <Layout>
      <div className="container py-5">
        <h1 className="text-center mb-4">Your Cart</h1>
        <h4 className="text-center mb-4">
          {cart?.length
            ? `You have ${cart?.length} items in your cart ${
                auth?.token ? "" : "please login to checkout"
              }`
            : "Your cart is empty"}
        </h4>
        <div className="row">
          <div className="col-md-8">
            {cart?.map((item) => (
              <div key={item._id} className="card mb-3">
                <div className="row g-0">
                  <div className="col-md-4">
                    <img
                      src={`/api/v1/product/product-photo/${item._id}`}
                      className="img-fluid rounded-start"
                      alt={item.name}
                    />
                  </div>
                  <div className="col-md-8">
                    <div className="card-body">
                      <h5 className="card-title">{item.name}</h5>
                      <p className="card-text">
                        {item.description.substring(0, 100)}
                      </p>
                      <p className="card-text">Price: ₹{item.price}</p>
                      <button
                        className="btn btn-danger"
                        onClick={() => removeCartItem(item._id)}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="col-md-4">
            <div className="card mb-3">
              <div className="card-body">
                <h5 className="card-title">Cart Summary</h5>
                <hr />
                <h6 className="card-subtitle mb-2 text-muted">
                  Total: {totalPrice()}
                </h6>
                <button
                  className="btn btn-primary me-2"
                  onClick={() => navigate("/checkout")}
                >
                  Proceed to Checkout
                </button>
                <button className="btn btn-secondary">Continue Shopping</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CartPage;
