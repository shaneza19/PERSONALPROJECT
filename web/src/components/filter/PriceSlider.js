import React from "react";
import { Link } from "react-router-dom";
import classes from "./PriceSlider.module.css";

export default function PriceFilterSlider({ items, handleInput, price }) {
  return (
    <>
      <div>
        <div className={classes.slidecontainer}>
        <input className={classes.slider} type="range" onInput={handleInput} min="0" max="10000000" />
        </div>
        <h4>{price} บาทขึ้นไป</h4>
        <div>
          {items
            .filter((item) => {
              return item.price > parseInt(price, 10);
            })
            .map((item) => {
              return (
                <Link to={`/view_item/${item.id}`}>
                <p className={classes.text} key={item.id}>
                  {item.product_title} | &nbsp;
                  {item.price.toLocaleString(undefined, {
                    maximumFractionDigits: 2,
                  })}
                  &nbsp;baht
                </p>
                </Link>
              );
            })}
        </div>
      </div>
    </>
  );
}
