import React from "react";
import { Col, Row, Form, Input, notification } from "antd";
import axios from "../../config/Axios";
import classes from "./EditItemForm.module.css";
import localStorageService from "../../services/LocalStorageService"

export default function EditItemForm() {
  const string = localStorageService.getUser();
  const localUser = JSON.parse(string);

  const onFinish = (values) => {
    console.log("Received values of form: ", values);
    const body = {
      password: values.password,
      first_name: values.first_name,
      last_name: values.last_name,
      tel: values.tel,
      email: values.email,
      line_id: values.line_id,
    };
    axios
      .put(`/user/${localUser.user_id}`, body)
      .then((res) => {
        notification.success({
          message: `คุณได้แก้ไขเรียบร้อยแล้ว`,
          placement: `bottomRight`,
        });
      })
      .catch((res) => {
        notification.error({
          message: `การแก้ไขล้มเหลว`,
          placement: `bottomRight`,
        });
      });
  };

  return (
    <div>
      <Row>
        <Col span={24}>
          <Form
            onFinish={onFinish}
            style={{ width: "100%" }}
            labelCol={{ span: 7 }}
            wrapperCol={{ span: 14 }}
          >
            <h1>แก้ไขโปรไฟล์ของฉัน</h1>
            <br />
            <Form.Item
              name="password"
              label="รหัสผ่าน"
              rules={[
                {
                  required: false,
                  message: "Please input your password!",
                },
              ]}
              hasFeedback
            >
              <Input.Password placeholder="password" />
            </Form.Item>

            <Form.Item
              name="confirm"
              label="ยืนยันรหัสผ่าน"
              hasFeedback={true}
              dependencies={["password"]}
              rules={[
                {
                  required: false,
                  message: "Please confirm your password!",
                },
                ({ getFieldValue }) => ({
                  validator(rule, value) {
                    if (!value || getFieldValue("password") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      "Confirm password ต้องตรงกับ Password"
                    );
                  },
                }),
              ]}
            >
              <Input.Password placeholder="confirm password" />
            </Form.Item>

            <Form.Item
              name="first_name"
              label="ชื่อ"
              rules={[
                {
                  required: false,
                  message: "Please input your first name!",
                  whitespace: true,
                },
              ]}
              hasFeedback
            >
              <Input placeholder="first name" />
            </Form.Item>

            <Form.Item
              name="last_name"
              label="นามสกุล"
              rules={[
                {
                  required: false,
                  message: "Please input your last name!",
                  whitespace: true,
                },
              ]}
              hasFeedback
            >
              <Input placeholder="last name" />
            </Form.Item>

            <Form.Item
              name="tel"
              label="เบอร์โทรศัพท์"
              rules={[
                {
                  required: false,
                  message: "Please input your telephone number!",
                  whitespace: true,
                },
              ]}
              hasFeedback
            >
              <Input placeholder="mobile phone no." />
            </Form.Item>

            <Form.Item
              name="email"
              label="อีเมล"
              rules={[
                {
                  required: false,
                  message: "Please input your email!",
                  whitespace: true,
                },
                {
                  type: "email",
                  message: "Please enter a valid email",
                },
              ]}
              hasFeedback
            >
              <Input placeholder="email" />
            </Form.Item>

            <Form.Item
              name="line_id"
              label="Line ID"
              rules={[
                {
                  required: false,
                  message: "Please input your Line ID!",
                  whitespace: true,
                },
              ]}
              hasFeedback
            >
              <Input placeholder="(optional)" />
            </Form.Item>
            <Form.Item wrapperCol={{ span: 8, offset: 8 }}>
              <button className={classes.button} type="submit">
                แก้ไข
              </button>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </div>
  );
}

