import React, { useContext, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import { Col, Row, Button, Modal } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";

import Carousel from "./Carousel";

import EditItemForm from "../form/EditItemForm";
import Image1Form from "../form/Image1Form";

import { AuthContext } from "../../contexts/AuthContext";

import classes from "./ViewItem.module.css";

//a container for individual Real Estate item page
export default function ViewItemContainer(props) {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const [showButton, showEditButton] = useState(false);
  //Show edit, delete, image button
  useEffect(() => {
    if (props.user_id === user.id) {
      showEditButton(true);
    }
  }, [props.user_id]);

  //AntD's modal edit button
  const [visible, setVisible] = React.useState(false);
  const [modalContent] = React.useState(<EditItemForm />);

  const showModal = () => {
    setVisible(true);
  };

  const handleCancel = () => {
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

  return (
    <div>
      {showButton ? (
        <Row>
          <Col span={4} offset={20}>
            <br />
            <Button type="primary" onClick={showModal}>
              แก้ไข
            </Button>
            <Modal
              title=""
              visible={visible}
              confirmLoading={null}
              onOk={null}
              onCancel={handleCancel}
              footer={null}
            >
              {modalContent}
            </Modal>
            &nbsp;
            <Button type="danger" onClick={showDeleteConfirm}>
              ลบประกาศ
            </Button>
            &nbsp;
            <Image1Form />
          </Col>
        </Row>
      ) : null}

      <Row>
        <Col span={24} offset={0}>
          <Carousel
            image_1={props.image_1}
            image_2={props.image_2}
            image_3={props.image_3}
            image_4={props.image_4}
            image_5={props.image_5}
          />
          <p className={classes.price}>
            {props.price?.toLocaleString(undefined, {
              maximumFractionDigits: 2,
            }) || "-"}
            &nbsp;บาท
          </p>
          <p className={classes.address}>{props.address || "-"}</p>
          <p className={classes.productTitle}>{props.product_title || "-"}</p>
          <p className={classes.descriptionHeader}>
            รายละเอียด อสังหาริมทรัพย์
          </p>
        </Col>
        <Col span={7} offset={5}>
          <span className={classes.description}>
            ประเภท&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          </span>
          <span className={classes.bold}>{props.category || "-"}</span>
          <hr className={classes.style} />
          <span className={classes.description}>วัตถุประสงค์</span>
          <span className={classes.bold}>สำหรับ {props.type || "-"}</span>
          <hr className={classes.style} />
          <span className={classes.description}>
            จังหวัด&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          </span>
          <span className={classes.bold}>{props.province || "-"}</span>
        </Col>
        <Col span={12} offset={0}>
          <span className={classes.description}>สถานะความคืบหน้า</span>
          <span className={classes.bold}>{props.status || "-"}</span>
          <hr className={classes.style} />
          <span className={classes.description}>ลงขายเมื่อ</span>
          <span className={classes.bold}>{props.createdAt || "-"}</span>
          <hr className={classes.style} />
          <span className={classes.description}>อัพเดทเมื่อ</span>
          <span className={classes.bold}>{props.updatedAt || "-"}</span>
        </Col>
        <Col span={24}>
          <textarea
            className={classes.textArea}
            value={props.product_description || "-"}
            spellcheck="false"
            autocorrect="off"
            autocapitalize="off"
          />
          <div className={classes.SellerInfo}>
            <Link to={`/view_user/${props.user_id}`}>
              <button className={classes.contactSellerButton}>
                ติดต่อผู้ขาย
              </button>
            </Link>
            <br />
            <button className={classes.backButton} onClick={() => navigate(-1)}>
              กลับไปหน้าเดิม
            </button>
          </div>
        </Col>
      </Row>
    </div>
  );
}
