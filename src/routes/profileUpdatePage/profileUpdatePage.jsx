import "./profileUpdatePage.scss";
import { AuthCOntext } from "../../context/AuthContext";
import { useContext, useState } from "react";
import apiRequest from "../../lib/apiRequest";

function ProfileUpdatePage() {
const [error,setError]= useState('')
  const { currentuser,updateUser } = useContext(AuthCOntext);
const handleSubmit=async (e)=>{
  const formData=new formData(e.target)
  const{username,email,password}=Object.fromEntries(formData);
  try {
    const res =await apiRequest.put(`/users/${currentuser?.id}`,{
      username,
      email,
      password
    });
    // updateUser(res.data)
    console.log(res.data);
    
  } catch (error) {
    setError(error.response.data.message)
  }
}
  return (
    <div className="profileUpdatePage">

      <div className="formContainer">

        <form onSubmit={handleSubmit}>

          <h1>Update Profile</h1>
{error && <span>error</span>}
          <div className="item">
            <label htmlFor="username">Username</label>

            <input
              id="username"
              name="username"
              type="text"
              defaultValue={currentuser?.username || currentuser?.name || ""}
            />
          </div>

          <div className="item">
            <label htmlFor="email">Email</label>

            <input
              id="email"
              name="email"
              type="email"
              defaultValue={currentuser?.email || ""}
            />
          </div>

          <div className="item">
            <label htmlFor="password">Password</label>

            <input
              id="password"
              name="password"
              type="password"
            />
          </div>

          <button>Update</button>

        </form>

      </div>

      <div className="sideContainer">

        <img
          src={currentuser?.avatar || "/logo.png"}
          alt=""
          className="avatar"
        />

      </div>

    </div>
  );
}

export default ProfileUpdatePage;
