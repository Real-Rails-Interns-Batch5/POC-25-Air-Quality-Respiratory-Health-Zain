export interface City {
  id: string;
  name: string;
  country: string;
  latitude: number;
  longitude: number;
}

export const cities: City[] = [
  {
    id: "kochi",
    name: "Kochi",
    country: "India",
    latitude: 9.9312,
    longitude: 76.2673,
  },
  {
    id: "dubai",
    name: "Dubai",
    country: "UAE",
    latitude: 25.2048,
    longitude: 55.2708,
  },
  {
    id: "abudhabi",
    name: "Abu Dhabi",
    country: "UAE",
    latitude: 24.4539,
    longitude: 54.3773,
  },
  {
    id: "riyadh",
    name: "Riyadh",
    country: "Saudi Arabia",
    latitude: 24.7136,
    longitude: 46.6753,
  },
  {
    id: "doha",
    name: "Doha",
    country: "Qatar",
    latitude: 25.2854,
    longitude: 51.5310,
  },
  {
    id: "muscat",
    name: "Muscat",
    country: "Oman",
    latitude: 23.5880,
    longitude: 58.3829,
  },
  {
    id: "kuwait",
    name: "Kuwait City",
    country: "Kuwait",
    latitude: 29.3759,
    longitude: 47.9774,
  },
  {
    id: "manama",
    name: "Manama",
    country: "Bahrain",
    latitude: 26.2235,
    longitude: 50.5876,
  },
];