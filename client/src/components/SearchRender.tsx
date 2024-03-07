import { useContext } from "react";
import { SearchOutputContext } from "../context/SearchOutputContext";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import { FavouriteImage } from "../models/FavouriteImage";

export const SearchRender = () => {
  const { user, isAuthenticated } = useAuth0();
  const { searchData } = useContext(SearchOutputContext);

  console.log(searchData.items);

  return (
    <div>
      {searchData.searchInformation.searchTime ? (
        <h2>{searchData.searchInformation.searchTime}</h2>
      ) : (
        <></>
      )}
      <h2>{searchData.spelling?.correctedQuery}</h2>
      {searchData.items.map((item) => (
        <img
          onClick={async () => {
            if (!isAuthenticated) return;
            if (typeof user?.sub === "undefined") return;
            let response = await axios.post(
              "http://localhost:3000/users/favourite/add",
              new FavouriteImage(user.sub, {
                title: item.link,
                byteSize: item.image.byteSize,
                url: item.link,
              })
            );
            console.log(response);
          }}
          key={item.image.byteSize}
          src={item.link}
          className="searchImage"
        />
      ))}
    </div>
  );
};
