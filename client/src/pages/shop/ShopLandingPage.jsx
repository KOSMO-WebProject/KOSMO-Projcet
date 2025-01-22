import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { setProducts } from "../../redux/slice/productsSlice";
import "./ShopLandingPage.css";
import Footer from "../../components/includes/Footer";
import Header from "../../components/includes/Header";
import banner from '../../assets/banner-image.jpg';
import bestImage from '../../assets/BEST.jpg';
import newImage from '../../assets/NEW.jpg';
import aiGoodImage from '../../assets/AI_Good.jpg';

const ShopLandingPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { products, loading } = useSelector((state) => state.products);
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        dispatch(setProducts(22)); // 남성 카테고리 호출 (예: 2번)
        dispatch(setProducts(24)); // 여성 카테고리 호출 (예: 4번)
    }, [dispatch]);

    const handleShopDetail = (product) => {
        navigate(`/clothing/product/${product.product_no}`);
    };

    const getRandomItems = (items, count) => {
        const shuffled = [...items].sort(() => 0.5 - Math.random());
        return shuffled.slice(0, count);
    };

    const handleSubBannerClick = () => {
        navigate('/');
    };

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const handleSearchClick = () => {
        console.log("검색어:", searchQuery);
    };

    const maleClothing = products[22] || []; // 남성 의류 (카테고리 번호 2)
    const femaleClothing = products[24] || []; // 여성 의류 (카테고리 번호 4)

    console.log(products);

    const randomMaleClothing = getRandomItems(maleClothing, 10);
    const randomFemaleClothing = getRandomItems(femaleClothing, 10);

    if (loading) return <p>Loading...</p>;

    return (
        <>
            <Header />
            <section className="banner-section">
                <img src={banner} alt="Banner" />
            </section>

            {/* 검색 섹션 */}
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

            {/* 남성 의류 섹션 */}
            <section className="product-section">
                <h2>남성 의류</h2>
                <Swiper
                    modules={[Navigation, Pagination]}
                    spaceBetween={20}
                    slidesPerView={4}
                    navigation
                    loop={true}
                    pagination={{ clickable: true }}
                    className="carousel-slideshow"
                >
                    {randomMaleClothing.map((product) => (
                        <SwiperSlide key={product.product_no} className="swiper-slide">
                            <div onClick={() => handleShopDetail(product)} className="product-card">
                                <div className="product-image">
                                    <img src={product.img_url} alt={product.name} />
                                </div>
                                <p className="product-title">{product.name}</p>
                                <p className="product-price">{Number(product.price).toLocaleString()} 원</p>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </section>

            {/* 여성 의류 섹션 */}
            <section className="product-section">
                <h2>여성 의류</h2>
                <Swiper
                    modules={[Navigation, Pagination]}
                    spaceBetween={20}
                    slidesPerView={4}
                    navigation
                    loop={true}
                    pagination={{ clickable: true }}
                    className="carousel-slideshow"
                >
                    {randomFemaleClothing.map((product) => (
                        <SwiperSlide key={product.product_no} className="swiper-slide">
                            <div onClick={() => handleShopDetail(product)} className="product-card">
                                <div className="product-image">
                                    <img src={product.img_url} alt={product.name} />
                                </div>
                                <p className="product-title">{product.name}</p>
                                <p className="product-price">{Number(product.price).toLocaleString()} 원</p>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </section>

            {/* 서브 배너 섹션 */}
            <section className="subBanner-section" onClick={handleSubBannerClick}>
                <div className="subBanner-container">
                    <div className="subBanner-title">살펴보기</div>
                    <div className="subBanner-items">
                        <div className="subBanner-item">
                            <img src={bestImage} alt="베스트" />
                            <p className="image-text">BEST</p>
                        </div>
                        <div className="subBanner-item">
                            <img src={newImage} alt="신제품" />
                            <p className="image-text">NEW</p>
                        </div>
                        <div className="subBanner-item">
                            <img src={aiGoodImage} alt="날씨에 맞는 옷 추천" />
                            <p className="image-text-3">날씨에 맞는 옷 추천</p>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </>
    );
};

export default ShopLandingPage;