-- phpMyAdmin SQL Dump
-- version 4.7.9
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Jul 30, 2018 at 12:50 AM
-- Server version: 5.7.21
-- PHP Version: 5.6.35

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `db_mybitboxmining`
--

-- --------------------------------------------------------

--
-- Table structure for table `accessfunction`
--

DROP TABLE IF EXISTS `accessfunction`;
CREATE TABLE IF NOT EXISTS `accessfunction` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `funcName` varchar(100) NOT NULL,
  `funcType` int(11) NOT NULL COMMENT 'có quyền access vào nguyên page hoặc chỉ 1 func nào đó',
  `createAt` datetime NOT NULL,
  `updateAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`),
  KEY `id_2` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `customer`
--

DROP TABLE IF EXISTS `customer`;
CREATE TABLE IF NOT EXISTS `customer` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `email` varchar(100) NOT NULL,
  `password` varchar(250) NOT NULL,
  `phone` varchar(12) DEFAULT NULL,
  `fullname` varchar(100) NOT NULL,
  `birthday` datetime DEFAULT NULL,
  `active` int(11) NOT NULL COMMENT '1: active, 0 : deactivate',
  `userActive` int(11) DEFAULT NULL,
  `createAt` datetime NOT NULL,
  `updateAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`),
  KEY `id_2` (`id`),
  KEY `userActive` (`userActive`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `customer`
--

INSERT INTO `customer` (`id`, `email`, `password`, `phone`, `fullname`, `birthday`, `active`, `userActive`, `createAt`, `updateAt`) VALUES
(1, 'ldqntkh@gmail.com', '860725c244f7e08d1ff9a60180f87250f1d5833e2f2c11ad3b3757232ed2d867', '', 'Quang Le', NULL, 1, NULL, '2018-06-27 14:55:38', '2018-06-27 14:56:35'),
(4, 'phatlonely@gmail.com', '860725c244f7e08d1ff9a60180f87250f1d5833e2f2c11ad3b3757232ed2d867', '', 'Phat Le', NULL, 1, NULL, '2018-07-16 08:43:10', '2018-07-16 08:43:34'),
(5, 'tester04@gmail.com', '21691c110201ab5b9e5275ea0d21b199e807a30cfff989e9ebaf70ae28d3992d', '', 'tester04', NULL, 0, NULL, '2018-07-20 07:29:57', '0000-00-00 00:00:00');

-- --------------------------------------------------------

--
-- Table structure for table `historyofadmin`
--

DROP TABLE IF EXISTS `historyofadmin`;
CREATE TABLE IF NOT EXISTS `historyofadmin` (
  `id` double NOT NULL AUTO_INCREMENT,
  `historyTypeId` varchar(100) NOT NULL,
  `userId` int(11) NOT NULL,
  `description` text NOT NULL,
  `createAt` datetime NOT NULL,
  `updateAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `userId` (`userId`),
  KEY `historyTypeId` (`historyTypeId`),
  KEY `id` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `historyofcustomer`
--

DROP TABLE IF EXISTS `historyofcustomer`;
CREATE TABLE IF NOT EXISTS `historyofcustomer` (
  `id` double NOT NULL AUTO_INCREMENT,
  `customerId` int(11) NOT NULL,
  `userId` int(11) DEFAULT NULL,
  `description` text NOT NULL,
  `createAt` datetime NOT NULL,
  `updateAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_2` (`id`),
  KEY `id` (`id`),
  KEY `customerId` (`customerId`),
  KEY `userId` (`userId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `locale`
--

DROP TABLE IF EXISTS `locale`;
CREATE TABLE IF NOT EXISTS `locale` (
  `id` varchar(50) NOT NULL,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `locale`
--

INSERT INTO `locale` (`id`, `name`) VALUES
('de', 'Denmark'),
('en', 'English'),
('vi', 'Viet Nam');

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

DROP TABLE IF EXISTS `orders`;
CREATE TABLE IF NOT EXISTS `orders` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `customerid` int(11) NOT NULL,
  `productname` varchar(200) NOT NULL,
  `hashrate` float NOT NULL DEFAULT '0',
  `quantity` int(11) NOT NULL,
  `description` text NOT NULL,
  `state` varchar(50) NOT NULL,
  `amount` float NOT NULL,
  `currency` varchar(10) NOT NULL,
  `product_period` int(11) NOT NULL,
  `createAt` datetime NOT NULL,
  `updateAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `id` (`id`),
  KEY `customerid` (`customerid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `payment_details`
--

DROP TABLE IF EXISTS `payment_details`;
CREATE TABLE IF NOT EXISTS `payment_details` (
  `id` varchar(100) NOT NULL,
  `orderid` int(11) NOT NULL,
  `payment_method` varchar(100) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `firstname` varchar(50) DEFAULT NULL,
  `lastname` varchar(50) DEFAULT NULL,
  `payerid` varchar(100) DEFAULT NULL,
  `countrycode` varchar(10) DEFAULT NULL,
  `state` varchar(20) NOT NULL,
  `cart` varchar(100) NOT NULL,
  `createAt` datetime NOT NULL,
  `updateAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `orderid` (`orderid`),
  KEY `id` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `pricebook`
--

DROP TABLE IF EXISTS `pricebook`;
CREATE TABLE IF NOT EXISTS `pricebook` (
  `id` int(50) NOT NULL AUTO_INCREMENT,
  `localeId` varchar(50) NOT NULL,
  `productId` int(50) NOT NULL,
  `name` varchar(255) NOT NULL,
  `price` float NOT NULL,
  `sale_price` float NOT NULL,
  `currency` varchar(255) NOT NULL,
  `symbol_currency` varchar(10) NOT NULL,
  `desc1` text NOT NULL,
  `desc2` text NOT NULL,
  `desc3` text NOT NULL,
  `enable` tinyint(1) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `to_tb_locale` (`localeId`),
  KEY `to_tb_product` (`productId`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `pricebook`
--

INSERT INTO `pricebook` (`id`, `localeId`, `productId`, `name`, `price`, `sale_price`, `currency`, `symbol_currency`, `desc1`, `desc2`, `desc3`, `enable`) VALUES
(1, 'en', 1, '10 Mh/s', 350, 330, 'USD', '$', 'Để bắt đầu khai thác Ethereum.', 'Thu về lợi nhuận về từng ngày\r\n', 'Đã bao gồm chi phí quản lý', 1),
(2, 'en', 2, '50 Mh/s', 1700, 1600, 'USD', '$', 'Product with 50 Mh/s', 'Product with 50 Mh/s', 'Product with 50 Mh/s', 1),
(3, 'en', 3, '100 Mh/s', 3200, 3000, 'USD', '$', 'Product with 100 Mh/s', 'Product with 100 Mh/s', 'Product with 100 Mh/s', 1),
(4, 'en', 4, '10 Mh/s', 200, 190, 'USD', '$', 'Product with 10 Mh/s', 'Product with 10 Mh/s', 'Product with 10 Mh/s', 1),
(5, 'en', 5, '50 Mh/s', 1000, 900, 'USD', '$', 'Product with 50 Mh/s', 'Product with 50 Mh/s', 'Product with 50 Mh/s', 1),
(6, 'en', 6, '100 Mh/s', 1700, 1600, 'USD', '$', 'Product with 100 Mh/s', 'Product with 100 Mh/s', 'Product with 100 Mh/s', 1),
(7, 'en', 7, 'test product', 2500, 2400, 'USD', '$', 'desc 1', 'desc 2', 'desc 3', 1);

-- --------------------------------------------------------

--
-- Table structure for table `product`
--

DROP TABLE IF EXISTS `product`;
CREATE TABLE IF NOT EXISTS `product` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `sku` varchar(50) NOT NULL,
  `hashrate` float NOT NULL,
  `period` int(11) NOT NULL DEFAULT '24' COMMENT 'số tháng, mặc định là 24',
  `maintenance_fee` float NOT NULL,
  `userUpdate` int(11) NOT NULL,
  `createAt` datetime NOT NULL,
  `updateAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `userUpdate` (`userUpdate`),
  KEY `id` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `product`
--

INSERT INTO `product` (`id`, `sku`, `hashrate`, `period`, `maintenance_fee`, `userUpdate`, `createAt`, `updateAt`) VALUES
(1, '1532353550', 10, 24, 0, 1, '2018-07-23 13:46:35', NULL),
(2, '1532353597', 50, 24, 0, 1, '2018-07-23 13:47:14', NULL),
(3, '1532353638', 100, 24, 0, 1, '2018-07-23 13:47:47', NULL),
(4, '1532353668', 10, 24, 7.5, 1, '2018-07-23 13:48:18', NULL),
(5, 'sku005', 50, 24, 35, 1, '2018-07-29 00:00:00', NULL),
(6, 'sku006', 100, 24, 65, 1, '2018-07-29 00:00:00', NULL),
(7, '1532837251', 150, 24, 0, 1, '2018-07-29 04:08:09', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `productofcustomer`
--

DROP TABLE IF EXISTS `productofcustomer`;
CREATE TABLE IF NOT EXISTS `productofcustomer` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `hashrate` float NOT NULL,
  `customerId` int(11) DEFAULT NULL,
  `walletId` int(11) DEFAULT NULL,
  `active` tinyint(1) NOT NULL DEFAULT '0',
  `expired` tinyint(1) NOT NULL DEFAULT '0' COMMENT 'tính thời gian hết hạn của product, nếu hết hạn thì customer có thể xóa',
  `period` int(11) NOT NULL,
  `maintenance_fee` float NOT NULL,
  `userUpdate` int(11) DEFAULT NULL,
  `startDate` datetime DEFAULT NULL,
  `endDate` datetime DEFAULT NULL,
  `createAt` datetime NOT NULL,
  `updateAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_2` (`id`),
  KEY `id` (`id`),
  KEY `customerId` (`customerId`),
  KEY `walletId` (`walletId`),
  KEY `userUpdate` (`userUpdate`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `productofcustomer`
--

INSERT INTO `productofcustomer` (`id`, `name`, `hashrate`, `customerId`, `walletId`, `active`, `expired`, `period`, `maintenance_fee`, `userUpdate`, `startDate`, `endDate`, `createAt`, `updateAt`) VALUES
(1, '10 Mh/s', 10, 1, 5, 1, 0, 24, 0, NULL, '2018-07-15 00:00:00', NULL, '2018-07-29 00:00:00', NULL),
(2, '50 Mh/s', 50, 1, 5, 1, 0, 24, 35, 1, '2018-07-15 00:00:00', NULL, '2018-07-29 00:00:00', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `totalpayment`
--

DROP TABLE IF EXISTS `totalpayment`;
CREATE TABLE IF NOT EXISTS `totalpayment` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `customerId` int(11) NOT NULL,
  `settlementDate` datetime NOT NULL,
  `paymentDate` datetime NOT NULL,
  `paymentMethod` varchar(255) NOT NULL,
  `paymentStatus` int(11) NOT NULL,
  `totalPayment` float NOT NULL,
  `createAt` datetime DEFAULT NULL,
  `updateAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `to_tb_customer` (`customerId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
CREATE TABLE IF NOT EXISTS `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(100) NOT NULL COMMENT 'user name',
  `password` varchar(250) NOT NULL,
  `fullname` varchar(100) NOT NULL,
  `userTypeId` int(11) NOT NULL,
  `email` varchar(100) NOT NULL,
  `phone` varchar(11) DEFAULT NULL,
  `createAt` datetime NOT NULL,
  `updateAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`),
  KEY `userTypeId` (`userTypeId`),
  KEY `id_2` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `username`, `password`, `fullname`, `userTypeId`, `email`, `phone`, `createAt`, `updateAt`) VALUES
(1, 'admin', '860725c244f7e08d1ff9a60180f87250f1d5833e2f2c11ad3b3757232ed2d867', 'Admin', 1, 'quang.le@bluecomgroup.com', NULL, '2018-06-27 00:00:00', '2018-06-27 00:00:00');

-- --------------------------------------------------------

--
-- Table structure for table `useraccessfunction`
--

DROP TABLE IF EXISTS `useraccessfunction`;
CREATE TABLE IF NOT EXISTS `useraccessfunction` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userTypeId` int(11) NOT NULL,
  `accessFuncId` int(11) NOT NULL,
  `createAt` datetime NOT NULL,
  `updateAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `userTypeId` (`userTypeId`),
  KEY `accessFuncId` (`accessFuncId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `usertype`
--

DROP TABLE IF EXISTS `usertype`;
CREATE TABLE IF NOT EXISTS `usertype` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `description` varchar(250) DEFAULT NULL,
  `createAt` datetime NOT NULL,
  `updateAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_2` (`id`),
  KEY `id` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `usertype`
--

INSERT INTO `usertype` (`id`, `name`, `description`, `createAt`, `updateAt`) VALUES
(1, 'admin', 'Admin', '2018-06-27 00:00:00', '2018-06-27 00:00:00');

-- --------------------------------------------------------

--
-- Table structure for table `wallet`
--

DROP TABLE IF EXISTS `wallet`;
CREATE TABLE IF NOT EXISTS `wallet` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `walletAddress` varchar(250) NOT NULL,
  `walletName` varchar(250) NOT NULL,
  `walletTypeId` int(11) NOT NULL,
  `CustomerId` int(11) NOT NULL,
  `createAt` datetime NOT NULL,
  `updateAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `walletAddress` (`walletAddress`),
  KEY `id` (`id`),
  KEY `CustomerId` (`CustomerId`),
  KEY `walletTypeId` (`walletTypeId`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `wallet`
--

INSERT INTO `wallet` (`id`, `walletAddress`, `walletName`, `walletTypeId`, `CustomerId`, `createAt`, `updateAt`) VALUES
(5, 'wallet 1', 'wallet 1', 1, 1, '2018-07-23 14:32:12', '2018-07-23 14:32:12');

-- --------------------------------------------------------

--
-- Table structure for table `walletbalance`
--

DROP TABLE IF EXISTS `walletbalance`;
CREATE TABLE IF NOT EXISTS `walletbalance` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `walletId` int(11) NOT NULL,
  `balance` float NOT NULL DEFAULT '0',
  `userUpdate` int(11) DEFAULT NULL,
  `createAt` datetime NOT NULL,
  `updateAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`),
  UNIQUE KEY `walletAddress_2` (`walletId`),
  KEY `id_2` (`id`),
  KEY `userUpdate` (`userUpdate`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `wallettype`
--

DROP TABLE IF EXISTS `wallettype`;
CREATE TABLE IF NOT EXISTS `wallettype` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `type` varchar(100) NOT NULL,
  `name` varchar(100) NOT NULL,
  `userUpdate` int(11) DEFAULT NULL,
  `createAt` datetime NOT NULL,
  `updateAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_2` (`id`),
  KEY `id` (`id`),
  KEY `userUpdate` (`userUpdate`),
  KEY `id_3` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `wallettype`
--

INSERT INTO `wallettype` (`id`, `type`, `name`, `userUpdate`, `createAt`, `updateAt`) VALUES
(1, 'eth', 'Ethereum', 1, '2018-07-03 00:00:00', '2018-07-03 00:00:00');

--
-- Constraints for dumped tables
--

--
-- Constraints for table `customer`
--
ALTER TABLE `customer`
  ADD CONSTRAINT `customer_ibfk_1` FOREIGN KEY (`userActive`) REFERENCES `user` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `historyofadmin`
--
ALTER TABLE `historyofadmin`
  ADD CONSTRAINT `historyofadmin_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `historyofcustomer`
--
ALTER TABLE `historyofcustomer`
  ADD CONSTRAINT `historyofcustomer_ibfk_1` FOREIGN KEY (`customerId`) REFERENCES `customer` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `historyofcustomer_ibfk_3` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`customerid`) REFERENCES `customer` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `payment_details`
--
ALTER TABLE `payment_details`
  ADD CONSTRAINT `payment_details_ibfk_1` FOREIGN KEY (`orderid`) REFERENCES `orders` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `pricebook`
--
ALTER TABLE `pricebook`
  ADD CONSTRAINT `to_tb_locale` FOREIGN KEY (`localeId`) REFERENCES `locale` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `to_tb_product` FOREIGN KEY (`productId`) REFERENCES `product` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `product`
--
ALTER TABLE `product`
  ADD CONSTRAINT `to_tb_user` FOREIGN KEY (`userUpdate`) REFERENCES `user` (`id`);

--
-- Constraints for table `productofcustomer`
--
ALTER TABLE `productofcustomer`
  ADD CONSTRAINT `productofcustomer_ibfk_1` FOREIGN KEY (`walletId`) REFERENCES `wallet` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `productofcustomer_ibfk_2` FOREIGN KEY (`userUpdate`) REFERENCES `user` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `productofcustomer_ibfk_3` FOREIGN KEY (`customerId`) REFERENCES `customer` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `totalpayment`
--
ALTER TABLE `totalpayment`
  ADD CONSTRAINT `to_tb_customer` FOREIGN KEY (`customerId`) REFERENCES `customer` (`id`);

--
-- Constraints for table `user`
--
ALTER TABLE `user`
  ADD CONSTRAINT `user_ibfk_1` FOREIGN KEY (`userTypeId`) REFERENCES `usertype` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `useraccessfunction`
--
ALTER TABLE `useraccessfunction`
  ADD CONSTRAINT `useraccessfunction_ibfk_1` FOREIGN KEY (`userTypeId`) REFERENCES `usertype` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `useraccessfunction_ibfk_2` FOREIGN KEY (`accessFuncId`) REFERENCES `accessfunction` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `wallet`
--
ALTER TABLE `wallet`
  ADD CONSTRAINT `wallet_ibfk_1` FOREIGN KEY (`CustomerId`) REFERENCES `customer` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `wallet_ibfk_2` FOREIGN KEY (`walletTypeId`) REFERENCES `wallettype` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `walletbalance`
--
ALTER TABLE `walletbalance`
  ADD CONSTRAINT `walletbalance_ibfk_1` FOREIGN KEY (`walletId`) REFERENCES `wallet` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `walletbalance_ibfk_2` FOREIGN KEY (`userUpdate`) REFERENCES `user` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `wallettype`
--
ALTER TABLE `wallettype`
  ADD CONSTRAINT `wallettype_ibfk_1` FOREIGN KEY (`userUpdate`) REFERENCES `user` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
