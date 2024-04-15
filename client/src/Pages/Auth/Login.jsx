import React, { useState } from "react";
import Layout from "../../Components/Layouts/Layout";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { useAuth } from "../../context/auth";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`/api/v1/users/login`, {
        email,
        password,
      });
      console.log(res);
      // console.log( res.data);
      if (res && res.data.success) {
        toast.success(res.data.message);
        localStorage.setItem("auth", JSON.stringify(res.data));
        setAuth({
          ...auth,
          user: res.data.data,
          token: res.data.token,
        });
        navigate(location.state || "/");
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
      <Layout title={"sign in - Neels Cart"}>
        <div className="register">
          <h1>Login form</h1>

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
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="form-control"
                id="exampleInputPassword"
                placeholder="Enter Password"
                required
              />
            </div>

            <div>
              <button
                type="button"
                onClick={() => {
                  navigate("/forgot-password");
                }}
                className="btn btn-primary mb-2"
              >
                forgot password
              </button>
            </div>
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </form>
        </div>
      </Layout>
    </>
  );
};

export default Register;
