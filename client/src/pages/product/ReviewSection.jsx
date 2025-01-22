import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ReviewSection.css';
// 이미지 import
import image1 from '../../assets/review_01.jpg';
import image2 from '../../assets/review_02.jpg';
import image3 from '../../assets/review_03.jpg';
import image4 from '../../assets/review_04.jpg';
import image5 from '../../assets/review_05.jpg';


const ReviewSection = () => {
    const [reviews, setReviews] = useState([
        { id: 1, user: '사용자01', date: '20xx.xx.xx', rating: 5, text: '너무 좋아요. 재구매 의사 있어요! ^^', helpful: 1, image: null },
        { id: 2, user: '사용자02', date: '20xx.xx.xx', rating: 4, text: '가격 대비 만족합니다.', helpful: 3, image: null },
        { id: 3, user: '사용자03', date: '20xx.xx.xx', rating: 3, text: '그럭저럭 괜찮아요.', helpful: 2, image: null },
    ]);
    const [newReview, setNewReview] = useState('');
    const [nickname, setNickname] = useState('');
    const [rating, setRating] = useState(5);
    const [image, setImage] = useState(null);
    const [userId, setUserId] = useState('');
    const [password, setPassword] = useState('');

    // 5개의 로컬 이미지 배열
    const reviewImages = [image1, image2, image3, image4, image5];

    // 서버에서 리뷰 데이터 가져오기
    const getReviews = async () => {
        try {
            const response = await axios.get('http://localhost:5000/getReviews');
            setReviews(response.data);
        } catch (error) {
            console.error('리뷰 데이터를 가져오는 데 실패했습니다:', error);
        }
    };

    useEffect(() => {
        getReviews();
    }, []);

    // 로그인 API 호출
    const handleLogin = async () => {
        try {
            const response = await axios.post('http://localhost:5000/login', { user_id: userId, password });
            setNickname(response.data.nickname); // 로그인 성공 시 닉네임 설정
        } catch (error) {
            alert('로그인 실패: ' + error.response.data);
        }
    };

    // 리뷰 추가 함수
    const handleAddReview = () => {
        if (newReview.trim() === '') {
            alert('리뷰 내용을 입력해주세요.');
            return;
        }
        if (!nickname) {
            alert('로그인 후 리뷰를 작성할 수 있습니다.');
            return;
        }
        const newReviewData = {
            id: reviews.length + 1,
            user: nickname,
            date: new Date().toISOString().split('T')[0],
            rating: rating,
            text: newReview,
            helpful: 0,
            image: image ? URL.createObjectURL(image) : null,
        };
        setReviews([newReviewData, ...reviews]);

        // 리뷰 등록 후 상태 초기화
        setNewReview('');
        setRating(5);
        setImage(null);
    };

    // 별점 선택 함수
    const handleRatingClick = (star) => {
        setRating(star);
    };

    // 이미지 업로드 함수
    const handleImageChange = (e) => {
        setImage(e.target.files[0]);
    };

    // 리뷰 삭제 함수
    const handleDeleteReview = (reviewId) => {
        const reviewToDelete = reviews.find(review => review.id === reviewId);

        if (reviewToDelete && reviewToDelete.user === nickname) {
            // 로그인한 사용자가 작성한 리뷰만 삭제 가능
            setReviews(reviews.filter(review => review.id !== reviewId));
        } else {
            alert('자신의 리뷰만 삭제할 수 있습니다.');
        }
    };

    // 도움됨 클릭 (좋아요) 함수
    const handleHelpfulClick = (reviewId) => {
        setReviews(reviews.map((review) =>
            review.id === reviewId ? { ...review, helpful: review.helpful + 1 } : review
        ));
    };

    return (
        <div className="review-section">
            <h3>리뷰</h3>
            {/* 커리셀 */}
            <div className="review-carousel">
                {reviewImages.map((image, index) => (
                    <div className="carousel-card" key={index}>
                        <div
                            className="carousel-image"
                            style={{
                                backgroundImage: `url(${image})`,
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                            }}
                        ></div>
                        <div className="carousel-content">
                            <h4>베스트 리뷰</h4>
                            <button className="see-more">See More ▶</button>
                        </div>
                    </div>
                ))}
            </div>

            {/* 리뷰 리스트 */}
            <div className="review-list">
                {reviews.map((review) => (
                    <div className="review-item" key={review.id}>
                        <div className="review-header">
                            <div>
                                <span className="review-user">{review.user}</span>
                                <span className="review-date">{review.date}</span>
                            </div>
                            <span className="review-rating">
                {'★'.repeat(review.rating)}
                                {'☆'.repeat(5 - review.rating)}
              </span>
                        </div>
                        {review.image && <img src={review.image} alt="Review" className="review-image" />}
                        <div className="review-text">{review.text}</div>
                        <div className="review-footer">
              <span className="helpful" onClick={() => handleHelpfulClick(review.id)}>
                도움돼요 👍 {review.helpful}
              </span>
                            {review.user === nickname && (
                                <button onClick={() => handleDeleteReview(review.id)}>삭제</button>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            {/* 리뷰 작성 */}
            {nickname ? (
                <div className="review-input">
                    <input
                        type="text"
                        value={nickname}
                        disabled
                        placeholder="닉네임"
                    />
                    <div className="rating">
                        {[1, 2, 3, 4, 5].map((star) => (
                            <span
                                key={star}
                                className={`star ${rating >= star ? 'selected' : ''}`}
                                onClick={() => handleRatingClick(star)}
                            >
                ★
              </span>
                        ))}
                    </div>
                    <textarea
                        value={newReview}
                        onChange={(e) => setNewReview(e.target.value)}
                        placeholder="리뷰를 작성해주세요."
                    />
                    <input type="file" accept="image/*" onChange={handleImageChange} />
                    <button onClick={handleAddReview}>리뷰 작성</button>
                </div>
            ) : (
                <p>로그인 후 리뷰를 작성할 수 있습니다.</p>
            )}
        </div>
    );
};

export default ReviewSection;