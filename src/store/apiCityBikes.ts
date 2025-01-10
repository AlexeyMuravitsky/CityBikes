import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { INetwork, IStation } from "@/types/types";

interface INetworksResponse {
  networks: INetwork[];
}
interface IStationsResponse {
  network: {
    stations: IStation[];
  };
}

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "https://api.citybik.es/v2/" }),
  endpoints: (builder) => ({
    getNetworks: builder.query<INetworksResponse, void>({
      query: () => "networks",
    }),
    getStations: builder.query<IStationsResponse, string | null>({
      query: (networkId) => `networks/${networkId}`,
    }),
  }),
});

export const { useGetNetworksQuery, useGetStationsQuery } = api;
