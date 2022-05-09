import { React, useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import axios from "../../config/axios";

import RealEstateCard from "../container/RealEstateCard";

import { Row, Col } from "antd";

import ShowAllButton from "../filter/ShowAllButton";
import CategoryFilterButton from "../filter/CategoryButton";
import TypeFilterButton from "../filter/TypeButton";
import ProvinceFilterButton from "../filter/ProvinceButton";
import SearchList from "../filter/SearchList";
import SearchBar from "../filter/SearchBar";

//default image for caroussel image
import itemImg from "../../assets/images/itemImg.jpg";

import { ErrorContext } from "../../contexts/ErrorContext";

import { SideBarContext } from "../../contexts/SideBarContext";
import { RiMenuLine } from "react-icons/ri";

import classes from "./FilterItem.module.css";

//a page for displaying real estate cards with filter sidebar
export default function FilterItem() {
  const { error, setError } = useContext(ErrorContext);

  const [pageNum, setPageNum] = useState(1);

  /*    Sidebar    */
  const { isExpanded, setIsExpanded } = useContext(SideBarContext);

  const handleToggler = () => {
    if (isExpanded) {
      setIsExpanded(false);
      localStorage.setItem("sidebar-collapsed", true);
      return;
    }
    setIsExpanded(true);
    localStorage.removeItem("sidebar-collapsed");
  };
  /*              */

  const [items, setItems] = useState([]);
  const [originalItems, setOriginalItems] = useState([]);

  useEffect(() => {
    axios
      .get(`/real_estate/new?page=${pageNum}`)
      .then((res) => {
        setItems(res.data);
        setOriginalItems(res.data);
        console.log(res);
      })
      .catch((err) => {
        setError("");
        setError(err.response.data.message);
        console.log(err);
      });
  }, []);

  // Load more button
  const loadMoreItems = async () => {
    axios
      .get(`/real_estate/loadMore?page=${pageNum}`)
      .then((res) => {
        console.log(res.data);
        let tempState = [...items, ...res.data];
        setItems(tempState);
        setPageNum((prev) => prev + 1);
      })
      .catch((err) => {
        setError("");
        setError(err.response.data.message);
        console.log(err);
      });
  };

  // Category Filter
  const menuCategoryItems = [...new Set(items.map((Val) => Val.category))];
  const filterByCategory = (curcat) => {
    const newItem = items.filter((newVal) => {
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

  //Search Bar
  const [searchInput, setSearchInput] = useState("");
  const filter = (e) => {
    const keyword = e.target.value;
    if (keyword !== "") {
      setSearchInput(e.target.value);
      const results = items.filter((item) => {
        return item.product_title
          .toLowerCase()
          .includes(searchInput.toLowerCase());
        // Use the toLowerCase() method to make it case-insensitive
      });
      setItems(results);
    } else {
      setItems(items);
    }
  };

  //Reset Filter
  const showAllItems = () => {
    setItems(originalItems);
  };

  if (error) {
    return <div>Error: {error.message}</div>;
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
              <h1>อสังหาริมทรัพย์</h1>
              <div className={classes.searchListContainer}>
                <SearchList items={items} />
              </div>
              <br />
            </div>
          </div>

          <Col span={23} offset={1}>
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
        <br />
      </>
    );
  }
}
