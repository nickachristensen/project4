import React, { useState, useEffect } from "react";

//Component
import Profile from "../Profile";

const ProfileContainer = () => {
  const [posts, setPosts] = useState([]);
  const [toggle, setToggle] = useState(true);

  const getProfileList = async () => {
    fetch("/me")
      .then((resp) => resp.json())
      .then((data) => {
        setPosts(data.posts);
      });
  };

  useEffect(() => {
    getProfileList();
  }, [toggle]);

  function handleDelete(deletedPost) {
    const updatedPosts = posts.filter((item) => item.id !== deletedPost.id);
    setPosts(updatedPosts);
  }

  const postList = posts.map((post) => {
    return (
      <Profile
        key={post.id}
        post={post}
        onDelete={handleDelete}
        setToggle={setToggle}
      />
    );
  });

  return (
    <div>
      <div className="post-container">{postList}</div>
    </div>
  );
};

export default ProfileContainer;