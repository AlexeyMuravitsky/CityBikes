export interface IStation {
  id: string;
  name: string;
}

export interface INetwork {
  id: string;
  name: string;
  location: ILocation;
  href: string;
  company: string[];
  gbfs_href: string;
}

interface ILocation {
  latitude: number;
  longitude: number;
  city: string;
  country: string;
}
