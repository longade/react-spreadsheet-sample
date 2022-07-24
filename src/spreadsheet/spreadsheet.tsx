import React from "react";
import Spreadsheet from "x-data-spreadsheet";
import 'x-data-spreadsheet/dist/xspreadsheet.css';
import { xtos } from "../utils/xlsx-utils";
import * as XLSX from "xlsx";
import Modal from "../modal/modal";

interface CustomDivRef extends HTMLDivElement {
  [key: string]: any;
}

const SpreadSheet = () => {
  const divRef = React.createRef<CustomDivRef>();

  const [openModal, setOpenModal] = React.useState<boolean>(false);
  const toggleModal = () => setOpenModal(!openModal);

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

  const downloadFile = (fileName: string, fileExt: string) => {
    const xspr = divRef.current?.grid;
    const new_wb = xtos(xspr.getData());
    XLSX.writeFile(new_wb, fileName + fileExt);
  };

  return (
    <>
      <div
        id="x-spreadsheet-demo"
        ref={divRef}
      />
      <button onClick={toggleModal} style={{ float: "right" }}>{"Export Data"}</button>
      <Modal isOpen={openModal} toggle={toggleModal} saveFunction={downloadFile} />
    </>
  );
}

export default SpreadSheet;