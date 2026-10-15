import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../api/api";

function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "CANDIDATE",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await API.post("/auth/register", form);
      alert("Registration successful");
      navigate("/login");
    } catch {
      alert("Registration failed");
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center px-6 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/30 via-slate-950 to-cyan-500/20"></div>

      <div className="relative max-w-6xl w-full grid lg:grid-cols-2 bg-white/10 backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden shadow-2xl">

        <div className="hidden lg:flex flex-col justify-center p-12 text-white bg-gradient-to-br from-indigo-700 to-slate-900">
          <span className="bg-white/10 w-fit px-4 py-2 rounded-full text-sm font-semibold text-cyan-300">
            Join HireSense
          </span>

          <h1 className="text-5xl font-extrabold leading-tight mt-6">
            Create your account and start hiring smarter
          </h1>

          <p className="mt-6 text-slate-300 text-lg">
            Register as a candidate to find matching jobs or as a company to
            post openings and manage applications easily.
          </p>

          <div className="mt-10 space-y-4">
            <div className="bg-white/10 p-5 rounded-2xl">
              ✅ AI-based resume screening
            </div>

            <div className="bg-white/10 p-5 rounded-2xl">
              ✅ Smart job recommendations
            </div>

            <div className="bg-white/10 p-5 rounded-2xl">
              ✅ Separate candidate and company dashboard
            </div>
          </div>
        </div>

        <div className="bg-white p-10 flex items-center">
          <div className="w-full max-w-md mx-auto">
            <h2 className="text-4xl font-bold text-slate-900 text-center">
              Create Account
            </h2>

            <p className="text-center text-slate-500 mt-2">
              Register to access HireSense platform
            </p>

            <form onSubmit={handleSubmit} className="space-y-5 mt-8">
              <input
                className="w-full p-4 border rounded-xl outline-none focus:border-indigo-500"
                placeholder="Full Name"
                value={form.name}
                onChange={(e) =>
                  setForm({ ...form, name: e.target.value })
                }
              />

              <input
                className="w-full p-4 border rounded-xl outline-none focus:border-indigo-500"
                placeholder="Email Address"
                type="email"
                value={form.email}
                onChange={(e) =>
                  setForm({ ...form, email: e.target.value })
                }
              />

              <input
                className="w-full p-4 border rounded-xl outline-none focus:border-indigo-500"
                placeholder="Password"
                type="password"
                value={form.password}
                onChange={(e) =>
                  setForm({ ...form, password: e.target.value })
                }
              />

              <select
                className="w-full p-4 border rounded-xl outline-none focus:border-indigo-500 bg-white"
                value={form.role}
                onChange={(e) =>
                  setForm({ ...form, role: e.target.value })
                }
              >
                <option value="CANDIDATE">Candidate</option>
                <option value="COMPANY">Company</option>
              </select>

              <button className="w-full bg-indigo-600 hover:bg-indigo-700 transition text-white p-4 rounded-xl font-semibold shadow-lg">
                Create Account
              </button>
            </form>

            <p className="text-center mt-6 text-slate-600">
              Already have an account?{" "}
              <Link to="/login" className="text-indigo-600 font-bold">
                Login
              </Link>
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}

export default Register;