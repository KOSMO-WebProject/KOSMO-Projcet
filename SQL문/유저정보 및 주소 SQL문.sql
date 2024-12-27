CREATE TABLE `user` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `user_id` VARCHAR(45) NOT NULL,
  `user_pw` VARCHAR(255) NOT NULL,  -- 암호화된 비밀번호 저장
  `user_name` VARCHAR(50) NOT NULL,
  `phone_number` VARCHAR(15) NOT NULL,
  `email` VARCHAR(100) NOT NULL,
  `date_of_birth` DATE NOT NULL,
  `gender` INT NOT NULL COMMENT '1: 남자, 2: 여자, 3: 기타',
  PRIMARY KEY (`id`),
  UNIQUE KEY `user_id_UNIQUE` (`user_id`),
  UNIQUE KEY `email_UNIQUE` (`email`),
  UNIQUE KEY `phone_number_UNIQUE` (`phone_number`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


CREATE TABLE `address` (
  `addr_id` INT NOT NULL AUTO_INCREMENT,
  `user_id` INT NOT NULL,                              -- 사용자 ID 참조
  `recipient_name` VARCHAR(50) NOT NULL,              -- 수신자 이름
  `phone_number` VARCHAR(15) DEFAULT NULL,            -- 수신자 전화번호
  `postal_code` VARCHAR(10) NOT NULL,                 -- 우편번호
  `address` VARCHAR(255) NOT NULL,                    -- 기본 주소
  `detailed_address` VARCHAR(255) DEFAULT NULL,       -- 상세 주소
  `is_default` BOOLEAN DEFAULT FALSE,                 -- 기본 배송지 여부 (FALSE: 아님, TRUE: 맞음)
  PRIMARY KEY (`addr_id`),
  FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;address