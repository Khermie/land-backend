/**
 * Tiny classnames combinator — joins truthy class strings and
 * skips falsy values (undefined, null, false, "").
 */
export function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}
