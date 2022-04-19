import { useContext } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/images/logo.png'
import classes from "./Header.module.css";
import { AuthContext } from '../../contexts/AuthContext';

function Header() {
  const { logout } = useContext(AuthContext);
  return (
    <>
      <header className={classes.header}>
      <Link to="/filter_item">
        <img src={logo} className={classes.logoImage} alt="not found"/>
      </Link>

      <nav>
        <ul>
          <li>
            <Link to="/filter_item">ค้นหา</Link>
          </li>
          <li>
            <Link to="/list_item">ลงประกาศ</Link>
          </li>
          <li>
            <Link to="/profile">สมาชิก</Link>
          </li>
          <li>
                <a
                  role="button"
                  onClick={() => logout()}
                >
                 ออกระบบ
                </a>
              </li>
        </ul>
      </nav>
    </header>
  </>
  );
}

export default Header;
