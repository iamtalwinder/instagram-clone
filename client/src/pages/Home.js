import React, {
  useState,
  useEffect,
  useContext,
  useCallback,
  useRef,
} from "react";
import axios from "axios";
import Nav from "../components/Nav";
import DashboardContainer from "../components/DashboardContainer";
import BottomNav from "../components/BottomNav";
import Icon from "@mdi/react";
import { mdiCameraOutline, mdiSendOutline } from "@mdi/js";
import EmptyButton from "../components/EmptyButton";
import InfiniteScroll from "react-infinite-scroll-component";
import {
  Context as PostsContext,
  actionTypes as PostsActionTypes,
} from "../context/Posts";
import Post from "../components/Post";
import Spinner from "../components/Spinner";

export default function Home() {
  const ICON_SIZE = 1.4;
  const PER_PAGE = 10;

  const page = useRef(1);

  const [loading, setLoading] = useState(true);
  const [posts, dispatchPosts] = useContext(PostsContext);
  const [hasMore, setHasMore] = useState(true);

  const fetchFeeds = useCallback(async () => {
    try {
      const response = await axios.get("api/feeds", {
        params: {
          start: (page.current - 1) * PER_PAGE,
          offset: PER_PAGE,
          refresh: !(page.current - 1),
        },
      });

      const { data } = response;

      if (!data.feeds.length) {
        setHasMore(false);
      } else {
        dispatchPosts({
          type: PostsActionTypes.ADD_NEW_POSTS,
          newPosts: data.feeds,
        });

        page.current++;
      }
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  }, [dispatchPosts]);

  useEffect(() => {
    fetchFeeds();
  }, [fetchFeeds]);

  return (
    <>
      <Nav topNav={true}>
        <EmptyButton>
          <Icon path={mdiCameraOutline} size={ICON_SIZE} verticle="true" />
        </EmptyButton>
        <h5
          style={{
            fontFamily: "Yesteryear",
            fontSize: "30px",
          }}
        >
          Instagram
        </h5>
        <EmptyButton>
          <Icon
            path={mdiSendOutline}
            size={ICON_SIZE}
            verticle="true"
            rotate={-45}
          />
        </EmptyButton>
      </Nav>
      <DashboardContainer>
        {posts.length ? (
          <InfiniteScroll
            dataLength={posts.length}
            next={fetchFeeds}
            hasMore={hasMore}
          >
            {posts.map((post, index) => (
              <Post postIndex={index} style={{ marginTop: "60px" }} />
            ))}
          </InfiniteScroll>
        ) : (
          <p style={{ textAlign: "center", marginTop: "60px" }}>
            {loading ? (
              <Spinner />
            ) : (
              "Follow other users to see their posts here."
            )}
          </p>
        )}
      </DashboardContainer>
      <BottomNav active="home" />
    </>
  );
}
