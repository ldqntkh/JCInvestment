-- phpMyAdmin SQL Dump
-- version 4.7.7
-- https://www.phpmyadmin.net/
--
-- Máy chủ: localhost:8889
-- Thời gian đã tạo: Th8 13, 2018 lúc 11:41 PM
-- Phiên bản máy phục vụ: 5.6.35
-- Phiên bản PHP: 7.1.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";

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
(1, 'ldqntkh@gmail.com', '860725c244f7e08d1ff9a60180f87250f1d5833e2f2c11ad3b3757232ed2d867', '', 'Quang Le', NULL, 1, NULL, '2018-06-27 14:55:38', '2018-06-27 14:56:35'),
(4, 'phatlonely@gmail.com', '860725c244f7e08d1ff9a60180f87250f1d5833e2f2c11ad3b3757232ed2d867', '', 'Phat Le', NULL, 1, NULL, '2018-07-16 08:43:10', '2018-07-16 08:43:34'),
(5, 'tester04@gmail.com', '21691c110201ab5b9e5275ea0d21b199e807a30cfff989e9ebaf70ae28d3992d', '', 'tester04', NULL, 0, NULL, '2018-07-20 07:29:57', '0000-00-00 00:00:00');

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
  `updateAt` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Đang đổ dữ liệu cho bảng `historyofcustomer`
--

INSERT INTO `historyofcustomer` (`id`, `customerId`, `userId`, `description`, `createAt`, `updateAt`) VALUES
(1, 1, NULL, 'Your wallet balance is changed to 0.004077125262721613 ETH', '2018-07-30 17:00:01', NULL),
(2, 1, NULL, 'Your wallet balance is changed to 0.00828231079225724 ETH', '2018-07-31 17:00:01', NULL),
(3, 1, NULL, 'You have create an order with order id is <a class=\'history\' href=\'/my-order/1/detail\'>1</a>', '2018-08-03 01:12:43', NULL),
(4, 1, NULL, 'You have create an order with order id is <a class=\'history\' href=\'/my-order/2/detail\'>2</a>', '2018-08-03 01:15:12', NULL),
(5, 1, NULL, 'You have create an order with order id is <a class=\'history\' href=\'/my-order/3/detail\'>3</a>', '2018-08-03 01:34:08', NULL),
(6, 1, NULL, 'You have create an order with order id is <a class=\'history\' href=\'/my-order/4/detail\'>4</a>', '2018-08-03 01:35:53', NULL),
(7, 1, NULL, 'You have create an order with order id is <a class=\'history\' href=\'/my-order/5/detail\'>5</a>', '2018-08-03 01:38:19', NULL),
(8, 1, NULL, 'You have create an order with order id is <a class=\'history\' href=\'/my-order/6/detail\'>6</a>', '2018-08-03 01:39:57', NULL),
(9, 1, NULL, 'You have create an order with order id is <a class=\'history\' href=\'/my-order/7/detail\'>7</a>', '2018-08-03 01:44:26', NULL),
(10, 1, NULL, 'You have create an order with order id is <a class=\'history\' href=\'/my-order/8/detail\'>8</a>', '2018-08-03 01:45:30', NULL),
(11, 1, NULL, 'You have successfully paid the order <a class=\'history\' href=\'/my-order/8/detail\'>PAY-0W218336N5716723WLNR3HPA</a> with a payment code of <a class=\'history\' href=\'/my-order/8/detail\'>8</a>', '2018-08-03 01:45:52', NULL),
(12, 1, NULL, 'Your order with id <a class=\'history\' href=\'/my-order/8/detail\'>8</a> is approved!', '2018-08-03 01:45:52', NULL),
(13, 1, NULL, 'Your product with id <a class=\'history\' href=\'/my-product/3\'>3</a> has not been activated. Please click <a class=\'history\' href=\'/my-product/3\'>here</a> choose a wallet address and active it.', '2018-08-03 01:45:52', NULL),
(14, 1, NULL, 'Your wallet balance is changed to 0.06865216943087746 ETH', '2018-08-08 13:54:14', NULL),
(15, 1, NULL, 'Your wallet balance is changed to 0.12898883272195932 ETH', '2018-08-08 13:57:38', NULL),
(16, 1, NULL, 'Your wallet balance is changed to 0.0686229754720679 ETH', '2018-08-08 14:01:30', NULL),
(17, 1, NULL, 'Your wallet balance is changed to 0.007784054113976625 ETH', '2018-08-08 14:12:41', NULL),
(18, 1, NULL, 'Your wallet balance is changed to 0.9469410541139766 ETH', '2018-08-08 14:14:46', NULL),
(19, 1, NULL, 'Your wallet balance is changed to 0.8859597577253169 ETH', '2018-08-08 14:16:07', NULL),
(20, 1, NULL, 'Your wallet balance is changed to 0.8249787577253168 ETH', '2018-08-08 14:17:23', NULL),
(21, 1, NULL, 'You have paid this month\'s maintenance fee of 0.06098124227468318 ETH', '2018-08-08 14:17:23', NULL);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `locale`
--

CREATE TABLE `locale` (
  `id` varchar(50) NOT NULL,
  `name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Đang đổ dữ liệu cho bảng `locale`
--

INSERT INTO `locale` (`id`, `name`) VALUES
('de', 'Denmark'),
('en', 'English'),
('vi', 'Viet Nam');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `maintenance_fee`
--

CREATE TABLE `maintenance_fee` (
  `id` int(11) NOT NULL,
  `customerId` int(11) NOT NULL,
  `maturity` datetime DEFAULT NULL COMMENT 'hạn thanh toán',
  `payment_amount` float DEFAULT NULL COMMENT 'số tiền thanh toán',
  `currency` varchar(20) NOT NULL,
  `symbol_currency` varchar(5) NOT NULL,
  `status` tinyint(1) NOT NULL DEFAULT '0' COMMENT 'trạng thái thanh toán',
  `payment_method` varchar(100) DEFAULT NULL,
  `payment_desc` text,
  `createAt` datetime DEFAULT NULL,
  `updateAt` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Đang đổ dữ liệu cho bảng `maintenance_fee`
--

INSERT INTO `maintenance_fee` (`id`, `customerId`, `maturity`, `payment_amount`, `currency`, `symbol_currency`, `status`, `payment_method`, `payment_desc`, `createAt`, `updateAt`) VALUES
(1, 1, '2018-08-09 00:00:00', 22.17, 'USD', '$', 1, 'ETH', NULL, '2018-08-02 12:21:47', '2018-08-08 14:17:23'),
(2, 1, '2018-08-20 00:00:00', 37.75, 'USD', '$', 0, NULL, NULL, '2018-08-13 15:16:32', NULL);

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
  `updateAt` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Đang đổ dữ liệu cho bảng `orders`
--

INSERT INTO `orders` (`id`, `customerid`, `productname`, `hashrate`, `quantity`, `description`, `state`, `amount`, `currency`, `product_period`, `createAt`, `updateAt`) VALUES
(1, 1, '10 Mh/s', 10, 1, 'Buy 10 Mh/s with price USD190', 'create', 190, 'USD', 24, '2018-08-03 01:12:43', NULL),
(2, 1, '10 Mh/s', 10, 1, 'Buy 10 Mh/s with price USD190', 'create', 190, 'USD', 24, '2018-08-03 01:15:12', NULL),
(3, 1, '10 Mh/s', 10, 1, 'Buy 10 Mh/s with price USD190', 'create', 190, 'USD', 24, '2018-08-03 01:34:08', NULL),
(4, 1, '10 Mh/s', 10, 1, 'Buy 10 Mh/s with price USD190', 'create', 190, 'USD', 24, '2018-08-03 01:35:53', NULL),
(5, 1, '10 Mh/s', 10, 1, 'Buy 10 Mh/s with price USD190', 'create', 190, 'USD', 24, '2018-08-03 01:38:19', NULL),
(6, 1, '10 Mh/s', 10, 1, 'Buy 10 Mh/s with price USD190', 'create', 190, 'USD', 24, '2018-08-03 01:39:57', NULL),
(7, 1, '10 Mh/s', 10, 1, 'Buy 10 Mh/s with price USD190', 'create', 190, 'USD', 24, '2018-08-03 01:44:26', NULL),
(8, 1, '10 Mh/s', 10, 1, 'Buy 10 Mh/s with price USD190', 'approved', 190, 'USD', 24, '2018-08-03 01:45:30', '2018-08-03 01:45:52');

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
  `updateAt` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Đang đổ dữ liệu cho bảng `payment_details`
--

INSERT INTO `payment_details` (`id`, `orderid`, `payment_method`, `email`, `firstname`, `lastname`, `payerid`, `countrycode`, `state`, `cart`, `createAt`, `updateAt`) VALUES
('PAY-0W218336N5716723WLNR3HPA', 8, 'paypal', 'ldqpersonal@gmail.com', 'Quang', 'Personal', '33PVS9JYXHMXJ', 'US', 'approved', '74302990FH207291M', '2018-08-03 01:45:52', NULL);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `pricebook`
--

CREATE TABLE `pricebook` (
  `id` int(50) NOT NULL,
  `localeId` varchar(50) NOT NULL,
  `productId` int(50) NOT NULL,
  `name` varchar(255) NOT NULL,
  `price` float NOT NULL,
  `sale_price` float NOT NULL,
  `maintenance_fee` float NOT NULL DEFAULT '0',
  `currency` varchar(255) NOT NULL,
  `symbol_currency` varchar(10) NOT NULL,
  `desc1` text NOT NULL,
  `desc2` text NOT NULL,
  `desc3` text NOT NULL,
  `enable` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Đang đổ dữ liệu cho bảng `pricebook`
--

INSERT INTO `pricebook` (`id`, `localeId`, `productId`, `name`, `price`, `sale_price`, `maintenance_fee`, `currency`, `symbol_currency`, `desc1`, `desc2`, `desc3`, `enable`) VALUES
(1, 'en', 1, '10 Mh/s', 350, 330, 0, 'USD', '$', 'To start mining Ethereum.', 'Earn your profit per day.', 'Included maintenance fee.', 1),
(2, 'en', 2, '50 Mh/s', 1700, 1600, 0, 'USD', '$', 'To start mining Ethereum.', 'Earn your profit per day.', 'Included maintenance fee.', 1),
(3, 'en', 3, '100 Mh/s', 3200, 3000, 0, 'USD', '$', 'To start mining Ethereum.', 'Earn your profit per day.', 'Included maintenance fee.', 1),
(4, 'en', 4, '10 Mh/s', 200, 190, 7.5, 'USD', '$', 'To start mining Ethereum.', 'Earn your profit per day.', 'Not included maintenance fee.', 1),
(5, 'en', 5, '50 Mh/s', 1000, 900, 35, 'USD', '$', 'To start mining Ethereum.', 'Earn your profit per day.', 'Not included maintenance fee.', 1),
(6, 'en', 6, '100 Mh/s', 1700, 1600, 65, 'USD', '$', 'To start mining Ethereum.', 'Earn your profit per day.', 'Not included maintenance fee.', 1);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `product`
--

CREATE TABLE `product` (
  `id` int(11) NOT NULL,
  `sku` varchar(50) NOT NULL,
  `hashrate` float NOT NULL,
  `period` int(11) NOT NULL DEFAULT '24' COMMENT 'số tháng, mặc định là 24',
  `userUpdate` int(11) NOT NULL,
  `createAt` datetime NOT NULL,
  `updateAt` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Đang đổ dữ liệu cho bảng `product`
--

INSERT INTO `product` (`id`, `sku`, `hashrate`, `period`, `userUpdate`, `createAt`, `updateAt`) VALUES
(1, '1532353550', 10, 24, 1, '2018-07-23 13:46:35', NULL),
(2, '1532353597', 50, 24, 1, '2018-07-23 13:47:14', '2018-07-30 03:55:56'),
(3, '1532353638', 100, 24, 1, '2018-07-23 13:47:47', '2018-07-30 03:56:48'),
(4, '1532353668', 10, 24, 1, '2018-07-23 13:48:18', '2018-07-30 03:57:39'),
(5, 'sku005', 50, 24, 1, '2018-07-29 00:00:00', '2018-07-30 03:58:20'),
(6, 'sku006', 100, 24, 1, '2018-07-29 00:00:00', NULL);

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
  `maintenance_fee` float NOT NULL,
  `userUpdate` int(11) DEFAULT NULL,
  `startDate` datetime DEFAULT NULL,
  `endDate` datetime DEFAULT NULL,
  `createAt` datetime NOT NULL,
  `updateAt` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Đang đổ dữ liệu cho bảng `productofcustomer`
--

INSERT INTO `productofcustomer` (`id`, `name`, `hashrate`, `customerId`, `walletId`, `active`, `expired`, `period`, `maintenance_fee`, `userUpdate`, `startDate`, `endDate`, `createAt`, `updateAt`) VALUES
(1, '10 Mh/s', 10, 1, 5, 1, 0, 24, 0, NULL, '2018-07-15 00:00:00', NULL, '2018-07-29 00:00:00', NULL),
(2, '50 Mh/s', 50, 1, 5, 1, 0, 24, 35, 1, '2018-07-15 00:00:00', NULL, '2018-07-29 00:00:00', NULL),
(3, '10 Mh/s', 10, 1, 5, 1, 0, 24, 7.5, NULL, '2018-08-03 01:46:32', '2020-08-03 01:46:32', '2018-08-03 01:45:52', '2020-08-03 01:46:32');

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
(1, 'admin', '860725c244f7e08d1ff9a60180f87250f1d5833e2f2c11ad3b3757232ed2d867', 'Admin', 1, 'quang.le@bluecomgroup.com', NULL, '2018-06-27 00:00:00', '2018-06-27 00:00:00');

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
(5, 'wallet 1', 'wallet 1', 1, 1, '2018-07-23 14:32:12', '2018-07-23 14:32:12');

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
(1, 5, 0.824979, NULL, '2018-07-30 17:00:01', '2018-08-08 14:17:23');

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

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `withdraw_eth`
--

CREATE TABLE `withdraw_eth` (
  `id` int(11) NOT NULL,
  `customerId` int(11) NOT NULL,
  `walletId` int(11) NOT NULL,
  `total_eth` float NOT NULL,
  `description` text,
  `status` int(11) NOT NULL DEFAULT '0' COMMENT 'new: 0, create: 1, approve: 2, done: 3, cancel : 4',
  `createAt` datetime DEFAULT NULL,
  `updateAt` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

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
-- Chỉ mục cho bảng `locale`
--
ALTER TABLE `locale`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `maintenance_fee`
--
ALTER TABLE `maintenance_fee`
  ADD PRIMARY KEY (`id`),
  ADD KEY `customerId` (`customerId`);

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
-- Chỉ mục cho bảng `pricebook`
--
ALTER TABLE `pricebook`
  ADD PRIMARY KEY (`id`),
  ADD KEY `to_tb_locale` (`localeId`),
  ADD KEY `to_tb_product` (`productId`);

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
-- Chỉ mục cho bảng `withdraw_eth`
--
ALTER TABLE `withdraw_eth`
  ADD PRIMARY KEY (`id`),
  ADD KEY `customerId` (`customerId`),
  ADD KEY `walletId` (`walletId`);

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT cho bảng `historyofadmin`
--
ALTER TABLE `historyofadmin`
  MODIFY `id` double NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `historyofcustomer`
--
ALTER TABLE `historyofcustomer`
  MODIFY `id` double NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT cho bảng `maintenance_fee`
--
ALTER TABLE `maintenance_fee`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT cho bảng `orders`
--
ALTER TABLE `orders`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT cho bảng `pricebook`
--
ALTER TABLE `pricebook`
  MODIFY `id` int(50) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT cho bảng `product`
--
ALTER TABLE `product`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT cho bảng `productofcustomer`
--
ALTER TABLE `productofcustomer`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

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
-- AUTO_INCREMENT cho bảng `withdraw_eth`
--
ALTER TABLE `withdraw_eth`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

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
-- Các ràng buộc cho bảng `maintenance_fee`
--
ALTER TABLE `maintenance_fee`
  ADD CONSTRAINT `to_tb_customer_fee` FOREIGN KEY (`customerId`) REFERENCES `customer` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

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
-- Các ràng buộc cho bảng `pricebook`
--
ALTER TABLE `pricebook`
  ADD CONSTRAINT `to_tb_locale` FOREIGN KEY (`localeId`) REFERENCES `locale` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `to_tb_product` FOREIGN KEY (`productId`) REFERENCES `product` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

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

--
-- Các ràng buộc cho bảng `withdraw_eth`
--
ALTER TABLE `withdraw_eth`
  ADD CONSTRAINT `to_tb_customer` FOREIGN KEY (`customerId`) REFERENCES `customer` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `to_tb_wallet` FOREIGN KEY (`walletId`) REFERENCES `wallet` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
