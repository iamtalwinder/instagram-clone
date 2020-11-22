import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import styles from "./Posts.module.css";
import InfiniteScroll from "react-infinite-scroll-component";
import PhotoModal from "./PhotoModal";
import {
  Context as PostsContext,
  actionTypes as PostsActionTypes,
} from "../context/Posts";

export default function Posts({ visitedUserId, postsPerPage }) {
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [openPhotoModal, setOpenPhotoModal] = useState(false);
  const [postIndex, setPostIndex] = useState(null);

  const [posts, dispatchPosts] = useContext(PostsContext);

  const fetchPosts = async () => {
    try {
      let url = "api/user-posts";
      let params = {
        start: (page - 1) * postsPerPage,
        offset: postsPerPage,
        visitedUserId: visitedUserId,
        refresh: !(page - 1),
      };

      if (!visitedUserId) {
        url = "api/explore";
        delete params["visitedUserId"];
      }

      const response = await axios.get(url, {
        params: params,
      });

      const { data } = response;

      if (!data.posts.length) {
        setHasMore(false);
        return;
      }

      dispatchPosts({
        type: PostsActionTypes.ADD_NEW_POSTS,
        newPosts: data.posts,
      });

      setPage((page) => ++page);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  if (!posts.length) return <></>;

  return (
    <>
      <InfiniteScroll
        dataLength={posts.length}
        next={fetchPosts}
        hasMore={hasMore}
      >
        <div className={styles.imageGrid}>
          {posts.map((post, index) => (
            <img
              key={post.postId}
              className={styles.img}
              src={`${post.path}_thumb.jpeg`}
              alt=""
              onClick={() => {
                setPostIndex(index);
                setOpenPhotoModal(true);
              }}
            />
          ))}
        </div>
      </InfiniteScroll>

      <PhotoModal
        postIndex={postIndex}
        openModal={openPhotoModal}
        setOpenModal={setOpenPhotoModal}
      />
    </>
  );
}
