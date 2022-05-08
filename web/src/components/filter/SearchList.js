import React from "react";
import { Link } from "react-router-dom";
import classes from "./SearchList.module.css";
import { RiPlayLine } from "react-icons/ri";

export default function SearchList({ items }) {
  return (
    <>
      <div>
        <div>
          {items.map((item) => {
            return (
              <div className={classes.slidecontainer}>
                <Link to={`/view_item/${item.id}`}>
                  <div className={classes.alignItems}>
                    <div className={classes.alignTextItem}>
                      <div className={classes.alignContent}>
                        <RiPlayLine className={classes.icon}/>
                        <p className={classes.text} key={item.id}>
                          {item.product_title} | &nbsp;
                          {item.price.toLocaleString(undefined, {
                            maximumFractionDigits: 2,
                          })}
                          &nbsp;baht
                        </p>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
