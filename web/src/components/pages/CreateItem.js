import React from "react";
import { Col, Row } from "antd";
import CreateItemForm from "../form/CreateItemForm";

//a page for creating a Real Estate item 
export default function CreateItem() {

  return (
    <div>
      <Row>
        <Col span={24}>
          <CreateItemForm/>
        </Col>
      </Row>
    </div>
  );
}
