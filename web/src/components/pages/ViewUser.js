import { Col, Row } from "antd";
import ViewUserContainer from "../container/ViewUser";
import { React, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import classes from "./ViewUser.module.css";
import profileImg from '../../assets/images/profileImg.png';
import axios from '../../config/axios';

//a page for displaying Seller information
export default function ViewUser() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);

  let { id } = useParams();

  useEffect(() => {
    axios
      .get(`/user/${id}`)
      .then((res) => {
        setIsLoaded(true);
        setItems(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        setIsLoaded(true);
        setError(error);
      });
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
                  profile_img={items.profile_img || profileImg}
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
