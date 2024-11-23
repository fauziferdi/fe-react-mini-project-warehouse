import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addLog } from "../redux/slices/logSlice";
import { stockInOutProduct, fetchProducts } from "../redux/slices/productSlice";
import QrScannerComponent from "./QrScannerComponent";

const FormStockComponent = ({ setShowModal, showModal }) => {
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.products);
  const [formData, setFormData] = useState({
    id: "",
    type: "stock_in",
    stock: "",
    note: "",
  });
  const [validationError, setValidationError] = useState("");
  const [showScanner, setShowScanner] = useState(false);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const productExists = products.find(
      (product) => product.id === formData.id
    );
    if (!productExists) {
      setValidationError("Product ID tidak ditemukan.");
      return;
    }

    dispatch(
      stockInOutProduct({
        id: formData.id,
        stockChange: parseInt(formData.stock),
      })
    );
    dispatch(
      addLog({
        product_id: formData.id,
        type: formData.type,
        quantity: parseInt(formData.stock),
        note: formData.note,
        date: new Date().toISOString(),
      })
    );

    setFormData({
      id: "",
      type: "stock_in",
      stock: "",
      note: "",
    });
    setShowModal(false);
  };

  const handleScan = (data) => {
    setFormData({ ...formData, id: data });
    setShowScanner(false);
  };

  return (
    <>
      <div
        className={`modal ${showModal ? "show" : ""}`}
        style={{ display: showModal ? "block" : "none" }}
        tabIndex="-1"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Add Stock</h5>
              <button
                type="button"
                className="btn-close"
                onClick={() => setShowModal(false)}
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              {validationError && (
                <div className="alert alert-danger">{validationError}</div>
              )}
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="id" className="form-label">
                    Id Product
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="id"
                    name="id"
                    value={formData.id}
                    onChange={handleChange}
                    required
                  />
                  <button
                    className="btn btn-secondary mt-3"
                    type="button"
                    onClick={() => setShowScanner(true)}
                  >
                    Scan QR
                  </button>
                  {showScanner && <QrScannerComponent onScan={handleScan} />}{" "}
                
                </div>
                <div className="mb-3">
                  <label htmlFor="type" className="form-label">
                    Type
                  </label>
                  <select
                    name="type"
                    className="form-select"
                    id="type"
                    value={formData.type}
                    onChange={handleChange}
                    required
                  >
                    <option value="stock_in">Stock In</option>
                    <option value="stock_out">Stock Out</option>
                  </select>
                </div>
                <div className="mb-3">
                  <label htmlFor="stock" className="form-label">
                    Stock
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="stock"
                    name="stock"
                    value={formData.stock}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="stock" className="form-label">
                    Note
                  </label>
                  <textarea
                    className="form-control"
                    id="note"
                    rows="3"
                    name="note"
                    value={formData.note}
                    onChange={handleChange}
                    required
                  ></textarea>
                </div>
                <button type="submit" className="btn btn-primary">
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div
        className={`modal-backdrop ${showModal ? "show" : ""}`}
        style={{ display: showModal ? "block" : "none" }}
      />
    </>
  );
};

export default FormStockComponent;
