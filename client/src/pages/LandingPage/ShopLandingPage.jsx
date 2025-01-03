import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setProducts } from "../../redux/slice/productsSlice";
import { setCategories } from "../../redux/slice/categoriesSlice";
import Footer from "../../components/Footer/Footer";
import { useNavigate } from "react-router-dom";
import "./ShopLandingPage.css";
import banner from '../../assets/banner-image.jpg';
import Header from "../../components/Header/Header";

const ShopLandingPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { products } = useSelector((state) => state.products);
  const { categories } = useSelector((state) => state.categories);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const sampleProducts = [
      { id: 1, title: "여성 패션 아이템", description: "스타일리시한 여성 룩", category: 'Women' },
      { id: 2, title: "여성 패션 아이템", description: "모던한 여성 스타일", category: 'Women' },
      { id: 3, title: "남성 패션 아이템", description: "세련된 남성 스타일", category: 'Men' },
      { id: 4, title: "남성 패션 아이템", description: "캐주얼한 남성 스타일", category: 'Men' },
    ];

    const sampleCategories = ['Women', 'Men'];

    dispatch(setProducts(sampleProducts));
    dispatch(setCategories(sampleCategories));
  }, [dispatch]);

  const handleImageClick = () => {
    navigate("/weather");
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchClick = () => {
    console.log("검색어:", searchQuery);
  };

  return (
    <>
      <Header />
      <section className="banner-section" onClick={handleImageClick}>
        <img src={banner} alt="Banner" className="banner-image" />
      </section>

      <section className="search-section">
        <div className="search-input-wrapper">
          <h4>검색어를 입력하세요.</h4>
          <div className="input-with-button">
            <input
              type="text"
              placeholder="Search"
              className="search-input"
              onChange={handleSearchChange}
            />
            <button className="search-button" onClick={handleSearchClick}>
            <i className="fas fa-search"></i>
            </button>
          </div>
        </div>
      </section>

      <section className="product-section">
        {categories && categories.length > 0 && categories.map((category) => (
          <div key={category}>
            <h2>{category}</h2>
            <div className="product-grid">
              {products
                .filter((product) => product.category.toLowerCase() === category.toLowerCase())
                .map((product) => (
                  <div key={product.id} className="product-card">
                    <div className="product-image"></div>
                    <p className="product-cate">{category === "Women" ? "여성" : category === "Men" ? "남성" : category}</p>
                    <p className="product-title">{product.title}</p>
                    <p className="product-description">{product.description}</p>
                  </div>
                ))}
            </div>
          </div>
        ))}
      </section>
      
      <Footer />
    </>
  );
};

export default ShopLandingPage;
