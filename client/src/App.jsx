import { useContext, useEffect, useState } from "react";
import "./App.css";
import { Outlet, Route, Routes, useNavigate } from "react-router-dom";
import Register from "./pages/Register";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import api from "./utils/api";
import { appContext } from "./context/AppContext";
import VerifyEmailPage from "./pages/VerifyEmailPage";

const Protected = () => {
  const [loading, setLoading] = useState(true);
  const nav = useNavigate();

  const ctx = useContext(appContext);

  useEffect(() => {
    let timer;

    api
      .get("/auth/accounts/me")
      .then((res) => {
        console.log(res.data);
        ctx.setUser(res.data.user);
      })
      .catch((err) => {
        nav("/login");
      })
      .finally(() => {
        setLoading(false);
      });
    return () => clearTimeout(timer);
  }, []);
  return loading ? (
    <div className="flex items-center gap-2 justify-center min-h-screen p-5 bg-gray-100 min-w-screen *:animate-pulse">
      <div className="w-3 h-3 bg-gray-500 rounded-full"></div>
      <div className="w-3 h-3 bg-gray-500 rounded-full"></div>
      <div className="w-3 h-3 bg-gray-500 rounded-full"></div>
    </div>
  ) : (
    <div className="min-h-screen">
      <Outlet />
    </div>
  );
};

function App() {
  return (
    <>
      <Routes>
        <Route path="/" Component={Protected}>
          <Route index Component={Home} />
        </Route>
        <Route path="/login" Component={Login} />
        <Route path="/signup" Component={Register} />
        <Route path="/verify-email" Component={VerifyEmailPage} />
        <Route path="*" Component={NotFound} />
      </Routes>
    </>
  );
}

export default App;
   