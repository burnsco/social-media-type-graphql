export const low = ([first, ...rest]: string[] | string | null | undefined) =>
  first ? first.toLowerCase() + rest.join("") : ""
