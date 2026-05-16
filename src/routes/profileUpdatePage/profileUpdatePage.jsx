import "./profileUpdatePage.scss";
import { AuthCOntext } from "../../context/AuthContext";
import { useContext, useState } from "react";
import apiRequest from "../../lib/apiRequest";
import { useNavigate } from "react-router-dom";
import UploadWidget from "../../components/uploadWidget/UploadWidget";

function ProfileUpdatePage() {
  const { currentuser, updateUser } = useContext(AuthCOntext);

  const [error, setError] = useState("");

  const [avatar, setAvatar] = useState();

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    const formData = new FormData(e.target);

    const { username, email, password } = Object.fromEntries(formData);

    try {
      const res = await apiRequest.put(
        `/users/${currentuser?.id}`,

        {
          username,
          email,
          avatar:avatar[0],

          ...(password && { password }),
        },
      );

      updateUser(res.data);

      navigate("/profile");
    } catch (err) {
      console.log(err);

      setError(err?.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="profileUpdatePage">
      <div className="formContainer">
        <form onSubmit={handleSubmit}>
          <h1>Update Profile</h1>

          {error && <span>{error}</span>}

          <div className="item">
            <label htmlFor="username">Username</label>

            <input
              id="username"
              name="name"
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

            <input id="password" name="password" type="password" />
          </div>

          <button type="submit">Update</button>
        </form>
      </div>

      <div className="sideContainer">
        <img src={avatar[0] ||currentuser?.avatar || "/noavatar.jpg"} alt="" className="avatar" />

        <UploadWidget
          uwConfig={{
            cloudName: "dpstboaa3",
            uploadPreset: "estate",
            multiple: false,
            folder: "avatars",
            maxImageFileSize: 20000000,
          }}
          setAvatar={setAvatar}
        />
      </div>
    </div>
  );
}

export default ProfileUpdatePage;
