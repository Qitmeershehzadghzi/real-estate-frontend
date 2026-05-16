import axios from "axios";
import { useState } from "react";
import "./register.scss";
import { Link, useNavigate } from "react-router-dom";
import apiRequest from "../../lib/apiRequest";

function Register() {
const [error,setError]=useState("");
  const[loading,setLoading]=useState(false)

const navigate =useNavigate()
  const handleSubmit = async (e) => {
    e.preventDefault();
setLoading(true)
    const formData = new FormData(e.target);

    const name = formData.get("name");
    const email = formData.get("email");
    const password = formData.get("password");

    try {
      const res = await apiRequest.post(
        "/auth/register",
        {
          name,
          email,
          password,
        }
      );

      console.log(res.data);
      navigate("/login")

    } catch (error) {
      console.log(error);
      setError(error.response.data.message)
    }
    finally{
      setLoading(false)
    }
  };

  return (
    <div className="register">
      <div className="formContainer">
        <form onSubmit={handleSubmit}>
          <h1>Create an Account</h1>

          <input
            name="name"
            type="text"
            placeholder="Username"
          />

          <input
            name="email"
            type="text"
            placeholder="Email"
          />

          <input
            name="password"
            type="password"
            placeholder="Password"
          />

          <button disabled={loading}>{loading ? "Registering..." : "Register"}</button>
{error && <p className="error">{error}</p>}
          <Link to="/login">
            Do you have an account?
          </Link>

        </form>
      </div>

      <div className="imgContainer">
        <img src="/bg.png" alt="" />
      </div>
    </div>
  );
}

export default Register;