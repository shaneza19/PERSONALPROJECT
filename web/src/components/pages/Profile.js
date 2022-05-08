import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import axios from "../../config/axios";

//default image for profile image
import profileImg from "../../assets/images/profileImg.png";

import ProfilePicForm from "../form/ProfilePicForm";
import EditProfileForm from "../form/EditProfileForm";

import { AuthContext } from "../../contexts/AuthContext";
import { ErrorContext } from "../../contexts/ErrorContext";

import { Row, Col, Modal } from "antd";

import classes from "./Profile.module.css";

export default function Profile() {
  const { user } = useContext(AuthContext);

  const { setError } = useContext(ErrorContext);

  const [profileImage, setProfileImage] = useState([]);

  useEffect(() => {
    axios
      .get("/user/me")
      .then((res) => {
        setProfileImage(res.data.user.profile_img);
        console.log(res);
      })
      .catch((err) => {
        setError("");
        setError(err.response.data.message);
        console.log(err);
      });
  }, []);

  //AntD's modal edit button
  const [visible, setVisible] = React.useState(false);
  const [modalContent] = React.useState(<EditProfileForm />);

  const showModal = () => {
    setVisible(true);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  function ProfileList() {
    return (
      <ul className={classes.noBullets}>
        <p>{user.username || "-"}</p>
        <p>{user.first_name || "-"}</p>
        <p>{user.last_name || "-"}</p>
        <p>{user.tel || "-"}</p>
        <p>{user.email || "-"}</p>
        <p>{user.line_id || "-"}</p>
      </ul>
    );
  }

  return (
    <>
      <div>
        <br /> <br />
      </div>
      <div className={classes.container}>
        <Row>
          <Col span={24}>
            <h1>โปรไฟล์ของฉัน</h1>
            <hr className={classes.style} />
            <Modal
              title=""
              visible={visible}
              onOk={null}
              onCancel={handleCancel}
              footer={null}
            >
              <div>{modalContent}</div>
            </Modal>
          </Col>
        </Row>
        <br />
        <Row>
          <Col span={6} offset={0}>
            <br />
            <ul className={classes.noBullets}>
              <li>
                <p>ชื่อผู้ใช้งาน</p>
                <p>ชื่อ</p>
                <p>นามสกุล</p>
                <p>เบอร์โทรศัพท์</p>
                <p>อีเมล</p>
                <p>Line_ID</p>
              </li>
            </ul>
          </Col>
          <Col span={6} offset={2}>
            <br />
            {ProfileList()}
            <button className={classes.editProfileButton} onClick={showModal}>
              แก้ไข
            </button>
          </Col>
          <Col span={7} offset={2}>
            <br />
            <div>
              <img
                className={classes.ProfileImage}
                src={profileImage || profileImg}
                alt="profile pic"
              />
            </div>
            <br />
            <ProfilePicForm />
            <Link to={"/history"}>
              <button className={classes.historyButton}>
                ดูรายการลงประกาศของฉัน
              </button>
            </Link>
          </Col>
        </Row>
      </div>
      <br/>
    </>
  );
}
