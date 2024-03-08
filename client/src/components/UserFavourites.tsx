import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import { IImage } from "../models/FavouriteImage";
import { useEffect, useState } from "react";

export const UserFavourites = () => {
  const { user, isAuthenticated } = useAuth0();
  const [favourites, setFavourites] = useState<IImage[]>();

  useEffect(() => {
    if (favourites) return;
    if (!isAuthenticated) return;

    let componentIsActive = true;
    const getFavourites = async () => {
      let response = await axios.get<IImage[]>(
        `http://localhost:3000/users/favourites/${user?.sub}`
      );
      setFavourites(response.data);
    };
    getFavourites();

    return () => {
      componentIsActive = false;
    };
  });

  return (
    <div id="favourites">
      {favourites?.map((image, index) => (
        <img key={index} src={image.url} />
      ))}
    </div>
  );
};
