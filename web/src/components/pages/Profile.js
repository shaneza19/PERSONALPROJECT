import React, { useState, useEffect } from "react";
import { Row, Col, Collapse, Button, Modal, notification } from "antd";
import localStorageService from "../../services/LocalStorageService";
import { ProfileImage } from "../container/ProfileImage";
import ProfilePicForm from "../form/ProfilePicForm";
import classes from "./Profile.module.css";
import buttonStyle from "./Button.module.css";
import { Link } from "react-router-dom";
import EditProfileForm from "../form/EditProfileForm";

export default function Profile(props) {
  const logout = () => {
    localStorageService.removeToken();
    props.setRole("guest");
    localStorage.clear();
  };

  const string = localStorageService.getUser();
  const localUser = JSON.parse(string);

  //AntD's collapsible button
  const { Panel } = Collapse;

  //AntD's modal edit button
  const [visible, setVisible] = React.useState(false);
  const [confirmLoading, setConfirmLoading] = React.useState(false);
  const [modalText, setModalText] = React.useState(<EditProfileForm />);

  const showModal = () => {
    setVisible(true);
  };

  const editHandler = async () => {
    try {
      return (
        notification.success({
          message: `แก้ไขสำเร็จแล้ว`,
          placement: `bottomRight`,
        }),
        setTimeout(() => {
          window.location.reload(false);
        }, 1500)
      );
    } catch {
      return notification.error({
        message: `แก้ไขล้มเหลว`,
        placement: `bottomRight`,
      });
    }
  };

  const handleOk = () => {
    editHandler(localUser.user_id);
    setModalText("กำลังดำเนินการแก้ไข");
    setConfirmLoading(true);
    setTimeout(() => {
      setVisible(false);
      setConfirmLoading(false);
    }, 2000);
  };

  const handleCancel = () => {
    console.log("Clicked cancel button");
    setVisible(false);
  };

  //Fetch data for profile list
  const [error, setError] = useState(null);
  const [user, setUser] = useState([]);
  useEffect(() => {
    fetch(`http://localhost:8000/user/${localUser.user_id}`, { method: "GET" })
      .then((res) => res.json())
      .then(
        (user) => {
          setUser(user);
          console.log(user);
        },
        (error) => {
          setError(error);
        }
      );
  }, []);

  function ProfileList() {
    return (
      <ul className={classes.noBullets}>
        <p>{user.username}</p>
        <p>{user.first_name}</p>
        <p>{user.last_name}</p>
        <p>{user.tel}</p>
        <p>{user.email}</p>
        <p>{user.line_id}</p>
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
              onOk={handleOk}
              confirmLoading={confirmLoading}
              onCancel={handleCancel}
            >
              <p>{modalText}</p>
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
            <Button type="primary" onClick={showModal}>
              แก้ไข
            </Button>
          </Col>
          <Col span={7} offset={2}>
            <br />
            <ProfileImage />
            <br />
            <ProfilePicForm />
            <Link to={"/view_history"}>
              <br />
              <button className={buttonStyle.loginButton}>
                ดูรายการลงประกาศของฉัน
              </button>
            </Link>
          </Col>
        </Row>
        <br /> <br />
        <button className={buttonStyle.loginButton} onClick={logout}>
          ล็อกเอ้าท์ (Logout)
        </button>
      </div>
    </>
  );
}
