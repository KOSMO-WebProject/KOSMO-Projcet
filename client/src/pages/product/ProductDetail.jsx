import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {getBackPackDetail} from "../../api/product";


const ProductDetail = () => {
    const param = useParams()
    const [product, setProduct] = useState({});
    useEffect(() => {
        const res  = getBackPackDetail(param.no)
            .then(response => {
                setProduct(response[0]);
            }).catch(error => {
                console.log(error);
            });
    }, [param.no]);

    return (
        <div>
            상품디테일 창고 {param.no} 번 입니다.
            <div>이름: {product.name}</div>
            <div>가격: {product.price}</div>
            <div>재고: {product.stock}</div>
            <img src={product.img_url} alt="상품이미지"/>
            
        </div>
    );
};

export default ProductDetail;