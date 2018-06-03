-- phpMyAdmin SQL Dump
-- version 4.7.0
-- https://www.phpmyadmin.net/
--
-- Máy chủ: 127.0.0.1
-- Thời gian đã tạo: Th3 22, 2018 lúc 04:06 PM
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
-- Cơ sở dữ liệu: `mybitboxtest`
--

-- --------------------------------------------------------

--
-- Table structure for table `pool`
--

CREATE TABLE `pool` (
  `poolservice` varchar(255) NOT NULL,
  `poolname` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `promotion`
--

CREATE TABLE `promotion` (
  `promotionid` varchar(255) NOT NULL,
  `userid` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `imageurl` varchar(255) NOT NULL,
  `weburl` varchar(255) NOT NULL,
  `description` varchar(255) NOT NULL,
  `active` int(11) NOT NULL,
  `enddate` timestamp NOT NULL,
  `lastupdate` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `support`
--

CREATE TABLE `support` (
  `supportid` int(11) NOT NULL,
  `userIdRq` int(11) NOT NULL COMMENT 'user request support',
  `timeContact` datetime NOT NULL,
  `supportStatus` int(11) NOT NULL COMMENT '0: 1',
  `userIdSp` int(11) NOT NULL COMMENT 'user id support',
  `timeSupport` datetime NOT NULL,
  `lastupdate` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `supportcontent`
--

CREATE TABLE `supportcontent` (
  `supportcontentid` varchar(200) NOT NULL,
  `supportId` int(11) NOT NULL,
  `type` int(11) NOT NULL COMMENT '1 client, 0 user',
  `typeRequest` int(11) NOT NULL COMMENT '1: image, 0 text',
  `content` text NOT NULL,
  `lastupdate` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `user`
--

CREATE TABLE `user` (
  `userid` int(11) NOT NULL,
  `email` varchar(100) NOT NULL,
  `phone` varchar(15) NOT NULL,
  `password` varchar(255) NOT NULL COMMENT 'mã hóa passwod',
  `fullname` varchar(100) NOT NULL,
  `level` int(11) NOT NULL DEFAULT '1' COMMENT '0: admin, 1: client, 2: user support',
  `active` int(11) NOT NULL DEFAULT '1',
  `token` varchar(255) NOT NULL,
  `lastupdate` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Đang đổ dữ liệu cho bảng `user`
--

INSERT INTO `user` (`userid`, `email`, `phone`, `password`, `fullname`, `level`, `active`, `lastupdate`) VALUES
(1, 'test@mail.com', '0123456789', '55dc87c47427', 'Quang Le', 0, 1, '2018-03-22 14:40:24');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `wallet`
--

CREATE TABLE `wallet` (
  `id` int(11) NOT NULL,
  `walletid` varchar(255) NOT NULL,
  `userid` int(11) NOT NULL,
  `wallettypeid` int(11) NOT NULL,
  `poolservice` varchar(255) NOT NULL,
  `name` varchar(250) NOT NULL,
  `lastupdate` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `wallettype`
--

CREATE TABLE `wallettype` (
  `wallettypeid` int(11) NOT NULL,
  `name` varchar(200) NOT NULL,
  `symbol` varchar(255) NOT NULL,
  `urlbalance` text NOT NULL,
  `urltotalcoin` text NOT NULL,
  `urlearning` text NOT NULL,
  `lastupdate` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `worker`
--

CREATE TABLE `worker` (
  `workerid` varchar(200) NOT NULL,
  `walletId` varchar(255) NOT NULL,
  `name` varchar(200) NOT NULL,
  `totalhash` float NOT NULL,
  `lastupdate` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `workerdetail`
--

CREATE TABLE `workerdetail` (
  `workerid` varchar(200) NOT NULL,
  `gpu` int(11) NOT NULL,
  `temp` int(11) NOT NULL,
  `fan` int(11) NOT NULL,
  `hashrate` int(11) NOT NULL,
  `lastupdate` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Chỉ mục cho các bảng đã đổ
--

--
-- Chỉ mục cho bảng `pool`
--
ALTER TABLE `pool`
  ADD PRIMARY KEY (`poolservice`);

--
-- Chỉ mục cho bảng `support`
--
ALTER TABLE `support`
  ADD PRIMARY KEY (`supportid`),
  ADD KEY `to_tb_user_rpsp` (`userIdRq`),
  ADD KEY `to_tb_user_rprq` (`userIdSp`);

--
-- Chỉ mục cho bảng `supportcontent`
--
ALTER TABLE `supportcontent`
  ADD PRIMARY KEY (`supportcontentid`),
  ADD KEY `to_tb_support` (`supportId`);

--
-- Chỉ mục cho bảng `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`userid`),
  ADD KEY `userid` (`userid`),
  ADD KEY `userid_2` (`userid`);

--
-- Chỉ mục cho bảng `wallet`
--
ALTER TABLE `wallet`
  ADD PRIMARY KEY (`id`),
  ADD KEY `to_tb_user` (`userid`),
  ADD KEY `to_tb_wallettype` (`wallettypeid`),
  ADD KEY `poolservice` (`poolservice`),
  ADD KEY `walletid` (`walletid`);
--
-- Chỉ mục cho bảng `wallettype`
--
ALTER TABLE `wallettype`
  ADD PRIMARY KEY (`wallettypeid`),
  ADD UNIQUE KEY `wallettypeid` (`wallettypeid`),
  ADD KEY `wallettypeid_2` (`wallettypeid`);

--
-- Chỉ mục cho bảng `worker`
--
ALTER TABLE `worker`
  ADD PRIMARY KEY (`workerid`),
  ADD UNIQUE KEY `workerid` (`workerid`),
  ADD KEY `to_tb_wallet` (`walletId`);

--
-- Chỉ mục cho bảng `workerdetail`
--
ALTER TABLE `workerdetail`
  ADD KEY `to_tb_worker` (`workerid`);

--
-- AUTO_INCREMENT cho các bảng đã đổ
--

--
-- AUTO_INCREMENT cho bảng `support`
--
ALTER TABLE `support`
  MODIFY `supportid` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT cho bảng `user`
--
ALTER TABLE `user`
  MODIFY `userid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
  --
-- AUTO_INCREMENT for table `wallet`
--
ALTER TABLE `wallet`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT cho bảng `wallettype`
--
ALTER TABLE `wallettype`
  MODIFY `wallettypeid` int(11) NOT NULL AUTO_INCREMENT;
--
-- Các ràng buộc cho các bảng đã đổ
--

--
-- Các ràng buộc cho bảng `support`
--
ALTER TABLE `support`
  ADD CONSTRAINT `to_tb_user_rprq` FOREIGN KEY (`userIdSp`) REFERENCES `user` (`userid`),
  ADD CONSTRAINT `to_tb_user_rpsp` FOREIGN KEY (`userIdRq`) REFERENCES `user` (`userid`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Các ràng buộc cho bảng `supportcontent`
--
ALTER TABLE `supportcontent`
  ADD CONSTRAINT `to_tb_support` FOREIGN KEY (`supportId`) REFERENCES `support` (`supportid`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Các ràng buộc cho bảng `wallet`
--
ALTER TABLE `wallet`
  ADD CONSTRAINT `to_tb_pool` FOREIGN KEY (`poolservice`) REFERENCES `pool` (`poolservice`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `to_tb_user` FOREIGN KEY (`userid`) REFERENCES `user` (`userid`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `to_tb_wallettype` FOREIGN KEY (`wallettypeid`) REFERENCES `wallettype` (`wallettypeid`);

--
-- Các ràng buộc cho bảng `worker`
--
ALTER TABLE `worker`
  ADD CONSTRAINT `to_tb_wallet` FOREIGN KEY (`walletId`) REFERENCES `wallet` (`walletid`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Các ràng buộc cho bảng `workerdetail`
--
ALTER TABLE `workerdetail`
  ADD CONSTRAINT `to_tb_worker` FOREIGN KEY (`workerid`) REFERENCES `worker` (`workerid`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
