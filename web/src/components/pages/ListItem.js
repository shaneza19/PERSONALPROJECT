import React from "react";
import { Col, Row } from "antd";
import ListItemForm from "../form/ListItemForm";

//a page for creating a Real Estate item 
export default function ListItem() {

  return (
    <div>
      <Row>
        <Col span={24}>
          <ListItemForm/>
        </Col>
      </Row>
    </div>
  );
}
