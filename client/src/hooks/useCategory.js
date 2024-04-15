import {useState,useEffect} from "react";
import axios from "axios";


export default function useCategory(){
    const [categories,setCategories] = useState([]);
    
    //get categories
    const getCategories = async()=>{
        try {
            const res = await axios.get("/api/v1/category/getAll-categories");
            if(res && res.data?.success){
                setCategories(res.data?.data);
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(()=>{
        getCategories();
    },[])
    return categories;
}