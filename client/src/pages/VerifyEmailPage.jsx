import React, { useEffect, useState } from "react";
import img from "../assets/image.jpeg";
import { useLocation, useNavigate } from "react-router-dom";
import api from "../utils/api";

const VerifyEmailPage = () => {
  const location = useLocation();
  const email = location.state?.email;
  const navigate = useNavigate();
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (count > 0) {
      const timer = setTimeout(() => {
        setCount((p) => p - 1);
      }, 1000);

      if (count <= 0) return () => clearTimeout(timer);

      return () => clearTimeout(timer)
    }
  }, [count]);

  const sendEmail = () => {
    setCount(60);
    api
      .post("auth/accounts/activation/", {
        email: email,
      })
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    if (!email) navigate("/");
  }, []);

  return (
    <div className="min-h-screen flex justify-center items-center">
      <div className="flex flex-col gap-2 items-center">
        <img src={img} alt="email verify image" className="h-[16rem]" />
        <h1 className="text-2xl font-medium text-center">Almost Done!</h1>
        <h2 className="text-center">
          A verification mail has been sent to{" "}
          <span className="font-semibold">{email}</span>
        </h2>

        <p className="mt-1 text-center">
          Please check your email and follow the link to activate your account.
          Thank You.
        </p>

        <button
          disabled={count > 0}
          className="p-3 bg-blue-200 uppercase px-8 text-blue-600 mt-3 font-semibold tracking-widest enabled:hover:bg-blue-300 enabled:hover:text-blue-800 enabled:active:brightness-90 rounded-md
          disabled:bg-slate-300 disabled:text-gray-500"
          onClick={sendEmail}
        >
          Resend Email
        </button>
        {count > 0 && <p className="text-sm font-medium">( You can resend again after {count} seconds )</p>}
      </div>
    </div>
  );
};

export default VerifyEmailPage;
