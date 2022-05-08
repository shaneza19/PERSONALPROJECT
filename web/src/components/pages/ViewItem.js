import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

import dayjs from "dayjs";

import ViewItemContainer from "../container/ViewItem";

import { notification } from "antd";

import itemImg from "../../assets/images/itemImg.jpg";

import { AuthContext } from "../../contexts/AuthContext";
import { ErrorContext } from "../../contexts/ErrorContext";

//a page for displaying Real Estate items
export default function ViewItem() {

  require('dayjs/locale/th');

  const { error, setError } = useContext(ErrorContext);
  const { user } = useContext(AuthContext);

  const [items, setItems] = useState([]);

  const navigate = useNavigate();
  let { id } = useParams();

  useEffect(() => {
    axios
      .get(`/real_estate/${id}`)
      .then((res) => {
        setItems(res.data);
        console.log(res);
      })
      .catch((err) => {
        setError(err);
        console.log(err);
      });
  }, []);

  //DELETE handler
  //checks if the logged-in user_id match with realEstate's user_id
  const deleteItem = async (id) => {
    if (items.user_id === user.id) {
      return await axios.delete(
        `/real_estate/${id}`,
        navigate(-1),
        notification.success({
          message: `ลบประกาศสำเร็จแล้ว`,
          placement: `bottomRight`,
        }),
        setTimeout(() => {
          window.location.reload(false);
        }, 1500)
      );
    } else {
      return notification.error({
        message: `คุณไม่ใช่เจ้าของประกาศ`,
        placement: `bottomRight`,
      });
    }
  };

  //PUT handler
  //checks if the logged-in user_id match with realEstate's user_id
  //edit function are from ViewItem.js (container) and EditItemForm.js (form)
  const editItem = async () => {
    if (items.user_id === user.id) {
      return notification.success({
        message: `แก้ไขประกาศสำเร็จแล้ว`,
        placement: `bottomRight`,
      });
    } else {
      return notification.error({
        message: `คุณไม่ใช่เจ้าของประกาศ`,
        placement: `bottomRight`,
      });
    }
  };

const relativeTime = require('dayjs/plugin/relativeTime')
dayjs.extend(relativeTime)

const timeCreate = dayjs(items.createdAt).locale('th').fromNow();
const timeUpdate = dayjs(items.updatedAt).locale('th').fromNow();

  if (error) {
    return <div>Error: {error.message}</div>;
  } else {
    return (
      <ViewItemContainer
        type={items.type}
        land_size={items.land_size}
        product_title={items.product_title}
        product_description={items.product_description}
        living_area={items.living_area}
        province={items.province}
        status={items.status}
        address={items.address}
        price={items.price}
        category={items.category}
        createdAt={timeCreate}
        updatedAt={timeUpdate}
        image_1={items.image_1 || itemImg}
        image_2={items.image_2 || itemImg}
        image_3={items.image_3 || itemImg}
        image_4={items.image_4 || itemImg}
        image_5={items.image_5 || itemImg}
        user_id={items.user_id}
        real_estateID={items.id}
        deleteHandler={deleteItem}
        editHandler={editItem}
      />
    );
  }
}
