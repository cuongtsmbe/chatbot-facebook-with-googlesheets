-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Mar 05, 2023 at 11:03 AM
-- Server version: 10.4.27-MariaDB
-- PHP Version: 8.2.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `ggsheet`
--

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `fanpage_id` varchar(50) NOT NULL,
  `sheet_id` varchar(255) NOT NULL,
  `sheet_name` varchar(255) NOT NULL,
  `sdt_column` varchar(50) NOT NULL,
  `madon_column` varchar(50) NOT NULL,
  `start_column` varchar(50) NOT NULL,
  `end_column` varchar(50) NOT NULL,
  `key_fanpage` varchar(255) NOT NULL,
  `status` int(1) NOT NULL,
  `time_start` date NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `fanpage_id`, `sheet_id`, `sheet_name`, `sdt_column`, `madon_column`, `start_column`, `end_column`, `key_fanpage`, `status`, `time_start`) VALUES
(3, '321365132', 'dhas654322df984asdsheet', 'data1', 'A2:A', 'D2:D', 'A', 'D', 'tokenaslkdalksdasdasdasdasd', 1, '2023-03-05'),
(4, '321654132151321', 'sheetnamecong51321651', 'banhang', 'B2:B', 'F2:F', 'B', 'H', '', 1, '2023-03-05');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
