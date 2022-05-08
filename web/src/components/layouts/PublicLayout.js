import { Outlet, Link } from "react-router-dom";
import logo from "../../assets/images/logo.png";

import styles from "../../Auth.module.css";

//Login and Register Pages Layout
function PublicLayout() {
  return (
    <div className="container">
      <div className="row align-items-center justify-content-center vh-100">
        <div className="col-lg-7">
          <Link to="/">
            <img src={logo} alt="not found" />
          </Link>
          <h3 className={styles.h3}>
            Land Search helps you find real estate for sell & rent in Thailand.
          </h3>
        </div>
        <div className="col-lg-5">
          <Outlet />
          <p className="pt-3 text-center">
            <b>สร้างโพส</b> สำหรับบ้านสิ่งปลูกสร้างหรือกิจการ
          </p>
        </div>
      </div>
    </div>
  );
}

export default PublicLayout;
