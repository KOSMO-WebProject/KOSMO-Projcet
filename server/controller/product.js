const db = require('../database/db');



const productList = async (req, res) => {
    const {category_no} = req.params;
    const q = "SELECT * FROM product p inner join category c on p.category_no = c.category_no where c.category_no = ?";
    try {
        const [rows] = await db.get().execute(q,[category_no]);
        return res.status(200).json(rows);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "상품을 조회할 수 없습니다." });
    }
}

const productDetail = async (req, res) => {
    const {product_no} = req.params;
    const q = "SELECT * FROM product where product_no = ?";
    try {
        const [rows] = await db.get().execute(q,[product_no]);
        return res.status(200).json(rows);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "상품 상세정보를 조회할 수 없습니다." });
    }
}


const getBackPackList = async (req, res) => {
    const q = "SELECT p.product_no, p.name, p.price, p.stock, p.img_url, p.category_no FROM product p inner join category c on p.category_no = c.category_no where c.parent_category = 25";
    try {
        const [rows] = await db.get().execute(q);
        return res.status(200).json(rows);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "백팩을 조회할 수 없습니다." });
    }
}

const getBackPackDetail = async (req,res) => {
    const product_no = req.params.no;
    const q = "SELECT name,price,stock,img_url FROM product where product_no = ?";
    try {
        const [rows] = await db.get().execute(q,[product_no]);
        return res.status(200).json(rows);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "백팩 상세정보를 조회할 수 없습니다." });
    }
}

module.exports = {
    getBackPackList,
    productList,
    getBackPackDetail,
    productDetail
}