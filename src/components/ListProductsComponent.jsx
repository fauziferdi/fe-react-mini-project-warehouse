import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchProducts,
  deleteProduct,
  currentProduct,
} from "../redux/slices/productSlice";
import FormProductComponent from "./FormProductComponent";
import QrScannerComponent from "./QrScannerComponent";

const ListProductsComponent = () => {
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state) => state.products);
  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [showScanner, setShowScanner] = useState(false);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.id.includes(searchTerm)
  );

  const handleShowScanner = () => {
    setShowScanner(!showScanner);
  };

  const handleScan = (data) => {
    setSearchTerm(data);
  };

  return (
    <div className="card mt-4">
      <h1 className="text-center mb-2">Tabel Product {setSearchTerm}</h1>
      <div className="table-responsive ms-4 me-4">
        <FormProductComponent
          setShowModal={setShowModal}
          showModal={showModal}
        />
        <div className="d-flex float-end mt-2 mb-2">
          <div class="d-flex" role="search">
            <input
              class="form-control me-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button
              className="btn btn-success btn-cstm"
              onClick={handleShowScanner}
            >
              Scan QR
            </button>
            <button
              className="btn btn-primary ms-2 btn-cstm"
              onClick={() => setShowModal(true)}
            >
              Add Data
            </button>
          </div>
        </div>

        {showScanner && <QrScannerComponent onScan={handleScan} />}

        <table className="table table-success table-striped table-hover">
          <thead>
            <tr>
              <th scope="col">No</th>
              <th scope="col">Id Procuct</th>
              <th scope="col">Nama</th>
              <th scope="col">Deskripsi</th>
              <th scope="col">Harga</th>
              <th scope="col">Stok</th>
              <th scope="col">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.map((data, index) => (
              <tr key={index}>
                <th>{index + 1}</th>
                <th>{data.id}</th>
                <td>{data.name}</td>
                <td>{data.description}</td>
                <td>{data.price}</td>
                <td>{data.stock}</td>
                <td>
                  <button
                    onClick={() => {
                      dispatch(currentProduct(data));
                      setShowModal(true);
                    }}
                    className="btn btn-warning"
                    type="button"
                  ></button>
                  <button
                    onClick={() => dispatch(deleteProduct(data.id))}
                    className="btn btn-danger"
                    type="button"
                  ></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ListProductsComponent;
