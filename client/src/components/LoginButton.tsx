import { useAuth0 } from "@auth0/auth0-react";
import { motion } from "framer-motion";

export const LoginButton = () => {
  const { loginWithPopup } = useAuth0();

  return (
    <motion.button
      id="loginBtn"
      initial={{ boxShadow: "3px 4px 0px rgb(133, 133, 133)" }}
      whileHover={{
        scale: 1.1,
        boxShadow: "none",
        textShadow: "2px 2px 1px rgba(0, 0, 0, 0.527)",
      }}
      whileTap={{
        scale: 0.9,
        boxShadow: "inset 0px 0px 10px rgb(0, 0, 0)",
      }}
      transition={{
        type: "spring",
        stiffness: 400,
        damping: 15,
      }}
      onClick={() => loginWithPopup()}
    >
      Log In
    </motion.button>
  );
};
