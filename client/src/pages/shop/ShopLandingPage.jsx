import React, { useEffect } from "react";
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

const ShopLandingPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { products, loading } = useSelector((state) => state.products);

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

    const maleClothing = products[22] || []; // 남성 의류 (카테고리 번호 2)
    const femaleClothing = products[24] || []; // 여성 의류 (카테고리 번호 4)

    console.log(products)

    const randomMaleClothing = getRandomItems(maleClothing, 10);
    const randomFemaleClothing = getRandomItems(femaleClothing, 10);

    if (loading) return <p>Loading...</p>;

    return (
        <>
            <Header />
            <section className="banner-section">
                <img src="../../assets/banner-image.jpg" alt="Banner" className="banner-image" />
            </section>

            {/* 남성 옷 섹션 */}
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
                                <img src={product.img_url} alt={product.name} />
                                <p className="product-title">{product.name}</p>
                                <p className="product-price">{Number(product.price).toLocaleString()} 원</p>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </section>

            {/* 여성 옷 섹션 */}
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
                                <img src={product.img_url} alt={product.name} />
                                <p className="product-title">{product.name}</p>
                                <p className="product-price">{Number(product.price).toLocaleString()} 원</p>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </section>

            <Footer />
        </>
    );
};

export default ShopLandingPage;
