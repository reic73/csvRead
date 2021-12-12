import React from "react";
import { getTextFromObject } from "../helpers/common-helper";
import Button from "@mui/material/Button";
import downloadAsTxt from "../helpers/txt-downloader";

interface ISummaryContainer {
  data: { [index: string]: any };
}

export default function SummaryContainer(props: ISummaryContainer) {
  const data = props.data;
  const mismatchTypeDetail = getTextFromObject(data.discrepanciesType);
  const summaryText = `There are ${data.totalItem} processed data, which is taken from ${data.startDate} until ${data.endDate}, where ${data.mismatchDataTotalItem} of them are mismatched data, with following type detail: ${mismatchTypeDetail}`;

  return (
    <>
      {summaryText}
      <div className="my-2 pr-5 flex justify-end">
        <Button
          variant="contained"
          className="w-48"
          onClick={() => downloadAsTxt(summaryText, "summary-report")}
        >
          Download
        </Button>
      </div>
    </>
  );
}
