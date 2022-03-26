import { Col, Row } from "antd";
import ViewUserContainer from "../container/ViewUser";
import { React, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import classes from "./ViewUser.module.css";

//a page for displaying Seller information
export default function ViewUser() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);

  let { id } = useParams();

  useEffect(() => {
    fetch(`http://localhost:8000/user/${id}`, { method: "GET" })
      .then((res) => res.json())
      .then(
        (user) => {
          setIsLoaded(true);
          setItems(user);
          console.log(user);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      );
  }, []);

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return (
      <>
        <br /> <br />
        <div className={classes.container}>
          <Row>
            <Col span={24}>
              <div>
                <ViewUserContainer
                  first_name={items.first_name}
                  last_name={items.last_name}
                  tel={items.tel}
                  email={items.email}
                  line_id={items.line_id}
                  profile_pic_url={items.profile_pic_url}
                  user_id={items.id}
                />
              </div>
            </Col>
          </Row>
        </div>
      </>
    );
  }
}
