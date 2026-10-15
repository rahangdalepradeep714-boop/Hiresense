import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../api/api";

function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post("/auth/login", form);

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.role);
      localStorage.setItem("email", res.data.email);

      if (res.data.role === "COMPANY") {
        navigate("/company");
      } else if (res.data.role === "CANDIDATE") {
        navigate("/candidate");
      } else {
        alert("Unknown role");
      }
    } catch {
      alert("Invalid login details");
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center px-6 relative overflow-hidden">

      <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/30 via-slate-950 to-cyan-500/20"></div>

      <div className="relative max-w-6xl w-full grid lg:grid-cols-2 bg-white/10 backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden shadow-2xl">

        {/* Left Side */}

        <div className="hidden lg:flex flex-col justify-center p-12 text-white bg-gradient-to-br from-indigo-700 to-slate-900">
          <h1 className="text-5xl font-extrabold leading-tight">
            Welcome to
            <span className="text-cyan-300"> HireSense</span>
          </h1>

          <p className="mt-6 text-slate-300 text-lg">
            AI-powered hiring platform connecting skilled candidates
            with top companies through smart resume analysis and
            intelligent job matching.
          </p>

          <div className="mt-10 grid grid-cols-2 gap-6">

            <div className="bg-white/10 p-5 rounded-2xl">
              <h2 className="text-3xl font-bold">500+</h2>
              <p className="text-slate-300">
                Active Candidates
              </p>
            </div>

            <div className="bg-white/10 p-5 rounded-2xl">
              <h2 className="text-3xl font-bold">120+</h2>
              <p className="text-slate-300">
                Companies
              </p>
            </div>

            <div className="bg-white/10 p-5 rounded-2xl">
              <h2 className="text-3xl font-bold">95%</h2>
              <p className="text-slate-300">
                Match Accuracy
              </p>
            </div>

            <div className="bg-white/10 p-5 rounded-2xl">
              <h2 className="text-3xl font-bold">24/7</h2>
              <p className="text-slate-300">
                AI Assistance
              </p>
            </div>

          </div>
        </div>

        {/* Right Side */}

        <div className="bg-white p-10 flex items-center">
          <div className="w-full max-w-md mx-auto">

            <h2 className="text-4xl font-bold text-slate-900 text-center">
              Login
            </h2>

            <p className="text-center text-slate-500 mt-2">
              Access your HireSense account
            </p>

            <form
              onSubmit={handleSubmit}
              className="space-y-5 mt-8"
            >

              <input
                type="email"
                placeholder="Enter Email"
                className="w-full p-4 border rounded-xl outline-none focus:border-indigo-500"
                onChange={(e) =>
                  setForm({
                    ...form,
                    email: e.target.value,
                  })
                }
              />

              <input
                type="password"
                placeholder="Enter Password"
                className="w-full p-4 border rounded-xl outline-none focus:border-indigo-500"
                onChange={(e) =>
                  setForm({
                    ...form,
                    password: e.target.value,
                  })
                }
              />

              <div className="flex justify-between text-sm">
                <label className="flex gap-2 items-center">
                  <input type="checkbox" />
                  Remember me
                </label>

                <a
                  href="#"
                  className="text-indigo-600 font-medium"
                >
                  Forgot password?
                </a>
              </div>

              <button
                className="w-full bg-indigo-600 hover:bg-indigo-700 transition text-white p-4 rounded-xl font-semibold shadow-lg"
              >
                Login
              </button>

            </form>

            <p className="text-center mt-6 text-slate-600">
              New User?{" "}
              <Link
                to="/register"
                className="text-indigo-600 font-bold"
              >
                Register
              </Link>
            </p>

          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;