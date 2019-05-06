-- phpMyAdmin SQL Dump
-- version 4.8.4
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Apr 22, 2019 at 03:21 PM
-- Server version: 10.1.37-MariaDB
-- PHP Version: 7.0.33

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `minerva`
--

-- --------------------------------------------------------

--
-- Table structure for table `tblUserPermissions`
--

CREATE TABLE `tblUserPermissions` (
  `fkUserId` varchar(25) CHARACTER SET utf8 NOT NULL,
  `fkPermissionId` varchar(100) CHARACTER SET utf8 NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tblUserPermissions`
--

INSERT INTO `tblUserPermissions` (`fkUserId`, `fkPermissionId`) VALUES
('dbutts', 'Review Applications'),
('su', 'Manage Permissions'),
('su', 'Review Applications');

-- --------------------------------------------------------

--
-- Table structure for table `tlkpPermissions`
--

CREATE TABLE `tlkpPermissions` (
  `PermissionName` varchar(100) CHARACTER SET utf8 NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tlkpPermissions`
--

INSERT INTO `tlkpPermissions` (`PermissionName`) VALUES
('Manage Permissions'),
('Review Applications');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `tblUserPermissions`
--
ALTER TABLE `tblUserPermissions`
  ADD KEY `UserId` (`fkUserId`),
  ADD KEY `fkPermissionId` (`fkPermissionId`);

--
-- Indexes for table `tlkpPermissions`
--
ALTER TABLE `tlkpPermissions`
  ADD PRIMARY KEY (`PermissionName`),
  ADD UNIQUE KEY `PermissionName` (`PermissionName`);

--
-- Constraints for dumped tables
--

--
-- Constraints for table `tblUserPermissions`
--
ALTER TABLE `tblUserPermissions`
  ADD CONSTRAINT `tbluserpermissions_ibfk_1` FOREIGN KEY (`fkUserId`) REFERENCES `tblUsers` (`UserLoginName`),
  ADD CONSTRAINT `tbluserpermissions_ibfk_2` FOREIGN KEY (`fkPermissionId`) REFERENCES `tlkpPermissions` (`PermissionName`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
