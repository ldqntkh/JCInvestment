-- phpMyAdmin SQL Dump
-- version 4.7.0
-- https://www.phpmyadmin.net/
--
-- Máy chủ: 127.0.0.1
-- Thời gian đã tạo: Th7 10, 2018 lúc 04:26 PM
-- Phiên bản máy phục vụ: 10.1.24-MariaDB
-- Phiên bản PHP: 7.1.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Cơ sở dữ liệu: `db_mybitboxmining`
--

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `accessfunction`
--

CREATE TABLE `accessfunction` (
  `id` int(11) NOT NULL,
  `funcName` varchar(100) NOT NULL,
  `funcType` int(11) NOT NULL COMMENT 'có quyền access vào nguyên page hoặc chỉ 1 func nào đó',
  `createAt` datetime NOT NULL,
  `updateAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `customer`
--

CREATE TABLE `customer` (
  `id` int(11) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(250) NOT NULL,
  `phone` varchar(12) DEFAULT NULL,
  `fullname` varchar(100) NOT NULL,
  `birthday` datetime DEFAULT NULL,
  `active` int(11) NOT NULL COMMENT '1: active, 0 : deactivate',
  `userActive` int(11) DEFAULT NULL,
  `createAt` datetime NOT NULL,
  `updateAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Đang đổ dữ liệu cho bảng `customer`
--

INSERT INTO `customer` (`id`, `email`, `password`, `phone`, `fullname`, `birthday`, `active`, `userActive`, `createAt`, `updateAt`) VALUES
(1, 'ldqntkh@gmail.com', '860725c244f7e08d1ff9a60180f87250f1d5833e2f2c11ad3b3757232ed2d867', '', 'Quang Le', NULL, 1, NULL, '2018-06-27 14:55:38', '2018-06-27 14:56:35');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `historyofadmin`
--

CREATE TABLE `historyofadmin` (
  `id` double NOT NULL,
  `historyTypeId` varchar(100) NOT NULL,
  `userId` int(11) NOT NULL,
  `description` text NOT NULL,
  `createAt` datetime NOT NULL,
  `updateAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `historyofcustomer`
--

CREATE TABLE `historyofcustomer` (
  `id` double NOT NULL,
  `customerId` int(11) NOT NULL,
  `userId` int(11) DEFAULT NULL,
  `description` text NOT NULL,
  `createAt` datetime NOT NULL,
  `updateAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Đang đổ dữ liệu cho bảng `historyofcustomer`
--

INSERT INTO `historyofcustomer` (`id`, `customerId`, `userId`, `description`, `createAt`, `updateAt`) VALUES
(1, 1, NULL, 'You have create an order with order id is <a class=\'history\' href=\'/orders/12\'>12</a>', '2018-07-01 07:01:07', '0000-00-00 00:00:00'),
(2, 1, NULL, 'You have successfully paid the order <a class=\'history\' href=\'/orders/12\'>12</a> with a payment code of <a class=\'history\' href=\'/payments/PAY-9KM64010YA588982DLM4HYNQ\'>PAY-9KM64010YA588982DLM4HYNQ</a>', '2018-07-01 07:05:30', '0000-00-00 00:00:00'),
(3, 1, NULL, 'Your order with id <a class=\'history\' href=\'/orders/12\'>12</a> is approved!', '2018-07-01 07:05:30', '0000-00-00 00:00:00'),
(4, 1, NULL, 'You have create an order with order id is <a class=\'history\' href=\'/orders/13\'>13</a>', '2018-07-01 07:55:41', '0000-00-00 00:00:00'),
(5, 1, NULL, 'You have successfully paid the order <a class=\'history\' href=\'/orders/13\'>13</a> with a payment code of <a class=\'history\' href=\'/payments/PAY-3KK482022H263372MLM4IR7Y\'>PAY-3KK482022H263372MLM4IR7Y</a>', '2018-07-01 07:56:24', '0000-00-00 00:00:00'),
(6, 1, NULL, 'Your order with id <a class=\'history\' href=\'/orders/13\'>13</a> is approved!', '2018-07-01 07:56:24', '0000-00-00 00:00:00'),
(7, 1, NULL, 'Your product with id <a class=\'history\' href=\'/product-customer/1\'>1</a> has not been activated. Please click here {1} choose a wallet address and active it.', '2018-07-01 07:56:24', '0000-00-00 00:00:00');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `orders`
--

CREATE TABLE `orders` (
  `id` int(11) NOT NULL,
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
  `updateAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Đang đổ dữ liệu cho bảng `orders`
--

INSERT INTO `orders` (`id`, `customerid`, `productname`, `hashrate`, `quantity`, `description`, `state`, `amount`, `currency`, `product_period`, `createAt`, `updateAt`) VALUES
(10, 1, '1 Mh/s', 0, 1, 'Buy 1 Mh/s with price USD25', 'approved', 25, 'USD', 6, '2018-06-30 14:08:56', '2018-06-30 14:09:20'),
(11, 1, '1 Mh/s', 0, 1, 'Buy 1 Mh/s with price USD25', 'approved', 25, 'USD', 6, '2018-06-30 14:11:44', '2018-06-30 14:12:02'),
(12, 1, '1 Mh/s', 0, 1, 'Buy 1 Mh/s with price USD25', 'approved', 25, 'USD', 6, '2018-07-01 07:01:07', '2018-07-01 07:05:30'),
(13, 1, '1 Mh/s', 1, 1, 'Buy 1 Mh/s with price USD25', 'approved', 25, 'USD', 6, '2018-07-01 07:55:40', '2018-07-01 07:56:24');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `payment_details`
--

CREATE TABLE `payment_details` (
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
  `updateAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Đang đổ dữ liệu cho bảng `payment_details`
--

INSERT INTO `payment_details` (`id`, `orderid`, `payment_method`, `email`, `firstname`, `lastname`, `payerid`, `countrycode`, `state`, `cart`, `createAt`, `updateAt`) VALUES
('PAY-3KK482022H263372MLM4IR7Y', 13, 'paypal', 'ldqpersonal@gmail.com', 'Quang', 'Personal', '33PVS9JYXHMXJ', 'US', 'approved', '455981761R1777446', '2018-07-01 07:56:24', '0000-00-00 00:00:00'),
('PAY-5PW31021N93391406LM3Y7JA', 11, 'paypal', 'ldqpersonal@gmail.com', 'Quang', 'Personal', '33PVS9JYXHMXJ', 'US', 'approved', '1Y850279PW274101G', '2018-06-30 14:12:02', '0000-00-00 00:00:00'),
('PAY-82609808TX975034NLM3Y56Y', 10, 'paypal', 'ldqpersonal@gmail.com', 'Quang', 'Personal', '33PVS9JYXHMXJ', 'US', 'approved', '95978403XN3329504', '2018-06-30 14:09:20', '0000-00-00 00:00:00'),
('PAY-9KM64010YA588982DLM4HYNQ', 12, 'paypal', 'ldqpersonal@gmail.com', 'Quang', 'Personal', '33PVS9JYXHMXJ', 'US', 'approved', '73A797934T2928347', '2018-07-01 07:05:29', '0000-00-00 00:00:00');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `product`
--

CREATE TABLE `product` (
  `id` int(11) NOT NULL,
  `name` varchar(150) NOT NULL,
  `sku` varchar(50) NOT NULL,
  `hashrate` float NOT NULL,
  `price` float NOT NULL,
  `currency` varchar(10) NOT NULL,
  `sale_price` float DEFAULT NULL,
  `symbol_currency` varchar(10) NOT NULL,
  `desc1` text NOT NULL,
  `desc2` text,
  `desc3` text,
  `period` int(11) NOT NULL DEFAULT '6' COMMENT 'số tháng, mặc định là 6',
  `enable` tinyint(1) NOT NULL DEFAULT '1',
  `userUpdate` int(11) NOT NULL,
  `createAt` datetime NOT NULL,
  `updateAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Đang đổ dữ liệu cho bảng `product`
--

INSERT INTO `product` (`id`, `name`, `sku`, `hashrate`, `price`, `currency`, `sale_price`, `symbol_currency`, `desc1`, `desc2`, `desc3`, `period`, `enable`, `userUpdate`, `createAt`, `updateAt`) VALUES
(1, '1 Mh/s', '001', 1, 25, 'USD', NULL, '$', 'Start your mining operation', 'Join Profitable Pool\r\n', 'No Electricity Charge (Auto Deducted from Pool)', 6, 1, 1, '2018-06-27 00:00:00', '2018-06-27 00:00:00'),
(2, '5 Mh/s', '002', 5, 120, 'USD', 110, '$', 'Start your mining operation', 'Join Profitable Pool\r\n', 'No Electricity Charge (Auto Deducted from Pool)', 6, 1, 1, '2018-06-27 00:00:00', '2018-06-27 00:00:00'),
(3, '10 Mh/s', '003', 10, 200, 'USD', NULL, '$', 'Start your mining operation', 'Join Profitable Pool\r\n', 'No Electricity Charge (Auto Deducted from Pool)', 6, 1, 1, '2018-06-27 00:00:00', '2018-06-27 00:00:00'),
(4, '20 Mh/s', '004', 20, 400, 'USD', NULL, '$', 'Start your mining operation', 'Join Profitable Pool\r\n', 'No Electricity Charge (Auto Deducted from Pool)', 6, 1, 1, '2018-06-27 00:00:00', '2018-06-27 00:00:00');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `productofcustomer`
--

CREATE TABLE `productofcustomer` (
  `id` int(11) NOT NULL,
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
  `updateAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Đang đổ dữ liệu cho bảng `productofcustomer`
--

INSERT INTO `productofcustomer` (`id`, `name`, `hashrate`, `customerId`, `walletId`, `active`, `expired`, `period`, `userUpdate`, `startDate`, `endDate`, `createAt`, `updateAt`) VALUES
(1, '1 Mh/s', 1, 1, 1, 1, 0, 6, NULL, NULL, NULL, '2018-07-01 07:56:24', '0000-00-00 00:00:00');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `username` varchar(100) NOT NULL COMMENT 'user name',
  `password` varchar(250) NOT NULL,
  `fullname` varchar(100) NOT NULL,
  `userTypeId` int(11) NOT NULL,
  `email` varchar(100) NOT NULL,
  `phone` varchar(11) DEFAULT NULL,
  `createAt` datetime NOT NULL,
  `updateAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Đang đổ dữ liệu cho bảng `user`
--

INSERT INTO `user` (`id`, `username`, `password`, `fullname`, `userTypeId`, `email`, `phone`, `createAt`, `updateAt`) VALUES
(1, 'admin', 'Admin@1234', 'Admin', 1, 'quang.le@bluecomgroup.com', NULL, '2018-06-27 00:00:00', '2018-06-27 00:00:00');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `useraccessfunction`
--

CREATE TABLE `useraccessfunction` (
  `id` int(11) NOT NULL,
  `userTypeId` int(11) NOT NULL,
  `accessFuncId` int(11) NOT NULL,
  `createAt` datetime NOT NULL,
  `updateAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `usertype`
--

CREATE TABLE `usertype` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `description` varchar(250) DEFAULT NULL,
  `createAt` datetime NOT NULL,
  `updateAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Đang đổ dữ liệu cho bảng `usertype`
--

INSERT INTO `usertype` (`id`, `name`, `description`, `createAt`, `updateAt`) VALUES
(1, 'admin', 'Admin', '2018-06-27 00:00:00', '2018-06-27 00:00:00');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `wallet`
--

CREATE TABLE `wallet` (
  `id` int(11) NOT NULL,
  `walletAddress` varchar(250) NOT NULL,
  `walletName` varchar(250) NOT NULL,
  `walletTypeId` int(11) NOT NULL,
  `CustomerId` int(11) NOT NULL,
  `createAt` datetime NOT NULL,
  `updateAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Đang đổ dữ liệu cho bảng `wallet`
--

INSERT INTO `wallet` (`id`, `walletAddress`, `walletName`, `walletTypeId`, `CustomerId`, `createAt`, `updateAt`) VALUES
(1, '0xf8C10041AA116d60358af0a76712efF0FE642455', 'test', 1, 1, '2018-07-03 00:00:00', '2018-07-03 00:00:00'),
(2, '0xf8C10041AA116d60358af0a76712efF0FE642456', 'ahuahuahua', 1, 2, '2018-07-03 16:14:15', '2018-07-03 16:14:15'),
(4, '0xf8C10041AA116d60358af0a76712efF0FE642457', 'test01', 1, 3, '2018-07-03 16:15:35', '2018-07-03 16:15:35'),
(4, '0xf8C10041AA116d60358af0a76712efF0FE642457', 'test01', 1, 3, '2018-07-03 16:15:35', '2018-07-03 16:15:35'),
(4, '0xf8C10041AA116d60358af0a76712efF0FE642457', 'test01', 1, 3, '2018-07-03 16:15:35', '2018-07-03 16:15:35'),
(4, '0xf8C10041AA116d60358af0a76712efF0FE642457', 'test01', 1, 3, '2018-07-03 16:15:35', '2018-07-03 16:15:35');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `walletbalance`
--

CREATE TABLE `walletbalance` (
  `id` int(11) NOT NULL,
  `walletId` int(11) NOT NULL,
  `balance` float NOT NULL DEFAULT '0',
  `userUpdate` int(11) DEFAULT NULL,
  `createAt` datetime NOT NULL,
  `updateAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Đang đổ dữ liệu cho bảng `walletbalance`
--

INSERT INTO `walletbalance` (`id`, `walletId`, `balance`, `userUpdate`, `createAt`, `updateAt`) VALUES
(1, 1, 10.5, NULL, '2018-07-07 00:00:00', '2018-07-07 00:00:00');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `wallettype`
--

CREATE TABLE `wallettype` (
  `id` int(11) NOT NULL,
  `type` varchar(100) NOT NULL,
  `name` varchar(100) NOT NULL,
  `userUpdate` int(11) DEFAULT NULL,
  `createAt` datetime NOT NULL,
  `updateAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Đang đổ dữ liệu cho bảng `wallettype`
--

INSERT INTO `wallettype` (`id`, `type`, `name`, `userUpdate`, `createAt`, `updateAt`) VALUES
(1, 'eth', 'Ethereum', 1, '2018-07-03 00:00:00', '2018-07-03 00:00:00');

--
-- Chỉ mục cho các bảng đã đổ
--

--
-- Chỉ mục cho bảng `accessfunction`
--
ALTER TABLE `accessfunction`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id` (`id`),
  ADD KEY `id_2` (`id`);

--
-- Chỉ mục cho bảng `customer`
--
ALTER TABLE `customer`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id` (`id`),
  ADD KEY `id_2` (`id`),
  ADD KEY `userActive` (`userActive`);

--
-- Chỉ mục cho bảng `historyofadmin`
--
ALTER TABLE `historyofadmin`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `userId` (`userId`),
  ADD KEY `historyTypeId` (`historyTypeId`),
  ADD KEY `id` (`id`);

--
-- Chỉ mục cho bảng `historyofcustomer`
--
ALTER TABLE `historyofcustomer`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id_2` (`id`),
  ADD KEY `id` (`id`),
  ADD KEY `customerId` (`customerId`),
  ADD KEY `userId` (`userId`);

--
-- Chỉ mục cho bảng `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id` (`id`),
  ADD KEY `customerid` (`customerid`);

--
-- Chỉ mục cho bảng `payment_details`
--
ALTER TABLE `payment_details`
  ADD PRIMARY KEY (`id`),
  ADD KEY `orderid` (`orderid`),
  ADD KEY `id` (`id`);

--
-- Chỉ mục cho bảng `product`
--
ALTER TABLE `product`
  ADD PRIMARY KEY (`id`),
  ADD KEY `userUpdate` (`userUpdate`),
  ADD KEY `id` (`id`);

--
-- Chỉ mục cho bảng `productofcustomer`
--
ALTER TABLE `productofcustomer`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id_2` (`id`),
  ADD KEY `id` (`id`),
  ADD KEY `customerId` (`customerId`),
  ADD KEY `walletId` (`walletId`),
  ADD KEY `userUpdate` (`userUpdate`);

--
-- Chỉ mục cho bảng `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id` (`id`),
  ADD KEY `userTypeId` (`userTypeId`),
  ADD KEY `id_2` (`id`);

--
-- Chỉ mục cho bảng `useraccessfunction`
--
ALTER TABLE `useraccessfunction`
  ADD PRIMARY KEY (`id`),
  ADD KEY `userTypeId` (`userTypeId`),
  ADD KEY `accessFuncId` (`accessFuncId`);

--
-- Chỉ mục cho bảng `usertype`
--
ALTER TABLE `usertype`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id_2` (`id`),
  ADD KEY `id` (`id`);

--
-- Chỉ mục cho bảng `wallet`
--
ALTER TABLE `wallet`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `walletAddress` (`walletAddress`),
  ADD KEY `id` (`id`),
  ADD KEY `CustomerId` (`CustomerId`),
  ADD KEY `walletTypeId` (`walletTypeId`);

--
-- Chỉ mục cho bảng `walletbalance`
--
ALTER TABLE `walletbalance`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id` (`id`),
  ADD UNIQUE KEY `walletAddress_2` (`walletId`),
  ADD KEY `id_2` (`id`),
  ADD KEY `userUpdate` (`userUpdate`);

--
-- Chỉ mục cho bảng `wallettype`
--
ALTER TABLE `wallettype`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id_2` (`id`),
  ADD KEY `id` (`id`),
  ADD KEY `userUpdate` (`userUpdate`),
  ADD KEY `id_3` (`id`);

--
-- AUTO_INCREMENT cho các bảng đã đổ
--

--
-- AUTO_INCREMENT cho bảng `accessfunction`
--
ALTER TABLE `accessfunction`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT cho bảng `customer`
--
ALTER TABLE `customer`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT cho bảng `historyofadmin`
--
ALTER TABLE `historyofadmin`
  MODIFY `id` double NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT cho bảng `historyofcustomer`
--
ALTER TABLE `historyofcustomer`
  MODIFY `id` double NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;
--
-- AUTO_INCREMENT cho bảng `orders`
--
ALTER TABLE `orders`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;
--
-- AUTO_INCREMENT cho bảng `product`
--
ALTER TABLE `product`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
--
-- AUTO_INCREMENT cho bảng `productofcustomer`
--
ALTER TABLE `productofcustomer`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT cho bảng `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT cho bảng `useraccessfunction`
--
ALTER TABLE `useraccessfunction`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT cho bảng `usertype`
--
ALTER TABLE `usertype`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT cho bảng `wallet`
--
ALTER TABLE `wallet`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
--
-- AUTO_INCREMENT cho bảng `walletbalance`
--
ALTER TABLE `walletbalance`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT cho bảng `wallettype`
--
ALTER TABLE `wallettype`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- Các ràng buộc cho các bảng đã đổ
--

--
-- Các ràng buộc cho bảng `customer`
--
ALTER TABLE `customer`
  ADD CONSTRAINT `customer_ibfk_1` FOREIGN KEY (`userActive`) REFERENCES `user` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Các ràng buộc cho bảng `historyofadmin`
--
ALTER TABLE `historyofadmin`
  ADD CONSTRAINT `historyofadmin_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Các ràng buộc cho bảng `historyofcustomer`
--
ALTER TABLE `historyofcustomer`
  ADD CONSTRAINT `historyofcustomer_ibfk_1` FOREIGN KEY (`customerId`) REFERENCES `customer` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `historyofcustomer_ibfk_3` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Các ràng buộc cho bảng `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`customerid`) REFERENCES `customer` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Các ràng buộc cho bảng `payment_details`
--
ALTER TABLE `payment_details`
  ADD CONSTRAINT `payment_details_ibfk_1` FOREIGN KEY (`orderid`) REFERENCES `orders` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Các ràng buộc cho bảng `product`
--
ALTER TABLE `product`
  ADD CONSTRAINT `to_tb_user` FOREIGN KEY (`userUpdate`) REFERENCES `user` (`id`);

--
-- Các ràng buộc cho bảng `productofcustomer`
--
ALTER TABLE `productofcustomer`
  ADD CONSTRAINT `productofcustomer_ibfk_1` FOREIGN KEY (`walletId`) REFERENCES `wallet` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `productofcustomer_ibfk_2` FOREIGN KEY (`userUpdate`) REFERENCES `user` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `productofcustomer_ibfk_3` FOREIGN KEY (`customerId`) REFERENCES `customer` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Các ràng buộc cho bảng `user`
--
ALTER TABLE `user`
  ADD CONSTRAINT `user_ibfk_1` FOREIGN KEY (`userTypeId`) REFERENCES `usertype` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Các ràng buộc cho bảng `useraccessfunction`
--
ALTER TABLE `useraccessfunction`
  ADD CONSTRAINT `useraccessfunction_ibfk_1` FOREIGN KEY (`userTypeId`) REFERENCES `usertype` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `useraccessfunction_ibfk_2` FOREIGN KEY (`accessFuncId`) REFERENCES `accessfunction` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Các ràng buộc cho bảng `wallet`
--
ALTER TABLE `wallet`
  ADD CONSTRAINT `wallet_ibfk_1` FOREIGN KEY (`CustomerId`) REFERENCES `customer` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `wallet_ibfk_2` FOREIGN KEY (`walletTypeId`) REFERENCES `wallettype` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Các ràng buộc cho bảng `walletbalance`
--
ALTER TABLE `walletbalance`
  ADD CONSTRAINT `walletbalance_ibfk_1` FOREIGN KEY (`walletId`) REFERENCES `wallet` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `walletbalance_ibfk_2` FOREIGN KEY (`userUpdate`) REFERENCES `user` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Các ràng buộc cho bảng `wallettype`
--
ALTER TABLE `wallettype`
  ADD CONSTRAINT `wallettype_ibfk_1` FOREIGN KEY (`userUpdate`) REFERENCES `user` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
