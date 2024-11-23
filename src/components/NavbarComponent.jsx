import React from "react";
import { HiHome } from "react-icons/hi";

const NavbarComponent = () => {
  return (
    <>
      <nav className="navbar bg-body-tertiary">
        <div className="container">
          <a className="navbar-brand" href="#">
            <img
              src="https://getbootstrap.com/docs/5.3/assets/brand/bootstrap-logo.svg"
              alt="Logo"
              width="30"
              height="24"
              className="d-inline-block align-text-top"
            />
            WireHouse Websoite
          </a>
        </div>
      </nav>
    </>
  );
};

export default NavbarComponent;
