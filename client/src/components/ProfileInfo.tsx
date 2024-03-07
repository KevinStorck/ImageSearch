import { useAuth0 } from "@auth0/auth0-react";
import { LoginButton } from "./LoginButton";
import { LogoutButton } from "./LogoutButton";
import { NavLink } from "react-router-dom";

export const ProfileInfo = () => {
  const { user, isAuthenticated } = useAuth0();

  return (
    <div id="profile">
      {isAuthenticated && (
        <NavLink to={"/favourites"}>
          <h1>{user?.nickname}</h1>
        </NavLink>
      )}
      {isAuthenticated && <img src={user?.picture} alt="profile picture" />}
      {isAuthenticated ? <LogoutButton /> : <LoginButton />}
    </div>
  );
};
