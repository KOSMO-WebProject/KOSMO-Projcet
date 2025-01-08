const db = require('../database/db');



const productList = async (req, res) => {
    const q = "SELECT * FROM product";
    try {
        const [rows] = await db.get().execute(q);
        return res.status(200).json(rows);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "상품을 조회할 수 없습니다." });
    }
}

const productBackpack = async (req, res) => {
    const q = "SELECT * FROM product p inner join category c on p.category_no = c.category_no where c.parent_category = 25";
    try {
        const [rows] = await db.get().execute(q);
        return res.status(200).json(rows);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "백팩을 조회할 수 없습니다." });
    }
}


module.exports = {
    productBackpack,
    productList,
}