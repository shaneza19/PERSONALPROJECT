import { React, useState, useEffect } from "react";
import { Row, Col } from "antd";
import { Link } from "react-router-dom";
import classes from "./ViewHistory.module.css";
import localStorageService from "../../services/LocalStorageService";

export default function History() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);

  const string = localStorageService.getUser();
  const localUser = JSON.parse(string);

  useEffect(() => {
    fetch("http://localhost:8000/real_estate/", { method: "GET" })
      .then((res) => res.json())
      .then(
        (real_estate) => {
          setIsLoaded(true);
          setItems(real_estate);
          console.log(real_estate);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      );
  }, []);

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return (
      <Row>
        <Col span={24} offset={0}>
          <br /> <br />
        </Col>
        <Row>
          <Col span={24} offset={11}>
            <div className={classes.History}>
              <br/>
                        <h1>รายการลงประกาศของฉัน</h1>
                        <hr className={classes.style} />
              {items
                .filter((item) => {
                  return item.user_id == localUser.user_id;
                })
                .map((item) => {
                  return (
                    <Link to={`/view_item/${item.id}`}>
                      <p key={item.id}>
                        {item.product_title} | &nbsp;
                        {item.price.toLocaleString(undefined, {
                          maximumFractionDigits: 2,
                        })}
                        &nbsp;บาท
                      </p>
                    </Link>
                  );
                })}
            </div>
          </Col>
        </Row>
      </Row>
    );
  }
}
