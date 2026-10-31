export const convertStringToKebabCase = (inputString: string) =>
  inputString
    .replace(/(?<lower>[a-z0-9])(?<upper>[A-Z])/gu, '$<lower>-$<upper>')
    .toLowerCase();
