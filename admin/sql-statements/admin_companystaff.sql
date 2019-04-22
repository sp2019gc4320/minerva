-- phpMyAdmin SQL Dump
-- version 4.8.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 22, 2019 at 03:19 PM
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
-- Table structure for table `tblcompanystaff`
--

CREATE TABLE `tblcompanystaff` (
  `companyStaffID` int(11) NOT NULL,
  `fkUserLoginName` varchar(25) NOT NULL,
  `fkSiteID` int(11) NOT NULL,
  `fkCompanyID` varchar(25) NOT NULL,
  `fkPrivilege` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tblcompanystaff`
--

INSERT INTO `tblcompanystaff` (`companyStaffID`, `fkUserLoginName`, `fkSiteID`, `fkCompanyID`, `fkPrivilege`) VALUES
(1, 'ryan', 1, 'ALPHA', 'Case Mgr'),
(3, 'ryan', 2, 'ALPHA', 'Case Mgr'),
(4, 'ryan', 1, 'BRAVO', 'Case Mgr'),
(5, 'bates', 1, 'ALPHA', 'Case Mgr');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `tblcompanystaff`
--
ALTER TABLE `tblcompanystaff`
  ADD PRIMARY KEY (`companyStaffID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `tblcompanystaff`
--
ALTER TABLE `tblcompanystaff`
  MODIFY `companyStaffID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
