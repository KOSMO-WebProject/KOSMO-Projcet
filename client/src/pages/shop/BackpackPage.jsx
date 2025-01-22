import React, { useEffect, useState } from "react";
import "./BackpackPage.css";
import Footer from "../../components/includes/Footer";
import Header from "../../components/includes/Header";
import { getBackPackList } from "../../api/product";
import ProductCard from "../product/ProductCard";

const BackpackPage = () => {
    const [bags, setBags] = useState([]);
    const [filteredBags, setFilteredBags] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState(null);

    useEffect(() => {
        const fetchBags = async () => {
            try {
                const response = await getBackPackList();
                setBags(response);
                setFilteredBags(response);
            } catch (error) {
                console.error("가방 데이터를 불러오는데 실패했습니다.");
            }
        };
        fetchBags();
    }, []);

    const handleSearch = (e) => {
        const query = e.target.value.toLowerCase();
        setSearchQuery(query);
        const filtered = bags.filter((bag) =>
            bag.name.toLowerCase().includes(query)
        );
        setFilteredBags(filtered);
    };

    const shuffleArray = (array) => {
        const shuffled = [...array];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled;
    };

    const handleCategoryFilter = (categoryNo) => {
        setSelectedCategory(categoryNo);
        if (categoryNo === null) {
            setFilteredBags(shuffleArray(bags));
        } else {
            const filtered = bags.filter((bag) => bag.category_no === categoryNo);
            setFilteredBags(filtered);
        }
    };

    return (
        <div className="bag-page">
            <Header />
            <div className="banner">
                <h1>Discover Your Perfect Bag</h1>
            </div>
            <div className="filters">
                <button
                    onClick={() => handleCategoryFilter(null)}
                    className={selectedCategory === null ? "active-category" : ""}
                >
                    전체
                </button>
                <button
                    onClick={() => handleCategoryFilter(26)}
                    className={selectedCategory === 26 ? "active-category" : ""}
                >
                    백팩
                </button>
                <button
                    onClick={() => handleCategoryFilter(27)}
                    className={selectedCategory === 27 ? "active-category" : ""}
                >
                    숄더백
                </button>
            </div>
            <div className="search-bar">
                <input
                    type="text"
                    placeholder="Search for your favorite bag..."
                    value={searchQuery}
                    onChange={handleSearch}
                />
            </div>
            <div className="product-grid">
                {filteredBags.length > 0 ? (
                    filteredBags.map((bag) => (
                        <ProductCard key={bag.product_no} product={bag} />
                    ))
                ) : (
                    <p style={{ textAlign: "center", fontSize: "1.5rem", color: "#777" }}>상품이 없습니다.</p>
                )}
            </div>
            <Footer />
        </div>
    );
};

export default BackpackPage;
