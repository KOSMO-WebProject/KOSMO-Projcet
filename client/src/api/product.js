import axios from "axios";


export const getBackPackList = async () => {
    try{
        const response = await axios.get("/products/backpack");
        return response.data;
    }
    catch (error){
        console.error("Error fetching backpack data:", error);
    }
}

export const getBackPackDetail = async (no) => {
    try{
        const response = await axios.get("/products/backpack/" + no);
        return response.data;
    }
    catch (error){
        console.error("Error fetching detail data:", error);
    }
}

export const productDetail = async (no) => {
    try{
        const response = await axios.get("/products/detail/" + no);
        return response.data;
    }
    catch (error){
        console.error("Error fetching detail data:", error);
    }
}
