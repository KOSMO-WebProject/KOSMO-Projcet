const db = require("../database/db");

const cartList = async (req, res) => {
    const { user_no } = req.params;
    try {
        const [results] = await db.get().execute(
            'SELECT c.cart_item_no, c.cart_no, c.product_no, c.quantity, c.selected_size, c.selected_color, p.price, p.name , p.img_url FROM cartitem c LEFT OUTER JOIN product p ON c.product_no = p.product_no WHERE c.cart_no = (SELECT cart_no FROM cart WHERE user_no = ?)',
            [user_no]
        );
        return res.status(200).json(results);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: '장바구니 조회 중 오류가 발생했습니다.' });
    }
}

//상품을 추가할 때 장바구니 생성 만약에 상품이 있다면 장바구니 번호를 가져와서 상품을 추가
const cartInsert = async (req, res) => {
    const { user_no, product_no, quantity, selectedSize, selectedColor } = req.body;

    const connection = await db.get().getConnection(); // 트랜잭션을 위한 연결 가져오기

    try {
        await connection.beginTransaction();  // 트랜잭션 시작

        let cart_no;
        const [existingCart] = await connection.execute(
            'SELECT cart_no FROM cart WHERE user_no = ?',
            [user_no]
        );

        if (existingCart.length === 0) {
            const [result] = await connection.execute(
                'INSERT INTO cart (user_no, create_at) VALUES (?, NOW())',
                [user_no]
            );
            cart_no = result.insertId;
        } else {
            cart_no = existingCart[0].cart_no;
        }

        const [existingItem] = await connection.execute(
            'SELECT cart_item_no FROM cartitem WHERE cart_no = ? AND product_no = ?',
            [cart_no, product_no]
        );

        if (existingItem.length > 0) {
            await connection.execute(
                'UPDATE cartitem SET quantity = quantity + ? WHERE cart_item_no = ?',
                [quantity, existingItem[0].cart_item_no]
            );
        } else {
            await connection.execute(
                'INSERT INTO cartitem (cart_no, product_no, quantity, selected_size, selected_color, create_at) VALUES (?, ?, ?, ?, ?, NOW())',
                [cart_no, product_no, quantity, selectedSize, selectedColor]
            );
        }

        await connection.commit();  // 트랜잭션 커밋 (모든 작업 적용)

        res.status(201).json({ message: '장바구니에 상품이 추가되었습니다.' });
    } catch (error) {
        await connection.rollback();  // 오류 발생 시 롤백
        console.error('장바구니 추가 중 오류:', error);
        res.status(500).json({ message: '장바구니 추가 중 오류가 발생했습니다.' });
    } finally {
        connection.release();
    }
};

const cartOneDelete = async (req, res) => {
    const { cart_item_no } = req.params;
    try {
        await db.get().execute('DELETE FROM cartitem WHERE cart_item_no = ?', [cart_item_no]);
        return res.status(200).json({ message: '장바구니에서 상품이 삭제되었습니다.' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: '장바구니 삭제 중 오류가 발생했습니다.' });
    }
};

const cartAllDelete = async (req, res) => {
    const { cart_no } = req.params;
    try {
        await db.get().execute('DELETE FROM cartitem WHERE cart_no = ?', [cart_no]);
        return res.status(200).json({ message: '장바구니가 비워졌습니다.' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: '장바구니 비우기 중 오류가 발생했습니다.' });
    }
}




module.exports = {
    cartList,
    cartInsert,
    cartOneDelete,
    cartAllDelete,
}