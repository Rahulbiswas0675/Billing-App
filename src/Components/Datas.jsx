import React, { useState } from "react";
import copy from "copy-to-clipboard";
import "./Invoice.scss";
import Invoice from "./Invoice";
function Datas(props) {
  const [copyText, setCopyText] = useState(false);

  const copyToClipboard = () => {
    copy(props.data);
    setCopyText(true);
    alert(`You have copied text`);
  };
  return (
    <>
      {copyText ? (
        <Invoice billnum={props.billnum}/>
      )
       : (
        <div className="data-sheet">
          <textarea name="data" id="data" value={props.data}></textarea>
          <button onClick={copyToClipboard}>Copy</button>
        </div>
      )}
    </>
  );
}

export default Datas;
