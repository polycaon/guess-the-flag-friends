
import { Flag } from "@/types/game";

// First, let's define all country sets separately
const easyCountries: Flag[] = [
  { name: "United States", code: "us", hint: "Home of Hollywood and the Statue of Liberty" },
  { name: "United Kingdom", code: "gb", hint: "Home of Big Ben and the Queen" },
  { name: "France", code: "fr", hint: "Home of the Eiffel Tower" },
  { name: "Japan", code: "jp", hint: "Land of the Rising Sun" },
  { name: "Brazil", code: "br", hint: "Famous for carnival and soccer" },
  { name: "Canada", code: "ca", hint: "Known for maple syrup" },
  { name: "Australia", code: "au", hint: "Home to kangaroos" },
  { name: "China", code: "cn", hint: "Home of the Great Wall" },
  { name: "Russia", code: "ru", hint: "Largest country in the world" },
  { name: "India", code: "in", hint: "Land of the Taj Mahal" },
  { name: "Germany", code: "de", hint: "Known for Oktoberfest" },
  { name: "Italy", code: "it", hint: "Famous for pizza and pasta" },
  { name: "Spain", code: "es", hint: "Known for flamenco dance" },
  { name: "Mexico", code: "mx", hint: "Known for tacos and pyramids" },
  { name: "South Korea", code: "kr", hint: "Land of K-pop" }
];

const moderateCountries: Flag[] = [
  { name: "Argentina", code: "ar", hint: "Land of tango" },
  { name: "Ireland", code: "ie", hint: "Emerald Isle" },
  { name: "New Zealand", code: "nz", hint: "Land of the Kiwis" },
  { name: "Singapore", code: "sg", hint: "Garden City" },
  { name: "Malaysia", code: "my", hint: "Home of the Petronas Towers" },
  { name: "Philippines", code: "ph", hint: "Pearl of the Orient" },
  { name: "Vietnam", code: "vn", hint: "Famous for Ha Long Bay" },
  { name: "Chile", code: "cl", hint: "Land of the Andes" },
  { name: "Colombia", code: "co", hint: "Known for coffee" },
  { name: "Peru", code: "pe", hint: "Home of Machu Picchu" },
  { name: "Ukraine", code: "ua", hint: "Known for its wheat fields" },
  { name: "Czech Republic", code: "cz", hint: "Known for its castles" },
  { name: "Romania", code: "ro", hint: "Home of Dracula's castle" },
  { name: "Hungary", code: "hu", hint: "Known for goulash" },
  { name: "Morocco", code: "ma", hint: "Known for its bazaars" }
];

const difficultCountries: Flag[] = [
  { name: "Kazakhstan", code: "kz", hint: "Largest landlocked country" },
  { name: "Uruguay", code: "uy", hint: "Known for mate tea" },
  { name: "Croatia", code: "hr", hint: "Land of a thousand islands" },
  { name: "Slovenia", code: "si", hint: "Land of caves" },
  { name: "Slovakia", code: "sk", hint: "Heart of Europe" },
  { name: "Estonia", code: "ee", hint: "Digital society pioneer" },
  { name: "Latvia", code: "lv", hint: "Known for Art Nouveau" },
  { name: "Lithuania", code: "lt", hint: "Land of basketball" },
  { name: "Belarus", code: "by", hint: "Land of lakes" },
  { name: "Azerbaijan", code: "az", hint: "Land of Fire" }
];

const hardCountries: Flag[] = [
  { name: "Albania", code: "al", hint: "Land of eagles" },
  { name: "Bosnia and Herzegovina", code: "ba", hint: "Land of bridges" },
  { name: "Cyprus", code: "cy", hint: "Island of Aphrodite" },
  { name: "Malta", code: "mt", hint: "Heart of the Mediterranean" },
  { name: "Luxembourg", code: "lu", hint: "European banking center" },
  { name: "Iceland", code: "is", hint: "Land of fire and ice" },
  { name: "Andorra", code: "ad", hint: "Pyrenean paradise" },
  { name: "Monaco", code: "mc", hint: "Home of the Grand Prix" },
  { name: "Liechtenstein", code: "li", hint: "Alpine principality" },
  { name: "San Marino", code: "sm", hint: "Oldest republic in the world" }
];

const impossibleCountries: Flag[] = [
  { name: "Kiribati", code: "ki", hint: "Pacific island nation" },
  { name: "Tuvalu", code: "tv", hint: "Smallest UN member state" },
  { name: "Vanuatu", code: "vu", hint: "South Pacific archipelago" },
  { name: "Palau", code: "pw", hint: "Known for jellyfish lake" },
  { name: "Nauru", code: "nr", hint: "Smallest island nation" },
  { name: "Marshall Islands", code: "mh", hint: "Made of coral atolls" },
  { name: "Micronesia", code: "fm", hint: "Scattered island nation" },
  { name: "Comoros", code: "km", hint: "Islands of the moon" },
  { name: "Djibouti", code: "dj", hint: "Horn of Africa" },
  { name: "Eritrea", code: "er", hint: "Land of the Red Sea" }
];

// Now create the COUNTRIES object with progressive difficulty
export const COUNTRIES: Record<string, Flag[]> = {
  easy: easyCountries,
  moderate: [...easyCountries, ...moderateCountries],
  difficult: [...easyCountries, ...moderateCountries, ...difficultCountries],
  hard: [...easyCountries, ...moderateCountries, ...difficultCountries, ...hardCountries],
  impossible: [...easyCountries, ...moderateCountries, ...difficultCountries, ...hardCountries, ...impossibleCountries]
};
