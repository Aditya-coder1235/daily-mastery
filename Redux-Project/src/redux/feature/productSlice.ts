import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchProducts = createAsyncThunk(
    "product/fetchProducts",
    async () => {
        const response = await fetch("https://fakestoreapi.com/products");
        const data = await response.json();
        return data;
    },
);

const productSlice = createSlice({
    name: "product",
    initialState: {
        products: [],
        allProducts: [],
        loading: false,
        error: null,
    },
    reducers: {
        fetchProductsByCategory: (state, action) => {
            const category = action.payload.toLowerCase();
            if (category === "") {
                state.products = state.allProducts;
            } else {
                state.products = state.allProducts.filter(
                    (product: any) =>
                        product.category.toLowerCase() === category,
                );
            }
    },
    fetchProductsByInput: (state, action) => {
        const input = action.payload.toLowerCase();
        if (input === "") {
            state.products = state.allProducts;
        } else {
            state.products = state.allProducts.filter((product: any) =>
                product.title.toLowerCase().includes(input),
            );
        }    
    },
},
    extraReducers: (builder) => {
        builder.addCase(fetchProducts.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(fetchProducts.fulfilled, (state, action) => {
            state.loading = false;
            state.products = action.payload;
            state.allProducts = action.payload;
        });
        builder.addCase(fetchProducts.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        });
    },
});

export const { fetchProductsByCategory, fetchProductsByInput } = productSlice.actions;
export default productSlice.reducer;