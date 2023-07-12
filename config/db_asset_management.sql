-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 12, 2023 at 02:17 PM
-- Server version: 10.4.24-MariaDB
-- PHP Version: 8.1.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `db_asset_management`
--

-- --------------------------------------------------------

--
-- Table structure for table `assets`
--

CREATE TABLE `assets` (
  `id` int(11) NOT NULL,
  `uuid` varchar(255) NOT NULL,
  `serial_number` varchar(255) NOT NULL,
  `item_name` varchar(255) NOT NULL,
  `item_condition` varchar(255) NOT NULL,
  `status` varchar(255) NOT NULL,
  `image` varchar(255) DEFAULT NULL,
  `url` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `assets`
--

INSERT INTO `assets` (`id`, `uuid`, `serial_number`, `item_name`, `item_condition`, `status`, `image`, `url`, `createdAt`, `updatedAt`) VALUES
(4, '9706a917-bae2-4f99-b185-6c4d8e9d4dcc', 'A', 'asdasdasd', 'Baik', 'Tidak Tersedia', 'aa31d6af74bed774a914253aef8e8819.png', 'http://localhost:5000/images/aa31d6af74bed774a914253aef8e8819.png', '2023-07-10 09:03:42', '2023-07-10 11:12:25'),
(5, 'ba520607-0a5f-4d5f-8c7d-853ed252d1b9', 'L123', 'Lemari', 'Baik', 'Tidak Tersedia', 'aa31d6af74bed774a914253aef8e8819.png', 'http://localhost:5000/images/aa31d6af74bed774a914253aef8e8819.png', '2023-07-10 09:32:02', '2023-07-10 11:14:09');

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

CREATE TABLE `categories` (
  `id` int(11) NOT NULL,
  `uuid` varchar(255) NOT NULL,
  `title` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `loans`
--

CREATE TABLE `loans` (
  `id` int(11) NOT NULL,
  `uuid` varchar(255) NOT NULL,
  `status` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `asset_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `loans`
--

INSERT INTO `loans` (`id`, `uuid`, `status`, `createdAt`, `updatedAt`, `user_id`, `asset_id`) VALUES
(32, 'fc7f67a7-50bc-448c-b69b-0f2e992c9fc0', 'Dipinjamkan', '2023-07-10 11:14:09', '2023-07-10 11:14:09', 6, 5);

-- --------------------------------------------------------

--
-- Table structure for table `sessions`
--

CREATE TABLE `sessions` (
  `sid` varchar(36) NOT NULL,
  `expires` datetime DEFAULT NULL,
  `data` text DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `sessions`
--

INSERT INTO `sessions` (`sid`, `expires`, `data`, `createdAt`, `updatedAt`) VALUES
('0aYoJz1_HTayAu6JHUDoffLTs1SIUClH', '2023-07-11 13:19:12', '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}', '2023-07-10 13:19:12', '2023-07-10 13:19:12'),
('0Tc2YyZW534wBKJUuEfl5hkjJjm0FWbU', '2023-07-11 11:33:22', '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}', '2023-07-10 11:33:22', '2023-07-10 11:33:22'),
('3L_U6tlLb6XLrbUggQH2LQMBWVfpCQBK', '2023-07-11 11:14:31', '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}', '2023-07-10 11:14:31', '2023-07-10 11:14:31'),
('4YatqNqnTSP5EVRMTNZusyMbGoXvIDp9', '2023-07-11 11:09:08', '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}', '2023-07-10 11:09:08', '2023-07-10 11:09:08'),
('5apjP9h1M8-SZ9HujJscDndRaqkQ8n2Y', '2023-07-11 11:14:37', '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}', '2023-07-10 11:14:37', '2023-07-10 11:14:37'),
('5wy-vum58BTvZMlDTZDyaiQs1drA9vxW', '2023-07-11 13:18:58', '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}', '2023-07-10 13:18:58', '2023-07-10 13:18:58'),
('bbevzIX3rruyKPxEM4ULE3DgC_hk_Ran', '2023-07-11 11:14:09', '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}', '2023-07-10 11:14:09', '2023-07-10 11:14:09'),
('BH80ykymDnfWgG60-HipL8mabi2Vhsye', '2023-07-11 10:59:49', '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}', '2023-07-10 10:59:49', '2023-07-10 10:59:49'),
('BuBMPR_qD-80lq6HXrinpJuCphShKji2', '2023-07-11 11:11:06', '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}', '2023-07-10 11:11:06', '2023-07-10 11:11:06'),
('d5WPAoiPgkUve4cneZfdOwgr7ar_iSD9', '2023-07-11 11:35:20', '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}', '2023-07-10 11:35:11', '2023-07-10 11:35:20'),
('e-aZOnNWgGAap0VrxGX91kJDREzC9xtq', '2023-07-11 10:59:55', '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}', '2023-07-10 10:59:55', '2023-07-10 10:59:55'),
('EVcXBgLALTPynVYlOu9FZ9MvJvhiP9Ij', '2023-07-11 10:59:15', '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}', '2023-07-10 10:59:15', '2023-07-10 10:59:15'),
('I6SQEw6ISj8rUwRNqlPPt781D4mZ_eAY', '2023-07-11 11:09:01', '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}', '2023-07-10 11:09:01', '2023-07-10 11:09:01'),
('IX-2tWUjFLcrtH9JFcGihh_44z-GKjbd', '2023-07-11 11:04:57', '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}', '2023-07-10 11:04:57', '2023-07-10 11:04:57'),
('NawBSpSdPv4SKx0tqwDAO_z4O3IThs0z', '2023-07-11 11:04:50', '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}', '2023-07-10 11:04:50', '2023-07-10 11:04:50'),
('Nu3YPTCPmKukYRCgfTUZppmGFLjZBiGZ', '2023-07-11 11:33:16', '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}', '2023-07-10 11:33:16', '2023-07-10 11:33:16'),
('pCKAC_dRYNVXz8TBaNQ56wIheR16HE8Z', '2023-07-11 11:10:11', '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}', '2023-07-10 11:10:11', '2023-07-10 11:10:11'),
('uKNz8eXab3eFPR_WzsZl389-yQnU8vU3', '2023-07-11 11:12:25', '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}', '2023-07-10 11:12:25', '2023-07-10 11:12:25'),
('wmjetc2k3pswCSoTUvuAc-MGBwfsk2g6', '2023-07-11 11:10:24', '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}', '2023-07-10 11:10:24', '2023-07-10 11:10:24'),
('y4pmarvn76JsoTWkkONFJJ1-qjeBpHZF', '2023-07-11 11:37:29', '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}', '2023-07-10 11:37:29', '2023-07-10 11:37:29');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `uuid` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `url` varchar(255) DEFAULT NULL,
  `role` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `uuid`, `name`, `username`, `password`, `image`, `url`, `role`, `createdAt`, `updatedAt`) VALUES
(2, '4d252e6a-4140-4e07-ab01-74e18d1ca019', 'admin', 'admin', '$argon2id$v=19$m=4096,t=3,p=1$6MuByJc9mJ872yCUJf2Lgw$PaIbbGRx4aaSjTbICqHRV6lt1uLYEFDRPd8+oHO1eMA', 'ad24826a05c9e91d6008df5fca4d30ad.png', 'http://localhost:5000/images/ad24826a05c9e91d6008df5fca4d30ad.png', 'admin', '2023-06-21 06:40:57', '2023-06-21 06:40:57'),
(6, '512ecabf-a744-4e20-a369-56bb4bd860df', 'Agung', 'agung', '$argon2id$v=19$m=4096,t=3,p=1$wVEL28M9I4UlsPAs2yjttg$PbfIeGHwcVX8MsmxbTbwHsB+hnCBsQTV9C+bNHHtMHk', 'aa31d6af74bed774a914253aef8e8819.png', 'http://localhost:5000/images/aa31d6af74bed774a914253aef8e8819.png', 'guest', '2023-07-10 10:56:26', '2023-07-10 10:56:26');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `assets`
--
ALTER TABLE `assets`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `loans`
--
ALTER TABLE `loans`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `asset_id` (`asset_id`);

--
-- Indexes for table `sessions`
--
ALTER TABLE `sessions`
  ADD PRIMARY KEY (`sid`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `assets`
--
ALTER TABLE `assets`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `categories`
--
ALTER TABLE `categories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `loans`
--
ALTER TABLE `loans`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=33;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `loans`
--
ALTER TABLE `loans`
  ADD CONSTRAINT `loans_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `loans_ibfk_2` FOREIGN KEY (`asset_id`) REFERENCES `assets` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
