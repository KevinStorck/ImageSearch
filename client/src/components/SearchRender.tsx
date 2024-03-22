import { RefObject, useContext, useEffect, useRef, useState } from "react";
import { SearchDataContext } from "../context/SearchDataContext";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import { ImageSearch } from "../services/ImageSearchService";
import { objectToIImageSearchData } from "../functions/objectToIImageSearchData";
import { motion } from "framer-motion";

interface ISearchRenderProps {
  setInput: (input: string) => void;
}

export const SearchRender = ({ setInput }: ISearchRenderProps) => {
  const { user, isAuthenticated } = useAuth0();
  const { searchData, setSearchData } = useContext(SearchDataContext);

  const [focus, setFocus] = useState<string>("");

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
    <div className="searchResult">
      {searchData.searchInformation.searchTime ? (
        <h2>Söktid: {searchData.searchInformation.searchTime.toFixed(2)}s</h2>
      ) : (
        <></>
      )}
      {searchData.spelling && (
        <h2>
          Menade du:{" "}
          <span
            onClick={async () => {
              if (searchData.spelling) {
                if (searchData.spelling.correctedQuery) {
                  setSearchData(
                    objectToIImageSearchData(
                      await ImageSearch(searchData.spelling.correctedQuery)
                    )
                  );
                  setInput(searchData.spelling.correctedQuery);
                }
              }
            }}
          >
            {searchData.spelling.correctedQuery}
          </span>
          ?
        </h2>
      )}
      <div className="imageContainer">
        {searchData.items.map((item, i) => (
          <div key={i}>
            <div className={focus ? "imageCard dontclick" : "imageCard"}>
              <img
                onClick={() => {
                  setFocus(item.link);
                }}
                src={item.link}
                className="searchImage"
                style={focus !== "" ? { filter: "blur(3px)" } : undefined}
              />
            </div>
            {item.link === focus ? (
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
                <img src={item.link} className="searchImage" />
                <div>
                  <p>{item.title}</p>
                  {item.link === focus ? (
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
                        if (!isAuthenticated) return;
                        if (typeof user?.sub === "undefined") return;
                        let response = await axios.post(
                          "http://localhost:3000/users/favourite/add",
                          {
                            id: user.sub,
                            favourite: {
                              title: item.title,
                              byteSize: item.image.byteSize,
                              url: item.link,
                              searchTerm:
                                searchData.queries.request[0].searchTerms,
                            },
                          }
                        );
                      }}
                    >
                      Add to Favourites
                    </motion.button>
                  ) : null}
                </div>
                <a target="_blank" href={item.link}>
                  {item.link}
                </a>
              </motion.div>
            ) : null}
          </div>
        ))}
      </div>
    </div>
  );
};
