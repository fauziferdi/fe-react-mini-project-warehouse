import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addProduct, updateProduct } from "../redux/slices/productSlice";
import QrScannerComponent from "./QrScannerComponent";

const FormProductComponent = ({ setShowModal, showModal }) => {
  const dispatch = useDispatch();
  const { isUpdate, product } = useSelector((state) => state.products);
  const [input, setInput] = useState({
    id: "",
    name: "",
    description: "",
    price: "",
    stock: "",
  });
  const [showScanner, setShowScanner] = useState(false);

  useEffect(() => {
    if (isUpdate) {
      setInput({
        id: product.id,
        name: product.name,
        description: product.description,
        price: product.price,
        stock: product.stock,
      });
    } else {
      setInput({
        id: "",
        name: "",
        description: "",
        price: "",
        stock: "",
      });
    }
  }, [isUpdate, product]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    let newValue = value;
    if (id === "price" || id === "stock") {
      newValue = parseFloat(value);
      if (isNaN(newValue)) {
        newValue = "";
      }
    }
    setInput({
      ...input,
      [id]: newValue,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isUpdate) {
      dispatch(updateProduct({ id: product.id, product: input }));
    } else {
      dispatch(addProduct(input));
    }

    setShowModal(false);
    setInput({
      id: "",
      name: "",
      description: "",
      price: "",
      stock: "",
    });
  };

  const handleScan = (data) => {
    setInput({ ...input, id: data }); // Update input.id dengan hasil scan
    setShowScanner(false); // Sembunyikan scanner
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
              <h5 className="modal-title">
                {isUpdate ? "Update Product" : "Add Product"}
              </h5>
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
                    value={input.id}
                    onChange={handleChange}
                    className="form-control"
                    id="id"
                    disabled={isUpdate}
                  />
                  {!isUpdate && (
                    <button
                      className="btn btn-secondary mt-3"
                      type="button"
                      onClick={() => setShowScanner(true)}
                    >
                      Scan QR
                    </button>
                  )}
                  {showScanner && <QrScannerComponent onScan={handleScan} />}
                </div>
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">
                    Name
                  </label>
                  <input
                    type="text"
                    value={input.name}
                    onChange={handleChange}
                    className="form-control"
                    id="name"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="description" className="form-label">
                    Description
                  </label>
                  <textarea
                    className="form-control"
                    value={input.description}
                    onChange={handleChange}
                    id="description"
                    rows="3"
                  ></textarea>
                </div>
                <div className="mb-3">
                  <label htmlFor="price" className="form-label">
                    Price
                  </label>
                  <input
                    type="text"
                    value={input.price}
                    onChange={handleChange}
                    className="form-control"
                    id="price"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="stock" className="form-label">
                    Stock
                  </label>
                  <input
                    type="text"
                    value={input.stock}
                    onChange={handleChange}
                    className="form-control"
                    id="stock"
                  />
                </div>
                <button type="submit" className="btn btn-primary">
                  {isUpdate ? "Update" : "Submit"}
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

export default FormProductComponent;
