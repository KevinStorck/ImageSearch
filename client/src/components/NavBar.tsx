import { NavLink } from "react-router-dom";
import { ProfileInfo } from "./ProfileInfo";

export const NavBar = () => {
  return (
    <div id="navBar">
      <div id="navImg"></div>
      <NavLink to={"/"}>
        <h1>ImageSearchApp</h1>
      </NavLink>
      <ProfileInfo />
    </div>
  );
};
