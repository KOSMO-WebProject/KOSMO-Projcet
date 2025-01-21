import React, { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToCartAsync } from '../../redux/slice/cartSlice';
import './ProductDetail.css';
import Header from "../../components/includes/Header";
import Footer from "../../components/includes/Footer";
import {productDetail} from "../../api/product";

const ProductDetail = () => {
    const params = useParams(); // URL에서 상품 ID 가져오기
    const { currentUser } = useSelector((state) => state.auth);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    // const [item, setItem] = useState([]);
    const [product, setProduct] = useState([]); // 상품 데이터 상태 관리
    const [selectedSize, setSelectedSize] = useState(null);
    const [selectedColor, setSelectedColor] = useState(null);
    const [reviewText, setReviewText] = useState('');
    const [reviews, setReviews] = useState([]);
    const [activeTab, setActiveTab] = useState(null);

    const detailsContentRef = useRef(null);
    const sizeContentRef = useRef(null);
    const reviewContentRef = useRef(null);
    const qnaContentRef = useRef(null);
    const tabsRef = useRef(null);


    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await productDetail(params.no);
                setProduct(response[0]);
            } catch (error) {
                console.error("상품 데이터를 불러오는데 실패했습니다.");
            }
        };
        fetchProduct();
    }, [params.no]);
    useEffect(() => {
        const header = document.querySelector('header');
        const handleScroll = () => {
            if (tabsRef.current) {
                const tabsTop = tabsRef.current.offsetTop - 60;
                if (window.scrollY >= tabsTop) {
                    tabsRef.current.classList.add('sticky-tabs');
                } else {
                    tabsRef.current.classList.remove('sticky-tabs');
                }
            }
            if (header) {
                header.style.display = window.scrollY > 100 ? 'none' : 'block';
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleAddToCart = () => {
        if(currentUser) {
            const item = {
                product_no: product.product_no,
                user_no : currentUser.user_no,
                quantity : 1,
                selectedSize: selectedSize || "프리사이즈",
                selectedColor: selectedColor || "기본 컬러",
            };
            dispatch(addToCartAsync(item));
            alert('상품이 장바구니에 추가되었습니다.');
        }
        else {
            alert('로그인이 필요한 서비스입니다.');
        }

    };

    const handleBuyNow = () => {
        const item = {
            ...product,
            selectedSize: selectedSize || "프리사이즈",
            selectedColor: selectedColor || "기본 컬러",
        };
        alert("구매 페이지로 이동합니다.");
        navigate('/payment', { state: { item } });
    };

    const handleTabClick = (tabName) => {
        setActiveTab(tabName);
        if (tabName === '정보') {
            detailsContentRef.current?.scrollIntoView({ behavior: 'smooth' });
        } else if (tabName === '사이즈') {
            sizeContentRef.current?.scrollIntoView({ behavior: 'smooth' });
        } else if (tabName === '리뷰') {
            reviewContentRef.current?.scrollIntoView({ behavior: 'smooth' });
        } else if (tabName === 'Q&A') {
            qnaContentRef.current?.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const handleReviewSubmit = () => {
        if (!reviewText.trim()) {
            alert('리뷰 내용을 입력해주세요.');
            return;
        }
        const newReview = {
            id: reviews.length + 1,
            text: reviewText,
            date: new Date().toLocaleString(),
        };
        setReviews([...reviews, newReview]);
        setReviewText('');
    };

    if (!product) {
        return <p>Loading...</p>;
    }

    return (
        <>
            <Header />
            <div className="detail-page">
                <div className="product-gallery">
                    <img src={product.img_url} alt="product" className="main-image" />
                </div>

                <div className="product-info">
                    <h6>{product.category_no}</h6>
                    <h1>{product.name}</h1>
                    <p className="price">{Number(product.price)}원</p>
                    <p className="description">{product.description || '상품 설명이 없습니다.'}</p>

                    <div className="color-options">
                        <span>컬러 선택: </span>
                        {["#D6D6D6", "black", "white"].map((color) => (
                            <button
                                key={color}
                                className={`color-button ${selectedColor === color ? "selected" : ""}`}
                                style={{ backgroundColor: color }}
                                onClick={() => setSelectedColor(color)}
                            ></button>
                        ))}
                    </div>
                    <div className="size-options">
                        <span>사이즈 선택: </span>
                        {["S", "M", "L", "XL"].map((size) => (
                            <button
                                key={size}
                                className={`size-button ${selectedSize === size ? "selected" : ""}`}
                                onClick={() => setSelectedSize(size)}
                            >
                                {size}
                            </button>
                        ))}
                    </div>

                    <button className="add-to-cart-button" onClick={handleAddToCart}>
                        장바구니
                    </button>
                    <button className="buy-now-button" onClick={handleBuyNow}>구매하기</button>
                </div>
            </div>
            <div className="product-details">
                <ul className="tabs" ref={tabsRef}>
                    <li onClick={() => handleTabClick('정보')} className={activeTab === '정보' ? 'active' : ''}>정보</li>
                    <li onClick={() => handleTabClick('사이즈')} className={activeTab === '사이즈' ? 'active' : ''}>사이즈</li>
                    <li onClick={() => handleTabClick('리뷰')} className={activeTab === '리뷰' ? 'active' : ''}>리뷰</li>
                    <li onClick={() => handleTabClick('Q&A')} className={activeTab === 'Q&A' ? 'active' : ''}>Q&A</li>
                </ul>
                <div ref={detailsContentRef} className="details-content">
                    <img src={product.img_url} alt="detail" />
                </div>
                <div ref={sizeContentRef} className="details-content">
                    <h2>사이즈 정보</h2>
                    <p>사이즈에 대한 상세 정보가 여기에 표시됩니다.</p>
                </div>
                <div ref={reviewContentRef} className="reviews-content">
                    <h2>리뷰</h2>
                    <textarea
                        value={reviewText}
                        onChange={(e) => setReviewText(e.target.value)}
                        placeholder="리뷰를 작성해주세요..."
                    />
                    <button onClick={handleReviewSubmit} className="submit-button">리뷰 작성</button>
                    {reviews.length === 0 ? (
                        <p>리뷰가 아직 없습니다.</p>
                    ) : (
                        <ul className="reviews-list">
                            {reviews.map((review) => (
                                <li key={review.id}>
                                    <p>{review.text}</p>
                                    <small>{review.date}</small>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
                <div ref={qnaContentRef} className="details-content">
                    <h2>Q&A 정보</h2>
                    <p>Q&A에 대한 상세 정보가 여기에 표시됩니다.</p>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default ProductDetail;
