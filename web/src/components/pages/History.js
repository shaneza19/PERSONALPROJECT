import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import axios from "../../config/axios";

import { Row, Col } from "antd";

import { AuthContext } from "../../contexts/AuthContext";
import { ErrorContext } from "../../contexts/ErrorContext";

import { RiPlayLine } from "react-icons/ri";

import classes from "./History.module.css";

export default function History() {
  const { error, setError } = useContext(ErrorContext);
  const { user } = useContext(AuthContext);

  const [items, setItems] = useState([]);

  useEffect(() => {
    axios
      .get("/real_estate/")
      .then((res) => {
        setItems(res.data);
        console.log(res);
      })
      .catch((err) => {
        setError("");
        setError(err.response.data.message);
        console.log(err);
      });
  }, []);

  if (error) {
    return (
      <>
        <div>Error: {error.message}</div>
      </>
    );
  } else {
    return (
      <Row>
        <Col span={24} offset={0}>
          <br /> <br />
        </Col>
          <Col span={24} offset={0}>
            <div className={classes.History}>
              <br />
              <h1>รายการลงประกาศของฉัน</h1>
              <hr className={classes.style} />
              {items
                .filter((item) => {
                  return item.user_id == user.id;
                })
                .map((item) => {
                  return (
                    <Link to={`/view_item/${item.id}`}>
                      <div className={classes.alignItems}>
                    <div className={classes.alignTextItem}>
                      <div className={classes.alignContent}>
                        <RiPlayLine className={classes.icon}/>
                      <p key={item.id}>
                        {item.product_title || "-"} | &nbsp;
                        {item.price.toLocaleString(undefined, {
                          maximumFractionDigits: 2,
                        }) || "-"}
                        &nbsp;บาท
                      </p>
                      </div>
                    </div>
                  </div>
                    </Link>
                  );
                })}
                     <br />
            </div>
            <br />
          </Col>
      </Row>
    );
  }
}
