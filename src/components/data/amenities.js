// src/components/data/amenities.js
import {
  FaBox,
  FaConciergeBell,
  FaClock,
  FaRecycle,
  FaBus,
  FaCouch,
  FaSwimmer,
  FaFire,
  FaDog,
  FaHome,
  FaThLarge, // Tile Floors
  FaBroom, // Maintenance placeholder
} from "react-icons/fa";

import {
  GiKitchenKnives, // Kitchen
  GiCupcake, // Countertops placeholder
  GiClothes, // Washer/Dryer / Closet
  GiTable, // Table / furniture
} from "react-icons/gi";

import {
  MdTv,
  MdOutlineKitchen,
  MdFitnessCenter,
  MdPets,
  MdKitchen,
  MdBalcony,
  MdElevator,
} from "react-icons/md";

// Community amenities
export const communityAmenities = [
  { id: "c1", name: "Package Service", icon: FaBox },
  { id: "c2", name: "Concierge", icon: FaConciergeBell },
  { id: "c3", name: "24 Hour Access", icon: FaClock },
  { id: "c4", name: "Recycling", icon: FaRecycle },
  { id: "c5", name: "Public Transportation", icon: FaBus },
  { id: "c6", name: "Elevator", icon: MdElevator },
  { id: "c7", name: "Lounge", icon: FaCouch },
  { id: "c8", name: "Pool", icon: FaSwimmer },
  { id: "c9", name: "Roof Terrace", icon: FaHome },
  { id: "c10", name: "Grill", icon: FaFire },
  { id: "c11", name: "Dog Park", icon: FaDog },
];

// Apartment amenities
export const apartmentAmenities = [
  { id: "a1", name: "Laundry Facilities", icon: GiClothes },
  { id: "a2", name: "Maintenance on Site", icon: FaBroom },
  { id: "a3", name: "Property Manager on Site", icon: GiCupcake },
  { id: "a4", name: "Washer/Dryer", icon: GiClothes },
  { id: "a5", name: "Dishwasher", icon: GiKitchenKnives },
  { id: "a6", name: "Walk-In Closets", icon: GiClothes },
  { id: "a7", name: "Island Kitchen", icon: GiKitchenKnives },
  { id: "a8", name: "Microwave", icon: GiCupcake },
  { id: "a9", name: "Quartz Countertops", icon: GiCupcake },
  { id: "a10", name: "Tile Floors", icon: FaThLarge },
  { id: "a11", name: "Balcony", icon: MdBalcony },
  { id: "a12", name: "Patio", icon: FaHome }, // replaced MdOutlinePatio with FaHome
];

// Other amenities
export const otherAmenities = [
  { id: "o1", name: "Satellite TV", icon: MdTv },
  { id: "o2", name: "Disposal", icon: MdOutlineKitchen },
  { id: "o3", name: "Stainless Steel Appliances", icon: MdKitchen },
  { id: "o4", name: "Kitchen", icon: MdKitchen },
  { id: "o5", name: "Pet Friendly", icon: MdPets },
  { id: "o6", name: "Fitness Center", icon: MdFitnessCenter },
  { id: "o7", name: "Community Events", icon: FaCouch },
];
