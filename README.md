**웹 개발 목표 : 날씨 별(일간, 주간)등을 고려해 스타일을 추천해주는 웹 사이트 개발 및 리액트, NodeJ 공부**
# 프로젝트 기간 : 2024년 12월 09일 ~ 2025년 01월 23일 까지
### 코드 작성 및 구현은 01월 22일 까지 완료 후 코드 합쳐서 23일에 발표
참고 사이트 : <br>
Docu. Sample Link : https://github.com/weniv/project_sample_repo  <br>
Page Design Link : Figma  <br>

# 날씨 기반 스타일 추천 서비스

## 1. 목표와 기능

### 1.1 목표
- React와 Node.js 기반의 Express를 사용하여 웹 개발을 공부해본다.
- 날씨 API로 사용자의 위치에 따른 날씨 정보를 제공해주고 해당 날씨에 맞는 옷 스타일 추천 및 판매
- 옷 스타일 추천 사이트 목록
    - 무신사
    - 나이키
    - 지그재그
- 백엔드 : 다양한 API연동 (카카오, 네이버, 토스페이, 웨더API)
- 프론트엔드 : Redux사용, DB연동

### 1.2 기능
- 날씨(일간, 주간) 확인
- 개절별 옷 스타일 추천
- 리뷰 및 게시판 게시판 별 댓글 구현
- 로그인, 로그아웃 구현
- 아이디, 비밀번호 찾기 구현
- 회원 가입 및 회원 탈퇴
- 개인 정보 수정 및 입력
- 카드 결제 (실제로는 결제가 안된다.)
- 상품 장바구니로 연결 후 이동
- 공지사항

### 1.3 팀 구성
|  이름  |  역할    |   할일  |                구현페이지                 |
|:----:|   :-:   |   :-:   |:------------------------------------:|
| 김민석  | PM(프로젝트 매니저) 및 Front-End(프론트엔드) | 웹페이지 제작 및 문서 작성 |                 고객센터                 |
| 이가연  | Front-End(프론트엔드) | 웹페이지 제작 |     메인페이지, 날씨추천, 회원가입, 푸터, 마이페이지     |
| 신지선  | Front-End(프론트엔드) | 웹페이지 제작 |      상품 랜딩페이지, 상세페이지, 장바구니, 로그인, 헤더       |
| 김민태  | Back-End(백엔드) | DB설계 및 연동 |      날씨API, 소셜로그인API, 유저DB회원관리       |
| 김종범★ | Back-End(백엔드) | DB설계 및 연동 | 결제API, 상품DB, 크롤링, 장바구니연결, 공지사항, 주문내역 |
| 장한나  | Back-End(백엔드) | DB설계 및 연동 |                 QNA                  |

## 2. 개발 환경
### 2.1 개발 환경
- VsCode
- React
- 자바스크립트
- Node.js + Express
- mySQL




## 2.2 작업정의서
엑셀파일

## 3. 메뉴트리
https://files.slack.com/files-pri/T01PVTUGG94-F0850SKRDGX/image.png?is_viewed=1

## 4. 페이지 설계

### 4-1. Client 페이지설계  (src)

- components

| file    | Views Function | HTML File Name            | Note         |
|---------|----------------|---------------------------|--------------|
| auth    | 회원가입           | main/SignupComponents.jsx | 회원가입페이지 form |
| include | 헤더             | main/Header.jsx           | 회원가입페이지 form |
|  | 푸터             | main/SignupComponents.jsx | 회원가입페이지 form |


- auth

| App       | URL                                        | Views Function    | HTML File Name                        | Note           |
|-----------|--------------------------------------------|-------------------|---------------------------------------|----------------|
| accounts  | 'register/'                                | register          | accounts/register.jsx                |회원가입         |
| accounts  | 'login/'                                   | login             | accounts/login.jsx                   |로그인           |
| accounts  | 'logout/'                                  | logout            | accounts/logout.jsx                  |로그아웃         |
| accounts  | 'profile/'                                 | profile           | accounts/profile.jsx                 | 비밀번호변경기능 / <br>프로필 수정/ 닉네임추가 |


- boardapp

| App       | URL                                        | Views Function    | HTML File Name                        | Note           |
|-----------|--------------------------------------------|-------------------|---------------------------------------|----------------|
| board     | 'board/'                                   | board             | boardapp/post_list.jsx               | 게시판 목록 |
| board     | 'board/<int:pk>/'                          | post_detail       | boardapp/post_detail.jsx            | 게시글 상세보기 |
| board     | 'board/write/'                             | post_write        | boardapp/post_write.jsx             | 게시글 작성 |
| board     | 'board/edit/<int:pk>/'                     | post_edit         | boardapp/post_edit.jsx              | 게시글 수정 |
| board     | 'board/delete/<int:pk>/'                   | post_delete       | boardapp/post_delete.jsx            | 게시글 삭제 |
| board     | 'board/<int:pk>/comment/'                  | comment_create    | boardapp/comment_form.jsx           | 댓글 작성 |
| board     | 'board/<int:pk>/comment/<br><int:comment_pk>/edit/' | comment_edit | boardapp/comment_form.jsx           | 댓글 수정 |
| board     | 'board/<int:pk>/comment/<br><int:comment_pk>/delete/' | comment_delete | boardapp/comment_<br>confirm_delete.jsx| 댓글 삭제 |


- blog


| App       | URL                                        | Views Function    | HTML File Name                        | Note           |
|-----------|--------------------------------------------|-------------------|---------------------------------------|----------------|
| blog      | 'blog/'                                    | blog              | blog/blog.jsx                        |갤러리형 게시판 메인 화면  |
| blog      | 'blog/<int:pk>/'                           | post              | blog/post.jsx                        |상세 포스트 화면    |
| blog      | 'blog/write/'                              | write             | blog/write.jsx                       | 카테고리 지정, 사진업로드,<br> 게시글 조회수 반영|
| blog      | 'blog/edit/<int:pk>/'                      | edit              | blog/edit.jsx                        | 게시물목록보기 |
| blog      | 'blog/delete/<int:pk>/'                    | delete            | blog/delete.jsx                      | 삭제 화면      |
| blog      | 'blog/search/'                             | search            | blog/search.jsx                      | 주제와 카테고리에 따라 검색,<br> 시간순에 따라 정렬|
| blog      | 'post/<int:post_pk>/comment/'              | comment_new       | blog/comment_form.jsx                | 댓글 입력 폼     |
| blog      | 'post/<int:post_pk>/comment/<br><int:parent_pk>/' | reply_new    | blog/comment_form.jsx                | 대댓글 폼      |
| blog      | 'post/<int:pk>/like/'                      | like_post         | blog/post.jsx                        |좋아요를 누르면 blog/post로 Redirect됨|
| blog      | 'comment/<int:pk>/update/'                 | comment_update    | blog/comment_form.jsx                |댓글 업데이터 경로   |
| blog      | 'comment/<int:pk>/delete/'                 | comment_delete    | blog/comment_<br>confirm_delete.jsx  

## 5. 와이퍼프레임 / UI / BM(비지니스 모델)
5.1 <img src="" width="60%"> (작성중)

5.2 화면 설계 (예시 및 미작성)
<table>
    <tbody>
        <tr>
            <td>홈페이지</td>
            <td>로그인</td>
        </tr>
        <tr>
            <td>
		<img src="" width="100%">
            </td>
            <td>
                <img src="" width="100%">
            </td>
        </tr>
        <tr>
            <td>회원가입</td>
            <td>정보수정</td>
        </tr>
        <tr>
            <td>
                <img src="" width="100%">
            </td>
            <td>
                <img src="" width="100%">
            </td>
        </tr>
        <tr>
            <td>검색</td>
            <td>번역</td>
        </tr>
        <tr>
            <td>
                <img src="" width="100%">
            </td>
            <td>
                <img src="" width="100%">
            </td>
        </tr>
        <tr>
            <td>선택삭제</td>
            <td>글쓰기</td>
        </tr>
        <tr>
            <td>
	        <img src="" width="100%">
            </td>
            <td>
                <img src="" width="100%">
            </td>
        </tr>
        <tr>
            <td>글 상세보기</td>
            <td>댓글</td>
        </tr>
        <tr>
            <td>
                <img src="" width="100%">
            </td>
            <td>
                <img src="" width="100%">
            </td>
        </tr>
    </tbody>
</table>

## 6. DB(데이터베이스) 설계 (미작성)
* MySQL을 사용해 구성했습니다.

## 7. 아키텍처


![20241212 drawio (2)](https://github.com/user-attachments/assets/1121e30d-bf4f-4fd2-8ad6-19f65d1070c6)

## 8. 사용한 툴/기능
  - 다이어그램 탬플릿 : 사이트맵 만들때 메뉴트리 사이트 이용 https://online.visual-paradigm.com/ko/diagrams/templates/site-map-diagram/
  - FIGMA
  - REDUX
  - 부트스트랩
  - 폰트어썸
  - Quill (글 작성 툴)
  - AI 영상 작업
  - API (카카오, 네이버 로그인 | 카카오 지도 | OpenWeather | 토스 결제 API)
  - 크롤링
  - JWT-인증인가
  - SMTP(로드메일러)
  - bcrypt : 비밀번호 디비 관리자가 알 수 업게 난수로 지정해주는 것
  - GIT

## 9. 에러 및 에러 해결
  - 초기 React 및 Express 연결하는 방법 알지못해서 해맴 >> 강사님 기술지원으로 해결
  - 회원과 공지사항, QNA, 댓글 DB 설계시 회원아이디로 연결 >> 회원 고유번호 연결로 변경
  - 상세페이지 CSS 구성 이슈로 페이지 분리
  - 리덕스를 옛날 버전으로 진행해서 오류가 남 >> Redux Toolkit으로 변경 사용
  - 네이버 날씨 API 유료사용자에게만 오픈되어 OpenWeatherAPI로 변경
    - OpenWeatherAPI KEY 발급 시 30분 대기 시간 필요
  - DB 자료와 상품페이지 연동 문제 >> productSlice 파일에 코드 추가
  - 프론트 댓글 리플라이 기능 (민석님 작성 必)
  - 네이버 로그인 API 코드 누락으로 오류 >> 코드 추가
  - 장바구니
  - 결제
  - 비밀번호 찾기 이메일 발송 문제 >> 구글 측 2차 보안 이슈 공용으로 변경하여 해결
  - 주소찾기 공공API 오류 >> 카카오 API 변경
  - 로그인/회원가입 SQL문 오류 >> 코드 추가
  - 리뷰 db연동 실패로 상수값 지정

## 10. 개발 후기
 - 프론트엔드
   - 페이지 구성 시 새로운 툴인 피그마를 사용하여 전체적인 디자인 구성을 하고 코드 작업시 가이드에 맞춰 빠른 작업이 가능했다.
   - DB연결 시 화면구성에 차이가 있어, 백엔드와 합의점을 고안하여 코드를 보안했다.
   - 디자인 작업을 세세한 값으로 지정해줘야해서 어려움이 있었다.
 - 백엔드
   - 쿼리문(셀프조인, 이너조인)을 다양하게 사용할 기회가 되었다.
     - 쿼리문 연결할때 작성한 쿼리문이 동일한지 확인 작업이 중요성을 알 수 있었다.
     - 요청 기능에 따라 적절한 Restful API를 사용하는 법을 배웠다.
   - 사용자 요청을 받아 서버에서 DB연동 설계 경험을 할 수 있었다.
   - API 사용시 리다이렉트 URL과 요청 URL의 차이점을 알 수 있었다.
- 총평 : [ReadMe.md](ReadMe.md)
   - GIT 작업을 통한 프로젝트 진행 과정을 경험할 수 있었다.
   - 프론트엔드와 백엔드의 변수명이 지정되지 않은채로 작업이 시행되어 조율이 필요했다. 
   - 의사소통이 부족하여 기능 구현에 문제가 있었다.
## 9. 개발 후기
