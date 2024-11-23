import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchProducts,
  deleteProduct,
  currentProduct,
} from "../redux/slices/productSlice";
import FormProductComponent from "./FormProductComponent";
import QrScannerComponent from "./QrScannerComponent";
import { BiPencil, BiTrash } from "react-icons/bi";
import Swal from "sweetalert2";

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
    return (
      <div className="d-flex justify-content-center align-items-center vh-100 ">
        <div className="spinner-border text-primary fs-4" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
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
    setShowScanner(false);
  };

  const handleDeleteProduct = (id) => {
    Swal.fire({
      title: "Apakah Anda yakin?",
      text: "Menghapus data produk dengan id = " + id,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Ya",
      cancelButtonText: "Batal",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteProduct(id));
        Swal.fire("Terhapus!", "Produk telah dihapus.", "success");
      }
    });
  };

  return (
    <div className="card mt-4">
      <h1 className="text-center mb-4 mt-2 fw-bold ">Tabel Product </h1>
      <div className="table-responsive ms-4 me-4">
        <FormProductComponent
          setShowModal={setShowModal}
          showModal={showModal}
        />
        <div className="d-flex float-end mt-2 mb-4">
          <div className="d-flex" role="search">
            <input
              className="form-control me-2 srch-cstm"
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

        <table className="table table-light table-striped table-hover mt-4">
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
                    className="btn btn-sm btn-warning my-1"
                    type="button"
                  >
                    <BiPencil />
                  </button>
                  <button
                    onClick={() => handleDeleteProduct(data.id)}
                    className="btn btn-danger btn-sm ms-2 my-1"
                    type="button"
                  >
                    <BiTrash />
                  </button>
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
