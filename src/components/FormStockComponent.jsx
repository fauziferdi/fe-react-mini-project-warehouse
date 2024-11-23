import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { stockInOutProduct } from "../redux/slices/productSlice";
import { addLog } from "../redux/slices/logSlice";

const FormStockComponent = ({ setShowModal, showModal }) => {
  const dispatch = useDispatch();

  // Gabungkan state ke dalam satu objek
  const [formData, setFormData] = useState({
    id: "",
    type: "stock_in",
    stock: "",
    note: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    console.log(formData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Kirim data dari objek formData
      await dispatch(
        stockInOutProduct({
          id: formData.id,
          stockChange: parseInt(formData.stock),
        })
      );
      await dispatch(
        addLog({
          product_id: formData.id,
          type: formData.type,
          quantity: parseInt(formData.stock),
          note: formData.note,
          date: new Date().toISOString(),
        })
      );
      setShowModal(false);
      // Reset form
      setFormData({
        id: "",
        type: "stock_in",
        stock: "",
        note: "",
      });
    } catch (error) {
      console.error("Error:", error);
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
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="type" className="form-label">
                    type
                  </label>
                  <select
                    name="type"
                    className="form-select"
                    id="type"
                    value={formData.type}
                    onChange={handleChange}
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
