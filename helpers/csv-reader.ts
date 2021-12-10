import { standarNaming } from "./standard-naming";
const delimiter = ",";

export const csvToArray = (rawData: string): any[] => {
  console.log("input helper", rawData);
  const rawHeaders = rawData.slice(0, rawData.indexOf("\n")).split(delimiter);
  const rawRows = rawData
    .slice(rawData.indexOf("\n") + 1, rawData.lastIndexOf("\n"))
    .split("\n");

  const rows = csvArrayToObject(rawRows, rawHeaders);
  return rows;
  console.log("rawData", rawData);
  console.log("rawRow", rawRows);
  console.log("rows", rows);
};

const csvArrayToObject = (rawRows: string[], rawHeaders: string[]): any[] => {
  const toReturn: any = [];
  const headers = toStandardNaming(rawHeaders);
  rawRows.map((row) => {
    const rowObj: { [index: string]: string } = {};
    const values = row.split(delimiter);
    values.map((value, index) => {
      rowObj[headers[index]] = value;
    });
    toReturn.push(rowObj);
  });
  return toReturn;
};

const toStandardNaming = (keys: string[]) => {
  const toReturn: string[] = [];
  keys.map((key) => {
    toReturn.push(standarNaming[key]);
  });
  return toReturn;
};
