-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Aug 06, 2024 at 01:00 AM
-- Server version: 5.7.26
-- PHP Version: 8.0.29

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `dtrpayroll`
--

-- --------------------------------------------------------

--
-- Table structure for table `failed_jobs`
--

DROP TABLE IF EXISTS `failed_jobs`;
CREATE TABLE IF NOT EXISTS `failed_jobs` (
  `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT,
  `uuid` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `connection` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `queue` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `exception` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `migrations`
--

DROP TABLE IF EXISTS `migrations`;
CREATE TABLE IF NOT EXISTS `migrations` (
  `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `migration` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `batch` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=63 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(22, '2014_10_12_000000_create_users_table', 1),
(23, '2014_10_12_100000_create_password_resets_table', 1),
(24, '2019_08_19_000000_create_failed_jobs_table', 1),
(25, '2019_12_14_000001_create_personal_access_tokens_table', 1),
(27, '2024_02_25_190129_create_tbl_person_address_table', 1),
(29, '2024_02_26_080539_create_tbl_logs_table', 2),
(30, '2024_02_26_101422_create_tbl_department_table', 3),
(31, '2024_02_26_123649_create_tbl_contribution_table', 4),
(33, '2024_02_25_185331_create_tbl_person_details_table', 5),
(34, '2024_02_25_190241_create_tbl_employee_table', 6),
(36, '2024_02_27_030829_create_tbl_sss_table', 7),
(37, '2024_02_27_053921_create_tbl_pagibig_table', 8),
(38, '2024_02_27_062135_create_tbl_philhealth_table', 9),
(39, '2024_02_27_070809_create_tbl_holidays_table', 10),
(40, '2024_02_27_104756_create_tbl_events_table', 11),
(41, '2024_02_27_115846_create_tbl_days_table', 12),
(42, '2024_02_27_121001_create_tbl_salary_period_table', 13),
(43, '2024_02_28_111047_create_tbl_company_info_table', 14),
(44, '2024_02_29_122726_create_tbl_email_table', 15),
(45, '2024_03_01_120552_create_tbl_time_period_table', 16),
(46, '2024_03_01_120530_create_tbl_allowances_table', 17),
(47, '2024_03_03_114247_create_tbl_employee_allowances_table', 18),
(48, '2024_03_15_132146_create_tbl_core_table', 19),
(50, '2024_03_16_064108_create_tbl_employee_rate_table', 20),
(52, '2024_04_07_072332_create_tbl_annoucement_table', 21),
(53, '2024_04_07_080309_create_tbl_user_announcement_table', 22),
(54, '2024_04_13_153520_create_tbl_time_record_table', 23),
(55, '2024_04_13_161136_create_tbl_task_monitor_table', 24),
(56, '2024_04_13_161607_create_tbl_child_task_table', 25),
(57, '2024_04_14_041956_create_tbl_user_control_table', 26),
(60, '2024_07_31_083010_create_tbl_employee_type_table', 27),
(62, '2024_07_31_083248_create_tbl_schedule_table', 28);

-- --------------------------------------------------------

--
-- Table structure for table `password_resets`
--

DROP TABLE IF EXISTS `password_resets`;
CREATE TABLE IF NOT EXISTS `password_resets` (
  `email` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  KEY `password_resets_email_index` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `personal_access_tokens`
--

DROP TABLE IF EXISTS `personal_access_tokens`;
CREATE TABLE IF NOT EXISTS `personal_access_tokens` (
  `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT,
  `tokenable_type` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `tokenable_id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL,
  `abilities` text COLLATE utf8mb4_unicode_ci,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
  KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`)
) ENGINE=InnoDB AUTO_INCREMENT=29 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `personal_access_tokens`
--

INSERT INTO `personal_access_tokens` (`id`, `tokenable_type`, `tokenable_id`, `name`, `token`, `abilities`, `last_used_at`, `created_at`, `updated_at`) VALUES
(2, 'App\\Models\\User', 9, 'emmanuel_12@gmail.com_User', 'f1c4900182211e7428a0693f4bc192f44a2c207bd197ea70966617ac51bb7e5c', '[\"server:employee\"]', '2024-04-13 08:11:07', '2024-04-13 07:32:48', '2024-04-13 08:11:07'),
(4, 'App\\Models\\User', 9, 'emmanuel_12@gmail.com_User', '72bbfe8c0b728580ac284e6b355ad3af9e401dea95bc34dff5e49972dc2a4db5', '[\"server:employee\"]', '2024-04-13 16:55:48', '2024-04-13 16:39:51', '2024-04-13 16:55:48'),
(26, 'App\\Models\\User', 1, 'admin@gmail.com_Admin', '310951f0c0f32f9d06e90bfa8d3337cf7fbb27b44e697057cb862e0af4f9d8e8', '[\"server:admin\"]', '2024-07-31 20:07:38', '2024-07-31 20:07:35', '2024-07-31 20:07:38'),
(27, 'App\\Models\\User', 1, 'admin@gmail.com_Admin', 'ae272eab2fc96d4ca0427ac0a183881a3524c1e02768e3e0bbb0ead887c82141', '[\"server:admin\"]', '2024-08-01 04:21:51', '2024-07-31 21:27:09', '2024-08-01 04:21:51'),
(28, 'App\\Models\\User', 1, 'admin@gmail.com_Admin', '3d7cca3519996a9e41cae00eb67e95657a06eca69e5c49310734dc1cd83c9dc3', '[\"server:admin\"]', '2024-08-01 06:34:53', '2024-08-01 06:33:17', '2024-08-01 06:34:53');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_allowances`
--

DROP TABLE IF EXISTS `tbl_allowances`;
CREATE TABLE IF NOT EXISTS `tbl_allowances` (
  `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT,
  `allowances_name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `tbl_allowances`
--

INSERT INTO `tbl_allowances` (`id`, `allowances_name`, `created_at`, `updated_at`) VALUES
(1, 'Rice', '2024-03-01 08:07:17', '2024-03-01 08:07:17'),
(3, 'Water', '2024-03-03 05:58:47', '2024-03-03 05:58:47'),
(4, 'Foods', '2024-03-03 07:29:41', '2024-03-03 07:29:41'),
(5, 'Coffee', '2024-03-05 18:20:32', '2024-03-15 22:52:10'),
(6, 'Travel Expenses', '2024-07-30 23:54:56', '2024-07-30 23:54:56');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_annoucement`
--

DROP TABLE IF EXISTS `tbl_annoucement`;
CREATE TABLE IF NOT EXISTS `tbl_annoucement` (
  `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT,
  `type_annountment` tinyint(4) NOT NULL DEFAULT '1',
  `title` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `date_annountment` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `message` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `file_upload` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `meeting_link` longtext COLLATE utf8mb4_unicode_ci,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_child_task`
--

DROP TABLE IF EXISTS `tbl_child_task`;
CREATE TABLE IF NOT EXISTS `tbl_child_task` (
  `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT,
  `task_monitor_fk` bigint(20) UNSIGNED NOT NULL,
  `to_user_fk` bigint(20) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `tbl_child_task_task_monitor_fk_foreign` (`task_monitor_fk`),
  KEY `tbl_child_task_to_user_fk_foreign` (`to_user_fk`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_company_info`
--

DROP TABLE IF EXISTS `tbl_company_info`;
CREATE TABLE IF NOT EXISTS `tbl_company_info` (
  `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT,
  `company_logo` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `company_name` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `company_color` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `company_code` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `company_tagline` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `tbl_company_info`
--

INSERT INTO `tbl_company_info` (`id`, `company_logo`, `company_name`, `company_color`, `company_code`, `company_tagline`, `created_at`, `updated_at`) VALUES
(1, 'Uploads/Logo/MAPUA UNIVERSITY.png', 'MAPUA UNIVERSITY', NULL, 'MAPUAK', 'Unlocking Solutions through Cutting-Edge Code', '2024-02-28 03:58:00', '2024-07-31 19:31:29');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_contribution`
--

DROP TABLE IF EXISTS `tbl_contribution`;
CREATE TABLE IF NOT EXISTS `tbl_contribution` (
  `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT,
  `sss` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `pagibig` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `philhealth` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `tin` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `user_fk` bigint(20) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `tbl_contribution_user_fk_foreign` (`user_fk`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `tbl_contribution`
--

INSERT INTO `tbl_contribution` (`id`, `sss`, `pagibig`, `philhealth`, `tin`, `user_fk`, `created_at`, `updated_at`) VALUES
(12, NULL, NULL, NULL, NULL, 20, '2024-07-31 05:04:15', '2024-07-31 05:04:15'),
(13, NULL, NULL, NULL, NULL, 21, '2024-07-31 05:05:34', '2024-07-31 05:05:34'),
(14, NULL, NULL, NULL, NULL, 22, '2024-07-31 05:07:09', '2024-07-31 05:07:09'),
(15, NULL, NULL, NULL, NULL, 23, '2024-07-31 05:08:00', '2024-07-31 05:08:00'),
(16, NULL, NULL, NULL, NULL, 24, '2024-07-31 19:11:51', '2024-07-31 19:11:51');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_core`
--

DROP TABLE IF EXISTS `tbl_core`;
CREATE TABLE IF NOT EXISTS `tbl_core` (
  `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT,
  `CoreName` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `tbl_core`
--

INSERT INTO `tbl_core` (`id`, `CoreName`, `description`, `created_at`, `updated_at`) VALUES
(3, 'Communication Skills', 'Written and Oral Communication are clear.', '2024-03-16 02:19:21', '2024-03-16 02:19:21');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_days`
--

DROP TABLE IF EXISTS `tbl_days`;
CREATE TABLE IF NOT EXISTS `tbl_days` (
  `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT,
  `days` int(11) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `tbl_days`
--

INSERT INTO `tbl_days` (`id`, `days`, `created_at`, `updated_at`) VALUES
(3, 262, '2024-02-27 22:45:48', '2024-07-31 16:59:18');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_department`
--

DROP TABLE IF EXISTS `tbl_department`;
CREATE TABLE IF NOT EXISTS `tbl_department` (
  `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT,
  `department` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` tinyint(4) NOT NULL DEFAULT '0',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `department` (`department`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `tbl_department`
--

INSERT INTO `tbl_department` (`id`, `department`, `status`, `created_at`, `updated_at`) VALUES
(2, 'Human Resource Department', 1, '2024-02-26 03:35:26', '2024-03-05 18:07:17'),
(5, 'Department Office Information Technology', 1, '2024-07-28 19:45:17', '2024-07-28 19:45:17'),
(6, 'Accounting Department', 1, '2024-07-30 21:59:30', '2024-07-31 19:17:04'),
(7, 'Technical Support Department', 1, '2024-07-30 21:59:58', '2024-07-30 21:59:58'),
(8, 'Business Management Department', 1, '2024-07-30 22:00:12', '2024-07-30 22:00:12'),
(9, 'Software Operation Department', 1, '2024-07-30 22:00:51', '2024-07-30 22:00:51'),
(10, 'Finance Department', 1, '2024-07-30 22:01:42', '2024-07-30 23:20:27'),
(11, 'Store Department', 1, '2024-07-30 22:02:03', '2024-07-30 22:02:03'),
(12, 'Research and Development Department', 1, '2024-07-30 22:02:28', '2024-07-30 22:02:28'),
(13, 'Customer Service Department', 1, '2024-07-30 22:02:56', '2024-07-30 22:02:56'),
(14, 'Security Department', 1, '2024-07-30 22:08:04', '2024-07-30 22:08:04'),
(16, 'Clinic Department', 1, '2024-07-31 04:58:21', '2024-07-31 04:58:21');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_email`
--

DROP TABLE IF EXISTS `tbl_email`;
CREATE TABLE IF NOT EXISTS `tbl_email` (
  `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT,
  `message_code` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `subject` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `text` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_fk_from` bigint(20) UNSIGNED NOT NULL,
  `user_fk_to` bigint(20) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `tbl_email_user_fk_from_foreign` (`user_fk_from`),
  KEY `tbl_email_user_fk_to_foreign` (`user_fk_to`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_employee`
--

DROP TABLE IF EXISTS `tbl_employee`;
CREATE TABLE IF NOT EXISTS `tbl_employee` (
  `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT,
  `employee_code` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `image_capture` longtext COLLATE utf8mb4_unicode_ci,
  `department_fk` bigint(20) UNSIGNED NOT NULL,
  `specific_role` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `monthly` double(10,2) NOT NULL,
  `per_day` double(10,2) NOT NULL,
  `user_fk` bigint(20) UNSIGNED NOT NULL,
  `company_fk` bigint(20) UNSIGNED NOT NULL,
  `employee_type_fk` bigint(20) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `tbl_employee_department_fk_foreign` (`department_fk`),
  KEY `tbl_employee_user_fk_foreign` (`user_fk`),
  KEY `company_fk` (`company_fk`),
  KEY `employee_type_fk` (`employee_type_fk`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `tbl_employee`
--

INSERT INTO `tbl_employee` (`id`, `employee_code`, `image_capture`, `department_fk`, `specific_role`, `monthly`, `per_day`, `user_fk`, `company_fk`, `employee_type_fk`, `created_at`, `updated_at`) VALUES
(12, '2024-0020', NULL, 5, 'Senior Software Developer', 27000.00, 1031.85, 20, 1, 1, '2024-07-31 05:04:15', '2024-07-31 05:04:15'),
(13, '2024-0021', NULL, 8, 'Head Marketing', 30000.00, 1146.50, 21, 1, 1, '2024-07-31 05:05:34', '2024-07-31 05:05:34'),
(14, '2024-0022', NULL, 6, 'Head Accounting', 35000.00, 1337.58, 22, 1, 1, '2024-07-31 05:07:08', '2024-07-31 05:07:08'),
(15, '2024-0023', NULL, 16, 'Nurse', 30000.00, 1146.50, 23, 1, 1, '2024-07-31 05:08:00', '2024-07-31 05:08:00'),
(16, '2024-0024', NULL, 5, 'QA', 30000.00, 1374.05, 24, 1, 1, '2024-07-31 19:11:51', '2024-07-31 19:11:51');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_employee_allowances`
--

DROP TABLE IF EXISTS `tbl_employee_allowances`;
CREATE TABLE IF NOT EXISTS `tbl_employee_allowances` (
  `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT,
  `amount` double(10,2) NOT NULL,
  `allowance_fk` bigint(20) UNSIGNED NOT NULL,
  `user_fk` bigint(20) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `tbl_employee_allowances_allowance_fk_foreign` (`allowance_fk`),
  KEY `tbl_employee_allowances_user_fk_foreign` (`user_fk`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_employee_rate`
--

DROP TABLE IF EXISTS `tbl_employee_rate`;
CREATE TABLE IF NOT EXISTS `tbl_employee_rate` (
  `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT,
  `core_id` bigint(20) UNSIGNED NOT NULL,
  `user_employee_fk` bigint(20) UNSIGNED DEFAULT NULL,
  `user_employeer_fk` bigint(20) UNSIGNED DEFAULT NULL,
  `comments` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `rate_num` tinyint(4) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `tbl_employee_rate_core_id_foreign` (`core_id`),
  KEY `tbl_employee_rate_user_employee_fk_foreign` (`user_employee_fk`),
  KEY `tbl_employee_rate_user_employeer_fk_foreign` (`user_employeer_fk`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_employee_type`
--

DROP TABLE IF EXISTS `tbl_employee_type`;
CREATE TABLE IF NOT EXISTS `tbl_employee_type` (
  `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT,
  `employee_type` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` tinyint(4) NOT NULL DEFAULT '1',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `tbl_employee_type_employee_type_unique` (`employee_type`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `tbl_employee_type`
--

INSERT INTO `tbl_employee_type` (`id`, `employee_type`, `status`, `created_at`, `updated_at`) VALUES
(1, 'Full Time', 1, '2024-07-31 04:52:34', '2024-07-31 04:52:34'),
(2, 'Part Time', 1, '2024-07-31 04:52:45', '2024-07-31 04:52:45'),
(3, 'OJT', 1, '2024-07-31 04:52:51', '2024-07-31 04:52:51'),
(4, 'GIG', 1, '2024-07-31 19:16:06', '2024-07-31 19:16:06');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_events`
--

DROP TABLE IF EXISTS `tbl_events`;
CREATE TABLE IF NOT EXISTS `tbl_events` (
  `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT,
  `date_event` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `event_title` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `type_event` text COLLATE utf8mb4_unicode_ci,
  `meeting_link` text COLLATE utf8mb4_unicode_ci,
  `description` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `tbl_events`
--

INSERT INTO `tbl_events` (`id`, `date_event`, `event_title`, `type_event`, `meeting_link`, `description`, `created_at`, `updated_at`) VALUES
(1, 'February 14 2024', 'Valentines Day', 'Legal Holiday', NULL, NULL, '2024-02-27 02:58:11', '2024-02-27 02:58:11'),
(2, 'February 15 2024', 'Birthday', 'Special Holiday', NULL, NULL, '2024-02-27 06:24:30', '2024-02-27 06:24:30'),
(3, 'February 29 2024', 'Birthday', 'Legal Holiday', NULL, NULL, '2024-02-28 06:26:54', '2024-02-28 06:26:54'),
(4, 'February 14 2024', 'Way Forever', 'Legal Holiday', NULL, NULL, '2024-02-29 05:19:02', '2024-02-29 05:19:02'),
(5, 'November 14 2029', 'Birthday ni Pogi Reul', 'Special Holiday', NULL, NULL, '2024-02-29 05:23:13', '2024-02-29 05:23:13');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_holidays`
--

DROP TABLE IF EXISTS `tbl_holidays`;
CREATE TABLE IF NOT EXISTS `tbl_holidays` (
  `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT,
  `holiday_name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `rate_day` double NOT NULL,
  `holiday_date` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `type_holiday` tinyint(4) NOT NULL DEFAULT '0',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `tbl_holidays`
--

INSERT INTO `tbl_holidays` (`id`, `holiday_name`, `rate_day`, `holiday_date`, `type_holiday`, `created_at`, `updated_at`) VALUES
(11, 'Birthday ni Pogi Reul', 1000, 'November 01 2022', 2, '2024-02-29 05:23:13', '2024-03-04 04:47:03');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_logs`
--

DROP TABLE IF EXISTS `tbl_logs`;
CREATE TABLE IF NOT EXISTS `tbl_logs` (
  `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT,
  `description` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_fk` bigint(20) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `tbl_logs_user_fk_foreign` (`user_fk`)
) ENGINE=InnoDB AUTO_INCREMENT=167 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `tbl_logs`
--

INSERT INTO `tbl_logs` (`id`, `description`, `user_fk`, `created_at`, `updated_at`) VALUES
(1, 'Human Resource Department Created', 1, '2024-02-26 03:35:26', '2024-02-26 03:35:26'),
(2, 'IT Department Change Status into Deactive', 1, '2024-02-26 03:36:06', '2024-02-26 03:36:06'),
(3, 'IT Department Change Status into Active', 1, '2024-02-26 03:36:39', '2024-02-26 03:36:39'),
(4, 'Human Resource Department Change Status into Deactive', 1, '2024-02-26 03:46:33', '2024-02-26 03:46:33'),
(5, 'Human Resource Department Change Status into Active', 1, '2024-02-26 03:46:46', '2024-02-26 03:46:46'),
(6, 'SSS Contribution Added 0 - 4250', 1, '2024-02-26 20:06:12', '2024-02-26 20:06:12'),
(7, 'SSS Contribution Added 4250 - 4749.99', 1, '2024-02-26 20:14:07', '2024-02-26 20:14:07'),
(8, 'SSS Contribution Added 0 - 4250', 1, '2024-02-26 20:16:10', '2024-02-26 20:16:10'),
(9, 'SSS Contribution Added 4250 - 4749', 1, '2024-02-26 20:18:08', '2024-02-26 20:18:08'),
(10, 'SSS Contribution Added 4750 - 5249.99', 1, '2024-02-26 20:19:38', '2024-02-26 20:19:38'),
(11, 'SSS Contribution Added 0 - 4250', 1, '2024-02-26 21:36:10', '2024-02-26 21:36:10'),
(12, 'Pagibig Contribution Added  - ', 1, '2024-02-26 22:03:18', '2024-02-26 22:03:18'),
(13, 'Pagibig Contribution Update', 1, '2024-02-26 22:15:16', '2024-02-26 22:15:16'),
(14, 'Pagibig Contribution Update', 1, '2024-02-26 22:15:24', '2024-02-26 22:15:24'),
(15, 'Pagibig Contribution Update', 1, '2024-02-26 22:17:35', '2024-02-26 22:17:35'),
(16, 'Pagibig Contribution Update', 1, '2024-02-26 22:17:40', '2024-02-26 22:17:40'),
(17, 'Philhealth Contribution Added  - ', 1, '2024-02-26 22:39:37', '2024-02-26 22:39:37'),
(18, 'Philhealth Data Updated', 1, '2024-02-26 22:49:38', '2024-02-26 22:49:38'),
(19, 'Philhealth Data Updated', 1, '2024-02-26 22:49:57', '2024-02-26 22:49:57'),
(20, 'Human Resource Department Change Status into Deactive', 1, '2024-02-27 01:42:25', '2024-02-27 01:42:25'),
(21, 'Human Resource Department Change Status into Active', 1, '2024-02-27 01:42:27', '2024-02-27 01:42:27'),
(22, '341 Registered in System', 1, '2024-02-27 04:06:40', '2024-02-27 04:06:40'),
(23, 'Human Resource Department Change Status into Deactive', 1, '2024-02-27 06:18:51', '2024-02-27 06:18:51'),
(24, 'Human Resource Department Change Status into Active', 1, '2024-02-27 06:19:10', '2024-02-27 06:19:10'),
(25, 'Pagibig Contribution Added  - ', 1, '2024-02-27 06:28:43', '2024-02-27 06:28:43'),
(26, 'Pagibig Contribution Update', 1, '2024-02-27 06:30:05', '2024-02-27 06:30:05'),
(27, 'Created Feb 15th Salary Period', 1, '2024-02-27 07:41:03', '2024-02-27 07:41:03'),
(28, 'Created Feb 29th Salary Period', 1, '2024-02-27 07:41:17', '2024-02-27 07:41:17'),
(29, 'Created Feb 15th Salary Period', 1, '2024-02-27 07:41:58', '2024-02-27 07:41:58'),
(30, 'Created Mar 30th Salary Period', 1, '2024-02-27 07:42:31', '2024-02-27 07:42:31'),
(31, 'Updated Salary Period ', 1, '2024-02-27 08:27:59', '2024-02-27 08:27:59'),
(32, 'Updated Salary Period ', 1, '2024-02-27 08:28:57', '2024-02-27 08:28:57'),
(33, 'Human Resource Department Change Status into Deactive', 1, '2024-02-27 08:33:12', '2024-02-27 08:33:12'),
(34, 'Human Resource Department Change Status into Active', 1, '2024-02-27 08:33:26', '2024-02-27 08:33:26'),
(35, 'Created Feb 15th Salary Period', 1, '2024-02-27 08:36:57', '2024-02-27 08:36:57'),
(36, 'Updated Salary Period ', 1, '2024-02-27 08:37:30', '2024-02-27 08:37:30'),
(37, 'Created Feb 15th Salary Period', 1, '2024-02-27 08:44:00', '2024-02-27 08:44:00'),
(38, 'Created Feb 15th Salary Period', 1, '2024-02-27 09:03:05', '2024-02-27 09:03:05'),
(39, 'Updated Salary Period ', 1, '2024-02-27 16:43:01', '2024-02-27 16:43:01'),
(40, 'Updated Salary Period ', 1, '2024-02-27 16:43:51', '2024-02-27 16:43:51'),
(41, 'Registered Georgie Mordeno Recabo', 1, '2024-02-27 19:29:38', '2024-02-27 19:29:38'),
(42, 'Registered Adrienne Richardson Pandaa Imelda Conner', 1, '2024-02-27 19:32:45', '2024-02-27 19:32:45'),
(43, 'Human Resource Department Change Status into Deactive', 1, '2024-02-27 21:37:17', '2024-02-27 21:37:17'),
(44, 'Human Resource Department Change Status into Active', 1, '2024-02-27 21:37:34', '2024-02-27 21:37:34'),
(45, 'Number of Days in System has been updated', 1, '2024-02-27 21:57:04', '2024-02-27 21:57:04'),
(46, 'Number of Days in System has been updated', 1, '2024-02-27 22:31:03', '2024-02-27 22:31:03'),
(47, 'Number of Days in System has been updated', 1, '2024-02-27 22:31:36', '2024-02-27 22:31:36'),
(48, 'Number of Days in System has been updated', 1, '2024-02-27 22:31:59', '2024-02-27 22:31:59'),
(49, 'Number of Days in System has been updated', 1, '2024-02-27 22:32:15', '2024-02-27 22:32:15'),
(50, 'Number of Days in System has been updated', 1, '2024-02-27 22:32:32', '2024-02-27 22:32:32'),
(51, '213 Registered in System', 1, '2024-02-27 22:43:22', '2024-02-27 22:43:22'),
(52, '262 Registered in System', 1, '2024-02-27 22:45:48', '2024-02-27 22:45:48'),
(53, 'Number of Days in System has been updated', 1, '2024-02-28 00:13:53', '2024-02-28 00:13:53'),
(54, 'Number of Days in System has been updated', 1, '2024-02-28 00:16:08', '2024-02-28 00:16:08'),
(55, 'Human Resource Department Change Status into Deactive', 1, '2024-02-28 06:24:15', '2024-02-28 06:24:15'),
(56, 'Human Resource Department Change Status into Active', 1, '2024-02-28 06:24:31', '2024-02-28 06:24:31'),
(57, 'Number of Days in System has been updated', 1, '2024-02-28 06:30:13', '2024-02-28 06:30:13'),
(58, 'Number of Days in System has been updated', 1, '2024-02-28 06:30:56', '2024-02-28 06:30:56'),
(59, 'Created Feb 29th Salary Period', 1, '2024-02-28 06:40:04', '2024-02-28 06:40:04'),
(60, 'Pagibig Contribution Added  - ', 1, '2024-02-28 09:17:24', '2024-02-28 09:17:24'),
(62, 'Created Feb 29th Salary Period', 1, '2024-02-29 05:19:34', '2024-02-29 05:19:34'),
(63, 'Updated Salary Period ', 1, '2024-02-29 05:19:49', '2024-02-29 05:19:49'),
(64, 'Number of Days in System has been updated', 1, '2024-02-29 05:24:08', '2024-02-29 05:24:08'),
(65, 'Department Para sa mga Pogi Created', 1, '2024-02-29 05:24:40', '2024-02-29 05:24:40'),
(66, 'Department Para sa mga Pogi Change Status into Deactive', 1, '2024-02-29 05:24:55', '2024-02-29 05:24:55'),
(67, 'Number of Days in System has been updated', 1, '2024-02-29 18:07:39', '2024-02-29 18:07:39'),
(68, 'Time PeriodLate has been added', 1, '2024-03-01 05:12:53', '2024-03-01 05:12:53'),
(69, 'Time Period Update fromLatetoLate', 1, '2024-03-01 07:27:01', '2024-03-01 07:27:01'),
(70, 'Time Period Update fromOvertimetoOvertime', 1, '2024-03-01 07:27:50', '2024-03-01 07:27:50'),
(71, 'Time Period Update fromOvertimetoOvertime', 1, '2024-03-01 07:28:11', '2024-03-01 07:28:11'),
(72, 'Time PeriodLate has been added', 1, '2024-03-01 07:28:29', '2024-03-01 07:28:29'),
(73, 'Time PeriodUndertime has been added', 1, '2024-03-01 07:28:40', '2024-03-01 07:28:40'),
(74, 'Time PeriodOvertime has been added', 1, '2024-03-01 07:28:55', '2024-03-01 07:28:55'),
(75, 'Time PeriodLunch Break has been added', 1, '2024-03-01 07:30:13', '2024-03-01 07:30:13'),
(76, 'Allowances Added', 1, '2024-03-01 08:07:17', '2024-03-01 08:07:17'),
(77, 'Allowances Added', 1, '2024-03-01 08:07:26', '2024-03-01 08:07:26'),
(78, 'Update  toCoffee1', 1, '2024-03-01 08:09:51', '2024-03-01 08:09:51'),
(81, 'Registered Sandra Virginia Inga', 1, '2024-03-02 02:32:22', '2024-03-02 02:32:22'),
(86, 'Allowances Added', 1, '2024-03-03 05:58:47', '2024-03-03 05:58:47'),
(88, 'Allowances Added', 1, '2024-03-03 07:29:41', '2024-03-03 07:29:41'),
(89, 'Number of Days in System has been updated', 1, '2024-03-03 07:32:02', '2024-03-03 07:32:02'),
(91, 'Number of Days in System has been updated', 1, '2024-03-05 18:06:12', '2024-03-05 18:06:12'),
(92, 'Human Resource Department Change Status into Deactive', 1, '2024-03-05 18:06:57', '2024-03-05 18:06:57'),
(93, 'Human Resource Department Change Status into Active', 1, '2024-03-05 18:07:17', '2024-03-05 18:07:17'),
(95, 'Allowances Added', 1, '2024-03-05 18:20:33', '2024-03-05 18:20:33'),
(97, 'Registered Emmanuel Anthony Christine', 1, '2024-03-06 04:20:57', '2024-03-06 04:20:57'),
(98, 'Registered Core Name Quality of Work', 1, '2024-03-15 05:55:32', '2024-03-15 05:55:32'),
(99, 'Registered Core Name Time', 1, '2024-03-15 21:14:23', '2024-03-15 21:14:23'),
(101, 'Update  toCoffee', 1, '2024-03-15 22:52:10', '2024-03-15 22:52:10'),
(103, 'Registered Core Name Communication Skills', 1, '2024-03-16 02:19:21', '2024-03-16 02:19:21'),
(106, 'Number of Days in System has been updated', 1, '2024-03-27 05:11:01', '2024-03-27 05:11:01'),
(107, 'Number of Days in System has been updated', 1, '2024-03-27 05:11:33', '2024-03-27 05:11:33'),
(109, 'Department Para sa mga Pogi Change Status into Active', 1, '2024-04-07 00:56:45', '2024-04-07 00:56:45'),
(110, 'Department Para sa mga Pogi Change Status into Deactive', 1, '2024-05-07 17:31:51', '2024-05-07 17:31:51'),
(111, 'Number of Days in System has been updated', 1, '2024-05-07 17:34:17', '2024-05-07 17:34:17'),
(112, 'Number of Days in System has been updated', 1, '2024-05-16 20:57:26', '2024-05-16 20:57:26'),
(113, 'Number of Days in System has been updated', 1, '2024-05-16 20:58:21', '2024-05-16 20:58:21'),
(114, 'Registered Georgie  Recabo', 1, '2024-07-03 00:05:00', '2024-07-03 00:05:00'),
(115, 'Registered Sample  Daryl', 1, '2024-07-03 00:07:40', '2024-07-03 00:07:40'),
(116, 'Number of Days in System has been updated', 1, '2024-07-03 00:27:31', '2024-07-03 00:27:31'),
(117, 'Number of Days in System has been updated', 1, '2024-07-03 00:27:39', '2024-07-03 00:27:39'),
(118, 'Department Para sa mga Pogi Change Status into Active', 1, '2024-07-28 19:07:37', '2024-07-28 19:07:37'),
(119, 'human resources department Created', 1, '2024-07-28 19:27:23', '2024-07-28 19:27:23'),
(120, 'Department Office Information Technology Created', 1, '2024-07-28 19:45:17', '2024-07-28 19:45:17'),
(121, 'Accounting Department Created', 1, '2024-07-30 21:59:30', '2024-07-30 21:59:30'),
(122, 'Technical Support Department Created', 1, '2024-07-30 21:59:58', '2024-07-30 21:59:58'),
(123, 'Business Management Department Created', 1, '2024-07-30 22:00:12', '2024-07-30 22:00:12'),
(124, 'Software Operation Department Created', 1, '2024-07-30 22:00:51', '2024-07-30 22:00:51'),
(125, 'Finance Department Created', 1, '2024-07-30 22:01:42', '2024-07-30 22:01:42'),
(126, 'Store Department Created', 1, '2024-07-30 22:02:03', '2024-07-30 22:02:03'),
(127, 'Research and Development Department Created', 1, '2024-07-30 22:02:28', '2024-07-30 22:02:28'),
(128, 'Customer Service Department Created', 1, '2024-07-30 22:02:56', '2024-07-30 22:02:56'),
(129, 'Security Department Created', 1, '2024-07-30 22:08:04', '2024-07-30 22:08:04'),
(130, 'Registered Georgie Mordeno Recabo', 1, '2024-07-30 22:32:39', '2024-07-30 22:32:39'),
(131, 'Registered Kate  Alcazar', 1, '2024-07-30 22:54:08', '2024-07-30 22:54:08'),
(132, 'Registered Krystianne  Poculan', 1, '2024-07-30 22:56:40', '2024-07-30 22:56:40'),
(133, 'Finance Department Change Status into Deactive', 1, '2024-07-30 23:20:17', '2024-07-30 23:20:17'),
(134, 'Finance Department Change Status into Active', 1, '2024-07-30 23:20:27', '2024-07-30 23:20:27'),
(135, 'Created Jul 15th Salary Period', 1, '2024-07-30 23:27:52', '2024-07-30 23:27:52'),
(136, 'Updated Salary Period ', 1, '2024-07-30 23:27:59', '2024-07-30 23:27:59'),
(137, 'Created Jul 31st Salary Period', 1, '2024-07-30 23:28:17', '2024-07-30 23:28:17'),
(138, 'Created Jul 15th Salary Period', 1, '2024-07-30 23:33:03', '2024-07-30 23:33:03'),
(139, 'Created Aug 15th Salary Period', 1, '2024-07-30 23:33:33', '2024-07-30 23:33:33'),
(140, 'Created Aug 31st Salary Period', 1, '2024-07-30 23:34:14', '2024-07-30 23:34:14'),
(141, 'Registered Roland  Escobar', 1, '2024-07-30 23:38:50', '2024-07-30 23:38:50'),
(142, 'Allowances Added', 1, '2024-07-30 23:54:56', '2024-07-30 23:54:56'),
(143, 'Employee TypePart TimeAdded', 1, '2024-07-31 02:22:34', '2024-07-31 02:22:34'),
(144, 'Employee TypeOJTAdded', 1, '2024-07-31 02:25:58', '2024-07-31 02:25:58'),
(145, 'Employee TypeGIGAdded', 1, '2024-07-31 02:28:02', '2024-07-31 02:28:02'),
(146, 'Employee TypedawAdded', 1, '2024-07-31 02:29:27', '2024-07-31 02:29:27'),
(147, 'Employee TypedawdawdawdAdded', 1, '2024-07-31 02:30:02', '2024-07-31 02:30:02'),
(148, 'Employee TypeawdAdded', 1, '2024-07-31 02:30:43', '2024-07-31 02:30:43'),
(149, 'Employee TypeFull TimeAdded', 1, '2024-07-31 04:21:15', '2024-07-31 04:21:15'),
(150, 'Employee TypePart TimeAdded', 1, '2024-07-31 04:23:35', '2024-07-31 04:23:35'),
(151, 'Employee TypeOJTAdded', 1, '2024-07-31 04:25:34', '2024-07-31 04:25:34'),
(152, 'Employee TypeFull TimeAdded', 1, '2024-07-31 04:52:35', '2024-07-31 04:52:35'),
(153, 'Employee TypePart TimeAdded', 1, '2024-07-31 04:52:45', '2024-07-31 04:52:45'),
(154, 'Employee TypeOJTAdded', 1, '2024-07-31 04:52:51', '2024-07-31 04:52:51'),
(155, 'Clinic Department Created', 1, '2024-07-31 04:57:36', '2024-07-31 04:57:36'),
(156, 'Clinic Department Created', 1, '2024-07-31 04:58:21', '2024-07-31 04:58:21'),
(157, 'Registered Rey  Hebron', 1, '2024-07-31 04:59:27', '2024-07-31 04:59:27'),
(158, 'Registered Georgie  Recabo', 1, '2024-07-31 05:04:15', '2024-07-31 05:04:15'),
(159, 'Registered Kate  Alcazar', 1, '2024-07-31 05:05:34', '2024-07-31 05:05:34'),
(160, 'Registered Krystianne  Poculan', 1, '2024-07-31 05:07:09', '2024-07-31 05:07:09'),
(161, 'Registered Rey  Hebron', 1, '2024-07-31 05:08:00', '2024-07-31 05:08:00'),
(162, 'Number of Days in System has been updated', 1, '2024-07-31 16:59:18', '2024-07-31 16:59:18'),
(163, 'Registered Jayson Sta. Rita Matuguinas', 1, '2024-07-31 19:11:51', '2024-07-31 19:11:51'),
(164, 'Employee TypeGIGAdded', 1, '2024-07-31 19:16:06', '2024-07-31 19:16:06'),
(165, 'Accounting Department Change Status into Deactive', 1, '2024-07-31 19:16:48', '2024-07-31 19:16:48'),
(166, 'Accounting Department Change Status into Active', 1, '2024-07-31 19:17:04', '2024-07-31 19:17:04');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_pagibig`
--

DROP TABLE IF EXISTS `tbl_pagibig`;
CREATE TABLE IF NOT EXISTS `tbl_pagibig` (
  `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT,
  `from` double(10,2) NOT NULL,
  `to` double(10,2) NOT NULL,
  `employee_share` double(10,2) NOT NULL,
  `employers_share` double(10,2) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_person_address`
--

DROP TABLE IF EXISTS `tbl_person_address`;
CREATE TABLE IF NOT EXISTS `tbl_person_address` (
  `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_person_details`
--

DROP TABLE IF EXISTS `tbl_person_details`;
CREATE TABLE IF NOT EXISTS `tbl_person_details` (
  `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT,
  `current_adr` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `perma_adr` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `contact` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `birthdate` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_fk` bigint(20) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `tbl_person_details_user_fk_foreign` (`user_fk`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `tbl_person_details`
--

INSERT INTO `tbl_person_details` (`id`, `current_adr`, `perma_adr`, `contact`, `birthdate`, `user_fk`, `created_at`, `updated_at`) VALUES
(17, 'Quirino City', 'P-27 Baan Km3 Butuan City', '09983462387', 'Jul 16 2024', 20, '2024-07-31 05:04:15', '2024-07-31 05:04:15'),
(18, 'Iligan City', 'Iligan City', '09892374892', 'Jul 18 2024', 21, '2024-07-31 05:05:34', '2024-07-31 05:05:34'),
(19, 'Iligan City', 'Iligan City', '09423908748', 'Jul 17 2024', 22, '2024-07-31 05:07:08', '2024-07-31 05:07:08'),
(20, 'Cebu City', 'Zamboanga City', '09389472389', 'Jul 04 2024', 23, '2024-07-31 05:08:00', '2024-07-31 05:08:00'),
(21, 'Manial', 'Manila', '09760723658', 'Nov 15 2000', 24, '2024-07-31 19:11:51', '2024-07-31 19:11:51');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_philhealth`
--

DROP TABLE IF EXISTS `tbl_philhealth`;
CREATE TABLE IF NOT EXISTS `tbl_philhealth` (
  `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT,
  `from` double NOT NULL,
  `to` double NOT NULL,
  `premium_rate` double NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_salary_period`
--

DROP TABLE IF EXISTS `tbl_salary_period`;
CREATE TABLE IF NOT EXISTS `tbl_salary_period` (
  `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT,
  `salary_period` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `from_date` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `end_date` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `tbl_salary_period`
--

INSERT INTO `tbl_salary_period` (`id`, `salary_period`, `from_date`, `end_date`, `created_at`, `updated_at`) VALUES
(10, 'Jul 15th Salary Period', '07 01 2024', '07 15 2024', '2024-07-30 23:27:52', '2024-07-30 23:27:59'),
(11, 'Jul 31st Salary Period', 'Jul 15 2024', 'Jul 31 2024', '2024-07-30 23:28:16', '2024-07-30 23:28:16'),
(13, 'Aug 15th Salary Period', 'Aug 01 2024', 'Aug 15 2024', '2024-07-30 23:33:33', '2024-07-30 23:33:33'),
(14, 'Aug 31st Salary Period', 'Aug 15 2024', 'Aug 31 2024', '2024-07-30 23:34:14', '2024-07-30 23:34:14');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_schedule`
--

DROP TABLE IF EXISTS `tbl_schedule`;
CREATE TABLE IF NOT EXISTS `tbl_schedule` (
  `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT,
  `schedule_name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_fk` bigint(20) UNSIGNED DEFAULT NULL,
  `monday_start` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `monday_end` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `tuesday_start` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `tuesday_end` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `wednesday_start` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `wednesday_end` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `thursday_start` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `thursday_end` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `friday_start` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `friday_end` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `saturday_start` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `saturday_end` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `sunday_start` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `sunday_end` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `lunch_start` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `lunch_end` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `tbl_schedule_schedule_name_unique` (`schedule_name`),
  KEY `tbl_schedule_user_fk_foreign` (`user_fk`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_sss`
--

DROP TABLE IF EXISTS `tbl_sss`;
CREATE TABLE IF NOT EXISTS `tbl_sss` (
  `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT,
  `rangefrom` double(10,2) NOT NULL,
  `rangeto` double(10,2) NOT NULL,
  `ER` double(10,2) NOT NULL,
  `EE` double(10,2) NOT NULL,
  `total` double(10,2) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `tbl_sss`
--

INSERT INTO `tbl_sss` (`id`, `rangefrom`, `rangeto`, `ER`, `EE`, `total`, `created_at`, `updated_at`) VALUES
(2, 4250.00, 4749.00, 202.50, 427.50, 630.00, '2024-02-26 20:18:08', '2024-02-26 20:18:08'),
(3, 4750.00, 5249.99, 475.00, 225.00, 700.00, '2024-02-26 20:19:38', '2024-02-26 20:19:38'),
(4, 0.00, 4250.00, 180.00, 380.00, 560.00, '2024-02-26 21:36:10', '2024-02-26 21:36:10');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_task_monitor`
--

DROP TABLE IF EXISTS `tbl_task_monitor`;
CREATE TABLE IF NOT EXISTS `tbl_task_monitor` (
  `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT,
  `from_user_fk` bigint(20) UNSIGNED NOT NULL,
  `task_name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` tinyint(4) NOT NULL DEFAULT '0',
  `start_date` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `end_date` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `rate` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `duration` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `priority` tinyint(4) NOT NULL DEFAULT '0',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `tbl_task_monitor_from_user_fk_foreign` (`from_user_fk`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_time_period`
--

DROP TABLE IF EXISTS `tbl_time_period`;
CREATE TABLE IF NOT EXISTS `tbl_time_period` (
  `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT,
  `time_period_name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `time_mins` bigint(20) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `tbl_time_period`
--

INSERT INTO `tbl_time_period` (`id`, `time_period_name`, `time_mins`, `created_at`, `updated_at`) VALUES
(2, 'Late', 15, '2024-03-01 07:28:28', '2024-03-01 07:28:28'),
(3, 'Undertime', 30, '2024-03-01 07:28:40', '2024-03-01 07:28:40'),
(4, 'Overtime', 30, '2024-03-01 07:28:55', '2024-03-01 07:28:55'),
(5, 'Lunch Break', 60, '2024-03-01 07:30:13', '2024-03-01 07:30:13');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_time_record`
--

DROP TABLE IF EXISTS `tbl_time_record`;
CREATE TABLE IF NOT EXISTS `tbl_time_record` (
  `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT,
  `user_fk` bigint(20) UNSIGNED NOT NULL,
  `time_in` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `lunch_break_in` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `lunch_break_out` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `time_out` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `is_holiday` tinyint(4) NOT NULL DEFAULT '0',
  `is_rest_day` tinyint(4) NOT NULL DEFAULT '0',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `tbl_time_record_user_fk_foreign` (`user_fk`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_user_announcement`
--

DROP TABLE IF EXISTS `tbl_user_announcement`;
CREATE TABLE IF NOT EXISTS `tbl_user_announcement` (
  `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT,
  `user_announce_fk` bigint(20) UNSIGNED NOT NULL,
  `user_fk` bigint(20) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `tbl_user_announcement_user_announce_fk_foreign` (`user_announce_fk`),
  KEY `tbl_user_announcement_user_fk_foreign` (`user_fk`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_user_control`
--

DROP TABLE IF EXISTS `tbl_user_control`;
CREATE TABLE IF NOT EXISTS `tbl_user_control` (
  `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT,
  `user_fk` bigint(20) UNSIGNED NOT NULL,
  `task_access` tinyint(4) NOT NULL DEFAULT '0',
  `task_monitor` tinyint(4) NOT NULL DEFAULT '0',
  `create_announcement` tinyint(4) NOT NULL DEFAULT '0',
  `create_meeting` tinyint(4) NOT NULL DEFAULT '0',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `tbl_user_control_user_fk_foreign` (`user_fk`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `tbl_user_control`
--

INSERT INTO `tbl_user_control` (`id`, `user_fk`, `task_access`, `task_monitor`, `create_announcement`, `create_meeting`, `created_at`, `updated_at`) VALUES
(10, 20, 0, 0, 0, 0, '2024-07-31 05:04:15', '2024-07-31 05:04:15'),
(11, 21, 0, 0, 0, 0, '2024-07-31 05:05:34', '2024-07-31 05:05:34'),
(12, 22, 0, 0, 0, 0, '2024-07-31 05:07:09', '2024-07-31 05:07:09'),
(13, 23, 0, 0, 0, 0, '2024-07-31 05:08:00', '2024-07-31 05:08:00'),
(14, 24, 0, 0, 0, 0, '2024-07-31 19:11:51', '2024-07-31 19:11:51');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `first_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `middle_name` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `last_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `secretkey` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `role` tinyint(4) NOT NULL,
  `status` int(11) NOT NULL DEFAULT '0',
  `remember_token` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `users_email_unique` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `first_name`, `middle_name`, `last_name`, `email_verified_at`, `password`, `secretkey`, `role`, `status`, `remember_token`, `created_at`, `updated_at`) VALUES
(1, 'Admin', 'admin@gmail.com', '', NULL, '', NULL, '$2y$10$qsFKTQZmw6Fx.7teuFIwMuxdqPYb7gbdOHVJcNNdPNRl7vo1LLHAq', 'hackfb123', 1, 1, NULL, NULL, NULL),
(20, 'Georgie  Recabo', 'artamay1@gmail.com', 'Georgie', NULL, 'Recabo', NULL, '$2y$10$yaePhLuiyNQHdcmJgfW8cOtQ7j9o1qBMY6X0gSTr2RBkmdj7gmFdu', 'Recabo', 4, 1, NULL, '2024-07-31 05:04:15', '2024-07-31 05:04:15'),
(21, 'Kate  Alcazar', 'kate_alcasaar@gmail.com', 'Kate', NULL, 'Alcazar', NULL, '$2y$10$6kpHWXzlnzfIvB2qrrjy6uaXAwATnB7mN3Y7vwqyL4Wja7yaqT.ga', 'Alcazar', 4, 1, NULL, '2024-07-31 05:05:34', '2024-07-31 05:05:34'),
(22, 'Krystianne  Poculan', 'krystianne_poculan@gmail.com', 'Krystianne', NULL, 'Poculan', NULL, '$2y$10$BTMNF5iDnEcJpy27BFEbQeqGUGqiDmVlXj.Vr9IxtVgm5dlgkdMYO', 'Poculan', 4, 1, NULL, '2024-07-31 05:07:08', '2024-07-31 05:07:08'),
(23, 'Rey  Hebron', 'rey_hebron@gmail.com', 'Rey', NULL, 'Hebron', NULL, '$2y$10$omPE2m8ApyeWesaY.zwz6ezmN2lUJOWdL5/FBFnYkHH.Su8W68e0q', 'Hebron', 4, 1, NULL, '2024-07-31 05:08:00', '2024-07-31 05:08:00'),
(24, 'Jayson Sta. Rita Matuguinas', 'jsmatuguinas@mapua.edu.ph', 'Jayson', 'Sta. Rita', 'Matuguinas', NULL, '$2y$10$UIAFo2OOAD6z.Q346K6Yiuiht3BJK8wudthRUD5ZiUq2I3RMoDcN6', 'Matuguinas', 4, 1, NULL, '2024-07-31 19:11:51', '2024-07-31 19:11:51');

--
-- Constraints for dumped tables
--

--
-- Constraints for table `tbl_child_task`
--
ALTER TABLE `tbl_child_task`
  ADD CONSTRAINT `tbl_child_task_task_monitor_fk_foreign` FOREIGN KEY (`task_monitor_fk`) REFERENCES `tbl_task_monitor` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `tbl_child_task_to_user_fk_foreign` FOREIGN KEY (`to_user_fk`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `tbl_contribution`
--
ALTER TABLE `tbl_contribution`
  ADD CONSTRAINT `tbl_contribution_user_fk_foreign` FOREIGN KEY (`user_fk`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `tbl_email`
--
ALTER TABLE `tbl_email`
  ADD CONSTRAINT `tbl_email_user_fk_from_foreign` FOREIGN KEY (`user_fk_from`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `tbl_email_user_fk_to_foreign` FOREIGN KEY (`user_fk_to`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `tbl_employee`
--
ALTER TABLE `tbl_employee`
  ADD CONSTRAINT `tbl_employee_department_fk_foreign` FOREIGN KEY (`department_fk`) REFERENCES `tbl_department` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `tbl_employee_ibfk_1` FOREIGN KEY (`company_fk`) REFERENCES `tbl_company_info` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `tbl_employee_ibfk_2` FOREIGN KEY (`employee_type_fk`) REFERENCES `tbl_employee_type` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `tbl_employee_user_fk_foreign` FOREIGN KEY (`user_fk`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `tbl_employee_allowances`
--
ALTER TABLE `tbl_employee_allowances`
  ADD CONSTRAINT `tbl_employee_allowances_allowance_fk_foreign` FOREIGN KEY (`allowance_fk`) REFERENCES `tbl_allowances` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `tbl_employee_allowances_user_fk_foreign` FOREIGN KEY (`user_fk`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `tbl_employee_rate`
--
ALTER TABLE `tbl_employee_rate`
  ADD CONSTRAINT `tbl_employee_rate_core_id_foreign` FOREIGN KEY (`core_id`) REFERENCES `tbl_core` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `tbl_employee_rate_user_employee_fk_foreign` FOREIGN KEY (`user_employee_fk`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `tbl_employee_rate_user_employeer_fk_foreign` FOREIGN KEY (`user_employeer_fk`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `tbl_logs`
--
ALTER TABLE `tbl_logs`
  ADD CONSTRAINT `tbl_logs_user_fk_foreign` FOREIGN KEY (`user_fk`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `tbl_person_details`
--
ALTER TABLE `tbl_person_details`
  ADD CONSTRAINT `tbl_person_details_user_fk_foreign` FOREIGN KEY (`user_fk`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `tbl_schedule`
--
ALTER TABLE `tbl_schedule`
  ADD CONSTRAINT `tbl_schedule_user_fk_foreign` FOREIGN KEY (`user_fk`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `tbl_task_monitor`
--
ALTER TABLE `tbl_task_monitor`
  ADD CONSTRAINT `tbl_task_monitor_from_user_fk_foreign` FOREIGN KEY (`from_user_fk`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `tbl_time_record`
--
ALTER TABLE `tbl_time_record`
  ADD CONSTRAINT `tbl_time_record_user_fk_foreign` FOREIGN KEY (`user_fk`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `tbl_user_announcement`
--
ALTER TABLE `tbl_user_announcement`
  ADD CONSTRAINT `tbl_user_announcement_user_announce_fk_foreign` FOREIGN KEY (`user_announce_fk`) REFERENCES `tbl_annoucement` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `tbl_user_announcement_user_fk_foreign` FOREIGN KEY (`user_fk`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `tbl_user_control`
--
ALTER TABLE `tbl_user_control`
  ADD CONSTRAINT `tbl_user_control_user_fk_foreign` FOREIGN KEY (`user_fk`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
