import "./listPage.scss";
import Filter from "../../components/filter/Filter";
import Card from "../../components/card/Card";
import Map from "../../components/map/Map";
import { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import apiRequest from "../../lib/apiRequest";
import { AuthCOntext } from "../../context/AuthContext";

function ListPage() {
  const [posts, setPosts] = useState([]);
  const [savedPosts, setSavedPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [savedLoading, setSavedLoading] = useState(false);
  const [error, setError] = useState("");
  const [savedError, setSavedError] = useState("");
  const { search } = useLocation();
  const { currentuser } = useContext(AuthCOntext);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      setError("");

      try {
        const res = await apiRequest.get(`/posts${search}`);
        setPosts(res.data || []);
      } catch (err) {
        setError(err?.response?.data?.message || "Error loading posts!");
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [search]);

  useEffect(() => {
    const fetchSavedPosts = async () => {
      if (!currentuser) {
        setSavedPosts([]);
        return;
      }

      setSavedLoading(true);
      setSavedError("");

      try {
        const res = await apiRequest.get("/users/profilePosts");
        setSavedPosts(res.data.savedPosts || []);
      } catch (err) {
        setSavedError(
          err?.response?.data?.message || "Error loading saved posts!"
        );
      } finally {
        setSavedLoading(false);
      }
    };

    fetchSavedPosts();
  }, [currentuser]);

  return (
    <div className="listPage">
      <div className="listContainer">
        <div className="wrapper">
          <Filter />
          {loading && <p>Loading...</p>}
          {error && <p>{error}</p>}
          {!loading && !error && posts.length === 0 && <p>No posts found.</p>}
          {!loading &&
            !error &&
            posts.map((post) => <Card key={post.id} item={post} />)}
          {currentuser && (
            <div className="savedPostsSection">
              <h1>Saved Posts</h1>
              {savedLoading && <p>Loading saved posts...</p>}
              {savedError && <p>{savedError}</p>}
              {!savedLoading && !savedError && savedPosts.length === 0 && (
                <p>You have not saved any posts yet.</p>
              )}
              {!savedLoading &&
                !savedError &&
                savedPosts.map((post) => <Card key={post.id} item={post} />)}
            </div>
          )}
        </div>
      </div>
      <div className="mapContainer">
        <Map items={posts} />
      </div>
    </div>
  );
}

export default ListPage;
