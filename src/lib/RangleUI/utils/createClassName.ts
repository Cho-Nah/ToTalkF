/**
 * @example
 * // hardcoded flags
 * const isMobile = false;  
 * const isDisabled = true;
 * 
 * // "my-token disabled"
 * const className = createClassName(
 *  "my-token",
 *  isMobile && "mobile",
 *  isDisabled && "disabled"
 * );
 */
export default function createClassName(...tokens: (string | false | undefined)[]) {
  return tokens.filter(Boolean).join(" ");
}
