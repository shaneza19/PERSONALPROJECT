import React from 'react';
import classes from "./SearchBar.module.css";

function SearchBar({filter, name, }) {

  return (
    <div className="container">
      <input
        type="search"
        value={name}
        onChange={filter}
        className={classes.barstyling}
        placeholder="ค้นหาหัวข้อ"
      />
    </div>
  );
}

export default SearchBar;