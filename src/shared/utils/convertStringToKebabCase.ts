export const convertStringToKebabCase = (inputString: string) => {
  return inputString.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();
};
