import React,{useState} from "react";
import { useNavigate } from "react-router-dom";
import check from "../../assets/images/success.png";

const BarcodeDetail = () => {
  const navigate = useNavigate();
  const [isPopupOpened, setPopUpOpened] = useState(false);
    const [successBody, setSuccessBody] = useState("");
  return (
    <div className="barCodeDetail-main">
        <div className={`barcodeDetail ${isPopupOpened?'barcodeDetail-fade':""}`}>
      <div className="logo">Logo</div>
      <div className="barcodePage">
        <div className="barcode-text">
            <table className="barcode-data">
                <tr>
                    <td>Merchant:</td>
                    <td>Adidas</td>
                </tr>
                <tr>
                    <td>Product:</td>
                    <td>Sports Category</td>
                </tr>
                <tr>
                    <td>Code:</td>
                    <td>adi878758</td>
                </tr>
                <tr>
                    <td>Discount:</td>
                    <td>10%</td>
                </tr>
            </table>
        </div>
        <div className="create-button">
          <button className="process-btn" onClick={() => {
            setPopUpOpened(true);
            setSuccessBody('Discount applied successfully')
          }}>
            Process
          </button>
          <button
            className="cancel-btn"
            onClick={() => {
              navigate("/scan");
            }}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
    {isPopupOpened && (
        <div className="success-message">
        <div className="success-data">
          <div className="success-header">
            <img src={check} />
          </div>
          <div className="success-body">{successBody}</div>
          <button
            className="close-popup"
            onClick={() => {
              setPopUpOpened(false);
              navigate('/scan')
            }}
          >
            Ok
          </button>
        </div>
      </div>
      )}
    </div>
    
  );
};

export default BarcodeDetail;
