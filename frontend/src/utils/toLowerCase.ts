export const low = ([first, ...rest]: string[]) =>
  first ? first.toLowerCase() + rest.join('') : ''
