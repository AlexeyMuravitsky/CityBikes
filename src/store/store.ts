import { configureStore } from "@reduxjs/toolkit";
import { api } from "./apiCityBikes";
import favoriteStationsReducer from "./favoriteStations";

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    favoriteStations: favoriteStationsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
