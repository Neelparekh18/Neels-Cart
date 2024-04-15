import React, { useState } from "react";
import Layout from "../../Components/Layouts/Layout";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [answer, setAnswer] = useState("");
  const [newPassword, setnewPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`/api/v1/users/forgot-password`, {
        email,
        answer,
        newPassword,
      });
      console.log(res);
      // console.log( res.data);
      if (res && res.data.success) {
        toast.success(res.data.message);
        // navigate(location.state || "/");
        navigate("/login");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.message);
      }
      console.log(error);
    }
  };
  return (
    <>
      <Layout title={"forgot-password - Neels Cart"}>
        <div className="register">
          <h1>Reset Password</h1>

          <form onSubmit={handleSubmit}>
            <div className="form-group mb-3 ">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="form-control"
                id="exampleInputEmail"
                placeholder="Enter email"
                required
              />
            </div>
            <div className="form-group mb-3 ">
              <input
                type="text"
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                className="form-control"
                id="exampleInputAddress"
                placeholder="Enter your favorite sport"
                required
              />
            </div>
            <div className="form-group mb-3 ">
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setnewPassword(e.target.value)}
                className="form-control"
                id="exampleInputPassword"
                placeholder="Enter New Password"
                required
              />
            </div>

            <button type="submit" className="btn btn-primary">
              Reset Password
            </button>
          </form>
        </div>
      </Layout>
    </>
  );
};

export default ForgotPassword;
