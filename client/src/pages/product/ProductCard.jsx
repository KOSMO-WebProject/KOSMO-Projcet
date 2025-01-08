import React from "react";

const ProductCard = ({ product }) => {

    return (
        <div className="product-card">
            <img
                src={product.img_url !== "이미지 없음" ? product.img_url : "https://via.placeholder.com/150"}
                alt={product.name}
                className="product-image"
            />
            <h3 className="product-name">{product.name}</h3>
            <p className="product-price">{Number(product.price)}원</p>
        </div>
    );
};

export default ProductCard;