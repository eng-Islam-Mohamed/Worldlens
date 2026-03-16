/** Structured country data returned from our API */
export interface CountryData {
  name: {
    common: string;
    official: string;
    nativeName: Record<string, { official: string; common: string }>;
  };
  capital: string[];
  region: string;
  subregion: string;
  population: number;
  area: number;
  flags: {
    png: string;
    svg: string;
    alt?: string;
  };
  borders: string[];
  borderNames: string[];
  languages: Record<string, string>;
  currencies: Record<string, { name: string; symbol: string }>;
  timezones: string[];
  latlng: [number, number];
  maps: {
    googleMaps: string;
    openStreetMaps: string;
  };
  cca2: string;
  cca3: string;
  coatOfArms: {
    png: string;
    svg: string;
  };
}

/** API response wrapper */
export interface ExploreResponse {
  success: boolean;
  data?: CountryData;
  error?: string;
  interpretedAs?: string;
}
