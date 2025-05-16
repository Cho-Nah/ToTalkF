const units = ["B", "KB", "MB", "GB", "TB", "PB"];

/**
 * @example
 * formatSize(2048)         // 2.0 KB
 * formatSize(76913049)     // 73.3 MB
 * formatSize(60988535603)  // 56.8 GB
 */
const formatSize = (bytes: number) => {
  const number = bytes === 0 ? 0 : Math.floor(Math.log(bytes) / Math.log(1024));

  return `${(bytes / 1024 ** Math.floor(number)).toFixed(1)} ${units[number]}`;
}

export default formatSize;