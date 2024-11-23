import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchProducts, deleteProduct } from "../redux/slices/productSlice";

const ListProductsComponent = () => {
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="card mt-4">
      <h1 className="text-center mb-4">Tabel Product</h1>
      <div className="table-responsive ms-4 me-4">
        <table className="table table-success table-striped table-hover">
          <thead>
            <tr>
              <th scope="col">No</th>
              <th scope="col">Id Procuct</th>
              <th scope="col">Name</th>
              <th scope="col">Description</th>
              <th scope="col">Price</th>
              <th scope="col">Stock</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {products.map((data, index) => (
              <tr key={index}>
                <th>{index + 1}</th>
                <th>{data.id}</th>
                <td>{data.name}</td>
                <td>{data.description}</td>
                <td>{data.price}</td>
                <td>{data.stock}</td>
                <td>
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
