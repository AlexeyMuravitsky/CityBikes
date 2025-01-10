import { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addFavoriteStation,
  removeFavoriteStation,
  selectFavoriteStationIds,
} from "@/store/favoriteStations";
import { useGetNetworksQuery, useGetStationsQuery } from "@/store/apiCityBikes";
import ListItem from "../ListItem/ListItem";
import PageLayout from "../PageLayout/PageLayout";
import PreLoader from "../PreLoader/PreLoader";
import { GoHeartFill } from "react-icons/go";

import { useRequestError } from "@/hooks/useRequestError";

import { IStation } from "@/types/types";

import "./NetworksList.scss";

const NetworksList = () => {
  const [selectedNetworkId, setSelectedNetworkId] = useState<string | null>(
    null
  );
  const [selectedStationId, setSelectedStationId] = useState<string | null>(
    null
  );

  const {
    isFetching: isFetchingNetworks,
    networks,
    error: networksError,
  } = useGetNetworksQuery(undefined, {
    selectFromResult: (result) => ({
      isFetching: result.isFetching,
      networks: result.data?.networks || [],
      error: result.error,
    }),
  });

  const {
    isFetching: isFetchingStations,
    stations,
    error: stationsError,
  } = useGetStationsQuery(selectedNetworkId, {
    skip: !selectedNetworkId,
    selectFromResult: (result) => ({
      isFetching: result.isFetching,
      stations: result.data?.network.stations || [],
      error: result.error,
    }),
  });

  const {
    isFetchBaseQueryError: isNetworkFetchError,
    isErrorWithMessage: isNetworkErrorWithMessage,
    errorMessage: networkErrorMessage,
  } = useRequestError(networksError);

  const {
    isFetchBaseQueryError: isStationFetchError,
    isErrorWithMessage: isStationErrorWithMessage,
    errorMessage: stationErrorMessage,
  } = useRequestError(stationsError);

  const dispatch = useDispatch();

  const favoriteStationsId = useSelector(selectFavoriteStationIds);

  const handleFavoriteToggle = (station: IStation) => {
    const isFavorite = favoriteStationsId.includes(station.id);
    if (isFavorite) {
      dispatch(removeFavoriteStation(station.id));
      return;
    }
    dispatch(addFavoriteStation(station));
  };

  const handleNetworkSelect = (id: string) => {
    setSelectedNetworkId(id);
  };

  const handleStationSelect = (id: string) => {
    setSelectedStationId(id);
  };

  const isStationsEmpty =
    selectedNetworkId && stations?.length === 0 && !isFetchingStations;

  const selectedNetwork = useMemo(
    () => networks.find(({ id }) => id === selectedNetworkId),
    [networks, selectedNetworkId]
  );

  const stationsTitle = selectedNetwork
    ? `${selectedNetwork.name} Stations`
    : "Выберите сеть для отображения станций";

  return (
    <PageLayout>
      <div className="citybikes-container">
        <div className="networks">
          <div className="networks__title">Networks List</div>
          <div className="networks__list">
            {isFetchingNetworks && <PreLoader />}

            {isNetworkFetchError && <div>{networkErrorMessage}</div>}

            {isNetworkErrorWithMessage && <div>{networkErrorMessage}</div>}

            {networks.map(({ id, name, location: { city } }) => {
              const isActiveNetwork = selectedNetworkId === id;
              const isActiveNetworkClass = isActiveNetwork
                ? "list__item--active"
                : "";
              return (
                <ListItem
                  className={isActiveNetworkClass}
                  key={id}
                  name={name}
                  descr={city}
                  onClick={() => handleNetworkSelect(id)}
                />
              );
            })}
          </div>
        </div>

        <div className="stations">
          <div className="stations__title">{stationsTitle}</div>
          <div className="stations__list">
            {isFetchingStations && <PreLoader />}

            {isStationFetchError && <div>{stationErrorMessage}</div>}

            {isStationErrorWithMessage && <div>{stationErrorMessage}</div>}

            {isStationsEmpty && (
              <div>Нет активных станций у выбранной сети</div>
            )}

            {!isFetchingStations &&
              stations.map((station) => {
                const { id, name } = station;
                const isActiveStation = selectedStationId === id;
                const isFavorite = favoriteStationsId.includes(id);
                const isActiveStationClass = isActiveStation
                  ? "list__item--active"
                  : "";
                const isActiveIconClass = isFavorite
                  ? "heart-icon heart-icon--active"
                  : "heart-icon";

                return (
                  <ListItem
                    className={isActiveStationClass}
                    key={id}
                    name={name}
                    onClick={() => handleStationSelect(id)}
                    icon={
                      <GoHeartFill
                        className={isActiveIconClass}
                        onClick={() => handleFavoriteToggle(station)}
                      />
                    }
                  />
                );
              })}
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default NetworksList;
