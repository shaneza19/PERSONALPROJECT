import React from 'react';
import classes from "./SearchBar.module.css";

function SearchBar({filter, searchInput, myInput}) {

  return (
    <div className="container">
      <input
        type="text"
        value={searchInput}
        onChange={filter}
        className={classes.barstyling}
        placeholder="ค้นหาหัวข้อ"
      />
    </div>
  );
}

export default SearchBar;