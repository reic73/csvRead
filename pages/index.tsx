import InputFile from "../components/input-file";
import React, { useState } from "react";
import { csvToArray } from "../helpers/csv-reader";
import { errorHandler, errorMessage } from "../helpers/error-handler";
import Button from "@mui/material/Button";
import StickyHeadTable from "../components/transaction-table";
import { getMismatchedData } from "../helpers/reconcile";

const Home = () => {
  const [bankStatement, setBankStatement] = useState<any[]>([]);
  const [transactionStatement, setTransactionStatement] = useState<any[]>([]);
  const [rawHeaders, setRawHeaders] = useState<any[]>([]);
  const [reconcileData, setReconcileData] = useState<any[]>([]);
  const [canCheck, setCanCheck] = useState<boolean>(true);

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
      const checkResult = getMismatchedData(
        bankStatement,
        transactionStatement,
        rawHeaders
      );

      if (checkResult.success) {
        setReconcileData(checkResult.data);
      }
    }
  };

  return (
    <>
      <div className="flex justify-center text-2xl font-bold">
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
              {!canCheck ? (
                <div className="flex justify-center text-xs text-red-600">
                  *Data belum lengkap
                </div>
              ) : null}
            </div>
          </div>
        </div>

        <div className=" my-4 p-4 border rounded">
          {reconcileData.length > 0 ? (
            <StickyHeadTable />
          ) : (
            <div className="border flex justify-center text-gray-500">
              Belum ada data
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Home;
