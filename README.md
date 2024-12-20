**웹 개발 목표 : 날씨 별(일간, 주간)등을 고려해 스타일을 추천해주는 웹 사이트 개발 및 리액트, NodeJ 공부**
참고 사이트 : <br>
Docu. Sample Link : https://github.com/weniv/project_sample_repo  <br>
Mind Map Link : https://www.mindmeister.com/app/map/3555361373  <br>
Page Design Link : https://creatie.ai/goto/FL9vrA6h?page_id=M&file=146228640547582 <br>
프로젝트 2조 : https://github.com/Eco-Five/eco-web-project/wiki/%EC%B9%9C%ED%99%98%EA%B2%BD-%ED%94%8C%EB%9E%AB%ED%8F%BC-%EC%9B%B9-%EA%B0%9C%EB%B0%9C-%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8  <br>

# 날씨 기반 스타일 추천 서비스

## 1. 목표와 기능

### 1.1 목표
- React와 Node.js 기반의 Express를 사용하여 웹 개발을 공부해본다.
- 날씨 API로 사용자의 위치에 따른 날씨 정보를 제공해주고 해당 날씨에 맞는 옷 스타일 추천 및 판매
- 옷 스타일 추천 사이트 목록 (미정)
  - 무신사
  - 나이키
  - 아디다스
- 추천해준 스타일을 입은 SNS을 연동해 예시를 보여준다.

### 1.2 기능
- 날씨(일간, 주간) 확인
- 개절별 옷 스타일 추천
- 모델을 대신해 SNS(인스타)에 사람들이 입은 모습을 보여준다.
- 리뷰 및 게시판 게시판 별 댓글 구현
- 로그인, 로그아웃 구현
- 아이디, 비밀번호 찾기 구현
- 회원 가입 및 회원 탈퇴
- 개인 정보 수정 및 입력
- 카드 결제 (실제로는 결제가 안된다.)

### 1.3 팀 구성
| 이름    |  역할    |   할일  |
|   :-:   |   :-:   |   :-:   |
| 김민석 | PM(프로젝트 매니저) 및 Front-End(프론트엔드) | 웹페이지 제작 및 문서 작성 |
| 김민태 | Back-End(백엔드) | DB설계 및 연동 |
| 김종범 | Back-End(백엔드) | DB설계 및 연동 |
| 신지선 | Front-End(프론트엔드) | 웹페이지 제작 |
| 이가연 | Front-End(프론트엔드) | 웹페이지 제작 |
| 장한나 | Back-End(백엔드) | DB설계 및 연동 |

## 2. 개발 환경
### 2.1 개발 환경
- VsCode
- React
- 자바스크립트
- Node.js + Express




## 2.2 프로젝트 마인드맵
<img src="" width="100%">(미작성)

## 3. 사이트맵
<img src="" width="100%">(미적용)

## 4. 페이지 설계 (예시)
- main

| App       | URL                                        | Views Function    | HTML File Name                        | Note           |
|-----------|--------------------------------------------|-------------------|---------------------------------------|----------------|
| main      | '/'                                        | home              | main/home.jsx                        | 홈화면          |
| main      | '/about/'                                  | about             | main/about.jsx                       | 소개화면               |


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
            <td>메인</td>
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

## 8. 에러 및 에러 해결

## 9. 개발 후기
