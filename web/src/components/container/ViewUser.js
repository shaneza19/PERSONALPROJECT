import React from "react";
import { Col, Row } from "antd";
import { useNavigate } from "react-router-dom";
import classes from "./ViewUser.module.css";

//a container for displaying user info on View User page (view seller)
export default function ViewUserContainer(props) {
  const navigate = useNavigate();
  return (
    <>
    <br /> <br />
      <div className={classes.container}>
        <br /> <br />
        <Row>
          <Col span={6} offset={6}>
            <ul className={classes.noBullets}>
              <li>
                <h1 className={classes.text}>เบอร์โทรศัพท์:</h1>
                <h1 className={classes.text}>อีเมล:</h1>
                <h1 className={classes.text}>Line ID:</h1>
              </li>
            </ul>
          </Col>
          <Col span={6}>
            <ul className={classes.noBullets}>
              <li>
                <h1 className={classes.text}>{props.tel || "-"}</h1>
                <h1 className={classes.text}>{props.email || "-"}</h1>
                <h1 className={classes.text}>{props.line_id || "-"}</h1>
              </li>
            </ul>
          </Col>
        </Row>
        <br />
        <Row justify="center">
          <div>
            <img
              className={classes.ProfileImage}
              src={props.profile_img}
              alt="profile pic"
            />
          </div>
        </Row>
        <br />
        <Row justify="center">
          <h1 className={classes.text}>
            ผู้ขาย : {props.first_name || "-"} {props.last_name || "-"}
          </h1>
        </Row>
        <Row justify="center">
          <button className={classes.button} onClick={() => navigate(-1)}>
            กลับไปหน้าเดิม
          </button>
        </Row>
      </div>
      <br />
    </>
  );
}
