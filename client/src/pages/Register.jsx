import React, { useEffect, useRef, useState } from "react";
import InputField from "../components/InputField";
import api from "../utils/api";
import CircularLoading from "../components/CircularLoading";
import validator from "validator";
import useCheckUsername from "../hooks/useCheckUsername";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  // setting up states
  const [username, setUsername] = useState("");
  const [fname, setFName] = useState("");
  const [lname, setLName] = useState("");
  const [email, setEmail] = useState("");
  const [checked, setChecked] = useState(false);
  const [password, setPassword] = useState("");
  const [cPassword, setCPassword] = useState("");
  const [showPassword, setShowPasswod] = useState(false);
  const [showCPassword, setCShowPasswod] = useState(false);
  const [err, setErr] = useState(null);
  const [info, setInfo] = useState(null);

  const [isLoading, setIsLoading] = useState(false);

  //  checking availability of username
  const {
    usernameLoader,
    usernameAvailabel,
    setUsernameHelperText,
    usernamehelperText,
  } = useCheckUsername(username);

  // register user
  const register = () => {
    setErr(null);
    if ([username, fname, lname, email, password].includes("")) return;

    if (username.length < 6)
      return setErr("Username must be at least 6 characters long");

    if (
      !validator.isStrongPassword(password, {
        minLength: 6,
      })
    )
      return setErr("Please enter a strong password");

    if (!validator.isEmail(email)) return setErr("Please enter a valid email");

    if (password != cPassword)
      return setErr("Confirm Password is not matching");

    setIsLoading(true);
    api
      .post("/auth/register/", {
        email,
        username,
        first_name: fname,
        last_name: lname,
        password,
      })
      .then((e) => {
        console.log(e.data);
        if (!e.data.emailsent) navigate("/");
        else
          navigate("/verify-email", {
            state: {
              email: email,
            },
          });
      })
      .catch((e) => {
        setErr(e.response.data.msg);
        console.log(e.response.data);
      })
      .finally(() => setIsLoading(false));
  };

  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-white flex w-full">
      <div className="hidden sm:block flex-[1] bg-gradient-to-r from-purple-500 to-pink-500"></div>

      <div className="flex-1 ">
        <div className="md:px-[5rem] md:pt-[2rem] p-8 flex flex-col gap-2">
          <h1 className="text-[2.5rem] font-semibold mb-5">Sign Up</h1>

          <form
            className="grid md:grid-cols-2 grid-cols-1 gap-3 w-full"
            onSubmit={(e) => {
              e.preventDefault();
              register(e);
            }}
          >
            <InputField
              autoFocus
              label={"First Name"}
              placeholder="John "
              inputClassName={"capitalize"}
              onChange={(e) => setFName(e.target.value)}
              required
            />

            <InputField
              label={"Last Name"}
              placeholder="Doe"
              inputClassName={"capitalize"}
              onChange={(e) => setLName(e.target.value)}
              required
            />

            <div className="md:col-span-2">
              <InputField
                label={"Username"}
                name="username"
                placeholder="johndoe"
                onChange={(e) => {
                  setUsernameHelperText(null);
                  setUsername(
                    e.target.value.toLowerCase().replaceAll(" ", "_")
                  );
                }}
                value={username}
                inputClassName={"lowercase"}
                required
                helperText={!usernameLoader && usernamehelperText?.msg}
                helperColor={usernamehelperText?.color}
              />
              {usernameLoader && (
                <div className="flex gap-1 items-center">
                  <CircularLoading size="15px" color={"#2F72F0"} />
                  <p className="text-xs">checking</p>
                </div>
              )}
            </div>

            <InputField
              className="md:col-span-2"
              label={"Email"}
              name="email"
              placeholder="jogndoe@gmail.com"
              required
              type="email"
              onChange={(e) => setEmail(e.target.value)}
            />

            <InputField
              label={"Password"}
              className=""
              endElement={
                <button type="button" onClick={() => setShowPasswod((p) => !p)}>
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
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <InputField
              label={"New Password"}
              className=""
              endElement={
                <button
                  type="button"
                  onClick={() => setCShowPasswod((p) => !p)}
                >
                  <div className="w-[2rem] flex justify-center items-center">
                    {showCPassword ? (
                      <i className="fa-solid fa-eye text-blue-600"></i>
                    ) : (
                      <i className="fa-solid fa-eye-slash text-blue-800"></i>
                    )}
                  </div>
                </button>
              }
              type={showCPassword ? "text" : "password"}
              placeholder="•••••••"
              onChange={(e) => setCPassword(e.target.value)}
              required
            />

            <div className="inline-flex items-center mt-2 md:col-span-2">
              <label
                className="relative flex items-center rounded-full cursor-pointer"
                htmlFor="blue"
              >
                <input
                  onChange={(e) => setChecked(e.target.checked)}
                  value={checked}
                  type="checkbox"
                  className="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-md border-2 border-slate-300 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-blue-500 checked:bg-blue-500 checked:before:bg-blue-500 "
                  id="blue"
                />
                <span className="absolute text-white transition-opacity opacity-0 pointer-events-none top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 peer-checked:opacity-100">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-3.5 w-3.5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    stroke="currentColor"
                    strokeWidth="1"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                </span>
              </label>
              <p className="ml-2 text-sm">
                Accept{" "}
                <span className="hover:underline font-medium cursor-pointer">
                  terms and conditions
                </span>
              </p>
            </div>

            <div className="flex flex-col md:col-span-2 mt-4">
              {err && (
                <div
                  className=" mt-6 p-4 mb-3 text-sm text-red-800 rounded-lg bg-red-100 font-medium"
                  role="alert"
                >
                  {err}
                </div>
              )}

              <button
                disabled={!usernameAvailabel || isLoading || !checked}
                type="submit"
                className="flex justify-center items-center gap-2 text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br enabled:active:brightness-75 font-medium rounded-lg py-2.5 text-center  disabled:bg-gray-200 disabled:bg-none disabled:text-gray-500"
              >
                {isLoading && <CircularLoading />}
                {isLoading ? "Signing Up..." : "Sign Up"}
              </button>
            </div>

            <div className="mt-1 text-center text-sm md:col-span-2">
              <p>
                Already have an account?{" "}
                <Link to={"/login"}>
                  <span className="hover:underline text-blue-500 font-semibold cursor-pointer">
                    Login
                  </span>
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
