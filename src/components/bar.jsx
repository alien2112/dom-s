import React from "react";
import "./bar.css";
import Logo22 from "../assets/Logo22.png";
import search_icon_light from "../assets/search-w.png";
import search_icon_dark from "../assets/search-b.png";
import toggle_light from "../assets/night.png";
import toggle_dark from "../assets/day.png";
import { NavLink } from "react-router-dom";
import BarItem from "./barItem";
function Bar({ theme, setTheme }) {
  function toggle_theme() {
    theme == "light" ? setTheme("dark") : setTheme("light");
  }

  return (
    <div className={theme==="dark"? `dark`:``}>
      <div className="navbar flex-col md:flex-row justify-between items-center">
        <img
          src={theme == "light" ? Logo22 : Logo22}
          alt=""
          className="logo "
        />
        <ul >
        <BarItem name="Home" to="/" />
  <BarItem name="Menu" to="/menu" />
  <BarItem name="Cart" to="/cart" />
  <BarItem name="Account" to="/account" />
        </ul>
        <div className="search-box">
          <input type="text" placeholder="search" />
          <img
            src={theme == "light" ? search_icon_light : search_icon_dark}
            alt=""
          />
        </div>
        <img
          src={theme == "light" ? toggle_light : toggle_dark}
          alt=""
          className="toggle-icon justify-between items-center"
          onClick={toggle_theme}
        />
      </div>
    </div>
  );
}

export default Bar;
