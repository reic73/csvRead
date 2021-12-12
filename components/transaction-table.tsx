import React, { useState } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { getStandardNaming } from "../helpers/common-helper";
import Button from "@mui/material/Button";
import downloadAsCsv from "../helpers/csv-downloader";

interface ITransactionTable {
  headers: string[];
  rows: any[];
  downloadableData: any[];
}

export default function TransactionTable(props: ITransactionTable) {
  const headers = props.headers;
  const standardNamingHeaders = getStandardNaming(headers);
  const rows = props.rows;

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <>
      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {headers.map((header, index) => (
                  <TableCell key={index} align="left">
                    {header}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                      {standardNamingHeaders.map((header, index) => {
                        return (
                          <TableCell key={index} align="left">
                            <p
                              className={`${
                                row["remarksObject"][header]
                                  ? "text-red-600 font-semibold"
                                  : ""
                              }`}
                            >
                              {row[header]}
                            </p>
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>

      <div className="my-2 pr-5 flex justify-end">
        <Button
          variant="contained"
          className="w-48"
          onClick={() => downloadAsCsv(props.downloadableData, "mismatch-data")}
        >
          Download
        </Button>
      </div>
    </>
  );
}
