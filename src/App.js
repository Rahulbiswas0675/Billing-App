import { useEffect, useState } from "react";
import "./App.scss";
import Invoice from "./Components/Invoice";
import * as XLSX from "xlsx";
import Datas from "./Components/Datas";
function App() {
  const [data, setData] = useState(false);
  const [billnum, setBillNum] = useState(localStorage.getItem("roadserve_bill_no"));
  function upload(e) {
    const files = e.target.files;
    if (files.length === 0) {
      alert("Please choose any file...");
      return;
    }
    const filename = files[0].name;
    const extension = filename
      .substring(filename.lastIndexOf("."))
      .toUpperCase();
    if (extension === ".XLS" || extension === ".XLSX") {
      excelFileToJSON(files[0]);
    } else {
      alert("Please select a valid excel file.");
    }
  }

  //Method to read excel file and convert it into JSON
  function excelFileToJSON(file) {
    try {
      const reader = new FileReader();
      reader.readAsBinaryString(file);
      reader.onload = function (e) {
        const data = e.target.result;
        const workbook = XLSX.read(data, {
          type: "binary",
        });
        const result = {};
        workbook.SheetNames.forEach(function (sheetName) {
          const roa = XLSX.utils.sheet_to_row_object_array(
            workbook.Sheets[sheetName]
          );
          if (roa.length > 0) {
            result[sheetName] = roa;
            setData(result);
            // console.log("result ", result);
          }
        });
      };
    } catch (e) {
      console.error(e);
    }
  }

  // bill no count
  useEffect(() =>{
    if(billnum){
      setBillNum(localStorage.getItem("roadserve_bill_no"));
    }else{
      localStorage.setItem("roadserve_bill_no", 0);
      setBillNum(localStorage.getItem("roadserve_bill_no"));
    }
  },[])

  return (
    <div className="App">
      {data ? (
        <Datas data={JSON.stringify(data)} billnum={billnum}/>
      ) : (
        <div>
          <h1>Upload an excel file to convert into JSON</h1>
          <input type="file" onChange={(e) => upload(e)} />
        </div>
      )}
    </div>
  );
}

export default App;
