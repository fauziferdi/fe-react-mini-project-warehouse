import React from "react";

const FormProductComponent = () => {
  return (
    <form>
      <div className="mb-3">
        <label htmlFor="id" className="form-label">
          Id Product
        </label>
        <input type="text" className="form-control" id="name" />
      </div>
      <div className="mb-3">
        <label htmlFor="name" className="form-label">
          Name
        </label>
        <input type="text" className="form-control" id="name" />
      </div>
      <div className="mb-3">
        <label htmlFor="description" className="form-label">
          Description
        </label>
        <textarea className="form-control" id="description" rows="3"></textarea>
      </div>
      <div className="mb-3">
        <label htmlFor="price" className="form-label">
          Price
        </label>
        <input type="text" className="form-control" id="price" />
      </div>
      <div className="mb-3">
        <label htmlFor="stock" className="form-label">
          Stock
        </label>
        <input type="text" className="form-control" id="stock" />
      </div>
      {/* Add other form fields for price, stock, etc. */}
      <button type="submit" className="btn btn-primary">
        Submit
      </button>
    </form>
  );
};

export default FormProductComponent;
