import axios from "axios"
import { GET_PRODUCT_FAILURE, GET_PRODUCT_REQUEST, GET_PRODUCT_SUCCESS } from "./actiontype"

export const getProductRequest=()=>{
    return {type:GET_PRODUCT_REQUEST}
}

export const getProductSuccess=(payload)=>{
    return {type:GET_PRODUCT_SUCCESS,payload}
}

export const getProductFailure=()=>{
    return {type:GET_PRODUCT_FAILURE}
}

export const getProduct=(params={})=>(dispatch)=>{
    dispatch(getProductRequest());

    axios.get("http://localhost:8080/women",params).then((res)=>{
        console.log(res.data)
        dispatch(getProductSuccess(res.data))
    }).catch(err=>{
        dispatch(getProductFailure())
    })
}