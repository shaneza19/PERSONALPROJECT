import React from "react";
import classes from "./Button.module.css";

export default function TypeFilterButton({
  filterByType,
  menuTypeItems,
}) {
  return (
    <>
      <div>
        {menuTypeItems.map((Val, id) => {
          return (
            <button
              className={classes.button}
              onClick={() => filterByType(Val)}
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
