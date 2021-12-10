import React, { useState } from "react";
import { csvToArray } from "../helpers/csv-reader";
import { errorHandler, errorMessage } from "../helpers/error-handler";
import Button from "@mui/material/Button";

const Home = () => {
  const [bankStatement, setBankStatement] = useState<any[]>([]);
  const [transactionStatement, setTransactionStatement] = useState<any[]>([]);
  const onSelectFile = (e: any, callBack: any): any => {
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
        callBack(csvData);
        return;
      });
    } else {
      errorHandler(errorMessage["FILE_IS_NOT_FOUND"]);
      return;
    }
  };

  return (
    <>
      {console.log("bank statement", bankStatement)}
      {console.log("transaction statement", transactionStatement)}
      <div className="flex justify-center border text-2xl font-bold">
        Data Reconciliation
      </div>

      <div className="border m-8">
        <div className="border flex my-4">
          <p className="font-semibold w-64">Bank Statement :</p>
          <input
            id="source"
            name="source"
            type={"file"}
            accept={".csv"}
            onChange={(e) => onSelectFile(e, setBankStatement)}
          />
        </div>

        <div className="border flex my-4">
          <p className="font-semibold w-64">Transaction Statement :</p>
          <input
            id="source"
            name="source"
            type={"file"}
            accept={".csv"}
            onChange={(e) => onSelectFile(e, setTransactionStatement)}
          />
        </div>
        <div className="flex justify-center">
          <Button variant="contained" className="w-48">
            Check
          </Button>
        </div>
      </div>
    </>
  );
};

export default Home;
