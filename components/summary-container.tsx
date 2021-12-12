import React from "react";
import { getTextFromObject } from "../helpers/common-helper";

interface ISummaryContainer {
  data: { [index: string]: any };
}

export default function SummaryContainer(props: ISummaryContainer) {
  const data = props.data;
  const mismatchTypeDetail = getTextFromObject(data.discrepanciesType);

  return (
    <>
      <p>There are {data.totalItem} processed data.</p>
      <p>
        Taken from {data.startDate} until {data.endDate}.
      </p>
      <p>Where {data.mismatchDataTotalItem} of them are mismatched data.</p>
      <p>With following mismatch type detail: {mismatchTypeDetail}</p>
    </>
  );
}
