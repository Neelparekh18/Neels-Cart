import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const Spinnerload = ({path = "login"}) => {
  const [count, setCount] = useState(5);
  const navigate = useNavigate();
  const localtion = useLocation();

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prevValue) => --prevValue);
    }, 1000);
    count === 0 && navigate(`/${path}`,{
      state:localtion.pathname
    });

    return () => clearInterval(interval);
  }, [count, navigate,localtion,path]);
  return (
    <>
      <div
        className="d-flex flex-column justify-content-center align-items-center"
        style={{ height: "100vh" }}
      >
        <h1 className="text-center">
          redirecting to you in {count} seconds...
        </h1>
        <div className="spinner-border" role="status">
          <span className="sr-only"></span>
        </div>
      </div>
    </>
  );
};

export default Spinnerload;
