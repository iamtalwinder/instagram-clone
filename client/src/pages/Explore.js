import React, { useState, useRef } from "react";
import styles from "./Explore.module.css";
import axios from "axios";
import Nav from "../components/Nav";
import DashboardContainer from "../components/DashboardContainer";
import BottomNav from "../components/BottomNav";
import { ContextProvider as PostsContextProvider } from "../context/Posts";
import Posts from "../components/Posts";
import SearchInput from "../components/SearchInput";
import EmptyButton from "../components/EmptyButton";
import ToAccount from "../components/ToAccount";

export default function Explore() {
  const [search, setSearch] = useState(false);
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const searchContainer = useRef(null);

  const handleSearchChange = async (e) => {
    setUsername(e.target.value);
    setLoading(true);

    try {
      const response = await axios.get("api/users", {
        params: {
          user: e.target.value,
        },
      });

      setUsers(response.data.users);
    } catch (err) {
      console.log(err.response);
    }
    setLoading(false);
  };

  return (
    <>
      <Nav topNav={true}>
        <div></div>
        <div className={styles.searchBarContainer}>
          <SearchInput
            value={username}
            setValue={setUsername}
            onChange={handleSearchChange}
            onFocus={() => {
              setSearch(true);
              searchContainer.current.classList.add(styles.visible);
            }}
            loading={loading}
          />
          {search && (
            <EmptyButton
              style={{ fontSize: "16px", marginLeft: "15px" }}
              onClick={() => {
                setSearch(false);
                setLoading(false);
                setUsername("");
                setUsers([]);
                searchContainer.current.classList.remove(styles.visible);
              }}
            >
              cancle
            </EmptyButton>
          )}
        </div>
        <div></div>
      </Nav>
      <DashboardContainer>
        <PostsContextProvider>
          <Posts postsPerPage={30} />
        </PostsContextProvider>
        <div className={styles.searchContainer} ref={searchContainer}>
          <DashboardContainer style={{ margin: "auto" }}>
            {users.map((user) => (
              <ToAccount
                style={{
                  borderBottom: "1px solid #ccc",
                  padding: "15px 10px",
                }}
                userId={user.userId}
                username={user.username}
                fullname={user.fullname}
                includeDP={true}
                dpPath={user.dpPath}
                dpWidth="40px"
                dpHeight="40px"
                key={user.userId}
              />
            ))}

            {!users.length && username !== "" && !loading && (
              <p style={{ textAlign: "center" }}>No user found</p>
            )}
          </DashboardContainer>
        </div>
      </DashboardContainer>
      <BottomNav active="explore" />
    </>
  );
}
