import { useState } from "react";
import { registerUser } from "../utils/api";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await registerUser({ name, email, password });
      alert("Registration successful!");
      navigate("/login");
    } catch (error) {
      alert("Registration failed. Please try again.");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-900">
      <form 
        className="bg-gray-800 p-8 rounded-lg w-full max-w-md"
        onSubmit={handleRegister}
      >
        <h2 className="text-white text-2xl mb-6 text-center">Register</h2>
        <div className="mb-4">
          <label className="block text-white mb-2">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 rounded-md bg-gray-700 text-white"
            placeholder="Enter your name"
          />
        </div>
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
          Register
        </button>
        <p className="text-center text-gray-400 mt-4">
          Already have an account? <a href="/login" className="text-blue-400">Login</a>
        </p>
      </form>
    </div>
  );
};

export default Register;
