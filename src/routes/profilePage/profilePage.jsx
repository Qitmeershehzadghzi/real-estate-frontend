import Chat from "../../components/chat/Chat";
import List from "../../components/list/List";
import "./profilePage.scss";
import apiRequest from "../../lib/apiRequest";
import { Link, useNavigate } from "react-router-dom";
import { useContext} from "react";
import { AuthCOntext } from "../../context/AuthContext";
function ProfilePage() {
  const navigate =useNavigate()
    const { currentuser,updateUser } = useContext(AuthCOntext);
  
  const handleLogout =async () => {
    try {

      const res = await apiRequest.post("/auth/logout");
      console.log(res.data);
updateUser(null);
navigate("/")
    } catch (error) {
      console.log(error);
    }
  }


  
  return (
    <div className="profilePage">
      <div className="details">
        <div className="wrapper">
          <div className="title">
            <h1>User Information</h1>
            <Link to="/profile/update">

              <button>Update Profile</button>
            </Link>
          </div>
          <div className="info">
            <span>
              Avatar:
              <img
                src={currentuser?.avatar || "/logo.png"}
                alt=""
              />
            </span>
            <span>
              Username: <b>{currentuser?.username || currentuser?.name}</b>
            </span>
            <span>
              E-mail: <b>{currentuser?.email}</b>
            </span>
            <button onClick={handleLogout}>Logout</button>
          </div>
          <div className="title">
            <h1>My List</h1>
            <Link to="/add">

            <button>Create New Post</button>
            </Link>
          </div>
          <List />
          <div className="title">
            <h1>Saved List</h1>
          </div>
          <List />
        </div>
      </div>
      <div className="chatContainer">
        <div className="wrapper">
          <Chat/>
        </div>
      </div>
    </div>
  );
}


export default ProfilePage;
