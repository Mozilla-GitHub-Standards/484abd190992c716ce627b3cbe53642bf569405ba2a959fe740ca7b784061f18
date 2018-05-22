import React, { Component } from "react";
import { NavLink, Link } from "react-router-dom";

// Components
import Hamburger from "../components/Hamburger";

// Images
import logo from "../img/logo.svg";
import logoSquare from "../img/logo-square.svg";
import AuthStore from '../utils/AuthStore'

const collapseMenu = () => {
  const burger = document.querySelector(".burger");
  const mobileNav = document.querySelector(".navbar__list");
  const body = document.body;

  if (mobileNav.classList.contains("is-active")) {
    burger.classList.toggle("is-active");
    mobileNav.classList.toggle("is-active");
    body.classList.toggle("nav-active");
  }
};

const NavbarLink = props => (
  <li className="navbar__item">
    <NavLink className="navbar__link" to={props.link} onClick={collapseMenu}>
      {props.title}
    </NavLink>
  </li>
);

const GithubButton = props => {
    let text = "Connect with Github"
    let callback = ()=>AuthStore.start()
    console.log("checking logged in", AuthStore.isLoggedIn())
    if (AuthStore.isLoggedIn()) {
        text = "Log Out"
        if(AuthStore.getCurrentUser()) text = AuthStore.getCurrentUser().displayName
        callback = () => AuthStore.logout()
    }

    return <a className="navbar__button" href="#" onClick={callback}>
        <span>{text}</span>
    </a>
}

const Navbar = props => {
  return (
    <div className="navbar">
      <div className="navbar__wrap">
        <NavLink className="navbar__logo" to="/">
          <img src={logo} alt="Mozilla" />
        </NavLink>
        <div className="navbar__mobile">
          <Hamburger />
          <NavLink to="/" onClick={collapseMenu}>
            <img
              className="navbar__logo--mobile"
              src={logoSquare}
              alt="Mozilla"
            />
          </NavLink>
        </div>

        <ul className="navbar__list">
          <NavbarLink link="/code" title="Code a Module" />
          <NavbarLink link="/queue" title="What's Coming Next" />
          <NavbarLink link="/about" title="About" />
          <NavbarLink link="/queue-editor" title="Queue Editor" />
        </ul>
        <GithubButton/>
      </div>
    </div>
  );
};

export default Navbar;
