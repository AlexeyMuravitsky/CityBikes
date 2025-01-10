import { useDispatch, useSelector } from "react-redux";
import { selectAllFavoriteStations } from "@/store/favoriteStations";
import {
  removeFavoriteStation,
  removeAllFavoriteStations,
} from "@/store/favoriteStations";
import PageLayout from "../PageLayout/PageLayout";
import ListItem from "../ListItem/ListItem";
import { MdOutlineCancel } from "react-icons/md";
import "./Favorites.scss";

import { RootState } from "@/store/store";
import { IStation } from "@/types/types";

const Favorites = () => {
  const dispatch = useDispatch();

  const favoriteStations = useSelector<RootState, IStation[]>(
    selectAllFavoriteStations
  );

  const handleRemoveFavorite = (station: IStation) => {
    dispatch(removeFavoriteStation(station.id));
  };
  const handleRemoveAllFavorites = () => {
    dispatch(removeAllFavoriteStations());
  };

  const isFavoritesEmpty = favoriteStations.length === 0;

  return (
    <PageLayout>
      <div className="favorites__list">
        <button
          onClick={handleRemoveAllFavorites}
          className="favorites__btn-clear"
        >
          Clear All Stations
        </button>
        {isFavoritesEmpty ? (
          <div>Нет избранных станций</div>
        ) : (
          favoriteStations.map((station) => {
            const { id, name } = station;
            return (
              <ListItem
                key={id}
                name={name}
                icon={
                  <MdOutlineCancel
                    className="heart-icon"
                    onClick={() => handleRemoveFavorite(station)}
                  />
                }
              />
            );
          })
        )}
      </div>
    </PageLayout>
  );
};

export default Favorites;
