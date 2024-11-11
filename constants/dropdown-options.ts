//Category Options
export const CATEGORY_OPTIONS = {
  PROPERTY: "Trade Me Property",
  MOTORS: "Trade Me Motors",
  JOBS: "Trade Me Jobs",
  // Add other options as needed
};

// Display Name Mapping for Categories (used for validation)
export const CATEGORY_DISPLAY_NAME_MAP: { [key: string]: string[] } = {
  "Trade Me Property": ["Property", "Properties"],
  "Business, farming & industry": ["Business, farming & industry"],
  "Trade Me Motors": ["Motors", "Motors for sale"],
  "Trade Me Jobs": ["Jobs"],
  // Add other categories and display names as needed
};

// Regions
export const ALL_LOCATIONS_REGIONS_OPTIONS = {
  NEW_ZEALAND: "New Zealand",
  NORTH_ISLAND: "North Island",
  NORTHLAND: "Northland",
  WELLINGTON: "Wellington",
  // Add other regions as needed
};

// Constants for each district within regions
export const NORTHLAND_DISTRICTS = {
  ALL_OF_NORTHLAND: "All of Northland",
  DARGAVILLE: "Dargaville",
  KAIKOHE: "Kaikohe",
  KAITAIA: "Kaitaia",
  KAWAKAWA: "Kawakawa",
  KERIKERI: "Kerikeri",
  MANGAWHAI: "Mangawhai",
  MAUNGATUROTO: "Maungaturoto",
  PAIHIA: "Paihia",
  WHANGAREI: "Whangarei",
};

export const WELLINGTON_DISTRICTS = {
  ALL_OF_WELLINGTON: "All of Wellington",
  KAPITI: "Kapiti",
  LOWER_HUTT_CITY: "Lower Hutt City",
  PORIRUA: "Porirua",
  UPPER_HUTT_CITY: "Upper Hutt City",
  WELLINGTON_CITY: "Wellington City",
};

// Grouping districts by region in ALL_LOCATIONS_DISTRICTS
export const ALL_LOCATIONS_DISTRICTS = {
  Northland: NORTHLAND_DISTRICTS,
  Wellington: WELLINGTON_DISTRICTS,
  // Add other regions as needed
};
