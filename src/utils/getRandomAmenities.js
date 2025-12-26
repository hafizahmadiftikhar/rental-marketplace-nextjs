// utils/getRandomAmenities.js
import {
  communityAmenities,
  apartmentAmenities,
  otherAmenities,
} from "../components/data/amenities";

export const getRandomItems = (array, count = 4) => {
  const shuffled = [...array].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

export const getRandomAmenities = () => {
  return {
    community: getRandomItems(communityAmenities, 4),
    apartment: getRandomItems(apartmentAmenities, 4),
    other: getRandomItems(otherAmenities, 4),
  };
};
