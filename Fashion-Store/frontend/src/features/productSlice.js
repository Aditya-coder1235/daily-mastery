import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

export const fetchAllProducts = createAsyncThunk('/fetch/products', async () => {
    try {
        let res = await axios.get(
            "http://localhost:8080/api/product/getAll",
        );
        return res.data.products

        // console.log(res.data)
    } catch (error) {
        console.error("Fetching product Error", error);
    }
});

const productSlice = createSlice({
    name: 'Product',
    initialState: {
        allProducts: [],
        productsForFil:[],
        products: [],
        loading: false,
        error: ''
    },
    reducers: {
        filterByCate: (state, action) => {
            let search = action.payload.toLowerCase()

            state.productsForFil = state.allProducts.filter((product) =>
                product.category === search
            )
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchAllProducts.pending, (state) => {
            state.loading = true
            state.error = ""
        }).addCase(fetchAllProducts.fulfilled, (state, action) => {
            state.loading = false
            state.allProducts = action.payload
            state.products = action.payload
            state.productsForFil=action.payload
        }).addCase(fetchAllProducts.rejected, (state, action) => {
            state.error = action.payload
        })
    }
})

export const {filterByCate}=productSlice.actions
export default productSlice.reducer