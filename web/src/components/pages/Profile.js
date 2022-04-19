import React, { useContext } from "react";
import { Row, Col, Button, Modal, notification } from "antd";
import { ProfileImage } from "../container/ProfileImage";
import ProfilePicForm from "../form/ProfilePicForm";
import classes from "./Profile.module.css";
import { Link } from "react-router-dom";
import EditProfileForm from "../form/EditProfileForm";
import { AuthContext } from '../../contexts/AuthContext';

export default function Profile(props) {

  const { user } = useContext(AuthContext);

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
    editHandler('user_id');
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
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
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
              <button className={classes.button}>
                ดูรายการลงประกาศของฉัน
              </button>
            </Link>
          </Col>
        </Row>
        <br /> <br />
      </div>
    </>
  );
}
