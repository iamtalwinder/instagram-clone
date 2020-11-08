import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./Posts.module.css";
import InfiniteScroll from "react-infinite-scroll-component";
import PhotoModal from "./PhotoModal";

export default function Posts(props) {
  const PER_PAGE = 6;

  const [page, setPage] = useState(1);
  const [posts, setPosts] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [post, setPost] = useState(null);
  const [openPhotoModal, setOpenPhotoModal] = useState(false);

  const fetchPosts = async () => {
    try {
      const response = await axios.get("api/user-posts", {
        params: {
          start: (page - 1) * PER_PAGE,
          offset: PER_PAGE,
          userId: props.userId,
          refresh: props.refreshPosts,
        },
      });

      const { data } = response;
      if (!data.posts.length) {
        setHasMore(false);
        return;
      }

      setPosts((posts) => [...posts, ...data.posts]);
      setPage((page) => page + 1);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <>
      <InfiniteScroll
        dataLength={posts.length}
        next={fetchPosts}
        hasMore={hasMore}
      >
        <div className={styles.imageGrid}>
          {posts.map((post) => (
            <img
              key={post.postId}
              className={styles.img}
              src={`${post.path}_thumb.jpeg`}
              alt=""
              onClick={() => {
                setPost(post);
                setOpenPhotoModal(true);
              }}
            />
          ))}
        </div>
      </InfiniteScroll>
      {openPhotoModal && (
        <PhotoModal post={post} setOpenModal={setOpenPhotoModal} />
      )}
    </>
  );
}
