const units = ["", "K", "M", "B", "T"];

/**
 * @example
 * formatNumber(650)      // 650
 * formatNumber(1300)     // 1.3K
 * formatNumber(43280000) // 43.28M
 */
const formatNumber = (number: number, decimals=2) => {
  if (number === 0) {
    return "0";
  }

  const k = 1000;
  const unit = Math.floor(Math.log(number) / Math.log(k));

  return parseFloat((number / Math.pow(k, unit)).toFixed(decimals)) + units[unit];
}

export default formatNumber;