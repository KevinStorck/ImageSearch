import { useAuth0 } from "@auth0/auth0-react";
import { LoginButton } from "./LoginButton";
import { Search } from "./Search";
import { LogoutButton } from "./LogoutButton";
import { ProfileInfo } from "./ProfileInfo";

export const ImageSearchApp = () => {
  const { isAuthenticated, user } = useAuth0();
  console.log(user);
  console.log(isAuthenticated);

  return (
    <>
      <ProfileInfo />
      <Search />
      {/* {isAuthenticated ? <LogoutButton /> : <LoginButton />} */}
    </>
  );
};
