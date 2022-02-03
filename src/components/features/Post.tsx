import * as React from "react";
import { useState, useEffect } from "react";
import Avatar from "@mui/material/Avatar";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import * as firebase from "firebase/app";
import { db } from "../../firebase/firebase";
import { useStateValue } from "../../context/StateProvider";

const Post = ({ postId, username, caption, imageUrl }) => {
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");
  const [{ user }] = useStateValue();

  useEffect(() => {
    let unsubscribe: { (): void; (): void };
    if (postId) {
      unsubscribe = db
        .collection("posts")
        .doc(postId)
        .collection("comments")
        .orderBy("timestamp", "desc")
        .onSnapshot((snapshot) => {
          setComments(
            snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
          );
        });
    }

    return () => {
      unsubscribe();
    };
  }, [postId]);

  const postComment = async (event: { preventDefault: () => void }) => {
    event.preventDefault();

    const commentRef = db
      .collection("posts")
      .doc(postId)
      .collection("comments");

    const addComment = await commentRef.add({
      text: comment,
      username: user.displayName,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
    console.log(addComment.id);
    setComment("");
  };

  const deleteComment = (event: { preventDefault: () => void }, id: string) => {
    event.preventDefault();

    db.collection("posts")
      .doc(postId)
      .collection("comments")
      .doc(id)
      .delete()
      .then(() => {
        console.log("Posts successfully deleted!");
      })
      .catch((error) => {
        console.error("Error removing document: ", error);
      });
  };

  return (
    <div className="post">
      <div className="post__header">
        <Avatar className="post__avatar">U</Avatar>
        <h3>{username}</h3>
      </div>
      <img className="post__image" src={imageUrl} alt="" />

      <h4 className="post__text">
        <strong>{username}: </strong>
        {caption}
      </h4>

      <div className="post__comments">
        {comments.map((comment) => (
          <p key={comment.id} className="comment__wrapper">
            <strong>{comment.username}</strong>: {comment.text}
            {user.displayName == comment.username && (
              <button
                className="deleteComment__button"
                onClick={(e) => deleteComment(e, comment.id)}
              >
                <DeleteForeverIcon fontSize="large" />
              </button>
            )}
          </p>
        ))}
      </div>

      {user && (
        <form className="post__comment-box">
          <input
            className="post__input"
            type="text"
            placeholder="Add a comment..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <button
            className="post__button"
            disabled={!comment}
            onClick={postComment}
          >
            Post
          </button>
        </form>
      )}
    </div>
  );
};

export default Post;
