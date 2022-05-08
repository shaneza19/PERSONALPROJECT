import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import axios from "../../config/axios";

//default profile image
import profileImg from "../../assets/images/profileImg.png";

import ViewUserContainer from "../container/ViewUser";

import { ErrorContext } from "../../contexts/ErrorContext";

//a page for displaying Seller information
export default function ViewUser() {
  const { error, setError } = useContext(ErrorContext);
  const [items, setItems] = useState([]);

  let { id } = useParams();

  useEffect(() => {
    axios
      .get(`/user/${id}`)
      .then((res) => {
        setItems(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        setError("");
        setError(err.response.data.message);
        console.log(err);
      });
  }, []);

  if (error) {
    return <div>Error: {error.message}</div>;
  } else {
    return (
      <>
        <ViewUserContainer
          first_name={items.first_name}
          last_name={items.last_name}
          tel={items.tel}
          email={items.email}
          line_id={items.line_id}
          profile_img={items.profile_img || profileImg}
          user_id={items.id}
        />
      </>
    );
  }
}
