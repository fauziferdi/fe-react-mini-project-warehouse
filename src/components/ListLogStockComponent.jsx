import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchLogs } from "../redux/slices/logSlice";
import FormStockComponent from "./FormStockComponent";
import QrScannerComponent from "./QrScannerComponent";
import dayjs from "dayjs";
import "dayjs/locale/id";
dayjs.locale("id");

const ListLogStockComponent = () => {
  const dispatch = useDispatch();
  const { logs, loading, error } = useSelector((state) => state.logs);
  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [showScanner, setShowScanner] = useState(false);

  useEffect(() => {
    dispatch(fetchLogs());
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

  const filteredLogs = logs.filter((log) => {
    const searchTermLower = searchTerm.toLowerCase();
    return (
      log.product_id.toLowerCase().includes(searchTermLower) ||
      log.type.toLowerCase().includes(searchTermLower) ||
      log.quantity.toString().includes(searchTerm) ||
      log.note.toLowerCase().includes(searchTermLower) ||
      log.date.toLowerCase().includes(searchTermLower)
    );
  });

  const handleShowScanner = () => {
    setShowScanner(!showScanner);
  };

  const handleScan = (data) => {
    setSearchTerm(data);
    setShowScanner(false);
  };

  return (
    <div className="card mt-4">
      <h1 className="text-center mb-4 mt-2 fw-bold ">Logs History Stock </h1>
      <div className="table-responsive ms-4 me-4">
        <FormStockComponent setShowModal={setShowModal} showModal={showModal} />
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
              className="btn 1  btn-success btn-cstm"
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

        <table className="table table-light table-striped table-hover mt-3">
          <thead>
            <tr>
              <th scope="col">No</th>
              <th scope="col">Id Product</th>
              <th scope="col">Type</th>
              <th scope="col">Quantity</th>
              <th scope="col">Note</th>
              <th scope="col">Date</th>
            </tr>
          </thead>
          <tbody>
            {filteredLogs.map((data, index) => (
              <tr key={index}>
                <th>{index + 1}</th>
                <th>{data.product_id}</th>
                <td>{data.type}</td>
                <td>{data.quantity}</td>
                <td>{data.note}</td>
                <td>{dayjs(data.date).format("DD MMMM YYYY HH:mm:ss")}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ListLogStockComponent;
