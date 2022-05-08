import React, { useContext } from "react";
import axios from "../../config/axios";

import { Col, Row, Form, Input, notification } from "antd";

import { AuthContext } from '../../contexts/AuthContext';
import { ErrorContext } from "../../contexts/ErrorContext";

import classes from "./EditProfileForm.module.css";

//edit user account on Profile page's edit button
export default function EditProfileForm() {
  const { user } = useContext(AuthContext);
  const { setError } = useContext(ErrorContext);

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
      .put(`/user/${user.id}`, body)
      .then((res) => {
        notification.success({
          message: `คุณได้แก้ไขเรียบร้อยแล้ว`,
          placement: `bottomRight`,
        });
        setTimeout(() => {
          window.location.reload(false);
        }, 2000);
      })
      .catch((err) => {
        setError("");
        setError(err.response.data.message);
        console.log(err);
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
            <br /><br />
            <Form.Item
              name="first_name"
              label="ชื่อ"
              rules={[
                {
                  required: true,
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
                  required: true,
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
                  required: true,
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
                  required: true,
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
            <Form.Item wrapperCol={{ span: 8, offset: 5 }}>
              <button className={classes.submitButton} type="submit">
                แก้ไข
              </button>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </div>
  );
}

