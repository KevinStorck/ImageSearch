import { useAuth0 } from "@auth0/auth0-react";
import { motion } from "framer-motion";

export const LogoutButton = () => {
  const { logout } = useAuth0();

  return (
    <motion.button
      initial={{ boxShadow: "3px 4px 0px rgb(133, 133, 133)" }}
      whileHover={{
        scale: 0.95,
        boxShadow: "none",
        // textShadow: "2px 2px 3px rgba(0, 0, 0, 0.527)",
      }}
      whileTap={{
        scale: 0.9,
        boxShadow: "inset 0px 0px 10px rgb(133, 133, 133)",
      }}
      transition={{
        type: "spring",
        stiffness: 400,
        damping: 10,
      }}
      onClick={() =>
        logout({ logoutParams: { returnTo: window.location.origin } })
      }
    >
      Log Out
    </motion.button>
  );
};
