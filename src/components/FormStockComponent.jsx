import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addLog } from "../redux/slices/logSlice";
import { stockInOutProduct, fetchProducts } from "../redux/slices/productSlice";
import QrScannerComponent from "./QrScannerComponent";
import Swal from "sweetalert2";

const FormStockComponent = ({ setShowModal, showModal }) => {
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.products);
  const [input, setInput] = useState({
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
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };

  const handleScan = (data) => {
    setInput({ ...input, id: data });
    setShowScanner(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const productExists = products.find((product) => product.id === input.id);

    if (!productExists) {
      setValidationError("Product ID tidak ditemukan.");
      return;
    }

    const currentStock = products.find(
      (product) => product.id === input.id
    )?.stock;

    const newStock =
      input.type === "stock_in"
        ? currentStock + parseInt(input.stock)
        : currentStock - parseInt(input.stock);

    try {
      await dispatch(
        stockInOutProduct({
          id: input.id,
          stockChange: newStock,
        })
      );
      dispatch(
        addLog({
          product_id: input.id,
          type: input.type,
          quantity: parseInt(input.stock),
          note: input.note,
          date: new Date().toISOString(),
        })
      );

      Swal.fire({
        icon: "success",
        title: "Stock berhasil diupdate!",
        showConfirmButton: true,
      });

      setInput({
        id: "",
        type: "stock_in",
        stock: "",
        note: "",
      });
      setShowModal(false);
    } catch (error) {
      console.error("Error updating stock:", error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Terjadi kesalahan!",
      });
    }
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
                    value={input.id}
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
                    value={input.type}
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
                    value={input.stock}
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
                    value={input.note}
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
