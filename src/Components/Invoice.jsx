import React, { useEffect, useRef, useState } from "react";
import logo from "../IMG/NavbarLogo.png";
import "./Invoice.scss";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

function Invoice(props) {
  const pdfref = useRef();
  const [id, setId] = useState(0);
  const [input, setInput] = useState(false);
  const [datas, setDatas] = useState(false);

  const exportPDF = async () => {
    const input = pdfref.current;

    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4", true);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
      const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
      const imgX = (pdfWidth - imgWidth * ratio) / 2;
      const imgY = 30;
      pdf.addImage(
        imgData,
        "PNG",
        imgX,
        imgY,
        imgWidth * ratio,
        imgHeight * ratio
      );
      pdf.save("invoice.pdf");
    });
  };
  const bill_genaret = () => {
    setDatas({ sheet: JSON.parse(input) });
  };
  const d = new Date();
  let year = d.getFullYear();
  console.log("data : ", datas.sheet);
  return (
    <>
      {!datas ? (
        <div className="data-sheet">
          <textarea
            name="text"
            id="text"
            cols="30"
            rows="10"
            onChange={(e) => setInput(e.target.value)}
          ></textarea>
          <button onClick={bill_genaret}>Genaret Bill</button>
        </div>
      ) : (
        <div className="items-div">
          {datas.sheet.map((item, index) => (
            <div className="items-container-for-invoice" key={index}>
              <button
                className="button"
                onClick={() => {
                  setId(index);
                }}
                onDoubleClick={() => {
                  exportPDF();
                  const billno = localStorage.getItem("roadserve_bill_no");
                  localStorage.setItem(
                    "roadserve_bill_no",
                    parseInt(billno) + 1
                  );
                }}
              >
                Export
              </button>
              <p className="index">{index + 1}</p>
              <div className="page" ref={id === index ? pdfref : null}>
                <div className="section">
                  <div className="logos-div">
                    <img src={logo} alt="" className="logo" />
                    <div className="tm">
                      <h4>TM</h4>
                    </div>
                  </div>
                  
                  <div className="invoice-box">
                    <h3 className="invoice">TAX INVOICE</h3>
                  </div>

                  <div className="body-container">
                    <div className="table-head-row">
                      <h4 className="t_head">SHIPPING ADDRESS:</h4>
                      <h4 className="t_head">SOLD BY:</h4>
                      <h4 className="t_head">INVOICE DETAILS:</h4>
                    </div>

                    <div className="table">
                      {/*===================== SHIPPING ADDRESS ==================== */}
                      <div className="t_column">
                        <h4 className="text">{item["Customer Name"]}</h4>
                        <h4 className="text">{item["Address City"]}</h4>
                        <h4 className="text">{item["Address Line 1"]}</h4>
                        <h4 className="text">{item["Address Line 2"]}</h4>
                        <h4 className="text">{item["Address State"]}</h4>
                        <h4 className="text">India</h4>
                        <h4 className="text">{item["Address Pincode"]}</h4>
                        <h4 className="text"></h4>
                        <h4 className="text"></h4>
                        <h4 className="text"></h4>
                        <h4 className="text"></h4>
                        <h4 className="text"></h4>
                      </div>

                      <div className="blank"></div>
                      {/*===================== SOLD BY ==================== */}
                      <div className="t_column">
                        <h4 className="text"></h4>
                        <h4 className="text">Road Serve</h4>
                        <h4 className="text">
                          3rd Floor, 2151/9-B , Kh. No. 797/44
                        </h4>
                        <h4 className="text">
                          Village Khampur, New Patel Nagar, New Delhi
                        </h4>
                        <h4 className="text">Central Delhi, Delhi, 110008</h4>
                        <h4 className="text">India</h4>
                        <h4 className="text">State Code: 07</h4>
                        <h4 className="text">Ph: xxxxxxxxxx</h4>
                        <h4 className="text">GSTIN No: 07BHMPG4830J2Z6</h4>
                        <h4 className="text">Website: https://roadserve.in</h4>
                        <h4 className="text">Email: support@roadserve.in</h4>
                      </div>

                      <div className="blank"></div>
                      {/*===================== INVOICE DETAILS ==================== */}
                      <div className="t_column">
                        <div className="bills">
                          <h4 className="bold_font">INVOICE NO. :</h4>
                          <h4 className="text">
                            {`${year}-${parseInt(props.billnum) + index + 1}`}
                          </h4>
                        </div>
                        <div className="bills">
                          <h4 className="bold_font">INVOICE DATE :</h4>
                          <h4 className="text">
                            {item["Invoice Date"].split(" ")[0]}
                          </h4>
                        </div>
                        <div className="bills">
                          <h4 className="bold_font">ORDER NO. :</h4>
                          <h4 className="text">{item["Order ID"]}</h4>
                        </div>
                        <div className="bills">
                          <h4 className="bold_font">ORDER DATE :</h4>
                          <h4 className="text">
                            {item["Invoice Date"].split(" ")[0]}
                          </h4>
                        </div>
                        <div className="bills">
                          <h4 className="bold_font">SHIPPED BY</h4>
                          <h4 className="text">{item["Courier Company"]}</h4>
                        </div>
                        <div className="bills">
                          <h4 className="bold_font">AGGREGATOR :</h4>
                          <h4 className="text">SHIPROCKET</h4>
                        </div>
                        <div className="bills">
                          <h4 className="bold_font">AWB NO. :</h4>
                          <h4 className="text">{item["AWB Code"]}</h4>
                        </div>
                        <div className="bills">
                          <h4 className="bold_font">PAYMENT METHOD :</h4>
                          <h4 className="text">{item["Payment Method"]}</h4>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="avareg_box">
                    <div className="avareg_left">
                      <h4 className="avareg_text">S.NO.</h4>
                      <h4 className="avareg_text">PRODUCT NAME</h4>
                    </div>

                    <div className="avareg_right">
                      <h4 className="avareg_text">HSN</h4>
                      <h4 className="avareg_text">QTY</h4>
                      <h4 className="avareg_text">UNIT PRICE</h4>
                      <h4 className="avareg_text">UNIT DISCOUNT</h4>
                      <h4 className="avareg_text">TAXABLE VALUE</h4>
                      <h4 className="avareg_text">IGST(Value | %)</h4>
                      <h4 className="avareg_text">TOTAL (Including GST)</h4>
                    </div>
                  </div>

                  <div className="total_box">
                    <div className="avareg_left">
                      <h4 className="text">1</h4>
                      <h4 className="text">CAR PERFUME</h4>
                    </div>
                    <div className="total_right">
                      <div className="right_top">
                        <h4 className="text"></h4>
                        <h4 className="text">1</h4>
                        <h4 className="text">300</h4>
                        <h4 className="text">300</h4>
                        <h4 className="text">0.00</h4>
                        <h4 className="text">0.00</h4>
                        <h4 className="text">0.00</h4>
                      </div>
                    </div>
                  </div>
                  <div className="total_box">
                    <div className="avareg_left">
                      <h4 className="text">2</h4>
                      <h4 className="text">
                        ROADSIDE ASSISTANCE SERVICE (ADVANCE PLAN)
                      </h4>
                    </div>
                    <div className="total_right">
                      <div className="right_top">
                        <h4 className="text"></h4>
                        <h4 className="text">{item["Product Quantity"]}</h4>
                        <h4 className="text">{item["Product Price"]}</h4>
                        <h4 className="text">0.00</h4>
                        <h4 className="text">
                          {item["Product Price"] -
                            Math.round((item["Product Price"] * 18) / 118)}
                        </h4>
                        <h4 className="text">
                          {Math.round((item["Product Price"] * 18) / 118)}
                        </h4>
                        <h4 className="text">{item["Product Price"]}</h4>
                      </div>
                    </div>
                  </div>
                  <div className="total_box-footer">
                    <div className="total_blank"></div>
                    <div className="total_box-footer-container">
                      <div className="total_box-footer-left"></div>
                      <div className="total_box-footer-right">
                        <div className="net_total">
                          <h4 className="avareg_text">NET TOTAL(In Value)</h4>
                          <h4 className="avareg_text">
                            Rs. {item["Order Total"]}
                          </h4>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="footer_blank"></div>
                  <div className="footer_box">
                    <div className="footer_box_left">
                      <h4 className="avareg_text">
                        All Payments by transfer/ckeck/DD should be draw in
                        favour of
                      </h4>
                      <div className="footer_container">
                        <div className="item">
                          <h4 className="bold_font">Name:</h4>
                          <h4 className="bold_font">Account number: </h4>
                          <h4 className="bold_font">Bank: </h4>
                          <h4 className="bold_font">Branch</h4>
                          <h4 className="bold_font">IFSE Code:</h4>
                        </div>
                        <div className="item">
                          <h4 className="text">ROADSERVE</h4>
                          <h4 className="text">922020023269834</h4>
                          <h4 className="text">Axis Bank</h4>
                          <h4 className="text">Karampura Branch, New Delhi</h4>
                          <h4 className="text">UTIB0004097</h4>
                        </div>
                      </div>
                    </div>
                    <div className="footer_box_right">
                      <h4 className="avareg_text">
                        This is a computer generated invoice and does not
                        require signature.
                      </h4>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}

export default Invoice;
