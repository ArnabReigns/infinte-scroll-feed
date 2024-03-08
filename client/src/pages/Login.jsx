import React, { useState } from "react";
import InputField from "../components/InputField";
import api from "../utils/api";
import { Link, useNavigate } from "react-router-dom";
import CircularLoading from "../components/CircularLoading";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [verifing, setVerifing] = useState(false);
  const [err, setErr] = useState(null);

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const navigate = useNavigate();

  const login = () => {
    setErr(null);
    if (formData.username != "" && formData.password != "") {
      setLoading(true);
      api
        .post("/auth/login/", {
          username: formData.username,
          password: formData.password,
        })
        .then((e) => {
          navigate("/");
          console.log(e.data);
        })
        .catch((e) => {
          
          if (e.response.data.inactive == true) {
            setVerifing(true);
            api
              .post("auth/accounts/activation/", {
                email: e.response.data.email,
              })
              .then((res) => {
                console.log(res.data);
                navigate("/verify-email", {
                  state: {
                    email: e.response.data.email,
                  },
                });
              })
              .catch((err) => setErr(err.response.data.msg))
              .finally(() => {
                setVerifing(false);
                setLoading(false);
              });
          } else {
            setErr(e.response.data.msg);
          }
          console.log(e.response.data);
        });
    }
  };

  return (
    <div className="p-8 flex justify-center bg-gradient-to-r to-purple-500 from-pink-500 items-center min-h-screen flex-col gap-4">
      <div className="w-full md:w-[35rem] flex-col gap-4 bg-white flex shadow-lg p-6 py-10 rounded-lg">
        <h1 className="text-3xl">Login</h1>
        <InputField
          autoFocus
          label="username"
          placeholder="johndoe"
          name="username"
          onChange={handleChange}
        />
        <InputField
          label={"Password"}
          onChange={handleChange}
          name="password"
          className="md:col-span-2"
          endElement={
            <button type="button" onClick={() => setShowPassword((p) => !p)}>
              <div className="w-[2rem] flex justify-center items-center">
                {showPassword ? (
                  <i className="fa-solid fa-eye text-blue-600"></i>
                ) : (
                  <i className="fa-solid fa-eye-slash text-blue-800"></i>
                )}
              </div>
            </button>
          }
          type={showPassword ? "text" : "password"}
          placeholder="•••••••"
          required
        />

        <div className="flex flex-col">
          {err && (
            <div
              class=" mt-6 p-4 mb-3 text-sm text-red-800 rounded-lg bg-red-100 font-medium"
              role="alert"
            >
              {err}
            </div>
          )}
          <button
            disabled={loading}
            className="text-white bg-gradient-to-r from-blue-500 via-blue-600 px-6
          to-blue-700 enabled:hover:bg-gradient-to-br enabled:active:brightness-75 font-medium rounded-lg py-2.5 text-center flex items-center gap-2 justify-center"
            onClick={login}
          >
            {loading && <CircularLoading />}
            {loading
              ? verifing
                ? "Sending Verification Mail"
                : "Logging In..."
              : "Log In"}
          </button>
        </div>

        <div className="mt-1 text-center text-sm">
          <p>
            Don't have an account?{" "}
            <Link to={"/signup"}>
              <span className="hover:underline text-blue-500 font-semibold cursor-pointer">
                Register
              </span>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
