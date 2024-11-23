import { createSlice, createAsyncThunk, current } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL_PRODUCT = "https://hc0p0dtn-3000.asse.devtunnels.ms/products";

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async () => {
    const response = await axios.get(API_URL_PRODUCT);
    return response.data;
  }
);

export const fetchProductById = createAsyncThunk(
  "products/fetchProducts",
  async (id) => {
    const response = await axios.get(`${API_URL_PRODUCT}?id=${id}`);
    return response.data;
  }
);

export const deleteProduct = createAsyncThunk(
  "products/deleteProduct",
  async (id) => {
    await axios.delete(`${API_URL_PRODUCT}/${id}`);
    return id;
  }
);

export const addProduct = createAsyncThunk(
  "products/addProduct",
  async (product) => {
    const response = await axios.post(API_URL_PRODUCT, product);
    return response.data;
  }
);

export const updateProduct = createAsyncThunk(
  "products/updateProduct",
  async ({ id, product }) => {
    const response = await axios.put(`${API_URL_PRODUCT}/${id}`, product);
    return response.data;
  }
);

const initialState = {
  products: [],
  product: {},
  loading: false,
  error: null,
  isSuccess: false,
  isUpdate: false,
};

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    currentProduct: (state, action) => {
      state.product = action.payload;
      state.isUpdate = true;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchProducts.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      state.loading = false;
      state.products = action.payload;
    });
    builder.addCase(fetchProducts.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload || "Something went wrong";
    });

    //delete
    builder.addCase(deleteProduct.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(deleteProduct.fulfilled, (state, action) => {
      state.loading = false;
      state.products = state.products.filter(
        (product) => product.id !== action.payload
      );
    });
    builder.addCase(deleteProduct.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload || "Something went wrong";
    });

    //update
    builder.addCase(updateProduct.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(updateProduct.fulfilled, (state, action) => {
      state.loading = false;
      state.isUpdate = false;
      state.products = state.products.map((product) =>
        product.id === action.payload.id ? action.payload : product
      );
    });
    builder.addCase(updateProduct.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload || "Something went wrong";
    });

    //add
    builder.addCase(addProduct.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(addProduct.fulfilled, (state, action) => {
      state.loading = false;
      state.products.push(action.payload);
    });

    builder.addCase(addProduct.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload || "Something went wrong";
    });
  },
});

export default productSlice.reducer;
export const { currentProduct } = productSlice.actions;
