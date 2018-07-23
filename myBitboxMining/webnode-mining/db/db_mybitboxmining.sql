-- phpMyAdmin SQL Dump
-- version 4.7.9
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Jul 22, 2018 at 09:01 AM
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
  `updateAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_2` (`id`),
  KEY `id` (`id`),
  KEY `customerId` (`customerId`),
  KEY `userId` (`userId`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `historyofcustomer`
--

INSERT INTO `historyofcustomer` (`id`, `customerId`, `userId`, `description`, `createAt`, `updateAt`) VALUES
(1, 1, NULL, 'You have create an order with order id is <a class=\'history\' href=\'/my-order/13/detail\'>12</a>', '2018-07-01 07:01:07', '0000-00-00 00:00:00'),
(2, 1, NULL, 'You have successfully paid the order <a class=\'history\' href=\'/my-order/10\'>12</a> with a payment code of <a class=\'history\' href=\'/my-order/10/payment-detail\'>PAY-9KM64010YA588982DLM4HYNQ</a>', '2018-07-01 07:05:30', '0000-00-00 00:00:00'),
(3, 1, NULL, 'Your order with id <a class=\'history\' href=\'/orders/12\'>12</a> is approved!', '2018-07-01 07:05:30', '0000-00-00 00:00:00'),
(4, 1, NULL, 'You have create an order with order id is <a class=\'history\' href=\'/orders/13\'>13</a>', '2018-07-01 07:55:41', '0000-00-00 00:00:00'),
(5, 1, NULL, 'You have successfully paid the order <a class=\'history\' href=\'/orders/13\'>13</a> with a payment code of <a class=\'history\' href=\'/payments/PAY-3KK482022H263372MLM4IR7Y\'>PAY-3KK482022H263372MLM4IR7Y</a>', '2018-07-01 07:56:24', '0000-00-00 00:00:00'),
(6, 1, NULL, 'Your order with id <a class=\'history\' href=\'/orders/13\'>13</a> is approved!', '2018-07-01 07:56:24', '0000-00-00 00:00:00'),
(7, 1, NULL, 'Your product with id <a class=\'history\' href=\'/product-customer/1\'>1</a> has not been activated. Please click here {1} choose a wallet address and active it.', '2018-07-01 07:56:24', '0000-00-00 00:00:00');

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
  `updateAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `id` (`id`),
  KEY `customerid` (`customerid`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`id`, `customerid`, `productname`, `hashrate`, `quantity`, `description`, `state`, `amount`, `currency`, `product_period`, `createAt`, `updateAt`) VALUES
(10, 1, '1 Mh/s', 0, 1, 'Buy 1 Mh/s with price USD25', 'approved', 25, 'USD', 6, '2018-06-30 14:08:56', '2018-06-30 14:09:20'),
(11, 1, '1 Mh/s', 0, 1, 'Buy 1 Mh/s with price USD25', 'not approved', 25, 'USD', 6, '2018-06-30 14:11:44', '2018-06-30 14:12:02');

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
  `updateAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `orderid` (`orderid`),
  KEY `id` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `payment_details`
--

INSERT INTO `payment_details` (`id`, `orderid`, `payment_method`, `email`, `firstname`, `lastname`, `payerid`, `countrycode`, `state`, `cart`, `createAt`, `updateAt`) VALUES
('PAY-5PW31021N93391406LM3Y7JA', 11, 'paypal', 'ldqpersonal@gmail.com', 'Quang', 'Personal', '33PVS9JYXHMXJ', 'US', 'approved', '1Y850279PW274101G', '2018-06-30 14:12:02', '0000-00-00 00:00:00'),
('PAY-82609808TX975034NLM3Y56Y', 10, 'paypal', 'ldqpersonal@gmail.com', 'Quang', 'Personal', '33PVS9JYXHMXJ', 'US', 'approved', '95978403XN3329504', '2018-06-30 14:09:20', '0000-00-00 00:00:00');

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `product`
--

DROP TABLE IF EXISTS `product`;
CREATE TABLE IF NOT EXISTS `product` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `sku` varchar(50) NOT NULL,
  `hashrate` float NOT NULL,
  `period` int(11) NOT NULL DEFAULT '6' COMMENT 'số tháng, mặc định là 6	',
  `userUpdate` int(11) NOT NULL,
  `createAt` datetime NOT NULL,
  `updateAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `userUpdate` (`userUpdate`),
  KEY `id` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

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
  `userUpdate` int(11) DEFAULT NULL,
  `startDate` datetime DEFAULT NULL,
  `endDate` datetime DEFAULT NULL,
  `createAt` datetime NOT NULL,
  `updateAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_2` (`id`),
  KEY `id` (`id`),
  KEY `customerId` (`customerId`),
  KEY `walletId` (`walletId`),
  KEY `userUpdate` (`userUpdate`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `productofcustomer`
--

INSERT INTO `productofcustomer` (`id`, `name`, `hashrate`, `customerId`, `walletId`, `active`, `expired`, `period`, `userUpdate`, `startDate`, `endDate`, `createAt`, `updateAt`) VALUES
(1, '1 Mh/s', 1, 1, 1, 1, 0, 6, NULL, NULL, NULL, '2018-07-01 07:56:24', '0000-00-00 00:00:00');

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
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `wallet`
--

INSERT INTO `wallet` (`id`, `walletAddress`, `walletName`, `walletTypeId`, `CustomerId`, `createAt`, `updateAt`) VALUES
(1, '0xf8C10041AA116d60358af0a76712efF0FE642455', 'test', 1, 1, '2018-07-03 00:00:00', '2018-07-03 00:00:00'),
(2, 'bla bla bla bla', 'ahuahuahua', 1, 1, '2018-07-03 16:14:15', '2018-07-03 16:14:15'),
(4, 'address01', 'test01', 1, 1, '2018-07-03 16:15:35', '2018-07-03 16:15:35');

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
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `walletbalance`
--

INSERT INTO `walletbalance` (`id`, `walletId`, `balance`, `userUpdate`, `createAt`, `updateAt`) VALUES
(1, 1, 10.5, NULL, '2018-07-07 00:00:00', '2018-07-18 11:15:58');

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
  ADD CONSTRAINT `to_tb_locale` FOREIGN KEY (`localeId`) REFERENCES `locale` (`id`),
  ADD CONSTRAINT `to_tb_product` FOREIGN KEY (`productId`) REFERENCES `product` (`id`);

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
