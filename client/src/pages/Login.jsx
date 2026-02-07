import React, { useState } from "react"
import { useNavigate, Link, useLocation } from "react-router-dom"
import { useDispatch } from "react-redux";
import api from "../api/axios"


const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const location = useLocation()
  const isLogin = location.pathname === "/login"

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")

    if (!email || !password) {
      setError("All fields required")
      return
    }

    try {
      const url = isLogin
        ? "api/auth/login"
        : "api/auth/register"

      const res = await api.post(`${process.env.BASE_URL}/${url}`, {
        email,
        password,
      })

      // Store login info (used by Checkout.jsx)
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("currentUser", JSON.stringify(res.data.user));

      // notify navbar or other components
      window.dispatchEvent(new Event("user-updated"))
      navigate("/")
      // localStorage.setItem("token", res.data.token);
      // localStorage.setItem("currentUser", JSON.stringify(res.data.user));

      // // Update Redux state
      // // dispatch(loginSuccess(res.data.user));
      // navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong")
    }
  }

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="border p-8 w-[350px] shadow-lg">
        <h2 className="text-2xl font-bold mb-4">
          {isLogin ? "Login" : "Register"}
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
          <input
            type="email"
            placeholder="Email"
            className="border p-2"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            className="border p-2"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {error && <p className="text-red-500 mb-2">{error}</p>}

          {error && isLogin && (
            <p className="text-sm mt-1">
             <Link to="/forgot-password" className="text-blue-600">
               Forgot password?
             </Link>
            </p>
          )}


          <button className="bg-black text-white py-2">
            {isLogin ? "Login" : "Register"}
          </button>
        </form>

        <p className="mt-4 text-sm">
          {isLogin ? "New user?" : "Already have account?"}{" "}
          <Link
            to={isLogin ? "/register" : "/login"}
            className="text-blue-600"
          >
            {isLogin ? "Register" : "Login"}
          </Link>
        </p>
      </div>
    </div>
  )
}

export default Login
