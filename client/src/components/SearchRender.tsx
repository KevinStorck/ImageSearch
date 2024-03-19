import { useContext, useState } from "react";
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
      <div
        className="imageContainer"
        onClickCapture={() => {
          setFocus("");
        }}
      >
        {searchData.items.map((item, i) => (
          <>
            <div className="imageCard" key={i}>
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
                initial={{ width: "0", height: "0" }}
                animate={{ width: "50dvw", height: "60dvh" }}
                transition={{
                  type: "spring",
                  stiffness: 400,
                  damping: 25,
                }}
              >
                <img
                  onClick={() => {
                    setFocus(item.link);
                  }}
                  src={item.link}
                  className="searchImage"
                />
                <div>
                  <p>LOREM DOREM IPSUM SIPSUM</p>
                  {item.link === focus ? (
                    <button
                      onClick={async () => {
                        if (!isAuthenticated) return;
                        if (typeof user?.sub === "undefined") return;
                        let response = await axios.post(
                          "http://localhost:3000/users/favourite/add",
                          {
                            id: user.sub,
                            favourite: {
                              title: searchData.queries.request[0].searchTerms,
                              byteSize: item.image.byteSize,
                              url: item.link,
                            },
                          }
                        );
                        console.log(response);
                      }}
                    >
                      Add to Favourites
                    </button>
                  ) : null}
                </div>
              </motion.div>
            ) : null}
          </>
        ))}
      </div>
    </div>
  );
};
