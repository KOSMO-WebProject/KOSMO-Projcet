import React from 'react';
import {useParams} from "react-router-dom";

const ProductDetail = () => {
    const param = useParams()
    console.log(param.no)
    return (
        <div>
            상품디테일 창고 {param.no} 번 입니다.
        </div>
    );
};

export default ProductDetail;