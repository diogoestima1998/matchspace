export type CityCoordinates = {
  lng: number;
  lat: number;
};

export const CITY_COORDINATES: Record<string, CityCoordinates> = {
  "zürich": { lng: 8.5417, lat: 47.3769 },
  "zurich": { lng: 8.5417, lat: 47.3769 },
  "geneva": { lng: 6.1432, lat: 46.2044 },
  "genève": { lng: 6.1432, lat: 46.2044 },
  "basel": { lng: 7.5886, lat: 47.5596 },
  "bern": { lng: 7.4474, lat: 46.948 },
  "lausanne": { lng: 6.6323, lat: 46.5197 },
  "lugano": { lng: 8.9511, lat: 46.0037 },
  "winterthur": { lng: 8.7241, lat: 47.4988 },
  "luzern": { lng: 8.3093, lat: 47.0502 },
  "lucerne": { lng: 8.3093, lat: 47.0502 },
  "st. gallen": { lng: 9.3767, lat: 47.4245 },
  "st gallen": { lng: 9.3767, lat: 47.4245 },
  "zug": { lng: 8.5155, lat: 47.1662 },
  "fribourg": { lng: 7.162, lat: 46.8065 },
  "neuchâtel": { lng: 6.9293, lat: 46.99 },
  "neuchatel": { lng: 6.9293, lat: 46.99 },
  "chur": { lng: 9.5329, lat: 46.8508 },
  "biel": { lng: 7.2474, lat: 47.1368 },
  "sion": { lng: 7.3606, lat: 46.2331 },
  "thun": { lng: 7.6281, lat: 46.7585 },
};

export function getCityCoordinates({ city }: { city: string }) {
  return CITY_COORDINATES[city.trim().toLowerCase()] || null;
}
