use OnlineOrderSystem;
SET FOREIGN_KEY_CHECKS = 0;

DROP TABLE if exists  profiles ;
DROP TABLE if exists  images;
DROP TABLE if exists  users;
DROP TABLE if exists  menus;
DROP TABLE if exists  menuCategory;
DROP TABLE if exists  dishs;
DROP TABLE if exists  Orders;
DROP TABLE if exists  payments;
SET FOREIGN_KEY_CHECKS = 1;

CREATE TABLE images (
  id int(111) NOT NULL AUTO_INCREMENT,
  image longblob NOT NULL,
  created_at datetime NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;


CREATE TABLE users (
 `id` MEDIUMINT NOT NULL AUTO_INCREMENT, 
 `email` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
 `account` varchar(20) COLLATE utf8_unicode_ci NOT NULL,
 `password` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
 `register_at` TIMESTAMP DEFAULT current_timestamp(),
 `last_update` TIMESTAMP DEFAULT current_timestamp() ON UPDATE current_timestamp(),
 PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

CREATE TABLE profiles (
 `id` MEDIUMINT NOT NULL AUTO_INCREMENT, 
 `usersid` MEDIUMINT NOT NULL,
 `name` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
 `last_update` TIMESTAMP DEFAULT current_timestamp() ON UPDATE current_timestamp(),
 `imageid` int(111) DEFAULT 0 NOT NULL,
 `type` int(1) NOT NULL,
 FOREIGN KEY (imageid) REFERENCES images(id),
 FOREIGN KEY (usersid) REFERENCES users(id),
 PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

CREATE TABLE menus (
    `menuid` int NOT NULL UNIQUE AUTO_INCREMENT,
    `name` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
    `profilesID` MEDIUMINT,
    `type` int(1) NOT NULL,
    `start_time` TIMESTAMP DEFAULT NULL,
    `end_time` TIMESTAMP DEFAULT NULL,
     `imageid` int(111) DEFAULT 0 NOT NULL,
    PRIMARY KEY (menuid),
    FOREIGN KEY (imageid) REFERENCES images(id),
    FOREIGN KEY (profilesID) REFERENCES profiles(id)
); 

CREATE TABLE menuCategory (
    `menuid` int NOT NULL UNIQUE,
    `categoryid` int NOT NULL AUTO_INCREMENT,
    `name` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
    `type` int(1) NOT NULL,
    `imageid` int(111) DEFAULT 0 NOT NULL,
    FOREIGN KEY (imageid) REFERENCES images(id),
    PRIMARY KEY (categoryid),
    FOREIGN KEY (menuid) REFERENCES menus(menuid)
); 

CREATE TABLE dishs (
    `categoryid` int NOT NULL,
    `dishid` MEDIUMINT,
    `name` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
    `description` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
    `type` int(1) NOT NULL,
    `imageid` int(111) DEFAULT 0 NOT NULL,
    `price` int NOT NULL,
    FOREIGN KEY (imageid) REFERENCES images(id),
    PRIMARY KEY (dishid),
    FOREIGN KEY (categoryid) REFERENCES menuCategory(categoryid)
);

CREATE TABLE Orders (
    `OrderID` int NOT NULL AUTO_INCREMENT UNIQUE,
    `OrderNumber` int NOT NULL,
    `usersID` MEDIUMINT,
    `theOrder` JSON NOT NULL,
    `totalPrice` int NOT NULL,
    `Order_time` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (OrderID),
    FOREIGN KEY (usersID) REFERENCES users(id)
); 


CREATE TABLE payments (
 `id` MEDIUMINT NOT NULL AUTO_INCREMENT, 
 `usersid` MEDIUMINT NOT NULL,
 `firstname` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
 `lastname` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
 `cardid` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
 `expireM` int(2) NOT NULL,
 `expireD` int(2) NOT NULL,
 `svv` int(3) NOT NULL,
 FOREIGN KEY (usersid) REFERENCES users(id),
 PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;