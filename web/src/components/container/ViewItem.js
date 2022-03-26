import React from "react";
import { Col, Row, Form, Button, Modal } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import classes from "./ViewItem.module.css";
import EditItemForm from "../form/EditItemForm";
import localStorageService from "../../services/LocalStorageService";
import Carousel from "./Carousel";

//a container for displaying Real Estate item page
export default function ViewItemContainer(props) {
  const navigate = useNavigate();
  const string = localStorageService.getUser();
  const localUser = JSON.parse(string);

  //AntD's modal edit button
  const [visible, setVisible] = React.useState(false);
  const [confirmLoading, setConfirmLoading] = React.useState(false);
  const [modalText, setModalText] = React.useState(<EditItemForm />);

  const showModal = () => {
    setVisible(true);
  };

  const handleOk = () => {
    props.editHandler(props.real_estateID);
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

  //AntD's modal delete button
  const { confirm } = Modal;
  function showDeleteConfirm() {
    confirm({
      title: "Are you sure delete this task?",
      icon: <ExclamationCircleOutlined />,
      content: "คุณแน่ใจที่จะลบประกาศหรือไม่",
      okText: "ลบประกาศ",
      okType: "danger",
      cancelText: "ยกเลิก",
      onOk() {
        props.deleteHandler(props.real_estateID);
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  }

  if (props.user_id === localUser.user_id) {
      //Show edit and delete button
  return (
    <div>
      <Row>
        <Col span={12}>
          <br />
          <p>{props.product_title}</p>
        </Col>
        <Col span={12}>
          <br />
            <button className={classes.status}>
              สถานะ: {props.status}
            </button>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <Button type="primary" onClick={showModal}>
              แก้ไข
            </Button>
            <Modal
              title=""
              visible={visible}
              onOk={handleOk}
              confirmLoading={confirmLoading}
              onCancel={handleCancel}
            >
              <p>{modalText}</p>
            </Modal>
            &nbsp;
            <Button type="danger" onClick={showDeleteConfirm}>
              ลบประกาศ
            </Button>
        </Col>
      </Row>
      <Row>
        <Col span={10} offset={2}>
          <Carousel
          image_url1 = {props.image_url1}
          image_url2 = {props.image_url2}
          image_url3 = {props.image_url3}
          image_url4 = {props.image_url4}
          image_url5 = {props.image_url5}
          />
        </Col>
        <Col span={12}>
          <div className={classes.ProductDescription}>
            <h1>รายละเอียดสินค้า</h1>
            <hr className={classes.style}/>
            <p>{props.product_description}</p>
          </div>
          <br />
          <div className={classes.Address}>
            <p>ที่ตั้ง: {props.address}</p>
          </div>
          <br /> <br />
          <div className={classes.SellerInfo}>
            <Form.Item wrapperCol={{ span: 8, offset: 8 }}>
              <Link to={`/view_user/${props.user_id}`}>
                <button className={classes.button}>ติดต่อผู้ขาย</button>
              </Link>
              <button
                className={classes.backButton}
                onClick={() => navigate(-1)}
              >
                กลับไปหน้าเดิม
              </button>
            </Form.Item>
          </div>
        </Col>
      </Row>
    </div>
  );
}
//Else don't show edit or delete button
else {
  return (
    <div>
      <Row>
        <Col span={12}>
          <br />
          <h1>{props.product_title}</h1>
        </Col>
        <Col span={12}>
          <br />
            <button className={classes.status}>
              สถานะ: {props.status}
            </button>
        </Col>
      </Row>
      <Row>
        <Col span={10} offset={2}>
          <Carousel
          image_url1 = {props.image_url1}
          image_url2 = {props.image_url2}
          image_url3 = {props.image_url3}
          image_url4 = {props.image_url4}
          image_url5 = {props.image_url5}
          />
        </Col>
        <Col span={12}>
          <div className={classes.ProductDescription}>
            <br />
            <h1>รายละเอียดสินค้า</h1>
            <hr className={classes.style}/>
            <p>{props.product_description}</p>
          </div>
          <br />
          <div className={classes.Address}>
            <p>ที่ตั้ง: {props.address}</p>
          </div>
          <br /> <br />
          <div className={classes.SellerInfo}>
            <Form.Item wrapperCol={{ span: 8, offset: 8 }}>
              <Link to={`/view_user/${props.user_id}`}>
                <button className={classes.button}>ติดต่อผู้ขาย</button>
              </Link>
              <button
                className={classes.backButton}
                onClick={() => navigate(-1)}
              >
                กลับไปหน้าเดิม
              </button>
            </Form.Item>
          </div>
        </Col>
      </Row>
    </div>
  );
}
}

