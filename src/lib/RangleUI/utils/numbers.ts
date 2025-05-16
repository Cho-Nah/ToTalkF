/**
 * @example 
 * fitNumber(65, 0, 100, 0, 1);   // 0.65
 * fitNumber(0.65, 0, 1, 0, 100); // 65
 */
export const fitNumber = (
  number: number, 
  old_min: number, 
  old_max: number, 
  new_min: number, 
  new_max: number
) => {
  let old_range = old_max - old_min;
  let new_range = new_max - new_min;

  return ((number - old_min) * new_range) / old_range + new_min;
}

/**
 * @param number
 * @param min left limit
 * @param max right limit
 * @returns ``number`` if min < number < max, ``min`` if number <= min, and ``max`` if number >= max
 * 
 * @example
 * let num1 = 83;
 * let num2 = 0.33;
 * limitNumber(num1, 0, 100); // 83
 * limitNumber(num2, 0.5, 1); // 0.5
 */
export const limitNumber = (number: number, min: number, max: number) => {
  return Math.min(max, Math.max(min, number));
}

/**
 * Normalizes a number to the range [0; 1] from the original range
 * @returns float in range [0; 1]
 * 
 * @example
 * normalize(380, 0, 1000); // 0.38
 */
export const normalizeNumber = (number: number, min: number, max: number) => {
  return fitNumber(number, min, max, 0, 1);
}

/**
 * Checks if a number is in the range [min; max]
 * 
 * @example
 * isInRange(0.5, 0, 1);    // true
 * isInRange(133, 0, 100);  // false
 */
export const isInRange = (number: number, min: number, max: number) => {
  return number >= min && number <= max;
}

/**
 * Checks if two numbers are approximately equal (with some error `epsilon`)
 * @param epsilon Maximum difference between numbers (error)
 * @returns `true` if the difference between the numbers is less than epsilon
 * 
 * @example
 * isApproximatelyEqual(1000, 1001, 2);    // true
 * isApproximatelyEqual(0.15, 0.14, 0.01); // true
 */
export const isApproximatelyEqual = (a: number, b: number, epsilon=1e-6) => {
  return Math.abs(a - b) < epsilon;
}

/**
 * @returns what percentage `number` is of `total`
 */
export const getPercentage = (number: number, total: number) => {
  return (number / total) * 100;
}

/**
 * @returns returns a percentage `percent` of `total`
 * @example
 * fromPercentage(15, 1000); // 150
 * fromPercentage(48, 50);   // 24
 */
export const fromPercentage = (percent: number, total: number) => {
  return total * (percent / 100);
}

/**
 * Uses Math.random. DO NOT use in cryptography.
 * @returns pseudorandom float in range [min; max)
 */
export const randomFloat = (min=0, max=1) => {
  return Math.random() * (max - min) + min;
}

/**
 * Uses Math.random. DO NOT use in cryptography.
 * @returns pseudorandom int in range [min; max)
 */
export const randomInt = (min=0, max=100) => {
  return Math.floor(randomFloat(min, max));
}

/**
 * Selects a random element from an array.
 * 
 * Uses Math.random. DO NOT use in cryptography.
 */
export const randomChoose = <T>(array: T[]) => {
  return array[randomInt(0, array.length)];
}

export const toDegrees = (radians: number) => {
  return radians * 180 / Math.PI;
}

export const toRadians = (degrees: number) => {
  return degrees * Math.PI / 180;
}

export const getSum = (numbers: number[]) => {
  return numbers.reduce((acc, cur) => acc + cur, 0);
}

export const getAverage = (numbers: number[]) => {
  return getSum(numbers) / numbers.length;
}