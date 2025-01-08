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