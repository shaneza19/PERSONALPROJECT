import classes from "./ProfileImage.module.css";
import localStorageService from "../../services/LocalStorageService";
import { useState, useEffect } from "react";

export function ProfileImage() {
  const string = localStorageService.getUser();
  const localUser = JSON.parse(string);

  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:8000/user/${localUser.user_id}`, { method: "GET" })
      .then((res) => res.json())
      .then(
        (result) => {
          //console.log(result);
          setIsLoaded(true);
          setItems(result);
        }, 
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      );
  }, []);

  if (items) {
    return (
      <div>
        <img
          className={classes.ProfileImage}
          src={items.profile_pic_url}
          alt="profile pic"
        />
      </div>
    );
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return <div>error</div>;
  }
}


