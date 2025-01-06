CREATE TABLE `user` (
  `user_no` int NOT NULL AUTO_INCREMENT,
  `user_id` varchar(45) DEFAULT NULL,
  `user_pw` varchar(255) DEFAULT NULL,
  `user_name` varchar(50) DEFAULT NULL,
  `phone_number` varchar(15) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `date_of_birth` varchar(50) DEFAULT NULL,
  `gender` char(1) DEFAULT NULL, /* M = 남자, F = 여자, U = 기타 */
  `nick_name` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`user_no`),
  UNIQUE KEY `id_UNIQUE` (`user_no`)
) 


CREATE TABLE `address` (
  `addr_no` int NOT NULL AUTO_INCREMENT,
  `user_no` int NOT NULL,
  `recipient_name` varchar(50) DEFAULT NULL,
  `phone_number` varchar(15) DEFAULT NULL,
  `postal_code` varchar(10) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `detailed_address` varchar(255) DEFAULT NULL,
  `is_default` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`addr_no`),
  UNIQUE KEY `addr_id_UNIQUE` (`addr_no`),
  KEY `address_ibfk_1` (`user_no`),
  CONSTRAINT `address_ibfk_1` FOREIGN KEY (`user_no`) REFERENCES `user` (`user_no`) ON DELETE CASCADE ON UPDATE CASCADE
)