import React, { useState } from "react";
import TransactionTable from "../components/transaction-table";
import SummaryContainer from "../components/summary-container";
import InputFile from "../components/input-file";
import { csvToArray } from "../helpers/csv-reader";
import { errorHandler, errorMessage } from "../helpers/error-handler";
import { getMismatchedData } from "../helpers/reconcile";
import Button from "@mui/material/Button";

const Home = () => {
  const [bankStatement, setBankStatement] = useState<any[]>([]);
  const [transactionStatement, setTransactionStatement] = useState<any[]>([]);
  const [rawHeaders, setRawHeaders] = useState<any[]>([]);
  const [mismatchObjectFormatList, setMisMatchObjectFormatList] = useState<
    any[]
  >([]);
  const [mismatchArrayFormatList, setMismatchArrayFormatList] = useState<any[]>(
    []
  );
  const [summaryData, setSummaryData] = useState<{ [index: string]: any }>({});
  const [appendedRawHeader, setAppendedRawHeader] = useState<any[]>([]);
  const [canCheck, setCanCheck] = useState<undefined | boolean>(undefined);

  const onSelectFile = (
    e: any,
    callBack: any,
    isReportHeader: boolean = false
  ): any => {
    if (e?.target.files[0]) {
      const { type } = e.target.files[0];
      const fileType = type.slice(type.indexOf("/") + 1);
      if (fileType != "csv") {
        errorHandler(errorMessage["FILE_IS_NOT_CSV"]);
        return;
      }

      const reader = new FileReader();
      reader.readAsText(e.target.files[0]);
      reader.addEventListener("load", () => {
        const emptyCsv = `\r\n`;
        const csvRawData = reader.result ? reader.result.toString() : emptyCsv;
        const csvData = csvToArray(csvRawData);

        if (!csvData.isSuccess) {
          errorHandler(errorMessage["NO_HEADER_ID"]);
          return;
        }

        callBack(csvData.rows);
        if (isReportHeader) {
          setRawHeaders(csvData.rawHeaders);
        }

        return;
      });
    } else {
      errorHandler(errorMessage["FILE_IS_NOT_FOUND"]);
      return;
    }
  };

  const onCheck = () => {
    const hasRequiredInfo =
      bankStatement.length > 0 &&
      transactionStatement.length > 0 &&
      rawHeaders.length > 0;
    setCanCheck(hasRequiredInfo);
    if (hasRequiredInfo) {
      const mismatchResponse = getMismatchedData(
        bankStatement,
        transactionStatement,
        rawHeaders
      );

      setMisMatchObjectFormatList(mismatchResponse.objectFormatList);
      setMismatchArrayFormatList(mismatchResponse.arrayFormatList);
      setAppendedRawHeader(mismatchResponse.appendedHeaders);
      setSummaryData(mismatchResponse.summaryReport);
    }
  };

  return (
    <>
      <div className="flex justify-center text-2xl font-bold my-10">
        Data Reconciliation
      </div>

      <div className=" m-8">
        <div className="p-4 border rounded">
          <InputFile
            name={"Bank Statement"}
            onSelect={(e) => {
              onSelectFile(e, setBankStatement);
            }}
          />
          <InputFile
            name="Transaction Statement"
            onSelect={(e) => {
              onSelectFile(e, setTransactionStatement, true);
            }}
          />
          <div className="flex justify-center my-3">
            <div className="flex flex-col">
              <Button variant="contained" className="w-48" onClick={onCheck}>
                Check
              </Button>
              {canCheck != undefined && !canCheck ? (
                <div className="flex justify-center text-xs text-red-600">
                  *Data belum lengkap
                </div>
              ) : null}
            </div>
          </div>
        </div>

        <div className=" my-4 p-4 border rounded">
          {mismatchObjectFormatList.length > 0 ? (
            <>
              <TransactionTable
                headers={appendedRawHeader}
                rows={mismatchObjectFormatList}
                downloadableData={mismatchArrayFormatList}
              />
            </>
          ) : (
            <div className="flex justify-center text-gray-500">
              {canCheck ? " No mismatch data found" : "Please select file"}
            </div>
          )}
        </div>

        <div className=" my-4 p-4 border rounded">
          {canCheck ? (
            <>
              <p className="text-lg font-bold mb-4">Summary</p>
              <SummaryContainer data={summaryData} />
            </>
          ) : null}
        </div>
      </div>
    </>
  );
};

export default Home;
