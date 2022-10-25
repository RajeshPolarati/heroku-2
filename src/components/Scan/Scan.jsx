import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { QrReader } from "react-qr-reader";
import {initZkapp} from "midazkk"
import {
  fetchAccount,
  Field,
  isReady,
  Mina,
  PublicKey,
  setGraphqlEndpoint,
} from "snarkyjs";
import check from "../../assets/images/success.png";
import { Spinner } from "reactstrap";

var MidaCompanyzkAp;
var MerkleWitnes;
(async()=>{
  const { MidaCompanyzkApp, MerkleWitness } = await initZkapp();
  MidaCompanyzkAp = MidaCompanyzkApp;
  MerkleWitnes = MerkleWitness
})()


const QrScan = () => {
  const navigate = useNavigate();
  const [startScan, setStartScan] = useState(false);
  const [isPopupOpened, setPopUpOpened] = useState(false);
  const [successBody, setSuccessBody] = useState("");
  const [isScanned, setIsScanned] = useState(false);
  const [isQrLoading,setIsQrLoading] = useState(false)
  const [isQrInvalid, setIsQrInvalid] = useState(false);
  const initalize = async () => {
    await isReady;
    const graphqlEndpoint = "https://proxy.berkeley.minaexplorer.com/graphql";
    setGraphqlEndpoint(graphqlEndpoint);
    let Berkeley = Mina.BerkeleyQANet(graphqlEndpoint);
    Mina.setActiveInstance(Berkeley);
  };
  const validate = async (
    zk_app_adress,
    employeeHash,
    merklePath,
    discount
  ) => {
    await initalize();
    let path = {
      path: merklePath?.path?.map((path) => {
        return Field(path);
      }),
      isLeft: merklePath?.isLeft?.map((val) => {
        return Field(val);
      }),
    };
    // console.log(path);
    let { account, error } = await fetchAccount({
      publicKey: PublicKey.fromBase58(zk_app_adress),
    });
    // console.log(account);
    let witness2 = MerkleWitnes.fromObject(path);
    // await MidaCompanyzkApp.compile();
    const contract = new MidaCompanyzkAp(PublicKey.fromBase58(zk_app_adress));
    let val = contract.commitment.get();
    if (witness2.calculateRoot(Field(employeeHash)).toJSON() == val.toJSON()) {
      return true;
    } else {
      return false;
    }
  };
  const validateQrData = async (data) => {
    let arr = data?.split(" ");
    // console.log(arr);
    if (arr?.length == 5) {
      try {
        let zk_app_adress = arr[0];
        let employeeHash =
          "2331227812972711927556773975412811853117744513215284891368542162849237632275";
        let merklePath = JSON.parse(arr[3]);
        let discount = arr[4];
        let response = await validate(
          zk_app_adress,
          employeeHash,
          merklePath,
          discount
        );
        return response;
      } catch (err) {
        console.log(err);
        return false;
      }
    } else {
      return false;
    }
  };
  return (
    <div className="scan-main">
      <div className={`scanner ${isPopupOpened ? "scanner-fade" : ""}`}>
        <div className="logo">Logo</div>
        <div className="rectangle-main">
        <div className={`rectangle ${isQrLoading?"rectangle-fade":""}`}>
        
          <QrReader
            scanDelay={3000}
            onResult={async (result, error) => {
              console.log(result);
              if (!isScanned && result) {
                setIsScanned(true);
                let data = result?.text;
                setIsQrLoading(true)
                let response = await validateQrData(data);
                if (response) {
                  setIsQrLoading(false)
                  setPopUpOpened(true);
                  setSuccessBody("QR code scanned successfully");
                } else {
                  setIsQrLoading(false)
                  setPopUpOpened(true);
                  setIsQrInvalid(true);
                  setSuccessBody("Invalid QR data");
                }
              }
            }}
          />
        </div>
        {
          isQrLoading && <div className="loader"><Spinner
          color="dark"
          style={{
            height: '5rem',
            width: '5rem'
          }}
        >
        </Spinner></div>
        }
        
        </div>
        <div className="scan-button">
          <button
            className="text-btn"
            onClick={() => {
              setPopUpOpened(true);
              setSuccessBody("QR code scanned successfully");
            }}
          >
            Scan
          </button>
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
                if (!isQrInvalid) {
                  navigate("/barcodeDetail");
                } else {
                  setIsScanned(false);
                  setIsQrInvalid(false);
                }
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
export default QrScan;
