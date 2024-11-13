import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { adminLogin, adminLoginFailure } from "../redux/admin/adminSlice.js";
import { useDispatch, useSelector } from "react-redux";

function AdminLogin() {
  const [formData, setFormData] = useState({});
  const { isLogged } = useSelector((state) => state.admin);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  useEffect(() => {
    if (isLogged) {
      navigate("/admin/dashboard");
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      dispatch(adminLogin(data));
      if (data.success === false) {
        dispatch(adminLoginFailure(data));
        return;
      }
      console.log("succeess");
      navigate("/admin/dashboard");
    } catch (error) {
      dispatch(adminLoginFailure(error));
    }
  };

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7">Admin Login</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Username"
          id="username"
          className="bg-slate-100 p-3 rounded-lg"
          onChange={handleChange}
        />
        <input
          type="password"
          placeholder="Password"
          id="password"
          className="bg-slate-100 p-3 rounded-lg"
          onChange={handleChange}
        />
        <button className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80">
          Log In
        </button>
      </form>
    </div>
  );
}

export default AdminLogin;
