import React from "react";
import { Col, Row } from "antd";
import { useNavigate } from "react-router-dom";
import classes from "./ViewUser.module.css";

//a container for displaying user info
export default function ViewUserContainer(props) {
  const navigate = useNavigate();
  return (
    <div>
      <br /> <br />
      <Row>
        <Col span={5} offset={4}>
          <ul className={classes.noBullets}>
            <li>
              <h1>เบอร์โทรศัพท์:</h1>
              <h1>อีเมล:</h1>
              <h1>Line ID:</h1>
            </li>
          </ul>
        </Col>
        <Col span={10}>
          <ul className={classes.noBullets}>
            <li>
              <h1>{props.tel}</h1>
              <h1>{props.email}</h1>
              <h1>{props.line_id}</h1>
            </li>
          </ul>
        </Col>
      </Row>
      <br />
      <Row justify="center">
        <div>
          <img
            className={classes.ProfileImage}
            src={props.profile_pic_url}
            alt="profile pic"
          />
        </div>
      </Row>
      <br />
      <Row justify="center">
        <h1>
          ผู้ขาย : {props.first_name} {props.last_name}
        </h1>
      </Row>
      <Row justify="center">
        <button className={classes.button} onClick={() => navigate(-1)}>
          กลับไปหน้าเดิม
        </button>
      </Row>
    </div>
  );
}
