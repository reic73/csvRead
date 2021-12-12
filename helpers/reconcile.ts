import {
  getStandardNaming,
  getObjectFromList,
  compareData,
  getTextFromObject,
} from "./common-helper";
import { getSummaryReport } from "./summary-report";

interface IMismatchedData {
  arrayFormatList: any[];
  objectFormatList: any[];
}

export const getMismatchedData = (
  bankStatement: any[],
  transactionStatement: any[],
  rawHeaders: any[]
): IMismatchedData => {
  let additionalHeaders = [];
  additionalHeaders = rawHeaders.concat(["Remarks"]);
  const standardNamingHeaders = getStandardNaming(additionalHeaders);

  const mismatchedData = findMismatchData(
    bankStatement,
    transactionStatement,
    standardNamingHeaders
  );

  const toReturn = {
    arrayFormatList: mismatchedData.arrayFormat,
    objectFormatList: mismatchedData.objectFormat,
    summaryReport: mismatchedData.summaryReport,
    additionalHeaders,
  };
  return toReturn;
};

const findMismatchData = (
  bankStatement: any[],
  transactionStatement: any[],
  headers: any[]
) => {
  const mismatchDataInArrayList: any[] = [];
  const mismatchDataInObjectList: any[] = [];
  const processedData: any[] = [];
  const bankStatementData: { [index: string]: any } =
    getObjectFromList(bankStatement);

  mismatchDataInArrayList.push(headers);

  transactionStatement.map((transaction) => {
    const uniqueKeys = Object.keys(transaction);
    const id = uniqueKeys[0];
    const bankDetails = bankStatementData[id] ? bankStatementData[id] : {};
    const transactionDetails = transaction[id];

    const differences = compareData(transactionDetails, bankDetails);
    const allProcessData: { [index: string]: any } = {
      ...transactionDetails,
      remarks: differences,
    };
    processedData.push(allProcessData);

    const hasDifferences = Object.keys(differences).length > 0;
    if (hasDifferences) {
      const mismatchData: { [index: string]: any } = {
        ...transactionDetails,
        remarks: differences,
      };

      const mismatchDataArray: string[] = Object.values(transactionDetails);
      const remarkText = getTextFromObject(differences);
      mismatchDataArray.push(remarkText);

      mismatchDataInArrayList.push(mismatchDataArray);
      mismatchDataInObjectList.push(mismatchData);
    }
  });

  const summaryReport = getSummaryReport(processedData, headers);
  console.log("summaryReport", summaryReport);

  return {
    objectFormat: mismatchDataInObjectList,
    arrayFormat: mismatchDataInArrayList,
    summaryReport: summaryReport,
  };
};
