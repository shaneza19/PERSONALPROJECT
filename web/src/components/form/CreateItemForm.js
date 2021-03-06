import{ React, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../config/axios";

import { ErrorContext } from "../../contexts/ErrorContext";

import { Col, Row, Form, Input, Select, Radio, notification } from "antd";

import classes from "./CreateItemForm.module.css";


export default function CreateItemForm() {
  const { setError } = useContext(ErrorContext);

  const [image_1, setimage1] = useState(null);

  const onChangeImage1 = (e) => {
    setimage1(e.target.files[0])
  }

  //for AntD dropdown
  const { Option } = Select;

  const navigate = useNavigate();

  const onFinish = async (values) => {
    const formData = new FormData();
    formData.append('image_1', image_1);
    formData.append('type', values.type);
    formData.append('product_title', values.product_title);
    formData.append('product_description', values.product_description);
    formData.append('province', values.province);
    formData.append('address', values.address);
    formData.append('price', values.price);
    formData.append('category', values.category);
    //formData.append('status', 'ขายอยู่');

    console.log(...formData)

  await axios.post("/real_estate/create", formData)
  .then((res) => {
    notification.success({
      message: `ลงประกาศเรียบร้อยแล้ว`,
      placement: `bottomRight`,
    });
    navigate(`/filter_item`);
  })
  .catch((err) => {
    setError("");
    setError(err.response.data.message);
    console.log(err);
  });
  }

  return (
    <>
    <div>
      <br /> <br />
      <Row className={classes.container}>
        <Col span={24}>
          <Form
            onFinish={onFinish}
            style={{ width: "100%" }}
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 10 }}
          >
            <h1>ลงประกาศอสังหาริมทรัพย์</h1>
            <hr className={classes.style} />
            <br />
            <Form.Item
              name="category"
              label="หมวดหมู่"
              rules={[
                {
                  required: true,
                  message: "Please select category",
                },
              ]}
              hasFeedback
            >
              <Select placeholder="Please select a category">
                <Option value="บ้าน">บ้าน</Option>
                <Option value="ที่ดิน">ที่ดิน</Option>
                <Option value="คอนโด">คอนโด</Option>
                <Option value="ตึกแถว">ตึกแถว</Option>
                <Option value="ทาวน์เฮ้าส์">ทาวน์เฮ้าส์</Option>
                <Option value="อพาร์ทเม้นท์">อพาร์ทเม้นท์</Option>
                <Option value="อาคารพานิชย์">อาคารพานิชย์</Option>
                <Option value="อื่นๆ">อื่นๆ</Option>
              </Select>
            </Form.Item>
            <Form.Item
              name="province"
              label="จังหวัด"
              rules={[
                {
                  required: true,
                  message: "Please select province",
                },
              ]}
              hasFeedback
            >
              <Select placeholder="Please select a province">
                <Option value="กรุงเทพมหานคร">กรุงเทพมหานคร</Option>
                <Option value="สมุทรปราการ">สมุทรปราการ</Option>
                <Option value="นนทบุรี">นนทบุรี</Option>
                <Option value="ปทุมธานี">ปทุมธานี</Option>
                <Option value="พระนครศรีอยุธยา">พระนครศรีอยุธยา</Option>
                <Option value="อ่างทอง">อ่างทอง</Option>
                <Option value="ลพบุรี">ลพบุรี</Option>
                <Option value="สิงห์บุรี">สิงห์บุรี</Option>
                <Option value="ชัยนาท">ชัยนาท</Option>
                <Option value="สระบุรี">สระบุรี</Option>
                <Option value="ชลบุรี">ชลบุรี</Option>
                <Option value="ระยอง">ระยอง</Option>
                <Option value="จันทบุรี">จันทบุรี</Option>
                <Option value="ตราด">ตราด</Option>
                <Option value="ฉะเชิงเทรา">ฉะเชิงเทรา</Option>
                <Option value="ปราจีนบุรี">ปราจีนบุรี</Option>
                <Option value="นครนายก">นครนายก</Option>
                <Option value="สระแก้ว">สระแก้ว</Option>
                <Option value="นครราชสีมา">นครราชสีมา</Option>
                <Option value="บุรีรัมย์">บุรีรัมย์</Option>
                <Option value="สุรินทร์">สุรินทร์</Option>
                <Option value="ศรีสะเกษ">ศรีสะเกษ</Option>
                <Option value="อุบลราชธานี">อุบลราชธานี</Option>
                <Option value="ยโสธร">ยโสธร</Option>
                <Option value="ชัยภูมิ">ชัยภูมิ</Option>
                <Option value="อำนาจเจริญ">อำนาจเจริญ</Option>
                <Option value="บึงกาฬ">บึงกาฬ</Option>
                <Option value="หนองบัวลำภู">หนองบัวลำภู</Option>
                <Option value="ขอนแก่น">ขอนแก่น</Option>
                <Option value="อุดรธานี">อุดรธานี</Option>
                <Option value="เลย">เลย</Option>
                <Option value="หนองคาย">หนองคาย</Option>
                <Option value="มหาสารคาม">มหาสารคาม</Option>
                <Option value="ร้อยเอ็ด">ร้อยเอ็ด</Option>
                <Option value="กาฬสินธุ์">กาฬสินธุ์</Option>
                <Option value="สกลนคร">สกลนคร</Option>
                <Option value="นครพนม">นครพนม</Option>
                <Option value="มุกดาหาร">มุกดาหาร</Option>
                <Option value="เชียงใหม่">เชียงใหม่</Option>
                <Option value="ลำพูน">ลำพูน</Option>
                <Option value="ลำปาง">ลำปาง</Option>
                <Option value="อุตรดิตถ์">อุตรดิตถ์</Option>
                <Option value="แพร่">แพร่</Option>
                <Option value="น่าน">น่าน</Option>
                <Option value="พะเยา">พะเยา</Option>
                <Option value="เชียงราย">เชียงราย</Option>
                <Option value="แม่ฮ่องสอน">แม่ฮ่องสอน</Option>
                <Option value="นครสวรรค์">นครสวรรค์</Option>
                <Option value="อุทัยธานี">อุทัยธานี</Option>
                <Option value="กำแพงเพชร">กำแพงเพชร</Option>
                <Option value="ตาก">ตาก</Option>
                <Option value="สุโขทัย">สุโขทัย</Option>
                <Option value="พิษณุโลก">พิษณุโลก</Option>
                <Option value="พิจิตร">พิจิตร</Option>
                <Option value="เพชรบูรณ์">เพชรบูรณ์</Option>
                <Option value="ราชบุรี">ราชบุรี</Option>
                <Option value="กาญจนบุรี">กาญจนบุรี</Option>
                <Option value="สุพรรณบุรี">สุพรรณบุรี</Option>
                <Option value="นครปฐม">นครปฐม</Option>
                <Option value="สมุทรสาคร">สมุทรสาคร</Option>
                <Option value="สมุทรสงคราม">สมุทรสงคราม</Option>
                <Option value="เพชรบุรี">เพชรบุรี</Option>
                <Option value="ประจวบคีรีขันธ์">ประจวบคีรีขันธ์</Option>
                <Option value="นครศรีธรรมราช">นครศรีธรรมราช</Option>
                <Option value="กระบี่">กระบี่</Option>
                <Option value="พังงา">พังงา</Option>
                <Option value="ภูเก็ต">ภูเก็ต</Option>
                <Option value="สุราษฎร์ธานี">สุราษฎร์ธานี</Option>
                <Option value="ระนอง">ระนอง</Option>
                <Option value="ชุมพร">ชุมพร</Option>
                <Option value="สงขลา">สงขลา</Option>
                <Option value="สตูล">สตูล</Option>
                <Option value="ตรัง">ตรัง</Option>
                <Option value="พัทลุง">พัทลุง</Option>
                <Option value="ปัตตานี">ปัตตานี</Option>
                <Option value="ยะลา">ยะลา</Option>
                <Option value="นราธิวาส">นราธิวาส</Option>
              </Select>
            </Form.Item>
            <Form.Item
              name="type"
              label="ประเภท"
              rules={[
                { required: true, message: "Please choose sell or rent" },
              ]}
            >
              <Radio.Group>
                <Radio.Button value="ขาย">ขาย</Radio.Button>
                <Radio.Button value="เช่า">เช่า</Radio.Button>
              </Radio.Group>
            </Form.Item>
            <Form.Item
              name="price"
              label="ราคา"
              rules={[{ required: true, message: "Please set price (Baht)" }]}
              hasFeedback
            >
              <Input
                type="number"
                suffix="บาท"
                placeholder="Please set a price"
              />
            </Form.Item>
            <Form.Item
              name="address"
              label="ที่ตั้ง"
              rules={[{ required: true }]}
              hasFeedback
            >
              <Input placeholder="address" />
            </Form.Item>
            <Form.Item
              name="product_title"
              label="หัวข้อเรื่อง"
              rules={[{ required: true }]}
              hasFeedback
            >
              <Input placeholder="title" showCount maxLength={100} />
            </Form.Item>
            <Form.Item
              name="product_description"
              label="รายละเอียดสินค้า"
              rules={[{ required: true }]}
            >
              <Input.TextArea
                placeholder="description"
                size="large"
                showCount
                maxLength={500}
              />
            </Form.Item>
            <Form.Item
              name="image_1"
              label="รูปภาพหน้าปก"
              rules={[{ required: true }]}
            >
              <Input 
              type="file" 
              placeholder="photo 1"
              onChange={onChangeImage1} />
            </Form.Item>
            <br />
            <Form.Item wrapperCol={{ span: 3, offset: 8 }}>
              <button className={classes.button} type="submit">
                ลงประกาศ
              </button>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </div>
    <br/>
    </>
  );
}

