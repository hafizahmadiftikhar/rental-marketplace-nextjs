// utils/getRandomReviews.js
import { reviews } from "../components/data/reviews";

/**
 * Returns a random selection of reviews
 * @param {number} count - number of reviews to pick
 * @returns {Array} - array of reviews
 */
export function getRandomReviews(count = 5) {
  const shuffled = [...reviews].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

/**
 * Calculates average rating from an array of reviews
 */
export function getAverageRating(reviewArray) {
  if (!reviewArray.length) return 0;
  const total = reviewArray.reduce((sum, r) => sum + r.stars, 0);
  return (total / reviewArray.length).toFixed(1);
}
