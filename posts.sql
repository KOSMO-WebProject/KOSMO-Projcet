CREATE database webdb_proj2 character set utf8 default collate utf8mb3_general_ci;

#시작할때마다 이거 먼저 활성화!
use webdb_proj2;#(데이터베이스 이름) 


##[[ 사용자 등록 ]]##
CREATE TABLE `user` (
  `user_no` INT NOT NULL AUTO_INCREMENT,  -- 기본 키 및 AUTO_INCREMENT
  `user_id` VARCHAR(45) NOT NULL,   -- 고유 키 및 외래 키로 사용
  `user_pw` VARCHAR(255) NOT NULL,   -- 암호화된 비밀번호 저장
  `user_name` VARCHAR(50) NOT NULL,
  `phone_number` VARCHAR(15),
  `email` VARCHAR(100),
  `date_of_birth` DATE DEFAULT NULL,
  `gender` INT NOT NULL COMMENT '1: 남자, 2: 여자, 3: 기타',
  PRIMARY KEY (`user_no`),                -- 기본 키로 설정
  UNIQUE KEY `user_no_UNIQUE` (`user_no`) -- user_no에 고유 키 설정
);

##[[ Q&A ]]##
CREATE TABLE qna (
    qna_no INT AUTO_INCREMENT PRIMARY KEY,  -- 문의/답변 고유번호
    user_no INT,                           -- 작성자 고유번호 (fk)
    parent_no INT default null,                         -- 답변일 경우 부모 qna_no, 질문은 NULL
    title VARCHAR(100),                    -- 문의 제목 (답변일 경우 NULL 가능)
    content VARCHAR(1000),                 -- 문의/답변 내용
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,  -- 작성일: 자동입력
    is_answer TINYINT(1) DEFAULT 0,        -- 답변여부 1:참, 0:거짓
    FOREIGN KEY (parent_no) REFERENCES qna(qna_no) ON DELETE CASCADE,  -- 부모 댓글 참조
    FOREIGN KEY (user_no) REFERENCES user(user_no) ON DELETE CASCADE  -- 작성자 참조
);

##[[ 공지사항 ]]##
create table notice(
 	n_no int auto_increment primary key,
 	user_no int,  -- 관리자 계정만 공지글작성 가능
  	title varchar(100),
    content varchar(1000),
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP, -- 작성일 자동입력
  FOREIGN KEY (user_no) REFERENCES user(user_no) ON DELETE CASCADE -- 작성자 참조  	
  );



##[[ 커뮤니티 글 ]]##
create table community(
 	c_no int auto_increment primary key,
   	user_no int, 			-- (fk)
  	title varchar(100),
   	content varchar(1000),
  	created_at DATETIME DEFAULT CURRENT_TIMESTAMP, -- 작성일 자동입력
  	hit int default 0,
  	FOREIGN KEY (user_no) REFERENCES user(user_no) ON DELETE CASCADE -- 작성자 참조  	
)

##[[ 커뮤니티 댓글&대댓글 ]]##
CREATE TABLE comment(
    cc_no INT AUTO_INCREMENT PRIMARY KEY,  -- 댓글 고유번호
    c_no INT,                              -- 게시글 번호 (FK)
    user_no INT,                           -- 작성자 ID (FK)
    content VARCHAR(1000),                 -- 댓글 내용
    parent_no INT DEFAULT NULL,            -- 대댓글의 부모 댓글 cc_no, 댓글은 NULL
    depth INT DEFAULT 0,                   -- 댓글:0, 대댓글:1 (계층을 나누는 컬럼)
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,  -- 작성일 자동입력
    FOREIGN KEY (c_no) REFERENCES community(c_no) ON DELETE CASCADE,   -- 게시글 참조
    FOREIGN KEY (parent_no) REFERENCES comment(cc_no) ON DELETE cascade,  -- 대댓글 부모 참조
    FOREIGN KEY (user_no) REFERENCES user(user_no) ON DELETE CASCADE  -- 작성자 참조
)

