import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchLogs } from "../redux/slices/logSlice";
import FormStockComponent from "./FormStockComponent";

const ListLogStockComponent = () => {
  const dispatch = useDispatch();
  const { logs, loading, error } = useSelector((state) => state.logs);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    dispatch(fetchLogs());
  }, [dispatch]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="card mt-4">
      <h1 className="text-center mb-2">Logs History Stock </h1>
      <div className="table-responsive ms-4 me-4">
        <FormStockComponent setShowModal={setShowModal} showModal={showModal} />
        <div className="d-flex float-end mt-2 mb-2">
          <div className="d-flex" role="search">
            <button
              className="btn btn-primary ms-2 btn-cstm"
              onClick={() => setShowModal(true)}
            >
              Add Data
            </button>
          </div>
        </div>

        <table className="table table-success table-striped table-hover">
          <thead>
            <tr>
              <th scope="col">No</th>
              <th scope="col">Id Procuct</th>
              <th scope="col">Type</th>
              <th scope="col">Quantity</th>
              <th scope="col">Note</th>
              <th scope="col">Date</th>
            </tr>
          </thead>
          <tbody>
            {logs.map((data, index) => (
              <tr key={index}>
                <th>{index + 1}</th>
                <th>{data.product_id}</th>
                <td>{data.type}</td>
                <td>{data.quantity}</td>
                <td>{data.note}</td>
                <td>{data.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ListLogStockComponent;
