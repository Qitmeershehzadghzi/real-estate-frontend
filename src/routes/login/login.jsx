import { useContext, useState } from "react";
import "./login.scss";
import { Link, useNavigate } from "react-router-dom";
import apiRequest from "../../lib/apiRequest";
import { AuthCOntext } from "../../context/AuthContext";

function Login() {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
const {updateUser}=useContext(AuthCOntext)
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.target);

    const name = formData.get("username"); // FIXED
    const password = formData.get("password");

    try {
      const res = await apiRequest.post("/auth/login", {
        name,
        password,
      });
      updateUser(res.data)
localStorage.setItem("user",JSON.stringify(res.data))
      console.log(res.data);
      navigate("/");

    } catch (error) {
      console.log(error);
      setError(error?.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login">
      <div className="formContainer">
        <form onSubmit={handleSubmit}>
          <h1>Welcome back</h1>

          <input
            name="username"
            type="text"
            placeholder="Username"
          />

          <input
            name="password"
            type="password"
            placeholder="Password"
          />

          <button disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>

          {error && <p className="error">{error}</p>}

          <Link to="/register">
            Don't you have an account?
          </Link>
        </form>
      </div>

      <div className="imgContainer">
        <img src="/bg.png" alt="" />
      </div>
    </div>
  );
}

export default Login;