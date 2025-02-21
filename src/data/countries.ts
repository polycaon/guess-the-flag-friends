
import { Flag } from "@/types/game";

// Country codes are updated to match the flag CDN requirements
const easyCountries: Flag[] = [
  { name: "United States", code: "us", hint: "Home of Hollywood and the Statue of Liberty" },
  { name: "United Kingdom", code: "gb", hint: "Home of Big Ben and the Queen" },
  { name: "France", code: "fr", hint: "Home of the Eiffel Tower" },
  { name: "Germany", code: "de", hint: "Known for Oktoberfest" },
  { name: "Italy", code: "it", hint: "Famous for pizza and pasta" },
  { name: "Spain", code: "es", hint: "Known for flamenco dance" },
  { name: "China", code: "cn", hint: "Home of the Great Wall" },
  { name: "Japan", code: "jp", hint: "Land of the Rising Sun" },
  { name: "India", code: "in", hint: "Land of the Taj Mahal" },
  { name: "Brazil", code: "br", hint: "Famous for carnival and soccer" },
  { name: "Russia", code: "ru", hint: "Largest country in the world" },
  { name: "Canada", code: "ca", hint: "Known for maple syrup" },
  { name: "Australia", code: "au", hint: "Home to kangaroos" },
  { name: "Mexico", code: "mx", hint: "Known for tacos and pyramids" },
  { name: "South Korea", code: "kr", hint: "Land of K-pop" }
];

const moderateCountries: Flag[] = [
  { name: "Argentina", code: "ar", hint: "Land of tango" },
  { name: "Netherlands", code: "nl", hint: "Land of tulips" },
  { name: "Belgium", code: "be", hint: "Famous for waffles" },
  { name: "Sweden", code: "se", hint: "Land of the midnight sun" },
  { name: "Switzerland", code: "ch", hint: "Known for chocolate and Alps" },
  { name: "Austria", code: "at", hint: "Home of Mozart" },
  { name: "Norway", code: "no", hint: "Land of the fjords" },
  { name: "Denmark", code: "dk", hint: "Home of LEGO" },
  { name: "Finland", code: "fi", hint: "Land of the Northern Lights" },
  { name: "Ireland", code: "ie", hint: "Emerald Isle" },
  { name: "Portugal", code: "pt", hint: "Famous for port wine" },
  { name: "Greece", code: "gr", hint: "Birthplace of democracy" },
  { name: "Czech Republic", code: "cz", hint: "Known for its castles" },
  { name: "Romania", code: "ro", hint: "Home of Dracula's castle" },
  { name: "Hungary", code: "hu", hint: "Known for goulash" }
];

const difficultCountries: Flag[] = [
  { name: "Poland", code: "pl", hint: "Known for pierogi" },
  { name: "Ukraine", code: "ua", hint: "Known for its wheat fields" },
  { name: "Thailand", code: "th", hint: "Land of Smiles" },
  { name: "Vietnam", code: "vn", hint: "Famous for Ha Long Bay" },
  { name: "Turkey", code: "tr", hint: "Where Europe meets Asia" },
  { name: "Egypt", code: "eg", hint: "Land of the pyramids" },
  { name: "South Africa", code: "za", hint: "Rainbow Nation" },
  { name: "New Zealand", code: "nz", hint: "Land of the long white cloud" },
  { name: "Indonesia", code: "id", hint: "Largest archipelago country" },
  { name: "Philippines", code: "ph", hint: "Pearl of the Orient" },
  { name: "Malaysia", code: "my", hint: "Home of the Petronas Towers" },
  { name: "Singapore", code: "sg", hint: "Lion City" },
  { name: "Israel", code: "il", hint: "Land of milk and honey" },
  { name: "United Arab Emirates", code: "ae", hint: "Home of the Burj Khalifa" },
  { name: "Saudi Arabia", code: "sa", hint: "Land of the Two Holy Mosques" }
];

const hardCountries: Flag[] = [
  { name: "Croatia", code: "hr", hint: "Land of a thousand islands" },
  { name: "Serbia", code: "rs", hint: "Balkan crossroads" },
  { name: "Slovenia", code: "si", hint: "Land of caves" },
  { name: "Slovakia", code: "sk", hint: "Heart of Europe" },
  { name: "Bulgaria", code: "bg", hint: "Land of roses" },
  { name: "Estonia", code: "ee", hint: "Digital society pioneer" },
  { name: "Latvia", code: "lv", hint: "Known for Art Nouveau" },
  { name: "Lithuania", code: "lt", hint: "Land of basketball" },
  { name: "Iceland", code: "is", hint: "Land of fire and ice" },
  { name: "Luxembourg", code: "lu", hint: "European banking center" },
  { name: "Cyprus", code: "cy", hint: "Island of Aphrodite" },
  { name: "Malta", code: "mt", hint: "Heart of the Mediterranean" },
  { name: "Qatar", code: "qa", hint: "Pearl of the Gulf" },
  { name: "Kuwait", code: "kw", hint: "Oil-rich emirate" },
  { name: "Bahrain", code: "bh", hint: "Pearl of the Gulf" }
];

const impossibleCountries: Flag[] = [
  { name: "Uruguay", code: "uy", hint: "Known for mate tea" },
  { name: "Paraguay", code: "py", hint: "Heart of South America" },
  { name: "Bolivia", code: "bo", hint: "Land of salt flats" },
  { name: "Ecuador", code: "ec", hint: "Named after the equator" },
  { name: "Colombia", code: "co", hint: "Known for coffee" },
  { name: "Peru", code: "pe", hint: "Home of Machu Picchu" },
  { name: "Chile", code: "cl", hint: "Land of the Andes" },
  { name: "Panama", code: "pa", hint: "Famous for its canal" },
  { name: "Costa Rica", code: "cr", hint: "Pure life (Pura vida)" },
  { name: "Jamaica", code: "jm", hint: "Land of wood and water" },
  { name: "Morocco", code: "ma", hint: "Known for its bazaars" },
  { name: "Tunisia", code: "tn", hint: "Land of ancient Carthage" },
  { name: "Jordan", code: "jo", hint: "Land of ancient Petra" },
  { name: "Oman", code: "om", hint: "Land of frankincense" },
  { name: "Mongolia", code: "mn", hint: "Land of the eternal blue sky" }
];

export const COUNTRIES: Record<string, Flag[]> = {
  easy: easyCountries,
  moderate: moderateCountries,
  difficult: difficultCountries,
  hard: hardCountries,
  impossible: impossibleCountries
};
