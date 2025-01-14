import React from "react";
import {Link} from "react-router-dom";

const ProductCard = ({ product }) => {
    return (
        <div className="product-card">
            <Link to={`/backpack/${product.product_no}`}><img
                src={product.img_url !== "이미지 없음" ? product.img_url : "https://via.placeholder.com/150"}
                alt={product.name}
                className="product-image"
            />
            <h3 className="product-name">{product.name}</h3>
            <p className="product-price">{Number(product.price)}원</p></Link>
        </div>
    );
};

export default ProductCard;
