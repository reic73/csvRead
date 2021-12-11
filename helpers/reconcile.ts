import { getStandardNaming } from "./common-helper";

interface IMismatchedData {
  success: boolean;
  data: any[];
}

export const getMismatchedData = (
  bankStatement: any[],
  transactionStatement: any[],
  rawHeaders: any[]
): IMismatchedData => {
  let concatHeaders = [];

  concatHeaders = rawHeaders.concat(["Remarks"]);
  const standardHeaders = getStandardNaming(concatHeaders);

  const mismatchedData = validateData(
    bankStatement,
    transactionStatement,
    standardHeaders
  );

  const toReturn = {
    success: true,
    data: mismatchedData.data,
    modifiedTransactionStatement: mismatchedData.modifiedTransactionStatement,
  };
  return toReturn;
};

const validateData = (
  bankStatement: any[],
  transactionStatement: any[],
  headers: any[]
) => {
  const toReturn: any[] = [];
  const mismatchTransaction: any[] = [];
  toReturn.push(headers);
  const bankStatementList: { [index: string]: any } =
    getObjectFromArray(bankStatement);

  transactionStatement.map((transaction) => {
    const uniqueKeys = Object.keys(transaction);
    const id = uniqueKeys[0];
    const bankDetails = bankStatementList[id] ? bankStatementList[id] : {};
    const transactionDetails = transaction[id];

    const remarks = findDifference(transactionDetails, bankDetails);
    const hasRemark = Object.keys(remarks).length > 0;
    if (hasRemark) {
      const mismatchData = {
        ...transaction[id],
        remarks,
      };

      const transactionDetail = Object.values(transactionDetails);
      const remarkText = JSON.stringify(remarks);
      const pattern = /[a-z]|[0-9]|[:#]/gi;
      const modifiedRemarkText = remarkText
        .match(pattern)
        ?.join("")
        .replace(/#/g, " ");
      transactionDetail.push(modifiedRemarkText);
      toReturn.push(transactionDetail);
      mismatchTransaction.push(mismatchData);
    }
  });

  return {
    modifiedTransactionStatement: mismatchTransaction,
    data: toReturn,
  };
};

const getObjectFromArray = (rawData: any[]): { [index: string]: any } => {
  const toReturn: { [index: string]: any } = {};
  rawData.map((data) => {
    const key = Object.keys(data);
    const object = Object.values(data);

    toReturn[key[0]] = object[0];
  });
  return toReturn;
};

const findDifference = (
  originalSource: { [index: string]: any },
  source: { [index: string]: any }
): { [index: string]: any } => {
  const remark: { [index: string]: any } = {};
  for (const key in originalSource) {
    const isEqual = originalSource[key] == source[key];
    if (!isEqual) {
      remark[key] = `${source[key]}#`;
    }
  }
  return remark;
};
