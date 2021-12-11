import { standardNaming } from "./standard-naming";

export const getStandardNaming = (keys: string[]) => {
  const toReturn: string[] = [];
  keys.map((key) => {
    toReturn.push(standardNaming[key]);
  });
  return toReturn;
};
