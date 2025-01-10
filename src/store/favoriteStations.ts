import { createSlice, createEntityAdapter } from "@reduxjs/toolkit";
import { RootState } from "@/store/store";
import { IStation } from "@/types/types";

const favoriteStationsAdapter = createEntityAdapter({
  selectId: (station: IStation) => station.id,
});

const initialState = favoriteStationsAdapter.getInitialState();

const favoriteStationsSlice = createSlice({
  name: "favoriteStations",
  initialState,
  reducers: {
    addFavoriteStation: favoriteStationsAdapter.addOne,
    removeFavoriteStation: favoriteStationsAdapter.removeOne,
    removeAllFavoriteStations: favoriteStationsAdapter.removeAll,
  },
});

export const {
  addFavoriteStation,
  removeFavoriteStation,
  removeAllFavoriteStations,
} = favoriteStationsSlice.actions;

export default favoriteStationsSlice.reducer;

export const {
  selectAll: selectAllFavoriteStations,
  selectIds: selectFavoriteStationIds,
} = favoriteStationsAdapter.getSelectors(
  (state: RootState) => state.favoriteStations
);
