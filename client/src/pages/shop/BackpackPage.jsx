import React, { useEffect, useState } from "react";
import "./BackpackPage.css";
import Footer from "../../components/includes/Footer";
import Header from "../../components/includes/Header";
import {getBackPackList} from "../../api/product";
import ProductCard from "../product/ProductCard";


const BackpackPage = () => {
    const [bags, setBags] = useState([]);
    const [filteredBags, setFilteredBags] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        const fetchBags = async () => {
            try {
                const response = await getBackPackList();
                setBags(response);
                console.log(bags)
            } catch (error) {
                console.error("가방 데이터를 불러오는데 실패했습니다.");
            }
        };
        fetchBags();
    },[]);
    const handleSearch = (e) => {
        const query = e.target.value.toLowerCase();
        setSearchQuery(query);
        const filtered = bags.filter((bag) =>
            bag.name.toLowerCase().includes(query)
        );
        setFilteredBags(filtered);
    };

    return (
        <div className="bag-page">
            <Header />
            <div className="banner">
                <h1>Discover Your Perfect Bag</h1>
            </div>
            <div className="filters">
                <input
                    type="text"
                    placeholder="Search bags..."
                    value={searchQuery}
                    onChange={handleSearch}
                />
            </div>
            {bags.map((bag) => (
                <ProductCard key={bag.product_no} product={bag} />
                ))}
            <Footer/>
        </div>
    );
};

export default BackpackPage;
