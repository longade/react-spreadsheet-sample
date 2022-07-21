import React from "react";
import Spreadsheet from "x-data-spreadsheet";
import 'x-data-spreadsheet/dist/xspreadsheet.css';
import { xtos } from "../utils/xlsx-utils";
import * as XLSX from "xlsx";

interface CustomDivRef extends HTMLDivElement {
  [key: string]: any;
}

const SpreadSheet = (props: any) => {
  const divRef = React.createRef<CustomDivRef>();

  const options = React.useMemo(() => ({
    view: {
      height: () => document.documentElement.clientHeight - 50,
      width: () => document.documentElement.clientWidth - 50,
    },
  }), [])

  React.useEffect(() => {
    if (divRef.current && !divRef.current.grid) {
      divRef.current.grid = new Spreadsheet(divRef.current, options);
    }
  }, [divRef, options]);

  const downloadXLSX = () => {
    const xspr = divRef.current?.grid;
    const new_wb = xtos(xspr.getData());
    XLSX.writeFile(new_wb, "downloaded_file.xlsx");
  };

  return (
    <>
      <button onClick={downloadXLSX}>{"Download XLSX"}</button>
      <div
        id="x-spreadsheet-demo"
        ref={divRef}
      />
    </>
  );
}

export default SpreadSheet;