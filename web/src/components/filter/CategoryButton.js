import React from "react";
import classes from "./Button.module.css";

export default function CategoryFilterButton({
  filterByCategory,
  menuCategoryItems,
}) {
  return (
    <>
      <div>
        {menuCategoryItems.map((Val, id) => {
          return (
            <button
              className={classes.button}
              onClick={() => filterByCategory(Val)}
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
