import React from "react";
import { Col, Row, Form, Button, Input, notification } from "antd";
import axios from "../../config/Axios";
import localStorageService from "../../services/LocalStorageService";

export default function ProfilePicForm() {
  const string = localStorageService.getUser();
  const localUser = JSON.parse(string);
  
  //refresh page to update changes on profile pic 
  //with 3 sec delay to show notification message
  function refreshPage() {
    setTimeout(() => {  window.location.reload(false); }, 3000);
    //window.location.reload(false);
  }
  

  const onFinish = (values) => {
    console.log("Received values of form: ", values);
    const body = {
      profile_pic_url: values.profile_pic_url,
    };
    axios
      .put(`/user/${localUser.user_id}`, body)
      .then((res) => {
        notification.success ({
          message: `อัพรูปโปรไฟล์สำเร็จ`,
          placement: `bottomRight`,
        });
      })
      .catch((res) => {
        notification.error({
          message: `อัพรูปโปรไฟล์ล้มเหลว`,
          placement: `bottomRight`,
        });
      });
  };

  return (
    <div>
      <br /> <br />
      <Row>
        <Col span={24}>
          <Form
            onFinish={onFinish}
            style={{ width: "100%" }}
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 10 }}
          >
            <Form.Item
              name="profile_pic_url"
              label="url รูปโปรไฟล์"
              rules={[{ required: false }]}
            >
              <Input type="url" placeholder="url" />
            </Form.Item>
            
            <Form.Item wrapperCol={{ span: 10, offset: 8 }}>
              <Button onClick={refreshPage} block type="primary" htmlType="submit">
                แก้ไข
              </Button>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </div>
  );
}
