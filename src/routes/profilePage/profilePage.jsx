import Chat from "../../components/chat/Chat";
import List from "../../components/list/List";
import "./profilePage.scss";
import apiRequest from "../../lib/apiRequest";
import { Link, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext.jsx";

function ProfilePage() {
  const { updateUser, currentUser } = useContext(AuthContext);
  const [userPosts, setUserPosts] = useState([]);
  const [savedPosts, setSavedPosts] = useState([]);
  const [chats, setChats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfileData = async () => {
      setLoading(true);
      setError("");

      try {
        const [postResponse, chatResponse] = await Promise.all([
          apiRequest.get("/users/profilePosts"),
          apiRequest.get("/chats"),
        ]);

        setUserPosts(postResponse.data?.userPosts || []);
        setSavedPosts(postResponse.data?.savedPosts || []);
        setChats(chatResponse.data || []);
      } catch (err) {
        console.log(err);
        setError(err?.response?.data?.message || "Failed to load profile data");
      } finally {
        setLoading(false);
      }
    };

    fetchProfileData();
  }, []);

  const handleLogout = async () => {
    try {
      await apiRequest.post("/auth/logout");
      updateUser(null);
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };
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
              <img src={currentUser?.avatar || "/noavatar.jpg"} alt="" />
            </span>
            <span>
              Username: <b>{currentUser?.name || currentUser?.username}</b>
            </span>
            <span>
              E-mail: <b>{currentUser?.email}</b>
            </span>
            <button onClick={handleLogout}>Logout</button>
          </div>
          <div className="title">
            <h1>My List</h1>
            <Link to="/add">
              <button>Create New Post</button>
            </Link>
          </div>
          {loading && <p>Loading...</p>}
          {error && <p>{error}</p>}
          {!loading && !error && <List posts={userPosts} />}
          <div className="title">
            <h1>Saved List</h1>
          </div>
          {!loading && !error && (
            <List posts={savedPosts} emptyMessage="No saved posts found." />
          )}
        </div>
      </div>
      <div className="chatContainer">
        <div className="wrapper">
          {loading && <p>Loading...</p>}
          {error && <p>{error}</p>}
          {!loading && !error && <Chat chats={chats} />}
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
