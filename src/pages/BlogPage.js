import React from "react";
import MainLayout from "../layout/MainLayout";
import { useState, useEffect } from "react";
import axios from "axios";

function BlogPage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchPosts = async () => {
    const responsePosts = await axios.get(
      `https://jsonplaceholder.typicode.com/posts`
    );
    setPosts(responsePosts.data);
    setLoading(false);

    /* fetch(`https://jsonplaceholder.typicode.com/posts`)
      .then((response) => response.json())
      .then((json) => setPosts(json)); */
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <MainLayout>
      {loading ? (
        <div>Data is loading</div>
      ) : (
        <div>
          {posts.map((post, index) => (
            <div key={index}>
              {post.id}. {post.title}
              <div>{post.body}</div>
              <hr />
            </div>
          ))}
        </div>
      )}
    </MainLayout>
  );
}

export default BlogPage;
