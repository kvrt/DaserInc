-- phpMyAdmin SQL Dump
-- version 4.5.1
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Jan 30, 2018 at 01:55 PM
-- Server version: 10.1.13-MariaDB
-- PHP Version: 5.5.35

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `dasernet`
--

-- --------------------------------------------------------

--
-- Table structure for table `admin_user`
--

CREATE TABLE `admin_user` (
  `id` int(11) NOT NULL,
  `created_on` datetime DEFAULT NULL,
  `name` varchar(100) DEFAULT NULL,
  `username` varchar(100) DEFAULT NULL,
  `password` varchar(100) DEFAULT NULL,
  `modified_on` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `admin_user`
--

INSERT INTO `admin_user` (`id`, `created_on`, `name`, `username`, `password`, `modified_on`) VALUES
(1, '2017-09-18 23:01:00', 'Swami Reddy I', 'swami.sri024@gmail.com', 'swamireddyi', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `buyer_payment`
--

CREATE TABLE `buyer_payment` (
  `id` int(11) NOT NULL,
  `buyer_id` int(11) NOT NULL,
  `service_request_id` int(11) NOT NULL,
  `stripe_customer_id` varchar(100) NOT NULL,
  `stripe_card_token_number` varchar(100) DEFAULT NULL,
  `card_type` varchar(12) NOT NULL,
  `card_last_digit` int(4) NOT NULL,
  `buyer_charged_date` varchar(50) NOT NULL DEFAULT '0',
  `buyer_payment_status` enum('P','C') NOT NULL DEFAULT 'P' COMMENT 'P - Pending, C - Completed'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `buyer_payment`
--

INSERT INTO `buyer_payment` (`id`, `buyer_id`, `service_request_id`, `stripe_customer_id`, `stripe_card_token_number`, `card_type`, `card_last_digit`, `buyer_charged_date`, `buyer_payment_status`) VALUES
(1, 1, 1, '024263', '242633', 'Debit', 671, '0', 'P');

-- --------------------------------------------------------

--
-- Table structure for table `disclosures`
--

CREATE TABLE `disclosures` (
  `id` int(11) NOT NULL,
  `disclosure_text` text
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `disclosures`
--

INSERT INTO `disclosures` (`id`, `disclosure_text`) VALUES
(1, 'Disclosers\r\nTerms and conditions\r\n');

-- --------------------------------------------------------

--
-- Table structure for table `email_confirm`
--

CREATE TABLE `email_confirm` (
  `user_id` int(10) DEFAULT NULL,
  `uniquecode` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `email_confirm`
--

INSERT INTO `email_confirm` (`user_id`, `uniquecode`) VALUES
(8, 33505),
(7, 48416),
(9, 73657),
(10, 59735),
(11, 44876);

-- --------------------------------------------------------

--
-- Table structure for table `helps`
--

CREATE TABLE `helps` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `signer_type` enum('Buyer','Seller') DEFAULT NULL,
  `subject` varchar(100) DEFAULT NULL,
  `description` text,
  `created_on` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `helps`
--

INSERT INTO `helps` (`id`, `user_id`, `signer_type`, `subject`, `description`, `created_on`) VALUES
(1, 1, 'Buyer', 'For Schedule Appintment', 'I am unable to schedule the appointment. Please help me.,', '2017-10-18 04:07:06'),
(2, 2, 'Seller', 'For Payment', 'How to make payment. Please guide me.,', '2017-10-06 08:18:21'),
(3, 11, 'Seller', 'Testing', 'I am unable schedule appointment, Please help me...,', '2017-12-08 02:53:47'),
(4, 1, 'Buyer', 'Test', 'asdasd', '2017-12-31 16:47:25'),
(5, 1, 'Buyer', 'mm', 'nnn', '2017-12-31 16:50:16'),
(6, 1, 'Buyer', 'mm', 'nnn', '2017-12-31 17:05:41'),
(7, 1, 'Buyer', 'mm', 'nnn', '2017-12-31 17:06:03'),
(8, 1, 'Buyer', 'sds', 'sddfs', '2017-12-31 17:08:56'),
(9, 1, 'Buyer', 'sds', 'sddfs', '2017-12-31 17:09:36'),
(10, 1, 'Buyer', 'ss', 'ddd', '2017-12-31 17:24:53'),
(11, 1, 'Buyer', 'dsd', 'ggddhdhhd', '2017-12-31 17:33:32'),
(12, 1, 'Buyer', 'jhhg', 'ddff', '2017-12-31 17:54:24'),
(13, 1, 'Buyer', 'jhhg', 'ddff', '2017-12-31 17:55:10'),
(14, 1, 'Buyer', 'fdfgd', 'dfgd', '2017-12-31 17:59:04'),
(15, 1, 'Buyer', 'vbn', 'kjhgfh', '2017-12-31 19:25:00'),
(16, 1, 'Buyer', 'vbn', 'kjhgfh', '2017-12-31 19:26:33'),
(17, 1, 'Buyer', 'cvb', 'fghjk', '2017-12-31 19:26:46'),
(18, 2, 'Buyer', 'sdfgh', 'fghjk', '2017-12-31 19:27:33'),
(19, 2, 'Buyer', 'dsd', 'sdsf', '2017-12-31 19:34:27'),
(20, 2, 'Buyer', 'bnm', 'kl', '2017-12-31 19:36:35'),
(21, 1, '', 'werwe', 'dsdf', '2018-01-01 18:51:53'),
(22, 1, 'Buyer', 'ds', 'sdfsf', '2018-01-02 07:15:06'),
(23, 1, 'Buyer', 'ds', 'reeedfdd', '2018-01-02 07:40:20'),
(24, 1, 'Buyer', 'ffd', 'gdfd', '2018-01-02 07:48:56'),
(25, 38, 'Buyer', 'qqq', 'qq qqq qqqq qqqqq', '2018-01-02 18:00:29'),
(26, 38, 'Buyer', 'h', 'hgggg', '2018-01-09 06:38:14'),
(27, 38, 'Buyer', 'asdf', 'sdfg', '2018-01-09 06:41:29'),
(28, 38, 'Buyer', 'ggg', 'hhhhhhhhhhhhhhhhhhhhhh', '2018-01-09 06:42:18'),
(29, 1, 'Buyer', 'daser api testing', 'Daser apis running succesfully', '2018-01-10 06:57:04');

-- --------------------------------------------------------

--
-- Table structure for table `notifications`
--

CREATE TABLE `notifications` (
  `id` int(11) NOT NULL,
  `buyer_user_id` int(11) DEFAULT NULL,
  `seller_user_id` int(11) DEFAULT NULL,
  `request_id` int(11) DEFAULT NULL,
  `service_request_id` int(11) DEFAULT NULL,
  `accept_status` char(1) DEFAULT 'P' COMMENT 'P - Pending, C - Completed',
  `accepted_on` datetime DEFAULT NULL,
  `created_on` datetime DEFAULT NULL,
  `modified_on` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `organisations`
--

CREATE TABLE `organisations` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL DEFAULT 'Individual'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `organisations`
--

INSERT INTO `organisations` (`id`, `name`) VALUES
(0, 'Not yet Assign'),
(1, 'Apetree software services pvt Limited'),
(3, 'Synchronize Software Service Pvt Ltd.,'),
(4, 'Swami Reddy I Own Company'),
(5, 'Testing Testng'),
(6, 'xyz pvt ltd');

-- --------------------------------------------------------

--
-- Table structure for table `recycle`
--

CREATE TABLE `recycle` (
  `id` int(11) NOT NULL,
  `fish_img` varchar(100) DEFAULT NULL,
  `fish_name` varchar(100) DEFAULT NULL,
  `cat_name` varchar(100) DEFAULT NULL,
  `size_name` varchar(100) DEFAULT NULL,
  `price` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `recycle`
--

INSERT INTO `recycle` (`id`, `fish_img`, `fish_name`, `cat_name`, `size_name`, `price`) VALUES
(1, '1.jpg', 'asdf', 'qwerty', 'Small', '100'),
(2, '2.jpg', 'zxcv', 'jkl', 'Medium', '24263'),
(3, '3.jpg', 'ssa', 'dfgf', '1024', '1000');

-- --------------------------------------------------------

--
-- Stand-in structure for view `recycle_view`
--
CREATE TABLE `recycle_view` (
`id` int(11)
,`fish_img` varchar(100)
,`fish_name` varchar(100)
,`cat_name` varchar(100)
,`size_name` varchar(100)
,`price` varchar(100)
);

-- --------------------------------------------------------

--
-- Table structure for table `screenlabels`
--

CREATE TABLE `screenlabels` (
  `id` int(11) NOT NULL,
  `org_id` int(11) NOT NULL DEFAULT '0',
  `name` varchar(100) DEFAULT NULL,
  `description` text
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `seller_payment`
--

CREATE TABLE `seller_payment` (
  `id` int(11) NOT NULL,
  `seller_id` int(11) NOT NULL,
  `service_type_id` int(11) NOT NULL,
  `stripe_customer_id` varchar(100) NOT NULL,
  `stripe_card_token_number` varchar(100) DEFAULT NULL,
  `seller_paid_date` varchar(100) NOT NULL DEFAULT '0',
  `seller_payment_status` enum('P','C') NOT NULL DEFAULT 'P' COMMENT 'P - Pending, C - Complete'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `seller_payment`
--

INSERT INTO `seller_payment` (`id`, `seller_id`, `service_type_id`, `stripe_customer_id`, `stripe_card_token_number`, `seller_paid_date`, `seller_payment_status`) VALUES
(1, 3, 1, '024263', '242633', '0', 'P');

-- --------------------------------------------------------

--
-- Table structure for table `seller_service_details`
--

CREATE TABLE `seller_service_details` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `service_type_id` int(11) NOT NULL,
  `created_on` datetime DEFAULT NULL,
  `modified_on` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `servicetypes`
--

CREATE TABLE `servicetypes` (
  `id` int(11) NOT NULL,
  `description` text,
  `formula` varchar(200) DEFAULT NULL,
  `created_on` datetime DEFAULT NULL,
  `modified_on` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `servicetypes`
--

INSERT INTO `servicetypes` (`id`, `description`, `formula`, `created_on`, `modified_on`) VALUES
(1, 'Floor Cleaning', '10', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(2, 'WhiteWash', '10', '2017-07-23 22:02:02', '2017-07-23 22:02:02'),
(3, 'Floor Cleaning1', '10', '2017-07-23 22:02:02', '2017-07-23 22:02:02');

-- --------------------------------------------------------

--
-- Table structure for table `servicetype_params`
--

CREATE TABLE `servicetype_params` (
  `id` int(11) NOT NULL,
  `service_type_id` int(11) NOT NULL,
  `description` text,
  `datatype` enum('Number','Radio','Checkbox') DEFAULT NULL,
  `rate` float(8,2) DEFAULT '0.00'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `servicetype_params`
--

INSERT INTO `servicetype_params` (`id`, `service_type_id`, `description`, `datatype`, `rate`) VALUES
(1, 1, '# of Bedrooms', 'Number', 10.00),
(2, 2, '# of ddddd', 'Number', 20.00),
(3, 3, '# of floors', 'Number', 30.00),
(4, 1, '# of Living Areas', 'Number', 10.00),
(5, 1, '# of Dining Areas', 'Number', 10.00),
(6, 1, '# of Bathrooms', 'Number', 14.00),
(7, 1, '# of Kitchens', 'Number', 15.00),
(8, 1, '# of Basements', 'Number', 10.00),
(9, 1, '# of Additional Rooms', 'Number', 7.00);

-- --------------------------------------------------------

--
-- Table structure for table `service_requests`
--

CREATE TABLE `service_requests` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `service_type_id` int(11) NOT NULL,
  `date_of_service` varchar(100) DEFAULT NULL,
  `needed_asap` enum('Y','N') DEFAULT 'N',
  `disclosures_checked` enum('Y','N') DEFAULT 'N',
  `service_request_address_id` int(11) DEFAULT NULL,
  `seller_user_id` int(11) DEFAULT NULL,
  `service_amount` float(8,2) DEFAULT NULL,
  `status` enum('P','C','I') DEFAULT 'P',
  `created_on` datetime DEFAULT NULL,
  `modified_on` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `service_requests`
--

INSERT INTO `service_requests` (`id`, `user_id`, `service_type_id`, `date_of_service`, `needed_asap`, `disclosures_checked`, `service_request_address_id`, `seller_user_id`, `service_amount`, `status`, `created_on`, `modified_on`) VALUES
(1, 1, 1, '2017-10-18', 'Y', 'Y', 1, 2, 100.00, 'C', '2017-10-07 13:59:00', NULL),
(2, 1, 3, '2017-10-26', 'Y', 'Y', 2, 3, 200.00, 'I', '2017-10-27 13:59:00', NULL),
(3, 4, 2, '2017-10-31', 'Y', 'Y', 4, 3, 150.00, 'C', '2017-10-31 13:59:00', NULL),
(4, 4, 2, '2017-10-31', 'Y', 'Y', 4, 2, 150.00, 'C', '2017-10-31 13:59:00', NULL),
(7, 9, 2, '0000-00-00', 'Y', 'Y', 9, 36, 400.00, 'I', '2017-12-23 09:18:00', '2017-12-23 09:18:00'),
(8, 9, 1, '2017-12-31', 'Y', 'Y', 9, 39, 560.00, 'I', '2017-12-31 09:31:41', '2017-12-31 09:31:41'),
(9, 9, 1, '2017-12-25', 'Y', 'Y', 9, 2, 360.00, 'I', '2017-12-23 10:37:00', '2017-12-23 10:37:00'),
(10, 9, 1, '2017-12-24', 'Y', 'Y', 9, 36, 1956.00, 'I', '2017-12-23 10:46:54', '2017-12-23 10:46:54'),
(11, 9, 1, '2017-12-24', 'Y', 'Y', 9, 0, 1956.00, 'P', '2017-12-23 10:50:07', '2017-12-23 10:50:07'),
(12, 9, 1, '2017-12-24', 'Y', 'Y', 9, 0, 1956.00, 'P', '2017-12-23 10:52:19', '2017-12-23 10:52:19'),
(14, 9, 1, '2017-12-31', 'Y', 'Y', 9, 0, 1332.00, 'P', '2017-12-24 09:38:45', '2017-12-24 09:38:45'),
(15, 9, 1, '2017-12-30', 'Y', 'Y', 9, 0, 252.00, 'P', '2017-12-24 09:39:48', '2017-12-24 09:39:48'),
(16, 9, 2, '2017-12-26', 'Y', 'Y', 9, 0, 480.00, 'P', '2017-12-24 09:46:08', '2017-12-24 09:46:08'),
(19, 38, 1, '2-1-2018', 'Y', 'Y', 31, 36, 232.00, 'C', '2018-01-02 18:14:44', '2018-01-02 18:14:44'),
(21, 38, 1, '2-1-2018', 'Y', 'Y', 31, 0, 1530.00, 'P', '2018-01-02 19:45:49', '2018-01-02 19:45:49'),
(22, 38, 1, '2-1-2018', 'Y', 'Y', 31, 36, 712.00, 'I', '2018-01-02 19:47:41', '2018-01-02 19:47:41'),
(23, 38, 1, '2-1-2018', 'Y', 'Y', 31, 0, 1956.00, 'P', '2018-01-02 19:50:33', '2018-01-02 19:50:33'),
(24, 38, 1, '2-1-2018', 'Y', 'Y', 31, 0, 1386.00, 'P', '2018-01-02 20:00:56', '2018-01-02 20:00:56'),
(25, 38, 1, '2-1-2018', 'Y', 'Y', 31, 0, 1586.00, 'P', '2018-01-02 20:03:23', '2018-01-02 20:03:23'),
(26, 38, 1, '2-1-2018', 'Y', 'Y', 31, 0, 1100.00, 'P', '2018-01-02 20:06:03', '2018-01-02 20:06:03'),
(27, 38, 1, '2-1-2018', 'Y', 'Y', 31, 0, 1022.00, 'P', '2018-01-02 20:09:11', '2018-01-02 20:09:11'),
(28, 38, 1, '2-1-2018', 'Y', 'Y', 31, 0, 1098.00, 'P', '2018-01-02 20:30:33', '2018-01-02 20:30:33'),
(29, 38, 2, '18-1-2018', 'Y', 'Y', 31, 0, 820.00, 'P', '2018-01-11 00:33:50', '2018-01-11 00:33:50'),
(30, 38, 2, '22-1-2018', 'Y', 'Y', 33, 0, 220.00, 'P', '2018-01-11 01:02:26', '2018-01-11 01:02:26'),
(31, 38, 1, '24-1-2018', 'Y', 'Y', 33, 0, 242.00, 'P', '2018-01-11 01:34:28', '2018-01-11 01:34:29'),
(32, 38, 2, '26-1-2018', 'Y', 'Y', 33, 0, 240.00, 'P', '2018-01-11 01:35:47', '2018-01-11 01:35:47'),
(33, 38, 1, '18-1-2018', 'Y', 'Y', 33, 0, 195.00, 'P', '2018-01-17 19:37:11', '2018-01-17 19:37:11'),
(34, 38, 1, '19-1-2018', 'Y', 'Y', 33, 0, 1037.50, 'P', '2018-01-17 20:07:08', '2018-01-17 20:07:08'),
(35, 38, 1, '20-1-2018', 'Y', 'Y', 34, 0, 167.50, 'P', '2018-01-17 20:09:35', '2018-01-17 20:09:35'),
(36, 46, 1, '30-1-2018', 'Y', 'Y', 38, 0, 81.25, 'P', '2018-01-18 06:59:52', '2018-01-18 06:59:53'),
(37, 46, 1, '30-1-2018', 'Y', 'Y', 38, 0, 31.67, 'P', '2018-01-18 07:08:21', '2018-01-18 07:08:21'),
(38, 46, 1, '29-1-2018', 'Y', 'Y', 38, 0, 65.83, 'P', '2018-01-18 07:12:28', '2018-01-18 07:12:28'),
(39, 46, 1, '31-1-2018', 'Y', 'Y', 38, 0, 81.25, 'P', '2018-01-18 07:14:58', '2018-01-18 07:14:58'),
(40, 46, 1, '30-1-2018', 'Y', 'Y', 38, 0, 136.67, 'P', '2018-01-18 07:17:48', '2018-01-18 07:17:48'),
(41, 46, 1, '31-1-2018', 'Y', 'Y', 38, 0, 173.96, 'P', '2018-01-18 07:19:59', '2018-01-18 07:19:59'),
(42, 46, 2, '30-1-2018', 'Y', 'Y', 38, 0, 83.33, 'P', '2018-01-18 07:22:22', '2018-01-18 07:22:22'),
(43, 47, 1, '24-1-2018', 'Y', 'Y', 39, 0, 81.25, 'P', '2018-01-22 02:40:51', '2018-01-22 02:40:51'),
(44, 47, 1, '23-1-2018', 'Y', 'Y', 39, 0, 81.25, 'P', '2018-01-22 02:46:47', '2018-01-22 02:46:47'),
(45, 47, 1, '25-1-2018', 'Y', 'Y', 39, 0, 81.25, 'P', '2018-01-22 02:53:53', '2018-01-22 02:53:53'),
(46, 47, 1, '30-1-2018', 'Y', 'Y', 39, 0, 81.25, 'P', '2018-01-22 03:11:06', '2018-01-22 03:11:06'),
(47, 47, 1, '23-1-2018', 'Y', 'Y', 39, 0, 81.25, 'P', '2018-01-22 03:16:16', '2018-01-22 03:16:16'),
(48, 47, 1, '15-02-2018', 'Y', 'Y', 39, 0, 136.67, 'P', '2018-01-22 08:45:34', '2018-01-22 08:45:34'),
(49, 47, 1, '15-06-2018', 'Y', 'Y', 39, 0, 370.00, 'P', '2018-01-22 08:52:08', '2018-01-22 08:52:08'),
(50, 47, 1, '15-06-2018', 'Y', 'Y', 39, 0, 173.96, 'P', '2018-01-22 09:03:22', '2018-01-22 09:03:22'),
(51, 47, 1, '12-05-2018', 'Y', 'Y', 39, 0, 136.67, 'P', '2018-01-22 10:54:26', '2018-01-22 10:54:26'),
(52, 47, 1, '12-02-2018', 'Y', 'Y', 39, 0, 136.67, 'P', '2018-01-22 11:05:06', '2018-01-22 11:05:06'),
(53, 47, 1, '12-05-2018', 'Y', 'Y', 39, 0, 136.67, 'P', '2018-01-22 11:41:51', '2018-01-22 11:41:51'),
(54, 47, 1, '12-05-2018', 'Y', 'Y', 39, 0, 136.67, 'P', '2018-01-22 11:43:27', '2018-01-22 11:43:27'),
(55, 47, 1, '12-12-2018', 'Y', 'Y', 39, 0, 136.67, 'P', '2018-01-22 12:23:37', '2018-01-22 12:23:37'),
(56, 38, 1, '30-1-2018', 'Y', 'Y', 34, 0, 31.67, 'P', '2018-01-24 07:33:24', '2018-01-24 07:33:24'),
(57, 38, 1, '30-1-2018', 'Y', 'Y', 34, 0, 136.67, 'P', '2018-01-24 07:40:07', '2018-01-24 07:40:07'),
(58, 38, 1, '31-1-2018', 'Y', 'Y', 34, 0, 136.67, 'P', '2018-01-24 07:43:37', '2018-01-24 07:43:37'),
(59, 38, 1, '31-1-2018', 'Y', 'Y', 34, 0, 252.29, 'P', '2018-01-24 07:47:13', '2018-01-24 07:47:13'),
(60, 38, 1, '30-1-2018', 'Y', 'Y', 34, 0, 136.67, 'P', '2018-01-24 07:54:14', '2018-01-24 07:54:14'),
(61, 38, 1, '30-1-2018', 'Y', 'Y', 34, 0, 136.67, 'P', '2018-01-24 07:56:48', '2018-01-24 07:56:48'),
(62, 38, 1, '26-1-2018', 'Y', 'Y', 34, 0, 136.67, 'P', '2018-01-24 15:09:30', '2018-01-24 15:09:30'),
(63, 38, 1, '26-1-2018', 'Y', 'Y', 34, 0, 173.96, 'P', '2018-01-24 15:14:15', '2018-01-24 15:14:15');

-- --------------------------------------------------------

--
-- Table structure for table `service_request_address`
--

CREATE TABLE `service_request_address` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `address_line1` varchar(200) DEFAULT NULL,
  `address_line2` varchar(200) DEFAULT NULL,
  `city` varchar(100) DEFAULT NULL,
  `state` varchar(60) DEFAULT NULL,
  `zip` varchar(10) DEFAULT NULL,
  `country` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `service_request_address`
--

INSERT INTO `service_request_address` (`id`, `user_id`, `address_line1`, `address_line2`, `city`, `state`, `zip`, `country`) VALUES
(1, 1, 'S/o Rambabu Reddy', '3-92, pindivripalem', 'gudur md', 'Andhra Pradesh', '521366', 'India'),
(2, 2, 'S/o Rambabu Reddy', '3-92, pindivripalem', 'gudur md', 'Andhra Pradesh', '521366', 'India'),
(3, 3, 'Near Post office', 'KPHB', 'Hyderabad', 'Telangana', '500090', 'India'),
(4, 4, '4-676/9', 'Hi-Tech', 'Hyderabad', 'Telangana', '500090', 'India'),
(5, 5, '#3-92', 'Pindivaripalem', 'Guduru', 'Andhra Pradesh', '521366', 'India'),
(6, 6, '3-92A', 'Pindivaripalem', 'Guduru', 'Andhra Pradesh', '521366', 'India'),
(7, 7, 'PRAGATHI NAGAR', 'NEAR HERITAGE FRESH', 'HYDERABAD', 'TELANGANA', '500090', 'INDIA'),
(8, 8, 'qwerty', 'ytrewq', 'Pedana', 'Andhra Pradesh', '521366', 'india'),
(9, 9, '3-92', 'Pindivaripalem', 'Guduru', 'Andhra Pradesh', '521366', 'India'),
(10, 10, 'KPHB', 'PHASE - I', 'HYDERABAD', 'TELANGANA', '500090', 'INDIA'),
(11, 11, '3-92', 'pragathi nagar', 'Pedanaa', 'Andhra Pradesh', '500090', 'India'),
(25, 32, 'S/o Rambabu Reddy', '3-92, pindivripalem', 'gudur md', 'Andhra Pradesh', '521366', 'India'),
(26, 33, 'S/o Rambabu Reddy', '3-92, pindivripalem', 'gudur md', 'Andhra Pradesh', '521366', 'India'),
(27, 34, 'S/o Rambabu Reddy', '3-92, pindivripalem', 'gudur md', 'Andhra Pradesh', '521366', 'India'),
(28, 35, 'qwerty', 'asdfg', 'poiuy', 'zxcvb', '123456', 'India'),
(29, 36, 'asdfg', 'gfdsa', 'sdfs', 'andhra pradesh', '87451', 'India'),
(30, 37, 'asdfgh', 'wert', 'dfg', 'sdfgh', '789546', 'sfgh'),
(31, 38, 'Near Mantada1', 'Fire station road2', 'Yuvvuru - 2', 'Andra Pradesh', '521459', 'India'),
(32, 39, 'dggg', 'ass', 'ddfg', 'dff', '521355', 'fgg'),
(33, 38, 'Near Mantada1', 'Fire station road2', 'Yuvvuru - 2', 'Andra Pradesh', '521459', 'India'),
(34, 38, 'Near Mantada1', 'Fire station road2', 'Yuvvuru - 2', 'Andra Pradesh', '521459', 'India'),
(35, 43, 'Krishna Nagar', 'Near jublihills road no:1', 'Hyderabad', 'Telangana', '500062', 'India'),
(36, 44, 'Sri Krishna Nagar', 'Rod no:1', 'Hyderabad', 'Telangana', '500062', 'India'),
(37, 45, 'krishna nagar', 'road no:1', 'hyd', 'TG', '500062', 'India'),
(38, 46, 'karamcedu', 'Kurnool', 'Kurnool', 'Andra Prdesh', '546321', 'India'),
(39, 47, 'Paluuru', 'Near nandyala', 'Kurnool', 'Andhra Pradesh', '546321', 'India');

-- --------------------------------------------------------

--
-- Table structure for table `service_request_params`
--

CREATE TABLE `service_request_params` (
  `id` int(11) NOT NULL,
  `service_request_id` int(11) NOT NULL,
  `service_type_id` int(11) NOT NULL,
  `servicetype_param_id` int(11) NOT NULL,
  `servicetype_param_value` text,
  `servicetype_param_amount` float(8,2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `service_request_params`
--

INSERT INTO `service_request_params` (`id`, `service_request_id`, `service_type_id`, `servicetype_param_id`, `servicetype_param_value`, `servicetype_param_amount`) VALUES
(4, 9, 1, 0, '24', 0.00),
(5, 9, 1, 0, '10', 0.00),
(6, 10, 1, 0, '78', 0.00),
(7, 10, 1, 0, '98', 0.00),
(8, 11, 1, 0, '78', 0.00),
(9, 11, 1, 0, '98', 0.00),
(10, 12, 1, 0, '78', 0.00),
(11, 12, 1, 0, '98', 0.00),
(14, 14, 1, 1, '54', 10.00),
(15, 14, 1, 4, '66', 12.00),
(16, 15, 1, 1, '12', 10.00),
(17, 15, 1, 4, '11', 12.00),
(18, 16, 2, 2, '24', 20.00),
(21, 19, 1, 1, '', 10.00),
(22, 19, 1, 4, '', 12.00),
(25, 21, 1, 1, '', 10.00),
(26, 21, 1, 4, '', 12.00),
(27, 22, 1, 1, '41', 10.00),
(28, 22, 1, 4, '41', 12.00),
(29, 23, 1, 1, '98', 10.00),
(30, 23, 1, 4, '98', 12.00),
(31, 24, 1, 1, '78', 0.00),
(32, 24, 1, 4, '78', 0.00),
(33, 33, 1, 1, '4', 10.00),
(34, 33, 1, 4, '2', 10.00),
(35, 33, 1, 5, '2', 10.00),
(36, 33, 1, 6, '5', 14.00),
(37, 33, 1, 7, '1', 15.00),
(38, 33, 1, 8, '1', 10.00),
(39, 33, 1, 9, '2', 7.00),
(40, 34, 1, 1, '40', 10.00),
(41, 34, 1, 4, '20', 10.00),
(42, 34, 1, 5, '20', 10.00),
(43, 34, 1, 6, '50', 14.00),
(44, 34, 1, 7, '10', 15.00),
(45, 34, 1, 8, '10', 10.00),
(46, 34, 1, 9, '20', 7.00),
(47, 35, 1, 1, '8', 10.00),
(48, 35, 1, 4, '4', 10.00),
(49, 35, 1, 5, '4', 10.00),
(50, 35, 1, 6, '10', 14.00),
(51, 35, 1, 7, '2', 15.00),
(52, 35, 1, 8, '2', 10.00),
(53, 35, 1, 9, '4', 7.00),
(54, 36, 1, 1, '4', 10.00),
(55, 36, 1, 4, '2', 10.00),
(56, 36, 1, 5, '2', 10.00),
(57, 36, 1, 6, '5', 14.00),
(58, 36, 1, 7, '1', 15.00),
(59, 36, 1, 8, '1', 10.00),
(60, 36, 1, 9, '2', 7.00),
(61, 37, 1, 1, '1', 10.00),
(62, 37, 1, 4, '1', 10.00),
(63, 37, 1, 5, '1', 10.00),
(64, 37, 1, 6, '1', 14.00),
(65, 37, 1, 7, '1', 15.00),
(66, 37, 1, 8, '1', 10.00),
(67, 37, 1, 9, '1', 7.00),
(68, 38, 1, 1, '2', 10.00),
(69, 38, 1, 4, '2', 10.00),
(70, 38, 1, 5, '2', 10.00),
(71, 38, 1, 6, '2', 14.00),
(72, 38, 1, 7, '2', 15.00),
(73, 38, 1, 8, '2', 10.00),
(74, 38, 1, 9, '2', 7.00),
(75, 39, 1, 1, '4', 10.00),
(76, 39, 1, 4, '2', 10.00),
(77, 39, 1, 5, '2', 10.00),
(78, 39, 1, 6, '5', 14.00),
(79, 39, 1, 7, '1', 15.00),
(80, 39, 1, 8, '1', 10.00),
(81, 39, 1, 9, '2', 7.00),
(82, 40, 1, 1, '4', 10.00),
(83, 40, 1, 4, '4', 10.00),
(84, 40, 1, 5, '4', 10.00),
(85, 40, 1, 6, '4', 14.00),
(86, 40, 1, 7, '4', 15.00),
(87, 40, 1, 8, '4', 10.00),
(88, 40, 1, 9, '4', 7.00),
(89, 41, 1, 1, '5', 10.00),
(90, 41, 1, 4, '5', 10.00),
(91, 41, 1, 5, '5', 10.00),
(92, 41, 1, 6, '5', 14.00),
(93, 41, 1, 7, '5', 15.00),
(94, 41, 1, 8, '5', 10.00),
(95, 41, 1, 9, '5', 7.00),
(96, 42, 2, 2, '10', 20.00),
(97, 43, 1, 1, '4', 10.00),
(98, 43, 1, 4, '2', 10.00),
(99, 43, 1, 5, '2', 10.00),
(100, 43, 1, 6, '5', 14.00),
(101, 43, 1, 7, '1', 15.00),
(102, 43, 1, 8, '1', 10.00),
(103, 43, 1, 9, '2', 7.00),
(104, 44, 1, 1, '4', 10.00),
(105, 44, 1, 4, '2', 10.00),
(106, 44, 1, 5, '2', 10.00),
(107, 44, 1, 6, '5', 14.00),
(108, 44, 1, 7, '1', 15.00),
(109, 44, 1, 8, '1', 10.00),
(110, 44, 1, 9, '2', 7.00),
(111, 45, 1, 1, '4', 10.00),
(112, 45, 1, 4, '2', 10.00),
(113, 45, 1, 5, '2', 10.00),
(114, 45, 1, 6, '5', 14.00),
(115, 45, 1, 7, '1', 15.00),
(116, 45, 1, 8, '1', 10.00),
(117, 45, 1, 9, '2', 7.00),
(118, 46, 1, 1, '4', 10.00),
(119, 46, 1, 4, '2', 10.00),
(120, 46, 1, 5, '2', 10.00),
(121, 46, 1, 6, '5', 14.00),
(122, 46, 1, 7, '1', 15.00),
(123, 46, 1, 8, '1', 10.00),
(124, 46, 1, 9, '2', 7.00),
(125, 47, 1, 1, '4', 10.00),
(126, 47, 1, 4, '2', 10.00),
(127, 47, 1, 5, '2', 10.00),
(128, 47, 1, 6, '5', 14.00),
(129, 47, 1, 7, '1', 15.00),
(130, 47, 1, 8, '1', 10.00),
(131, 47, 1, 9, '2', 7.00),
(132, 48, 1, 1, '4', 10.00),
(133, 48, 1, 4, '4', 10.00),
(134, 48, 1, 5, '4', 10.00),
(135, 48, 1, 6, '4', 14.00),
(136, 48, 1, 7, '4', 15.00),
(137, 48, 1, 8, '4', 10.00),
(138, 48, 1, 9, '4', 7.00),
(139, 49, 1, 1, '4', 10.00),
(140, 49, 1, 4, '4', 10.00),
(141, 49, 1, 5, '4', 10.00),
(142, 49, 1, 6, '44', 14.00),
(143, 49, 1, 7, '4', 15.00),
(144, 49, 1, 8, '4', 10.00),
(145, 49, 1, 9, '4', 7.00),
(146, 50, 1, 1, '5', 10.00),
(147, 50, 1, 4, '5', 10.00),
(148, 50, 1, 5, '5', 10.00),
(149, 50, 1, 6, '5', 14.00),
(150, 50, 1, 7, '5', 15.00),
(151, 50, 1, 8, '5', 10.00),
(152, 50, 1, 9, '5', 7.00),
(153, 51, 1, 1, '4', 10.00),
(154, 51, 1, 4, '4', 10.00),
(155, 51, 1, 5, '4', 10.00),
(156, 51, 1, 6, '4', 14.00),
(157, 51, 1, 7, '4', 15.00),
(158, 51, 1, 8, '4', 10.00),
(159, 51, 1, 9, '4', 7.00),
(160, 52, 1, 1, '4', 10.00),
(161, 52, 1, 4, '4', 10.00),
(162, 52, 1, 5, '4', 10.00),
(163, 52, 1, 6, '4', 14.00),
(164, 52, 1, 7, '4', 15.00),
(165, 52, 1, 8, '4', 10.00),
(166, 52, 1, 9, '4', 7.00),
(167, 53, 1, 1, '4', 10.00),
(168, 53, 1, 4, '4', 10.00),
(169, 53, 1, 5, '4', 10.00),
(170, 53, 1, 6, '4', 14.00),
(171, 53, 1, 7, '4', 15.00),
(172, 53, 1, 8, '4', 10.00),
(173, 53, 1, 9, '4', 7.00),
(174, 54, 1, 1, '4', 10.00),
(175, 54, 1, 4, '4', 10.00),
(176, 54, 1, 5, '4', 10.00),
(177, 54, 1, 6, '4', 14.00),
(178, 54, 1, 7, '4', 15.00),
(179, 54, 1, 8, '4', 10.00),
(180, 54, 1, 9, '4', 7.00),
(181, 55, 1, 1, '4', 10.00),
(182, 55, 1, 4, '4', 10.00),
(183, 55, 1, 5, '4', 10.00),
(184, 55, 1, 6, '4', 14.00),
(185, 55, 1, 7, '4', 15.00),
(186, 55, 1, 8, '4', 10.00),
(187, 55, 1, 9, '4', 7.00),
(188, 56, 1, 1, '1', 10.00),
(189, 56, 1, 4, '1', 10.00),
(190, 56, 1, 5, '1', 10.00),
(191, 56, 1, 6, '1', 14.00),
(192, 56, 1, 7, '1', 15.00),
(193, 56, 1, 8, '1', 10.00),
(194, 56, 1, 9, '1', 7.00),
(195, 57, 1, 1, '4', 10.00),
(196, 57, 1, 4, '4', 10.00),
(197, 57, 1, 5, '4', 10.00),
(198, 57, 1, 6, '4', 14.00),
(199, 57, 1, 7, '4', 15.00),
(200, 57, 1, 8, '4', 10.00),
(201, 57, 1, 9, '4', 7.00),
(202, 58, 1, 1, '4', 10.00),
(203, 58, 1, 4, '4', 10.00),
(204, 58, 1, 5, '4', 10.00),
(205, 58, 1, 6, '4', 14.00),
(206, 58, 1, 7, '4', 15.00),
(207, 58, 1, 8, '4', 10.00),
(208, 58, 1, 9, '4', 7.00),
(209, 59, 1, 1, '7', 10.00),
(210, 59, 1, 4, '7', 10.00),
(211, 59, 1, 5, '7', 10.00),
(212, 59, 1, 6, '7', 14.00),
(213, 59, 1, 7, '7', 15.00),
(214, 59, 1, 8, '7', 10.00),
(215, 59, 1, 9, '7', 7.00),
(216, 60, 1, 1, '4', 10.00),
(217, 60, 1, 4, '4', 10.00),
(218, 60, 1, 5, '4', 10.00),
(219, 60, 1, 6, '4', 14.00),
(220, 60, 1, 7, '4', 15.00),
(221, 60, 1, 8, '4', 10.00),
(222, 60, 1, 9, '4', 7.00),
(223, 61, 1, 1, '4', 10.00),
(224, 61, 1, 4, '4', 10.00),
(225, 61, 1, 5, '4', 10.00),
(226, 61, 1, 6, '4', 14.00),
(227, 61, 1, 7, '4', 15.00),
(228, 61, 1, 8, '4', 10.00),
(229, 61, 1, 9, '4', 7.00),
(230, 62, 1, 1, '4', 10.00),
(231, 62, 1, 4, '4', 10.00),
(232, 62, 1, 5, '4', 10.00),
(233, 62, 1, 6, '4', 14.00),
(234, 62, 1, 7, '4', 15.00),
(235, 62, 1, 8, '4', 10.00),
(236, 62, 1, 9, '4', 7.00),
(237, 63, 1, 1, '5', 10.00),
(238, 63, 1, 4, '5', 10.00),
(239, 63, 1, 5, '5', 10.00),
(240, 63, 1, 6, '5', 14.00),
(241, 63, 1, 7, '5', 15.00),
(242, 63, 1, 8, '5', 10.00),
(243, 63, 1, 9, '5', 7.00);

-- --------------------------------------------------------

--
-- Table structure for table `service_request_paymentlog`
--

CREATE TABLE `service_request_paymentlog` (
  `id` int(11) NOT NULL,
  `buyer_payment_seq_number` int(11) NOT NULL,
  `seller_payment_seq_number` int(11) NOT NULL,
  `buyer_charged_date` datetime DEFAULT NULL,
  `seller_paid_date` datetime DEFAULT NULL,
  `buyer_payment_status` varchar(100) DEFAULT NULL,
  `seller_payment_status` varchar(100) DEFAULT NULL,
  `remarks` text
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `phonenumber` bigint(11) DEFAULT NULL,
  `signer_type` enum('Buyer','Seller') DEFAULT NULL,
  `first_name` varchar(20) DEFAULT NULL,
  `last_name` varchar(20) DEFAULT NULL,
  `dob` date DEFAULT NULL,
  `emailaddress` varchar(100) DEFAULT NULL,
  `password` varchar(100) DEFAULT NULL,
  `stripe_customer_id` varchar(100) DEFAULT NULL,
  `org_id` int(11) DEFAULT '0',
  `address_id` int(11) DEFAULT '0',
  `profilephoto` varchar(100) DEFAULT NULL,
  `background_checked` enum('Y','N') DEFAULT 'N',
  `active` enum('Y','N') DEFAULT 'N',
  `verified` enum('Y','N') DEFAULT 'N',
  `vericode` varchar(20) NOT NULL,
  `created_on` datetime DEFAULT NULL,
  `modified_on` datetime DEFAULT NULL,
  `Buyer_card_status` varchar(200) NOT NULL DEFAULT '0',
  `Buyer_last_fourdigits` int(10) NOT NULL DEFAULT '0',
  `Buyer_card_type` varchar(50) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `phonenumber`, `signer_type`, `first_name`, `last_name`, `dob`, `emailaddress`, `password`, `stripe_customer_id`, `org_id`, `address_id`, `profilephoto`, `background_checked`, `active`, `verified`, `vericode`, `created_on`, `modified_on`, `Buyer_card_status`, `Buyer_last_fourdigits`, `Buyer_card_type`) VALUES
(0, 0, '', '0', '0', '2018-01-03', '0', '0', '0', 0, 0, NULL, 'N', 'N', 'N', '0', '2018-01-16 00:00:00', '2018-01-18 00:00:00', '0', 0, '0'),
(1, 9676807124, 'Buyer', 'swamiiiiiiiiii', 'reddy', '1992-06-15', 'swami.sri024@gmail.com', 'swamis', '', 0, 1, 'NA', 'Y', 'Y', 'Y', '', '2017-05-16 00:00:00', '2018-01-17 17:03:11', '0', 0, '0'),
(2, 9676807124, 'Seller', 'Jagan', 'Reddy.,', '1978-06-14', 'swami.sri0241@gmail.com', 'b2ca678b4c936f905fb82f2733f5297f', '24263', 1, 2, 'NA', 'Y', 'Y', 'Y', '1', '2017-05-16 00:00:00', '2018-01-30 00:23:16', '0', 0, '0'),
(3, 9676807126, 'Seller', 'Bharat', 'Y', '1992-06-15', 'swami.sri0242@gmail.com', 'swamis', '24263', 3, 3, 'NA', 'Y', 'N', 'Y', '1', '2017-05-16 00:00:00', '2017-06-25 00:00:00', '0', 0, '0'),
(4, 9676807127, 'Buyer', 'Manohar', 'M', '1992-06-15', 'swami.sri0243@gmail.com', 'swamis', '24263', 0, 4, 'NA', 'Y', 'Y', 'Y', '1', '2017-05-16 00:00:00', '2017-06-25 00:00:00', '0', 0, '0'),
(5, 9676807171, 'Buyer', 'Testing', 'One', '0000-00-00', 'testingone@gmail.com', '24263', '0', 0, 5, 'NA', 'Y', 'N', 'N', '0', '0000-00-00 00:00:00', '0000-00-00 00:00:00', '0', 0, '0'),
(6, 9676801717, 'Buyer', 'testing', 'two', '1992-06-15', 'swai024.ur@gmail.com', '2424', '0', 0, 6, 'NA', 'Y', 'N', 'N', '0', '2017-12-04 06:54:00', '2017-12-04 06:54:00', '0', 0, '0'),
(7, 9676967624, 'Buyer', 'TESTING', 'THREE', '1992-06-15', 'TESTING@GMAIL.COM', '9676', '0', 0, 7, 'NA', 'Y', 'N', 'N', '0', '2017-12-06 08:16:45', '2017-12-06 08:16:45', '0', 0, '0'),
(8, 9696967676, 'Buyer', 'Testing', 'Four', '1994-05-15', 'testingfour@gmail.com', '9696', '0', 0, 8, 'NA', 'Y', 'N', 'N', '0', '2017-12-06 08:33:37', '2017-12-06 08:33:37', '0', 0, '0'),
(9, 9676807124, 'Buyer', 'Testing', 'Five', '1992-06-15', 'five@gmail.com', '7124', '0', 0, 9, 'NA', 'Y', 'Y', 'Y', '1', '2017-12-06 10:26:56', '2017-12-20 01:27:08', '0', 0, '0'),
(10, 9676807124, 'Buyer', 'Swami', 'Reddy', '1992-06-15', 'swami@gmail.com', '24263', '0', 0, 10, 'NA', 'Y', 'N', 'N', '0', '2017-12-06 04:30:37', '2017-12-06 04:30:37', '0', 0, '0'),
(11, 9676967624, 'Seller', 'asdf', 'lkj', '1992-06-15', 'asdf@gmail.com', '4545', '0', 3, 11, 'NA', 'Y', 'Y', 'Y', '1', '2017-12-06 04:39:09', '2017-12-06 04:39:09', '0', 0, '0'),
(12, 9676807124, '', 'Guduru', 'Andhra Pradesh', '0000-00-00', 'swai.sri024@gmail.com', '7d31e0da1ab99fe8b08a22118e2f402b', NULL, 0, 0, NULL, 'N', 'N', 'N', 'BOetOG', '2017-12-30 14:42:52', NULL, '0', 0, '0'),
(26, 9676807124, 'Buyer', 'swami', 'reddy i', '1992-06-15', 'swami.sri024@gmail.com', 'f1d20f1536eca24351a65b47628317ce', 'cus_C9dPKvQBj986Es', 0, 0, 'NA', 'Y', 'N', 'N', 'IPFvOz', '2017-12-30 17:54:37', '2017-12-30 17:54:37', '0', 0, '0'),
(27, 9676807124, 'Buyer', 'swami', 'reddy i', '1992-06-15', 'swami.sri024@gmail.com', 'f1d20f1536eca24351a65b47628317ce', 'cus_C9dPKvQBj986Es', 0, 0, 'NA', 'Y', 'N', 'N', 'wJ6Oi2', '2017-12-30 17:58:14', '2017-12-30 17:58:14', '0', 0, '0'),
(28, 9676807124, 'Buyer', 'swami', 'reddy i', '1992-06-15', 'swami.sri024@gmail.com', 'f1d20f1536eca24351a65b47628317ce', 'cus_C9dPKvQBj986Es', 0, 0, 'NA', 'Y', 'N', 'N', 'T6HsD3', '2017-12-30 17:59:19', '2017-12-30 17:59:19', '0', 0, '0'),
(29, 9676807124, 'Buyer', 'swami', 'reddy i', '1992-06-15', 'swami.sri024@gmail.com', 'f1d20f1536eca24351a65b47628317ce', 'cus_C9dPKvQBj986Es', 0, 0, 'NA', 'Y', 'N', 'N', 'YnYMJN', '2017-12-30 18:00:21', '2017-12-30 18:00:21', '0', 0, '0'),
(32, 9676807124, 'Buyer', 'swami', 'reddy i', '1992-06-15', 'swami.sri024@gmail.com', 'f1d20f1536eca24351a65b47628317ce', 'cus_C9dPKvQBj986Es', 0, 25, 'NA', 'Y', 'N', 'N', 'zGzJmG', '2017-12-30 18:15:02', '2017-12-30 18:15:02', '0', 0, '0'),
(33, 9676807124, 'Buyer', 'swami', 'reddy', '1992-06-15', 'swami.sri024@gmail.com', 'f1d20f1536eca24351a65b47628317ce', 'cus_C9dPKvQBj986Es', 0, 26, 'NA', 'Y', 'N', 'N', 'dxUMN2', '2017-12-30 18:48:34', '2017-12-30 18:48:34', '0', 0, '0'),
(34, 9676807124, 'Buyer', 'swami', 'reddy', '1992-06-15', 'swami.sri024ty@gmail.com', '9a53a95582faa5ff4366e9f45ecee27b', '0', 4, 27, 'NA', 'Y', 'Y', 'Y', '7ROEyV', '2017-12-30 19:15:53', '2017-12-30 19:15:53', '0', 0, '0'),
(35, 9676807124, 'Buyer', 'Testing', 'twofour', '1992-06-15', 'Testing24@gmail.com', 'd4addc6ed1e555caa72542b5538c50fa', '0', 0, 28, 'NA', 'Y', 'Y', 'Y', '24263', '2018-01-02 16:27:35', '2018-01-02 16:27:35', '0', 0, '0'),
(36, 9676807124, 'Seller', 'Testing', 'Testing', '1992-12-12', 'testing123456@gmail.com', 'b2ca678b4c936f905fb82f2733f5297f', '0', 5, 29, 'NA', 'Y', 'Y', 'Y', '123456', '2018-01-02 16:53:26', '2018-01-03 19:10:31', '0', 0, '0'),
(37, 123456789, 'Buyer', 'asss', 'qww', '1992-11-12', 'aaa@gmail.com', 'd8578edf8458ce06fbc5bb76a58c5ca4', '0', 0, 30, 'NA', 'Y', 'Y', 'Y', '7124', '2018-01-02 17:07:17', '2018-01-02 17:07:18', '0', 0, '0'),
(38, 1236547890, 'Buyer', 'Swami', 'Sri', '1998-12-30', 'qqq@gmail.com', 'b2ca678b4c936f905fb82f2733f5297f', 'cus_C9kxQ1IS6tCULZ', 0, 34, 'NA', 'Y', 'Y', 'Y', '24263', '2018-01-02 17:51:17', '2018-01-30 00:20:52', 'tok_1BnknhBTjXsNpgZToNyNnuNP', 4444, 'MasterCard'),
(39, 9676807124, 'Seller', 'jagan', 'reddy', '1988-05-12', 'jagan@gmail.com', '25d55ad283aa400af464c76d713c07ad', '0', 6, 32, 'NA', 'Y', 'Y', 'Y', 'cjYIQj', '2018-01-05 09:21:54', '2018-01-05 09:21:54', '0', 0, '0'),
(41, 1234564, 'Buyer', NULL, NULL, NULL, NULL, NULL, NULL, 0, 0, NULL, 'N', 'N', 'N', '', NULL, NULL, '0', 0, '0'),
(42, 9676967696, 'Buyer', NULL, NULL, NULL, NULL, '$2a$10$z2mdjAcD.4AjJEKTGkTN3.Q5NpDkcZZznuxYX1pa8YzA1Ccmff8o.', NULL, 0, 0, NULL, 'N', 'N', 'N', '', NULL, NULL, '0', 0, '0'),
(45, 7093543253, 'Buyer', 'Bharat', 'reddy', '1992-06-15', 'swami024.ur@gmail.com', '5ba4214966f839a1ff8c778b9db63331', 'cus_C9fVl1Ean9ngZz', 0, 37, 'NA', 'Y', 'Y', 'Y', '', '2018-01-18 00:29:51', '2018-01-18 00:29:51', '0', 0, '0'),
(46, 9676712480, 'Buyer', 'Madhu', 'Babu', '0000-00-00', 'msmadhu.babu4@gmail.com', '2d43c7a8d6ddfbe556626f2eb7a9d28c', 'cus_C9kxQ1IS6tCULZ', 0, 38, 'NA', 'Y', 'Y', 'Y', '', '2018-01-18 06:08:08', '2018-01-18 06:08:08', '0', 0, '0'),
(47, 9856365212, 'Buyer', 'Manohar', 'Manu', '0194-05-25', 'manu.manohar025@gmail.com', '2d43c7a8d6ddfbe556626f2eb7a9d28c', 'cus_CBCCOuJeFP84C2', 0, 39, 'NA', 'Y', 'Y', 'Y', '', '2018-01-22 02:20:00', '2018-01-22 02:20:00', 'tok_1BmzBVBTjXsNpgZTGtpUFuyG', 4444, 'MasterCard');

-- --------------------------------------------------------

--
-- Stand-in structure for view `users_view`
--
CREATE TABLE `users_view` (
`id` int(11)
,`phonenumber` bigint(11)
,`signer_type` enum('Buyer','Seller')
,`first_name` varchar(20)
,`last_name` varchar(20)
,`dob` date
,`emailaddress` varchar(100)
,`password` varchar(100)
,`stripe_customer_id` varchar(100)
,`org_id` int(11)
,`address_id` int(11)
,`profilephoto` varchar(100)
,`background_checked` enum('Y','N')
,`active` enum('Y','N')
,`verified` enum('Y','N')
,`vericode` varchar(20)
,`created_on` datetime
,`modified_on` datetime
,`Buyer_card_status` varchar(200)
,`Buyer_last_fourdigits` int(10)
,`Buyer_card_type` varchar(50)
);

-- --------------------------------------------------------

--
-- Structure for view `recycle_view`
--
DROP TABLE IF EXISTS `recycle_view`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `recycle_view`  AS  select `recycle`.`id` AS `id`,`recycle`.`fish_img` AS `fish_img`,`recycle`.`fish_name` AS `fish_name`,`recycle`.`cat_name` AS `cat_name`,`recycle`.`size_name` AS `size_name`,`recycle`.`price` AS `price` from `recycle` ;

-- --------------------------------------------------------

--
-- Structure for view `users_view`
--
DROP TABLE IF EXISTS `users_view`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `users_view`  AS  select `users`.`id` AS `id`,`users`.`phonenumber` AS `phonenumber`,`users`.`signer_type` AS `signer_type`,`users`.`first_name` AS `first_name`,`users`.`last_name` AS `last_name`,`users`.`dob` AS `dob`,`users`.`emailaddress` AS `emailaddress`,`users`.`password` AS `password`,`users`.`stripe_customer_id` AS `stripe_customer_id`,`users`.`org_id` AS `org_id`,`users`.`address_id` AS `address_id`,`users`.`profilephoto` AS `profilephoto`,`users`.`background_checked` AS `background_checked`,`users`.`active` AS `active`,`users`.`verified` AS `verified`,`users`.`vericode` AS `vericode`,`users`.`created_on` AS `created_on`,`users`.`modified_on` AS `modified_on`,`users`.`Buyer_card_status` AS `Buyer_card_status`,`users`.`Buyer_last_fourdigits` AS `Buyer_last_fourdigits`,`users`.`Buyer_card_type` AS `Buyer_card_type` from `users` ;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admin_user`
--
ALTER TABLE `admin_user`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`);

--
-- Indexes for table `buyer_payment`
--
ALTER TABLE `buyer_payment`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `disclosures`
--
ALTER TABLE `disclosures`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `helps`
--
ALTER TABLE `helps`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `notifications`
--
ALTER TABLE `notifications`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `organisations`
--
ALTER TABLE `organisations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `recycle`
--
ALTER TABLE `recycle`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `screenlabels`
--
ALTER TABLE `screenlabels`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `seller_payment`
--
ALTER TABLE `seller_payment`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `seller_service_details`
--
ALTER TABLE `seller_service_details`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `servicetypes`
--
ALTER TABLE `servicetypes`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `servicetype_params`
--
ALTER TABLE `servicetype_params`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `service_requests`
--
ALTER TABLE `service_requests`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `service_request_address`
--
ALTER TABLE `service_request_address`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `service_request_params`
--
ALTER TABLE `service_request_params`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `service_request_paymentlog`
--
ALTER TABLE `service_request_paymentlog`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admin_user`
--
ALTER TABLE `admin_user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT for table `buyer_payment`
--
ALTER TABLE `buyer_payment`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT for table `disclosures`
--
ALTER TABLE `disclosures`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT for table `helps`
--
ALTER TABLE `helps`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=30;
--
-- AUTO_INCREMENT for table `notifications`
--
ALTER TABLE `notifications`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `organisations`
--
ALTER TABLE `organisations`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
--
-- AUTO_INCREMENT for table `recycle`
--
ALTER TABLE `recycle`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT for table `screenlabels`
--
ALTER TABLE `screenlabels`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `seller_payment`
--
ALTER TABLE `seller_payment`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT for table `seller_service_details`
--
ALTER TABLE `seller_service_details`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `servicetypes`
--
ALTER TABLE `servicetypes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT for table `servicetype_params`
--
ALTER TABLE `servicetype_params`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;
--
-- AUTO_INCREMENT for table `service_requests`
--
ALTER TABLE `service_requests`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=64;
--
-- AUTO_INCREMENT for table `service_request_address`
--
ALTER TABLE `service_request_address`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=40;
--
-- AUTO_INCREMENT for table `service_request_params`
--
ALTER TABLE `service_request_params`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=244;
--
-- AUTO_INCREMENT for table `service_request_paymentlog`
--
ALTER TABLE `service_request_paymentlog`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=48;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
