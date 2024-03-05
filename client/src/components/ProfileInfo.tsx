import { useAuth0 } from "@auth0/auth0-react";
import { LoginButton } from "./LoginButton";
import { LogoutButton } from "./LogoutButton";

export const ProfileInfo = () => {
  const { user, isAuthenticated } = useAuth0();

  return (
    <div id="profile">
      <h1>{user?.nickname}</h1>
      {isAuthenticated && <img src={user?.picture} alt="profile picture" />}
      {isAuthenticated ? <LogoutButton /> : <LoginButton />}
    </div>
  );
};
