import { Link } from "react-router-dom";
import classes from "./MainNavigation.module.css";

//Nav Bar
function MainNavigation() {
  const logo = require('./Logo.png');
  return (
    <>
    <header className={classes.header}>
      <Link to="/filter_item">
        <img src={logo} className={classes.logoImage} alt="not found"/>
        <span className={classes.logo}> LAND SEARCH</span>
      </Link>

      <nav>
        <ul>
          <li>
            <Link to="/filter_item">หมวดหมู่</Link>
          </li>
          <li>
            <Link to="/list_item">ลงประกาศ</Link>
          </li>
          <li>
            <Link to="/profile">สมาชิก</Link>
          </li>
        </ul>
      </nav>
    </header>
  </>
  );
}

export default MainNavigation;
