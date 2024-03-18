import { useAuth0 } from "@auth0/auth0-react";
import { NavLink } from "react-router-dom";
import { LogoutButton } from "./LogoutButton";

export const ProfileInfo = () => {
  const { user, isAuthenticated } = useAuth0();

  return (
    <div id="profile">
      {isAuthenticated && (
        <NavLink to={"/favourites"}>
          <h1>Favourites</h1>
        </NavLink>
      )}
      {isAuthenticated && <img src={user?.picture} alt="profile picture" />}
      {isAuthenticated && <LogoutButton />}
    </div>
  );
};
