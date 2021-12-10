import type { NextPage } from "next";
import React from "react";

const Home: NextPage = () => {
  const onSelectFile = (e: any) => {
    if (e?.target.files[0]) {
      const { type, name, size } = e.target.files[0];
      const reader = new FileReader();
      reader.readAsText(e.target.files[0]);
      reader.addEventListener("load", () => {
        console.log("reader", reader.result);
        csvToArray(reader.result);
      });
      // reader.readAsDataURL(e.target.files[0]);
      // console.log("target", e.target.files[0]);
      // console.log("test", e.target.files[0].value);

      //   // setImage(reader.result);
      //   // setShowCropDialog(true);
      // });
      // e.target.value = "";
    } else {
      console.log("error");
    }
  };

  function csvToArray(str, delimiter = ",") {
    // slice from start of text to the first \n index
    // use split to create an array from string by delimiter
    console.log("str", str);
    const headers = str.slice(0, str.indexOf("\n")).split(delimiter);
    console.log("headers", headers);

    // slice from \n index + 1 to the end of the text
    // use split to create an array of each csv value row
    const rows = str.slice(str.indexOf("\n") + 1).split("\n");
    console.log("rows", rows);

    // Map the rows
    // split values from each row into an array
    // use headers.reduce to create an object
    // object properties derived from headers:values
    // the object passed as an element of the array
    const arr = rows.map(function (row) {
      const values = row.split(delimiter);
      const el = headers.reduce(function (object, header, index) {
        object[header] = values[index];
        return object;
      }, {});
      return el;
    });

    // return the array
    console.log("array", arr);
    return arr;
  }

  return (
    <>
      <div className="flex justify-center border text-xl font-bold my-5">
        Data Reconciliation
      </div>
      <input
        id="source"
        name="source"
        type={"file"}
        accept={".csv"}
        onChange={onSelectFile}
      />
    </>
  );
};

export default Home;
