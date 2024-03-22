import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import { IImageFromServer } from "../models/FavouriteImage";
import { RefObject, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

export const UserFavourites = () => {
  const { user, isAuthenticated } = useAuth0();
  const [favourites, setFavourites] = useState<IImageFromServer[]>();
  const [focus, setFocus] = useState<string>("");

  useEffect(() => {
    if (favourites) return;
    if (!isAuthenticated) return;

    let componentIsActive = true;
    const getFavourites = async () => {
      if (componentIsActive) {
        let response = await axios.get<IImageFromServer[]>(
          `http://localhost:3000/users/favourites/${user?.sub}`
        );
        setFavourites(response.data);
      }
    };
    getFavourites();

    return () => {
      componentIsActive = false;
    };
  });
  function useOutsideAlerter(ref: RefObject<HTMLDivElement>) {
    useEffect(() => {
      function handleClickOutside(event: { target: any }) {
        if (ref.current && !ref.current.contains(event.target)) {
          setFocus("");
        }
      }
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ref]);
  }
  const wrapperRef = useRef<HTMLDivElement>(null);
  useOutsideAlerter(wrapperRef);

  return (
    <div className="imageContainer">
      {favourites?.map((item, i) => (
        <div key={i}>
          <div className={focus ? "imageCard dontclick" : "imageCard"}>
            <img
              onClick={() => {
                setFocus(item.url);
              }}
              src={item.url}
              className="searchImage"
              style={focus !== "" ? { filter: "blur(3px)" } : undefined}
            />
          </div>
          {item.url === focus ? (
            <motion.div
              className="expandingImageCard"
              ref={wrapperRef}
              initial={{ height: "0", width: "0" }}
              animate={{ height: "auto", width: "auto" }}
              transition={{
                type: "spring",
                stiffness: 400,
                damping: 35,
                duration: 0.2,
              }}
            >
              <img src={item.url} className="searchImage" />
              <div>
                <h2>{item.searchTerm}</h2>
                <p>{item.title}</p>
                {item.url === focus ? (
                  <motion.button
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
                    onClick={async () => {
                      if (typeof user?.sub === "undefined") return;
                      let response = await axios.post(
                        "http://localhost:3000/users/favourite/remove",
                        {
                          id: user.sub,
                          favourite: {
                            title: item.title,
                            byteSize: item.byteSize,
                            url: item.url,
                            searchTerm: item.searchTerm,
                            id: item.id,
                          },
                        }
                      );
                      if (response.status === 200) {
                        setFavourites(
                          favourites.filter(
                            (favourite) => favourite.id !== item.id
                          )
                        );
                        setFocus("");
                      }
                    }}
                  >
                    Remove
                  </motion.button>
                ) : null}
              </div>
              <a target="_blank" href={item.url}>
                {item.url}
              </a>
            </motion.div>
          ) : null}
        </div>
      ))}
    </div>
  );
};
