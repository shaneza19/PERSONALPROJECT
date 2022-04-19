import React from "react";
import { Col, Row, Form, Input, Select, Radio, notification } from "antd";
import axios from "../../config/axios";
import { useNavigate, useParams } from "react-router-dom";
import classes from "./EditItemForm.module.css";
export default function EditItemForm() {
  //for AntD dropdown
  const { Option } = Select;

  let { id } = useParams();
  const navigate = useNavigate()

  const onFinish = (values) => {
    console.log("Received values of form: ", values);
    const body = {
      type: values.type,
      product_title: values.product_title,
      product_description: values.product_description,
      province: values.province,
      status: values.status,
      address: values.address,
      price: values.price,
      category: values.category,
    };
    axios
      .put(`/real_estate/${id}`, body)
      .then((res) => {
        notification.success({
          message: `คุณได้แก้ไขประกาศเรียบร้อยแล้ว`,
          placement: `bottomRight`,
        });
        navigate('/filter_item');
      })
      .catch((res) => {
        notification.error({
          message: `การแก้ไขประกาศล้มเหลว`,
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
            <h1>แก้ไขประกาศอสังหาริมทรัพย์</h1>
            <br />
            <Form.Item
              name="category"
              label="หมวดหมู่"
              rules={[
                {
                  required: false,
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
                  required: false,
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
                { required: false, message: "Please choose sell or rent" },
              ]}
            >
              <Radio.Group>
                <Radio.Button value="ขาย">ขาย</Radio.Button>
                <Radio.Button value="เช่า">เช่า</Radio.Button>
              </Radio.Group>
            </Form.Item>

            <Form.Item
              name="status"
              label="สถานะ"
              rules={[{ required: false }]}
            >
              <Radio.Group>
                <Radio.Button value="ขายอยู่">ขายอยู่</Radio.Button>
                <Radio.Button value="ไม่ว่าง">ไม่ว่าง</Radio.Button>
              </Radio.Group>
            </Form.Item>

            <Form.Item
              name="price"
              label="ราคา"
              rules={[{ required: false, message: "Please set price (Baht)" }]}
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
              rules={[{ required: false }]}
              hasFeedback
            >
              <Input placeholder="address" />
            </Form.Item>
            <Form.Item
              name="product_title"
              label="หัวข้อเรื่อง"
              rules={[{ required: false }]}
              hasFeedback
            >
              <Input placeholder="title" showCount maxLength={100} />
            </Form.Item>
            <Form.Item
              name="product_description"
              label="รายละเอียดสินค้า"
              rules={[{ required: false }]}
            >
              <Input.TextArea
                placeholder="description"
                size="large"
                showCount
                maxLength={500}
              />
            </Form.Item>
            <br />
            <Form.Item wrapperCol={{ span: 3, offset: 6 }}>
              <button className={classes.button} type="submit">
                แก้ไขประกาศ (Submit)
              </button>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </div>
  );
}
