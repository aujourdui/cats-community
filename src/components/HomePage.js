import React, { useState, useEffect } from "react";
import Post from "./Post";
import { db, auth } from "./firebase";
import Header from "./Header";
import { useStateValue } from "./StateProvider";

const HomePage = () => {
  const [posts, setPosts] = useState([]);
  // const [username, setUsername] = useState("");
  const [{ user }, dispatch] = useStateValue();
  // const [user, setUser] = useState(null);

  // useEffect(() => {
  //   const unsubscribe = auth.onAuthStateChanged((authUser) => {
  //     if (authUser) {
  //       // console.log(authUser);
  //       setUser(authUser);
  //     } else {
  //       setUser(null);
  //     }
  //   });

  //   return () => {
  //     unsubscribe();
  //   };
  // }, [user, username]);

  useEffect(() => {
    db.collection("posts")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) => {
        setPosts(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            post: doc.data(),
          }))
        );
      });
  }, []);

  return (
    <div className="home">
      <Header user={user} />
      <div className="home__contents">
        <div className="home__contents-left">
          {posts.map(({ id, post }) => (
            <Post
              key={id}
              postId={id}
              username={post.username}
              caption={post.caption}
              imageUrl={post.imageUrl}
            />
          ))}
        </div>
        <div className="home__contents-right">{/* <Recommend /> */}</div>
      </div>
    </div>
  );
};
export default HomePage;
