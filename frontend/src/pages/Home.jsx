import React, { useState, useEffect } from "react";
import Posts from "../components/Posts";
import Pagination from "../components/Pagination";
import axios from "axios";
import "../App.css";
import { useDispatch } from "react-redux";
import { logout } from "../redux/userSlice";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";


const App = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      const res = await axios.get("http://localhost:8005/api/post");
      setPosts(res.data);
      setLoading(false);
    };
    fetchPosts();
  }, []);

  useEffect(() => {
    if (!currentUser) {
      navigate("/auth/login");
    } 
  }, [navigate]);

  // Get current posts
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="container m-5">
      <div className="flex justify-between">
        <h1 className="text-primary mb-3 text-5xl">Posts</h1>
        <button onClick={()=>{dispatch(logout()),navigate("/auth/login")}}>Logout</button>
      </div>
      <Posts posts={currentPosts} loading={loading} />
      <Pagination
        postsPerPage={postsPerPage}
        totalPosts={posts.length}
        paginate={paginate}
      />
    </div>
  );
};

export default App;
