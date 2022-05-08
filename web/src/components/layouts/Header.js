import React, { useContext } from "react";
import {  useNavigate, Link } from "react-router-dom";

import { AuthContext } from "../../contexts/AuthContext";

//Collapsible hamburger navbar
import { Container, Navbar, Nav, NavDropdown } from "react-bootstrap";

//Navigation bar
function Header() {
  const { logout } = useContext(AuthContext);

  const navigate = useNavigate()

  return (
    <>
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Container>
          <Navbar.Brand className="fs-4" onClick={() => navigate("/filter_item")}>LandSearch</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto fs-5">
              <Nav.Link onClick={() => navigate("/filter_item")}>
                ค้นหา
              </Nav.Link>
              <Nav.Link onClick={() => navigate("/create_item")}>
                ลงประกาศ
              </Nav.Link>
              <Nav.Link onClick={() => navigate("/profile")}>
                สมาชิก
              </Nav.Link>
              <NavDropdown title="อื่นๆ" id="collasible-nav-dropdown">
                <NavDropdown.Item href="#action/3.1" onClick={() => navigate("/history")}>
                  รายการประกาศของฉัน
                </NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">
                  Another action
                </NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">
                Another action
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">
                Another action
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
            <Nav>
              <Nav.Link eventKey={2} onClick={() => logout()} className="fs-5">
                ออกจากระบบ
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default Header;
