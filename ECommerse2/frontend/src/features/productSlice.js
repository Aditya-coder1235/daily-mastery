import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchAllProduct=createAsyncThunk('/fetch/product',async()=>{
    try {
        let res =await axios.get('http://localhost:8080/api/product/getAll')
        return res.data
    } catch (error) {
        console.log(error)
    }
})

const productSlice=createSlice({
    name:'product',
    initialState:{
        products:[],
        allProducts:[],
        loading:false,
        error:''
    },
    reducers:{
        filterByInput:(state,action)=>{
            let search=action.payload.toLowerCase().trim()

            if(search===''){
                state.products=state.allProducts
            }else{
                state.products=state.allProducts.filter((product)=>
                    product.name.toLowerCase().includes(search)
                )
            }
        }
    },
    extraReducers:(builder)=>{
        builder.addCase(fetchAllProduct.pending,(state,action)=>{
            state.loading=true
            state.error=''
        })
        .addCase(fetchAllProduct.fulfilled,(state,action)=>{
            state.loading=false
            state.products=action.payload.products
            state.allProducts = action.payload.products
        })
        .addCase(fetchAllProduct.rejected,(state,action)=>{
            state.error=action.payload
        })
    }
});

export const {filterByInput}=productSlice.actions
export default productSlice.reducer