import React from "react";

interface IInputFile {
  name: string;
  onSelect(e: any): void;
}

const InputFile = (props: IInputFile) => {
  const slug = props.name.split(" ").join("-");

  return (
    <>
      <div className="flex my-4">
        <p className="font-semibold w-64">{props.name}</p>
        <input
          id={slug}
          type={"file"}
          accept={".csv"}
          onChange={(e) => {
            props.onSelect(e);
          }}
        />
      </div>
    </>
  );
};

export default InputFile;
