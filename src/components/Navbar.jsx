import { Link, useNavigate } from "react-router-dom";
import { LogOut } from "lucide-react";

function Navbar() {
  const navigate = useNavigate();
  const role = localStorage.getItem("role");

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <nav className="bg-white shadow-sm px-8 py-4 flex justify-between items-center">
      <Link to="/" className="text-2xl font-bold text-indigo-600">
        HireSense
      </Link>

      <div className="flex items-center gap-5">
        {role && (
          <span className="text-sm bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full">
            {role}
          </span>
        )}

        {localStorage.getItem("token") ? (
          <button
            onClick={logout}
            className="flex items-center gap-2 text-red-500 font-medium"
          >
            <LogOut size={18} />
            Logout
          </button>
        ) : (
          <>
            <Link to="/login" className="font-medium">
              Login
            </Link>
            <Link
              to="/register"
              className="bg-indigo-600 text-white px-4 py-2 rounded-xl"
            >
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;