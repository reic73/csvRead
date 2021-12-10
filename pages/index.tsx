import InputFile from "../components/input-file";
import React, { useState } from "react";
import { csvToArray } from "../helpers/csv-reader";
import { errorHandler, errorMessage } from "../helpers/error-handler";
import Button from "@mui/material/Button";

const Home = () => {
  const [bankStatement, setBankStatement] = useState<any[]>([]);
  const [transactionStatement, setTransactionStatement] = useState<any[]>([]);
  const [headers, setHeaders] = useState<any[]>([]);

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
        callBack(csvData.rows);
        if (isReportHeader) {
          setHeaders(csvData.headers);
        }

        return;
      });
    } else {
      errorHandler(errorMessage["FILE_IS_NOT_FOUND"]);
      return;
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
            <Button variant="contained" className="w-48">
              Check
            </Button>
          </div>
        </div>

        <div className=" my-4 p-4 border rounded"></div>
      </div>
    </>
  );
};

export default Home;
