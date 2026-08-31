import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AdminLogin = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // Login credentials
    if (username === "admin@gmail.com" && password === "admin") {
      // Save login status
      localStorage.setItem("adminLoggedIn", "true");

      // Redirect to dashboard
      navigate("/admindashboard");
    } else {
      setError("Invalid username or password");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">

      <div className="w-full max-w-5xl bg-white rounded-2xl shadow-2xl overflow-hidden grid grid-cols-1 md:grid-cols-2">

        {/* LEFT SIDE */}
        <div className="hidden md:flex bg-gradient-to-br from-gray-900 to-indigo-950 text-white p-10 flex-col justify-between">

          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-indigo-600 flex items-center justify-center text-2xl">
              🛒
            </div>

            <h1 className="text-2xl font-bold">
              ShopAdmin
            </h1>
          </div>

          <div>
            <p className="text-indigo-400 font-semibold text-sm uppercase mb-3">
              Admin Portal
            </p>

            <h2 className="text-4xl font-bold leading-tight mb-5">
              Manage your
              <br />
              e-commerce store.
            </h2>

            <p className="text-gray-300 leading-7">
              Manage products, orders, customers and
              sales from your admin dashboard.
            </p>

            <div className="mt-8 space-y-4">

              <div className="flex items-center gap-3">
                <span className="w-7 h-7 rounded-full bg-indigo-600 flex items-center justify-center">
                  ✓
                </span>
                Manage Products
              </div>

              <div className="flex items-center gap-3">
                <span className="w-7 h-7 rounded-full bg-indigo-600 flex items-center justify-center">
                  ✓
                </span>
                Manage Orders
              </div>

              <div className="flex items-center gap-3">
                <span className="w-7 h-7 rounded-full bg-indigo-600 flex items-center justify-center">
                  ✓
                </span>
                View Analytics
              </div>

            </div>
          </div>

          <p className="text-sm text-gray-500">
            © 2026 ShopAdmin
          </p>

        </div>


        {/* RIGHT SIDE */}
        <div className="p-8 sm:p-12 flex items-center">

          <div className="w-full max-w-md mx-auto">

            {/* MOBILE LOGO */}
            <div className="md:hidden flex justify-center items-center gap-3 mb-8">

              <div className="w-12 h-12 rounded-xl bg-indigo-600 flex items-center justify-center text-2xl">
                🛒
              </div>

              <h1 className="text-2xl font-bold text-gray-900">
                ShopAdmin
              </h1>

            </div>


            {/* HEADER */}
            <div className="mb-8">

              <h2 className="text-3xl font-bold text-gray-900">
                Welcome Back 👋
              </h2>

              <p className="text-gray-500 mt-2">
                Login to your admin dashboard
              </p>

            </div>


            {/* ERROR */}
            {error && (
              <div className="mb-5 p-3 rounded-lg bg-red-50 border border-red-200 text-red-600 text-sm">
                {error}
              </div>
            )}


            {/* FORM */}
            <form
              onSubmit={handleSubmit}
              className="space-y-5"
            >

              {/* USERNAME */}
              <div>

                <label
                  htmlFor="username"
                  className="block text-sm font-semibold text-gray-700 mb-2"
                >
                  Username
                </label>

                <div className="relative">

                  <span className="absolute left-4 top-1/2 -translate-y-1/2">
                    👤
                  </span>

                  <input
                    id="username"
                    type="text"
                    value={username}
                    onChange={(e) => {
                      setUsername(e.target.value);
                      setError("");
                    }}
                    placeholder="Enter username"
                    autoComplete="username"
                    required
                    className="w-full h-12 pl-11 pr-4 border border-gray-300 rounded-lg outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10"
                  />

                </div>

              </div>


              {/* PASSWORD */}
              <div>

                <label
                  htmlFor="password"
                  className="block text-sm font-semibold text-gray-700 mb-2"
                >
                  Password
                </label>

                <div className="relative">

                  <span className="absolute left-4 top-1/2 -translate-y-1/2">
                    🔒
                  </span>

                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      setError("");
                    }}
                    placeholder="Enter password"
                    autoComplete="current-password"
                    required
                    className="w-full h-12 pl-11 pr-12 border border-gray-300 rounded-lg outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowPassword(!showPassword)
                    }
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                  >
                    {showPassword ? "🙈" : "👁"}
                  </button>

                </div>

              </div>


              {/* LOGIN BUTTON */}
              <button
                type="submit"
                className="w-full h-12 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg transition duration-200"
              >
                Sign In
              </button>

            </form>


            {/* DEMO LOGIN */}
            <div className="mt-6 p-4 rounded-lg bg-indigo-50 border border-indigo-100">

              <p className="text-sm font-semibold text-indigo-700">
                Demo Credentials
              </p>

              <p className="text-sm text-indigo-600 mt-2">
                Username: <strong>admin</strong>
              </p>

              <p className="text-sm text-indigo-600">
                Password: <strong>admin</strong>
              </p>

            </div>


            {/* SECURITY */}
            <div className="text-center text-xs text-gray-500 mt-6">
              🔐 Secure Admin Login
            </div>

          </div>

        </div>

      </div>

    </div>
  );
};

export default AdminLogin;