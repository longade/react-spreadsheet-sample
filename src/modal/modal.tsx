import React from "react";
import "./modal.css";

interface ModalProps {
  isOpen: boolean,
  toggle: () => void,
  saveFunction: (fileName: string, fileExt: string) => void
}

const Modal = (props: ModalProps) => {

  const { isOpen, toggle, saveFunction } = props;

  const [fileName, setFileName] = React.useState<string>('export');
  const [fileExt, setFileExt] = React.useState<string>('.xlsx');

  const buttonClick = () => {
    saveFunction(fileName, fileExt);
    toggle();
  }

  return (
    <>
      {isOpen ?
        <div id="myModal" className="modal">
          <div className="modal-content">
            <div className="modal-header">
              <span className="close" onClick={toggle}>&times;</span>
              <h2>Export Data</h2>
            </div>
            <div className="modal-body">
              <p style={{ marginTop: 0 }}>Choose the name and the format of the file</p>
              <div style={{ display: "flex" }}>
                <input type="text" placeholder="File name..." onChange={(event) => setFileName(event.target.value)}></input>
                <select onChange={(event) => setFileExt(event.target.value)}>
                  <option value="" hidden>Format...</option>
                  <option value=".xlsx">XLSX</option>
                  <option value=".ods">ODS</option>
                </select>
              </div>
            </div>
            <div className="modal-footer">
              <div style={{ float: "right" }}>
                <button onClick={buttonClick}>Download</button>
              </div>
            </div>
          </div>
        </div>
        :
        null
      }
    </>
  );
}

export default Modal;