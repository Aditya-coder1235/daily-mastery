import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

export const fetchProducts = createAsyncThunk('/fetch/products', async () => {
    try {
        let res = await axios.get(
            "http://localhost:8080/api/product/getAll"
        );
        return res.data.products

    } catch (error) {
        console.error(error)
    }

})

const productSlice = createSlice({
    name: "product",
    initialState: {
        products: [],
        allProducts: [],
        loading: false,
        error: null,
    },
    reducers: {
        setSearchTerm: (state, action) => {
            // state.search = action.payload;
            let search = action.payload.toLowerCase()

            if (search === '') {
                state.products = state.allProducts
            } else {
                state.products = state.products.filter((product) =>
                    product.title
                        .toLowerCase()
                        .includes(action.payload.toLowerCase())
                );
            }
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchProducts.pending, (state, action) => {
            state.loading = true
            state.error = null
        })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.loading = false
                state.products = action.payload
                state.allProducts = action.payload
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Failed to fetch products";
            })
    }
})

export const { setSearchTerm } = productSlice.actions

export default productSlice.reducer