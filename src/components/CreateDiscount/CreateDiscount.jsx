import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import success from "../../assets/images/success.png";
import adidas from "../../assets/images/adidas.png";

const CreateDiscount = () => {
  const navigate = useNavigate();
  const [isPopupOpened, setPopUpOpened] = useState(false);
  const [addedDiscounts, setAddedDiscounts] = useState([]);
  const [successBody, setSuccessBody] = useState("");
  return (
    <div className="createDiscount-main">
      {addedDiscounts.length == 0 && (
        <div className={`createDiscount ${isPopupOpened ? "createDiscount-fade" : ""}`}>
          <div className="logo">Logo</div>
          <div className="create-discount-form">
            <div className="company">
              <div className="label">Company</div>
              <select name="select-company" className="select-company">
                <option value="" disabled selected className="placeholder">
                  Select your company
                </option>
              </select>
            </div>
            <div className="category">
              <div className="label">Category</div>
              <select name="category-name" className="category-name">
                <option value="" disabled selected className="placeholder">
                  Select your category
                </option>
              </select>
            </div>
            <div className="discount">
              <div className="label">Discount</div>
              <input type="text" placeholder="Enter the discount" />
            </div>
            <div className="validity">
              <div className="label">Validity</div>
              <input type="text" placeholder="Enter the validity" />
            </div>
            <button
              className="create-discount"
              onClick={() => {
                setSuccessBody("Discount created successfully");
                setPopUpOpened(true);
              }}
            >
              Create
            </button>
          </div>
        </div>
      )}
      {addedDiscounts.length > 0 && (
        <div className={`added-discounts ${isPopupOpened ? "added-discounts-fade" : ""}`}>
          <div className="logo">Logo</div>
          <div className="discounts">
            <div className="label">Discounts</div>
            <div className="publishing-discounts">
            <div className="show-discounts">
              <div className="discount-main">
                <div className="discount">
                  <div className="brand-logo">
                    <img src={adidas} />
                  </div>
                  <div className="discount-details">
                    <div className="offer-percent">10% OFF</div>
                    <div className="brand-name">adidas</div>
                    <div className="expires">Expires in 15 days</div>
                  </div>
                </div>
              </div>
            </div>
            <button
              className="publish-btn"
              onClick={() => {
                setSuccessBody("Discount published successfully");
                setPopUpOpened(true);
              }}
            >
              Publish
            </button>
            </div>
            
          </div>
        </div>
      )}
      {isPopupOpened && (
        <div className="success-message">
          <div className="success-data">
            <div className="success-header">
              <img src={success} />
            </div>
            <div className="success-body">{successBody}</div>
            <button
              className="close-popup"
              onClick={() => {
                setPopUpOpened(false);
                if (addedDiscounts.length) {
                  setAddedDiscounts([]);
                } else {
                  setAddedDiscounts([1]);
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

export default CreateDiscount;
