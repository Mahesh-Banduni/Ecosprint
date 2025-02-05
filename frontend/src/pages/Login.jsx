import { useState } from "react";
import { loginUser } from "../utils/api";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await loginUser({ email, password });
      alert("Login successful!");
      navigate("/");
    } catch (error) {
      console.error("Login error:", error);
      alert("Login failed. Please check your credentials.");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-900">
      <form 
        className="bg-gray-800 p-8 rounded-lg w-full max-w-md"
        onSubmit={handleLogin}
      >
        <h2 className="text-white text-2xl mb-6 text-center">Login</h2>
        <div className="mb-4">
          <label className="block text-white mb-2">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 rounded-md bg-gray-700 text-white"
            placeholder="Enter your email"
          />
        </div>
        <div className="mb-4">
          <label className="block text-white mb-2">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 rounded-md bg-gray-700 text-white"
            placeholder="Enter your password"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-600 w-full py-2 rounded-md text-white font-bold">
          Login
        </button>
        <p className="text-center text-gray-400 mt-4">
          Don't have an account? <Link to="/register" className="text-blue-400">Register</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
