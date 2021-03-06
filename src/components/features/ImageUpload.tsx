import * as React from "react";
import { useState } from "react";
import Button from "@mui/material/Button";
import * as firebase from "firebase/app";
import { storage, db } from "../../firebase/firebase";

const ImageUpload = ({ username, button__style }) => {
  const [image, setImage] = useState(null);
  const [progress, setProgress] = useState(0);
  const [caption, setCaption] = useState("");

  const handleChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleUpload = () => {
    const uploadTask = storage.ref(`images/${image.name}`).put(image);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(progress);
      },
      (error) => {
        alert(error.message);
      },
      () => {
        storage
          .ref("images")
          .child(image.name)
          .getDownloadURL()
          .then((url) => {
            db.collection("posts").add({
              timestamp: firebase.firestore.FieldValue.serverTimestamp(),
              caption: caption,
              imageUrl: url,
              username: username,
            });

            setProgress(0);
            setCaption("");
            setImage(null);
          });
      }
    );
  };

  return (
    <div className="image-upload">
      <input
        className="image-upload__input"
        type="text"
        placeholder="Enter a caption..."
        onChange={(event) => setCaption(event.target.value)}
        value={caption}
      />
      <input
        className="image-upload__input"
        type="file"
        onChange={handleChange}
      />
      <progress className="image-upload__progress" value={progress} max="100" />
      <Button sx={button__style} onClick={handleUpload}>
        Upload
      </Button>
    </div>
  );
};

export default ImageUpload;
