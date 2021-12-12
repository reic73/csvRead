import {
  createInitialObjectFromArray,
  getLatestDate,
  getOldestDate,
} from "./common-helper";

interface ISummary {
  discrepanciesType: { [index: string]: number };
  totalItem: number;
  mismatchDataTotalItem: number;
  startDate: undefined | string;
  endDate: undefined | string;
}

export const getSummaryReport = (
  rawData: any[],
  headers: string[]
): ISummary => {
  const toReturn: ISummary = {
    discrepanciesType: {},
    totalItem: 0,
    mismatchDataTotalItem: 0,
    startDate: "",
    endDate: "",
  };
  const totalItem = rawData?.length;
  if (!totalItem) {
    return toReturn;
  }

  const discrepanciesType = createInitialObjectFromArray(headers);
  let startDate: undefined | string = undefined;
  let endDate: undefined | string = undefined;

  rawData.map((data) => {
    const remarks = Object.keys(data.remarks);
    const hasRemarks = remarks?.length > 0;

    if (hasRemarks) {
      toReturn.mismatchDataTotalItem += 1;
      remarks.map((remark) => {
        discrepanciesType[remark] += 1;
      });
    }

    startDate = getOldestDate(startDate, data.date);
    endDate = getLatestDate(endDate, data.date);
  });

  toReturn.discrepanciesType = discrepanciesType;
  toReturn.totalItem = totalItem;
  toReturn.startDate = startDate;
  toReturn.endDate = endDate;

  return toReturn;
};
