import { useContext, useState } from "react";
import { SearchDataContext } from "../context/SearchDataContext";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import { ImageSearch } from "../services/ImageSearchService";
import { objectToIImageSearchData } from "../functions/objectToIImageSearchData";

interface ISearchRenderProps {
  setInput: (input: string) => void;
}

export const SearchRender = ({ setInput }: ISearchRenderProps) => {
  const { user, isAuthenticated } = useAuth0();
  const { searchData, setSearchData } = useContext(SearchDataContext);

  const [hover, setHover] = useState<string>("");

  console.log(searchData);

  return (
    <div className="imageContainer">
      {searchData.searchInformation.searchTime ? (
        <h2>{searchData.searchInformation.searchTime}</h2>
      ) : (
        <></>
      )}
      {searchData.spelling && (
        <h2
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
        </h2>
      )}
      {searchData.items.map((item) => (
        <div
          className="imageCard"
          key={item.link}
          onClick={() => {
            console.log(hover);

            setHover(item.link);
          }}
          onMouseLeave={() => setHover("")}
          style={item.link === hover ? { width: "800px" } : undefined}
        >
          <img
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
            src={item.link}
            className="searchImage"
          />
          {item.link === hover ? <p></p> : null}
          {item.link === hover ? <button></button> : null}
        </div>
      ))}
    </div>
  );
};
