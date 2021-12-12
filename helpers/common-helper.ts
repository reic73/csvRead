import { standardNaming } from "./standard-naming";

export const getStandardNaming = (keys: string[]) => {
  const toReturn: string[] = [];
  keys.map((key) => {
    toReturn.push(standardNaming[key]);
  });

  return toReturn;
};

export const getObjectFromList = (rawData: any[]): { [index: string]: any } => {
  const toReturn: { [index: string]: any } = {};

  rawData.map((data) => {
    const key = Object.keys(data);
    const object = Object.values(data);
    toReturn[key[0]] = object[0];
  });

  return toReturn;
};

export const compareData = (
  mainSource: { [index: string]: any },
  otherSource: { [index: string]: any }
): { [index: string]: any } => {
  const differences: { [index: string]: any } = {};

  for (const key in mainSource) {
    const isEqual = mainSource[key] == otherSource[key];
    if (!isEqual) {
      differences[key] = `${otherSource[key]}#`;
    }
  }

  return differences;
};

export const getTextFromObject = (objectData: {
  [index: string]: any;
}): string => {
  const objectString = JSON.stringify(objectData);
  const pattern = /[a-z]|[0-9]|[:#]/gi;
  const text = objectString.match(pattern)?.join("").replace(/#/g, " ");

  return text ? text : "";
};

export const createInitialObjectFromArray = (
  rawData: any[]
): {
  [index: string]: any;
} => {
  const toReturn: { [index: string]: number } = {};
  rawData.map((data) => {
    toReturn[data] = 0;
  });

  return toReturn;
};

export const getOldestDate = (
  firstDate: undefined | string,
  secondDate: undefined | string
): undefined | string => {
  if (!firstDate) return secondDate;
  if (!secondDate) return firstDate;

  const firstDateFormat = new Date(firstDate);
  const secondDateFormat = new Date(secondDate);
  const isOldest = firstDateFormat < secondDateFormat;

  return isOldest ? firstDate : secondDate;
};

export const getLatestDate = (
  firstDate: undefined | string,
  secondDate: undefined | string
): undefined | string => {
  if (!firstDate) return secondDate;
  if (!secondDate) return firstDate;

  const firstDateFormat = new Date(firstDate);
  const secondDateFormat = new Date(secondDate);
  const isLatest = firstDateFormat > secondDateFormat;

  return isLatest ? firstDate : secondDate;
};
