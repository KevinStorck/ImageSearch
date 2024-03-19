import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth0 } from "@auth0/auth0-react";
import { LoginButton } from "./LoginButton";
import { LogoutButton } from "./LogoutButton";

export const NavBar = () => {
  const { isAuthenticated, user } = useAuth0();
  return (
    <motion.div
      initial={{ height: "100dvh" }}
      animate={{
        height: isAuthenticated ? "55px" : "100dvh",
        boxShadow: isAuthenticated ? "0px 4px 1px rgba(0, 0, 0, 0.2)" : "none",
      }}
      id="navBar"
    >
      <div id="navBarLeft">
        {isAuthenticated && <img src={user?.picture} alt="profile picture" />}
        {isAuthenticated && <h1>{user?.nickname}</h1>}
      </div>
      <div>
        <NavLink
          className={({ isActive }) =>
            isActive && isAuthenticated ? "nav-link-active" : "nav-link"
          }
          to={"/"}
        >
          <motion.h1
            whileHover={{ scale: 1.1 }}
            style={{
              textDecoration: isAuthenticated
                ? undefined
                : "underline solid #ff48c4 5px",
              marginBottom: !isAuthenticated ? "100px" : 0,
            }}
            initial={{ fontSize: "0px" }}
            animate={{
              fontSize: isAuthenticated ? "2rem" : "5rem",
            }}
            transition={{ duration: 0.1 }}
          >
            ImageSearchApp
          </motion.h1>
        </NavLink>
        {!isAuthenticated && <LoginButton />}
      </div>
      <div id="navBarRight">
        {isAuthenticated && (
          <NavLink
            to={"/favourites"}
            className={({ isActive }) =>
              isActive ? "nav-link-active" : "nav-link"
            }
          >
            <h1>Favourites</h1>
          </NavLink>
        )}
        {isAuthenticated && <LogoutButton />}
      </div>
    </motion.div>
  );
};
