import { React, useState, useEffect } from "react";
import RealEstateCard from "../container/RealEstateCard";
import { Row, Col } from "antd";
import { Link } from "react-router-dom";
import ShowAllButton from "../filter/ShowAllButton";
import CategoryFilterButton from "../filter/CategoryButton";
import TypeFilterButton from "../filter/TypeButton";
import ProvinceFilterButton from "../filter/ProvinceButton";
import PriceFilterSlider from "../filter/PriceSlider";
import SearchBar from "../filter/SearchBar";
import classes from "./FilterItem.module.css";
import itemImg from "../../assets/images/itemImg.jpg";
import axios from "../../config/axios";

/* Sidebar */
import { RiMenuLine } from "react-icons/ri";

//a page for displaying real estate cards with filter

export default function FilterItem() {
  /* Sidebar */
  const sidebarCollapsed = localStorage.getItem("sidebar-collapsed");
  const [isExpanded, setIsExpanded] = useState(sidebarCollapsed ? false : true);

  const handleToggler = () => {
    if (isExpanded) {
      setIsExpanded(false);
      localStorage.setItem("sidebar-collapsed", true);
      return;
    }
    setIsExpanded(true);
    localStorage.removeItem("sidebar-collapsed");
  };
  /* Sidebar Ends */

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState([]);
  const [originalItems, setOriginalItems] = useState([]);

  useEffect(() => {
    axios
      .get("/real_estate/new")
      .then((res) => {
        setLoading(true);
        setItems(res.data);
        setOriginalItems(res.data);
        console.log(res);
      })
      .catch((err) => {
        setLoading(true);
        setError(error);
      });
  }, []);

const loadMoreItems = async () => {
  axios.get("/real_estate/loadMore")
  .then((res) => {
    console.log(res.data);
    let tempState = [...items,...res.data];
    setItems(tempState);
  })
  .catch((err) => {
    console.log(err);
  });
};

  // Category Filter
  const menuCategoryItems = [...new Set(items.map((Val) => Val.category))];
  const filterByCategory = (curcat) => {
    const newItem = items.filter((newVal) => {
      //comparing category for displaying data
      return newVal.category === curcat;
    });
    setItems(newItem);
  };

  //Type Filter
  const menuTypeItems = [...new Set(items.map((Val) => Val.type))];
  const filterByType = (curcat) => {
    const newItem = items.filter((newVal) => {
      return newVal.type === curcat;
    });
    setItems(newItem);
  };

  //Province Filter
  const menuProvinceItems = [...new Set(items.map((Val) => Val.province))];
  const filterByProvince = (curcat) => {
    const newItem = items.filter((newVal) => {
      return newVal.province === curcat;
    });
    setItems(newItem);
  };

  //Reset Filter
  const showAllItems = () => {
    setLoading(true);
    setItems(originalItems);
  };

  //Price Filter
  const [price, setPrice] = useState(0);
  const handleInput = (e) => {
    setPrice(e.target.value);
  };

  //Search Bar
  const filter = (e) => {
    const keyword = e.target.value;
    if (keyword !== "") {
      const results = items.filter((item) => {
        return item.product_title.toLowerCase().includes(keyword.toLowerCase());
        // Use the toLowerCase() method to make it case-insensitive
      });
      setItems(results);
    } else {
      setItems(items);
    }
  };

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!loading) {
    return <div>Loading...</div>;
  } else {
    return (
      <>
        <Row>
          <div
            className={isExpanded ? classes.SideBar : classes.SideBarCollapsed}
          >
            <br />
            <br />
            <br />
            <br />
            <RiMenuLine
              className={classes.SideBarIcon}
              onClick={handleToggler}
            />
            <div className={classes.SideBarContent}>
              <h1>ค้นหาอสังหาริมทรัพย์</h1>
              <br />
              <SearchBar
                filter={filter}
                //name = {name}
              />
              <br />
              <ShowAllButton showAllItems={showAllItems} data={items} />
              <h1>① หมวดหมู่</h1>
              <CategoryFilterButton
                filterByCategory={filterByCategory}
                setItems={setItems}
                menuCategoryItems={menuCategoryItems}
              />
              <h1>② ขาย/เช่า</h1>
              <TypeFilterButton
                filterByType={filterByType}
                setItems={setItems}
                menuTypeItems={menuTypeItems}
              />
              <h1>③ จังหวัด</h1>
              <ProvinceFilterButton
                filterByProvince={filterByProvince}
                setItems={setItems}
                menuProvinceItems={menuProvinceItems}
              />
              <h1>ราคา</h1>
              <div className={classes.priceContainer}>
                <PriceFilterSlider
                  items={items}
                  handleInput={handleInput}
                  price={price}
                />
              </div>
            </div>
          </div>

          <Col span={24} offset={1}>
            <br />
            <br />
            <ul>
              {items.map((item) => (
                <Link to={`/view_item/${item.id}`}>
                  <RealEstateCard
                    key={item.id}
                    image_1={item.image_1 || itemImg}
                    product_title={item.product_title}
                    province={item.province}
                    category={item.category}
                    type={item.type}
                    price={item.price}
                  />
                </Link>
              ))}
            </ul>
          </Col>
        </Row>
        <Row>
          <button className={classes.loadMore} onClick={loadMoreItems}>
            แสดงเพิ่มเติม
          </button>
        </Row>
        <br/>
      </>
    );
  }
}
