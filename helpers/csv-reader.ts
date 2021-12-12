import { getStandardNaming } from "./common-helper";
const delimiter = ",";

interface ICsvToArray {
  rawHeaders: string[];
  rows: any[];
  isSuccess: boolean;
}

interface ICsvArrayToObject {
  isSuccess: boolean;
  data: any[];
}

export const csvToArray = (rawData: string): ICsvToArray => {
  const rawHeaders = rawData.slice(0, rawData.indexOf("\n")).split(delimiter);
  const rawRows = rawData
    .slice(rawData.indexOf("\n") + 1, rawData.lastIndexOf("\n"))
    .split("\n");

  const csvObj = csvArrayToObject(rawRows, rawHeaders);
  const rows = csvObj.data;

  const toReturn = {
    rawHeaders: csvObj.isSuccess ? rawHeaders : [],
    rows: csvObj.isSuccess ? rows : [],
    isSuccess: csvObj.isSuccess,
  };
  return toReturn;
};

const csvArrayToObject = (
  rawRows: string[],
  rawHeaders: string[]
): ICsvArrayToObject => {
  let isSuccess = true;
  const toReturn: any[] = [];
  const headers = getStandardNaming(rawHeaders);
  rawRows.map((row) => {
    const rowDetails: { [index: string]: string } = {};
    const rowObj: { [index: string]: any } = {};
    const values = row.split(delimiter);
    values.map((value, index) => {
      rowDetails[headers[index]] = value;
    });

    const id = rowDetails.id;
    if (id == undefined) {
      isSuccess = false;
    }
    rowObj[id] = rowDetails;
    toReturn.push(rowObj);
  });

  return { isSuccess, data: toReturn };
};
