import React from "react";
import classes from "./Button.module.css";

export default function ProvinceFilterButton({
  filterByProvince,
  menuProvinceItems,
}) {
  return (
    <>
      <div>
        {menuProvinceItems.map((Val, id) => {
          return (
            <button
              className={classes.button}
              onClick={() => filterByProvince(Val)}
              key={id}
            >
              {Val}
            </button>
          );
        })}
      </div>
    </>
  );
}
