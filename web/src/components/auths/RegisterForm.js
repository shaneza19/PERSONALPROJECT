import React , { useContext } from "react";
import { useNavigate } from "react-router-dom";

import axios from "../../config/axios";

import { ErrorContext } from "../../contexts/ErrorContext";

import { Form, Input, Row, Col, notification } from "antd";

import classes from "./RegisterForm.module.css";

function RegisterForm() {

  const { setError } = useContext(ErrorContext);

  const navigate = useNavigate()

  const onFinish = (values) => {
    const body = {
      username: values.username,
      password: values.password,
      first_name: values.first_name,
      last_name: values.last_name,
      tel: values.tel,
      email: values.email,
      line_id: values.line_id,
    };
    axios
      .post("user/register", body)
      .then((res) => {
        notification.success({
          message: `คุณ ${values.first_name} ได้สมัครสมาชิกเรียบร้อยแล้ว`,
          placement: `bottomRight`,
        });
        navigate('/login');
      })
      .catch((err) => {        
        setError("");
        setError(err.response.data.message);
        console.log(err);
      });
  };

  return (
    <Row >
      <Col span={24}>
        <br/><br/>
        <div className={classes.container}>
            <h1>
              สมัครสมาชิก
            </h1>
            <hr className={classes.style} />
          <Form 
          onFinish={onFinish} 
          style={{ width: "100%" }}
          labelCol={{ span: 7 }}
          wrapperCol={{ span: 12 }}>
          <br/>
            <Form.Item
              name="username"
              label="ชื่อผู้ใช้งาน"
              rules={[
                {
                  min: 5,
                  message: "Username must be minimum 5 characters.",
                },
                {
                  required: true,
                  message: "Please input your username!",
                },
              ]}
              hasFeedback
            >
              <Input placeholder="username"/>
            </Form.Item>

            <Form.Item
              name="password"
              label="รหัสผ่าน"
              rules={[
                {
                  required: true,
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
                  required: true,
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
              <Input placeholder="last name"/>
            </Form.Item>

            <Form.Item
              name="tel"
              label="เบอร์โทรศัพท์"
              rules={[
                {
                  required: true,
                  message: "Please input your telephone number!",
                  whitespace: true,
                  pattern: new RegExp(/^[0-9]+$/)
                },
              ]}
              hasFeedback
            >
              <Input placeholder="mobile phone no."/>
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
              <Input placeholder="email"/>
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
            <Form.Item wrapperCol={{ span: 8, offset: 7 }}>
            <button className={classes.button} type="submit">
            สมัครสมาชิก
          </button>
            </Form.Item>
          </Form>
        </div>
      </Col>
    </Row>
  );
}

export default RegisterForm;
