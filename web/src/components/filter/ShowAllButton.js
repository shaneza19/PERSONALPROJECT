import React from "react";
import classes from "./ShowAllButton.module.css";

export default function ShowAllButton({ showAllItems, data }) {
  return (
    <>
      <div>
        <button 
          className={classes.button}
          onClick={() => showAllItems(data)}
        >
          แสดงทั้งหมด
        </button>
      </div>
    </>
  );
}
