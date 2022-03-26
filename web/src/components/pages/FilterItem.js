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

//a page for displaying real estate cards with filter
export default function FilterItem() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);

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
    fetch("http://localhost:8000/real_estate/", { method: "GET" })
      .then((res) => res.json())
      .then((newItem) => {
        setIsLoaded(true);
        setItems(newItem);
      });
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
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return (
      <Row>
        <Col span={8} offset={0} className={classes.container}>
          <h1>ค้นหาอสังหาริมทรัพย์</h1>
          <hr className={classes.style} />
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
        </Col>

        <Col span={16} offset={0}>
          <br />
          <br />
          <ul>
            {items.map((item) => (
              <Link to={`/view_item/${item.id}`}>
                <RealEstateCard
                  key={item.id}
                  image_url1={item.image_url1}
                  product_title={item.product_title}
                  price={item.price}
                />
              </Link>
            ))}
          </ul>
        </Col>
      </Row>
    );
  }
}
